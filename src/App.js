import { BrowserRouter, Routes, Route } from "react-router-dom";

//import all context provider
import { CityContextProvider } from "./context/CityContext";
import { ConditionsContextProvider } from "./context/ConditionsContext";
import { ChartContextProvider } from "./context/ChartContext";

//import pages
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="App">
      <ChartContextProvider>
        <CityContextProvider>
          <ConditionsContextProvider>
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
              </Routes>
            </BrowserRouter>
          </ConditionsContextProvider>
        </CityContextProvider>
      </ChartContextProvider>
    </div>
  );
}

export default App;
