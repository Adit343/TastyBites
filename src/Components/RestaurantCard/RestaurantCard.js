import { CDN_URL } from "../../../utils/constant";

const RestaurantCard = ({ resData }) => {
  if (!resData) {
    return null;
  }

  const {
    cloudinaryImageId,
    name,
    cuisines,
    costForTwo,
    avgRating,
    sla,
  } = resData;

  return (
    <div className="m-2 p-4 w-full sm:w-[300px] md:w-[250px] lg:w-[300px] xl:w-[350px] rounded-lg bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
      <img
        src={CDN_URL + cloudinaryImageId}
        alt={name}
        className="rounded-lg w-full h-40 object-cover"
      />
      <div className="card-body mt-4">
        <h5 className="font-bold text-lg text-gray-800">{name}</h5>
        <p className="text-sm text-gray-600">{cuisines?.join(", ")}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-yellow-500 font-semibold">
            {avgRating} stars
          </span>
          <span className="text-sm text-gray-600">
            {costForTwo ?? "₹200 for two"}
          </span>
        </div>
        <span className="text-sm text-gray-600 mt-2 block">
          {sla?.deliveryTime} minutes
        </span>
      </div>
    </div>
  );
};

export default RestaurantCard;
