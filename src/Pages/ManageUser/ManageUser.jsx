import UserForm from "../../Components/UserForm/UserForm.jsx";
import UserList from "../../Components/UserList/UserList.jsx";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {fetchUser} from "../../service/UserService.js";

const ManageUser=()=>{

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
           async function fetchUsers() {
               try {
                   setLoading(true);
                 const response=await fetchUser();
                 setUsers(response.data);
               }
               catch (err) {

                   console.log(err)
                   toast.error("Unable to fetch users");
               }
               finally {
                   setLoading(false);
               }
           }
           fetchUsers()
    }, []);



    return (
        <div>
            <div className="category-container text-light">

                <div className="left-column">
                  <UserForm setUsers={setUsers}   />
                </div>

                <div className="right-column">
                  <UserList  users={users}  setUsers={setUsers}  />
                </div>
            </div>

        </div>
    );
}

export default ManageUser;


