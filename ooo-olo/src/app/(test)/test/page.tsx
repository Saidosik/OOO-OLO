"use client"

import { pusherClient } from "@/config/pusher"
import Pusher from "pusher-js"
import { useEffect } from "react"

export default function TestPage(){
    useEffect(() => {
        //логирование, необязательно
        Pusher.logToConsole = true;

        //На клиете подписываемя к каналу  
        const channel = pusherClient.subscribe('chat-channel1');

        //
        channel.bind('new-message', (data: {message:string}) => console.log(
            "1121"
        ));


    }, [])
    return{

    }
}