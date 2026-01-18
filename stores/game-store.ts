import { create } from 'zustand';

export type QuestStatus = 'pending' | 'in-progress' | 'completed';

export interface Quest {
  id: string;
  title: string;
  description: string;
  status: QuestStatus;
  energyCost: number;
  willpowerGain: number;
  flowExpGain: number;
}

export type Title = 'Seeker' | 'Tactician' | 'Architect of Self' | 'Overdrive Master';

export interface GameState {
  // Status bars
  energy: number;
  willpower: number;
  flowExp: number; // 0-100
  
  // Title system
  currentTitle: Title;
  titleProgress: number; // 0-100, resets when title changes
  
  // Global Protocol (Nested Constraint)
  globalProtocol: string;
  protocolDate: string; // Date when protocol was set
  
  // Quests
  quests: Quest[];
  
  // Actions
  setEnergy: (value: number) => void;
  setWillpower: (value: number) => void;
  addFlowExp: (amount: number) => void;
  completeQuest: (questId: string) => void;
  startQuest: (questId: string) => void;
  setGlobalProtocol: (protocol: string) => void;
  updateTitle: () => void;
}

const TITLES: Title[] = ['Seeker', 'Tactician', 'Architect of Self', 'Overdrive Master'];
const TITLE_THRESHOLD = 100; // Flow EXP needed to level up title

export const useGameStore = create<GameState>()((set, get) => ({
      // Initial state
      energy: 100,
      willpower: 50,
      flowExp: 0,
      currentTitle: 'Seeker',
      titleProgress: 0,
      globalProtocol: 'Maintain 100% Truthfulness in Communication',
      protocolDate: new Date().toDateString(),
      quests: [
        {
          id: '1',
          title: 'Morning Reflection',
          description: 'Spend 10 minutes in mindful reflection',
          status: 'pending',
          energyCost: 5,
          willpowerGain: 10,
          flowExpGain: 15,
        },
        {
          id: '2',
          title: 'Deep Work Session',
          description: 'Complete 2 hours of focused work',
          status: 'pending',
          energyCost: 20,
          willpowerGain: 15,
          flowExpGain: 25,
        },
        {
          id: '3',
          title: 'Evening Integration',
          description: 'Review and integrate today\'s learnings',
          status: 'pending',
          energyCost: 10,
          willpowerGain: 20,
          flowExpGain: 20,
        },
      ],

      setEnergy: (value) => set({ energy: Math.max(0, Math.min(100, value)) }),
      
      setWillpower: (value) => set({ willpower: Math.max(0, Math.min(100, value)) }),
      
      addFlowExp: (amount) => {
        const state = get();
        const newFlowExp = Math.min(100, state.flowExp + amount);
        const currentIndex = TITLES.indexOf(state.currentTitle);
        
        // Check if we should level up title
        if (newFlowExp >= TITLE_THRESHOLD && currentIndex < TITLES.length - 1) {
          const nextTitle = TITLES[currentIndex + 1];
          set({
            currentTitle: nextTitle,
            flowExp: 0, // Reset flow exp when title increases
            titleProgress: 0,
          });
        } else {
          // Update flow exp and progress
          set({
            flowExp: newFlowExp,
            titleProgress: newFlowExp,
          });
        }
      },
      
      updateTitle: () => {
        const state = get();
        const currentIndex = TITLES.indexOf(state.currentTitle);
        
        if (currentIndex < TITLES.length - 1 && state.flowExp >= TITLE_THRESHOLD) {
          const nextTitle = TITLES[currentIndex + 1];
          set({
            currentTitle: nextTitle,
            flowExp: 0, // Reset flow exp when title increases
            titleProgress: 0,
          });
        } else {
          // Update title progress
          set({ titleProgress: state.flowExp });
        }
      },
      
      completeQuest: (questId) => {
        const state = get();
        const quest = state.quests.find((q) => q.id === questId);
        
        if (!quest || quest.status !== 'in-progress') return;
        
        // Update quest status
        const updatedQuests = state.quests.map((q) =>
          q.id === questId ? { ...q, status: 'completed' as QuestStatus } : q
        );
        
        // Update stats with small random variations
        const energyChange = -quest.energyCost + (Math.random() * 2 - 1); // ±1 variation
        const willpowerChange = quest.willpowerGain + (Math.random() * 2 - 1); // ±1 variation
        
        set({
          quests: updatedQuests,
          energy: Math.max(0, Math.min(100, state.energy + energyChange)),
          willpower: Math.max(0, Math.min(100, state.willpower + willpowerChange)),
        });
        
        // Add flow exp
        get().addFlowExp(quest.flowExpGain);
      },
      
      startQuest: (questId) => {
        const state = get();
        const updatedQuests = state.quests.map((q) =>
          q.id === questId ? { ...q, status: 'in-progress' as QuestStatus } : q
        );
        set({ quests: updatedQuests });
      },
      
      setGlobalProtocol: (protocol) => {
        set({
          globalProtocol: protocol,
          protocolDate: new Date().toDateString(),
        });
      },
    })
);
