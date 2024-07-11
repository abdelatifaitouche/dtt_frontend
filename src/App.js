import React , {useContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import Dashboard from './views/Dashboard';
import Homepage from './views/Homepage'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext';
import Chatbot from './views/Chatbot';
import Preloader from './preloader/Preloader';

function App() {
    return (
        <>
        <Preloader/>
        <div className="App">
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path ="/" element={<Homepage/>}/>
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
                    <Route path="/chatbot" element={<PrivateRoute><Chatbot/></PrivateRoute>} />

                    <Route path="/login" element={<LoginPage/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    </div>
        </>
        
    );
}

export default App;
