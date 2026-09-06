"use client";

import React, { useState } from "react";
import { TableReservation } from "../../../types/types";
import { FiX, FiCalendar, FiClock, FiUsers, FiCheckCircle, FiZap } from "react-icons/fi";

interface ReservationModalProps {
  restaurantName: string;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  restaurantName,
  onClose,
}) => {
  const [guestName, setGuestName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [time, setTime] = useState<string>("19:30");
  const [seatingArea, setSeatingArea] = useState<
    "Indoor" | "Outdoor Terrace" | "VIP Booth" | "Chef Table"
  >("VIP Booth");
  const [specialRequests, setSpecialRequests] = useState<string>("");
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !phone) return;

    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-card w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-white/20 shadow-glass-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-white/10"
        >
          <FiX className="text-xl" />
        </button>

        {confirmed ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-3xl shadow-glow-emerald">
              <FiCheckCircle />
            </div>
            <h3 className="text-2xl font-black text-white">Table Reservation Confirmed!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              We've reserved a table for <strong className="text-amber-400">{guestsCount} guests</strong> at{" "}
              <strong className="text-white">{restaurantName}</strong> on {date} at {time} ({seatingArea}).
            </p>
            <div className="pt-4">
              <button onClick={onClose} className="btn-neon-amber px-6 py-2.5 rounded-xl text-xs font-bold">
                Done & Return to Menu
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-bold">
                <FiZap className="text-xs" /> VIP Table Reservation
              </div>
              <h3 className="text-2xl font-black text-white">Book a Table at</h3>
              <p className="text-amber-400 font-extrabold text-sm">{restaurantName}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adit Shah"
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                  <FiUsers className="text-amber-400" /> Guests
                </label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(parseInt(e.target.value, 10))}
                  className="w-full glass-input px-3 py-2.5 rounded-xl text-sm cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                    <option key={n} value={n} className="bg-slate-900 text-white">
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                  <FiCalendar className="text-amber-400" /> Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full glass-input px-2.5 py-2 rounded-xl text-xs"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                  <FiClock className="text-amber-400" /> Time
                </label>
                <input
                  type="time"
                  required
                  className="w-full glass-input px-2 py-2 rounded-xl text-xs"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            {/* Seating Preference */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">Seating Area</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(["Indoor", "Outdoor Terrace", "VIP Booth", "Chef Table"] as const).map(
                  (area) => (
                    <button
                      type="button"
                      key={area}
                      onClick={() => setSeatingArea(area)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                        seatingArea === area
                          ? "bg-amber-500/20 text-amber-400 border-amber-500"
                          : "bg-slate-900 text-slate-400 border-white/5 hover:border-white/20"
                      }`}
                    >
                      {area}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Special Notes (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Birthday celebration, high chair needed"
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full btn-neon-amber py-3.5 rounded-xl text-sm font-bold shadow-glow-amber"
            >
              Confirm VIP Table Booking
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReservationModal;
