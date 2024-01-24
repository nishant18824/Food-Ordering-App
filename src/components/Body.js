// import { restaurantList } from "../constants";
import Shimmer from "./Shimmer"
import RestrauntCard from "./RestaurantCard";
import { useState, useEffect } from "react";

// what is state
// React Has Hooks - at the end of the day Hooks normal function,
// what is useState

function filterData(searchText, restaurants){
   const filterData =  restaurants.filter((restaurant) => 
    restaurant.info.name.includes(searchText)
    );
    return filterData;
}

const Body = () => {

    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilterdRestaurants] = useState([]);
    const [searchInput, setSearchInput] =  useState("");     //to create state variable
    
    // empty dependency array ==> once after render
    // dep arry [searchText] ==> once after initial render + everytime after render (my searchText changes)
    useEffect(() => {
        // API call
        getRestaurants(); 
    }, []);

    async function getRestaurants() {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.678163012102303&lng=77.43484418839216&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();
        console.log(json);
        // Optional Chaining
        setAllRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilterdRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    console.log("render");

    // Conditioanl Rendring
    // if resturant is empty => shimmer ui
    // if resturant has data = Actual data ui

    // not render component (Early Return)
    if (!allRestaurants) return null;

    // if (filteredRestaurants?.length === 0)
    //     return <h1>No Restaurant Match your filter!!</h1>;

    return (allRestaurants.length === 0) ? < Shimmer /> : (
        <>
            <div className="search-container">
            <input 
                type="text" 
                className="search-input" 
                placeholder="Search" 
                value={searchInput}
                onChange={(e) => {
                    setSearchInput(e.target.value);
                }}
                />
            <button 
                className="search-btn"
                onClick={()=> {
                    // need to filter the data
                    const data = filterData(searchInput, allRestaurants);
                    // update the state -restaurant
                    setFilterdRestaurants(data);
                }}
            >Search</button>
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