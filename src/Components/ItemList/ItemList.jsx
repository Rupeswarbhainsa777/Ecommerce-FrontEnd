import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import {deleteItem, fetchItems} from "../../service/ItemSevices.js";
import toast from "react-hot-toast";

const ItemList = () => {

    const x= fetchItems();
    console.log("hii "+x);
    const { itemsData, setItemsData } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState('');



    const filteredItems = itemsData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const removeItem = async (itemId) => {
        try {
            const response = await deleteItem(itemId);
            if (response.status === 204) {
                const updatedItems = itemsData.filter(item => item.itemId !== itemId);
                setItemsData(updatedItems);
                toast.success("Item deleted!");
            } else {
                toast.error("Unable to delete!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Unable to delete!");
        }
    };

    return (
        <div
            className="category-list-container"
            style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden', padding: '1rem' }}
        >
            {/* Search Bar */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="input-group shadow-sm">
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
            </div>

            <div className="row g-3 pe-2">
                {filteredItems.map((item, index) => (
                    <div className="col-12" key={index}>
                        <div className="card p-3 bg-dark shadow-sm border-0">
                            <div className="d-flex align-items-center">
                                <div style={{ marginRight: "15px" }}>
                                    <img
                                        src={item.imgUrl}
                                        alt={item.name}
                                        className="item-image"
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            borderRadius: "8px",
                                            objectFit: "cover"
                                        }}
                                    />
                                </div>
                                <div className="flex-grow-1">
                                    <h5 className="mb-1 text-white">{item.name}</h5>
                                    <p className="mb-1 text-white small">Category: {item.categoryName}</p>
                                    <span className="badge rounded-pill bg-warning text-dark">
                                        &#8377;{item.price}
                                    </span>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => removeItem(item.itemId)}
                                        title="Delete item"
                                    >
                                        <i className="bi bi-trash" />
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
