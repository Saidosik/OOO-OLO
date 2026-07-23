"use client"

import { api } from "@/config/api"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Pusher from "pusher-js"
import MainLayout from "@/layouts/main";

interface MessageData {
    username: string;
    message: string
}

export default function TestPage() {
    const [messages, setMessages] = useState<MessageData[]>([])
    const [data, setData] = useState<{
        message: string,
        username: string
    }>({
        message: '',
        username: ''
    });
    const [username, setUsername] = useState('guest');

    useEffect(() => {
        const localeUsername = localStorage.getItem('username')
        if (localeUsername) {
            setData({ ...data, username: localeUsername })
            setUsername(localeUsername)
        }

    }, []);


    useEffect(() => {
        // Включаем логирование (опционально)
        Pusher.logToConsole = true

        // Создаем экземпляр клиента
        const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        })

        // Подписываемся на канал
        const channel = pusherClient.subscribe('chat-channel1')

        // Слушаем событие (Исправлено: убрана лишняя скобка в конце)
        channel.bind('new-message', (data: MessageData) => {
            setMessages((prev) => [...prev, data])
        })

        // Исправлено: корректное имя переменной и название канала для отписки
        return () => {
            channel.unbind_all() // Безопасное снятие обработчиков с канала
            pusherClient.unsubscribe('chat-channel1')
        }
    }, []);

    const typing = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, message: e.target.value })
    }

    const send = async (e: FormEvent) => {
        e.preventDefault()
        // Axios / fetch обертка api обычно принимает объект напрямую, 
        // проверьте, не нужно ли убрать вложенность { body: ... } в зависимости от вашей библиотеки api
        await api.post('/send-message', {
            data: data,
        })

        setData({ ...data, message: '' })
    }

    return (
        <MainLayout>


            <div className="flex flex-col gap-5 items-center justify-center w-full h-full">
                <h2>Чат {username}</h2>


                {/* Выводим полученные сообщения, чтобы протестировать работу */}
                <div style={{ marginTop: '20px' }}>
                    <h3>Сообщения:</h3>
                    <ul>
                        {messages.map((msg, index) => (
                            <li key={index}>{msg.username} - {msg.message}</li>
                        ))}
                    </ul>
                </div>
                <form onSubmit={send}
                    className='flex flex-col w-1/2 items-center border-2 border-gray-800 py-5 gap-2'>
                    <input
                        type="text" name="ddd"
                        value={data?.message}
                        id="ddd"
                        onChange={(e) => typing(e)}
                        className="w-60 p-2 border-2 hover:bg-gray-800" />
                    <button type="submit" className="w-60 p-2 border-2 hover:bg-gray-800">Отправить</button>
                </form>
            </div>
        </MainLayout>
    )
}
