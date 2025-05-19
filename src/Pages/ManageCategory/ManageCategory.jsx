import './MangeCategory.css'
import CategoryFrom from "../../Components/CategoryFrom/CategoryFrom.jsx";
import CategoryList from "../../Components/CategoryList/CategoryList.jsx";

const ManageCategory=()=>{
    return (
        <div>
            <div className="category-container text-light">

                <div className="left-column">
                    <CategoryFrom/>
              </div>

                <div className="right-column">
                   <CategoryList/>
                </div>
            </div>

        </div>
    );
}

export default ManageCategory;


