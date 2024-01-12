import { Grid } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import React from "react";
import { useLocation } from "react-router-dom";
import Logo from "../assets/Logo.png";
import LogoWhite from "../assets/LogoWhite.png";

export type navBarProps = {
  color?: string;
  children?: React.ReactNode;
  switchTheme?: () => void;
  modeTheme: boolean;
};

export const NavBar = ({
  color,
  children,
  switchTheme,
  modeTheme,
}: navBarProps) => {
  const path = useLocation();
  const { pathname } = path;

  const iconStyle = {
    color: modeTheme ? "#000E23" : "#ffff",
    cursor: "pointer",
  };

  if (pathname !== "/") {
    return (
      <Grid
        container={true}
        display={"flex"}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        xs={12}
        lg={12}
        xl={12}
        sx={{
          backgroundColor: color,
          margin: 0,
          padding: "0px 30px",
          height: "65px",
          marginBottom: "50px",
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px",
        }}
      >
        <img src={modeTheme ? Logo : LogoWhite} width={"100px"} />
        <div style={{ display: "flex", gap: "40px" }}>
          {modeTheme ? (
            <LightModeIcon onClick={switchTheme} sx={iconStyle} />
          ) : (
            <DarkModeIcon onClick={switchTheme} sx={iconStyle} />
          )}
        </div>
        {children}
      </Grid>
    );
  }
  return;
};
