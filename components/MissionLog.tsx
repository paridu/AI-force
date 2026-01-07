
import React from 'react';
import { Mission } from '../types';

interface Props {
  missions: Mission[];
}

const MissionLog: React.FC<Props> = ({ missions }) => {
  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      {missions.length === 0 && <p className="text-slate-500 text-xs text-center py-10 italic">No active operations.</p>}
      {missions.map(m => (
        <div key={m.id} className="bg-slate-900 border border-slate-800 p-3 rounded relative overflow-hidden">
          {m.status === 'active' && (
             <div className="absolute top-0 left-0 w-full h-0.5 bg-amber-500 animate-pulse" />
          )}
          <div className="flex justify-between items-center mb-1">
            <span className={`text-[10px] font-bold px-1 rounded uppercase ${m.priority === 'critical' ? 'bg-red-900 text-red-200' : 'bg-blue-900 text-blue-200'}`}>
              {m.priority}
            </span>
            <span className="text-[10px] text-slate-500 mono">ID: {m.id.split('-')[1]}</span>
          </div>
          <h4 className="text-xs font-semibold text-slate-200">{m.objective}</h4>
          <p className="text-[10px] text-emerald-400 mt-1 uppercase font-bold tracking-widest">{m.assignedUnit}</p>
          {m.report && <p className="text-[10px] text-slate-400 mt-2 border-t border-slate-800 pt-1 italic">{m.report}</p>}
          <div className="mt-2 flex justify-end">
             <span className={`text-[10px] uppercase font-bold ${m.status === 'success' ? 'text-green-500' : 'text-amber-500'}`}>
               {m.status}
             </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MissionLog;
