import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';

import AuthRoutes from './routes/AuthRoutes';
import UnAuthRoutes from './routes/UnAuthRoutes';
import { GlobalProvider } from './context/GlobalState';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";      
//core
import "primereact/resources/primereact.min.css";   
//icons
import 'primeicons/primeicons.css';

import './App.css';

function App() {
    
    return (
        <div className="App">
            <GlobalProvider>
                <BrowserRouter>
                    <Routes>
                        {AuthRoutes}
                        {UnAuthRoutes}
                    </Routes>
                </BrowserRouter>
            </GlobalProvider>
        </div>
    );
}

export default App;
