import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Intenta resetear el scroll global por si acaso
    window.scrollTo(0, 0);

    // 2. Busca si hay contenedores con scroll interno y los manda arriba
    const layouts = document.querySelectorAll(".main-layout, main, div, section");
    layouts.forEach((el) => {
      el.scrollTop = 0;
    });
  }, [pathname]);

  return null;
};