'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
interface MainLayoutProps {
    children: React.ReactNode
}
export default function MainLayout({ children }: MainLayoutProps) {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const localStorageUsername = localStorage.getItem('username');
        if (localStorageUsername) {
            setUsername(localStorageUsername)
        }
    }, [])

    return (
        <div className="flex">
            <header className="w-1/4 p-20 border-r-2 border-gray-800">
                <nav className="flex flex-col justify-around">
                    <a href="/">
                        LOGO
                    </a>
                    <ul className="flex flex-col gap-5 text-xl justify-center h-[60vh]">
                        <li className=""><a className="inline" href="/">Главная</a></li>
                        <li className=""><a className="" href="/auth">Войти</a></li>
                        <li className=""><a className="" href="/test">Чаты</a></li>
                    </ul>
                    <a href="/">
                        {username}
                    </a>
                </nav>
            </header>
            <main className="w-3/4">
                {children}
            </main>
        </div>
    );
}
