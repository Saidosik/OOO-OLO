"use client";
import MainLayout from '@/layouts/main';
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
        <MainLayout>
            <div className="flex flex-col gap-5 items-center justify-center w-full h-full">
                <h2 className='text-2xl uppercase'>Войти в систему</h2>
                <form onSubmit={signin} className='flex flex-col w-1/2 items-center border-2 border-gray-800 py-5 gap-2'>
                    <input
                        type="text" name="username"
                        id="" value={username}
                        onChange={nameChange}
                        className="w-60 p-2 border-2 "
                    />
                    <button type="submit" className="w-60 p-2 border-2 hover:bg-gray-800">Войти</button>
                </form>
            </div>
        </MainLayout>
    )
}