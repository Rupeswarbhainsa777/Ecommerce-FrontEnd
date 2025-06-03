import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import {deleteItem} from "../../service/ItemSevices.js";
import toast from "react-hot-toast";


const ItemList = () => {
    const {itemsData,setItemsData} = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState('');
    const filteredItems = itemsData.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    const removeItem = async(itemId) =>{
        try {
           const  response= await deleteItem(itemId);
           if(response.status === 204){
              const  updatedItems =itemsData.filter(item => item.itemId !== item.itemId);
              setItemsData(updatedItems);
              toast.success("Item deleted!");
           }
           else {
               toast.error("Unable to delete !");
           }
        }
        catch (err) {
            console.error(err);
            toast.error("Unable to delete !");
        }
    }


    return (
        <div
            className="category-list-container"
            style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}
        >
            {/* Search Bar */}
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

            {/* Item List Placeholder */}
            <div className="row g-3 pe-2">
                {filteredItems.map((item,index) => (
                    <div className="col-12" key={index}>

                        <div className="card p-3 bg-dark">
                           <div className="d-flex align-items-center">
                                <div style={{marginRight: "16px"}}>
                                    <img src={item.imgUrl} alt={item.name} className="item-image"  />
                                </div>
                               <div className="flex-grow-1">
                                   <h6 className="mb-1 text-white">
                                       {item.name}
                                   </h6>
                                   <p className="mb-0 text-white">
                                        Category:{item.name}
                                   </p>

                                <span className="mb-0 badge rounded-pill text-bg-warning">
                                            &#8377;{item.price}
                                </span>
                               </div>
                                        <div>
                                            <button className="btn btn-danger btn-sm"  onClick={()=> removeItem(item.itemId)}>
                                                <i className="bi bi-trash" ></i>
                                            </button>
                                        </div>
                           </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};


export default ItemList;