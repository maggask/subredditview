import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("username") || null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();
    const loginAction = async (data) => {
        try {
            // Under normal circumstances, this would be an API call
            // but there is no API so this will be hardcoded
            if (
                data.username === "admin" &&
                data.password === "securepassword"
            ) {
                setUser(data.username);
                // hardcode some fake token, normally this would be returned from the API
                setToken("token");
                localStorage.setItem("username", "admin");
                localStorage.setItem("site", "token");
                navigate("/subredditview");
                return;
            }
            throw new Error("Invalid credentials");
        } catch (err) {
            console.error(err);
        }
    };

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("username");
        localStorage.removeItem("site");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
