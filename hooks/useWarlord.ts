
import { useState, useCallback } from 'react';
import { GlobalState, Mission, Threat, BusinessInstance, CombatMode, Priority, SwarmPerspective, Communication } from '../types';
import { INITIAL_TACTICAL_UNITS } from '../constants';
import { geminiService } from '../services/geminiService';

export const useWarlord = () => {
  const [state, setState] = useState<GlobalState>({
    warChest: 100000,
    activeMissions: [],
    threats: [],
    tacticalUnits: INITIAL_TACTICAL_UNITS,
    businesses: [],
    log: ["ระบบเริ่มต้นทำงาน... รอรับคำสั่งจากกองบัญชาการสูงสุด"],
    communications: [],
    currentMode: "siege",
    isLocalized: true
  });

  const [lastPerspectives, setLastPerspectives] = useState<SwarmPerspective[]>([]);

  const addLog = (msg: string) => {
    setState(prev => ({ ...prev, log: [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.log].slice(0, 50) }));
  };

  const addCommunication = (comm: Communication) => {
    setState(prev => ({ ...prev, communications: [comm, ...prev.communications].slice(0, 10) }));
    
    // Auto-decipher after a delay
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        communications: prev.communications.map(c => 
          c.id === comm.id ? { ...c, isDeciphering: false } : c
        )
      }));
    }, 2000);
  };

  const triggerAgentTalk = async (unitName: string, objective: string) => {
    const agents = ["CTO Agent", "Growth Agent", "Finance Agent", "Security Agent", "UX Research Agent"];
    const sender = agents[Math.floor(Math.random() * agents.length)];
    const receiver = unitName;
    
    // Simulate encryption by generating a random hex string or base64
    const encrypted = btoa(Math.random().toString(36).substring(7) + objective).substring(0, 32);
    
    const comm: Communication = {
      id: `comm-${Date.now()}`,
      sender,
      receiver,
      timestamp: Date.now(),
      payload: encrypted,
      decrypted: state.isLocalized 
        ? `ยืนยันข้อมูลเป้าหมาย: กำลังประสานงานทรัพยากรสำหรับ ${objective}`
        : `Target intel confirmed: Syncing resources for ${objective}`,
      isDeciphering: true
    };
    
    addCommunication(comm);
  };

  const setCombatMode = (mode: CombatMode) => {
    setState(prev => ({ ...prev, currentMode: mode }));
    addLog(`เปลี่ยนโหมดการรบเป็น: ${mode.toUpperCase()}`);
    
    // Trigger a mode-specific comms broadcast
    addCommunication({
      id: `comm-broadcast-${Date.now()}`,
      sender: "Supreme Commander",
      receiver: "ALL_UNITS",
      timestamp: Date.now(),
      payload: "S0hJR0hfQUxFUlRfTU9ERV9BQ1RJVkFURUQ=",
      decrypted: state.isLocalized 
        ? `คำสั่งกองบัญชาการ: ปรับรูปแบบการรบเป็น ${mode.toUpperCase()} ทุกหน่วยเตรียมพร้อม`
        : `Command Order: Tactical shift to ${mode.toUpperCase()}. All units on high alert.`,
      isDeciphering: true
    });
  };

  const toggleLanguage = () => {
    setState(prev => ({ ...prev, isLocalized: !prev.isLocalized }));
  };

  const deployMission = useCallback(async (objective: string, priority: Priority) => {
    addLog(`กำลังวิเคราะห์ภารกิจ: ${objective}`);
    try {
      const plan = await geminiService.analyzeMission(objective);
      setLastPerspectives(plan.perspectives);
      
      const missionId = `mission-${Date.now()}`;
      const newMission: Mission = {
        id: missionId,
        objective,
        priority,
        assignedUnit: plan.unit,
        deadline: Date.now() + 3600000,
        status: "active"
      };

      setState(prev => ({
        ...prev,
        activeMissions: [newMission, ...prev.activeMissions],
        tacticalUnits: prev.tacticalUnits.map(u => 
          u.unitName === plan.unit ? { ...u, status: "combat" } : u
        )
      }));

      // Trigger neural comms during mission start
      triggerAgentTalk(plan.unit, objective);

      setTimeout(() => {
        setState(prev => ({
          ...prev,
          activeMissions: prev.activeMissions.map(m => 
            m.id === missionId ? { ...m, status: "success", report: state.isLocalized ? `รายงานผล: ${plan.criteria}` : `Report: ${plan.criteria}` } : m
          ),
          tacticalUnits: prev.tacticalUnits.map(u => 
            u.unitName === plan.unit ? { ...u, status: "standby" } : u
          ),
          warChest: prev.warChest + (priority === 'critical' ? 25000 : 5000)
        }));
        addLog(`ภารกิจ "${objective}" สำเร็จโดยหน่วย ${plan.unit}`);
      }, 6000);

    } catch (err) {
      addLog(`การส่งหน่วยรบขัดข้อง: ${err}`);
    }
  }, [state.isLocalized]);

  const runBlackOps = useCallback(async () => {
    addLog("เปิดใช้ปฏิบัติการลับ (Black Ops Revenue)...");
    
    addCommunication({
      id: `comm-blackops-${Date.now()}`,
      sender: "Optimizer Agent",
      receiver: "Black Ops Unit",
      timestamp: Date.now(),
      payload: "WkVST19GT09UUFJJTlRfT1BFUkFUSU9OX0VOQUJMRUQ=",
      decrypted: state.isLocalized 
        ? "เปิดใช้งานโปรโตคอลการทำกำไรแบบไร้เงา ห้ามทิ้งร่องรอย"
        : "Shadow profit protocol enabled. Leave no trace.",
      isDeciphering: true
    });

    setState(prev => ({
      ...prev,
      tacticalUnits: prev.tacticalUnits.map(u => 
        u.unitName === "Black Ops Revenue Unit" ? { ...u, status: "deployed" } : u
      )
    }));

    setTimeout(() => {
      const profit = Math.floor(Math.random() * 50000) + 10000;
      setState(prev => ({
        ...prev,
        warChest: prev.warChest + profit,
        tacticalUnits: prev.tacticalUnits.map(u => 
          u.unitName === "Black Ops Revenue Unit" ? { ...u, status: "standby" } : u
        )
      }));
      addLog(`ปฏิบัติการลับสำเร็จ! สร้างรายได้ $${profit.toLocaleString()} เข้าคลังแสง`);
    }, 4000);
  }, [state.isLocalized]);

  const runEvolutionaryWarfare = useCallback(async () => {
    addLog("เริ่มการคัดสรรทางธุรกิจ (Darwinian Selection)...");
    try {
      const idea = await geminiService.generateGuerrillaIdea();
      const newBiz: BusinessInstance = {
        id: `biz-${Date.now()}`,
        name: idea.name,
        goal: idea.goal,
        mode: state.currentMode,
        revenue: Math.random() * 10000,
        cost: Math.random() * 4000,
        status: "active",
        fitness: 0
      };

      setState(prev => ({
        ...prev,
        businesses: [newBiz, ...prev.businesses]
      }));

      setTimeout(() => {
        setState(prev => ({
          ...prev,
          businesses: prev.businesses.map(b => ({
            ...b,
            fitness: (b.revenue - b.cost) / (b.cost || 1),
            status: b.revenue > b.cost ? "active" : "killed"
          }))
        }));
        addLog("วิวัฒนาการเสร็จสิ้น: ปิดหน่วยธุรกิจที่ไร้ประสิทธิภาพ");
      }, 7000);
    } catch (err) {
      addLog("วิวัฒนาการล้มเหลว");
    }
  }, [state.currentMode]);

  const scanThreats = useCallback(async () => {
    addLog("กำลังแสกนสัญญาณรบกวนในตลาด...");
    try {
      const newThreats = await geminiService.scanThreats();
      setState(prev => ({ ...prev, threats: newThreats }));
      newThreats.forEach(t => addLog(`พบภัยคุกคาม: ${t.description}`));
    } catch (err) {
      addLog("เครื่องแสกนขัดข้อง");
    }
  }, []);

  const resolveThreat = (id: string) => {
    setState(prev => ({
      ...prev,
      threats: prev.threats.filter(t => t.id !== id),
      warChest: prev.warChest - 5000
    }));
    addLog("ตอบโต้ภัยคุกคามเรียบร้อยแล้ว");
  };

  return { 
    state, 
    deployMission, 
    runEvolutionaryWarfare, 
    scanThreats, 
    resolveThreat, 
    setCombatMode, 
    runBlackOps, 
    lastPerspectives,
    toggleLanguage
  };
};
