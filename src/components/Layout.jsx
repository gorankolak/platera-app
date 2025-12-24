import { Heart } from "lucide-react";
import { Outlet, Link } from "react-router";
import { useFavoritesContext } from "../context/FavoritesContext";

const Layout = () => {
  const { favorites } = useFavoritesContext();
  const hasFavorites = favorites.length > 0;
  const iconClasses = `mr-2 text-mediumgray ${
    hasFavorites ? "fill-mediumgray" : ""
  }`;

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <header>
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6">
          <Link
            to="/"
            className="font-display text-darkgray text-2xl font-bold"
          >
            <img src="/platera-logo.svg" alt="Platera" className="h-8" />
          </Link>

          <nav>
            <Link
              to="/favorites"
              className="text-mediumgray flex items-center transition-transform hover:scale-105"
            >
              <Heart className={iconClasses} />
              <span>Favorites</span>
              {hasFavorites && (
                <span className="relative -top-1 ml-1 text-xs">
                  {favorites.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl">
        <Outlet />
      </main>

      <footer className="text-mediumgray border-t border-gray-200 bg-white px-4 py-6 text-center">
        &copy; {new Date().getFullYear()} Platera
      </footer>
    </div>
  );
};

export default Layout;
