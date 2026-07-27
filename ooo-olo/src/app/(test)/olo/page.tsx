"use client"

import { api } from "@/config/api"
import { useEffect, useState } from "react"
import Pusher from "pusher-js"
import MainLayout from "@/layouts/main";

interface userData {
    name: string;
    id: number;
}

export default function TestPage() {

    const [username, setUsername] = useState('');
    const [currentUser, setCurrentUser] = useState<userData>();
    const [users, setUsers] = useState<userData[]>([]);

    useEffect(() => {
        const localStorageUsername = localStorage.getItem('username');

        if (localStorageUsername) {
            setUsername(localStorageUsername)
        }

        fetchUsers()
    }, []);

    useEffect(() => {
        if (username) check()
            fetchUsers()
    }, [username])

    useEffect(() => {
        if (!currentUser) return
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        })

        const channel = pusher.subscribe("onlinevis");

        channel.bind('open', (data: any) => {
            setUsers(data.onlineUsers)
        })

        return () => {
            channel.unbind_all();
            pusher.unsubscribe('onlinevis');
            pusher.disconnect();
        }
    }, [currentUser]);

    const check = async () => {
        if (username != '') {
            const res = await api.post('/auth', {
                data: username,
            });
            const data: any = res

            setCurrentUser(data.data.user)

        }
    }

    const fetchUsers = async () => {
        try {
            const res = await api.get('/auth');
            setUsers(res.data.onlineUsers || []);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    return (
        <MainLayout>
            <div className="flex flex-col gap-5 items-center justify-center w-full h-full">
                <h2>Кто тут</h2>
                <div className="">
                    {users.length > 0 ? users.map((user: userData) =>
                        <div className="" key={user.id}>
                            {user.name} {user.name == currentUser?.name ? ("its u") : ('')}
                        </div>

                        
                    ) : (
                        <div className="">
                            пусто
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    )
}
