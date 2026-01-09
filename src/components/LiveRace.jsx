import React, { useState, useEffect, useRef } from 'react';
import { Timer } from 'lucide-react';

export default function LiveRace({ currentRace, onFinish }) {
  const [horseProgress, setHorseProgress] = useState(
    currentRace.runners.map(r => ({
      ...r,
      pos: 0,
      baseSpeed: (r.ability / 100) * 0.0022,
      variance: (Math.random() * 0.0005) - 0.00025
    }))
  );
  const frameRef = useRef();

  useEffect(() => {
    const duration = 12000; 
    const start = Date.now();
    let finished = false;
    
    const update = () => {
      if (finished) return;
      
      const elapsed = Date.now() - start;
      const p = Math.min(1, elapsed / duration);
      
      setHorseProgress(prev => {
        const updated = prev.map(hp => {
          const frameSpeed = hp.baseSpeed + hp.variance;
          const spurt = p > 0.75 ? (hp.baseSpeed * 2.5) : 0;
          let nextPos = hp.pos + frameSpeed + spurt;
          nextPos = p < 0.98 ? Math.min(0.98, nextPos) : Math.min(1.0, nextPos);
          return { ...hp, pos: nextPos };
        });
        
        if (p >= 1 && !finished) {
          finished = true;
          setTimeout(() => {
            const finalResults = [...updated].sort((a, b) => b.pos - a.pos);
            onFinish(finalResults);
          }, 1200);
        }
        
        return updated;
      });
      
      if (p < 1 && !finished) {
        frameRef.current = requestAnimationFrame(update);
      }
    };
    
    frameRef.current = requestAnimationFrame(update);
    return () => {
      finished = true;
      cancelAnimationFrame(frameRef.current);
    };
  }, [onFinish]);

  const sortedHorses = [...horseProgress].sort((a, b) => b.pos - a.pos);

  return (
    <div className="max-w-4xl mx-auto p-4 animate-in fade-in">
      <div className="bg-emerald-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden border-8 border-slate-700">
        <div className="relative h-[440px] bg-emerald-800 rounded-xl p-4 flex flex-col justify-between border-y-2 border-emerald-700/50">
          {horseProgress.map((hp) => (
            <div key={hp.number} className="relative h-6 flex items-center border-b border-emerald-700/30 last:border-0">
              <div className="absolute transition-all duration-150 ease-out flex items-center gap-2" style={{ left: `${hp.pos * 88}%` }}>
                <div className={`text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold text-white bg-slate-900 border border-white/20`}>{hp.number}</div>
                <span className="text-3xl drop-shadow-lg filter transition-transform duration-500 ease-out" style={{ transform: `scale(${1 + (hp.pos * 0.1)})` }}>{hp.emoji}</span>
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
                  <span className={`text-xs font-black italic ${i === 0 ? 'text-yellow-400' : 'text-slate-300'}`}>{i+1}st</span>
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
  );
}
