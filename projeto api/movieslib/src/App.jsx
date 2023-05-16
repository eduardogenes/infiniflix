
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Search from './pages/Search'

function App() {

  return (
    <div>      
      <Navbar/>
      <Outlet />
    </div>
  )
}

export default App
