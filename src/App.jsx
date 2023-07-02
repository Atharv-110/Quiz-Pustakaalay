import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";

// import components
import Game from './components/game';
import Summary from './components/summary';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Game />}/>
        {/* <Route exact path="/instruction" element={<Instruction />}/> */}
        {/* <Route exact path="/level" element={<Level />}/> */}
        {/* <Route exact path="/game" element={<Game />}/> */}
        <Route exact path="/summary" element={<Summary />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
