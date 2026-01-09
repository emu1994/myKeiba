import React from 'react';
import { XCircle, RotateCcw, Home } from 'lucide-react';

export default function GameOver({ balance, onRestart, onBackToSettings }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500 rounded-full mb-6">
          <XCircle className="text-white" size={48} />
        </div>
        
        <h1 className="text-4xl font-black text-red-600 mb-4">ゲームオーバー</h1>
        <p className="text-slate-600 mb-2">所持金が0円になりました</p>
        
        <div className="bg-slate-100 rounded-2xl p-6 mb-8">
          <div className="text-sm text-slate-500 mb-1">最終所持金</div>
          <div className="text-3xl font-black text-slate-900">¥{balance.toLocaleString()}</div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onRestart}
            className="w-full py-4 bg-emerald-600 text-white rounded-xl font-black hover:bg-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} />
            同じ設定で再挑戦
          </button>
          <button
            onClick={onBackToSettings}
            className="w-full py-4 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-all flex items-center justify-center gap-2"
          >
            <Home size={20} />
            設定画面に戻る
          </button>
        </div>
      </div>
    </div>
  );
}
