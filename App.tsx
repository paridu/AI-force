
import React, { useState } from 'react';
import { useWarlord } from './hooks/useWarlord';
import { STRATEGIC_COMMAND, UI_LABELS, COMBAT_MODES_DESC } from './constants';
import UnitCard from './components/UnitCard';
import MissionLog from './components/MissionLog';
import StrategicMap from './components/StrategicMap';
import CommsMatrix from './components/CommsMatrix';
import { CombatMode } from './types';

const App: React.FC = () => {
  const { 
    state, 
    deployMission, 
    runEvolutionaryWarfare, 
    scanThreats, 
    resolveThreat, 
    setCombatMode, 
    runBlackOps,
    lastPerspectives,
    toggleLanguage 
  } = useWarlord();
  
  const [newMissionText, setNewMissionText] = useState('');
  const [isSwarmThinking, setIsSwarmThinking] = useState(false);
  const lang = state.isLocalized ? 'th' : 'en';

  const handleDeploy = async () => {
    if (!newMissionText.trim()) return;
    setIsSwarmThinking(true);
    await deployMission(newMissionText, 'high');
    setNewMissionText('');
    setIsSwarmThinking(false);
  };

  const combatModes: CombatMode[] = ["stealth", "blitz", "siege", "guerrilla", "diplomatic"];

  return (
    <div className="flex h-screen w-screen bg-[#0a0a0b] text-slate-300 font-sans overflow-hidden">
      {/* Sidebar: Strategic Command */}
      <aside className="w-80 bg-[#0f1115] border-r border-slate-800 flex flex-col p-5 shadow-2xl z-20">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.8)]"></div>
              <h1 className="text-xl font-black tracking-tighter text-slate-100 uppercase italic">AI WARLORD</h1>
            </div>
            <button onClick={toggleLanguage} className="text-[9px] border border-slate-700 px-2 py-0.5 rounded hover:bg-slate-800 uppercase font-bold text-slate-400 transition-colors">
              {state.isLocalized ? 'ENGLISH' : 'ภาษาไทย'}
            </button>
          </div>
          <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">SWARM COMMAND // ALPHA v10.0</p>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-6 scrollbar-hide">
          <section>
             <h2 className="text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-widest flex items-center gap-2">
                <span className="w-1 h-3 bg-blue-500"></span> {UI_LABELS.strategicCommand[lang]}
             </h2>
             <div className="space-y-2">
                {STRATEGIC_COMMAND.map(agent => (
                  <div key={agent.rank} className="bg-slate-900/50 p-2 border border-slate-800 rounded group hover:border-blue-900 transition-colors">
                    <p className="text-[11px] font-bold text-slate-100 uppercase">{agent.rank}</p>
                    <p className="text-[9px] text-slate-500 italic">{agent.domain}</p>
                  </div>
                ))}
             </div>
          </section>

          <section>
             <h2 className="text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-widest flex items-center gap-2">
                <span className="w-1 h-3 bg-red-500"></span> COMBAT MODE
             </h2>
             <div className="grid grid-cols-1 gap-1">
                {combatModes.map(mode => (
                  <button 
                    key={mode}
                    onClick={() => setCombatMode(mode)}
                    className={`text-left px-3 py-2 rounded text-[10px] font-bold uppercase border transition-all ${state.currentMode === mode ? 'bg-red-900 border-red-500 text-white' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}
                  >
                    {mode} <span className="block text-[8px] opacity-60 normal-case font-normal">{COMBAT_MODES_DESC[mode][lang]}</span>
                  </button>
                ))}
             </div>
          </section>

          <section>
             <h2 className="text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-widest flex items-center gap-2">
                <span className="w-1 h-3 bg-emerald-500"></span> {UI_LABELS.tacticalStatus[lang]}
             </h2>
             <div className="space-y-1">
                {state.tacticalUnits.map(unit => (
                  <UnitCard key={unit.unitName} unit={unit} />
                ))}
             </div>
          </section>
        </nav>

        <div className="mt-auto pt-4 border-t border-slate-800">
           <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-bold uppercase text-slate-500">{UI_LABELS.warChest[lang]}</span>
              <span className="text-emerald-400 font-mono font-bold text-lg">${state.warChest.toLocaleString()}</span>
           </div>
           <div className="grid grid-cols-2 gap-2">
             <button 
               onClick={scanThreats}
               className="py-2 bg-slate-900 text-slate-400 border border-slate-700 text-[9px] font-bold uppercase rounded hover:bg-slate-800 transition-colors"
             >
               {UI_LABELS.scanThreats[lang]}
             </button>
             <button 
               onClick={runBlackOps}
               className="py-2 bg-purple-900 text-purple-200 border border-purple-700 text-[9px] font-bold uppercase rounded hover:bg-purple-800 animate-pulse"
             >
               {UI_LABELS.blackOps[lang]}
             </button>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#050505]">
        {/* HUD Overlay */}
        <div className="absolute inset-0 pointer-events-none border-[16px] border-[#0a0a0b] z-10 box-border opacity-50"></div>
        
        {/* Header HUD */}
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-10 bg-[#0a0a0b]/80 backdrop-blur-md z-20">
           <div className="flex gap-12">
              <div className="border-l-2 border-emerald-500 pl-4">
                <p className="text-[9px] text-slate-500 uppercase font-bold mb-0.5 tracking-widest">Global Status</p>
                <p className="text-sm text-emerald-500 font-bold uppercase mono">Systems Optimal</p>
              </div>
              <div className="border-l-2 border-blue-500 pl-4">
                <p className="text-[9px] text-slate-500 uppercase font-bold mb-0.5 tracking-widest">{UI_LABELS.activeMissions[lang]}</p>
                <p className="text-sm text-blue-400 font-bold uppercase mono">{state.activeMissions.filter(m => m.status === 'active').length} Active</p>
              </div>
              <div className="border-l-2 border-red-500 pl-4">
                <p className="text-[9px] text-slate-500 uppercase font-bold mb-0.5 tracking-widest">{UI_LABELS.marketThreats[lang]}</p>
                <p className="text-sm text-red-500 font-bold uppercase mono">{state.threats.length} Tracked</p>
              </div>
           </div>
           
           <button 
             onClick={runEvolutionaryWarfare}
             className="px-6 py-2 bg-blue-600 text-white text-[10px] font-bold uppercase rounded-sm hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400"
           >
             {UI_LABELS.launchEvolution[lang]}
           </button>
        </header>

        {/* Content Body */}
        <div className="flex-1 p-10 overflow-y-auto space-y-10 pb-40 relative z-0 scrollbar-hide">
           {/* Theater of Operations */}
           <section>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{UI_LABELS.theaterOfOperations[lang]}</h2>
                <div className="h-0.5 flex-1 bg-gradient-to-r from-slate-800 to-transparent"></div>
              </div>
              <StrategicMap businesses={state.businesses} />
           </section>

           <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
              {/* Mission Control (Left) */}
              <section className="bg-slate-900/20 border border-slate-800/50 p-6 rounded-lg xl:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">Deployment Log</h2>
                </div>
                <MissionLog missions={state.activeMissions} />
              </section>

              {/* Neural Comms Matrix (Middle) */}
              <section className="bg-slate-900/20 border border-slate-800/50 p-6 rounded-lg xl:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                  <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">{UI_LABELS.neuralComms[lang]}</h2>
                </div>
                <div className="max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                  <CommsMatrix comms={state.communications} lang={lang} />
                </div>
              </section>

              {/* Threat Matrix (Right) */}
              <section className="bg-slate-900/20 border border-slate-800/50 p-6 rounded-lg xl:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">Defense Matrix</h2>
                </div>
                <div className="space-y-3">
                   {state.threats.length === 0 && <p className="text-center py-12 text-slate-600 italic text-[11px] uppercase tracking-widest">No Sector Breaches Detected</p>}
                   {state.threats.map(t => (
                     <div key={t.id} className="bg-red-950/10 border border-red-900/40 p-4 rounded-sm flex justify-between items-center group hover:bg-red-950/20 transition-all">
                        <div>
                          <p className="text-[9px] font-bold text-red-500 uppercase mb-1 tracking-widest">{t.type} [LVL {t.severity}]</p>
                          <p className="text-xs text-slate-100 font-medium">{t.description}</p>
                        </div>
                        <button 
                          onClick={() => resolveThreat(t.id)}
                          className="bg-red-900/50 text-red-100 text-[9px] px-4 py-1.5 rounded-sm border border-red-600 opacity-0 group-hover:opacity-100 transition-all uppercase font-black"
                        >
                          Resolve
                        </button>
                     </div>
                   ))}
                </div>
              </section>
           </div>

           {/* Console Log Terminal */}
           <section className="bg-black/80 border border-slate-800 rounded-lg p-5 mono text-[10px] h-48 overflow-hidden relative shadow-2xl">
              <div className="absolute top-3 right-5 text-[8px] text-slate-600 font-bold uppercase tracking-[0.3em]">Encrypted Data Stream</div>
              <div className="space-y-1 overflow-y-auto h-full scrollbar-hide">
                {state.log.map((entry, i) => (
                  <p key={i} className={`${entry.includes('สำเร็จ') || entry.includes('Black Ops') || entry.includes('วิวัฒนาการ') ? 'text-emerald-500' : entry.includes('พบภัย') ? 'text-red-500' : 'text-slate-500'} border-b border-white/5 pb-1`}>
                    <span className="opacity-30">[{i}]</span> {entry}
                  </p>
                ))}
              </div>
           </section>
        </div>

        {/* Swarm Intelligence Modal Overlay */}
        {isSwarmThinking && (
          <div className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center p-10 backdrop-blur-md">
             <div className="max-w-4xl w-full bg-slate-900 border border-blue-900 p-8 rounded-lg shadow-[0_0_50px_rgba(30,58,138,0.5)]">
                <h3 className="text-xl font-black text-blue-400 uppercase italic mb-8 flex items-center gap-4">
                  <div className="w-2 h-8 bg-blue-600"></div> SWARM CONSENSUS PROTOCOL
                </h3>
                <div className="grid grid-cols-2 gap-6 mb-8">
                   {lastPerspectives.length > 0 ? lastPerspectives.map(p => (
                     <div key={p.agent} className="border border-slate-800 p-4 bg-slate-950/50">
                        <p className="text-[10px] font-black text-blue-500 uppercase mb-2 tracking-widest">[{p.agent}]</p>
                        <p className="text-xs text-slate-300 leading-relaxed italic">"{p.view}"</p>
                     </div>
                   )) : (
                     <div className="col-span-2 text-center py-10">
                        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-xs text-blue-400 font-bold animate-pulse uppercase tracking-[0.2em]">
                          {state.isLocalized ? 'กำลังเชื่อมต่อเครือข่ายประสาทของเอเจนท์...' : 'SYNCHRONIZING AGENT NEURAL NETWORKS...'}
                        </p>
                     </div>
                   )}
                </div>
                <div className="flex justify-end">
                   <div className="text-[10px] text-slate-500 mono">AUTHORIZATION: LEVEL 10 COMMANDER // SEED: {Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                </div>
             </div>
          </div>
        )}

        {/* Command Input Dock */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[700px] max-w-[95vw] z-40">
           <div className="bg-[#0f1115]/90 backdrop-blur-2xl border border-slate-700/50 p-2.5 rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex items-center">
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <input 
                type="text" 
                placeholder={state.isLocalized ? "ป้อนวัตถุประสงค์เชิงยุทธศาสตร์..." : "INPUT STRATEGIC OBJECTIVE..."}
                className="flex-1 bg-transparent border-none outline-none text-xs font-bold px-4 py-3 uppercase tracking-wider text-white placeholder:text-slate-600"
                value={newMissionText}
                onChange={(e) => setNewMissionText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleDeploy()}
                disabled={isSwarmThinking}
              />
              <button 
                onClick={handleDeploy}
                disabled={isSwarmThinking || !newMissionText.trim()}
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-black text-[10px] uppercase tracking-tighter hover:bg-red-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(220,38,38,0.4)]"
              >
                {isSwarmThinking ? (state.isLocalized ? 'กำลังวิเคราะห์...' : 'Synthesizing...') : (state.isLocalized ? 'สั่งการภารกิจ' : 'DISPATCH')}
              </button>
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;
