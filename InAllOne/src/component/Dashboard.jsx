
import React, { useEffect, useState } from "react";
import "../style/Dashboard.css";

function Dashboard() {

    function getYoutubeId(url) {
    try {
        const urlObj = new URL(url);

        if (urlObj.hostname.includes("youtube.com")) {
            return urlObj.searchParams.get("v");
        }

        if (urlObj.hostname === "youtu.be") {
            return urlObj.pathname.substring(1);
        }

        return null;

    } catch {
        return null;
    }
}

    const [product, setProduct] = useState([]);

    useEffect(() => {

        const getProducts = async () => {

            try {

                const response = await fetch(
                    "http://localhost:3000/dashboard"
                );

                const data = await response.json();

                console.log(data);

                setProduct(data);

            } catch (error) {

                console.log(error);

            }

        };

        getProducts();

    }, []);

    return (
       
       <div className="dashboard">
         {product.map((item, index) => {

    const videoId = getYoutubeId(item.link);

    return (
        <div className="product-card" key={index}>

            {videoId && (
                <div className="video-thumbnail">
                    <img
                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                        alt={item.description}
                    />
                </div>
            )}

            <h3 className="product-category">{item.category}</h3>

            <p className="product-description">{item.description}</p>

            <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
            >
                {item.link}
            </a>

        </div>
    );
})}
       </div>
     
       
    );
}

export default Dashboard;

