import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <>
      <div className="mt-8 mb-10 text-center">
        <h2 className="max-w-70 sm:max-w-xl mx-auto text-5xl font-bold font-display mb-4 leading-tight">
          Find local flavor.{" "}
          <span className="block text-amber text-primary italic">
            Anywhere.
          </span>
        </h2>
        <p className="text-text-muted text-base max-w-70 mx-auto leading-relaxed">
          Discover authentic dishes, hidden gems, and traditional recipes around
          the globe.
        </p>
      </div>

      <SearchBar />
    </>
  );
};

export default Home;
