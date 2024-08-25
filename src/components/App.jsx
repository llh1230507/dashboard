import "../App.css";
import Dashboard from "../components/Dashboard";
import carData from "../taladrod-cars.min.json";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import HighlightedCar from "./highlightedcar";
import Sales from "./Sales";

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="sidebar">
          <ul>
            <li>
              <NavLink
                to="/dashboard/"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/highlightedcar"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Pinned Cars
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/Sales" className={({ isActive }) => (isActive ? "active-link" : "")}>
                Sales
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard data={carData} />} />
            <Route
              path="/dashboard/highlightedcar"
              element={<HighlightedCar />}
            />
            <Route path="/dashboard/Sales" element={<Sales />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
