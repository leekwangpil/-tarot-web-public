export interface TarotCard {
  id: number;
  name: string;
  image: string;
}

export const tarotImages: TarotCard[] = [
  { id: 0, name: '바보', image: '/cards/0_fool.jpg' },
  { id: 1, name: '마법사', image: '/cards/1_magician.jpg' },
  { id: 2, name: '여사제', image: '/cards/2_high_priestess.jpg' },
  { id: 3, name: '여황제', image: '/cards/3_empress.jpg' },
  { id: 4, name: '황제', image: '/cards/4_emperor.jpg' },
  { id: 5, name: '교황', image: '/cards/5_hierophant.jpg' },
  { id: 6, name: '연인', image: '/cards/6_lovers.jpg' },
  { id: 7, name: '전차', image: '/cards/7_chariot.jpg' },
  { id: 8, name: '힘', image: '/cards/8_strength.jpg' },
  { id: 9, name: '은둔자', image: '/cards/9_hermit.jpg' },
  { id: 10, name: '운명의 수레바퀴', image: '/cards/10_wheel_of_fortune.jpg' },
  { id: 11, name: '정의', image: '/cards/11_justice.jpg' },
  { id: 12, name: '매달린 사람', image: '/cards/12_hanged_man.jpg' },
  { id: 13, name: '죽음', image: '/cards/13_death.jpg' },
  { id: 14, name: '절제', image: '/cards/14_temperance.jpg' },
  { id: 15, name: '악마', image: '/cards/15_devil.jpg' },
  { id: 16, name: '탑', image: '/cards/16_tower.jpg' },
  { id: 17, name: '별', image: '/cards/17_star.jpg' },
  { id: 18, name: '달', image: '/cards/18_moon.jpg' },
  { id: 19, name: '태양', image: '/cards/19_sun.jpg' },
  { id: 20, name: '심판', image: '/cards/20_judgement.jpg' },
  { id: 21, name: '세계', image: '/cards/21_world.jpg' },
];
