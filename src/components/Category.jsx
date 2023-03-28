import { Link } from "react-router-dom";
import Subcategory from "./Subcategory";

function Category({ category, subcategories }) {
    return (
        <div key={ category.id } className="dropdown col-lg">
            <a className="nav-link nav-link-custom" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {category.name}
            </a>
            <ul className="dropdown-menu dropdown-menu-dark rounded-0 subcategories">
                <li className="border-bottom border-secondary"></li>
                {subcategories.map((subcategory) => 
                    <Subcategory key={subcategory.id} category={category} subcategory={subcategory}/>
                )}
            </ul>
        </div>
    );
}

export default Category;