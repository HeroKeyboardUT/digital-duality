import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Brain, Zap, TrendingUp, Activity } from 'lucide-react';

// Simple Snake AI Game
function SnakeAI() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stats, setStats] = useState({
    reward: 0,
    epsilon: 1.0,
    episode: 0,
    bestScore: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gridSize = 10;
    const cellSize = canvas.width / gridSize;
    
    let snake = [{ x: 5, y: 5 }];
    let food = { x: 7, y: 7 };
    let direction = { x: 1, y: 0 };
    let score = 0;
    let episode = 0;
    let epsilon = 1.0;
    let bestScore = 0;

    const getRandomFood = () => ({
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    });

    const draw = () => {
      // Clear
      ctx.fillStyle = 'hsl(222, 47%, 8%)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = 'hsl(180, 100%, 50%, 0.1)';
      for (let i = 0; i <= gridSize; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
      }

      // Food
      ctx.fillStyle = 'hsl(0, 100%, 50%)';
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'hsl(0, 100%, 50%)';
      ctx.fillRect(food.x * cellSize + 2, food.y * cellSize + 2, cellSize - 4, cellSize - 4);
      ctx.shadowBlur = 0;

      // Snake
      snake.forEach((segment, i) => {
        ctx.fillStyle = i === 0 ? 'hsl(180, 100%, 50%)' : 'hsl(180, 100%, 40%)';
        ctx.shadowBlur = i === 0 ? 15 : 0;
        ctx.shadowColor = 'hsl(180, 100%, 50%)';
        ctx.fillRect(segment.x * cellSize + 1, segment.y * cellSize + 1, cellSize - 2, cellSize - 2);
      });
      ctx.shadowBlur = 0;
    };

    const update = () => {
      // Simple Q-learning inspired movement
      const head = snake[0];
      const possibleMoves = [
        { x: 1, y: 0 }, { x: -1, y: 0 },
        { x: 0, y: 1 }, { x: 0, y: -1 },
      ];

      // Exploration vs Exploitation
      if (Math.random() < epsilon) {
        direction = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      } else {
        // Greedy: move towards food
        const dx = food.x - head.x;
        const dy = food.y - head.y;
        if (Math.abs(dx) > Math.abs(dy)) {
          direction = { x: dx > 0 ? 1 : -1, y: 0 };
        } else {
          direction = { x: 0, y: dy > 0 ? 1 : -1 };
        }
      }

      const newHead = {
        x: (head.x + direction.x + gridSize) % gridSize,
        y: (head.y + direction.y + gridSize) % gridSize,
      };

      // Check collision with self
      if (snake.some(s => s.x === newHead.x && s.y === newHead.y)) {
        // Reset
        episode++;
        if (score > bestScore) bestScore = score;
        epsilon = Math.max(0.1, epsilon * 0.995);
        snake = [{ x: 5, y: 5 }];
        food = getRandomFood();
        score = 0;
        setStats({ reward: score, epsilon, episode, bestScore });
        return;
      }

      snake.unshift(newHead);

      // Check food
      if (newHead.x === food.x && newHead.y === food.y) {
        score += 10;
        food = getRandomFood();
      } else {
        snake.pop();
      }

      setStats({ reward: score, epsilon, episode, bestScore });
    };

    draw();
    const interval = setInterval(() => {
      update();
      draw();
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="border border-primary/30 rounded"
      />
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-accent" />
          <span>Reward: <span className="text-primary font-mono">{stats.reward}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-accent" />
          <span>ε: <span className="text-primary font-mono">{stats.epsilon.toFixed(3)}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-accent" />
          <span>Episode: <span className="text-primary font-mono">{stats.episode}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <Brain size={14} className="text-accent" />
          <span>Best: <span className="text-primary font-mono">{stats.bestScore}</span></span>
        </div>
      </div>
    </div>
  );
}

export function AILabSection() {
  const { theme, language } = useTheme();

  return (
    <section id="ai-lab" className={`py-20 px-4 border-t-2 border-foreground ${theme === 'dark' ? 'hex-pattern' : ''}`}>
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="label-text mb-2">04 // {t(language, 'AI LAB', 'PHÒNG THÍ NGHIỆM AI')}</div>
          <h2 className={`text-4xl sm:text-5xl font-sans font-black mb-4 ${theme === 'dark' ? 'neon-text' : ''}`}>
            {t(language, 'MACHINE LEARNING', 'HỌC MÁY')}
          </h2>
          <p className="text-base max-w-2xl">
            {t(language,
              'Live AI experiments running 24/7. Watch reinforcement learning agents learn in real-time.',
              'Thí nghiệm AI chạy 24/7. Xem các agent học tăng cường học trong thời gian thực.'
            )}
          </p>
        </motion.div>

        {/* AI Lab Grid */}
        <div className="flex justify-center">
          {/* Snake AI - Centered */}
          <motion.div
            className="grid-cell max-w-md w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Brain className={`${theme === 'dark' ? 'text-accent' : 'text-primary'}`} />
              <h3 className="text-xl font-bold">Snake AI - Q-Learning</h3>
            </div>
            <p className="text-sm mb-4 text-muted-foreground">
              {t(language,
                'A simple Q-learning agent learning to play Snake. Watch epsilon decay as it learns!',
                'Agent Q-learning đơn giản học chơi Snake. Xem epsilon giảm dần khi nó học!'
              )}
            </p>
            <SnakeAI />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
