"use client";
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

export default function AuthPage() {
    const [username, setUsername] = useState<string>('guest');
    const router = useRouter();

    useEffect(() => {
        const localeUsername = localStorage.getItem('username')
        if (localeUsername) {
            setUsername(localeUsername)
        }
    }, []);

    const nameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const signin = (e: FormEvent) => {
        e.preventDefault()
        localStorage.setItem('username', username);

        router.push('test')
    }

    return (
        <form onSubmit={signin}>
            <input type="text" name="username" id="" value={username} onChange={nameChange} />
            <button type="submit">Войти</button>
        </form>
    )
}