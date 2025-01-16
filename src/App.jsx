import { useState } from 'react'
/*import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'*/
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Baranglist from './component/Baranglist';
import Add from './component/Add';
import Edit from './component/Edit';

function App() {
  return (
    
    <div className = "container">
      <h1 className="mt-5 mb-5 text-center"><b>STOK BARANG "TOKO RATNA"</b>
      </h1>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Baranglist />} />
            <Route path="/add" element={<Add />} />
            <Route path="/edit/:barang_id" element={<Edit />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
