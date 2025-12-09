import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { useState, useEffect } from 'react';
import { Quote, RefreshCw, Cat, Rocket, Code, Cloud, Thermometer, Wind, Droplets } from 'lucide-react';

interface APIData {
  name: string;
  icon: React.ReactNode;
  data: any;
  loading: boolean;
  error: string | null;
}

function QuoteCard({ data, loading, onRefresh }: { data: any; loading: boolean; onRefresh: () => void }) {
  const { theme } = useTheme();
  
  return (
    <motion.div
      className="grid-cell relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* CV-style decorative line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
      
      <div className="flex items-center justify-between mb-4 pl-4">
        <div className="flex items-center gap-2">
          <Quote size={20} className={theme === 'dark' ? 'text-accent' : 'text-primary'} />
          <h3 className="text-lg font-bold font-sans">Daily Inspiration</h3>
        </div>
        <button onClick={onRefresh} disabled={loading} className="p-2 hover:bg-muted/50 rounded transition-colors">
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>
      
      <div className="pl-4">
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        ) : (
          <>
            <blockquote className={`text-xl italic mb-3 leading-relaxed ${theme === 'dark' ? 'text-foreground' : ''}`}>
              "{data?.content}"
            </blockquote>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="w-8 h-px bg-current" />
              {data?.author}
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
}

function CatFactCard({ data, loading, onRefresh }: { data: any; loading: boolean; onRefresh: () => void }) {
  const { theme } = useTheme();
  
  return (
    <motion.div
      className="grid-cell relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
    >
      {/* Corner decoration */}
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-current opacity-30" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-current opacity-30" />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Cat size={20} className={theme === 'dark' ? 'text-accent' : 'text-primary'} />
          <h3 className="text-lg font-bold font-sans">Cat Facts</h3>
        </div>
        <button onClick={onRefresh} disabled={loading} className="p-2 hover:bg-muted/50 rounded transition-colors">
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>
      
      <div className={`p-4 border-l-4 ${theme === 'dark' ? 'border-accent bg-accent/5' : 'border-primary bg-muted/30'}`}>
        {loading ? (
          <div className="animate-pulse h-4 bg-muted rounded w-full" />
        ) : (
          <p className="text-base leading-relaxed">{data?.fact}</p>
        )}
      </div>
    </motion.div>
  );
}

function JokeCard({ data, loading, onRefresh }: { data: any; loading: boolean; onRefresh: () => void }) {
  const { theme } = useTheme();
  
  return (
    <motion.div
      className="grid-cell relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      {/* Horizontal decorative lines */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />
      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Code size={20} className={theme === 'dark' ? 'text-accent' : 'text-primary'} />
          <h3 className="text-lg font-bold font-sans">Dev Humor</h3>
        </div>
        <button onClick={onRefresh} disabled={loading} className="p-2 hover:bg-muted/50 rounded transition-colors">
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>
      
      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-base font-medium">{data?.setup}</p>
          <p className={`text-lg ${theme === 'dark' ? 'text-accent' : 'text-primary'} font-bold`}>
            → {data?.punchline}
          </p>
        </div>
      )}
    </motion.div>
  );
}

function SpaceNewsCard({ data, loading, onRefresh }: { data: any; loading: boolean; onRefresh: () => void }) {
  const { theme } = useTheme();
  
  return (
    <motion.div
      className="grid-cell relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      {/* Dot decoration */}
      <div className="absolute top-4 right-4 flex gap-1">
        <span className="w-2 h-2 rounded-full bg-current opacity-30" />
        <span className="w-2 h-2 rounded-full bg-current opacity-50" />
        <span className="w-2 h-2 rounded-full bg-current opacity-70" />
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Rocket size={20} className={theme === 'dark' ? 'text-accent' : 'text-primary'} />
          <h3 className="text-lg font-bold font-sans">Space News</h3>
        </div>
        <button onClick={onRefresh} disabled={loading} className="p-2 hover:bg-muted/50 rounded transition-colors">
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>
      
      {loading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-5 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-1/4" />
        </div>
      ) : (
        <div className="space-y-2">
          <h4 className="text-lg font-medium leading-tight">{data?.title}</h4>
          <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <span className="w-4 h-px bg-current" />
            {data?.source}
          </p>
        </div>
      )}
    </motion.div>
  );
}

