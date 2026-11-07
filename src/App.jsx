import { useState, useEffect, useRef } from "react";

function App() {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const requestId = useRef(0);

  async function handleClick(signal) {
    setError("");
    setLoading(true);
    const currentRequest = ++requestId.current;
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
        { signal },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Bitcoin price");
      }
      const data = await response.json();

      const price = data.bitcoin.usd;

      if (currentRequest === requestId.current) {
        setBitcoinPrice(price);
      }
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }
      if (currentRequest === requestId.current) {
        setError(error.message);
      }
    } finally {
      if (!signal?.aborted && currentRequest === requestId.current) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    handleClick(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);
  //  https://api.coingecko.com/api/v3/invalid-endpoint

  return (
    <>
      <section className="bg-slate-900 min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl text-white font-bold lg:text-7xl">
          MarketPulse
        </h1>
        <p className="text-neutral-500 text-xl mt-3 lg:text-2xl">
          The Market Never Sleeps
        </p>
        <div>
          <button
            disabled={loading}
            className="text-white"
            onClick={() => handleClick()}
          >
            {loading ? "loading" : "Bitcoin Price"}
          </button>
          <p className="text-white">
            {bitcoinPrice === null
              ? "Click to Load Bitcoin price"
              : bitcoinPrice}
          </p>
          <p className="text-white">{error}</p>
        </div>
      </section>
    </>
  );
}

export default App;
