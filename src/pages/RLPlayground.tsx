import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { ThemeProvider, useTheme, t } from "@/context/ThemeContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Info,
  Settings,
  BarChart3,
  Grid3X3,
  Zap,
  ChevronRight,
  FastForward,
  SkipForward,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Types
type CellType = "empty" | "goal" | "trap" | "wall" | "start";
type Action = 0 | 1 | 2 | 3; // up, right, down, left
type Algorithm = "q-learning" | "sarsa" | "expected-sarsa" | "monte-carlo";
type ExplorationStrategy = "epsilon-greedy" | "softmax" | "greedy";

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

interface StepRecord {
  state: string;
  action: number;
  reward: number;
}

// Algorithm descriptions
const algorithmInfo: Record<
  Algorithm,
  { title: string; titleVn: string; description: string; descriptionVn: string }
> = {
  "q-learning": {
    title: "Q-Learning (Off-Policy TD)",
    titleVn: "Q-Learning (TD Ngoài Chính Sách)",
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
• Có thể bị thiên lệch ước lượng quá mức`,
  },
  sarsa: {
    title: "SARSA (On-Policy TD)",
    titleVn: "SARSA (TD Trong Chính Sách)",
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
• An toàn hơn trong môi trường rủi ro`,
  },
  "expected-sarsa": {
    title: "Expected SARSA",
    titleVn: "Expected SARSA",
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
• Thường hoạt động tốt hơn cả Q-Learning và SARSA`,
  },
  "monte-carlo": {
    title: "Monte Carlo",
    titleVn: "Monte Carlo",
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
• Hoạt động tốt khi episode ngắn`,
  },
};

// Helper functions outside component
const createInitialGrid = (
  size: number,
  stepPen: number,
  goalRew: number,
  trapPen: number,
): Cell[][] => {
  const newGrid: Cell[][] = [];
  for (let y = 0; y < size; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < size; x++) {
      row.push({ type: "empty", reward: stepPen });
    }
    newGrid.push(row);
  }
  // Set default goal at bottom right
  newGrid[size - 1][size - 1] = { type: "goal", reward: goalRew };
  // Set default trap
  if (size > 2) {
    newGrid[Math.floor(size / 2)][Math.floor(size / 2)] = {
      type: "trap",
      reward: trapPen,
    };
  }
  return newGrid;
};

const createInitialQTable = (size: number): QTable => {
  const newQTable: QTable = {};
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      newQTable[`${x},${y}`] = [0, 0, 0, 0];
    }
  }
  return newQTable;
};

