import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom';

// importando as rotas
import Home from './pages/Home.jsx'
import Movie from './pages/Movie.jsx'
import Search from './pages/Search.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>
        <Route element={<App/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/movie/:id" element={<Movie/>}/>
        </Route>
      </Routes>

    </BrowserRouter>
  </React.StrictMode>,
)
