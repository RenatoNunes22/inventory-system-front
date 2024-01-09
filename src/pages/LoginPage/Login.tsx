import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import imgBackground from "../../assets/Product.png";
import "./style.css";

export const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="containerLogin">
      <form>
        <div className="formStyle">
          <img src={Logo} style={{ marginBottom: "80px" }} />
          <div className="usernameStyle">
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
          <div className="passwordStyle">
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
          <button onClick={() => null} type="submit" className="buttonStyle">
            Entrar
          </button>
        </div>
      </form>
      <div className="imgBackground">
        <img src={imgBackground} />
      </div>
    </div>
  );
};