function RLPlaygroundContent() {
  const { theme, language } = useTheme();

  // Grid and Q-table
  const [gridSize, setGridSize] = useState(5);
  const [grid, setGrid] = useState<Cell[][]>(() =>
    createInitialGrid(5, -0.1, 10, -10),
  );
  const [qTable, setQTable] = useState<QTable>(() => createInitialQTable(5));

  // Agent position
  const [agentPos, setAgentPos] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  // Algorithm settings
  const [isRunning, setIsRunning] = useState(false);
  const [algorithm, setAlgorithm] = useState<Algorithm>("q-learning");
  const [explorationStrategy, setExplorationStrategy] =
    useState<ExplorationStrategy>("epsilon-greedy");

  // Parameters
  const [learningRate, setLearningRate] = useState(0.1);
  const [discountFactor, setDiscountFactor] = useState(0.95);
  const [epsilon, setEpsilon] = useState(0.3);
  const [temperature, setTemperature] = useState(1.0);
  const [stepPenalty, setStepPenalty] = useState(-0.1);
  const [goalReward, setGoalReward] = useState(10);
  const [trapPenalty, setTrapPenalty] = useState(-10);
  const [maxSteps, setMaxSteps] = useState(100);
  const [speed, setSpeed] = useState(100);
  const [terminateOnReward, setTerminateOnReward] = useState(true);

  // Stats
  const [episode, setEpisode] = useState(0);
  const [totalReward, setTotalReward] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [episodeHistory, setEpisodeHistory] = useState<EpisodeData[]>([]);
  const [hoveredCell, setHoveredCell] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [lastAction, setLastAction] = useState<Action | null>(null);

  // Display options
  const [cellDisplay, setCellDisplay] = useState<"values" | "policy" | "both">(
    "both",
  );
  const [showHeatmap, setShowHeatmap] = useState(true);

  // Refs for async operations
  const runningRef = useRef(false);
  const episodeRecordRef = useRef<StepRecord[]>([]);
  const sarsaNextActionRef = useRef<Action | null>(null);

  // Update grid when parameters change
  useEffect(() => {
    setGrid((prevGrid) => {
      if (prevGrid.length === 0) return prevGrid;
      return prevGrid.map((row) =>
        row.map((cell) => {
          if (cell.type === "goal") return { ...cell, reward: goalReward };
          if (cell.type === "trap") return { ...cell, reward: trapPenalty };
          if (cell.type === "empty" || cell.type === "start")
            return { ...cell, reward: stepPenalty };
          return cell;
        }),
      );
    });
  }, [goalReward, trapPenalty, stepPenalty]);

  // Reset grid when size changes
  useEffect(() => {
    const newGrid = createInitialGrid(
      gridSize,
      stepPenalty,
      goalReward,
      trapPenalty,
    );
    const newQTable = createInitialQTable(gridSize);
    setGrid(newGrid);
    setQTable(newQTable);
    setStartPos({ x: 0, y: 0 });
    setAgentPos({ x: 0, y: 0 });
    setEpisode(0);
    setTotalReward(0);
    setCurrentStep(0);
    setEpisodeHistory([]);
    episodeRecordRef.current = [];
  }, [gridSize]);

  // Handle cell click
  const handleCellClick = (x: number, y: number, shiftKey: boolean) => {
    if (isRunning) return;

    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);

      if (shiftKey) {
        // Reset old start cell
        const oldStart = startPos;
        if (newGrid[oldStart.y]?.[oldStart.x]?.type === "start") {
          newGrid[oldStart.y][oldStart.x] = {
            type: "empty",
            reward: stepPenalty,
          };
        }
        newGrid[y][x] = { type: "start", reward: stepPenalty };
        setStartPos({ x, y });
        setAgentPos({ x, y });
      } else {
        // Cycle through cell types
        const types: CellType[] = ["empty", "goal", "trap", "wall"];
        const currentIndex = types.indexOf(newGrid[y][x].type);
        const nextType = types[(currentIndex + 1) % types.length];

        let reward = stepPenalty;
        if (nextType === "goal") reward = goalReward;
        if (nextType === "trap") reward = trapPenalty;
        if (nextType === "wall") reward = 0;

        newGrid[y][x] = { type: nextType, reward };
      }

      return newGrid;
    });
  };

  // Select action based on exploration strategy
  const selectAction = useCallback(
    (
      qValues: number[],
      exploreStrat: ExplorationStrategy,
      eps: number,
      temp: number,
    ): Action => {
      if (exploreStrat === "greedy") {
        const maxQ = Math.max(...qValues);
        const maxIndices = qValues
          .map((q, i) => (q === maxQ ? i : -1))
          .filter((i) => i !== -1);
        return maxIndices[
          Math.floor(Math.random() * maxIndices.length)
        ] as Action;
      }

      if (exploreStrat === "epsilon-greedy") {
        if (Math.random() < eps) {
          return Math.floor(Math.random() * 4) as Action;
        }
        const maxQ = Math.max(...qValues);
        const maxIndices = qValues
          .map((q, i) => (q === maxQ ? i : -1))
          .filter((i) => i !== -1);
        return maxIndices[
          Math.floor(Math.random() * maxIndices.length)
        ] as Action;
      }

      if (exploreStrat === "softmax") {
        const maxQ = Math.max(...qValues);
        const expValues = qValues.map((q) => Math.exp((q - maxQ) / temp));
        const sum =go expValues.reduce((a, b) => a + b, 0);
        const probs = expValues.map((e) => e / sum);

        const r = Math.random();
        let cumSum = 0;
        for (let i = 0; i < probs.length; i++) {
          cumSum += probs[i];
          if (r < cumSum) return i as Action;
        }
        return 3;
      }

      return Math.floor(Math.random() * 4) as Action;
    },
    [],
  );

  // Get action probabilities
  const getActionProbs = useCallback(
    (
      qValues: number[],
      exploreStrat: ExplorationStrategy,
      eps: number,
      temp: number,
    ): number[] => {
      if (exploreStrat === "greedy") {
        const maxQ = Math.max(...qValues);
        const maxIndices = qValues
          .map((q, i) => (q === maxQ ? i : -1))
          .filter((i) => i !== -1);
        return qValues.map((_, i) =>
          maxIndices.includes(i) ? 1 / maxIndices.length : 0,
        );
      }

      if (exploreStrat === "epsilon-greedy") {
        const maxQ = Math.max(...qValues);
        const maxIndices = qValues
          .map((q, i) => (q === maxQ ? i : -1))
          .filter((i) => i !== -1);
        return qValues.map((_, i) => {
          if (maxIndices.includes(i)) {
            return (1 - eps) / maxIndices.length + eps / 4;
          }
          return eps / 4;
        });
      }

      if (exploreStrat === "softmax") {
        const maxQ = Math.max(...qValues);
        const expValues = qValues.map((q) => Math.exp((q - maxQ) / temp));
        const sum = expValues.reduce((a, b) => a + b, 0);
        return expValues.map((e) => e / sum);
      }

      return [0.25, 0.25, 0.25, 0.25];
    },
    [],
  );

  // Execute action and return result
  const executeStep = useCallback(
    (
      pos: { x: number; y: number },
      action: Action,
      currentGrid: Cell[][],
      size: number,
      stepPen: number,
      termOnReward: boolean,
    ) => {
      const moves = [
        { dx: 0, dy: -1 }, // up
        { dx: 1, dy: 0 }, // right
        { dx: 0, dy: 1 }, // down
        { dx: -1, dy: 0 }, // left
      ];

      const move = moves[action];
      let nextX = pos.x + move.dx;
      let nextY = pos.y + move.dy;

      // Check bounds
      if (nextX < 0 || nextX >= size || nextY < 0 || nextY >= size) {
        nextX = pos.x;
        nextY = pos.y;
      }

      // Check wall
      if (currentGrid[nextY]?.[nextX]?.type === "wall") {
        nextX = pos.x;
        nextY = pos.y;
      }

      const cell = currentGrid[nextY]?.[nextX];
      const reward = cell?.reward ?? stepPen;
      const done =
        termOnReward && (cell?.type === "goal" || cell?.type === "trap");

      return { nextPos: { x: nextX, y: nextY }, reward, done };
    },
    [],
  );

  // Single step execution - uses functional updates to avoid stale closures
  const runOneStep = useCallback(() => {
    let episodeFinished = false;

    setAgentPos((currentPos) => {
      setQTable((currentQTable) => {
        setGrid((currentGrid) => {
          setTotalReward((currentTotalReward) => {
            setCurrentStep((currentStepCount) => {
              setEpisode((currentEpisode) => {
                setStartPos((currentStartPos) => {
                  const stateKey = `${currentPos.x},${currentPos.y}`;
                  const qValues = currentQTable[stateKey] ?? [0, 0, 0, 0];

                  // Select action
                  let action: Action;
                  if (
                    algorithm === "sarsa" &&
                    sarsaNextActionRef.current !== null
                  ) {
                    action = sarsaNextActionRef.current;
                  } else {
                    action = selectAction(
                      qValues,
                      explorationStrategy,
                      epsilon,
                      temperature,
                    );
                  }

                  // Execute step
                  const { nextPos, reward, done } = executeStep(
                    currentPos,
                    action,
                    currentGrid,
                    gridSize,
                    stepPenalty,
                    terminateOnReward,
                  );
                  const nextStateKey = `${nextPos.x},${nextPos.y}`;
                  const nextQValues = currentQTable[nextStateKey] ?? [
                    0, 0, 0, 0,
                  ];

                  // Store for Monte Carlo
                  if (algorithm === "monte-carlo") {
                    episodeRecordRef.current.push({
                      state: stateKey,
                      action,
                      reward,
                    });
                  }

                  // Calculate new Q value for TD methods
                  let newQTable = currentQTable;
                  if (algorithm !== "monte-carlo") {
                    const currentQ = currentQTable[stateKey]?.[action] ?? 0;
                    let targetQ = 0;

                    if (!done) {
                      if (algorithm === "q-learning") {
                        targetQ = Math.max(
                          ...(currentQTable[nextStateKey] ?? [0, 0, 0, 0]),
                        );
                      } else if (algorithm === "sarsa") {
                        const nextAction = selectAction(
                          nextQValues,
                          explorationStrategy,
                          epsilon,
                          temperature,
                        );
                        sarsaNextActionRef.current = nextAction;
                        targetQ =
                          currentQTable[nextStateKey]?.[nextAction] ?? 0;
                      } else if (algorithm === "expected-sarsa") {
                        const probs = getActionProbs(
                          nextQValues,
                          explorationStrategy,
                          epsilon,
                          temperature,
                        );
                        targetQ = probs.reduce(
                          (sum, p, i) => sum + p * nextQValues[i],
                          0,
                        );
                      }
                    } else {
                      sarsaNextActionRef.current = null;
                    }

                    const newQ =
                      currentQ +
                      learningRate *
                        (reward + discountFactor * targetQ - currentQ);
                    newQTable = {
                      ...currentQTable,
                      [stateKey]: [
                        ...(currentQTable[stateKey] ?? [0, 0, 0, 0]),
                      ],
                    };
                    newQTable[stateKey][action] = newQ;
                  }

                  const newStep = currentStepCount + 1;
                  const newTotalReward = currentTotalReward + reward;

                  // Update last action for visualization
                  setLastAction(action);

                  // Check if episode is done
                  if (done || newStep >= maxSteps) {
                    episodeFinished = true;

                    // Monte Carlo update
                    if (
                      algorithm === "monte-carlo" &&
                      episodeRecordRef.current.length > 0
                    ) {
                      let G = 0;
                      const mcQTable = { ...newQTable };

                      for (
                        let ti = episodeRecordRef.current.length - 1;
                        ti >= 0;
                        ti--
                      ) {
                        const record = episodeRecordRef.current[ti];
                        G = discountFactor * G + record.reward;
                        const currentQi =
                          mcQTable[record.state]?.[record.action] ?? 0;
                        mcQTable[record.state] = [
                          ...(mcQTable[record.state] ?? [0, 0, 0, 0]),
                        ];
                        mcQTable[record.state][record.action] =
                          currentQi + learningRate * (G - currentQi);
                      }
                      newQTable = mcQTable;
                    }

                    // Record episode
                    setEpisodeHistory((prev) => {
                      const newEp = {
                        episode: currentEpisode + 1,
                        reward: newTotalReward,
                        steps: newStep,
                        avgReward: 0,
                      };
                      const newHistory = [...prev, newEp];
                      const last20 = newHistory.slice(-20);
                      newEp.avgReward =
                        last20.reduce((a, b) => a + b.reward, 0) /
                        last20.length;
                      return newHistory.slice(-200);
                    });

                    // Reset for next episode
                    episodeRecordRef.current = [];
                    sarsaNextActionRef.current = null;

                    // Update Q-table first, then reset position
                    setTimeout(() => {
                      setAgentPos(currentStartPos);
                      setTotalReward(0);
                      setCurrentStep(0);
                      setEpisode((e) => e + 1);
                      setLastAction(null);
                    }, 0);

                    // Return new Q-table
                    return newQTable !== currentQTable
                      ? (() => {
                          setQTable(newQTable);
                          return currentGrid;
                        })()
                      : currentGrid;
                  }

                  // Update position for next step
                  setTimeout(() => {
                    setAgentPos(nextPos);
                    setTotalReward(newTotalReward);
                    setCurrentStep(newStep);
                    if (newQTable !== currentQTable) {
                      setQTable(newQTable);
                    }
                  }, 0);

                  return currentStartPos;
                });
                return currentEpisode;
              });
              return currentStepCount;
            });
            return currentTotalReward;
          });
          return currentGrid;
        });
        return currentQTable;
      });
      return currentPos;
    });

    return episodeFinished;
  }, [
    algorithm,
    explorationStrategy,
    epsilon,
    temperature,
    learningRate,
    discountFactor,
    gridSize,
    stepPenalty,
    terminateOnReward,
    maxSteps,
    selectAction,
    getActionProbs,
    executeStep,
  ]);

  // Simpler step function that doesn't nest state updates
  const runSimpleStep = useCallback(() => {
    const currentPos = agentPos;
    const currentQTable = qTable;
    const currentGrid = grid;
    const currentStartPos = startPos;

    const stateKey = `${currentPos.x},${currentPos.y}`;
    const qValues = currentQTable[stateKey] ?? [0, 0, 0, 0];

    // Select action
    let action: Action;
    if (algorithm === "sarsa" && sarsaNextActionRef.current !== null) {
      action = sarsaNextActionRef.current;
    } else {
      action = selectAction(qValues, explorationStrategy, epsilon, temperature);
    }

    // Execute step
    const { nextPos, reward, done } = executeStep(
      currentPos,
      action,
      currentGrid,
      gridSize,
      stepPenalty,
      terminateOnReward,
    );
    const nextStateKey = `${nextPos.x},${nextPos.y}`;
    const nextQValues = currentQTable[nextStateKey] ?? [0, 0, 0, 0];

    // Store for Monte Carlo
    if (algorithm === "monte-carlo") {
      episodeRecordRef.current.push({ state: stateKey, action, reward });
    }

    // Update Q-table for TD methods
    if (algorithm !== "monte-carlo") {
      const currentQ = currentQTable[stateKey]?.[action] ?? 0;
      let targetQ = 0;

      if (!done) {
        if (algorithm === "q-learning") {
          targetQ = Math.max(...(currentQTable[nextStateKey] ?? [0, 0, 0, 0]));
        } else if (algorithm === "sarsa") {
          const nextAction = selectAction(
            nextQValues,
            explorationStrategy,
            epsilon,
            temperature,
          );
          sarsaNextActionRef.current = nextAction;
          targetQ = currentQTable[nextStateKey]?.[nextAction] ?? 0;
        } else if (algorithm === "expected-sarsa") {
          const probs = getActionProbs(
            nextQValues,
            explorationStrategy,
            epsilon,
            temperature,
          );
          targetQ = probs.reduce((sum, p, i) => sum + p * nextQValues[i], 0);
        }
      } else {
        sarsaNextActionRef.current = null;
      }

      const newQ =
        currentQ +
        learningRate * (reward + discountFactor * targetQ - currentQ);
      setQTable((prev) => {
        const newQTable = { ...prev };
        newQTable[stateKey] = [...(prev[stateKey] ?? [0, 0, 0, 0])];
        newQTable[stateKey][action] = newQ;
        return newQTable;
      });
    }

    // Update state
    setAgentPos(nextPos);
    setLastAction(action);
    const newTotalReward = totalReward + reward;
    setTotalReward(newTotalReward);
    const newStep = currentStep + 1;
    setCurrentStep(newStep);

    // Check if episode is done
    if (done || newStep >= maxSteps) {
      // Monte Carlo update
      if (algorithm === "monte-carlo" && episodeRecordRef.current.length > 0) {
        setQTable((prev) => {
          const newQTable = { ...prev };
          let G = 0;

          for (let ti = episodeRecordRef.current.length - 1; ti >= 0; ti--) {
            const record = episodeRecordRef.current[ti];
            G = discountFactor * G + record.reward;
            const currentQi = newQTable[record.state]?.[record.action] ?? 0;
            newQTable[record.state] = [
              ...(newQTable[record.state] ?? [0, 0, 0, 0]),
            ];
            newQTable[record.state][record.action] =
              currentQi + learningRate * (G - currentQi);
          }

          return newQTable;
        });
      }

      // Record episode
      setEpisodeHistory((prev) => {
        const newEp = {
          episode: episode + 1,
          reward: newTotalReward,
          steps: newStep,
          avgReward: 0,
        };
        const newHistory = [...prev, newEp];
        const last20 = newHistory.slice(-20);
        newEp.avgReward =
          last20.reduce((a, b) => a + b.reward, 0) / last20.length;
        return newHistory.slice(-200);
      });

      // Reset for next episode
      setEpisode((e) => e + 1);
      setTotalReward(0);
      setCurrentStep(0);
      setAgentPos(currentStartPos);
      setLastAction(null);
      episodeRecordRef.current = [];
      sarsaNextActionRef.current = null;

      return true;
    }

    return false;
  }, [
    agentPos,
    qTable,
    grid,
    startPos,
    algorithm,
    explorationStrategy,
    epsilon,
    temperature,
    learningRate,
    discountFactor,
    gridSize,
    stepPenalty,
    terminateOnReward,
    maxSteps,
    totalReward,
    currentStep,
    episode,
    selectAction,
    getActionProbs,
    executeStep,
  ]);

  // Continuous learning loop
  useEffect(() => {
    if (!isRunning) return;

    const timeoutId = setTimeout(() => {
      if (runningRef.current) {
        runSimpleStep();
      }
    }, speed);

    return () => clearTimeout(timeoutId);
  }, [isRunning, agentPos, qTable, runSimpleStep, speed]);

  // Start/Stop learning
  const toggleLearning = () => {
    if (isRunning) {
      runningRef.current = false;
      setIsRunning(false);
    } else {
      runningRef.current = true;
      sarsaNextActionRef.current = null;
      setIsRunning(true);
    }
  };

  // Run single step manually
  const singleStep = () => {
    if (!isRunning) {
      runSimpleStep();
    }
  };

  // Fast forward - run multiple episodes quickly
  const fastForward = useCallback(
    (episodes: number) => {
      let localAgentPos = { ...agentPos };
      let localQTable = { ...qTable };
      let localTotalReward = totalReward;
      let localStep = currentStep;
      let localEpisode = episode;
      const localEpisodeHistory: EpisodeData[] = [...episodeHistory];
      let localEpisodeRecord: StepRecord[] = [...episodeRecordRef.current];
      let localSarsaNextAction: Action | null = sarsaNextActionRef.current;

      for (let ep = 0; ep < episodes; ep++) {
        let done = false;
        let steps = 0;

        while (!done && steps < maxSteps) {
          const stateKey = `${localAgentPos.x},${localAgentPos.y}`;
          const qValues = localQTable[stateKey] ?? [0, 0, 0, 0];

          // Select action
          let action: Action;
          if (algorithm === "sarsa" && localSarsaNextAction !== null) {
            action = localSarsaNextAction;
          } else {
            action = selectAction(
              qValues,
              explorationStrategy,
              epsilon,
              temperature,
            );
          }

          // Execute step
          const {
            nextPos,
            reward,
            done: stepDone,
          } = executeStep(
            localAgentPos,
            action,
            grid,
            gridSize,
            stepPenalty,
            terminateOnReward,
          );
          const nextStateKey = `${nextPos.x},${nextPos.y}`;
          const nextQValues = localQTable[nextStateKey] ?? [0, 0, 0, 0];

          // Store for Monte Carlo
          if (algorithm === "monte-carlo") {
            localEpisodeRecord.push({ state: stateKey, action, reward });
          }

          // Update Q-table for TD methods
          if (algorithm !== "monte-carlo") {
            const currentQ = localQTable[stateKey]?.[action] ?? 0;
            let targetQ = 0;

            if (!stepDone) {
              if (algorithm === "q-learning") {
                targetQ = Math.max(
                  ...(localQTable[nextStateKey] ?? [0, 0, 0, 0]),
                );
              } else if (algorithm === "sarsa") {
                const nextAction = selectAction(
                  nextQValues,
                  explorationStrategy,
                  epsilon,
                  temperature,
                );
                localSarsaNextAction = nextAction;
                targetQ = localQTable[nextStateKey]?.[nextAction] ?? 0;
              } else if (algorithm === "expected-sarsa") {
                const probs = getActionProbs(
                  nextQValues,
                  explorationStrategy,
                  epsilon,
                  temperature,
                );
                targetQ = probs.reduce(
                  (sum, p, i) => sum + p * nextQValues[i],
                  0,
                );
              }
            } else {
              localSarsaNextAction = null;
            }

            const newQ =
              currentQ +
              learningRate * (reward + discountFactor * targetQ - currentQ);
            localQTable = { ...localQTable };
            localQTable[stateKey] = [
              ...(localQTable[stateKey] ?? [0, 0, 0, 0]),
            ];
            localQTable[stateKey][action] = newQ;
          }

          localAgentPos = nextPos;
          localTotalReward += reward;
          localStep++;
          steps++;

          done = stepDone || localStep >= maxSteps;
        }

        // Monte Carlo update at end of episode
        if (algorithm === "monte-carlo" && localEpisodeRecord.length > 0) {
          let G = 0;
          for (let ti = localEpisodeRecord.length - 1; ti >= 0; ti--) {
            const record = localEpisodeRecord[ti];
            G = discountFactor * G + record.reward;
            const currentQi = localQTable[record.state]?.[record.action] ?? 0;
            localQTable = { ...localQTable };
            localQTable[record.state] = [
              ...(localQTable[record.state] ?? [0, 0, 0, 0]),
            ];
            localQTable[record.state][record.action] =
              currentQi + learningRate * (G - currentQi);
          }
        }

        // Record episode
        const newEp = {
          episode: localEpisode + 1,
          reward: localTotalReward,
          steps: localStep,
          avgReward: 0,
        };
        localEpisodeHistory.push(newEp);
        const last20 = localEpisodeHistory.slice(-20);
        newEp.avgReward =
          last20.reduce((a, b) => a + b.reward, 0) / last20.length;

        // Reset for next episode
        localEpisode++;
        localTotalReward = 0;
        localStep = 0;
        localAgentPos = { ...startPos };
        localEpisodeRecord = [];
        localSarsaNextAction = null;
      }

      // Update all state at once
      setQTable(localQTable);
      setAgentPos(localAgentPos);
      setTotalReward(0);
      setCurrentStep(0);
      setEpisode(localEpisode);
      setEpisodeHistory(localEpisodeHistory.slice(-200));
      episodeRecordRef.current = [];
      sarsaNextActionRef.current = null;
    },
    [
      agentPos,
      qTable,
      grid,
      startPos,
      algorithm,
      explorationStrategy,
      epsilon,
      temperature,
      learningRate,
      discountFactor,
      gridSize,
      stepPenalty,
      terminateOnReward,
      maxSteps,
      totalReward,
      currentStep,
      episode,
      episodeHistory,
      selectAction,
      getActionProbs,
      executeStep,
    ],
  );

  // Reset algorithm only
  const resetAlgorithm = () => {
    runningRef.current = false;
    setIsRunning(false);
    setQTable(createInitialQTable(gridSize));
    setAgentPos({ ...startPos });
    setEpisode(0);
    setTotalReward(0);
    setCurrentStep(0);
    setEpisodeHistory([]);
    setLastAction(null);
    episodeRecordRef.current = [];
    sarsaNextActionRef.current = null;
  };

  // Reset everything
  const resetEnvironment = () => {
    runningRef.current = false;
    setIsRunning(false);
    const newGrid = createInitialGrid(
      gridSize,
      stepPenalty,
      goalReward,
      trapPenalty,
    );
    setGrid(newGrid);
    setStartPos({ x: 0, y: 0 });
    resetAlgorithm();
  };

  // Get Q values for a cell
  const getQValues = (x: number, y: number) =>
    qTable[`${x},${y}`] ?? [0, 0, 0, 0];

  // Get best action for a cell
  const getBestAction = (x: number, y: number): Action => {
    const qValues = getQValues(x, y);
    const maxQ = Math.max(...qValues);
    return qValues.indexOf(maxQ) as Action;
  };

  // Calculate max Q value across entire grid for normalization
  const { maxQValue, minQValue } = useMemo(() => {
    let maxQ = -Infinity;
    let minQ = Infinity;
    Object.values(qTable).forEach((qValues) => {
      const cellMax = Math.max(...qValues);
      const cellMin = Math.min(...qValues);
      if (cellMax > maxQ) maxQ = cellMax;
      if (cellMin < minQ) minQ = cellMin;
    });
    if (maxQ === -Infinity) maxQ = 0;
    if (minQ === Infinity) minQ = 0;
    return { maxQValue: maxQ, minQValue: minQ };
  }, [qTable]);

  // Get cell background color based on value
  const getCellBgStyle = (x: number, y: number): React.CSSProperties => {
    const cell = grid[y]?.[x];
    if (!cell || !showHeatmap) return {};

    if (cell.type === "wall")
      return { backgroundColor: theme === "dark" ? "#374151" : "#9ca3af" };
    if (cell.type === "goal")
      return { backgroundColor: "rgba(16, 185, 129, 0.4)" };
    if (cell.type === "trap")
      return { backgroundColor: "rgba(239, 68, 68, 0.4)" };

    const maxQ = Math.max(...getQValues(x, y));
    const range = maxQValue - minQValue;

    if (range === 0 || maxQ === 0) return {};

    const normalized = (maxQ - minQValue) / range;

    if (maxQ > 0) {
      // Positive value - green
      const intensity = Math.min(normalized, 1);
      return { backgroundColor: `rgba(16, 185, 129, ${intensity * 0.6})` };
    } else {
      // Negative value - red
      const intensity = Math.min(1 - normalized, 1);
      return { backgroundColor: `rgba(239, 68, 68, ${intensity * 0.4})` };
    }
  };

  // Action arrows
  const actionArrows = ["↑", "→", "↓", "←"];
  const actionColors = [
    "text-blue-400",
    "text-green-400",
    "text-yellow-400",
    "text-purple-400",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Back Link */}
          <Link
            to="/#projects"
            className={`inline-flex items-center gap-2 mb-6 text-base hover:underline ${theme === "dark" ? "text-primary" : ""}`}
          >
            <ArrowLeft size={18} />
            {t(language, "Back to Projects", "Quay Lại Dự Án")}
          </Link>

          {/* Title */}
          <motion.h1
            className={`text-3xl md:text-4xl font-black mb-2 ${theme === "dark" ? "neon-text" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            🎮{" "}
            {t(language, "RL Grid World Playground", "Sân Chơi RL Grid World")}
          </motion.h1>
          <p className="text-muted-foreground mb-8 text-lg">
            {t(
              language,
              "Interactive reinforcement learning visualization",
              "Trực quan hóa học tăng cường tương tác",
            )}
          </p>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Algorithm Settings */}
            <div
              className={`xl:col-span-3 p-4 rounded-lg border-2 ${theme === "dark" ? "border-primary/30 bg-card/50" : "border-border bg-card"}`}
            >
              <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
                <Settings size={20} />{" "}
                {t(language, "Algorithm Settings", "Cài Đặt Thuật Toán")}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">
                    {t(language, "Algorithm", "Thuật Toán")}:
                  </label>
                  <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value as Algorithm)}
                    className="w-full mt-1 p-2 border rounded bg-background text-foreground"
                    disabled={isRunning}
                  >
                    <option value="q-learning">Q-Learning</option>
                    <option value="sarsa">SARSA</option>
                    <option value="expected-sarsa">Expected SARSA</option>
                    <option value="monte-carlo">Monte Carlo</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    {t(language, "Exploration", "Khám Phá")}:
                  </label>
                  <select
                    value={explorationStrategy}
                    onChange={(e) =>
                      setExplorationStrategy(
                        e.target.value as ExplorationStrategy,
                      )
                    }
                    className="w-full mt-1 p-2 border rounded bg-background text-foreground"
                    disabled={isRunning}
                  >
                    <option value="epsilon-greedy">ε-Greedy</option>
                    <option value="softmax">Softmax</option>
                    <option value="greedy">Greedy</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium flex justify-between">
                    <span>Learning Rate (α)</span>
                    <span className="font-mono text-primary">
                      {learningRate.toFixed(2)}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="0.01"
                    max="1"
                    step="0.01"
                    value={learningRate}
                    onChange={(e) =>
                      setLearningRate(parseFloat(e.target.value))
                    }
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium flex justify-between">
                    <span>Discount Factor (γ)</span>
                    <span className="font-mono text-primary">
                      {discountFactor.toFixed(2)}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={discountFactor}
                    onChange={(e) =>
                      setDiscountFactor(parseFloat(e.target.value))
                    }
                    className="w-full accent-primary"
                  />
                </div>

                {explorationStrategy === "epsilon-greedy" && (
                  <div>
                    <label className="text-sm font-medium flex justify-between">
                      <span>Epsilon (ε)</span>
                      <span className="font-mono text-primary">
                        {epsilon.toFixed(2)}
                      </span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={epsilon}
                      onChange={(e) => setEpsilon(parseFloat(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                )}

                {explorationStrategy === "softmax" && (
                  <div>
                    <label className="text-sm font-medium flex justify-between">
                      <span>Temperature (τ)</span>
                      <span className="font-mono text-primary">
                        {temperature.toFixed(2)}
                      </span>
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="5"
                      step="0.1"
                      value={temperature}
                      onChange={(e) =>
                        setTemperature(parseFloat(e.target.value))
                      }
                      className="w-full accent-primary"
                    />
                  </div>
                )}

                <button
                  onClick={resetAlgorithm}
                  disabled={isRunning}
                  className={`w-full py-2 rounded border-2 font-bold transition-colors ${theme === "dark" ? "border-primary hover:bg-primary/20" : "border-foreground hover:bg-muted"} disabled:opacity-50`}
                >
                  <RotateCcw size={16} className="inline mr-2" />
                  {t(language, "Reset Algorithm", "Đặt Lại Thuật Toán")}
                </button>
              </div>
            </div>

            {/* Grid and Controls */}
            <div className="xl:col-span-6 space-y-4">
              {/* Interactive Grid */}
              <div
                className={`p-4 rounded-lg border-2 ${theme === "dark" ? "border-primary/30 bg-card/50" : "border-border bg-card"}`}
              >
                <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
                  <Grid3X3 size={20} />{" "}
                  {t(language, "Interactive Simulation", "Mô Phỏng Tương Tác")}
                </h3>

                <div className="flex justify-center mb-4">
                  <div
                    className="grid gap-0.5 p-2 rounded-lg"
                    style={{
                      gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(0,255,65,0.05)"
                          : "rgba(0,0,0,0.05)",
                    }}
                  >
                    {grid.map((row, y) =>
                      row.map((cell, x) => {
                        const isAgent = agentPos.x === x && agentPos.y === y;
                        const isStart = startPos.x === x && startPos.y === y;
                        const qValues = getQValues(x, y);
                        const bestAction = getBestAction(x, y);
                        const isHovered =
                          hoveredCell?.x === x && hoveredCell?.y === y;
                        const cellSize =
                          gridSize <= 5
                            ? "w-16 h-16"
                            : gridSize <= 7
                              ? "w-14 h-14"
                              : "w-12 h-12";
                        const fontSize =
                          gridSize <= 5 ? "text-[9px]" : "text-[7px]";

                        return (
                          <motion.div
                            key={`${x}-${y}`}
                            onClick={(e) => handleCellClick(x, y, e.shiftKey)}
                            onMouseEnter={() => setHoveredCell({ x, y })}
                            onMouseLeave={() => setHoveredCell(null)}
                            className={`
                              ${cellSize} border relative cursor-pointer transition-all rounded
                              flex items-center justify-center
                              ${theme === "dark" ? "border-primary/30" : "border-border"}
                              ${isHovered ? "ring-2 ring-yellow-400/50" : ""}
                              ${isAgent ? "ring-2 ring-cyan-400 ring-offset-1 ring-offset-background z-10" : ""}
                            `}
                            style={getCellBgStyle(x, y)}
                            animate={isAgent ? { scale: [1, 1.05, 1] } : {}}
                            transition={{ duration: 0.3 }}
                          >
                            {/* Cell content */}
                            {cell.type === "goal" && (
                              <span className="text-xl">💎</span>
                            )}
                            {cell.type === "trap" && (
                              <span className="text-xl">☠️</span>
                            )}
                            {cell.type === "wall" && (
                              <span className="text-xl">🧱</span>
                            )}
                            {isStart &&
                              cell.type !== "goal" &&
                              cell.type !== "trap" &&
                              cell.type !== "wall" && (
                                <span className="text-sm opacity-40 absolute">
                                  🏠
                                </span>
                              )}

                            {/* Agent */}
                            <AnimatePresence>
                              {isAgent && (
                                <motion.span
                                  className="text-xl absolute z-20"
                                  initial={{ scale: 0.5, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.5, opacity: 0 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  🤖
                                </motion.span>
                              )}
                            </AnimatePresence>

                            {/* Policy arrow */}
                            {cell.type !== "wall" &&
                              (cellDisplay === "policy" ||
                                cellDisplay === "both") &&
                              !isAgent && (
                                <span
                                  className={`absolute text-lg font-bold opacity-60 ${theme === "dark" ? "text-primary" : "text-foreground"}`}
                                >
                                  {actionArrows[bestAction]}
                                </span>
                              )}

                            {/* Q-value corners */}
                            {cell.type !== "wall" && cellDisplay === "both" && (
                              <>
                                <span
                                  className={`absolute top-0.5 left-1/2 -translate-x-1/2 ${fontSize} font-mono ${qValues[0] === Math.max(...qValues) && qValues[0] !== 0 ? "text-emerald-400 font-bold" : "opacity-60"}`}
                                >
                                  {qValues[0].toFixed(1)}
                                </span>
                                <span
                                  className={`absolute right-0.5 top-1/2 -translate-y-1/2 ${fontSize} font-mono ${qValues[1] === Math.max(...qValues) && qValues[1] !== 0 ? "text-emerald-400 font-bold" : "opacity-60"}`}
                                >
                                  {qValues[1].toFixed(1)}
                                </span>
                                <span
                                  className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 ${fontSize} font-mono ${qValues[2] === Math.max(...qValues) && qValues[2] !== 0 ? "text-emerald-400 font-bold" : "opacity-60"}`}
                                >
                                  {qValues[2].toFixed(1)}
                                </span>
                                <span
                                  className={`absolute left-0.5 top-1/2 -translate-y-1/2 ${fontSize} font-mono ${qValues[3] === Math.max(...qValues) && qValues[3] !== 0 ? "text-emerald-400 font-bold" : "opacity-60"}`}
                                >
                                  {qValues[3].toFixed(1)}
                                </span>
                              </>
                            )}
                          </motion.div>
                        );
                      }),
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground text-center mb-4">
                  {t(
                    language,
                    "Click to cycle (💎/☠️/🧱/empty). Shift+Click to set start 🏠",
                    "Click để chuyển đổi (💎/☠️/🧱/trống). Shift+Click để đặt điểm bắt đầu 🏠",
                  )}
                </p>

                {/* Controls */}
                <div className="flex gap-2 justify-center flex-wrap">
                  <button
                    onClick={toggleLearning}
                    className={`px-6 py-2 rounded font-bold transition-all ${
                      isRunning
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : theme === "dark"
                          ? "bg-primary hover:bg-primary/80 text-primary-foreground"
                          : "bg-foreground hover:bg-foreground/80 text-background"
                    }`}
                  >
                    {isRunning ? (
                      <>
                        <Pause size={16} className="inline mr-2" />
                        {t(language, "Stop", "Dừng")}
                      </>
                    ) : (
                      <>
                        <Play size={16} className="inline mr-2" />
                        {t(language, "Start", "Bắt Đầu")}
                      </>
                    )}
                  </button>

                  <button
                    onClick={singleStep}
                    disabled={isRunning}
                    className={`px-4 py-2 rounded font-bold transition-colors border-2 ${theme === "dark" ? "border-primary/50 hover:bg-primary/20" : "border-foreground/50 hover:bg-muted"} disabled:opacity-50`}
                  >
                    <ChevronRight size={16} className="inline mr-1" />
                    {t(language, "Step", "Bước")}
                  </button>

                  <button
                    onClick={() => fastForward(10)}
                    disabled={isRunning}
                    className={`px-4 py-2 rounded font-bold transition-colors border-2 ${theme === "dark" ? "border-accent/50 hover:bg-accent/20" : "border-foreground/50 hover:bg-muted"} disabled:opacity-50`}
                    title={t(
                      language,
                      "Run 10 episodes instantly",
                      "Chạy 10 episodes ngay lập tức",
                    )}
                  >
                    <FastForward size={16} className="inline mr-1" />
                    +10
                  </button>

                  <button
                    onClick={() => fastForward(100)}
                    disabled={isRunning}
                    className={`px-4 py-2 rounded font-bold transition-colors border-2 ${theme === "dark" ? "border-accent/50 hover:bg-accent/20" : "border-foreground/50 hover:bg-muted"} disabled:opacity-50`}
                    title={t(
                      language,
                      "Run 100 episodes instantly",
                      "Chạy 100 episodes ngay lập tức",
                    )}
                  >
                    <SkipForward size={16} className="inline mr-1" />
                    +100
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-2 mt-4 text-center">
                  <div
                    className={`p-2 rounded border ${theme === "dark" ? "border-primary/30 bg-primary/5" : "border-border"}`}
                  >
                    <div className="text-xs text-muted-foreground">Episode</div>
                    <div className="text-xl font-mono font-bold text-primary">
                      {episode}
                    </div>
                  </div>
                  <div
                    className={`p-2 rounded border ${theme === "dark" ? "border-primary/30 bg-primary/5" : "border-border"}`}
                  >
                    <div className="text-xs text-muted-foreground">Step</div>
                    <div className="text-xl font-mono font-bold">
                      {currentStep}
                    </div>
                  </div>
                  <div
                    className={`p-2 rounded border ${theme === "dark" ? "border-primary/30 bg-primary/5" : "border-border"}`}
                  >
                    <div className="text-xs text-muted-foreground">Reward</div>
                    <div
                      className={`text-xl font-mono font-bold ${totalReward >= 0 ? "text-emerald-500" : "text-red-500"}`}
                    >
                      {totalReward.toFixed(1)}
                    </div>
                  </div>
                  <div
                    className={`p-2 rounded border ${theme === "dark" ? "border-primary/30 bg-primary/5" : "border-border"}`}
                  >
                    <div className="text-xs text-muted-foreground">
                      Avg (20)
                    </div>
                    <div
                      className={`text-xl font-mono font-bold ${episodeHistory.length > 0 && episodeHistory[episodeHistory.length - 1].avgReward >= 0 ? "text-emerald-500" : "text-red-500"}`}
                    >
                      {episodeHistory.length > 0
                        ? episodeHistory[
                            episodeHistory.length - 1
                          ].avgReward.toFixed(1)
                        : "0.0"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Q-Table Visualization */}
              <div
                className={`p-4 rounded-lg border-2 ${theme === "dark" ? "border-primary/30 bg-card/50" : "border-border bg-card"}`}
              >
                <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
                  <Zap size={20} />{" "}
                  {t(
                    language,
                    "Action Values Q(s,a)",
                    "Giá Trị Hành Động Q(s,a)",
                  )}
                  {hoveredCell && (
                    <span className="text-sm font-normal text-muted-foreground ml-2">
                      State: ({hoveredCell.x}, {hoveredCell.y})
                    </span>
                  )}
                  {lastAction !== null && (
                    <span className="text-sm font-normal ml-auto">
                      Last:{" "}
                      <span className={`font-bold ${actionColors[lastAction]}`}>
                        {actionArrows[lastAction]}
                      </span>
                    </span>
                  )}
                </h3>

                <div className="flex justify-center">
                  <div className="grid grid-cols-3 gap-2 w-56">
                    <div></div>
                    <div
                      className={`p-3 rounded border-2 text-center transition-all ${
                        lastAction === 0
                          ? "border-blue-400 bg-blue-400/20"
                          : theme === "dark"
                            ? "border-primary/30"
                            : "border-border"
                      }`}
                    >
                      <div className="text-2xl">↑</div>
                      <div className="font-mono text-sm font-bold">
                        {(hoveredCell
                          ? getQValues(hoveredCell.x, hoveredCell.y)[0]
                          : getQValues(agentPos.x, agentPos.y)[0]
                        ).toFixed(2)}
                      </div>
                    </div>
                    <div></div>
                    <div
                      className={`p-3 rounded border-2 text-center transition-all ${
                        lastAction === 3
                          ? "border-purple-400 bg-purple-400/20"
                          : theme === "dark"
                            ? "border-primary/30"
                            : "border-border"
                      }`}
                    >
                      <div className="text-2xl">←</div>
                      <div className="font-mono text-sm font-bold">
                        {(hoveredCell
                          ? getQValues(hoveredCell.x, hoveredCell.y)[3]
                          : getQValues(agentPos.x, agentPos.y)[3]
                        ).toFixed(2)}
                      </div>
                    </div>
                    <div
                      className={`p-3 rounded border-2 text-center ${theme === "dark" ? "border-accent/30 bg-accent/10" : "border-border bg-muted"}`}
                    >
                      <div className="text-2xl">🤖</div>
                    </div>
                    <div
                      className={`p-3 rounded border-2 text-center transition-all ${
                        lastAction === 1
                          ? "border-green-400 bg-green-400/20"
                          : theme === "dark"
                            ? "border-primary/30"
                            : "border-border"
                      }`}
                    >
                      <div className="text-2xl">→</div>
                      <div className="font-mono text-sm font-bold">
                        {(hoveredCell
                          ? getQValues(hoveredCell.x, hoveredCell.y)[1]
                          : getQValues(agentPos.x, agentPos.y)[1]
                        ).toFixed(2)}
                      </div>
                    </div>
                    <div></div>
                    <div
                      className={`p-3 rounded border-2 text-center transition-all ${
                        lastAction === 2
                          ? "border-yellow-400 bg-yellow-400/20"
                          : theme === "dark"
                            ? "border-primary/30"
                            : "border-border"
                      }`}
                    >
                      <div className="text-2xl">↓</div>
                      <div className="font-mono text-sm font-bold">
                        {(hoveredCell
                          ? getQValues(hoveredCell.x, hoveredCell.y)[2]
                          : getQValues(agentPos.x, agentPos.y)[2]
                        ).toFixed(2)}
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Environment Settings */}
            <div
              className={`xl:col-span-3 p-4 rounded-lg border-2 ${theme === "dark" ? "border-primary/30 bg-card/50" : "border-border bg-card"}`}
            >
              <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
                <Settings size={20} />{" "}
                {t(language, "Environment", "Môi Trường")}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium flex justify-between">
                    <span>Grid Size</span>
                    <span className="font-mono text-primary">
                      {gridSize}×{gridSize}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={gridSize}
                    onChange={(e) => setGridSize(parseInt(e.target.value))}
                    className="w-full accent-primary"
                    disabled={isRunning}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Cell Display:</label>
                  <select
                    value={cellDisplay}
                    onChange={(e) =>
                      setCellDisplay(e.target.value as typeof cellDisplay)
                    }
                    className="w-full mt-1 p-2 border rounded bg-background text-foreground"
                  >
                    <option value="values">
                      {t(language, "Q-Values Only", "Chỉ Giá Trị Q")}
                    </option>
                    <option value="policy">
                      {t(language, "Policy Only (π)", "Chỉ Chính Sách (π)")}
                    </option>
                    <option value="both">
                      {t(language, "Both", "Cả Hai")}
                    </option>
                  </select>
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showHeatmap}
                    onChange={(e) => setShowHeatmap(e.target.checked)}
                    className="accent-primary"
                  />
                  <span className="text-sm">
                    {t(
                      language,
                      "Show Value Heatmap",
                      "Hiển Thị Heatmap Giá Trị",
                    )}
                  </span>
                </label>

                <hr className="border-border" />

                <div>
                  <label className="text-sm font-medium flex justify-between">
                    <span>Step Penalty</span>
                    <span className="font-mono text-red-400">
                      {stepPenalty.toFixed(2)}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="-1"
                    max="0"
                    step="0.01"
                    value={stepPenalty}
                    onChange={(e) => setStepPenalty(parseFloat(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium flex justify-between">
                    <span>Goal Reward</span>
                    <span className="font-mono text-emerald-400">
                      +{goalReward}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={goalReward}
                    onChange={(e) => setGoalReward(parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium flex justify-between">
                    <span>Trap Penalty</span>
                    <span className="font-mono text-red-400">
                      {trapPenalty}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="-100"
                    max="-1"
                    value={trapPenalty}
                    onChange={(e) => setTrapPenalty(parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium flex justify-between">
                    <span>Max Steps</span>
                    <span className="font-mono text-primary">{maxSteps}</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={maxSteps}
                    onChange={(e) => setMaxSteps(parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium flex justify-between">
                    <span>Speed</span>
                    <span className="font-mono text-primary">{speed}ms</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={speed}
                    onChange={(e) => setSpeed(parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={terminateOnReward}
                    onChange={(e) => setTerminateOnReward(e.target.checked)}
                    className="accent-primary"
                  />
                  <span className="text-sm">
                    {t(
                      language,
                      "Terminate on Goal/Trap",
                      "Kết Thúc Tại Đích/Bẫy",
                    )}
                  </span>
                </label>

                <button
                  onClick={resetEnvironment}
                  disabled={isRunning}
                  className={`w-full py-2 rounded border-2 font-bold transition-colors ${theme === "dark" ? "border-accent hover:bg-accent/20" : "border-foreground hover:bg-muted"} disabled:opacity-50`}
                >
                  <RotateCcw size={16} className="inline mr-2" />
                  {t(language, "Reset All", "Đặt Lại Tất Cả")}
                </button>
              </div>
            </div>
          </div>

          {/* Learning Progress & Algorithm Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Learning Progress Plot */}
            <div
              className={`p-4 rounded-lg border-2 ${theme === "dark" ? "border-primary/30 bg-card/50" : "border-border bg-card"}`}
            >
              <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
                <BarChart3 size={20} />{" "}
                {t(language, "Learning Progress", "Tiến Trình Học")}
                {episodeHistory.length > 0 && (
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    ({episodeHistory.length}{" "}
                    {t(language, "episodes", "episodes")})
                  </span>
                )}
              </h3>

              <div className="h-72">
                {episodeHistory.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={episodeHistory}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={theme === "dark" ? "#333" : "#ccc"}
                      />
                      <XAxis
                        dataKey="episode"
                        stroke={theme === "dark" ? "#888" : "#666"}
                        fontSize={12}
                        label={{
                          value: "Episode",
                          position: "insideBottom",
                          offset: -5,
                          fill: theme === "dark" ? "#888" : "#666",
                        }}
                      />
                      <YAxis
                        stroke={theme === "dark" ? "#888" : "#666"}
                        fontSize={12}
                        label={{
                          value: "Reward",
                          angle: -90,
                          position: "insideLeft",
                          fill: theme === "dark" ? "#888" : "#666",
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor:
                            theme === "dark" ? "#1a1a2e" : "#fff",
                          border:
                            theme === "dark"
                              ? "1px solid #00ff41"
                              : "1px solid #ccc",
                          borderRadius: "8px",
                        }}
                        labelFormatter={(label) => `Episode ${label}`}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="reward"
                        stroke={theme === "dark" ? "#ff6b6b" : "#e74c3c"}
                        strokeWidth={1}
                        dot={false}
                        name={t(
                          language,
                          "Episode Reward",
                          "Phần Thưởng Episode",
                        )}
                        opacity={0.6}
                      />
                      <Line
                        type="monotone"
                        dataKey="avgReward"
                        stroke={theme === "dark" ? "#00ff41" : "#27ae60"}
                        strokeWidth={2}
                        dot={false}
                        name={t(
                          language,
                          "Avg Reward (20 ep)",
                          "TB Phần Thưởng (20 ep)",
                        )}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3
                        size={48}
                        className="mx-auto mb-2 opacity-30"
                      />
                      <p>
                        {t(
                          language,
                          "Start learning to see progress",
                          "Bắt đầu học để xem tiến trình",
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Algorithm Info */}
            <div
              className={`p-4 rounded-lg border-2 ${theme === "dark" ? "border-primary/30 bg-card/50" : "border-border bg-card"}`}
            >
              <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
                <Info size={20} />{" "}
                {t(language, "About the Algorithm", "Về Thuật Toán")}
              </h3>

              <h4
                className={`text-xl font-bold mb-3 ${theme === "dark" ? "text-primary" : ""}`}
              >
                {t(
                  language,
                  algorithmInfo[algorithm].title,
                  algorithmInfo[algorithm].titleVn,
                )}
              </h4>

              <div className="text-sm whitespace-pre-line leading-relaxed overflow-auto max-h-64 pr-2">
                {t(
                  language,
                  algorithmInfo[algorithm].description,
                  algorithmInfo[algorithm].descriptionVn,
                )}
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
