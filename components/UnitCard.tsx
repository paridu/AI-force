
import React from 'react';
import { TacticalUnit } from '../types';

interface Props {
  unit: TacticalUnit;
}

const UnitCard: React.FC<Props> = ({ unit }) => {
  const getStatusColor = () => {
    switch (unit.status) {
      case 'combat': return 'text-red-500 border-red-500 bg-red-500/10 animate-pulse';
      case 'deployed': return 'text-amber-500 border-amber-500 bg-amber-500/10';
      case 'retreat': return 'text-purple-500 border-purple-500 bg-purple-500/10';
      default: return 'text-emerald-500 border-emerald-500 bg-emerald-500/10';
    }
  };

  return (
    <div className={`border-l-4 p-3 rounded-r-lg transition-all ${getStatusColor()} border mb-2 shadow-lg`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-sm tracking-tighter uppercase">{unit.unitName}</h3>
          <p className="text-[10px] opacity-70">Cmd: {unit.commandingAgent}</p>
        </div>
        <span className="text-[10px] font-bold px-1.5 py-0.5 border border-current rounded uppercase">
          {unit.status}
        </span>
      </div>
      <div className="mt-2">
        <div className="flex flex-wrap gap-1">
          {unit.soldiers.map(s => (
            <span key={s} className="text-[9px] bg-slate-800 text-slate-400 px-1 rounded">
              {s}
            </span>
          ))}
        </div>
        <p className="text-[10px] mt-2 italic text-slate-300 truncate">{unit.mission}</p>
      </div>
    </div>
  );
};

export default UnitCard;
