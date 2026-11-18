import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../style/Categories.css";
function Categories() {
    const {name} = useParams();
    const [product, setProduct] = useState([]);


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


    useEffect(() => {
    
            const getProducts = async () => {
    
                try {
    
                    const response = await fetch(
                        "http://localhost:3000/dashboard"
                    );
    
                    const data = await response.json();
    
                    console.log("movi",data);
    
                    setProduct(data);
    
                } catch (error) {
    
                    console.log(error);
    
                }
    
            };
    
            getProducts();
    
        }, []);
        const filterProduct = product.filter(
    (item) => item.category === name 
);
console.log("filter",filterProduct);
    return(
        <div className="category">
            {filterProduct.map((item,index)=>{
                const videoId = getYoutubeId(item.link);
                return(
                    <div className="category-card" key={index}>
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
                    
                )
            })}
        </div>
    )
}
export default Categories;