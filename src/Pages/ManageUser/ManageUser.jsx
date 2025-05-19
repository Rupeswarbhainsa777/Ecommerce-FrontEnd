import UserForm from "../../Components/UserForm/UserForm.jsx";
import UserList from "../../Components/UserList/UserList.jsx";

const ManageUser=()=>{
    return (
        <div>
            <div className="category-container text-light">

                <div className="left-column">
                  <UserForm/>
                </div>

                <div className="right-column">
                  <UserList/>
                </div>
            </div>

        </div>
    );
}

export default ManageUser;


