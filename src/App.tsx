import { ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import { AppRoutes } from "./Routes";

const theme = createTheme({
  palette: {
    primary: { main: "#102bc0" },
  },
});

function App() {
  const [modeTheme, setModeTheme] = useState<boolean>(false);
  const handleChangeTheme = () => {
    setModeTheme(!modeTheme);
  };

  return (
    <body style={{ backgroundColor: modeTheme ? "#000E23" : "#ffff" }}>
      <ThemeProvider theme={theme}>
        <AppRoutes switchTheme={handleChangeTheme} modeTheme={modeTheme} />
      </ThemeProvider>
    </body>
  );
}

export default App;
