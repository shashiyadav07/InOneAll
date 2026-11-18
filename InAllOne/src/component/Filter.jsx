import { useEffect, useState } from "react";
import "../style/Filter.css";

function Filter() {

    const [products, setProducts] = useState([]);

    const [filter, setFilter] = useState({
        category: "",
        course: "",
        branch: "",
        semester: "",
        subject: ""
    });

    // Get all content
    useEffect(() => {

        const getProducts = async () => {

            try {

                const response = await fetch(
                    "http://localhost:3000/dashboard"
                );

                const data = await response.json();

                setProducts(data);

            } catch (error) {

                console.log(error);

            }

        };

        getProducts();

    }, []);


    // Filter change
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFilter({
            ...filter,
            [name]: value
        });

    };


    // Apply filters
    const filteredProducts = products.filter((item) => {

        return (

            (!filter.category ||
                item.category === filter.category)

            &&

            (!filter.course ||
                item.course === filter.course)

            &&

            (!filter.branch ||
                item.branch === filter.branch)

            &&

            (!filter.semester ||
                item.semester === filter.semester)

            &&

            (!filter.subject ||
                item.subject?.toLowerCase().includes(
                    filter.subject.toLowerCase()
                ))

        );

    });


    // Reset
    const resetFilter = () => {

        setFilter({
            category: "",
            course: "",
            branch: "",
            semester: "",
            subject: ""
        });

    };


    return (

        <div className="filter-page">

            <h2>Filter Resources</h2>


            {/* Category */}

            <div className="filter-group">

                <label>Category</label>

                <select
                    name="category"
                    value={filter.category}
                    onChange={handleChange}
                >

                    <option value="">
                        All Categories
                    </option>

                    <option value="studyCore">
                        Study
                    </option>

                    <option value="course">
                        Course
                    </option>

                    <option value="notes">
                        Notes
                    </option>

                    <option value="movie">
                        Movie
                    </option>

                    <option value="song">
                        Song
                    </option>

                    <option value="other">
                        Other
                    </option>

                </select>

            </div>


            {/* Study filters */}

            {filter.category === "studyCore" && (

                <>

                    {/* Course */}

                    <div className="filter-group">

                        <label>Course</label>

                        <select
                            name="course"
                            value={filter.course}
                            onChange={handleChange}
                        >

                            <option value="">
                                All Courses
                            </option>

                            <option value="BTech">
                                B.Tech
                            </option>

                            <option value="BCA">
                                BCA
                            </option>

                            <option value="MTech">
                                M.Tech
                            </option>

                            <option value="MCA">
                                MCA
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                    </div>


                    {/* Branch */}

                    {filter.course === "BTech" && (

                        <div className="filter-group">

                            <label>Branch</label>

                            <select
                                name="branch"
                                value={filter.branch}
                                onChange={handleChange}
                            >

                                <option value="">
                                    All Branches
                                </option>

                                <option value="Computer Science">
                                    Computer Science
                                </option>

                                <option value="Electronics">
                                    Electronics
                                </option>

                                <option value="Mechanical">
                                    Mechanical
                                </option>

                                <option value="Civil">
                                    Civil
                                </option>

                            </select>

                        </div>

                    )}


                    {/* Semester */}

                    <div className="filter-group">

                        <label>Semester</label>

                        <select
                            name="semester"
                            value={filter.semester}
                            onChange={handleChange}
                        >

                            <option value="">
                                All Semesters
                            </option>

                            <option value="1">Semester 1</option>
                            <option value="2">Semester 2</option>
                            <option value="3">Semester 3</option>
                            <option value="4">Semester 4</option>
                            <option value="5">Semester 5</option>
                            <option value="6">Semester 6</option>
                            <option value="7">Semester 7</option>
                            <option value="8">Semester 8</option>

                        </select>

                    </div>


                    {/* Subject */}

                    <div className="filter-group">

                        <label>Subject</label>

                        <input
                            type="text"
                            name="subject"
                            placeholder="Enter subject name *write in upperCase"
                            value={filter.subject}
                            onChange={handleChange}
                        />

                    </div>

                </>

            )}


            {/* Buttons */}

            <div className="filter-buttons">

                <button onClick={resetFilter}>
                    Reset Filter
                </button>

            </div>


            {/* Result */}

            <div className="filter-result">

                <h3>
                    {filteredProducts.length} Resources Found
                </h3>


                {filteredProducts.length === 0 ? (

                    <p>No resources found.</p>

                ) : (

                    filteredProducts.map((item) => (

                        <div
                            className="filter-card"
                            key={item._id}
                        >

                            <span className="filter-category">
                                {item.category}
                            </span>

                            {item.course && (
                                <p>
                                    <strong>Course:</strong>{" "}
                                    {item.course}
                                </p>
                            )}

                            {item.branch && (
                                <p>
                                    <strong>Branch:</strong>{" "}
                                    {item.branch}
                                </p>
                            )}

                            {item.semester && (
                                <p>
                                    <strong>Semester:</strong>{" "}
                                    {item.semester}
                                </p>
                            )}

                            {item.subject && (
                                <p>
                                    <strong>Subject:</strong>{" "}
                                    {item.subject}
                                </p>
                            )}

                            <p className="filter-description">
                                {item.description}
                            </p>

                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Open Resource
                            </a>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

}

export default Filter;