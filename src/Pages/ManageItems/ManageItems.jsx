import UserForm from "../../Components/UserForm/UserForm.jsx";
import ItemList from "../../Components/ItemList/ItemList.jsx";
import ItemFrom from "../../Components/ItemForm/ItemFrom.jsx";

const ManageItems=()=>{
    return (
        <div>
            <div className="category-container text-light">

                <div className="left-column">
                   <ItemFrom/>
                </div>

                <div className="right-column">
                    <ItemList/>
                </div>
            </div>

        </div>
    );
}

export default ManageItems;


