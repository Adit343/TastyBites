"use client";

import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiMessageSquare } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-12">
      {/* Header */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden text-center space-y-3">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center text-slate-950 text-2xl mx-auto shadow-glow-amber mb-2">
          <FiMessageSquare />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Contact <span className="text-gradient-gold">TastyBites Support</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          Have a question about an order, restaurant partnership, or AI feature? Our concierge team is here 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Form */}
        <div className="md:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <h3 className="font-extrabold text-xl text-white">Send Us a Message</h3>

          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
                <FiCheckCircle />
              </div>
              <h4 className="text-xl font-bold text-white">Message Received!</h4>
              <p className="text-xs text-slate-300 max-w-xs mx-auto">
                Thank you {name}. Our support team will respond to {email} within 1 hour.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-neon-amber px-5 py-2 rounded-xl text-xs font-bold mt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we assist you today?"
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full btn-neon-amber py-3.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-glow-amber cursor-pointer"
              >
                <FiSend className="text-sm" /> Send Inquiry
              </button>
            </form>
          )}
        </div>

        {/* Info & Socials Sidebar */}
        <div className="md:col-span-5 space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="font-extrabold text-lg text-white">Concierge Details</h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-white/5">
                <FiMail className="text-amber-400 text-lg" />
                <div>
                  <span className="font-bold text-white block">Email Support</span>
                  <span>support@tastybites.com</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-white/5">
                <FiPhone className="text-amber-400 text-lg" />
                <div>
                  <span className="font-bold text-white block">Hotline</span>
                  <span>+91 (800) 456-7890</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-white/5">
                <FiMapPin className="text-amber-400 text-lg" />
                <div>
                  <span className="font-bold text-white block">Headquarters</span>
                  <span>Gourmet Tower, CG Road, Ahmedabad</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-white/10 text-center space-y-3">
            <h4 className="font-bold text-slate-100 text-sm">Follow Culinary News</h4>
            <div className="flex justify-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-900 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all border border-white/10 text-base"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-900 text-rose-400 hover:bg-rose-500 hover:text-slate-950 transition-all border border-white/10 text-base"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-900 text-purple-400 hover:bg-purple-500 hover:text-slate-950 transition-all border border-white/10 text-base"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
