import { LoginDTO } from "@/types/login-dto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const data: LoginDTO = await request.json().catch(() => null);

    if (!data) {
        return NextResponse.json(
            { message: 'ошибка' }
        )
    }

    
    return NextResponse.json(
        data
    )
}