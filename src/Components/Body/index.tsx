"use client";

import React, { useEffect, useState } from "react";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import Shimmer from "../Shimmer";
import Link from "next/link";
import useOnlineStatus from "../../../utils/useOnlineStatus";
import { RestaurantInfo } from "../../../types/types";

const Body: React.FC = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState<RestaurantInfo[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<RestaurantInfo[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch("/api/restaurants");
      const json = await data.json();
      const cards = json?.data?.cards || [];
      let restaurants: RestaurantInfo[] = [];

      for (const cardObj of cards) {
        const gridRes = cardObj?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        if (gridRes) {
          restaurants = gridRes.map((r: any) => r.info);
          break;
        }
      }

      setListOfRestaurants(restaurants);
      setFilteredRestaurants(restaurants);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  const handleSearch = () => {
    if (!listOfRestaurants) return;

    const filtered = listOfRestaurants.filter((res) =>
      res.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return (
      <h1 className="p-8 text-center text-xl font-bold text-red-500">
        Looks like you are offline!! Please check your internet connection.
      </h1>
    );

  return !listOfRestaurants.length ? (
    <Shimmer />
  ) : (
    <div className="body bg-gray-50 p-8">
      <div className="filter mb-8">
        <div className="search flex flex-col sm:flex-row items-center bg-white p-4 rounded-lg shadow-lg">
          <input
            type="text"
            className="border border-solid border-gray-300 p-2 rounded-lg w-full sm:w-1/3 mb-2 sm:mb-0"
            placeholder="Search for restaurants"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              handleSearch();
            }}
            onKeyDown={handleKeyDown}
          />
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <button
              className="px-4 py-2 mx-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-green-500"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.id}
            href={"/restaurants/" + restaurant.id}
            className="m-2"
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
