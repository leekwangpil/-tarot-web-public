import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// API 키가 제대로 로드되었는지 확인
if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  console.error('OpenAI API key is not set');
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    // API 키 확인
    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      console.error('OpenAI API key is not configured');
      return NextResponse.json(
        { error: '서비스 점검 중입니다. 잠시 후 다시 시도해주세요.' },
        { status: 500 }
      );
    }

    const { question, cards } = await request.json();

    // 입력값 검증
    if (
      !question ||
      typeof question !== 'string' ||
      question.trim().length === 0
    ) {
      return NextResponse.json(
        { error: '질문을 입력해주세요.' },
        { status: 400 }
      );
    }

    if (!Array.isArray(cards) || cards.length !== 3) {
      return NextResponse.json(
        { error: '잘못된 요청입니다.' },
        { status: 400 }
      );
    }

    // 요청 크기 제한
    if (question.length > 500) {
      return NextResponse.json(
        { error: '질문이 너무 깁니다. 500자 이내로 작성해주세요.' },
        { status: 400 }
      );
    }

    const prompt = `당신은 전문적인 타로 리더입니다. 다음 질문에 대해 3장의 타로 카드를 뽑아 해석해주세요:
    
질문: ${question}

뽑힌 카드들:
${cards
  .map((card: string, index: number) => `${index + 1}. ${card}`)
  .join('\n')}

각 카드의 의미와 전체적인 해석을 포함하여 답변해주세요. 답변은 친근하고 이해하기 쉽게 작성해주세요.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            '당신은 전문적인 타로 리더입니다. 타로 카드를 해석하고 조언을 제공합니다.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const reading = completion.choices[0].message.content;

    return NextResponse.json({ reading });
  } catch (error) {
    console.error('Error:', error);
    // 에러 메시지를 일반화하여 내부 정보가 노출되지 않도록 함
    return NextResponse.json(
      { error: '서비스 점검 중입니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
