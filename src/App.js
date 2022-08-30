import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Picker from './pages/Picker';
import Subpicker from './pages/Subpicker';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/myndighetsinformation" element={<Picker />}/>
        <Route caseSensitive path="myndighetsinformation/myndighet/:myndighet" element={<Subpicker />}/>
      </Routes>
    </Router>
  );
}

export default App;
