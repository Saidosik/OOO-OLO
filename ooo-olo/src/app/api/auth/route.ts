import { pusherServer } from "@/config/pusher-server";
import { NextRequest, NextResponse } from "next/server";

interface userData {
  name: string;
  id: number;
  status: string
}

const onlineUsers: userData[] = []
export async function POST(request: NextRequest) {
  const { data } = await request.json().catch(() => null);
  if (!data) {
    return NextResponse.json(
      { message: 'no data' }
    )
  }
  else {
    try {
      const user = { name: data, id: Date.now() }

      const existingUser = onlineUsers.find(user => user.name === data);
      if (!existingUser) {
        onlineUsers.push({
          id: user.id,
          name: user.name,
          status: 'online',
        });
      }
      const result = await pusherServer.trigger("onlinevis", "open", {
        onlineUsers
      });
      console.log(result)
      return NextResponse.json(
        { user }
      )
    }
    catch {
      return NextResponse.json(
        { status: 500 })
    }
  }

}

export async function GET() {
  return NextResponse.json({ onlineUsers });
}