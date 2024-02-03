import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { IMG_CDN_URL } from "../constants";
// import { IMG_CDN_URL } from "../constants";

const RestaurantMenu = () => {
    const {resId} = useParams();
    // Use proper names
    const [ restaurant, setRestaurant ] = useState(null);
    const [ restaurantMenu, setRestaurantMenu] = useState(null);

    useEffect(()=>{
        getRestaurantInfo();
    }, []);

    async function getRestaurantInfo() {
            const data = await fetch(
                "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.678163012102303&lng=77.43484418839216&restaurantId="+resId+"&catalog_qa=undefined&submitAction=ENTER"
            );
            const json = await data.json();
            console.log(json?.data?.cards[0]?.card?.card?.info);
            // console.log(json.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards);
            console.log(json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards);
            setRestaurant(json?.data?.cards[0]?.card?.card?.info);
            // setRestaurantMenu(json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
            setRestaurantMenu(json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards);
    }
    console.log(resId);
    // console.log(restaurant);
    return (!restaurant) ? <Shimmer/> : (
        <div className="menu">
            <div>
                <h1>Restaurant id: {restaurant?.id}</h1>
                <h2>Name: {restaurant?.name}</h2>
                <h2>city: {restaurant?.city}</h2>
                <img src={IMG_CDN_URL + restaurant?.cloudinaryImageId}></img>
                <h2>Area: {restaurant?.areaName}</h2>
                <h2>AvgRating: {restaurant?.avgRating}</h2>
                <h2>Cost: {restaurant?.costForTwoMessage}</h2>
            </div>
            <div>
                <h1>Menu:</h1>
                    {/* {Object.values(restaurantMenu).map((item) => {
                <li key={item.card.info.id}>{item.card.info.name}</li>
                })} */}
                {
                // console.log(restaurantMenu);
                restaurantMenu.map((item) => (
                    <li key={item?.card?.info?.id}>{item?.card?.info?.name}</li>
                ))
                }
            </div>
        </div>
    )
}
export default RestaurantMenu;