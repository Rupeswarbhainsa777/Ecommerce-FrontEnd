import Menubar from "./Components/MenuBar/Menubar.jsx";
import {Route, Routes, useLocation} from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx"; // <- corrected here
import ManageCategory from "./Pages/ManageCategory/ManageCategory.jsx";
import ManageUser from "./Pages/ManageUser/ManageUser.jsx";
import ManageItems from "./Pages/ManageItems/ManageItems.jsx";
import Explore from "./Pages/Explore/Explore.jsx";
import Login from "./Pages/Login/Login.jsx";
import {Toaster} from "react-hot-toast";

const App = () => {

    const location = useLocation();
    return (
        <div>
            {location.pathname!== "/login" && <Menubar/>}
            <Toaster/>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/category" element={<ManageCategory />} />
                <Route path="/users" element={<ManageUser />} />
                <Route path="/items" element={<ManageItems />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </div>
    );
}

export default App;