function WeatherCard({ data, loading, onRefresh }: { data: any; loading: boolean; onRefresh: () => void }) {
  const { theme } = useTheme();
  
  return (
    <motion.div
      className="grid-cell md:col-span-2 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
    >
      {/* Weather pattern decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-4 left-1/4 w-12 h-12 rounded-full border-2 border-current" />
        <div className="absolute bottom-8 right-1/3 w-8 h-8 rounded-full border-2 border-current" />
        <div className="absolute top-1/2 right-1/4 w-6 h-6 rounded-full border-2 border-current" />
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Cloud size={20} className={theme === 'dark' ? 'text-accent' : 'text-primary'} />
          <h3 className="text-lg font-bold font-sans">Weather - Ho Chi Minh City</h3>
        </div>
        <button onClick={onRefresh} disabled={loading} className="p-2 hover:bg-muted/50 rounded transition-colors">
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>
      
      {loading ? (
        <div className="animate-pulse grid grid-cols-3 gap-4">
          <div className="h-16 bg-muted rounded" />
          <div className="h-16 bg-muted rounded" />
          <div className="h-16 bg-muted rounded" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div className={`p-4 border ${theme === 'dark' ? 'border-primary/30 bg-primary/5' : 'border-border bg-muted/30'} text-center`}>
            <Thermometer size={24} className="mx-auto mb-2 text-destructive" />
            <p className="text-2xl font-bold">{data?.temp}°C</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Temperature</p>
          </div>
          <div className={`p-4 border ${theme === 'dark' ? 'border-primary/30 bg-primary/5' : 'border-border bg-muted/30'} text-center`}>
            <Droplets size={24} className="mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold">{data?.humidity}%</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Humidity</p>
          </div>
          <div className={`p-4 border ${theme === 'dark' ? 'border-primary/30 bg-primary/5' : 'border-border bg-muted/30'} text-center`}>
            <Wind size={24} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold">{data?.wind} m/s</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Wind</p>
          </div>
        </div>
      )}
      
      {data?.description && (
        <p className="mt-4 text-center text-sm capitalize text-muted-foreground">
          {data.description}
        </p>
      )}
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
    weather: {
      name: 'Weather',
      icon: <Cloud size={20} />,
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

  const fetchWeather = async () => {
    setApis(prev => ({ ...prev, weather: { ...prev.weather, loading: true, error: null } }));
    try {
      // Using Open-Meteo API (free, no API key required)
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=10.8231&longitude=106.6297&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code');
      const data = await res.json();
      const weatherCodes: Record<number, string> = {
        0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
        45: 'Fog', 48: 'Depositing rime fog', 51: 'Light drizzle', 53: 'Moderate drizzle',
        55: 'Dense drizzle', 61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
        80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
        95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Thunderstorm with heavy hail'
      };
      setApis(prev => ({ 
        ...prev, 
        weather: { 
          ...prev.weather, 
          data: { 
            temp: Math.round(data.current.temperature_2m),
            humidity: data.current.relative_humidity_2m,
            wind: data.current.wind_speed_10m.toFixed(1),
            description: weatherCodes[data.current.weather_code] || 'Unknown'
          }, 
          loading: false 
        } 
      }));
    } catch {
      setApis(prev => ({ 
        ...prev, 
        weather: { 
          ...prev.weather, 
          data: { temp: 32, humidity: 75, wind: 3.5, description: 'Partly cloudy' }, 
          loading: false 
        } 
      }));
    }
  };

  useEffect(() => {
    fetchQuote();
    fetchCatFact();
    fetchJoke();
    fetchSpaceNews();
    fetchWeather();
  }, []);

  return (
    <section id="api-playground" className={`py-20 px-4 border-t-2 border-foreground relative`}>
      {/* CV-style vertical decorative lines */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-foreground/20 to-transparent hidden lg:block" />
      <div className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-foreground/20 to-transparent hidden lg:block" />
      
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Decorative element */}
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-transparent hidden md:block" />
          
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
          
          {/* Horizontal line decoration */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-foreground/50 to-transparent" />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Live Feed</span>
            <div className="flex-1 h-px bg-gradient-to-l from-foreground/50 to-transparent" />
          </div>
        </motion.div>

        {/* API Grid - Decorative layout */}
        <div className="grid md:grid-cols-2 gap-6">
          <QuoteCard data={apis.quote.data} loading={apis.quote.loading} onRefresh={fetchQuote} />
          <CatFactCard data={apis.catFact.data} loading={apis.catFact.loading} onRefresh={fetchCatFact} />
          <JokeCard data={apis.joke.data} loading={apis.joke.loading} onRefresh={fetchJoke} />
          <SpaceNewsCard data={apis.spaceNews.data} loading={apis.spaceNews.loading} onRefresh={fetchSpaceNews} />
          <WeatherCard data={apis.weather.data} loading={apis.weather.loading} onRefresh={fetchWeather} />
        </div>
      </div>
    </section>
  );
}
