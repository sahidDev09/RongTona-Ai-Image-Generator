import Examples from "./components/Examples";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import { useEffect } from "react";
import Lenis from "lenis";
import { Routes, Route } from "react-router-dom";
import Demo from "./components/Demo";
import AIStudio from "./components/AIStudio";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Features />
              <Examples />
              <HowItWorks />
              <Pricing />
              <Footer />
            </>
          }
        />
        <Route path="/demo" element={<Demo />} />
        <Route path="/studio" element={<AIStudio />} />
      </Routes>
    </div>
  );
}

export default App;
