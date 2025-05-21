import {useEffect, useState} from "react";
// import {assests} from "../../assets/ass.js";

import {assest} from "../../assets/assest.js";

const CategoryFrom =()=>{

    // const [loading, setLoading] = useState(false);
    const [images, setImages] = useState(false);
    const [data, setData] = useState(
        {
            name : "",
            description: "",
            bgColor : "#ffffff",
        });
          useEffect(()=>{
              console.log(data);

          },[data])
    const  onChangeHandler = (e)=>{
        const value = e.target.value;
        const name = e.target.name;

        setData((data) =>({...data,[name]:value }));
    }



    return(
        <div className="mx-2 mt-2">
            <div className="row">
                <div className="card col-md-12 form-container">
                    <div className="card-body">

                        <div className="mb-3">
                            <label className="form-label" htmlFor="image">
                                <img src={image ? URL.createObjectURL(image): assest.upload} alt="" width={48}/>
                            </label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                className="form-control"
                               hidden
                                onChange={(e)=>
                                    setImages(e.target.files[0])}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text"
                            name="name"
                                   id="name"
                                   className="form-control"
                                   placeholder="Category Name"
                                   onChange={onChangeHandler}
                                   value={data.name}
                            >
                            </input>


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
                                <label htmlFor="bgcolor" className="form-label">Background color</label>
                                <br/>
                                   <input
                                       type="color"
                                       name="bgcolor"
                                       id="bgcolor"
                                       placeholder="#fffff"
                                       onChange={onChangeHandler}
                                       value={data.bgcolor}

                                   />
                            </div>

                            <button className="btn btn-primary  w-100"  type="submit"  >save</button>

                        </div>


                    </div>

                </div>

            </div>

        </div>
    );
}
export default CategoryFrom;