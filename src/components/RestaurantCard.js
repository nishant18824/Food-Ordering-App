
import {IMG_CDN_URL} from "../constants"

const RestrauntCard = ({name, cuisines, cloudinaryImageId, avgRating}) => {
    // const {name, cuisines, cloudinaryImageId, avgRating} = props.restaurant.info;
    // const {name, cuisines, cloudinaryImageId, avgRating} = restaurant.restaurant.info; //without {}
    // const {name, cuisines, cloudinaryImageId, avgRating} = restaurant.info; //with {}

    // console.log(restaurant);
    return (
        <div className="card">
            <img src={ IMG_CDN_URL + cloudinaryImageId}/>
            <h2>{name}</h2>
            <h3>{cuisines.join(", ")}</h3>
            <h4>{avgRating} Stars</h4>    
        </div>
  );
};

export default RestrauntCard;