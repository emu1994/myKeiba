import React, { useState, useMemo } from 'react';
import { ArrowLeft, Star, ShoppingCart, Plus, Minus, Trash2, TrendingUp, Play } from 'lucide-react';
import { TICKET_TYPES, BET_METHODS } from '../constants';
import { getTicketOdds } from '../utils';
import BetCart from './BetCart';
import BetAmountSelector from './BetAmountSelector';
import RunnerTable from './RunnerTable';

export default function BettingScreen({ 
  currentRace, 
  betCart, 
  balance,
  onBack, 
  onAddToCart, 
  onRemoveFromCart, 
  onStartRace 
}) {
  const [activeMethod, setActiveMethod] = useState('normal');
  const [selectedType, setSelectedType] = useState(TICKET_TYPES[0]);
  const [selection, setSelection] = useState({ 1: [], 2: [], 3: [] });
  const [betAmount, setBetAmount] = useState(100);

  const toggleSelect = (tier, num) => {
    setSelection(prev => {
      const current = prev[tier];
      const next = current.includes(num) ? current.filter(n => n !== num) : [...current, num];
      return { ...prev, [tier]: next };
    });
  };

  const combinations = useMemo(() => {
    const s1 = selection[1], s2 = selection[2], s3 = selection[3];
    const res = [];
    if (activeMethod === 'normal') {
      if (selectedType.id === 'single' || selectedType.id === 'place') s1.forEach(n => res.push([n]));
      else if (selectedType.min === 2 && s1.length && s2.length) {
          for (let a of s1) for (let b of s2) if (a !== b) res.push([a, b]);
      } else if (selectedType.min === 3 && s1.length && s2.length && s3.length) {
          for (let a of s1) for (let b of s2) for (let c of s3) if (a !== b && b !== c && a !== c) res.push([a, b, c]);
      }
    } else if (activeMethod === 'box') {
      if (s1.length >= selectedType.min) {
        const combo = (arr, k) => {
          const results = [];
          const helper = (start, curr) => {
            if (curr.length === k) { results.push([...curr]); return; }
            for (let i = start; i < arr.length; i++) { curr.push(arr[i]); helper(i + 1, curr); curr.pop(); }
          };
          helper(0, []);
          return results;
        };
        const permute = (arr, k) => {
          const results = [];
          const helper = (curr) => {
            if (curr.length === k) { results.push([...curr]); return; }
            for (let i = 0; i < arr.length; i++) { if (!curr.includes(arr[i])) { curr.push(arr[i]); helper(curr); curr.pop(); } }
          };
          helper([]);
          return results;
        };
        return (selectedType.id === 'umatan' || selectedType.id === 'tierce') ? permute(s1, selectedType.min) : combo(s1, selectedType.min);
      }
    } else if (activeMethod === 'nagashi') {
      if (s1.length === 1 && s2.length > 0) {
        if (selectedType.min === 2) {
          for (let b of s2) if (s1[0] !== b) res.push([s1[0], b]);
        } else if (selectedType.min === 3 && s2.length >= 2) {
          for (let i = 0; i < s2.length; i++) {
            for (let j = i + 1; j < s2.length; j++) {
              if (s1[0] !== s2[i] && s1[0] !== s2[j]) res.push([s1[0], s2[i], s2[j]]);
            }
          }
        }
      }
    } else if (activeMethod === 'formation') {
      if (selectedType.min === 2 && s1.length && s2.length) {
        for (let a of s1) for (let b of s2) if (a !== b) res.push([a, b]);
      } else if (selectedType.min === 3 && s1.length && s2.length && s3.length) {
        for (let a of s1) for (let b of s2) for (let c of s3) if (a !== b && b !== c && a !== c) res.push([a, b, c]);
      }
    }
    return res;
  }, [activeMethod, selectedType, selection]);

  const handleAddToCart = () => {
    const tickets = combinations.map(nums => ({
      type: selectedType.id,
      typeName: selectedType.name,
      numbers: nums,
      odds: getTicketOdds(selectedType.id, nums, currentRace.runners, TICKET_TYPES),
      amount: betAmount
    }));
    if (onAddToCart(tickets)) setSelection({ 1: [], 2: [], 3: [] });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 flex flex-col lg:flex-row gap-6 animate-in fade-in">
      <div className="flex-1 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="bg-slate-800 text-white p-4 flex items-center justify-between">
            <button onClick={onBack} className="text-sm flex items-center gap-1 opacity-70 hover:opacity-100">
              <ArrowLeft size={16} /> 戻る
            </button>
            <div className="font-bold">第{currentRace.id}R - 投票パネル</div>
            <div className="w-10"></div>
          </div>

          <div className="p-4 border-b bg-slate-50 flex gap-2 overflow-x-auto no-scrollbar">
            {TICKET_TYPES.map(t => (
              <button key={t.id} onClick={() => { setSelectedType(t); setSelection({ 1: [], 2: [], 3: [] }); }}
                className={`px-4 py-2 rounded-full text-xs font-bold border whitespace-nowrap transition-all ${
                  selectedType.id === t.id ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' : 'bg-white text-slate-600'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          <div className="p-4 border-b flex gap-4">
            {BET_METHODS.map(m => (
              <button key={m.id} disabled={(selectedType.id === 'single' || selectedType.id === 'place') && m.id !== 'normal'}
                onClick={() => { setActiveMethod(m.id); setSelection({ 1: [], 2: [], 3: [] }); }}
                className={`flex-1 py-2 text-sm font-bold border-b-2 transition-all disabled:opacity-30 ${
                  activeMethod === m.id ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-400'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>

          <RunnerTable
            runners={currentRace.runners}
            selectedType={selectedType}
            activeMethod={activeMethod}
            selection={selection}
            onToggleSelect={toggleSelect}
          />
        </div>
      </div>

      <div className="w-full lg:w-96 flex flex-col gap-4">
        <BetAmountSelector
          betAmount={betAmount}
          onBetAmountChange={setBetAmount}
          combinations={combinations}
          balance={balance}
          onAddToCart={handleAddToCart}
        />

        <BetCart
          betCart={betCart}
          onRemoveFromCart={onRemoveFromCart}
          onStartRace={onStartRace}
        />
      </div>
    </div>
  );
}
