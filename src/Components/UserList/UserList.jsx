import { useState } from "react";
import { deleteUser } from "../../service/UserService.js";
import toast from "react-hot-toast";

const UserList = ({ users, setUsers }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteByUserId = async (id) => {
        try {
            await deleteUser(id);
            setUsers(prevUsers => prevUsers.filter(user => user.userId !== id));
            toast.success("User deleted successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Unable to delete user");
        }
    };

    return (
        <div className="category-list-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <div className="pe-2 row">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        name="keyword"
                        id="keyword"
                        className="form-control"
                        placeholder="Search for keywords"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                    <span className="input-group-text bg-warning">
            <i className="bi bi-search" />
          </span>
                </div>
            </div>

            <div className="row g-3 pe-2">
                {filteredUsers.map((user, index) => (
                    <div key={index} className="col-12">
                        <div className="card bg-dark text-white">
                            <div className="card-body d-flex align-items-center justify-content-between">
                                <div>
                                    <h5 className="mb-1">{user.name}</h5>
                                    <p className="mb-0">{user.email}</p>
                                </div>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteByUserId(user.userId)}
                                >
                                    <i className="bi bi-trash" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;
