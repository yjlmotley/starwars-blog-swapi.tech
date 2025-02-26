
import { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

import tatooineImg from "../assets/img/tatooine.jpg";
import bespinImg from "../assets/img/bespin.jpg";
import emptyPicImg from "../assets/img/star-wars-empty.jpg";


export const Card = ({ item, index, category }) => {
    const { store, dispatch } = useGlobalReducer();
    const [imgErr, setImgErr] = useState(false);

    const handleImgErr = () => {
        setImgErr(true);
    }

    const GUIDE_URL = "https://starwars-visualguide.com/assets/img/";
    // If the guide url is working, use this getImgUrl
    // const getImgUrl = () => {
    //     if (imgErr && item.name === "Tatooine") {
    //         return tatooineImg;
    //     } else if (item.name === "Bespin") {
    //         return bespinImg;
    //     } else if (category === "starships") {
    //         return store.starshipImages[index] || emptyPicImg;
    //     } return `${GUIDE_URL}${category}/${index + 1}.jpg`
    // }
    
    // Use this getImgUrl function if starwars-visualguide.com is not working
    const getImgUrl = () => {
        if (category === "characters") {
            return store.characterImages[index] || emptyPicImg;
        } else if (category === "planets") {
            return store.planetImages[index] || emptyPicImg;
        } return store.starshipImages[index] || emptyPicImg;
    }

    // This getImgUrl function is to use the backup store if there is an imgErr but this function is too slow
    // const getImgUrl = () => {
    //     if (imgErr && category === "characters") {
    //         return store.characterImages[index] || emptyPicImg;
    //     } else if (imgErr && category === "planets") {
    //         return store.planetImages[index] || emptyPicImg;
    //     } else if (category === "starships") {
    //         return store.starshipImages[index] || emptyPicImg;
    //     } return `${GUIDE_URL}${category}/${index + 1}.jpg`
    // }
    
    const imgStyle = {
        height: category === "characters" ? "338px" :
            category === "starships" ? "180px" :
            category === "planets" ? "254px" :
                "auto",
    };

    const isFavorite = store.favorites.some(fav => fav.name === item.name && fav.category === category)

    const handleFavorites = () => {
        if (isFavorite) {
            const favoriteIndex = store.favorites.findIndex(
                fav => fav.name === item.name && fav.category === category
            );
            
            // Only dispatch if we found a valid index
            if (favoriteIndex !== -1) {
                dispatch({
                    type: "delete_favorite",
                    payload: favoriteIndex 
                });
            }
        } else {
            dispatch({
                type: "add_favorite",
                payload: { name: item.name, index, category }
            });
        }
    };

    return (

        <div className="card" >
            {/* <img src={imgErr ? emptyImgUrl : `${GUIDE_URL}${category}/${index + 1}.jpg`} onError={handleImgErr} className="card-img-top" alt="img not available" /> */}
            <img src={getImgUrl()} onError={handleImgErr} style={imgStyle} className="card-img-top" alt="img not available" />
            <div className="card-body d-flex flex-column" id="cardBody">
                <h5 className="card-title fw-bold">{item.name}</h5>
                <p className="card-text">
                    {
                        category == "characters" ? "Gender: " + item.gender :
                            category == "planets" ? "Population: " + item.population :
                                "Crew: " + item.crew
                    }
                </p>
                <p className="card-text">
                    {
                        category == "characters" ? "Height: " + item.height :
                            category == "planets" ? "Climate: " + item.climate :
                                "Model: " + item.model
                    }
                </p>
                <p className="card-text mb-4">
                    {
                        category == "characters" ? "Birth Year: " + item.birth_year :
                            category == "planets" ? "Terrain: " + item.terrain :
                                "Passengers: " + item.passengers
                    }
                </p>
                <div id="cardBtnGroup" className="d-flex justify-content-between mt-auto">
                    <Link to={"/details/" + category + "/" + index}>
                        <button className="btn btn-secondary" type="button">Learn more!</button>
                    </Link>
                    <button className="btn btn-outline-dark btn-heart" onClick={handleFavorites} type="button">
                        <i className="fa-solid fa-heart heartBtn" style={{ color: isFavorite ? "rgb(219, 0, 0)" : "black" }}></i>
                    </button>
                </div>
            </div>
        </div>

    );
};

