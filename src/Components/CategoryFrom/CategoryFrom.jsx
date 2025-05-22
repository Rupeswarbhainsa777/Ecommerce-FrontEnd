



import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets.js";
import { addCategory } from "../../service/CategoryService.js";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext.jsx";

const CategoryForm = () => {
    const { setCategories, categories } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        bgColor: "#ffffff",
    });

    useEffect(() => {
        console.log(data);
    }, [data]);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!images) {
            toast.error("Select image for category");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("category", JSON.stringify(data));
        formData.append("file", images);

        try {
            const response = await addCategory(formData);

            if (response.status === 201) {
                setCategories([...categories, response.data]);
                toast.success("Category Added Successfully!");
                setData({
                    name: "",
                    description: "",
                    bgColor: "#ffffff",
                });
                setImages(null);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error adding category!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-2 mt-2">
            <form onSubmit={onSubmitHandler}>
                <div className="row">
                    <div className="card col-md-12 form-container">
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="image">
                                    <img
                                        src={images ? URL.createObjectURL(images) : assets.upload}
                                        alt=""
                                        width={48}
                                    />
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) => setImages(e.target.files[0])}
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-control"
                                    placeholder="Category Name"
                                    onChange={onChangeHandler}
                                    value={data.name}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    rows="5"
                                    name="description"
                                    id="description"
                                    className="form-control"
                                    placeholder="Write content here"
                                    onChange={onChangeHandler}
                                    value={data.description}
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="bgColor" className="form-label">Background color</label>
                                <br />
                                <input
                                    type="color"
                                    name="bgColor"
                                    id="bgColor"
                                    onChange={onChangeHandler}
                                    value={data.bgColor}
                                />
                            </div>

                            <button
                                disabled={loading}
                                className="btn btn-primary w-100"
                                type="submit"
                            >
                                {loading ? "Loading..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CategoryForm;










































// import {useContext, useEffect, useState} from "react";
//
//
// import {assets} from "../../assets/assets.js";
// import {addCategory} from "../../service/CategoryService.js";
// import toast from "react-hot-toast";
// import {AppContext} from "../../context/AppContext.jsx";
// import categoryList from "../CategoryList/CategoryList.jsx";
//
// const CategoryFrom =()=>{
//  const {setCategories,categories}     =       useContext(AppContext);
//  const [loading, setLoading] = useState(false);
//     const [images, setImages] = useState(false);
//     const [data, setData] = useState(
//         {
//             name : "",
//             description: "",
//             bgColor : "#ffffff",
//         });
//           useEffect(()=>{
//               console.log(data);
//
//           },[data]);
//
//
//     const  onChangeHandler = (e)=>{
//         const value = e.target.value;
//         const name = e.target.name;
//
//         setData((data) =>({...data,[name]:value }));
//     }
//
//
//
//     //Api call
//
//     const onSubmitHandler = async (e)=>{
//         e.preventDefault();
//         setLoading(true);
//         if(!images)
//         {
//             toast.error("Select image for category")
//             return;
//         }
//         setLoading(true);
//          const formData = new FormData();
//
//          formData.append('category', JSON.stringify(data));
//          formData.append('file', images);
//          try {
//             const response =await    addCategory(formData);
//
//             if(response.status === 201)
//             {
//                   setCategories([...categories, response.data]);
//                   toast.success("Category Added Successfully!");
//                   setData({
//                       name : "",
//                       description:  "",
//                         bgColor : "#2c2c2c",
//                   });
//                   setImages(false)
//             }
//          }
//          catch (error) {
//                       console.log(error);
//                       toast.error("Error adding category!");
//          }
//          finally {
//              setLoading(false);
//          }
//     }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//     return(
//         <div className="mx-2 mt-2">
//             <div className="row">
//                 <div className="card col-md-12 form-container">
//                     <div className="card-body">
//
//                         <div className="mb-3">
//                             <label className="form-label" htmlFor="image">
//                                 <img src={images ? URL.createObjectURL(images) : assets.upload} alt="" width={48} />
//
//
//                             </label>
//                             <input
//                                 type="file"
//                                 name="image"
//                                 id="image"
//                                 className="form-control"
//                                hidden
//                                 onChange={(e)=>setImages(
//                                     e.target.files[0]
//                                 )}
//                             />
//                         </div>
//                         <div className="mb-2">
//                             <label htmlFor="name" className="form-label">Name</label>
//                             <input type="text"
//                             name="name"
//                                    id="name"
//                                    className="form-control"
//                                    placeholder="Category Name"
//                                    onChange={onChangeHandler}
//                                    value={data.name}
//                             >
//                             </input>
//
//
//                             <div className="mb-3">
//                                 <label htmlFor="description" className="form-label">Description</label>
//                                 <textarea
//                                     rows="5"
//                                     name="description"
//                                     id="description"
//                                     className="form-control"
//                                     placeholder="Write content here"
//                                     onChange={onChangeHandler}
//                                     value={data.description}
//                                 ></textarea>
//                             </div>
//
//                             <div className="mb-3">
//                                 <label htmlFor="bgcolor" className="form-label">Background color</label>
//                                 <br/>
//                                    <input
//                                        type="color"
//                                        name="bgcolor"
//                                        id="bgcolor"
//                                        placeholder="#ffffff"
//                                        onChange={onChangeHandler}
//                                        value={data.bgcolor}
//
//                                    />
//                             </div>
//
//                             <button
//                                 disabled={loading}
//                                 className="btn btn-primary  w-100"
//                                 type="submit"  >{loading ? "loading...":"Submit"}</button>
//
//
//                         </div>
//
//
//                     </div>
//
//                 </div>
//
//             </div>
//
//         </div>
//     );
// }
// export default CategoryFrom;