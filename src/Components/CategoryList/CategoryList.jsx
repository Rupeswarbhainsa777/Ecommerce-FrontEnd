import {useContext, useMemo, useState} from "react";
import './CategoryList.css';
import {AppContext} from "../../context/AppContext.jsx";
import {deleteCategory} from "../../service/CategoryService.js";
import toast from "react-hot-toast";


const CategoryList = () => {
    const {categories,setCategories} = useContext(AppContext);
    const [serchTerm, setSerchTerm] = useState('');
    const filteredCategories = categories.filter(
        category => category.name.toLowerCase().includes(serchTerm.toLowerCase())
    );

    const  deleteByCategoryId =async (categoryId) => {
        try {
            const response = await deleteCategory(categoryId);

            if (response.status === 204) {
                const updatesCategory = categories.filter(category => category.categoryId !== categoryId);
                setCategories(updatesCategory);
                // display toast message
                toast.success("Category deleted!");


            } else {


                toast.error("Unable to deleted  Category");

            }
        } catch (error) {
            console.log(error);
            toast.error("Unable to deleted  Category");
            //display toast  err  message
        }

    }

    return (
        <div className="category-list-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}
        >

            <div className="pe-2 row">
                <div className="input-group mb-3" >
                    <input type="text"
                           name="keyword"
                           id="keyword"
                           className="form-control"
                           placeholder="Search for keywords"

                           onChange={(e)=> setSerchTerm(e.target.value)}
                           value={serchTerm}
                    />
                    <span className="input-group-text bg-warning">
                             <i className="bi  bi-search"/>
                         </span>
                </div>

            </div>

            <div className="row g-3 pe-2">
                {filteredCategories.map((category,index) => (
                    <div key={index}  className="col-12">
                        <div className="card p-3"  style={{backgroundColor:category.bgColor}}>
                            <div className="d-flex align-items-center">
                                <div style={{marginRight: '15px'}}>


                                    <img src={category.imgUrl} alt={category.name} className="category-image" />


                                </div>

                                <div className="flex-grow-1">
                                    <h5 className="mb-1 text-white">{category.name}</h5>
                                    <p className="mb-0 text-white">{category.items}</p>


                                </div>

                                <button className="btn btn-danger btn-sm"
                                        onClick={()=>{
                                            deleteByCategoryId(category.categoryId)
                                        }}

                                >
                                    <i className="bi bi-trash "></i>
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default CategoryList;