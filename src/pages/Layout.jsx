import { Outlet } from "react-router-dom/dist"
import { useEffect } from "react"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { fetchStarWarsData } from "../store"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const { dispatch } = useGlobalReducer();

    useEffect(() => {
        // Fetch all Star Wars data when the component mounts
        fetchStarWarsData.fetchAllData(dispatch);
    }, []); 
    return (
        <ScrollToTop>
            <Navbar />
                <Outlet />
            <Footer />
        </ScrollToTop>
    )
}