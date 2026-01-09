import React, { useState } from 'react';
import { Settings, Play } from 'lucide-react';

export default function GameSettings({ onStart, defaultBalance, defaultRaceCount }) {
  const [initialBalance, setInitialBalance] = useState(defaultBalance);
  const [raceCount, setRaceCount] = useState(defaultRaceCount);

  const handleStart = () => {
    onStart({
      initialBalance: parseInt(initialBalance),
      raceCount: parseInt(raceCount)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4">
            <Settings className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">ゲーム設定</h1>
          <p className="text-slate-600 text-sm">競馬ゲームを開始する前に設定を行ってください</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              初期所持金
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="10000"
                max="1000000"
                step="10000"
                value={initialBalance}
                onChange={(e) => setInitialBalance(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none font-bold text-lg"
              />
              <span className="text-slate-600 font-bold">円</span>
            </div>
            <div className="flex gap-2 mt-2">
              {[50000, 100000, 200000, 500000].map(val => (
                <button
                  key={val}
                  onClick={() => setInitialBalance(val)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold transition-colors"
                >
                  ¥{val.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              レース数
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="5"
                max="20"
                step="1"
                value={raceCount}
                onChange={(e) => setRaceCount(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none font-bold text-lg"
              />
              <span className="text-slate-600 font-bold">レース</span>
            </div>
            <div className="flex gap-2 mt-2">
              {[5, 8, 11, 15].map(val => (
                <button
                  key={val}
                  onClick={() => setRaceCount(val)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold transition-colors"
                >
                  {val}レース
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full py-4 bg-emerald-600 text-white rounded-xl font-black text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
          >
            <Play fill="currentColor" size={20} />
            ゲーム開始
          </button>
        </div>
      </div>
    </div>
  );
}
