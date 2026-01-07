
import { StrategicAgent, TacticalUnit } from './types';

export const STRATEGIC_COMMAND: StrategicAgent[] = [
  {
    rank: "Supreme Commander",
    domain: "Global Vision & Resource Allocation",
    authority: 10
  },
  {
    rank: "Theater Commander", 
    domain: "Market Domination Strategy",
    authority: 9
  },
  {
    rank: "Operations Chief",
    domain: "Execution Coordination",
    authority: 8
  }
];

export const INITIAL_TACTICAL_UNITS: TacticalUnit[] = [
  {
    unitName: "Market Intelligence Unit",
    commandingAgent: "UX Research Agent",
    soldiers: ["Data Agent", "Growth Agent"],
    mission: "Identify high-value targets (pain points, trends)",
    status: "standby"
  },
  {
    unitName: "Build & Deploy Squadron",
    commandingAgent: "CTO Agent",
    soldiers: ["Frontend Agent", "Backend Agent", "DevOps Agent"],
    mission: "Construct revenue-generating assets",
    status: "standby"
  },
  {
    unitName: "Growth Strike Team",
    commandingAgent: "Growth Agent",
    soldiers: ["Marketing Agent", "Sales Agent", "SEO Specialist"],
    mission: "Capture market share aggressively",
    status: "standby"
  },
  {
    unitName: "Perimeter Security Battalion",
    commandingAgent: "Security Agent",
    soldiers: ["Legal Agent", "QA Agent", "Compliance Monitor"],
    mission: "Protect assets, prevent vulnerabilities",
    status: "standby"
  },
  {
    unitName: "Black Ops Revenue Unit",
    commandingAgent: "Optimizer Agent",
    soldiers: ["AI Engineer Agent", "Evolution Agent"],
    mission: "Silent high-margin operations (API, Affiliate, Arbitrage)",
    status: "standby"
  },
  {
    unitName: "Treasury Management",
    commandingAgent: "Finance Agent",
    soldiers: ["Data Agent", "Legal Agent"],
    mission: "Capital allocation, tax optimization",
    status: "standby"
  }
];

export const COMBAT_MODES_DESC: Record<string, { en: string; th: string }> = {
  stealth: { en: "Silent God Mode (Zero footprint)", th: "โหมดล่องหน (ไร้ร่องรอย)" },
  blitz: { en: "High-speed market domination", th: "สายฟ้าแลบ (บุกเร็วรุนแรง)" },
  siege: { en: "Content moat & SEO dominance", th: "การปิดล้อม (เน้นความมั่นคงระยะยาว)" },
  guerrilla: { en: "Distributed micro-experiments", th: "สงครามกองโจร (กระจายจุดเสี่ยง)" },
  diplomatic: { en: "Strategic ecosystem partnerships", th: "การทูต (เน้นพันธมิตรยุทธศาสตร์)" }
};

export const UI_LABELS = {
  warChest: { en: "War Chest", th: "คลังแสง/งบประมาณ" },
  activeMissions: { en: "Active Missions", th: "ปฏิบัติการที่ทำงานอยู่" },
  marketThreats: { en: "Market Threats", th: "ภัยคุกคามตลาด" },
  strategicCommand: { en: "Strategic Command", th: "กองบัญชาการยุทธศาสตร์" },
  tacticalStatus: { en: "Tactical Status", th: "สถานะหน่วยรบ" },
  scanThreats: { en: "Scan for Threats", th: "สแกนหาภัยคุมคาม" },
  launchEvolution: { en: "Launch Evolution Cycle", th: "เริ่มวัฏจักรวิวัฒนาการ" },
  theaterOfOperations: { en: "Theater of Operations", th: "สมรภูมิปฏิบัติการ" },
  dispatch: { en: "Dispatch Mission", th: "สั่งการภารกิจ" },
  blackOps: { en: "Black Ops Mode", th: "ปฏิบัติการลับ" },
  neuralComms: { en: "Neural Comms Matrix", th: "เครือข่ายสื่อสารประสาทเทียม" },
  deciphering: { en: "Deciphering quantum packet...", th: "กำลังถอดรหัสแพ็กเก็ตควอนตัม..." }
};
