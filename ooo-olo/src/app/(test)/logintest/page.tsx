"use client"
import { FormEvent, useState, useEffect } from "react";
import MainLayout from "@/layouts/main";
import { api } from "@/lib/api";
import { LoginDTO } from "@/types/login-dto";

export default function TestPage() {
    // Инициализируем объект пустыми строками, чтобы инпуты были "управляемыми"
    const [loginPayload, setLoginPayload] = useState<LoginDTO>({
        email: '',
        password: ''
    });
    const [sending, setSending] = useState<boolean>(false);
    const [error, setError] = useState<string>(""); // Исправили опечатку setErrot -> setError

    useEffect(() => {
        // ваш код для useEffect
    }, []);

    const send = async (e: FormEvent) => {
        e.preventDefault();
        setSending(true);
        setError("");

        try {
            // Передаем объект напрямую, без лишней обертки
            await api.post('/for-test/login', loginPayload);
        } catch (err) {
            setError("Ошибка при входе");
        } finally {
            setSending(false);
        }
    };

    return (
        <MainLayout>
            <div className="container flex flex-col gap-20 items-center justify-center w-full h-full">
               <form onSubmit={send} className="flex flex-col gap-10 items-center justify-center w-full h-full"> {/* Добавили onSubmit форме */}
                <div className="inputs">
                    <input 
                        type="email" 
                        name="email" 
                        className="bg-amber-200 mr-3 text-black"
                        id="email"  
                        value={loginPayload.email} 
                        // Берем старое состояние и заменяем только email
                        onChange={(e) => setLoginPayload(prev => ({ ...prev, email: e.target.value }))}
                    />
                    <label htmlFor="email">Email</label>
                </div>
                
                <div className="inputs">
                    <input 
                        type="password" // Изменили text на password для безопасности
                        name="password"
                        id="password"
                        className="bg-amber-200 mr-3 text-black"
                        value={loginPayload.password}
                        // Берем старое состояние и заменяем только password
                        onChange={(e) => setLoginPayload(prev => ({ ...prev, password: e.target.value }))}
                    />
                    <label htmlFor="password">Пароль</label>
                </div>
                
                <input className="bg-green-500" type="submit" value={sending ? "Отправка..." : "Отправочка"} disabled={sending} />
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form> 
            </div>
            
        </MainLayout>
    );
}
