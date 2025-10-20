import { useState, useEffect } from "react";
import { FaSignInAlt, FaUser, FaUserCircle } from "react-icons/fa";
// Adicionado para navegação SPA (Single Page Application)
import { Link } from "react-router-dom";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  // Ajuste: Adicionado "typeof window" para evitar erros fora do navegador (SSR)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      return savedMode ? JSON.parse(savedMode) : false;
    }
    return false;
  });

  // Ajuste: Adicionado "typeof window" para evitar erros
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== "undefined") {
      const savedSize = localStorage.getItem("fontSize");
      return savedSize ? parseInt(savedSize, 10) : 16;
    }
    return 16;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem("fontSize", fontSize.toString());
  }, [fontSize]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleDarkMode = () => setIsDarkMode((prev: any) => !prev);

  const increaseFontSize = () => {
    setFontSize((currentSize) => Math.min(currentSize + 2, 20));
  };

  const decreaseFontSize = () => {
    setFontSize((currentSize) => Math.max(currentSize - 2, 12));
  };

  return (
    <nav className="menu-container">
      <div className="hidden md:flex justify-between items-center w-full max-w-7xl mx-auto">
        {/* Alterado de <a> para <Link> e href para 'to' */}
        <Link to="/" className="menu-logo">
          <img src="/img/logo-hc.png" alt="Logo do HC" />
        </Link>

        <div className="flex-grow flex justify-center space-x-4">
          {/* Alterado de <a> para <Link> e href para 'to' */}
          <Link to="/" className="menu-link">
            {" "}
            Início{" "}
          </Link>
          <Link to="/integrantes" className="menu-link">
            {" "}
            Integrantes{" "}
          </Link>
          <Link to="/faq" className="menu-link">
            {" "}
            FAQ{" "}
          </Link>
          <Link to="/contato" className="menu-link">
            {" "}
            Contato{" "}
          </Link>
        </div>

        <div className="flex space-x-2">
          {/* Botões permanecem <button> */}
          <button aria-label="Ativar leitor de voz" className="acc-button">
            <img
              src="/img/icone-leitor-voz.png"
              alt="Leitor de voz"
              className="h-6 w-6"
            />
          </button>
          <button
            onClick={increaseFontSize}
            aria-label="Aumentar fonte"
            className="acc-button"
          >
            A+
          </button>
          <button
            onClick={decreaseFontSize}
            aria-label="Diminuir fonte"
            className="acc-button"
          >
            A-
          </button>
          <button
            onClick={toggleDarkMode}
            aria-label="Ativar modo escuro"
            className="acc-button"
          >
            ●
          </button>
          <button><FaUserCircle size={18} color="#000000" /></button>
        </div>
      </div>

      <div className="md:hidden w-ful">
        <div className="flex justify-between items-center p-4">
          {/* Alterado de <a> para <Link> e href para 'to' */}
          <Link to="/" className="menu-logo" onClick={closeMenu}>
            <img src="/img/logo-hc.png" alt="Logo do HC" />
          </Link>

          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-label="Abrir menu"
          >
            <svg
              className="h-6 w-6 text-[#007b7b]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <div
          className={`transition-all duration-300 ${isOpen ? "block" : "hidden"
            }`}
        >
          <div className="flex flex-col items-center p-4 space-y-4">
            <div className="flex flex-col items-center">
              {/* Alterado de <a> para <Link> e href para 'to' */}
              <Link to="/" className="menu-link-mobile" onClick={closeMenu}>
                {" "}
                Início{" "}
              </Link>
              <Link
                to="/integrantes"
                className="menu-link-mobile"
                onClick={closeMenu}
              >
                {" "}
                Integrantes{" "}
              </Link>
              <Link to="/faq" className="menu-link-mobile" onClick={closeMenu}>
                {" "}
                FAQ{" "}
              </Link>
              <Link
                to="/contato"
                className="menu-link-mobile"
                onClick={closeMenu}
              >
                {" "}
                Contato{" "}
              </Link>
            </div>
            <div className="flex space-x-2">
              <button aria-label="Ativar leitor de voz" className="acc-button">
                <img
                  src="/img/icone-leitor-voz.png"
                  alt="Leitor de voz"
                  className="h-6 w-6"
                />
              </button>
              <button
                onClick={increaseFontSize}
                aria-label="Aumentar fonte"
                className="acc-button"
              >
                A+
              </button>
              <button
                onClick={decreaseFontSize}
                aria-label="Diminuir fonte"
                className="acc-button"
              >
                A-
              </button>
              <button
                onClick={toggleDarkMode}
                aria-label="Ativar modo escuro"
                className="acc-button"
              >
                ●
              </button>
              <button><FaUserCircle size={18} color="#000000" /></button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}