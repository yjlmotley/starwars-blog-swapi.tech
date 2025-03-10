// import React, { useContext } from "react";
// import { Context } from "../store/appContext";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

// import swLogo from "../../img/star-wars-logo-1002-cropped.png"
import swLogo from "../assets/img/star-wars-logo-1002-cropped.png";

// bring in {category} to the Navbar parameters
// create function for handleDelete(index) {actions.deleteFavorites(index)}

// created a dropdown toggle button for the favorites{store.favorites.length} creates a UL
// for each dropdown menu item for each name, wrap in a link for the details bringing in its category and index.
// Bring in a trash icon onClick that bring in a handleDeletefavorite(index)


// flamingtext.com (text design)



export const Navbar = () => {
	// const { store, actions } = useContext(Context);
	const { store, dispatch } = useGlobalReducer();

	const handleDeleteFavorite = (index) => {
		dispatch({
		  type: "delete_favorite",  // Action type to delete a favorite.
		  payload: index,  // Pass the index of the favorite to be deleted.
		});
	  };

	return (
		<nav className="navbar navbar-dark bg-dark mb-3 px-5">
			<Link to="/" className="logoDiv">
				<img src={swLogo} alt="https://www.freepnglogos.com/images/star-wars-logo-1002.html" style={{ height: '80px' }} />
			</Link>
			<div className="ml-auto dropdown">


				<button className="btn btn-secondary dropdown-toggle" id="favBtn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
					Favorites [{store.favorites.length}]
				</button>
				<ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end mt-1">
					{store.favorites.length > 0 ? (
						store.favorites.map((favs, index) => (
							<li className= "dropdown-item d-flex justify-content-between" key={index} >
								<Link to={"/details/" + favs.category + "/" + favs.index} className="favlink text-white" >

									<span>{favs.name}</span>
								</Link>
								<span onClick={() => handleDeleteFavorite(index)}>
									<i className="fa-regular fa-trash-can"></i>
								</span>
							</li>
						))
					) : (
						<li className="dropdown-item text-center">(empty)</li>
					)}
					
				</ul>


			</div>
		</nav>
	);
};