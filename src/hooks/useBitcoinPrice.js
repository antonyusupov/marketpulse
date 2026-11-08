import { useState, useRef, useEffect } from "react";

export function useBitcoinPrice() {
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
  return { bitcoinPrice, loading, error, handleClick };
}
