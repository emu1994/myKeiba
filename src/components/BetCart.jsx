import React from 'react';
import { Trash2, TrendingUp, Play } from 'lucide-react';

export default function BetCart({ betCart, onRemoveFromCart, onStartRace }) {
  const totalAmount = betCart.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-xl flex-1 flex flex-col">
      <h3 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest flex items-center justify-between">
        投票カート
        <span className="bg-emerald-500 text-white px-2 py-0.5 rounded text-[10px]">{betCart.length}</span>
      </h3>
      <div className="space-y-3 mb-6 flex-1 overflow-y-auto pr-2 min-h-[150px] no-scrollbar">
        {betCart.length === 0 && <div className="text-slate-600 text-center py-10 text-xs italic">カートは空です</div>}
        {betCart.map((b, i) => (
          <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/5 animate-in slide-in-from-right-4">
            <div className="flex justify-between items-start mb-1">
              <div>
                <div className="text-[10px] text-emerald-400 font-bold uppercase">{b.typeName}</div>
                <div className="font-black text-sm tracking-tight">{b.numbers.join(' - ')}</div>
              </div>
              <button onClick={() => onRemoveFromCart(i)} className="text-slate-600 hover:text-red-400"><Trash2 size={14} /></button>
            </div>
            <div className="flex justify-between items-end border-t border-white/5 pt-2 mt-2">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                 <TrendingUp size={10}/> {b.odds}倍
              </div>
              <div className="text-xs font-mono font-bold text-emerald-400">
                的中時 ¥{Math.floor(b.amount * parseFloat(b.odds)).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t border-white/10 mt-auto">
        <div className="flex justify-between items-end mb-4 px-1">
          <div className="text-xs text-slate-400 font-bold">支払合計額</div>
          <div className="text-xl font-black text-white">¥{totalAmount.toLocaleString()}</div>
        </div>
        <button onClick={onStartRace} disabled={betCart.length === 0}
          className="w-full py-4 bg-white text-slate-900 rounded-xl font-black hover:bg-slate-100 disabled:bg-slate-800 disabled:text-slate-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5"
        >
          <Play fill="currentColor" size={16} /> 購入を確定してレース開始
        </button>
      </div>
    </div>
  );
}
