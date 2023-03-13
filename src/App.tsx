import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import SearchPage from './pages/SearchPage';
import ShowResults from './pages/ShowResults';
import 'react-toastify/dist/ReactToastify.css'

function App() {

    return (
      <>
        <div >
          <Router>
            <Routes>
                <Route path='/' element={<SearchPage />}/>
                <Route path='/search-results' element={<ShowResults/>
              }/>
            </Routes>
          </Router>
        </div>
        <ToastContainer />
      </>
    )
  
}

export default App
