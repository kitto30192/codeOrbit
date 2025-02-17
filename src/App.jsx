import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navber';
import CodeEditor from './components/codeEditor';
import ProblemSection from './problemComponent/problemSection';
import Explore from './exploreSection/explore';
import Login from './loginSection/login';
import SignUp from './loginSection/signUp';
import Dashboard from './Dashboard';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/explore" element={<Explore/>} />
        <Route path="/CodeEditor" element={<CodeEditor/>} />
        <Route path="/problems" element={<div><ProblemSection/></div>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;

