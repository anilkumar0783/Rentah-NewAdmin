import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ScaleLoader } from "react-spinners";

const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Users = lazy(() => import("./Pages/Users"));
const Listings = lazy(() => import("./Pages/Listings"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<ScaleLoader color="#5ceacf" height={35} width={4} />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="/users"
          element={
            <Suspense fallback={<ScaleLoader color="#5ceacf" height={35} width={4} />}>
              <Users />
            </Suspense>
          }
        />
        <Route
          path="/listings"
          element={
            <Suspense fallback={<ScaleLoader color="#5ceacf" height={35} width={4} />}>
              <Listings />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<ScaleLoader color="#5ceacf" height={35} width={4} />}>
              <PageNotFound />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
