import { lazy, Suspense } from "react";
const Home = lazy(() => import('./components/Home'));
import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"
const Sold = lazy(() => import('./components/Sold'));
import Spinner from "./components/Spinner";
import "./App.css"
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
function App() {

  let location = useLocation()

  return (
    <div className="App">
      {location.pathname === "/home" || location.pathname === "/purchase" ? <Navbar /> : null}
      <Routes>
        <Route path='*' element={<h1 style={{textAlign: "center"}}>Page does not exist</h1>} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Lazy loading elements for optimization */}
        <Route path="/home" element={
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        } />
        <Route path="/purchase" element={
          <Suspense fallback={<Spinner />}>
            <Sold />
          </Suspense>
        } />
      </Routes>
      {location.pathname === "/home" || location.pathname === "/purchase" ? <Footer /> : null}
    </div>
  )
}

export default App
