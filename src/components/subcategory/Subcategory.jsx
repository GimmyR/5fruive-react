import { Link } from "react-router-dom";

function Subcategory({ category, subcategory }) {
    return (
        subcategory.category.id == category.id &&
        <li className="border-bottom border-secondary">
            <Link className="dropdown-item" to={ "/" + category.name + "/" + subcategory.id }>{subcategory.name}</Link>
        </li>
    );
}

export default Subcategory;