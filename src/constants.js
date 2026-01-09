export const HORSE_NAMES = [
  "ゴールドシップ", 
  "ダイワスカーレット", 
  "サイレンススズカ", 
  "トウカイテイオー", 
  "メジロマックイーン", 
  "オグリキャップ", 
  "シンボリルドルフ", 
  "ディープインパクト", 
  "オルフェーヴル", 
  "ウォッカ", 
  "ライスシャワー", 
  "ナリタブライアン", 
  "エルコンドルパサー", 
  "グラスワンダー", 
  "スペシャルウィーク", 
  "テイエムオペラオー", 
  "アグネスタキオン", 
  "キングカメハメハ"
];

export const HORSE_EMOJIS = ["🐎", "🏇", "🐎", "🏇"];

export const TICKET_TYPES = [
  { id: 'single', name: '単勝', min: 1, takeout: 0.8 },
  { id: 'place', name: '複勝', min: 1, takeout: 0.8 },
  { id: 'umaren', name: '馬連', min: 2, takeout: 0.75 },
  { id: 'umatan', name: '馬単', min: 2, takeout: 0.7 },
  { id: 'trio', name: '三連複', min: 3, takeout: 0.7 },
  { id: 'tierce', name: '三連単', min: 3, takeout: 0.7 },
];

export const BET_METHODS = [
  { id: 'normal', name: '通常' },
  { id: 'box', name: 'ボックス' },
  { id: 'formation', name: 'フォーメーション' },
  { id: 'nagashi', name: 'ながし' },
];

export const DEFAULT_INITIAL_BALANCE = 100000;
export const DEFAULT_RACE_COUNT = 11;
