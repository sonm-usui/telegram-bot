// app/api/telegram/route.js

import { NextResponse } from 'next/server';

const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

export async function POST(request) {
  const body = await request.json();

  if (body.message) {
    const chatId = body.message.chat.id;
    const text = `You said: ${body.message.text}`;

    await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
      }),
    });
  }

  return NextResponse.json({ status: 'ok' });
}
