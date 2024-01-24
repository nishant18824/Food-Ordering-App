import { restaurantList } from "../constants";
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

    const [restaurants, setRestaurants] = useState(restaurantList);
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
        setRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    console.log("render");

    return (
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
                    const data = filterData(searchInput, restaurants);
                    // update the state -restaurant
                    setRestaurants(data);
                }}
            >Search</button>
            </div>

            <div className="restaurant-list">      
          {
            restaurants.map((restaurant) => {
                return <RestrauntCard {...restaurant.info} key={restaurant.info.id}/>;
            })
          }
          {/* {RestrauntCard(restaurant = restaurantList[0])} */}
      </div>
      </>
    );
  };
  
export default Body;  