import { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider, useTheme, t } from '@/context/ThemeContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Pause, RotateCcw, Info, Settings, BarChart3, Grid3X3, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Types
type CellType = 'empty' | 'goal' | 'trap' | 'wall' | 'start';
type Action = 0 | 1 | 2 | 3; // up, right, down, left
type Algorithm = 'q-learning' | 'sarsa' | 'expected-sarsa' | 'monte-carlo';
type ExplorationStrategy = 'epsilon-greedy' | 'softmax' | 'greedy';

interface Cell {
  type: CellType;
  reward: number;
}

interface QTable {
  [state: string]: number[];
}

interface EpisodeData {
  episode: number;
  reward: number;
  steps: number;
  avgReward: number;
}

// Algorithm descriptions
const algorithmInfo: Record<Algorithm, { title: string; titleVn: string; description: string; descriptionVn: string }> = {
  'q-learning': {
    title: 'Q-Learning (Off-Policy TD)',
    titleVn: 'Q-Learning (TD Ngoài Chính Sách)',
    description: `Q-Learning is an off-policy temporal difference learning algorithm. It learns the optimal action-value function Q*(s,a) regardless of the policy being followed.

**Update Rule:**
Q(s,a) ← Q(s,a) + α[r + γ·max_a' Q(s',a') - Q(s,a)]

**Key Features:**
• Off-policy: Can learn optimal policy while following exploratory policy
• Uses max over next state actions (optimistic)
• Converges to optimal Q-function under standard conditions
• Can suffer from overestimation bias`,
    descriptionVn: `Q-Learning là thuật toán học temporal difference ngoài chính sách. Nó học hàm giá trị hành động tối ưu Q*(s,a) bất kể chính sách đang được thực hiện.

**Quy Tắc Cập Nhật:**
Q(s,a) ← Q(s,a) + α[r + γ·max_a' Q(s',a') - Q(s,a)]

**Đặc Điểm Chính:**
• Ngoài chính sách: Có thể học chính sách tối ưu trong khi thực hiện chính sách khám phá
• Sử dụng max qua các hành động trạng thái kế tiếp
• Hội tụ đến hàm Q tối ưu
• Có thể bị thiên lệch ước lượng quá mức`
  },
  'sarsa': {
    title: 'SARSA (On-Policy TD)',
    titleVn: 'SARSA (TD Trong Chính Sách)',
    description: `SARSA (State-Action-Reward-State-Action) is an on-policy TD algorithm. It learns Q-values based on the policy it's actually following.

**Update Rule:**
Q(s,a) ← Q(s,a) + α[r + γ·Q(s',a') - Q(s,a)]

**Key Features:**
• On-policy: Learns value of the policy being followed
• Uses actual next action (not max)
• More conservative than Q-Learning
• Safer in risky environments`,
    descriptionVn: `SARSA (State-Action-Reward-State-Action) là thuật toán TD trong chính sách. Nó học giá trị Q dựa trên chính sách đang thực sự được thực hiện.

**Quy Tắc Cập Nhật:**
Q(s,a) ← Q(s,a) + α[r + γ·Q(s',a') - Q(s,a)]

**Đặc Điểm Chính:**
• Trong chính sách: Học giá trị của chính sách đang thực hiện
• Sử dụng hành động kế tiếp thực tế (không phải max)
• Bảo thủ hơn Q-Learning
• An toàn hơn trong môi trường rủi ro`
  },
  'expected-sarsa': {
    title: 'Expected SARSA',
    titleVn: 'Expected SARSA',
    description: `Expected SARSA uses the expected value over all possible next actions instead of a single sampled action.

**Update Rule:**
Q(s,a) ← Q(s,a) + α[r + γ·Σ_a' π(a'|s')Q(s',a') - Q(s,a)]

**Key Features:**
• Lower variance than SARSA
• Can be on-policy or off-policy
• More stable learning
• Often performs better than both Q-Learning and SARSA`,
    descriptionVn: `Expected SARSA sử dụng giá trị kỳ vọng qua tất cả các hành động kế tiếp có thể thay vì một hành động được lấy mẫu.

**Quy Tắc Cập Nhật:**
Q(s,a) ← Q(s,a) + α[r + γ·Σ_a' π(a'|s')Q(s',a') - Q(s,a)]

**Đặc Điểm Chính:**
• Phương sai thấp hơn SARSA
• Có thể trong hoặc ngoài chính sách
• Học ổn định hơn
• Thường hoạt động tốt hơn cả Q-Learning và SARSA`
  },
  'monte-carlo': {
    title: 'Monte Carlo',
    titleVn: 'Monte Carlo',
    description: `Monte Carlo methods learn from complete episodes of experience. They don't bootstrap like TD methods.

**Update Rule:**
Q(s,a) ← Q(s,a) + α[G - Q(s,a)]
where G is the total discounted return from that state-action pair.

**Key Features:**
• Learns from complete episodes only
• Unbiased estimates (high variance)
• No bootstrapping - uses actual returns
• Works well when episodes are short`,
    descriptionVn: `Phương pháp Monte Carlo học từ các episode hoàn chỉnh. Chúng không bootstrap như các phương pháp TD.

**Quy Tắc Cập Nhật:**
Q(s,a) ← Q(s,a) + α[G - Q(s,a)]
trong đó G là tổng return được chiết khấu từ cặp trạng thái-hành động đó.

**Đặc Điểm Chính:**
• Chỉ học từ episode hoàn chỉnh
• Ước lượng không thiên lệch (phương sai cao)
• Không bootstrap - sử dụng return thực tế
• Hoạt động tốt khi episode ngắn`
  }
};

