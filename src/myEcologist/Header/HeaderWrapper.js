import { useLocation } from "react-router-dom/dist";
import Header from "./index";

function HeaderWrapper() {
  const location = useLocation();

  return <Header key={location.pathname} />;
}

export default HeaderWrapper;
