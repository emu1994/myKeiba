import React, { useState, useMemo, useEffect } from 'react';
import { DEFAULT_INITIAL_BALANCE, DEFAULT_RACE_COUNT } from './constants';
import { generateRaces } from './utils';
import GameSettings from './components/GameSettings';
import Lobby from './components/Lobby';
import BettingScreen from './components/BettingScreen';
import LiveRace from './components/LiveRace';
import ResultScreen from './components/ResultScreen';
import GameOver from './components/GameOver';
import GameClear from './components/GameClear';

export default function App() {
  const [gameState, setGameState] = useState('settings');
  const [initialBalance, setInitialBalance] = useState(DEFAULT_INITIAL_BALANCE);
  const [raceCount, setRaceCount] = useState(DEFAULT_RACE_COUNT);
  const [balance, setBalance] = useState(DEFAULT_INITIAL_BALANCE);
  const [currentRaceId, setCurrentRaceId] = useState(null);
  const [races, setRaces] = useState([]);
  const [betCart, setBetCart] = useState([]);
  const [history, setHistory] = useState([]);

  const currentRace = useMemo(() => races.find(r => r.id === currentRaceId), [races, currentRaceId]);

  // ゲームオーバー/クリア判定
  useEffect(() => {
    if (gameState === 'lobby' || gameState === 'result') {
      // 所持金が0になったらゲームオーバー
      if (balance <= 0) {
        setGameState('gameOver');
        return;
      }

      // 全レース終了かつ初期所持金より多い場合、ゲームクリア
      const allRacesFinished = races.length > 0 && races.every(r => r.status === 'finished');
      if (allRacesFinished && balance > initialBalance) {
        setGameState('gameClear');
        return;
      }
    }
  }, [balance, races, initialBalance, gameState]);

  const handleGameStart = ({ initialBalance, raceCount }) => {
    setInitialBalance(initialBalance);
    setRaceCount(raceCount);
    setBalance(initialBalance);
    setRaces(generateRaces(raceCount));
    setBetCart([]);
    setHistory([]);
    setCurrentRaceId(null);
    setGameState('lobby');
  };

  const handleStartBetting = (id) => {
    setCurrentRaceId(id);
    setGameState('betting');
    setBetCart([]);
  };

  const addToCart = (tickets) => {
    const totalCost = tickets.reduce((sum, t) => sum + t.amount, 0);
    if (balance < totalCost) return false;
    setBetCart([...betCart, ...tickets]);
    setBalance(prev => prev - totalCost);
    return true;
  };

  const removeFromCart = (index) => {
    const item = betCart[index];
    setBalance(prev => prev + item.amount);
    setBetCart(betCart.filter((_, i) => i !== index));
  };

  const finishRaceResult = (finalResults) => {
    const results = finalResults.slice(0, 3).map(r => r.number);
    let totalPayout = 0;
    
    const ticketResults = betCart.map(ticket => {
      let isWin = false;
      const [r1, r2, r3] = results;
      const t = ticket.numbers;

      switch (ticket.type) {
        case 'single': isWin = r1 === t[0]; break;
        case 'place': isWin = results.includes(t[0]); break;
        case 'umaren': isWin = t.includes(r1) && t.includes(r2); break;
        case 'umatan': isWin = r1 === t[0] && r2 === t[1]; break;
        case 'trio': isWin = t.every(n => results.includes(n)); break;
        case 'tierce': isWin = r1 === t[0] && r2 === t[1] && r3 === t[2]; break;
      }

      const payout = isWin ? Math.floor(ticket.amount * parseFloat(ticket.odds)) : 0;
      totalPayout += payout;
      return { ...ticket, isWin, payout };
    });

    const updatedRaces = races.map(r => 
      r.id === currentRaceId ? { ...r, status: 'finished', results, ticketResults, totalPayout } : r
    );

    setRaces(updatedRaces);
    setBalance(prev => prev + totalPayout);
    setHistory([...history, { raceId: currentRaceId, totalPayout, tickets: ticketResults }]);
    setGameState('result');
  };

  const handleNextFromResult = () => {
    // ゲームオーバー/クリア判定はuseEffectで行われる
    setGameState('lobby');
  };

  const handleRestart = () => {
    setBalance(initialBalance);
    setRaces(generateRaces(raceCount));
    setBetCart([]);
    setHistory([]);
    setCurrentRaceId(null);
    setGameState('lobby');
  };

  const handleBackToSettings = () => {
    setGameState('settings');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-900 select-none">
      {gameState === 'settings' && (
        <GameSettings 
          onStart={handleGameStart}
          defaultBalance={DEFAULT_INITIAL_BALANCE}
          defaultRaceCount={DEFAULT_RACE_COUNT}
        />
      )}
      {gameState === 'lobby' && (
        <Lobby 
          balance={balance}
          races={races}
          onStartBetting={handleStartBetting}
        />
      )}
      {gameState === 'betting' && currentRace && (
        <BettingScreen
          currentRace={currentRace}
          betCart={betCart}
          balance={balance}
          onBack={() => setGameState('lobby')}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          onStartRace={() => setGameState('live')}
        />
      )}
      {gameState === 'live' && currentRace && (
        <LiveRace
          currentRace={currentRace}
          onFinish={finishRaceResult}
        />
      )}
      {gameState === 'result' && currentRace && (
        <ResultScreen
          currentRace={currentRace}
          balance={balance}
          onNext={handleNextFromResult}
        />
      )}
      {gameState === 'gameOver' && (
        <GameOver
          balance={balance}
          onRestart={handleRestart}
          onBackToSettings={handleBackToSettings}
        />
      )}
      {gameState === 'gameClear' && (
        <GameClear
          balance={balance}
          initialBalance={initialBalance}
          profit={balance - initialBalance}
          onRestart={handleRestart}
          onBackToSettings={handleBackToSettings}
        />
      )}
    </div>
  );
}
