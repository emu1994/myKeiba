import React from 'react';
import { Trophy, Wallet, ChevronRight } from 'lucide-react';

export default function Lobby({ balance, races, onStartBetting }) {
  return (
    <div className="max-w-4xl mx-auto p-4 animate-in fade-in">
      <header className="flex justify-between items-center mb-6 bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2 italic">
            <Trophy className="text-yellow-400" /> NEO HORSE RACING
          </h1>
          <p className="text-xs text-slate-400">リアルタイム・シミュレーション</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400 flex items-center justify-end gap-1 mb-1">
            <Wallet size={12} /> 所持金
          </div>
          <div className="text-2xl font-black text-emerald-400">¥{balance.toLocaleString()}</div>
        </div>
      </header>

      <div className="space-y-3">
        {races.map(race => (
          <div 
            key={race.id}
            onClick={() => race.status === 'open' && onStartBetting(race.id)}
            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
              race.status === 'finished' 
                ? 'bg-slate-50 border-slate-100 grayscale' 
                : 'bg-white border-white hover:border-emerald-400 cursor-pointer shadow-sm hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-center bg-slate-100 w-10 py-1 rounded font-bold text-slate-500">
                <div className="text-[10px]">RACE</div>
                <div className="leading-none">{race.id}</div>
              </div>
              <div>
                <div className="font-bold text-slate-800">{race.name}</div>
                <div className="text-xs text-slate-500">{race.runners.length}頭立て</div>
              </div>
            </div>
            {race.status === 'finished' ? (
              <div className="text-right text-emerald-600 font-bold">
                終了
                <div className="text-[10px] text-slate-400 font-normal">払戻 ¥{race.totalPayout?.toLocaleString()}</div>
              </div>
            ) : (
              <ChevronRight className="text-slate-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
