import { useEffect, useState, useRef } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-900">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="md:hidden">
          <button
            type="button"
            className="text-white hover:text-gray-300 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20 8H4V6h16v2zm0 5H4v-2h16v2zm0 5H4v-2h16v2z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 8h16V6H4v2zm0 5h16v-2H4v2zm0 5h16v-2H4v2z"
                />
              )}
            </svg>
          </button>
        </div>
        {/* Render the menu when it's open */}
        {isMenuOpen && (
          <div
            className="absolute top-0 left-0 right-0 bg-gray-900 w-full"
            ref={menuRef}
          >
            <ul className="px-4 py-2 space-y-2">
              <li>
                <a
                  href="#"
                  className="block text-white hover:text-gray-300"
                >
                  Scan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block text-white hover:text-gray-300"
                >
                  Profile
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;