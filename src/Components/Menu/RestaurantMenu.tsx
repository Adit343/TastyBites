"use client";

import React, { useState } from "react";
import Shimmer from "../Shimmer";
import { useParams } from "next/navigation";
import useRestaurantMenu from "../../../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu: React.FC = () => {
  const params = useParams();
  const resId = params?.resId;
  const resInfo = useRestaurantMenu(resId);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (resInfo === null) return <Shimmer />;

  const name = resInfo?.cards?.[2]?.card?.card?.info?.name || "";
  const cuisines = resInfo?.cards?.[2]?.card?.card?.info?.cuisines || [];
  const costForTwoMessage =
    resInfo?.cards?.[2]?.card?.card?.info?.costForTwoMessage || "";
  const categories =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c: any) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

  const handleSetOpenIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="text-center px-4 md:px-0">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {categories.map((category: any, index: number) => (
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
