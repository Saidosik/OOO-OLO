import { pusher } from "@/config/pusher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json(
      { message: 'ОТсутСтвует тело сообщения'}
    )
  }
  else {
    
  }

  try {
    const laravel = createLaravelApi();
    const response = await laravel.post('/login', {
      email: body.email,
      password: body.password,
    });

    const token = response.data?.access_token ?? response.data?.token;
    const expiresIn = response.data?.expires_in;

    if (!token) {
      return NextResponse.json(
        { message: 'Сервер не вернул токен' },
        { status: 500 }
      );
    }

    const result = NextResponse.json({ ok: true });

    result.cookies.set(
      ACCESS_TOKEN_COOKIE,
      token,
      buildAccessTokenCookieOptions(expiresIn),
    );
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data ?? {};
      const token = data?.access_token ?? data?.token;
      const expiresIn = data?.expires_in;

      const result = NextResponse.json(
        {
          message: data?.message || "Неверный логин или пароль",
          code: data?.code,
          requires_email_verification: data?.requires_email_verification === true,
          email: data?.email,
        },
        { status: error.response?.status || 401 }
      );

      if (token && data?.requires_email_verification === true) {
        result.cookies.set(
          ACCESS_TOKEN_COOKIE,
          token,
          buildAccessTokenCookieOptions(expiresIn),
        );
      }

      return result;
    }

    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера' },
      { status: 500 },
    );
  }
}
