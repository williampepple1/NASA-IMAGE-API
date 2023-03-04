import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import ShowResults from './pages/ShowResults';

function App() {

    return (
      <div >
        <Router>
          <Routes>
              <Route path='/' element={<SearchPage />}/>
              <Route path='/search-results' element={<ShowResults />}/>
          </Routes>
        </Router>
      </div>
    )
  
}

export default App
