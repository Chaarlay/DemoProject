//import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import withAPI from './services/api';

import { 
  Welcome,
  ClassBatch,
  Learner,
} from './containers';

const App = ({ api }) => {
  return (
    <section className="main-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/learner/:learnerId" element={<Learner />} />
          <Route path="/classbatch/:classbatchId" element={<ClassBatch />} />
          <Route path="/alllearners/" element={<AllLearners />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
