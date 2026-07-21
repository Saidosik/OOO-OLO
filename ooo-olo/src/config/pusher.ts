
import Pusher from "pusher";
import PusherClient from "pusher-js";

//серверный экземпляр пушера для отправки и тд ну я так понял, 

export const pusherAPI = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

//Клиентский для подписки на канал? ну я так понял 
//обязательна директива "use client"
export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY!,
   {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!, 
  }
);

