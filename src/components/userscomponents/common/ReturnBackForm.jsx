import React, { useState } from "react";
import {
  ShieldCheck,
  Send,
  X,
  User,
  Phone,
  Upload,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  Camera,
} from "lucide-react";
import { useCreateReturnItemMutation } from "../../../redux/ReturnApi";

function ReturnBackForm({ onClose, selectedLostItem }) {
  const [createReturnItem, { isLoading }] = useCreateReturnItemMutation();

  const [preview, setPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    details: "",
    returnImage: null,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      returnImage: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      returnImage: null,
    }));
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedLostItem?._id) {
      alert("Item not found. Please select again.");
      return;
    }

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("contact", formData.contact);
      form.append("details", formData.details);

      if (formData.returnImage) {
        form.append("returnImage", formData.returnImage);
      }

      const res = await createReturnItem({
        id: selectedLostItem._id,
        formData: form,
      }).unwrap();

      setSuccessMessage(res?.message || "Return request submitted");

      setFormData({
        name: "",
        contact: "",
        details: "",
        returnImage: null,
      });
      setPreview(null);

      setTimeout(() => {
        setSuccessMessage("");
        onClose?.();
      }, 1500);
    } catch (error) {
      console.log(error);
      alert(error?.data?.message || "Failed to submit return request");
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl blur-3xl opacity-30 -z-10" />
      
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
        {/* Header with gradient and close button */}
        <div className="relative bg-gradient-to-r from-[#1E3A8A] via-[#3730A3] to-[#4F46E5] p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-white/20 rounded-xl backdrop-blur-sm">
                <ShieldCheck size={16} className="text-white" />
              </div>
              <div>
                <p className="text-[9px] font-medium text-blue-100 tracking-wider">RETURN PROCESS</p>
                <h2 className="text-sm font-bold text-white tracking-tight">Return Item</h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded-xl transition-all duration-200 group"
            >
              <X size={14} className="text-white/80 group-hover:text-white" />
            </button>
          </div>
        </div>
        {/* Selected Item Preview - Compact */}
        {selectedLostItem && (
          <div className="px-3 pt-3">
            <div className="flex items-center gap-2.5 bg-gradient-to-r from-gray-50 to-gray-100/50 p-2 rounded-xl border border-gray-200/50">
              <div className="relative">
                <img
                  src={selectedLostItem?.lostimage?.url}
                  alt={selectedLostItem?.name}
                  className="w-10 h-10 rounded-lg object-cover ring-2 ring-white shadow-sm"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-xs text-gray-800 truncate">{selectedLostItem?.name}</h3>
                <p className="text-[10px] text-gray-500 truncate">{selectedLostItem?.location}</p>
              </div>
              <div className="px-2 py-0.5 bg-blue-100 rounded-full">
                <span className="text-[9px] font-medium text-blue-700">Lost Item</span>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mx-3 mt-3 animate-in slide-in-from-top-2 duration-300">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-2 rounded-xl border border-green-200 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-600" />
              <p className="text-green-700 text-xs font-medium">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Form - Compact Layout */}
        <form onSubmit={handleSubmit} className="p-3 space-y-2.5">
          {/* Name Field */}
          <div className="group">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1E3A8A] transition-colors duration-200" size={14} />
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:bg-white focus:border-[#1E3A8A] transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Contact Field */}
          <div className="group">
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1E3A8A] transition-colors duration-200" size={14} />
              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Phone number or email"
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:bg-white focus:border-[#1E3A8A] transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Details Field */}
          <div className="group">
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Provide details about the return..."
              className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:bg-white focus:border-[#1E3A8A] transition-all duration-200 resize-none"
              rows={2}
              required
            />
          </div>

          {/* Image Upload - Compact */}
          <div>
            {preview ? (
              <div className="relative group/image">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-20 object-cover rounded-xl shadow-sm"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-1.5 right-1.5 bg-red-500 hover:bg-red-600 p-1 rounded-lg shadow-lg transition-all duration-200"
                >
                  <X size={10} className="text-white" />
                </button>
                <div className="absolute bottom-1.5 left-1.5 bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded-lg">
                  <span className="text-[9px] text-white">Added</span>
                </div>
              </div>
            ) : (
              <label className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 hover:border-[#1E3A8A] rounded-xl p-2 cursor-pointer transition-all duration-200 group">
                <Camera size={14} className="text-gray-400 group-hover:text-[#1E3A8A] transition-colors" />
                <span className="text-xs text-gray-600 group-hover:text-[#1E3A8A] font-medium">Add photo (optional)</span>
                <Upload size={12} className="text-gray-400 group-hover:text-[#1E3A8A] transition-colors" />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImage}
                />
              </label>
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={isLoading}
            className="relative w-full bg-gradient-to-r from-[#1E3A8A] via-[#3730A3] to-[#4F46E5] hover:from-[#173172] hover:via-[#2e2a8a] hover:to-[#4338ca] text-white py-2 rounded-xl text-sm font-semibold flex justify-center items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Send size={14} />
                <span>Submit Return Request</span>
              </>
            )}
          </button>

          {/* Helper Text */}
          <p className="text-[9px] text-center text-gray-400 mt-1">
            By submitting, you confirm the accuracy of this information
          </p>
        </form>
      </div>
    </div>
  );
};
export default ReturnBackForm;