import { useLocation } from "react-router-dom";
import { Header, Footer } from "../components";
import { Template } from "../templates";

export default function Layout({ children }) {
  const location = useLocation();
  const routes = ["/login", "/signup", "/admin/login", "/admin/signup"];
  const showHeaderFooter = !routes.includes(location.pathname);
  return (
    <Template>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </Template>
  );
}
