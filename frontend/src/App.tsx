import { Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResultPage from "./pages/ResultPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="app-header__mark" to="/">
          Sthaan<span>.</span>
        </Link>
        <span className="app-header__tag">House price estimator</span>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="app-footer">Estimates are model output, not a valuation.</footer>
    </div>
  );
}
