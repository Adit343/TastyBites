"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../../utils/cartSlice";
import { useRouter } from "next/navigation";
import { FiGrid, FiCheck, FiShoppingBag, FiZap, FiChevronRight, FiChevronLeft } from "react-icons/fi";

const BASES = [
  { id: "b1", name: "Quinoa & Brown Rice Bowl", price: 140, cal: 210, icon: "🌾" },
  { id: "b2", name: "Whole Wheat Garlic Noodles", price: 150, cal: 280, icon: "🍜" },
  { id: "b3", name: "Fresh Mediterranean Greens", price: 130, cal: 110, icon: "🥗" },
  { id: "b4", name: "Artisanal Wood-Fired Crust", price: 160, cal: 320, icon: "🍕" },
];

const PROTEINS = [
  { id: "p1", name: "Smoky Charcoal Paneer", price: 90, cal: 180, icon: "🧀" },
  { id: "p2", name: "Crispy Herb Tofu", price: 80, cal: 140, icon: "🌱" },
  { id: "p3", name: "Sautéed Wild Mushrooms", price: 85, cal: 90, icon: "🍄" },
  { id: "p4", name: "Spicy Mexican Beans", price: 70, cal: 130, icon: "🫘" },
];

const TOPPINGS = [
  { id: "t1", name: "Avocado Slices", price: 50, cal: 60, icon: "🥑" },
  { id: "t2", name: "Charred Sweet Corn", price: 30, cal: 40, icon: "🌽" },
  { id: "t3", name: "Cherry Tomatoes & Olives", price: 35, cal: 30, icon: "🍅" },
  { id: "t4", name: "Roasted Bell Peppers", price: 30, cal: 25, icon: "🫑" },
];

const SAUCES = [
  { id: "s1", name: "Creamy Garlic Herb Dip", price: 30, cal: 70, icon: "🧄" },
  { id: "s2", name: "Spicy Peri Peri Aioli", price: 30, cal: 80, icon: "🌶️" },
  { id: "s3", name: "Truffle Oil Drizzle", price: 45, cal: 90, icon: "✨" },
  { id: "s4", name: "Tangy Zesty BBQ", price: 25, cal: 60, icon: "🍯" },
];

