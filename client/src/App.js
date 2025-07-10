import "./App.css";

import Auth from "./Pages/Auth";

import ContextApi from "./Context/ContextApi";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import PublicRoute from "./Publicroute";

import Main from "./Main";
import Chat from "./Pages/Chat";
import Home from "./Pages/Home";
import Setting from "./Pages/Setting";

function App() {
  return (
    <Router>
      <ContextApi>
      
        <Routes>
          <Route
            exec
            path="/auth/user/sign"
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          />
          <Route
            exec
            path="/"
            element={
              <PrivateRoute>
                <Main />{" "}
              </PrivateRoute>
            }
          >

<Route path="/" element={<Home/>}   />
<Route path="/chat/:id" element={<Chat/>}   />
<Route path="/setting" element={<Setting/>}   />




   

          </Route>
        </Routes>
      </ContextApi>
    </Router>
  );
}

export default App;
