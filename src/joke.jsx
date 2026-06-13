import { useState } from "react";

export default function JokeApp() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJoke = () => {
    setLoading(true);
    setError(null);

    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((response) => {
        if (!response.ok) throw new Error("Ошибка загрузки");
        return response.json();
      })
      .then((data) => {
        setJoke(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-950 flex items-center justify-center p-8">
      <div className="text-center max-w-lg w-full">
        <h1 className="text-white/80 text-2xl font-light mb-2">Случайная шутка</h1>
        <p className="text-white/20 text-sm mb-12">Random Joke API</p>

        {error ? (
          <div className="mb-8">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        ) : joke ? (
          <div className="mb-8 space-y-4">
            <p className="text-white text-xl font-light">{joke.setup}</p>
            <p className="text-white/40 text-lg">— {joke.punchline}</p>
          </div>
        ) : (
          <div className="mb-8">
            <p className="text-white/20 text-lg">Нажми кнопку чтобы получить шутку</p>
          </div>
        )}

        <button
          onClick={fetchJoke}
          disabled={loading}
          className="px-8 py-3 bg-white/10 border border-white/10 rounded-xl text-white/80 
                     hover:bg-white/20 transition-all disabled:opacity-50 text-sm"
        >
          {loading ? "Загрузка..." : "Получить шутку"}
        </button>
      </div>
    </div>
  );
}