import { Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EstimatePage from "./pages/EstimatePage";
import ResultPage from "./pages/ResultPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <>
      {/* Fixed photo + dark scrim behind every page, so the villa background
          is always visible and text stays readable on top of it. */}
      <div className="bg-image" aria-hidden="true" />
      <div className="bg-scrim" aria-hidden="true" />

      <div className="app-shell">
        <header className="app-header">
          <Link className="app-header__mark" to="/" aria-label="Home">
            🏠
          </Link>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/estimate" element={<EstimatePage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <footer className="app-footer">Estimates are model output, not a valuation.</footer>
      </div>
    </>
  );
}
