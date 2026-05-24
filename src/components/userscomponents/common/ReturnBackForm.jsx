import React, { useState } from "react";
import {
  FileText,
  ShieldCheck,
  Send,
  X,
} from "lucide-react";

function ReturnBackForm({ onClose }) {
  const [description, setDescription] = useState("");

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      description,
    };

    console.log("Return Back Submitted:", submitData);

    // Backend Logic Here
  };

  return (
    <div className="w-full max-w-xs mx-auto animate-[fadeIn_.2s_ease]">

      {/* CARD */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">

        {/* HEADER (COMPACT) */}
        <div className="relative bg-[#1E3A8A] px-4 py-3">

          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >
              <X size={14} className="text-white" />
            </button>
          )}

          <div className="flex items-center gap-2.5">

            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <ShieldCheck className="text-white" size={16} />
            </div>

            <div>
              <p className="text-[9px] tracking-[2px] uppercase text-blue-200 font-semibold">
                Return Request
              </p>

              <h2 className="text-sm font-bold text-white">
                Return Item
              </h2>
            </div>
          </div>

          <p className="text-[10px] text-blue-100 mt-2 leading-snug">
            Add short observation before returning item.
          </p>
        </div>

        {/* FORM (COMPACT) */}
        <div className="p-3">

          <form onSubmit={handleSubmit} className="space-y-3">

            {/* DESCRIPTION */}
            <div>

              <label className="text-[11px] font-semibold text-[#1E3A8A] mb-1 block">
                Description
              </label>

              <div className="relative">

                <FileText
                  size={14}
                  className="absolute left-3 top-3 text-gray-400"
                />

                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What you observed..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                />

              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-[#1E3A8A] hover:bg-[#173172] text-white py-2.5 rounded-xl font-semibold text-xs transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Send size={14} />
              Submit Request
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default ReturnBackForm;