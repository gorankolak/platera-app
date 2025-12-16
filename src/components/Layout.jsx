import { Outlet, Link } from "react-router";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto">
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">
          Platera
        </Link>
        <nav>
          <Link to="/favorites" className="mr-4 hover:underline">
            Favorites
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white text-center p-4">
        &copy; {new Date().getFullYear()} Platera
      </footer>
    </div>
  );
};

export default Layout;
