import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { useState, useEffect } from 'react';
import { Globe, Cloud, Coins, Quote, RefreshCw, Cat, Rocket, Code } from 'lucide-react';

interface APIData {
  name: string;
  icon: React.ReactNode;
  data: any;
  loading: boolean;
  error: string | null;
}

function APICard({ api, onRefresh }: { api: APIData; onRefresh: () => void }) {
  const { theme } = useTheme();

  return (
    <motion.div
      className="grid-cell"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={theme === 'dark' ? 'text-accent' : 'text-primary'}>{api.icon}</span>
          <h3 className="text-lg font-bold">{api.name}</h3>
        </div>
        <button
          onClick={onRefresh}
          className={`p-2 rounded transition-colors ${
            theme === 'dark' ? 'hover:bg-primary/20' : 'hover:bg-muted'
          }`}
          disabled={api.loading}
        >
          <RefreshCw size={16} className={api.loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className={`p-4 rounded border ${
        theme === 'dark' ? 'bg-background/50 border-primary/20' : 'bg-muted/50 border-border'
      }`}>
        {api.loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw size={14} className="animate-spin" />
            Loading...
          </div>
        ) : api.error ? (
          <p className="text-sm text-destructive">{api.error}</p>
        ) : (
          <pre className="text-xs font-mono overflow-auto max-h-32">
            {JSON.stringify(api.data, null, 2)}
          </pre>
        )}
      </div>
    </motion.div>
  );
}

export function APIPlaygroundSection() {
  const { theme, language } = useTheme();
  const [apis, setApis] = useState<Record<string, APIData>>({
    quote: {
      name: 'Random Quote',
      icon: <Quote size={20} />,
      data: null,
      loading: true,
      error: null,
    },
    catFact: {
      name: 'Cat Facts',
      icon: <Cat size={20} />,
      data: null,
      loading: true,
      error: null,
    },
    joke: {
      name: 'Programming Jokes',
      icon: <Code size={20} />,
      data: null,
      loading: true,
      error: null,
    },
    spaceNews: {
      name: 'Space News',
      icon: <Rocket size={20} />,
      data: null,
      loading: true,
      error: null,
    },
  });

  const fetchQuote = async () => {
    setApis(prev => ({ ...prev, quote: { ...prev.quote, loading: true, error: null } }));
    try {
      const res = await fetch('https://api.quotable.io/random');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setApis(prev => ({ ...prev, quote: { ...prev.quote, data: { content: data.content, author: data.author }, loading: false } }));
    } catch {
      setApis(prev => ({ ...prev, quote: { ...prev.quote, data: { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" }, loading: false } }));
    }
  };

  const fetchCatFact = async () => {
    setApis(prev => ({ ...prev, catFact: { ...prev.catFact, loading: true, error: null } }));
    try {
      const res = await fetch('https://catfact.ninja/fact');
      const data = await res.json();
      setApis(prev => ({ ...prev, catFact: { ...prev.catFact, data: { fact: data.fact }, loading: false } }));
    } catch {
      setApis(prev => ({ ...prev, catFact: { ...prev.catFact, data: { fact: "Cats sleep 70% of their lives." }, loading: false } }));
    }
  };

  const fetchJoke = async () => {
    setApis(prev => ({ ...prev, joke: { ...prev.joke, loading: true, error: null } }));
    try {
      const res = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');
      const data = await res.json();
      setApis(prev => ({ ...prev, joke: { ...prev.joke, data: { setup: data[0]?.setup, punchline: data[0]?.punchline }, loading: false } }));
    } catch {
      setApis(prev => ({ ...prev, joke: { ...prev.joke, data: { setup: "Why do programmers prefer dark mode?", punchline: "Because light attracts bugs!" }, loading: false } }));
    }
  };

  const fetchSpaceNews = async () => {
    setApis(prev => ({ ...prev, spaceNews: { ...prev.spaceNews, loading: true, error: null } }));
    try {
      const res = await fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=1');
      const data = await res.json();
      const article = data.results?.[0];
      setApis(prev => ({ ...prev, spaceNews: { ...prev.spaceNews, data: { title: article?.title, source: article?.news_site }, loading: false } }));
    } catch {
      setApis(prev => ({ ...prev, spaceNews: { ...prev.spaceNews, data: { title: "SpaceX launches new satellite", source: "SpaceNews" }, loading: false } }));
    }
  };

  useEffect(() => {
    fetchQuote();
    fetchCatFact();
    fetchJoke();
    fetchSpaceNews();
  }, []);

  const refreshHandlers: Record<string, () => void> = {
    quote: fetchQuote,
    catFact: fetchCatFact,
    joke: fetchJoke,
    spaceNews: fetchSpaceNews,
  };

  return (
    <section id="api-playground" className={`py-20 px-4 border-t-2 border-foreground`}>
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="label-text mb-2">05 // {t(language, 'API PLAYGROUND', 'SÂN CHƠI API')}</div>
          <h2 className={`text-4xl sm:text-5xl font-sans font-black mb-4 ${theme === 'dark' ? 'neon-text' : ''}`}>
            {t(language, 'LIVE DATA', 'DỮ LIỆU TRỰC TIẾP')}
          </h2>
          <p className="text-base max-w-2xl">
            {t(language,
              'Real-time data from popular public APIs. Click refresh to get new data!',
              'Dữ liệu thời gian thực từ các API công khai phổ biến. Nhấn refresh để lấy dữ liệu mới!'
            )}
          </p>
        </motion.div>

        {/* API Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(apis).map(([key, api]) => (
            <APICard key={key} api={api} onRefresh={refreshHandlers[key]} />
          ))}
        </div>
      </div>
    </section>
  );
}
