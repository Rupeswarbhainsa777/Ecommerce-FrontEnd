import './DisplayCategory.css';
import Category from "../Category/Category.jsx";
import { assets } from "../../assets/assets.js";

const DisplayCategory = ({ categories, setSelectedCategory, selectedCategory }) => {
    return (
        <div className="row g-3 display-category">
            <div className="col-md-3 col-sm-6" key="all">
                <Category
                    categoryName="All Items"
                    // imgUrl={assets.profile}
                    numberOfItems={categories.reduce((acc, cat) => acc + cat.items, 0)}
                    bgColor="#6757d6"
                    isSelected={selectedCategory === ""}
                    onClick={() => setSelectedCategory("")}
                />
            </div>

            {categories.map((category) => (
                <div className="col-md-3 col-sm-6" key={category.categoryId}>
                    <Category
                        categoryName={category.name}
                        imgUrl={category.imgUrl}
                        numberOfItems={category.items}
                        bgColor={category.bgColor}
                        isSelected={selectedCategory === category.categoryId}
                        onClick={() => setSelectedCategory(category.categoryId)}
                    />
                </div>
            ))}
        </div>
    );
};

export default DisplayCategory;
