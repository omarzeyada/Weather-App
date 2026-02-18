import "./App.css";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Components
import WeatherApp from "./Weather App/WeatherApp";


const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App' style={{ margin: "20px" }}>
        <title>Weather App</title>
        <WeatherApp />
      </div>
    </ThemeProvider>
  );
}

export default App;
