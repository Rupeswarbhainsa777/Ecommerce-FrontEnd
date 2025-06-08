import Menubar from "./Components/MenuBar/Menubar.jsx";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx"; // <- corrected here
import ManageCategory from "./Pages/ManageCategory/ManageCategory.jsx";
import ManageUser from "./Pages/ManageUser/ManageUser.jsx";
import ManageItems from "./Pages/ManageItems/ManageItems.jsx";
import Explore from "./Pages/Explore/Explore.jsx";
import Login from "./Pages/Login/Login.jsx";
import {Toaster} from "react-hot-toast";
import {useContext} from "react";
import {AppContext} from "./context/AppContext.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";

const App = () => {

    const location = useLocation();
    const {auth} = useContext(AppContext);
    const LoginRouth =({element})=>{
        if(auth.token){
            return <Navigate to="/dashboard" replace />;
        }
        return element;
    }



    const  ProtectedRoute = ({element,allowedRoles}) => {
        if(!auth.token){
            return <Navigate to="/login" replace />;
        }
        if(allowedRoles && !allowedRoles.includes(auth.role)){
            return <Navigate to={"/dashboard"} replace />;
        }
        return element
    }
    return (
        <div>
            {location.pathname!== "/login" && <Menubar/>}
            <Toaster/>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/explore" element={<Explore />} />
                {/*Admin only routes or see*/}
                <Route path="/category" element={<ProtectedRoute element={<ManageCategory/>} allowedRoles={['ROLE_ADMIN']} />} />
                <Route path="/users" element={<ProtectedRoute element={<ManageUser />} allowedRoles={['ROLE_ADMIN']} />} />
                <Route path="/items" element={<ProtectedRoute element={<ManageItems/>} allowedRoles={['ROLE_ADMIN']} />} />


                <Route path="/login" element={<LoginRouth element={<Login/> } />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="*"   element={<NotFound/>} />
            </Routes>
        </div>
    );
}

export default App;
