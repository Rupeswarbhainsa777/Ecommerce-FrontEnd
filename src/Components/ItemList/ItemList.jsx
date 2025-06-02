import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { deleteItem } from "../../service/ItemSevices.js";
import toast from "react-hot-toast";
import './ItemList.css';

const ItemList = () => {
    const { itemData, setItemsData } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState("");

    // Debug check
    console.log("Item Data:", itemData);

    const filteredItems = (itemData || []).filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const removedItems = async (itemId) => {
        try {
            const response = await deleteItem(itemId);
            if (response.status === 204) {
                const updatedItems = itemData.filter((item) => item.id !== itemId);
                setItemsData(updatedItems);
                toast.success("Item deleted!");
            } else {
                toast.error("Unable to delete item");
            }
        } catch (e) {
            console.error(e);
            toast.error("Unable to delete item");
        }
    };

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

            {/* Items List */}
            <div className="row g-3 pe-2">
                {filteredItems.map((item) => (
                    <div className="col-12" key={item.id}>
                        <div className="card p-3 bg-dark">
                            <div className="d-flex align-items-center">
                                <div style={{ marginRight: "16px" }}>
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        width={48}
                                        className="item-image"
                                    />
                                </div>
                                <div className="flex-grow-1">
                                    <h6 className="mb-1 text-white">{item.name}</h6>
                                    <p className="mb-0 text-white">
                                        Category: {item.categoryName}
                                    </p>
                                    <span className="badge rounded-pill text-bg-warning">
                    &#8377; {item.price}
                  </span>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => removedItems(item.id)}
                                        aria-label={`Remove ${item.name}`}
                                    >
                                        <i className="bi bi-trash" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Optional: No items message */}
                {filteredItems.length === 0 && (
                    <div className="col-12 text-white text-center mt-4">
                        No items found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemList;
