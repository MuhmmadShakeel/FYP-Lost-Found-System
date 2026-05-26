import React, { useState } from "react";
import {
  User,
  Phone,
  FileText,
  Upload,
  X,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useCreateClaimItemMutation } from "../../../redux/ClaimApi";
import { toast } from "react-toastify";

function ClaimForm({ onClose, selectedReport }) {
  const [createClaimItem, { isLoading }] = useCreateClaimItemMutation();
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    reason: "",
    proofImage: null,
  });

  // ================= INPUT =================
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================= IMAGE =================
  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("Image size should be less than 5MB");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      proofImage: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFormData((prev) => ({
      ...prev,
      proofImage: null,
    }));
    setPreview(null);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Phone number is required");
      return;
    }
    const phoneRegex = /^[\d\s\+-]+$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (!formData.reason.trim()) {
      toast.error("Ownership details are required");
      return;
    }

    if (!selectedReport?._id) {
      toast.error("Item not found. Please select again.");
      return;
    }

    try {
      const form = new FormData();
      form.append("name", formData.fullName.trim());
      form.append("contact", formData.phone.trim());
      form.append("details", formData.reason.trim());

      if (formData.proofImage) {
        form.append("claimImage", formData.proofImage);
      }

      const res = await createClaimItem({
        id: selectedReport._id,
        formData: form,
      }).unwrap();

      toast.success(res?.message || "Claim submitted successfully!");

      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        reason: "",
        proofImage: null,
      });
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setPreview(null);

      // Close modal
      onClose?.();
    } catch (error) {
      console.error("Claim submission error:", error);
      const errorMsg =
        error?.data?.message ||
        error?.error ||
        "Failed to submit claim. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* NAME */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Full Name
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <User className="h-5 w-5 text-slate-400" />
          </div>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full rounded-2xl border border-slate-200 pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0B1C3D] focus:border-[#0B1C3D] transition-all bg-slate-50/50 hover:bg-slate-50 focus:bg-white"
            required
          />
        </div>
      </div>

      {/* PHONE */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Phone Number
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Phone className="h-5 w-5 text-slate-400" />
          </div>
          <input
            id="phone"
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full rounded-2xl border border-slate-200 pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0B1C3D] focus:border-[#0B1C3D] transition-all bg-slate-50/50 hover:bg-slate-50 focus:bg-white"
            required
          />
        </div>
      </div>

      {/* DETAILS */}
      <div>
        <label htmlFor="reason" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Ownership Details
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute left-4 top-3">
            <FileText className="h-5 w-5 text-slate-400" />
          </div>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Describe how you own this item (distinct features, proof details...)"
            className="w-full rounded-2xl border border-slate-200 pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0B1C3D] focus:border-[#0B1C3D] transition-all bg-slate-50/50 hover:bg-slate-50 focus:bg-white resize-none"
            rows={4}
            required
          />
        </div>
      </div>

      {/* IMAGE UPLOAD */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Upload Proof (Image)
        </label>
        {preview ? (
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50 flex justify-center items-center p-2">
            <img
              src={preview}
              alt="Preview"
              className="max-h-40 rounded-xl object-contain"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-4 right-4 bg-white/95 hover:bg-white text-slate-700 hover:text-red-600 p-2 rounded-full shadow-md transition-all border border-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label
            htmlFor="proofImage-input"
            className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-[#0B1C3D] p-6 text-center rounded-2xl cursor-pointer hover:bg-slate-50/50 transition-all group"
          >
            <div className="bg-slate-100 group-hover:bg-[#0B1C3D]/5 p-3 rounded-full transition-colors mb-2">
              <Upload className="h-6 w-6 text-slate-500 group-hover:text-[#0B1C3D]" />
            </div>
            <p className="text-sm font-semibold text-slate-700 group-hover:text-[#0B1C3D] transition-colors">
              Upload Proof Document or Photo
            </p>
            <p className="text-xs text-slate-400 mt-1">JPG, PNG, GIF (max 5MB)</p>
            <input
              id="proofImage-input"
              type="file"
              hidden
              accept="image/*"
              onChange={handleImage}
            />
          </label>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#0B1C3D] text-white p-3.5 rounded-2xl flex justify-center gap-2 items-center hover:bg-[#17346E] transition-all hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-[#0B1C3D] disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm cursor-pointer"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" />
            <span>Submitting Claim...</span>
          </>
        ) : (
          <>
            <CheckCircle2 className="h-5 w-5" />
            <span>Submit Claim</span>
          </>
        )}
      </button>
    </form>
  );
}

export default ClaimForm;