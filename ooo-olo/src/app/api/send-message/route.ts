import { pusherAPI } from "@/config/pusher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json(
      { message: 'ОТсутСтвует тело сообщения' }
    )
  }
  else {
    const result = await pusherAPI.trigger("chat-channel1", "new-message", { body });
    console.log(result)
  }

}

export async function GET() {

}