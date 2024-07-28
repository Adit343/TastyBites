import RestaurantCard from "./RestaurantCard"; // Adjust import path as needed

const RestaurantCardGrid = ({ restaurants }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {restaurants.map((resData) => (
        <RestaurantCard key={resData.id} resData={resData} />
      ))}
    </div>
  );
};

export default RestaurantCardGrid;
