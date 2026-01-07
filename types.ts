
export type Rank = "Supreme Commander" | "Theater Commander" | "Operations Chief";

export interface StrategicAgent {
  rank: Rank;
  domain: string;
  authority: number; // 1-10
}

export type UnitStatus = "standby" | "deployed" | "combat" | "retreat";

export interface TacticalUnit {
  unitName: string;
  commandingAgent: string;
  soldiers: string[];
  mission: string;
  status: UnitStatus;
}

export type Priority = "critical" | "high" | "medium" | "low";
export type MissionStatus = "pending" | "active" | "success" | "failed";

export interface Mission {
  id: string;
  objective: string;
  priority: Priority;
  assignedUnit: string;
  deadline: number;
  status: MissionStatus;
  report?: string;
}

export type CombatMode = "stealth" | "blitz" | "siege" | "guerrilla" | "diplomatic";

export interface Threat {
  id: string;
  type: "competitor" | "regulation" | "tech_failure" | "market_crash";
  severity: number; // 1-10
  description: string;
}

export interface BusinessInstance {
  id: string;
  name: string;
  goal: string;
  mode: CombatMode;
  revenue: number;
  cost: number;
  status: "active" | "killed";
  fitness: number;
}

export interface SwarmPerspective {
  agent: string;
  view: string;
}

export interface Communication {
  id: string;
  sender: string;
  receiver: string;
  timestamp: number;
  payload: string; // Encrypted string
  decrypted: string;
  isDeciphering: boolean;
}

export interface GlobalState {
  warChest: number;
  activeMissions: Mission[];
  threats: Threat[];
  tacticalUnits: TacticalUnit[];
  businesses: BusinessInstance[];
  log: string[];
  communications: Communication[];
  currentMode: CombatMode;
  isLocalized: boolean;
}
