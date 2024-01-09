import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Login } from "./pages/LoginPage/Login";

export type appProps = {
  switchTheme: () => void;
  modeTheme: boolean;
};

export const AppRoutes = ({ switchTheme, modeTheme }: appProps) => {
  return (
    <>
      <Router>
        <NavBar
          modeTheme={modeTheme}
          switchTheme={switchTheme}
          color={modeTheme ? "#FFFF" : "#03092e"}
        />
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};
