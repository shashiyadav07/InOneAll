import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../style/Category.css";

const category = [
    {
        id: 2,
        name: "studyCore"
    },
    {
        id: 3,
        name: "movie"
    },
    {
        id: 4,
        name: "notes"
    },
    {
        id: 5,
        name: "song"
    },
];

function Category() {

    const [open, setOpen] = useState(false);

    // Current URL ko read karega
    const location = useLocation();

    return (
        <>
            <button
                className="add-button"
                onClick={() => setOpen(!open)}
            >
                Add
            </button>

            {open && (
                <ul>
                    <li>
                        <Link to="/content">
                            content-link
                        </Link>
                    </li>

                    <li>
                        <Link to="/notes">
                            notes
                        </Link>
                    </li>
                </ul>
            )}

            <h1 className="app-title">
                InOneAll
            </h1>

            <button className="filter-button">
                <Link to="/filter">
                    Filter
                </Link>
            </button>

            <div className="category-bar">

                {/* HOME */}
                <Link to="/dashboard">
                    <div
                        className='home'
                    >
                        Home
                    </div>
                </Link>


                {/* CATEGORIES */}
                {category.map((item) => (
                    <div
                        className={`category-item ${
                            location.pathname === `/category/${item.name}`
                                ? "active"
                                : ""
                        }`}
                        key={item.id}
                    >
                        <Link to={`/category/${item.name}`}>
                            {item.name}
                        </Link>
                    </div>
                ))}

            </div>
        </>
    );
}

export default Category;