import {useContext, useState} from "react";
import {assets} from "../../assets/assets.js";
import {AppContext} from "../../context/AppContext.jsx";
import toast from "react-hot-toast";
import {addItem} from "../../service/ItemSevices.js";

const ItemFrom = () => {
     const {category,setItemsData,itemData} = useContext(AppContext);
    const [image,setImage]=useState(false);
    const [loding,setLoading]=useState(false);
    const [data,setData]=useState({
        name: "",
        categoryId: "",
        price: "",
        description: "",
    });


    const onChangeHandler = (e) => {
       const  {name} = e.target;
       const {value} = e.target;
       setData((data) => ({...data,[name]: value}));

    }
    const onSubmitHandler =async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('item', JSON.stringify(data));
        formData.append('file', image);
        try {
            if (!image)
            {
                toast.error("Select image");
                return;
            }
           const response        = await addItem(formData);

            if(response.status === 201)
            {
                setItemsData([...itemData, response.data]);
                setLoading(false);
                //todo : update the category
                toast.success("Item Added Successfully");
                setData(
                    {
                        name: "",
                        description: "",
                        price: "",
                        categoryId: "",

                    }
                )
               setImage(false);
            }
            else
            {
                toast.error("Item Added Failed");
            }

        }
        catch (error)
        {
            console.error(error);
            toast.error("Unable to add item");

        }
        finally {
            setLoading(false);
        }
    }

    return (
      <div className="item-form-container " style={{height: '100vh',overflowY:'auto', overflowx: 'hidden'}}>
          <div className="mx-2 mt-2">
              <div className="row">
                  <div className="card col-md-8 form-container">
                      <div className="card-body">
                           <form onSubmit={onSubmitHandler}>
                          <div className="mb-3">
                              <label className="form-label" htmlFor="image">
                                  <img src={image ? URL.createObjectURL(image):assets.upload} alt="Upload preview" width={48}/>
                              </label>
                              <input
                                  type="file"
                                  name="image"
                                  id="image"
                                  className="form-control"
                                  hidden
                                  onChange={(e)=> setImage(e.target.files[0])}
                              />
                          </div>
                          <div className="mb-2">

                              <label htmlFor="name" className="form-label">Item Name</label>
                              <input type="text"
                                     name="name"
                                     id="name"
                                     className="form-control"
                                     placeholder="Item Name"
                                     onChange={onChangeHandler}
                                     value={data.name}
                              >
                              </input>
                              <div className="mb-3">
                                  <label htmlFor="category" className="form-label" >
                                      Category
                                  </label>
                                  <select className="form-control" name="categoryId" id="category"  onChange={onChangeHandler}   value={data.categoryId}>
                                      <option value="">Select Category</option>
                                      {Array.isArray(category) &&
                                          category.map((category, index) => (
                                              <option key={category.categoryId || index} value={category.categoryId}>
                                                  {category.name}
                                              </option>
                                          ))}


                                  </select>

                              </div>



                              <div className="mb-3">
                                  <label htmlFor="price" className="form-label">Price</label>
                                   <input   type="number"  name="price" id="price" className="form-control"  placeholder="&#8377;200"  onChange={onChangeHandler}  value={data.price} />
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



                              <button className="btn btn-primary  w-100"  type="submit" disabled={loding} >{loding ?"loading..." : "save"}</button>

                          </div>
                           </form>

                      </div>

                  </div>

              </div>

          </div>
      </div>
    )

}
export default ItemFrom;