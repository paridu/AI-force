
import React from 'react';
import { Communication } from '../types';

interface Props {
  comms: Communication[];
  lang: 'en' | 'th';
}

const CommsMatrix: React.FC<Props> = ({ comms, lang }) => {
  return (
    <div className="space-y-4">
      {comms.length === 0 && (
        <div className="h-full flex items-center justify-center py-10 opacity-20 italic text-[10px] uppercase tracking-[0.4em]">
          No active transmissions
        </div>
      )}
      {comms.map((c) => (
        <div key={c.id} className="border border-slate-800 bg-slate-900/40 p-3 rounded-sm font-mono text-[10px] relative overflow-hidden group">
          <div className="flex justify-between items-center mb-2 border-b border-slate-800 pb-1">
            <div className="flex items-center gap-2">
              <span className="text-blue-500 font-bold">{c.sender}</span>
              <span className="text-slate-600">→</span>
              <span className="text-emerald-500 font-bold">{c.receiver}</span>
            </div>
            <span className="text-slate-600 text-[8px]">{new Date(c.timestamp).toLocaleTimeString()}</span>
          </div>

          <div className="space-y-1">
            <div className="flex gap-2 text-slate-500">
              <span className="text-blue-900 font-black">ENC:</span>
              <span className="truncate max-w-[200px] blur-[1px] group-hover:blur-none transition-all">{c.payload}</span>
            </div>
            
            <div className="flex gap-2">
              <span className="text-emerald-900 font-black">DEC:</span>
              {c.isDeciphering ? (
                <span className="text-amber-500 animate-pulse">
                  {lang === 'th' ? 'กำลังถอดรหัสควอนตัม...' : 'DECIPHERING QUANTUM PACKET...'}
                </span>
              ) : (
                <span className="text-slate-300 leading-relaxed italic">{c.decrypted}</span>
              )}
            </div>
          </div>
          
          <div className="absolute -right-4 -bottom-4 w-12 h-12 border border-slate-700/20 rotate-45 pointer-events-none"></div>
        </div>
      ))}
    </div>
  );
};

export default CommsMatrix;
