import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import HomePage from "./components/pages/home";
import SignInPage from "./components/pages/sign-in";
import SignUpPage from "./components/pages/sign-up";

function App() {

  return (
    <BrowserRouter>
      <nav className="flex justify-center items-center gap-8">
        <Link to={'/'}>Home</Link>
        <Link to={'/sign-in'}>Sign In</Link>
        <Link to={'/sign-up'}>Sign Up</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
