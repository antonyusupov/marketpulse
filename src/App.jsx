import { useBitcoinPrice } from "./hooks/useBitcoinPrice";

function App() {
  const { bitcoinPrice, loading, error, handleClick } = useBitcoinPrice();
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
