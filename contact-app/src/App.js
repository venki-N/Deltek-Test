import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Component/Home'
import NotFound from './Component/NotFound';
import Contacts from './Component/Contacts';
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/contact" element={<Contacts />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
