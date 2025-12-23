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
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <header>
        <div className="max-w-5xl mx-auto flex justify-between items-center pt-8 px-6 pb-4">
          <Link
            to="/"
            className="font-display font-bold text-2xl text-darkgray"
          >
            <img src="/platera-logo.svg" alt="Platera" className="h-8" />
          </Link>

          <nav>
            <Link
              to="/favorites"
              className="flex items-center mr-4 text-mediumgray transition-transform hover:scale-105"
            >
              <Heart className={iconClasses} />
              <span>Favorites</span>
              {hasFavorites && (
                <span className="text-xs ml-1 relative -top-1">
                  {favorites.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto w-full px-3 pb-4">
        <Outlet />
      </main>

      <footer className="bg-white text-center text-mediumgray border-t border-gray-200 pt-8 px-6 pb-4">
        &copy; {new Date().getFullYear()} Platera
      </footer>
    </div>
  );
};

export default Layout;
