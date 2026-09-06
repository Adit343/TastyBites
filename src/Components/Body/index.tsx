"use client";

import React, { useEffect, useState } from "react";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import Shimmer from "../Shimmer";
import Link from "next/link";
import useOnlineStatus from "../../../utils/useOnlineStatus";
import { RestaurantInfo } from "../../../types/types";
import {
  FiSearch,
  FiFilter,
  FiStar,
  FiClock,
  FiHeart,
  FiRotateCcw,
  FiGrid,
  FiZap,
} from "react-icons/fi";

const CUISINE_CATEGORIES = [
  { name: "All", icon: "✨" },
  { name: "Pizzas", icon: "🍕" },
  { name: "Burgers", icon: "🍔" },
  { name: "Asian", icon: "🍜" },
  { name: "Indian", icon: "🍛" },
  { name: "Healthy", icon: "🥗" },
  { name: "Desserts", icon: "🍰" },
  { name: "Vegan", icon: "🌱" },
];

const Body: React.FC = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState<RestaurantInfo[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<RestaurantInfo[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isVegOnly, setIsVegOnly] = useState<boolean>(false);
  const [isFastDeliveryOnly, setIsFastDeliveryOnly] = useState<boolean>(false);
  const [isTopRatedOnly, setIsTopRatedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("default");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    fetchData();
    // Load favorites from local storage
    try {
      const saved = localStorage.getItem("tasty_favorites");
      if (saved) setFavorites(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleFavorite = (id: string) => {
    let updated: string[];
    if (favorites.includes(id)) {
      updated = favorites.filter((favId) => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    try {
      localStorage.setItem("tasty_favorites", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetch("/api/restaurants");
      const json = await data.json();
      const cards = json?.data?.cards || [];
      let restaurants: RestaurantInfo[] = [];

      for (const cardObj of cards) {
        const gridRes =
          cardObj?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        if (gridRes && gridRes.length > 0) {
          restaurants = gridRes.map((r: any) => r.info);
          break;
        }
      }

      setListOfRestaurants(restaurants);
      setFilteredRestaurants(restaurants);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Re-apply all filters whenever filter state changes
  useEffect(() => {
    let result = [...listOfRestaurants];

    // Search filter
    if (searchText.trim()) {
      const query = searchText.toLowerCase();
      result = result.filter(
        (res) =>
          res.name.toLowerCase().includes(query) ||
          res.cuisines?.some((c) => c.toLowerCase().includes(query)) ||
          res.locality?.toLowerCase().includes(query)
      );
    }

    // Category pill filter
    if (selectedCategory !== "All") {
      const catQuery = selectedCategory.toLowerCase();
      result = result.filter((res) =>
        res.cuisines?.some((c) => c.toLowerCase().includes(catQuery))
      );
    }

    // Veg filter
    if (isVegOnly) {
      result = result.filter(
        (res) =>
          res.name.toLowerCase().includes("veg") ||
          res.cuisines?.some((c) => c.toLowerCase().includes("veg") || c.toLowerCase().includes("healthy"))
      );
    }

    // Fast delivery filter (<30 mins)
    if (isFastDeliveryOnly) {
      result = result.filter((res) => (res.sla?.deliveryTime || 40) <= 30);
    }

    // Top rated filter (>=4.5)
    if (isTopRatedOnly) {
      result = result.filter(
        (res) => (typeof res.avgRating === "number" ? res.avgRating : parseFloat(res.avgRating || "0")) >= 4.5
      );
    }

    // Favorites only filter
    if (showFavoritesOnly) {
      result = result.filter((res) => favorites.includes(res.id));
    }

    // Sorting
    if (sortBy === "rating") {
      result.sort((a, b) => {
        const rA = typeof a.avgRating === "number" ? a.avgRating : parseFloat(a.avgRating || "0");
        const rB = typeof b.avgRating === "number" ? b.avgRating : parseFloat(b.avgRating || "0");
        return rB - rA;
      });
    } else if (sortBy === "time") {
      result.sort((a, b) => (a.sla?.deliveryTime || 99) - (b.sla?.deliveryTime || 99));
    }

    setFilteredRestaurants(result);
  }, [
    searchText,
    selectedCategory,
    isVegOnly,
    isFastDeliveryOnly,
    isTopRatedOnly,
    showFavoritesOnly,
    sortBy,
    listOfRestaurants,
    favorites,
  ]);

  const resetFilters = () => {
    setSearchText("");
    setSelectedCategory("All");
    setIsVegOnly(false);
    setIsFastDeliveryOnly(false);
    setIsTopRatedOnly(false);
    setShowFavoritesOnly(false);
    setSortBy("default");
  };

  if (onlineStatus === false) {
    return (
      <div className="glass-card p-12 text-center rounded-3xl max-w-xl mx-auto my-12 border border-rose-500/30">
        <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto text-3xl mb-4">
          ⚠️
        </div>
        <h2 className="text-2xl font-bold text-slate-100 mb-2">You are currently offline</h2>
        <p className="text-slate-400 text-sm">
          Please check your internet connection to continue browsing gourmet food options.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Search & Title Section */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-purple-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Discover <span className="text-gradient-gold">Gourmet Dining</span>
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Order from {listOfRestaurants.length || 6}+ top rated restaurants near you
              </p>
            </div>

            {/* Main Search Input Bar */}
            <div className="relative w-full md:w-96">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
              <input
                type="text"
                placeholder="Search restaurants, cuisines or dishes..."
                className="w-full glass-input pl-11 pr-4 py-3 rounded-2xl text-sm"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {searchText && (
                <button
                  onClick={() => setSearchText("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Cuisine Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CUISINE_CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat.name
                    ? "bg-amber-500 text-slate-950 shadow-glow-amber scale-105"
                    : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-white/10"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Quick Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsVegOnly(!isVegOnly)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                  isVegOnly
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-glow-emerald"
                    : "bg-slate-900/80 text-slate-300 border-white/10 hover:border-emerald-500/30"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Pure Veg Only
              </button>

              <button
                onClick={() => setIsFastDeliveryOnly(!isFastDeliveryOnly)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                  isFastDeliveryOnly
                    ? "bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-glow-amber"
                    : "bg-slate-900/80 text-slate-300 border-white/10 hover:border-amber-500/30"
                }`}
              >
                <FiClock className="text-xs" />
                Under 30 Mins
              </button>

              <button
                onClick={() => setIsTopRatedOnly(!isTopRatedOnly)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                  isTopRatedOnly
                    ? "bg-purple-500/20 text-purple-400 border-purple-500/50 shadow-glow-violet"
                    : "bg-slate-900/80 text-slate-300 border-white/10 hover:border-purple-500/30"
                }`}
              >
                <FiStar className="text-xs fill-current" />
                Top Rated (4.5+)
              </button>

              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                  showFavoritesOnly
                    ? "bg-rose-500/20 text-rose-400 border-rose-500/50"
                    : "bg-slate-900/80 text-slate-300 border-white/10 hover:border-rose-500/30"
                }`}
              >
                <FiHeart className={`text-xs ${showFavoritesOnly ? "fill-rose-400" : ""}`} />
                Saved ({favorites.length})
              </button>
            </div>

            {/* Sort & Reset */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="glass-input px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer"
              >
                <option value="default">Sort by: Default</option>
                <option value="rating">Sort by: Rating (High to Low)</option>
                <option value="time">Sort by: Delivery Time</option>
              </select>

              {(searchText ||
                selectedCategory !== "All" ||
                isVegOnly ||
                isFastDeliveryOnly ||
                isTopRatedOnly ||
                showFavoritesOnly ||
                sortBy !== "default") && (
                <button
                  onClick={resetFilters}
                  title="Reset Filters"
                  className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-white/10 rounded-xl"
                >
                  <FiRotateCcw className="text-xs" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Cards Grid */}
      {loading ? (
        <Shimmer />
      ) : filteredRestaurants.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-3xl max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mx-auto text-3xl text-amber-400">
            🔍
          </div>
          <h3 className="text-xl font-bold text-slate-100">No Restaurants Found</h3>
          <p className="text-xs text-slate-400">
            We couldn't find any matches for your active filters. Try adjusting your search query or filters.
          </p>
          <button onClick={resetFilters} className="btn-neon-amber px-5 py-2.5 rounded-xl text-xs">
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              href={"/restaurants/" + restaurant.id}
              className="block group"
            >
              <RestaurantCard
                resData={restaurant}
                isFavorite={favorites.includes(restaurant.id)}
                onToggleFavorite={toggleFavorite}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Body;
