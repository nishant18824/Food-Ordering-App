import { useEffect, useState } from "react";

const RestaurantMenu = () => {

    const [restaurant, setAllRestaurant] = useState(null);
    
    useEffect(()=> {
        getRestaurantInfo();
    }, []);

    async function getRestaurantInfo(){
        const Data = await fetch() 
    }

    return (
        <div>hello </div>
    )
}