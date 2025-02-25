
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
// import { Context } from "../store/appContext";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

import tatooineImg from "../../img/tatooine.jpg";
import bespinImg from "../../img/bespin.jpg";
import emptyPicImg from "../../img/star-wars-empty.jpg";

// addToFavorites function is called when clicking on the heart icon. This function is going to add that item to the store.favorites.
// Inside of the same functions have a way to delete the favorite if it is already a favorite.
// for the <h5> tags bring in item.name variable. for the <p> use ternary operator depending on what the category is.
// card button group div linked to the details page, button for icon for add to favorites



const Card = ({ item, index, category }) => {
    // const { store, actions } = useContext(Context);
    const { store, dispatch } = useGlobalReducer();
    const [imgErr, setImgErr] = useState(false);

    const handleImgErr = () => {
        setImgErr(true);
    }

    const GUIDE_URL = "https://starwars-visualguide.com/assets/img/";
    const getImgUrl = () => {
        if (imgErr && item.name === "Tatooine") {
            return tatooineImg;
        } else if (item.name === "Bespin") {
            return bespinImg;
        } else if (category === "starships") {
            return store.starshipImages[index] || emptyPicImg;
        } return `${GUIDE_URL}${category}/${index + 1}.jpg`
    }
    const imgStyle = {
        height: category === "starships" ? "180px" :
            category === "planets" ? "254px" :
                "auto",
    };

    const isFavorite = store.favorites.some(fav => fav.name === item.name && fav.category === category)
    // const handleFavorites = () => {
    //     const isFavorite = store.favorites.some(fav => fav.name === item.name && fav.category === category)
    //     if (isFavorite) {
    //         const indexToDelete = store.favorites.findIndex(fav => fav.name === item.name && fav.category === category)
    //         if (indexToDelete !== -1) {
    //             actions.deleteFavorites(indexToDelete)
    //         }
    //     } else {
    //         actions.addFavorites({ name: item.name, index, category })
    //     }
    // }
    const handleFavorites = () => {
        const favoriteItem = { name: item.name, index, category };

        if (isFavorite) {
            dispatch({
                type: "delete_favorite",
                payload: favoriteItem
            });
        } else {
            dispatch({
                type: "add_favorite",
                payload: favoriteItem
            });
        }
    }
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

export default Card