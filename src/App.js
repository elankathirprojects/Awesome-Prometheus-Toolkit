import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrometheusAlert from './prometheusAlerts'


function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
          <Route index element={<PrometheusAlert />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
