import { useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [openIndex, setOpenIndex] = useState(null);
  console.log(resInfo);
  if (resInfo === null) return <Shimmer />;

  const name = resInfo?.cards[2]?.card?.card?.info?.name || "";
  const cuisines = resInfo?.cards[2]?.card?.card?.info?.cuisines || [];
  const costForTwoMessage =
    resInfo?.cards[2]?.card?.card?.info?.costForTwoMessage || "";
  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  const handleSetOpenIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="text-center px-4 md:px-0">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {categories.map((category, index) => (
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showItems={openIndex === index}
          setShowIndex={() => handleSetOpenIndex(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
