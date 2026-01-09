import React from 'react';
import { ShoppingCart, Plus, Minus, Wallet } from 'lucide-react';

export default function BetAmountSelector({ betAmount, onBetAmountChange, combinations, onAddToCart, balance }) {
  const adjustAmount = (val) => {
    const newAmount = Math.max(100, betAmount + val);
    onBetAmountChange(newAmount);
  };

  const handleInput = (e) => {
    const value = Math.max(100, Number(e.target.value) || 0);
    onBetAmountChange(value);
  };

  const handleAllIn = () => {
    if (combinations.length === 0 || balance <= 0) return;
    const perTicket = Math.max(100, Math.floor(balance / combinations.length));
    onBetAmountChange(perTicket);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">
      <h3 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
        <span>購入金額設定</span>
        <span className="text-xs text-slate-400 font-normal">組み合わせ: {combinations.length} 通り</span>
      </h3>
      
      <div className="flex items-center gap-2 mb-3 bg-slate-100 p-4 rounded-2xl">
        <button onClick={() => adjustAmount(-100)} className="p-2 bg-white rounded-lg shadow-sm hover:text-red-500"><Minus size={18}/></button>
        <div className="flex-1 text-center">
          <div className="text-[10px] text-slate-400 font-bold uppercase">1点あたりの金額</div>
          <div className="text-2xl font-black italic">¥{betAmount.toLocaleString()}</div>
        </div>
        <button onClick={() => adjustAmount(100)} className="p-2 bg-white rounded-lg shadow-sm hover:text-emerald-500"><Plus size={18}/></button>
      </div>

      <div className="mb-6">
        <input
          type="number"
          min="100"
          value={betAmount}
          onChange={handleInput}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none font-bold"
        />
      </div>

      <div className="grid grid-cols-4 gap-2 mb-6">
        {[100, 500, 1000, 5000].map(val => (
          <button key={val} onClick={() => onBetAmountChange(val)} className="py-2 bg-slate-50 border rounded-xl text-[10px] font-bold hover:bg-slate-200 transition-colors">
            ¥{val.toLocaleString()}
          </button>
        ))}
        <button
          onClick={handleAllIn}
          className="col-span-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-[10px] font-bold hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1"
        >
          <Wallet size={14} className="text-emerald-600" />
          全額（選択数で按分）
        </button>
      </div>

      <button disabled={combinations.length === 0} onClick={onAddToCart}
        className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 disabled:bg-slate-200 disabled:shadow-none hover:bg-emerald-700 transition-all flex flex-col items-center justify-center gap-1"
      >
        <div className="flex items-center gap-2"><ShoppingCart size={20} /> カートに追加 ({combinations.length}点)</div>
        <div className="text-[10px] opacity-70">合計 ¥{(combinations.length * betAmount).toLocaleString()}</div>
      </button>
    </div>
  );
}
