import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import Dashboard from "./auth/DashBoard";
import SignupForm from "./auth/SignUpForm";
import {TablePage} from "./TablePage";
import {ManageUserPage} from "./ManageUserPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/Signup" element={<SignupForm/>}/>
                <Route path="/TablePage" element={<TablePage/>}/>
                <Route path="/manage/:id" element={<ManageUserPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
