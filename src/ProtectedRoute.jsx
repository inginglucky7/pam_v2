import {useAuth} from "./contexts/AuthContext.jsx";
import {Outlet, useLocation} from "react-router-dom";
import {Navigate} from "react-router-dom";

const checkLoggedIn = () => {
    const { user } = useAuth();
    return user && user.loggedIn;
}

const ProtectedRoute = () => {
    const location = useLocation();
    const isLogged = checkLoggedIn();
    return isLogged ? (
        <Outlet/>
    ) : (
        <Navigate to={"/"} replace state{{from : location}}></Navigate>
    );
};

export default ProtectedRoute;