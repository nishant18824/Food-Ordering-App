import { useEffect, useState } from "react";
import RestrauntCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { SWIGGY_PUBLIC_URL } from "../constants";

function filterData(searchText, restaurants) {
    const filterData = restaurants.filter((restaurant) => 
    restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return filterData
}

const Body = () => {
    
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilterdRestaurants] = useState([]);
    const [searchInput, setSearchInput]= useState("");

    // use useEffect for one time call getRestaurants using empty dependency array
    // empty dependency array => once after render
  // dep arry [searchText] => once after initial render + everytime after redern (my searchText changes)
    useEffect(() => {
        // API call
        getRestaurants(); 
    }, []);
    // console.log("render");

    async function getRestaurants() {
        const data = await fetch(SWIGGY_PUBLIC_URL
        );
        const json = await data.json();
        console.log(json);

        setAllRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilterdRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    if (!allRestaurants) return null;

    // if (filteredRestaurants?.length === 0)
    //     return <h1> NO Restaurant Match your Filter!! </h1>

    return (allRestaurants?.length === 0 ) ? < Shimmer /> : (
        <>
        <div className="search-bar">
            <input type="text" 
            className="input-bar"
            placeholder="Search"
            value={searchInput}
            onChange={(e)=>{
                setSearchInput(e.target.value)
                // console.log(searchText);
            }}>
            </input>
            <button className="search-btn"
            onClick={()=>{
                const data = filterData(searchInput, allRestaurants);
                setFilterdRestaurants(data);
            }}> 
            Search
            </button>
        </div>
      
            <div className="restaurant-list">      
          {
            filteredRestaurants.map((restaurant) => {
                return <RestrauntCard {...restaurant.info} key={restaurant.info.id}/>;
            })
          }
          {/* {RestrauntCard(restaurant = restaurantList[0])} */}
        </div>
      </>  
    );
  };
  
export default Body;  


// without dependencies array render with each render in each second every time
// but i passed a dependency array then render once after initial rendering