function RLPlaygroundContent() {
  const { theme, language } = useTheme();
  const [gridSize, setGridSize] = useState(5);
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [qTable, setQTable] = useState<QTable>({});
  const [agentPos, setAgentPos] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [algorithm, setAlgorithm] = useState<Algorithm>('q-learning');
  const [explorationStrategy, setExplorationStrategy] = useState<ExplorationStrategy>('epsilon-greedy');
  
  // Parameters
  const [learningRate, setLearningRate] = useState(0.1);
  const [discountFactor, setDiscountFactor] = useState(0.9);
  const [epsilon, setEpsilon] = useState(0.2);
  const [temperature, setTemperature] = useState(1.0);
  const [stepPenalty, setStepPenalty] = useState(-0.1);
  const [goalReward, setGoalReward] = useState(10);
  const [trapPenalty, setTrapPenalty] = useState(-10);
  const [maxSteps, setMaxSteps] = useState(100);
  const [speed, setSpeed] = useState(200);
  const [terminateOnReward, setTerminateOnReward] = useState(true);
  
  // Stats
  const [episode, setEpisode] = useState(0);
  const [totalReward, setTotalReward] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [episodeHistory, setEpisodeHistory] = useState<EpisodeData[]>([]);
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number } | null>(null);
  
  // Display options
  const [cellDisplay, setCellDisplay] = useState<'values' | 'policy' | 'both'>('both');
  
  const runningRef = useRef(false);
  const episodeDataRef = useRef<{ states: string[]; actions: number[]; rewards: number[] }>({ states: [], actions: [], rewards: [] });

  // Initialize grid
  const initGrid = useCallback(() => {
    const newGrid: Cell[][] = [];
    for (let y = 0; y < gridSize; y++) {
      const row: Cell[] = [];
      for (let x = 0; x < gridSize; x++) {
        row.push({ type: 'empty', reward: stepPenalty });
      }
      newGrid.push(row);
    }
    // Set default goal at bottom right
    newGrid[gridSize - 1][gridSize - 1] = { type: 'goal', reward: goalReward };
    // Set default trap
    if (gridSize > 2) {
      newGrid[Math.floor(gridSize / 2)][Math.floor(gridSize / 2)] = { type: 'trap', reward: trapPenalty };
    }
    setGrid(newGrid);
    setAgentPos({ ...startPos });
    initQTable(gridSize);
  }, [gridSize, stepPenalty, goalReward, trapPenalty, startPos]);

  const initQTable = (size: number) => {
    const newQTable: QTable = {};
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        newQTable[`${x},${y}`] = [0, 0, 0, 0]; // up, right, down, left
      }
    }
    setQTable(newQTable);
  };

  useEffect(() => {
    initGrid();
  }, []);

  useEffect(() => {
    if (grid.length > 0) {
      // Update rewards in grid when params change
      const newGrid = grid.map(row => row.map(cell => {
        if (cell.type === 'goal') return { ...cell, reward: goalReward };
        if (cell.type === 'trap') return { ...cell, reward: trapPenalty };
        if (cell.type === 'empty' || cell.type === 'start') return { ...cell, reward: stepPenalty };
        return cell;
      }));
      setGrid(newGrid);
    }
  }, [goalReward, trapPenalty, stepPenalty]);

  // Handle cell click
  const handleCellClick = (x: number, y: number, shiftKey: boolean) => {
    if (isRunning) return;
    
    const newGrid = [...grid.map(row => [...row])];
    
    if (shiftKey) {
      // Set start position
      // Reset old start
      if (grid[startPos.y] && grid[startPos.y][startPos.x]?.type === 'start') {
        newGrid[startPos.y][startPos.x] = { type: 'empty', reward: stepPenalty };
      }
      newGrid[y][x] = { type: 'start', reward: stepPenalty };
      setStartPos({ x, y });
      setAgentPos({ x, y });
    } else {
      // Cycle through cell types
      const types: CellType[] = ['empty', 'goal', 'trap', 'wall'];
      const currentIndex = types.indexOf(newGrid[y][x].type);
      const nextType = types[(currentIndex + 1) % types.length];
      
      let reward = stepPenalty;
      if (nextType === 'goal') reward = goalReward;
      if (nextType === 'trap') reward = trapPenalty;
      if (nextType === 'wall') reward = 0;
      
      newGrid[y][x] = { type: nextType, reward };
    }
    
    setGrid(newGrid);
  };

  // Get action based on exploration strategy
  const selectAction = useCallback((state: string, qValues: number[]): Action => {
    if (explorationStrategy === 'greedy') {
      return qValues.indexOf(Math.max(...qValues)) as Action;
    }
    
    if (explorationStrategy === 'epsilon-greedy') {
      if (Math.random() < epsilon) {
        return Math.floor(Math.random() * 4) as Action;
      }
      return qValues.indexOf(Math.max(...qValues)) as Action;
    }
    
    if (explorationStrategy === 'softmax') {
      const expValues = qValues.map(q => Math.exp(q / temperature));
      const sum = expValues.reduce((a, b) => a + b, 0);
      const probs = expValues.map(e => e / sum);
      
      const r = Math.random();
      let cumSum = 0;
      for (let i = 0; i < probs.length; i++) {
        cumSum += probs[i];
        if (r < cumSum) return i as Action;
      }
      return 3;
    }
    
    return Math.floor(Math.random() * 4) as Action;
  }, [epsilon, temperature, explorationStrategy]);

  // Get action probabilities for Expected SARSA
  const getActionProbs = useCallback((qValues: number[]): number[] => {
    if (explorationStrategy === 'greedy') {
      const maxIdx = qValues.indexOf(Math.max(...qValues));
      return qValues.map((_, i) => i === maxIdx ? 1 : 0);
    }
    
    if (explorationStrategy === 'epsilon-greedy') {
      const maxIdx = qValues.indexOf(Math.max(...qValues));
      return qValues.map((_, i) => {
        if (i === maxIdx) return 1 - epsilon + epsilon / 4;
        return epsilon / 4;
      });
    }
    
    if (explorationStrategy === 'softmax') {
      const expValues = qValues.map(q => Math.exp(q / temperature));
      const sum = expValues.reduce((a, b) => a + b, 0);
      return expValues.map(e => e / sum);
    }
    
    return [0.25, 0.25, 0.25, 0.25];
  }, [epsilon, temperature, explorationStrategy]);

  // Execute action and get next state
  const step = useCallback((pos: { x: number; y: number }, action: Action): { nextPos: { x: number; y: number }; reward: number; done: boolean } => {
    const moves = [
      { dx: 0, dy: -1 }, // up
      { dx: 1, dy: 0 },  // right
      { dx: 0, dy: 1 },  // down
      { dx: -1, dy: 0 }  // left
    ];
    
    const move = moves[action];
    let nextX = pos.x + move.dx;
    let nextY = pos.y + move.dy;
    
    // Check bounds
    if (nextX < 0 || nextX >= gridSize || nextY < 0 || nextY >= gridSize) {
      nextX = pos.x;
      nextY = pos.y;
    }
    
    // Check wall
    if (grid[nextY] && grid[nextY][nextX]?.type === 'wall') {
      nextX = pos.x;
      nextY = pos.y;
    }
    
    const cell = grid[nextY]?.[nextX];
    const reward = cell?.reward ?? stepPenalty;
    const done = terminateOnReward && (cell?.type === 'goal' || cell?.type === 'trap');
    
    return { nextPos: { x: nextX, y: nextY }, reward, done };
  }, [grid, gridSize, stepPenalty, terminateOnReward]);

  // Update Q-table based on algorithm
  const updateQTable = useCallback((state: string, action: number, reward: number, nextState: string, nextAction: number, done: boolean) => {
    setQTable(prevQ => {
      const newQ = { ...prevQ };
      const currentQ = newQ[state]?.[action] ?? 0;
      
      if (algorithm === 'q-learning') {
        const maxNextQ = done ? 0 : Math.max(...(newQ[nextState] ?? [0, 0, 0, 0]));
        newQ[state] = [...(newQ[state] ?? [0, 0, 0, 0])];
        newQ[state][action] = currentQ + learningRate * (reward + discountFactor * maxNextQ - currentQ);
      }
      
      if (algorithm === 'sarsa') {
        const nextQ = done ? 0 : (newQ[nextState]?.[nextAction] ?? 0);
        newQ[state] = [...(newQ[state] ?? [0, 0, 0, 0])];
        newQ[state][action] = currentQ + learningRate * (reward + discountFactor * nextQ - currentQ);
      }
      
      if (algorithm === 'expected-sarsa') {
        const nextQValues = newQ[nextState] ?? [0, 0, 0, 0];
        const probs = getActionProbs(nextQValues);
        const expectedQ = done ? 0 : probs.reduce((sum, p, i) => sum + p * nextQValues[i], 0);
        newQ[state] = [...(newQ[state] ?? [0, 0, 0, 0])];
        newQ[state][action] = currentQ + learningRate * (reward + discountFactor * expectedQ - currentQ);
      }
      
      return newQ;
    });
  }, [algorithm, learningRate, discountFactor, getActionProbs]);

  // Monte Carlo update at end of episode
  const updateMonteCarloQTable = useCallback((episodeData: { states: string[]; actions: number[]; rewards: number[] }) => {
    setQTable(prevQ => {
      const newQ = { ...prevQ };
      let G = 0;
      
      for (let t = episodeData.states.length - 1; t >= 0; t--) {
        G = discountFactor * G + episodeData.rewards[t];
        const state = episodeData.states[t];
        const action = episodeData.actions[t];
        const currentQ = newQ[state]?.[action] ?? 0;
        newQ[state] = [...(newQ[state] ?? [0, 0, 0, 0])];
        newQ[state][action] = currentQ + learningRate * (G - currentQ);
      }
      
      return newQ;
    });
  }, [learningRate, discountFactor]);

  // Run one step
  const runStep = useCallback(async () => {
    if (!runningRef.current) return;
    
    const state = `${agentPos.x},${agentPos.y}`;
    const qValues = qTable[state] ?? [0, 0, 0, 0];
    const action = selectAction(state, qValues);
    const { nextPos, reward, done } = step(agentPos, action);
    const nextState = `${nextPos.x},${nextPos.y}`;
    
    // Store for Monte Carlo
    if (algorithm === 'monte-carlo') {
      episodeDataRef.current.states.push(state);
      episodeDataRef.current.actions.push(action);
      episodeDataRef.current.rewards.push(reward);
    }
    
    // TD update
    if (algorithm !== 'monte-carlo') {
      const nextQValues = qTable[nextState] ?? [0, 0, 0, 0];
      const nextAction = selectAction(nextState, nextQValues);
      updateQTable(state, action, reward, nextState, nextAction, done);
    }
    
    setAgentPos(nextPos);
    setTotalReward(prev => prev + reward);
    setCurrentStep(prev => prev + 1);
    
    if (done || currentStep >= maxSteps - 1) {
      // Episode finished
      if (algorithm === 'monte-carlo') {
        updateMonteCarloQTable(episodeDataRef.current);
      }
      
      const episodeReward = totalReward + reward;
      setEpisodeHistory(prev => {
        const newHistory = [...prev, {
          episode: episode + 1,
          reward: episodeReward,
          steps: currentStep + 1,
          avgReward: prev.length > 0 
            ? (prev.slice(-20).reduce((a, b) => a + b.reward, 0) + episodeReward) / Math.min(prev.length + 1, 21)
            : episodeReward
        }];
        return newHistory.slice(-100); // Keep last 100 episodes
      });
      
      setEpisode(prev => prev + 1);
      setTotalReward(0);
      setCurrentStep(0);
      setAgentPos({ ...startPos });
      episodeDataRef.current = { states: [], actions: [], rewards: [] };
    }
    
    if (runningRef.current) {
      setTimeout(runStep, speed);
    }
  }, [agentPos, qTable, selectAction, step, updateQTable, algorithm, episode, totalReward, currentStep, maxSteps, startPos, speed, updateMonteCarloQTable]);

  // Start/Stop learning
  const toggleLearning = () => {
    if (isRunning) {
      runningRef.current = false;
      setIsRunning(false);
    } else {
      runningRef.current = true;
      setIsRunning(true);
      setTimeout(runStep, speed);
    }
  };

  // Reset
  const resetAlgorithm = () => {
    runningRef.current = false;
    setIsRunning(false);
    initQTable(gridSize);
    setAgentPos({ ...startPos });
    setEpisode(0);
    setTotalReward(0);
    setCurrentStep(0);
    setEpisodeHistory([]);
    episodeDataRef.current = { states: [], actions: [], rewards: [] };
  };

  const resetEnvironment = () => {
    runningRef.current = false;
    setIsRunning(false);
    setStartPos({ x: 0, y: 0 });
    initGrid();
    resetAlgorithm();
  };

  // Get best action for a cell
  const getBestAction = (x: number, y: number): Action => {
    const qValues = qTable[`${x},${y}`] ?? [0, 0, 0, 0];
    return qValues.indexOf(Math.max(...qValues)) as Action;
  };

  // Get Q values for display
  const getQValues = (x: number, y: number) => qTable[`${x},${y}`] ?? [0, 0, 0, 0];

  // Action arrows
  const actionArrows = ['↑', '→', '↓', '←'];

  // Cell color based on max Q value
  const getCellColor = (x: number, y: number): string => {
    const cell = grid[y]?.[x];
    if (!cell) return '';
    if (cell.type === 'wall') return theme === 'dark' ? 'bg-gray-700' : 'bg-gray-400';
    if (cell.type === 'goal') return 'bg-emerald-500/30';
    if (cell.type === 'trap') return 'bg-red-500/30';
    
    const maxQ = Math.max(...getQValues(x, y));
    const minQ = -10;
    const maxQRange = 10;
    const normalized = Math.max(0, Math.min(1, (maxQ - minQ) / (maxQRange - minQ)));
    
    if (normalized > 0.5) {
      return `bg-emerald-500/${Math.round(normalized * 50)}`;
    } else if (normalized < 0.3) {
      return `bg-red-500/${Math.round((1 - normalized) * 30)}`;
    }
    return '';
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Back Link */}
          <Link
            to="/#projects"
            className={`inline-flex items-center gap-2 mb-6 text-base hover:underline ${theme === 'dark' ? 'text-primary' : ''}`}
          >
            <ArrowLeft size={18} />
            {t(language, 'Back to Projects', 'Quay Lại Dự Án')}
          </Link>

          {/* Title */}
          <motion.h1
            className={`text-3xl md:text-4xl font-black mb-2 ${theme === 'dark' ? 'neon-text' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            🎮 {t(language, "RL Grid World Playground", "Sân Chơi RL Grid World")}
          </motion.h1>
          <p className="text-muted-foreground mb-8 text-lg">
            {t(language, 'Interactive reinforcement learning visualization', 'Trực quan hóa học tăng cường tương tác')}
          </p>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Algorithm Settings */}
            <div className={`xl:col-span-3 p-4 border-2 ${theme === 'dark' ? 'border-primary/30 bg-card/50' : 'border-border bg-card'}`}>
              <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
                <Settings size={20} /> {t(language, 'Algorithm Settings', 'Cài Đặt Thuật Toán')}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">{t(language, 'Algorithm', 'Thuật Toán')}:</label>
                  <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value as Algorithm)}
                    className="w-full mt-1 p-2 border rounded bg-background"
                    disabled={isRunning}
                  >
                    <option value="q-learning">Q-Learning</option>
                    <option value="sarsa">SARSA</option>
                    <option value="expected-sarsa">Expected SARSA</option>
                    <option value="monte-carlo">Monte Carlo</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">{t(language, 'Exploration', 'Khám Phá')}:</label>
                  <select
                    value={explorationStrategy}
                    onChange={(e) => setExplorationStrategy(e.target.value as ExplorationStrategy)}
                    className="w-full mt-1 p-2 border rounded bg-background"
                    disabled={isRunning}
                  >
                    <option value="epsilon-greedy">ε-Greedy</option>
                    <option value="softmax">Softmax</option>
                    <option value="greedy">Greedy</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Learning Rate (α): {learningRate.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0.01"
                    max="1"
                    step="0.01"
                    value={learningRate}
                    onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Discount Factor (γ): {discountFactor.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={discountFactor}
                    onChange={(e) => setDiscountFactor(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                {explorationStrategy === 'epsilon-greedy' && (
                  <div>
                    <label className="text-sm font-medium">Epsilon (ε): {epsilon.toFixed(2)}</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={epsilon}
                      onChange={(e) => setEpsilon(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                )}
                
                {explorationStrategy === 'softmax' && (
                  <div>
                    <label className="text-sm font-medium">Temperature (β): {temperature.toFixed(2)}</label>
                    <input
                      type="range"
                      min="0.1"
                      max="5"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                )}
                
                <button
                  onClick={resetAlgorithm}
                  disabled={isRunning}
                  className={`w-full py-2 border-2 font-bold transition-colors ${theme === 'dark' ? 'border-primary hover:bg-primary/20' : 'border-foreground hover:bg-muted'} disabled:opacity-50`}
                >
                  <RotateCcw size={16} className="inline mr-2" />
                  {t(language, 'Reset Algorithm', 'Đặt Lại Thuật Toán')}
                </button>
              </div>
            </div>

            {/* Grid and Controls */}
            <div className="xl:col-span-6 space-y-4">
              {/* Interactive Grid */}
              <div className={`p-4 border-2 ${theme === 'dark' ? 'border-primary/30 bg-card/50' : 'border-border bg-card'}`}>
                <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
                  <Grid3X3 size={20} /> {t(language, 'Interactive Simulation', 'Mô Phỏng Tương Tác')}
                </h3>
                
                <div className="flex justify-center mb-4">
                  <div 
                    className="grid gap-1"
                    style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
                  >
                    {grid.map((row, y) =>
                      row.map((cell, x) => {
                        const isAgent = agentPos.x === x && agentPos.y === y;
                        const isStart = startPos.x === x && startPos.y === y;
                        const qValues = getQValues(x, y);
                        const bestAction = getBestAction(x, y);
                        
                        return (
                          <div
                            key={`${x}-${y}`}
                            onClick={(e) => handleCellClick(x, y, e.shiftKey)}
                            onMouseEnter={() => setHoveredCell({ x, y })}
                            onMouseLeave={() => setHoveredCell(null)}
                            className={`
                              w-16 h-16 border relative cursor-pointer transition-all
                              flex items-center justify-center
                              ${theme === 'dark' ? 'border-primary/20 hover:border-primary/50' : 'border-border hover:border-foreground'}
                              ${getCellColor(x, y)}
                              ${isAgent ? 'ring-2 ring-yellow-400' : ''}
                            `}
                          >
                            {/* Cell content */}
                            {cell.type === 'goal' && <span className="text-2xl">💎</span>}
                            {cell.type === 'trap' && <span className="text-2xl">☠️</span>}
                            {cell.type === 'wall' && <span className="text-2xl">🧱</span>}
                            {isStart && cell.type === 'empty' && <span className="text-lg opacity-50">🏠</span>}
                            {isAgent && <span className="text-2xl absolute">🤖</span>}
                            
                            {/* Q-values or Policy display */}
                            {cell.type !== 'wall' && (cellDisplay === 'policy' || cellDisplay === 'both') && (
                              <span className={`absolute text-lg font-bold ${theme === 'dark' ? 'text-primary' : 'text-foreground'}`}>
                                {actionArrows[bestAction]}
                              </span>
                            )}
                            
                            {/* Q-value corners */}
                            {cell.type !== 'wall' && cellDisplay === 'both' && (
                              <>
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[8px]">{qValues[0].toFixed(1)}</span>
                                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[8px]">{qValues[1].toFixed(1)}</span>
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[8px]">{qValues[2].toFixed(1)}</span>
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[8px]">{qValues[3].toFixed(1)}</span>
                              </>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground text-center mb-4">
                  {t(language, 
                    'Click to cycle (💎/☠️/🧱/empty). Shift+Click to set start 🏠', 
                    'Click để chuyển đổi (💎/☠️/🧱/trống). Shift+Click để đặt điểm bắt đầu 🏠'
                  )}
                </p>
                
                {/* Controls */}
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={toggleLearning}
                    className={`px-6 py-2 font-bold transition-colors ${
                      isRunning 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : theme === 'dark' 
                          ? 'bg-primary hover:bg-primary/80 text-primary-foreground' 
                          : 'bg-foreground hover:bg-foreground/80 text-background'
                    }`}
                  >
                    {isRunning ? <><Pause size={16} className="inline mr-2" />{t(language, 'Stop', 'Dừng')}</> 
                              : <><Play size={16} className="inline mr-2" />{t(language, 'Start Learning', 'Bắt Đầu Học')}</>}
                  </button>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-4 gap-2 mt-4 text-center">
                  <div className={`p-2 border ${theme === 'dark' ? 'border-primary/30' : 'border-border'}`}>
                    <div className="text-xs text-muted-foreground">Episode</div>
                    <div className="text-lg font-mono font-bold">{episode}</div>
                  </div>
                  <div className={`p-2 border ${theme === 'dark' ? 'border-primary/30' : 'border-border'}`}>
                    <div className="text-xs text-muted-foreground">Step</div>
                    <div className="text-lg font-mono font-bold">{currentStep}</div>
                  </div>
                  <div className={`p-2 border ${theme === 'dark' ? 'border-primary/30' : 'border-border'}`}>
                    <div className="text-xs text-muted-foreground">Reward</div>
                    <div className="text-lg font-mono font-bold">{totalReward.toFixed(1)}</div>
                  </div>
                  <div className={`p-2 border ${theme === 'dark' ? 'border-primary/30' : 'border-border'}`}>
                    <div className="text-xs text-muted-foreground">Avg (20)</div>
                    <div className="text-lg font-mono font-bold">
                      {episodeHistory.length > 0 ? episodeHistory[episodeHistory.length - 1].avgReward.toFixed(1) : '0.0'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Q-Table for hovered cell */}
              <div className={`p-4 border-2 ${theme === 'dark' ? 'border-primary/30 bg-card/50' : 'border-border bg-card'}`}>
                <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
                  <Zap size={20} /> {t(language, 'Action Values Q(s,a)', 'Giá Trị Hành Động Q(s,a)')}
                  {hoveredCell && <span className="text-sm font-normal text-muted-foreground">State: ({hoveredCell.x}, {hoveredCell.y})</span>}
                </h3>
                
                <div className="flex justify-center">
                  <div className="grid grid-cols-3 gap-2 w-48">
                    <div></div>
                    <div className={`p-3 border text-center ${theme === 'dark' ? 'border-primary/30' : 'border-border'}`}>
                      <div className="text-xl">↑</div>
                      <div className="font-mono text-sm">{(hoveredCell ? getQValues(hoveredCell.x, hoveredCell.y)[0] : getQValues(agentPos.x, agentPos.y)[0]).toFixed(2)}</div>
                    </div>
                    <div></div>
                    <div className={`p-3 border text-center ${theme === 'dark' ? 'border-primary/30' : 'border-border'}`}>
                      <div className="text-xl">←</div>
                      <div className="font-mono text-sm">{(hoveredCell ? getQValues(hoveredCell.x, hoveredCell.y)[3] : getQValues(agentPos.x, agentPos.y)[3]).toFixed(2)}</div>
                    </div>
                    <div className={`p-3 border text-center ${theme === 'dark' ? 'border-accent/30 bg-accent/10' : 'border-border bg-muted'}`}>
                      <div className="text-sm text-muted-foreground">🤖</div>
                    </div>
                    <div className={`p-3 border text-center ${theme === 'dark' ? 'border-primary/30' : 'border-border'}`}>
                      <div className="text-xl">→</div>
                      <div className="font-mono text-sm">{(hoveredCell ? getQValues(hoveredCell.x, hoveredCell.y)[1] : getQValues(agentPos.x, agentPos.y)[1]).toFixed(2)}</div>
                    </div>
                    <div></div>
                    <div className={`p-3 border text-center ${theme === 'dark' ? 'border-primary/30' : 'border-border'}`}>
                      <div className="text-xl">↓</div>
                      <div className="font-mono text-sm">{(hoveredCell ? getQValues(hoveredCell.x, hoveredCell.y)[2] : getQValues(agentPos.x, agentPos.y)[2]).toFixed(2)}</div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Environment Settings */}
            <div className={`xl:col-span-3 p-4 border-2 ${theme === 'dark' ? 'border-primary/30 bg-card/50' : 'border-border bg-card'}`}>
              <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
                <Settings size={20} /> {t(language, 'Environment', 'Môi Trường')}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Grid Size: {gridSize}</label>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={gridSize}
                    onChange={(e) => {
                      setGridSize(parseInt(e.target.value));
                    }}
                    className="w-full"
                    disabled={isRunning}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Cell Display:</label>
                  <select
                    value={cellDisplay}
                    onChange={(e) => setCellDisplay(e.target.value as typeof cellDisplay)}
                    className="w-full mt-1 p-2 border rounded bg-background"
                  >
                    <option value="values">{t(language, 'Q-Values', 'Giá Trị Q')}</option>
                    <option value="policy">{t(language, 'Policy (π)', 'Chính Sách (π)')}</option>
                    <option value="both">{t(language, 'Both', 'Cả Hai')}</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Step Penalty: {stepPenalty.toFixed(2)}</label>
                  <input
                    type="range"
                    min="-1"
                    max="0"
                    step="0.01"
                    value={stepPenalty}
                    onChange={(e) => setStepPenalty(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Goal Reward: {goalReward}</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={goalReward}
                    onChange={(e) => setGoalReward(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Trap Penalty: {trapPenalty}</label>
                  <input
                    type="range"
                    min="-100"
                    max="-1"
                    value={trapPenalty}
                    onChange={(e) => setTrapPenalty(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Max Steps: {maxSteps}</label>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    value={maxSteps}
                    onChange={(e) => setMaxSteps(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Speed (ms): {speed}</label>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    value={speed}
                    onChange={(e) => setSpeed(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={terminateOnReward}
                    onChange={(e) => setTerminateOnReward(e.target.checked)}
                  />
                  <span className="text-sm">{t(language, 'Terminate on Reward', 'Kết Thúc Khi Có Phần Thưởng')}</span>
                </label>
                
                <button
                  onClick={() => {
                    setStartPos({ x: 0, y: 0 });
                    initGrid();
                    resetAlgorithm();
                  }}
                  disabled={isRunning}
                  className={`w-full py-2 border-2 font-bold transition-colors ${theme === 'dark' ? 'border-accent hover:bg-accent/20' : 'border-foreground hover:bg-muted'} disabled:opacity-50`}
                >
                  <RotateCcw size={16} className="inline mr-2" />
                  {t(language, 'Reset Environment', 'Đặt Lại Môi Trường')}
                </button>
              </div>
            </div>
          </div>

          {/* Learning Progress & Algorithm Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Learning Progress Plot */}
            <div className={`p-4 border-2 ${theme === 'dark' ? 'border-primary/30 bg-card/50' : 'border-border bg-card'}`}>
              <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
                <BarChart3 size={20} /> {t(language, 'Learning Progress', 'Tiến Trình Học')}
              </h3>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={episodeHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#333' : '#ccc'} />
                    <XAxis 
                      dataKey="episode" 
                      stroke={theme === 'dark' ? '#888' : '#666'}
                      fontSize={12}
                    />
                    <YAxis 
                      stroke={theme === 'dark' ? '#888' : '#666'}
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: theme === 'dark' ? '#1a1a2e' : '#fff',
                        border: theme === 'dark' ? '1px solid #00ff41' : '1px solid #ccc'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="reward" 
                      stroke={theme === 'dark' ? '#ff6b6b' : '#e74c3c'}
                      strokeWidth={1}
                      dot={false}
                      name={t(language, 'Episode Reward', 'Phần Thưởng Episode')}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="avgReward" 
                      stroke={theme === 'dark' ? '#00ff41' : '#27ae60'}
                      strokeWidth={2}
                      dot={false}
                      name={t(language, 'Avg Reward (20 ep)', 'TB Phần Thưởng (20 ep)')}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Algorithm Info */}
            <div className={`p-4 border-2 ${theme === 'dark' ? 'border-primary/30 bg-card/50' : 'border-border bg-card'}`}>
              <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
                <Info size={20} /> {t(language, 'About the Algorithm', 'Về Thuật Toán')}
              </h3>
              
              <h4 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-primary' : ''}`}>
                {t(language, algorithmInfo[algorithm].title, algorithmInfo[algorithm].titleVn)}
              </h4>
              
              <div className="text-sm whitespace-pre-line leading-relaxed">
                {t(language, algorithmInfo[algorithm].description, algorithmInfo[algorithm].descriptionVn)}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function RLPlayground() {
  return (
    <ThemeProvider>
      <RLPlaygroundContent />
    </ThemeProvider>
  );
}
