"use client"

import { api } from "@/config/api"
import { useEffect, useState } from "react"
import Pusher from "pusher-js"

interface MessageData {
    message: string
}

export default function TestPage() {
    const [messages, setMessages] = useState<MessageData[]>([])
    const [data, setData] = useState("");


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
    }, [])

    const send = async () => {
        // Axios / fetch обертка api обычно принимает объект напрямую, 
        // проверьте, не нужно ли убрать вложенность { body: ... } в зависимости от вашей библиотеки api
        await api.post('/send-message', {
            message: data,
        })
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Чат</h1>

            
            <input type="text" name="ddd" value={data} id="ddd" onChange={(e) => setData(e.target.value)} />
            <button onClick={send}>Отправить</button>

            {/* Выводим полученные сообщения, чтобы протестировать работу */}
            <div style={{ marginTop: '20px' }}>
                <h3>Сообщения:</h3>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg.message}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
