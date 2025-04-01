'use client';

import { useState } from 'react';
import Image from 'next/image';
import { tarotImages, TarotCard } from './lib/tarotImages';
import ReactMarkdown from 'react-markdown';

function getRandomCards(): TarotCard[] {
  const shuffled = [...tarotImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

export default function Home() {
  const [question, setQuestion] = useState('');
  const [reading, setReading] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    // 로컬스토리지 체크
    const lastUsed = localStorage.getItem('lastTarotReading');
    const usageCount = parseInt(localStorage.getItem('dailyUsageCount') || '0');
    const now = new Date().toISOString();

    if (lastUsed) {
      const lastDate = new Date(lastUsed).toDateString();
      const today = new Date().toDateString();

      if (lastDate === today) {
        if (usageCount >= 80) {
          alert(
            '무료 타로 리딩은 하루에 80회까지만 가능합니다.\n내일 다시 시도해주세요.'
          );
          return;
        }
      } else {
        // 날짜가 바뀌었으면 카운터 초기화
        localStorage.setItem('dailyUsageCount', '0');
      }
    }

    try {
      setLoading(true);
      setError('');

      // 랜덤 카드 선택
      const cards = getRandomCards();
      setSelectedCards(cards);

      const response = await fetch('/api/tarot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          cards: cards.map((card) => card.name),
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setReading(data.reading);
      localStorage.setItem('lastTarotReading', now);
      localStorage.setItem('dailyUsageCount', (usageCount + 1).toString());
    } catch (error) {
      console.error('Error:', error);
      setError(
        error instanceof Error
          ? error.message
          : '타로 리딩 중 오류가 발생했습니다.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="glass-container mx-auto max-w-4xl p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
          ✨ 타로 리딩 ✨
        </h1>

        <div className="mt-8 sm:mt-12">
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <label
                htmlFor="question"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
              >
                질문을 입력해주세요
              </label>
              <div className="relative">
                <textarea
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-base sm:text-lg bg-white text-gray-900 placeholder-gray-500"
                  rows={3}
                  placeholder="예: 현재 연애운은 어떠한가요?"
                />
              </div>
            </div>
            <div className="w-full">
              <button
                onClick={handleSubmit}
                disabled={loading || !question.trim()}
                className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg"
              >
                {loading ? '타로를 뽑는 중...' : '무료 타로 결과 보기'}
              </button>
            </div>
          </div>
        </div>

        {selectedCards.length > 0 && (
          <div className="mt-8 sm:mt-12">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8">
              {selectedCards.map((card, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative w-24 sm:w-28 md:w-32 aspect-[2/3]">
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                    />
                  </div>
                  <p className="mt-2 text-sm sm:text-base px-2 py-1 bg-white/80 rounded-md text-center text-black">
                    {card.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm sm:text-base">
            {error}
          </div>
        )}

        {reading && (
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white/90 rounded-lg shadow-lg mb-24">
            <div className="prose prose-sm sm:prose-base max-w-none text-black">
              <ReactMarkdown>{reading}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-xs">
        <a
          href="http://pf.kakao.com/_CzJGn/chat"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center text-base sm:text-lg shadow-lg"
        >
          👉 1:1 프리미엄 타로 상담 받기
        </a>
      </div>

      <footer className="w-full bg-gray-100 py-6 mt-8 mb-20">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-600 text-xs sm:text-sm">
          <div className="space-y-1">
            <p>상호: 파라파라</p>
            <p>사업자등록번호: 434-02-02767</p>
            <p>성명: 이광필</p>
            <p>전화번호: 010-2629-5165</p>
            <p>개인정보관리책임자: 이광필</p>
            <p>통신판매업신고번호: 2022-서울강서-3112</p>
            <p>
              사업장소재지: 서울특별시 마포구 월드컵북로 179, 2층 2042호(성산동)
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
