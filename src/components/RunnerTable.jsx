import React from 'react';
import { Star } from 'lucide-react';
import { TICKET_TYPES } from '../constants';

export default function RunnerTable({ runners, selectedType, activeMethod, selection, onToggleSelect }) {
  const gateColors = [
    'bg-white border text-black', 
    'bg-slate-900', 
    'bg-red-500', 
    'bg-blue-500', 
    'bg-yellow-400 text-black', 
    'bg-green-600', 
    'bg-orange-500', 
    'bg-pink-400'
  ];

  return (
    <div className="p-4 overflow-x-auto">
      <table className="w-full text-center text-sm min-w-[500px]">
        <thead>
          <tr className="text-[10px] text-slate-400 uppercase font-bold border-b">
            <th className="p-2 text-left w-12 text-slate-400">枠/番</th>
            <th className="p-2 text-left">馬名 / 人気 / オッズ</th>
            <th className="p-2">{activeMethod === 'normal' && (selectedType.id === 'single' || selectedType.id === 'place') ? '選択' : '1着 / 軸'}</th>
            {(selectedType.min >= 2 && activeMethod !== 'box') && <th className="p-2">2着 / 相手</th>}
            {(selectedType.min >= 3 && activeMethod !== 'box' && activeMethod !== 'nagashi') && <th className="p-2">3着</th>}
          </tr>
        </thead>
        <tbody className="divide-y">
          {runners.map(r => (
            <tr key={r.number} className="hover:bg-slate-50/50">
              <td className="p-2">
                <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-white shadow-sm ${
                  gateColors[r.gate-1] || 'bg-slate-400'
                }`}>{r.number}</div>
              </td>
              <td className="p-2 text-left">
                <div className="font-bold text-slate-700 flex items-center gap-1">
                  {r.name}
                  {r.popularity === 1 && <Star size={10} className="fill-yellow-400 text-yellow-400"/>}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-1 rounded font-bold ${r.popularity <= 3 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                    {r.popularity}番人気
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-600 tracking-tight">
                    {r.odds.toFixed(1)}倍
                  </span>
                </div>
              </td>
              <td className="p-2">
                <button onClick={() => onToggleSelect(1, r.number)}
                  className={`w-10 h-10 rounded-lg border-2 font-bold transition-all ${
                    selection[1].includes(r.number) ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg scale-105' : 'bg-white border-slate-200 text-slate-300 hover:border-slate-400 hover:text-slate-400'
                  }`}
                >
                  {r.number}
                </button>
              </td>
              {(selectedType.min >= 2 && activeMethod !== 'box') && (
                <td className="p-2">
                  <button onClick={() => onToggleSelect(2, r.number)}
                    className={`w-10 h-10 rounded-lg border-2 font-bold transition-all ${
                      selection[2].includes(r.number) ? 'bg-blue-500 border-blue-500 text-white shadow-lg scale-105' : 'bg-white border-slate-200 text-slate-300 hover:border-slate-400 hover:text-slate-400'
                    }`}
                  >
                    {r.number}
                  </button>
                </td>
              )}
              {(selectedType.min >= 3 && activeMethod !== 'box' && activeMethod !== 'nagashi') && (
                <td className="p-2">
                  <button onClick={() => onToggleSelect(3, r.number)}
                    className={`w-10 h-10 rounded-lg border-2 font-bold transition-all ${
                      selection[3].includes(r.number) ? 'bg-amber-500 border-amber-500 text-white shadow-lg scale-105' : 'bg-white border-slate-200 text-slate-300 hover:border-slate-400 hover:text-slate-400'
                    }`}
                  >
                    {r.number}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
