"use client";

import React, { useState } from "react";
import Shimmer from "../Shimmer";
import { useParams } from "next/navigation";
import useRestaurantMenu from "../../../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import ReservationModal from "../Reservation/ReservationModal";
import { FiStar, FiClock, FiCalendar, FiSearch, FiCheckCircle } from "react-icons/fi";

export const RestaurantMenu: React.FC = () => {
  const params = useParams();
  const resId = params?.resId as string;
  const resInfo = useRestaurantMenu(resId);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [menuSearch, setMenuSearch] = useState<string>("");
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);

  if (resInfo === null) return <Shimmer />;

  const infoCard = resInfo?.cards?.[2]?.card?.card?.info || {};
  const name = infoCard.name || "TastyBites Restaurant";
  const cuisines = infoCard.cuisines || ["Pizzas", "Burgers", "Italian"];
  const costForTwoMessage = infoCard.costForTwoMessage || "₹350 for two";
  const avgRating = infoCard.avgRating || 4.7;
  const locality = infoCard.locality || infoCard.areaName || "Gourmet Street";

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
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Restaurant Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              <FiCheckCircle className="text-xs" /> Verified Kitchen
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white">{name}</h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {cuisines.join(" • ")}
            </p>
            <p className="text-xs text-slate-400">{locality}</p>
          </div>

          {/* Quick Actions & Reservation Button */}
          <div className="flex flex-col items-start sm:items-end gap-3">
            <div className="flex items-center gap-3 bg-slate-900/90 p-3 rounded-2xl border border-white/10 text-xs">
              <div className="flex items-center gap-1 font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-lg">
                <FiStar className="text-xs fill-current" /> {avgRating}
              </div>
              <div className="flex items-center gap-1 text-slate-300 font-semibold">
                <FiClock className="text-amber-400" /> 25 mins
              </div>
              <div className="text-slate-400 font-semibold">{costForTwoMessage}</div>
            </div>

            <button
              onClick={() => setIsReservationOpen(true)}
              className="btn-neon-amber px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-glow-amber"
            >
              <FiCalendar className="text-sm" /> Reserve a Table
            </button>
          </div>
        </div>

        {/* Menu Search Bar */}
        <div className="pt-4 border-t border-white/10 relative">
          <FiSearch className="absolute left-4 top-1/2 translate-y-1 text-slate-400 text-base" />
          <input
            type="text"
            placeholder={`Search dishes in ${name}...`}
            className="w-full glass-input pl-11 pr-4 py-2.5 rounded-xl text-sm"
            value={menuSearch}
            onChange={(e) => setMenuSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Menu Categories Accordion */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-100 px-1">Menu Categories</h2>

        {categories.length === 0 ? (
          <div className="glass-card p-8 text-center rounded-2xl text-slate-400 text-sm">
            Menu loading or unavailable right now. Please try again.
          </div>
        ) : (
          categories.map((category: any, index: number) => {
            const catData = category?.card?.card;
            if (menuSearch.trim()) {
              const query = menuSearch.toLowerCase();
              const filteredCards = catData?.itemCards?.filter((item: any) =>
                item.card?.info?.name?.toLowerCase().includes(query)
              );
              if (!filteredCards || filteredCards.length === 0) return null;

              return (
                <RestaurantCategory
                  key={catData?.title}
                  data={{ ...catData, itemCards: filteredCards }}
                  showItems={true}
                  setShowIndex={() => handleSetOpenIndex(index)}
                  restaurantName={name}
                />
              );
            }

            return (
              <RestaurantCategory
                key={catData?.title}
                data={catData}
                showItems={openIndex === index}
                setShowIndex={() => handleSetOpenIndex(index)}
                restaurantName={name}
              />
            );
          })
        )}
      </div>

      {/* Reservation Modal */}
      {isReservationOpen && (
        <ReservationModal
          restaurantName={name}
          onClose={() => setIsReservationOpen(false)}
        />
      )}
    </div>
  );
};

export default RestaurantMenu;
