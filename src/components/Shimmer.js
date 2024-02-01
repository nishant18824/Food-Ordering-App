import { shimmer_card_unit } from "../constants";

// shimmer card display with the animation
const Shimmer = () => {
    return (
        <div className="restaurant-list">
            {
                new Array(shimmer_card_unit).fill(" ").map((e, index) => (
                    <div key={index} className="shimmer-card"></div>
                ))  
            }
        </div>
    );
};

export default Shimmer;