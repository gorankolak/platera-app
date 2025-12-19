import { Outlet, Link } from "react-router";

const Layout = () => {
  return (
    // styling in progress - logo and icons to be added
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto">
      <header className="flex justify-between items-center pt-8 px-6 pb-4">
        <Link to="/" className="font-display font-bold text-2xl text-darkgray">
          Platera
        </Link>
        <nav>
          <Link
            to="/favorites"
            className="mr-4 text-mediumgray hover:underline"
          >
            Favorites
          </Link>
        </nav>
      </header>

      <main className="flex-1 px-3 pb-4">
        <Outlet />
      </main>

      <footer className="bg-white text-center text-mediumgray border-t border-gray-200 pt-8 px-6 pb-4">
        &copy; {new Date().getFullYear()} Platera
      </footer>
    </div>
  );
};

export default Layout;
