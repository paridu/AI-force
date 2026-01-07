
import React from 'react';
import { BusinessInstance } from '../types';

interface Props {
  businesses: BusinessInstance[];
}

const StrategicMap: React.FC<Props> = ({ businesses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {businesses.map(b => (
        <div key={b.id} className={`p-3 rounded border ${b.status === 'killed' ? 'border-red-900 opacity-50' : 'border-emerald-800 bg-emerald-950/20'}`}>
          <div className="flex justify-between items-center mb-2">
             <h4 className="text-xs font-bold text-slate-100 uppercase truncate">{b.name}</h4>
             <span className={`text-[9px] font-bold px-1 rounded uppercase ${b.status === 'killed' ? 'bg-red-900 text-red-200' : 'bg-emerald-900 text-emerald-200'}`}>
                {b.status}
             </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-500">Revenue</span>
              <span className="text-emerald-400 font-bold">${b.revenue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-500">Mode</span>
              <span className="text-blue-400 uppercase">{b.mode}</span>
            </div>
            <div className="w-full bg-slate-800 h-1 mt-2 rounded-full overflow-hidden">
               <div 
                 className={`h-full ${b.fitness > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} 
                 style={{ width: `${Math.min(100, Math.max(0, b.fitness * 20 + 50))}%` }} 
               />
            </div>
          </div>
        </div>
      ))}
      {businesses.length === 0 && (
        <div className="col-span-full border-2 border-dashed border-slate-800 h-24 flex items-center justify-center rounded">
          <p className="text-slate-600 text-xs italic">No active business sectors detected.</p>
        </div>
      )}
    </div>
  );
};

export default StrategicMap;
