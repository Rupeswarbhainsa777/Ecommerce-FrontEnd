const CategoryFrom =()=>{
    return(
        <div className="mx-2 mt-2">
            <div className="row">
                <div className="card col-md-8 form-container">
                    <div className="card-body">

                        <div className="mb-3">
                            <label className="form-label" htmlFor="image">
                                <img src="https://placehold.co/48x48" alt="Upload preview" width={48}/>
                            </label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                className="form-control"
                               hidden
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text"
                            name="name"
                                   id="name"
                                   className="form-control"
                                   placeholder="Category Name"
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