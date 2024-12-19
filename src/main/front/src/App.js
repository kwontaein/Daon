import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import Dashboard from "./auth/DashBoard";
import SignupForm from "./auth/SignUpForm";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/Signup" element={<SignupForm/>}/>
            </Routes>
        </Router>
    );
}

export default App;