export const MealBuilder: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const [selectedBase, setSelectedBase] = useState(BASES[0]);
  const [selectedProtein, setSelectedProtein] = useState(PROTEINS[0]);
  const [selectedToppings, setSelectedToppings] = useState<typeof TOPPINGS>([TOPPINGS[0]]);
  const [selectedSauces, setSelectedSauces] = useState<typeof SAUCES>([SAUCES[0]]);
  const [added, setAdded] = useState<boolean>(false);

  const toggleTopping = (topping: typeof TOPPINGS[0]) => {
    if (selectedToppings.some((t) => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const toggleSauce = (sauce: typeof SAUCES[0]) => {
    if (selectedSauces.some((s) => s.id === sauce.id)) {
      setSelectedSauces(selectedSauces.filter((s) => s.id !== sauce.id));
    } else {
      setSelectedSauces([...selectedSauces, sauce]);
    }
  };

  const totalCalculatedPrice =
    selectedBase.price +
    selectedProtein.price +
    selectedToppings.reduce((acc, t) => acc + t.price, 0) +
    selectedSauces.reduce((acc, s) => acc + s.price, 0);

  const totalCalculatedCal =
    selectedBase.cal +
    selectedProtein.cal +
    selectedToppings.reduce((acc, t) => acc + t.cal, 0) +
    selectedSauces.reduce((acc, s) => acc + s.cal, 0);

  const handleAddToCart = () => {
    const bowlName = `Custom AI Bowl (${selectedProtein.name})`;
    const customSummary = `${selectedBase.name} + ${selectedProtein.name} with ${selectedToppings.map(t => t.name).join(", ")}`;

    dispatch(
      addItem({
        item: {
          id: `custom-bowl-${Date.now()}`,
          name: bowlName,
          price: totalCalculatedPrice,
          description: customSummary,
          quantity: 1,
          isVeg: true,
          restaurantName: "TastyBites Custom Kitchen",
          customizationNotes: customSummary,
        },
        restaurantName: "TastyBites Custom Kitchen",
      })
    );

    setAdded(true);
    setTimeout(() => {
      router.push("/cart");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden space-y-3">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/30">
          <FiZap className="text-xs" /> Interactive Culinary Studio
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Build Your Own <span className="text-gradient-gold">Custom Bowl</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Pick your fresh base, gourmet proteins, crisp toppings, and signature sauces with real-time calorie calculation.
        </p>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Step Selector & Options */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step Tabs Indicator */}
          <div className="flex gap-2 bg-slate-900/90 p-2 rounded-2xl border border-white/10 overflow-x-auto no-scrollbar">
            {[
              { num: 1, title: "Base" },
              { num: 2, title: "Protein" },
              { num: 3, title: "Toppings" },
              { num: 4, title: "Sauces" },
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => setStep(s.num)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  step === s.num
                    ? "bg-amber-500 text-slate-950 shadow-glow-amber"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Step {s.num}: {s.title}
              </button>
            ))}
          </div>

          {/* Step 1: Base */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Select Your Bowl Base</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BASES.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBase(b)}
                    className={`glass-card p-5 rounded-2xl cursor-pointer border transition-all flex items-center justify-between ${
                      selectedBase.id === b.id
                        ? "border-amber-500 bg-amber-500/10 shadow-glow-amber"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{b.icon}</span>
                      <div>
                        <h4 className="font-bold text-slate-100 text-sm">{b.name}</h4>
                        <p className="text-xs text-slate-400">~{b.cal} Cal</p>
                      </div>
                    </div>
                    <span className="font-extrabold text-amber-400 text-sm">₹{b.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Protein */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Select Gourmet Protein / Main</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROTEINS.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProtein(p)}
                    className={`glass-card p-5 rounded-2xl cursor-pointer border transition-all flex items-center justify-between ${
                      selectedProtein.id === p.id
                        ? "border-amber-500 bg-amber-500/10 shadow-glow-amber"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{p.icon}</span>
                      <div>
                        <h4 className="font-bold text-slate-100 text-sm">{p.name}</h4>
                        <p className="text-xs text-slate-400">~{p.cal} Cal</p>
                      </div>
                    </div>
                    <span className="font-extrabold text-amber-400 text-sm">₹{p.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Toppings */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Pick Fresh Veggies & Toppings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TOPPINGS.map((t) => {
                  const selected = selectedToppings.some((item) => item.id === t.id);
                  return (
                    <div
                      key={t.id}
                      onClick={() => toggleTopping(t)}
                      className={`glass-card p-5 rounded-2xl cursor-pointer border transition-all flex items-center justify-between ${
                        selected
                          ? "border-emerald-500 bg-emerald-500/10 shadow-glow-emerald"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{t.icon}</span>
                        <div>
                          <h4 className="font-bold text-slate-100 text-sm">{t.name}</h4>
                          <p className="text-xs text-slate-400">~{t.cal} Cal</p>
                        </div>
                      </div>
                      <span className="font-extrabold text-amber-400 text-sm">₹{t.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Sauces */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Choose Drips & Sauces</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SAUCES.map((s) => {
                  const selected = selectedSauces.some((item) => item.id === s.id);
                  return (
                    <div
                      key={s.id}
                      onClick={() => toggleSauce(s)}
                      className={`glass-card p-5 rounded-2xl cursor-pointer border transition-all flex items-center justify-between ${
                        selected
                          ? "border-purple-500 bg-purple-500/10 shadow-glow-violet"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{s.icon}</span>
                        <div>
                          <h4 className="font-bold text-slate-100 text-sm">{s.name}</h4>
                          <p className="text-xs text-slate-400">~{s.cal} Cal</p>
                        </div>
                      </div>
                      <span className="font-extrabold text-amber-400 text-sm">₹{s.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 disabled:opacity-40 text-xs font-bold flex items-center gap-1 border border-white/10"
            >
              <FiChevronLeft /> Back
            </button>
            <button
              onClick={() => setStep(Math.min(4, step + 1))}
              disabled={step === 4}
              className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 disabled:opacity-40 text-xs font-bold flex items-center gap-1"
            >
              Next Step <FiChevronRight />
            </button>
          </div>
        </div>

        {/* Live Summary Sidebar Card */}
        <div className="lg:col-span-4">
          <div className="glass-card p-6 rounded-3xl border border-white/20 space-y-6 sticky top-28">
            <h3 className="font-extrabold text-lg text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <FiGrid className="text-amber-400" /> Bowl Live Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-white/5">
                <span className="text-slate-400">Base:</span>
                <span className="font-bold text-slate-200">{selectedBase.name}</span>
              </div>

              <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-white/5">
                <span className="text-slate-400">Protein:</span>
                <span className="font-bold text-slate-200">{selectedProtein.name}</span>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5 space-y-1">
                <span className="text-slate-400 block">Toppings ({selectedToppings.length}):</span>
                <p className="font-bold text-slate-200">
                  {selectedToppings.map((t) => t.name).join(", ") || "None"}
                </p>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5 space-y-1">
                <span className="text-slate-400 block">Sauces ({selectedSauces.length}):</span>
                <p className="font-bold text-slate-200">
                  {selectedSauces.map((s) => s.name).join(", ") || "None"}
                </p>
              </div>
            </div>

            {/* Total Price & Cal Breakdown */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="flex justify-between text-xs text-slate-400 font-semibold">
                <span>Estimated Nutrition:</span>
                <span className="text-amber-400">~{totalCalculatedCal} Calories</span>
              </div>
              <div className="flex justify-between text-lg font-black text-white">
                <span>Total Bowl Price:</span>
                <span className="text-amber-400">₹{totalCalculatedPrice}</span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`w-full py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                added
                  ? "bg-emerald-500 text-slate-950"
                  : "btn-neon-amber shadow-glow-amber"
              }`}
            >
              {added ? (
                <>
                  <FiCheck className="text-base" /> Bowl Added to Cart!
                </>
              ) : (
                <>
                  <FiShoppingBag className="text-base" /> Add Custom Bowl to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealBuilder;
