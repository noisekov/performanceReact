import { Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/performanceReact" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
