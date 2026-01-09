import React from 'react';
import { Flag, CheckCircle2, XCircle, Trophy } from 'lucide-react';

export default function ResultScreen({ currentRace, balance, onNext }) {
  return (
    <div className="max-w-4xl mx-auto p-4 animate-in zoom-in">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border">
        <div className="bg-slate-900 text-white p-8 text-center">
          <div className="text-emerald-400 text-xs font-bold mb-2 flex items-center justify-center gap-2">
            <Flag size={14} /> RACE FINISHED
          </div>
          <h2 className="text-3xl font-black italic">{currentRace.name} 確定</h2>
        </div>
        <div className="p-8">
          <div className="flex justify-center gap-8 mb-12">
            {currentRace.results.map((num, i) => {
              const runner = currentRace.runners.find(r => r.number === num);
              return (
                <div key={i} className="text-center">
                  <div className={`w-14 h-14 mx-auto mb-2 rounded-full flex items-center justify-center font-black text-2xl shadow-xl ${
                    i === 0 ? 'bg-yellow-400 text-white' : i === 1 ? 'bg-slate-300 text-white' : 'bg-amber-700 text-white'
                  }`}>{i + 1}</div>
                  <div className="text-2xl font-black text-slate-800">#{num}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">{runner?.popularity}番人気</div>
                </div>
              );
            })}
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-lg border-b pb-2">的中結果・払戻明細</h3>
            {currentRace.ticketResults.map((t, i) => (
              <div key={i} className={`flex justify-between items-center p-5 rounded-2xl border-2 transition-all ${t.isWin ? 'bg-emerald-50 border-emerald-300 scale-[1.02] shadow-lg' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
                <div className="flex items-center gap-5">
                  {t.isWin ? <div className="bg-emerald-500 text-white p-2 rounded-full shadow-lg"><CheckCircle2 size={24} /></div> : <XCircle className="text-slate-200" size={24} />}
                  <div>
                    <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{t.typeName}</div>
                    <div className="font-black text-xl text-slate-800 tracking-tight">{t.numbers.join(' - ')}</div>
                    <div className="text-xs text-slate-400 font-bold mt-1">確定オッズ: {t.odds}倍 / 購入: ¥{t.amount.toLocaleString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">払戻金額</div>
                  <div className={`text-2xl font-black italic ${t.isWin ? 'text-emerald-600' : 'text-slate-400'}`}>
                    ¥{t.payout.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-slate-900 rounded-3xl p-8 text-white flex justify-between items-center shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Trophy size={120}/></div>
            <div className="relative z-10">
              <div className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-widest">現在の総資産</div>
              <div className="text-4xl font-black text-emerald-400 italic">¥{balance.toLocaleString()}</div>
            </div>
            <button onClick={onNext} className="relative z-10 bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 active:scale-95">次へ進む</button>
          </div>
        </div>
      </div>
    </div>
  );
}
