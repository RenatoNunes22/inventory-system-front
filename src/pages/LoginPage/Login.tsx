/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import LogoMobile from "../../assets/LogoWhite.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import imgBackground from "../../assets/Product.png";
import "./style.css";
import { useMedia } from "../../hooks/mediaQueryHook";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/localStorageHook";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useMedia("(max-width: 1050px)");

  const [, setToken] = useLocalStorage("token", "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setToken("");
  }, []);

  const LoginFunction = (event: any) => {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URI}/Login`, {
        email: username,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          setToken(response.data.token);
          if (response.data.role === 1) {
            navigate("/Inventory");
          } else {
            navigate("/Sold");
          }
        } else {
          console.log("error");
        }
      });
  };

  return (
    <div className={isMobile ? "containerLoginMobile" : "containerLogin"}>
      <form className={isMobile ? "formStyleMobile" : "formStyle"}>
        <img
          src={isMobile ? LogoMobile : Logo}
          style={{ marginBottom: "80px" }}
        />
        <div className={isMobile ? "usernameStyleMobile" : "usernameStyle"}>
          <input
            required
            className="inputStyle"
            placeholder="Digite seu usuário"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="username">
            <AccountCircleIcon sx={{ fontSize: "30px" }} />
          </label>
        </div>
        <div className={isMobile ? "passwordStyleMobile" : "passwordStyle"}>
          <input
            required
            className="inputStyle"
            placeholder="Digite sua senha"
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">
            {showPassword ? (
              <VisibilityIcon
                sx={{ fontSize: "30px", cursor: "pointer" }}
                onClick={toggleShowPassword}
              />
            ) : (
              <VisibilityOffIcon
                sx={{ fontSize: "30px", cursor: "pointer" }}
                onClick={toggleShowPassword}
              />
            )}
          </label>
        </div>
        <button
          onClick={LoginFunction}
          type="submit"
          className={isMobile ? "buttonStyleMobile" : "buttonStyle"}
        >
          Entrar
        </button>
      </form>
      {!isMobile && (
        <div className="imgBackground">
          <img src={imgBackground} className="img" />
        </div>
      )}
    </div>
  );
};
