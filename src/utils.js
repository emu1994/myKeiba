import { HORSE_NAMES, HORSE_EMOJIS } from './constants';

export const calculateOdds = (runners) => {
  // 累乗の係数を高くして能力差を顕著にする（3 -> 6）
  const powerSum = runners.reduce((acc, r) => acc + Math.pow(r.ability, 6), 0);
  const takeoutRate = 0.8; // 控除率20%
  
  let processedRunners = runners.map(r => {
    const probability = Math.pow(r.ability, 6) / powerSum;
    const fairOdds = (1 / probability) * takeoutRate;
    // 最低オッズは1.1、最高は適度にバラけさせる
    const finalOdds = Math.max(1.1, Math.round(fairOdds * 10) / 10);
    return { ...r, odds: parseFloat(finalOdds.toFixed(1)), prob: probability };
  });

  // 人気順を算出
  const sortedByOdds = [...processedRunners].sort((a, b) => a.odds - b.odds);
  return processedRunners.map(r => ({
    ...r,
    popularity: sortedByOdds.findIndex(s => s.number === r.number) + 1
  }));
};

export const generateRaces = (raceCount = 11) => {
  return Array.from({ length: raceCount }, (_, i) => {
    const raceNumber = i + 1;
    const runnerCount = raceNumber === raceCount ? 16 : Math.floor(Math.random() * 9) + 8;
    let runners = Array.from({ length: runnerCount }, (_, j) => {
      // 能力値の幅を広げて実力差を作る
      const baseAbility = Math.random() * 60 + 40; 
      return {
        number: j + 1,
        name: HORSE_NAMES[Math.floor(Math.random() * HORSE_NAMES.length)],
        ability: baseAbility,
        gate: Math.floor(j / 2) + 1,
        emoji: HORSE_EMOJIS[Math.floor(Math.random() * HORSE_EMOJIS.length)]
      };
    });
    runners = calculateOdds(runners);
    return {
      id: raceNumber,
      name: raceNumber === raceCount ? "皐月特別 (GI)" : `一般競走 (第${raceNumber}R)`,
      runners,
      status: 'open',
      results: null
    };
  });
};

export const getTicketOdds = (type, numbers, runners, TICKET_TYPES) => {
  const takeout = TICKET_TYPES.find(t => t.id === type).takeout;
  const items = numbers.map(n => runners.find(r => r.number === n));
  const probs = items.map(r => r.prob);
  
  let combinedProb = 0;
  switch (type) {
    case 'single':
      combinedProb = probs[0];
      break;
    case 'place':
      combinedProb = Math.min(0.9, probs[0] * 3.0); 
      break;
    case 'umaren':
      combinedProb = (probs[0] * (probs[1] / (1 - probs[0]))) + (probs[1] * (probs[0] / (1 - probs[1])));
      break;
    case 'umatan':
      combinedProb = probs[0] * (probs[1] / (1 - probs[0]));
      break;
    case 'trio':
      combinedProb = probs[0] * (probs[1] / (1 - probs[0])) * (probs[2] / (1 - probs[0] - probs[1])) * 6;
      break;
    case 'tierce':
      combinedProb = probs[0] * (probs[1] / (1 - probs[0])) * (probs[2] / (1 - probs[0] - probs[1]));
      break;
    default:
      combinedProb = 0.01;
  }
  
  const odds = (1 / combinedProb) * takeout;
  return Math.max(1.1, Math.round(odds * 10) / 10).toFixed(1);
};
