function App() {
  async function handleClick() {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
    );
    const data = await response.json();

    const price = data.bitcoin.usd;

    console.log(price);
  }
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
          <button onClick={handleClick}>Bitcoin Price</button>
        </div>
      </section>
    </>
  );
}

export default App;
