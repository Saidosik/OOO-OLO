'use client'

import MainLayout from "@/layouts/main";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const localStorageUsername = localStorage.getItem('username');
    if (localStorageUsername) {
      setUsername(localStorageUsername)
    }
  }, [])

  return (
    <MainLayout>
      <div className="h-screen flex justify-center m-auto flex-col items-center gap-20 text-center">
        <h1 className="text-4xl">Главная страница</h1>
        {username ? (<>
          <p className="text-2xl">
            Добро пожаловать, {username}
          </p>
          <Link href={'/test'} className="w-40 p-2 border-2 hover:bg-gray-800"> начать общение
          </Link>
        </>
        ) : (
          <Link href={'/auth'} className="w-40 p-2 border-2 hover:bg-gray-800">
            Войти
          </Link>
        )}
      </div>
    </MainLayout>
  );
}
