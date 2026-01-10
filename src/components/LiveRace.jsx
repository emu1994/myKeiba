import React, { useState, useEffect, useRef } from 'react';
import { Timer, Ticket } from 'lucide-react';

export default function LiveRace({ currentRace, betCart = [], onFinish }) {
  const [horseProgress, setHorseProgress] = useState(
    currentRace.runners.map(r => ({
      ...r,
      pos: 0,
      finished: false,
      finishTime: null,
      baseSpeed: (r.ability / 100) * 0.0022,
      variance: (Math.random() * 0.0005) - 0.00025
    }))
  );
  const frameRef = useRef();
  const raceStartTime = useRef(null);
  const finishedCount = useRef(0);

  // デバッグ用：betCartの内容を確認
  console.log('LiveRace betCart:', betCart, 'Length:', betCart?.length);

  useEffect(() => {
    const duration = 12000; 
    raceStartTime.current = Date.now();
    finishedCount.current = 0;
    
    const update = () => {
      const elapsed = Date.now() - raceStartTime.current;
      const p = Math.min(1, elapsed / duration);
      
      setHorseProgress(prev => {
        let hasFinished = false;
        const updated = prev.map(hp => {
          // 既にゴールした馬は更新しない
          if (hp.finished) return hp;
          
          const frameSpeed = hp.baseSpeed + hp.variance;
          const spurt = p > 0.75 ? (hp.baseSpeed * 2.5) : 0;
          let nextPos = Math.min(1.0, hp.pos + frameSpeed + spurt);
          
          // ゴール判定: pos >= 1.0 または時間が経過した場合
          if (nextPos >= 1.0 || p >= 1.0) {
            nextPos = 1.0;
            if (!hp.finished) {
              finishedCount.current++;
              hasFinished = true;
              return { 
                ...hp, 
                pos: nextPos, 
                finished: true, 
                finishTime: finishedCount.current 
              };
            }
          }
          
          return { ...hp, pos: nextPos };
        });
        
        // 全馬がゴールしたか、時間が経過した場合
        const allFinished = updated.every(hp => hp.finished) || p >= 1.0;
        if (allFinished && finishedCount.current > 0) {
          // ゴール順でソート（finishTimeで、同着の場合はposで）
          const finalResults = [...updated].sort((a, b) => {
            if (a.finished && b.finished) {
              return (a.finishTime || 999) - (b.finishTime || 999);
            }
            if (a.finished) return -1;
            if (b.finished) return 1;
            return b.pos - a.pos;
          });
          
          setTimeout(() => {
            onFinish(finalResults);
          }, 1500);
          return updated;
        }
        
        frameRef.current = requestAnimationFrame(update);
        return updated;
      });
    };
    
    frameRef.current = requestAnimationFrame(update);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [onFinish]);

  // ゴール順でソート（ゴールした馬はfinishTimeで、まだの馬はposで）
  const sortedHorses = [...horseProgress].sort((a, b) => {
    if (a.finished && b.finished) {
      return (a.finishTime || 999) - (b.finishTime || 999);
    }
    if (a.finished) return -1;
    if (b.finished) return 1;
    return b.pos - a.pos;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 flex flex-col lg:flex-row gap-6 animate-in fade-in">
      <div className="flex-1">
        <div className="bg-emerald-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden border-8 border-slate-700">
          <div className="relative h-[440px] bg-emerald-800 rounded-xl p-4 flex flex-col justify-between border-y-2 border-emerald-700/50">
            {horseProgress.map((hp) => (
              <div key={hp.number} className="relative h-6 flex items-center border-b border-emerald-700/30 last:border-0">
                <div className="absolute transition-all duration-150 ease-out flex items-center gap-2" style={{ left: `${Math.min(hp.pos * 88, 88)}%` }}>
                  <div className={`text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold text-white bg-slate-900 border border-white/20 ${hp.finished ? 'ring-2 ring-yellow-400' : ''}`}>
                    {hp.number}
                  </div>
                  <span className="text-3xl drop-shadow-lg filter transition-transform duration-500 ease-out" style={{ transform: `scale(${1 + (hp.pos * 0.1)})` }}>{hp.emoji}</span>
                  {hp.finished && hp.finishTime && (
                    <span className="text-xs font-black text-yellow-400 bg-black/50 px-1 rounded">
                      {hp.finishTime}着
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div className="absolute right-[12%] top-0 bottom-0 w-2 bg-white/20 border-x border-dashed border-white/40 pointer-events-none"></div>
          </div>
          <div className="mt-6 flex justify-between items-end text-white">
            <div className="bg-black/40 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
              <div className="text-[10px] text-emerald-400 font-black mb-1 flex items-center gap-1"><Timer size={12}/> LIVE</div>
              <div className="flex gap-4">
                {sortedHorses.slice(0, 3).map((h, i) => (
                  <div key={h.number} className="flex items-center gap-2">
                    <span className={`text-xs font-black italic ${i === 0 && h.finished ? 'text-yellow-400' : 'text-slate-300'}`}>
                      {i+1}位
                    </span>
                    <span className="font-bold text-sm bg-white/10 px-2 rounded">#{h.number}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-emerald-400 mb-1 tracking-widest uppercase">Now Racing</div>
              <div className="text-xl font-black italic">{currentRace.name}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-80">
        <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl sticky top-4">
          <h3 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest flex items-center gap-2">
            <Ticket size={14} />
            購入馬券
            <span className="bg-emerald-500 text-white px-2 py-0.5 rounded text-[10px]">
              {Array.isArray(betCart) && betCart.length > 0 ? betCart.length : 0}
            </span>
          </h3>
          {Array.isArray(betCart) && betCart.length > 0 ? (
            <>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 no-scrollbar">
                {betCart.map((ticket, i) => (
                  <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <div className="text-[10px] text-emerald-400 font-bold uppercase mb-1">{ticket.typeName}</div>
                    <div className="font-black text-sm tracking-tight mb-2">{ticket.numbers.join(' - ')}</div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">オッズ: {ticket.odds}倍</span>
                      <span className="font-mono font-bold text-emerald-400">¥{ticket.amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-400 font-bold">合計</span>
                  <span className="font-mono font-black text-white">
                    ¥{betCart.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-slate-600 text-center py-10 text-xs italic">
              購入した馬券がありません
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
