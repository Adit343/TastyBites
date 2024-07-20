import RestaurantCard from "./RestaurantCard"; // Adjust import path as needed

const RestaurantCardGrid = ({ restaurants }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 p-2">
      {restaurants.map((resData) => (
        <RestaurantCard key={resData.id} resData={resData} />
      ))}
    </div>
  );
};

export default RestaurantCardGrid;
