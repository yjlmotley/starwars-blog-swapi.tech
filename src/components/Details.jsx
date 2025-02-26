import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

import emptyPicImg from "../assets/img/star-wars-empty.jpg";
import tatooineImg from "../assets/img/tatooine.jpg";
import bespinImg from "../assets/img/bespin.jpg";


export const Details = () => {
    const { store } = useGlobalReducer();
    const [imgErr, setImgErr] = useState(false);
    const params = useParams();
    const location = useLocation();
    
    // Extract category and id from URL
    const pathSegments = location.pathname.split('/');
    const category = pathSegments[2]; // Assuming URL pattern is "/details/:category/:id"
    const theId = params.theid; // Using the parameter name from your route definition

    useEffect(() => {
        setImgErr(false);
    }, [location]);

    // Find the current item based on category and id
    const item = store[category]?.find((item, index) => index == theId);

    // If data is not loaded yet, show loading state
    if (!item) {
        return (
            <div className="d-flex justify-content-center">
                <div className="card bg-dark text-light my-5" style={{ minWidth: '75%', maxWidth: '75%' }}>
                    <div className="card-body text-center">
                        <h2>Loading...</h2>
                    </div>
                </div>
            </div>
        );
    }

    const GUIDE_URL = "https://starwars-visualguide.com/assets/img/";
    
    // const getImgUrl = () => {
    //     if (imgErr) {
    //         // Special case handling for specific planets
    //         if (category === "planets" && item.name === "Tatooine") {
    //             return tatooineImg;
    //         } else if (category === "planets" && item.name === "Bespin") {
    //             return bespinImg;
    //         }
            
    //         // Use backup images from store
    //         const imageArrayName = `${category}Images`;
    //         if (store[imageArrayName] && store[imageArrayName][parseInt(theId)]) {
    //             return store[imageArrayName][parseInt(theId)];
    //         }
            
    //         return emptyPicImg;
    //     } 
        
    //     // Try the API image first
    //     return `${GUIDE_URL}${category}/${parseInt(theId) + 1}.jpg`;
    // };

    // Use this getImgUrl if the starwars-visualguide.com is not working
    const getImgUrl = () => {
        if (category === "characters") {
            return store.characterImages[parseInt(theId)] || emptyPicImg;
        } else if (category === "planets") {
            return store.planetImages[parseInt(theId)] || emptyPicImg;
        } 
        return store.starshipImages[parseInt(theId)] || emptyPicImg;
    };

    const handleImgErr = () => {
        setImgErr(true);
    };

    // Helper function to get the appropriate label and value based on category
    const getDetailRow = (index) => {
        const fields = {
            characters: [
                { label: "Birth Year", value: item.birth_year },
                { label: "Gender", value: item.gender },
                { label: "Height", value: item.height },
                { label: "Mass", value: item.mass },
                { label: "Skin Color", value: item.skin_color },
                { label: "Eye Color", value: item.eye_color }
            ],
            planets: [
                { label: "Terrain", value: item.terrain },
                { label: "Climate", value: item.climate },
                { label: "Gravity", value: item.gravity },
                { label: "Diameter", value: item.diameter },
                { label: "Surface Water", value: item.surface_water },
                { label: "Population", value: item.population }
            ],
            starships: [
                { label: "Manufacturer", value: item.manufacturer },
                { label: "Starship Class", value: item.starship_class },
                { label: "Max Atmosphering Speed", value: item.max_atmosphering_speed },
                { label: "Crew", value: item.crew },
                { label: "Passengers", value: item.passengers },
                { label: "Consumables", value: item.consumables }
            ]
        };

        const fieldData = fields[category]?.[index] || { label: "", value: "" };
        
        return (
            <div className="d-flex flex-row" style={{ fontSize: '1rem' }}>
                <u className="w-50 text-end pe-2">{fieldData.label}:</u>
                <p className="ps-2">{fieldData.value}</p>
            </div>
        );
    };

    return (
        <div className="d-flex justify-content-center">
            <div className="card bg-dark text-light my-5"
                style={{ minWidth: '75%', maxWidth: '75%', boxShadow: '0 8px 12px rgba(255, 255, 255, 0.2)' }}>
                <div className="row g-0">
                    <div className="col-md-4 p-3 d-flex align-items-center justify-content-center">
                        <img
                            src={getImgUrl()}
                            onError={handleImgErr}
                            className="img-fluid rounded-start rounded"
                            alt={`${item.name}`}
                        />
                    </div>
                    <div className="col-md-8 d-flex align-items-center">
                        <div className="card-body p-5">
                            <h2 className="card-title text-center mb-5" style={{ fontSize: '3rem' }}>
                                <u>{item.name}</u>
                            </h2>
                            {getDetailRow(0)}
                            {getDetailRow(1)}
                            {getDetailRow(2)}
                            {getDetailRow(3)}
                            {getDetailRow(4)}
                            {getDetailRow(5)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
