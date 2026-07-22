import { pusherServer } from "@/config/pusher-server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { data } = await request.json().catch(() => null);
  console.log(data)
  if (!data) {
    return NextResponse.json(
      { message: 'ОТсутСтвует тело сообщения' }
    )
  }
  else {
    try {
      const result = await pusherServer.trigger("chat-channel1", "new-message", {
        message: data.message,
        username: data.username
      });
      console.log(result)
      return NextResponse.json(
        { status: 200 }
      )
    }
    catch {
      return NextResponse.json(
        { status: 500 })
    }
  }

}

export async function GET() {
  return NextResponse.json(
    { message: 'ОТсутСтвует тело сообщения' }
  )
}