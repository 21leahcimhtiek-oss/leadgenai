import { OpenAI } from 'openai'
import { NextRequest, NextResponse } from 'next/server'
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
export async function POST(req: NextRequest) {
  const { message } = await req.json()
  if (!message) return NextResponse.json({ error: 'Message required' }, { status: 400 })
  const completion = await openai.chat.completions.create({ model: 'gpt-4o-mini', messages: [{ role: 'system', content: 'You are LeadGen AI, an expert sales development and lead generation strategist. Help users find ideal customers, qualify leads, write outreach messages, and build scalable lead generation systems.' }, { role: 'user', content: message }], max_tokens: 2048 })
  return NextResponse.json({ reply: completion.choices[0].message.content })
}
