import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import RedditView from "./components/reddit/RedditView";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./router/route";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/subredditview" element={<RedditView />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
