import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-10 text-center">
        <section className="flex flex-col gap-6">
          <h2 className="font-display mx-auto max-w-[22ch] text-5xl leading-tight font-bold sm:max-w-[70ch]">
            Find local
            <span className="block sm:inline"> flavor.</span>
            <span className="text-amber block italic">Anywhere.</span>
          </h2>

          <p className="text-text-muted mx-auto max-w-[70ch] text-base leading-relaxed">
            Discover authentic dishes, hidden gems, and traditional recipes
            around the globe.
          </p>
        </section>

        <SearchBar />
      </div>
    </div>
  );
};

export default Home;
