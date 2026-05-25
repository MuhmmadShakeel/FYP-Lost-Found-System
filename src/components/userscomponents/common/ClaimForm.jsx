import React, { useState } from "react";
import {
  User,
  Phone,
  FileText,
  Upload,
  ShieldCheck,
  X,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useCreateClaimItemMutation } from "../../../redux/ClaimApi";

function ClaimForm({ onClose, selectedReport }) {
  const [createClaimItem, { isLoading }] = useCreateClaimItemMutation();
  const [preview, setPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

    // Validate file type and size (optional)
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please upload an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setErrorMessage("Image size should be less than 5MB");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      proofImage: file,
    }));

    setPreview(URL.createObjectURL(file));
    setErrorMessage(""); // Clear error on valid file
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
    setErrorMessage("");
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error

    // Basic validation
    if (!formData.fullName.trim()) {
      setErrorMessage("Full name is required");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Phone number is required");
      return;
    }
    // Simple phone validation (digits and possibly +, -, spaces)
    const phoneRegex = /^[\d\s\+-]+$/;
    if (!phoneRegex.test(formData.phone)) {
      setErrorMessage("Please enter a valid phone number");
      return;
    }
    if (!formData.reason.trim()) {
      setErrorMessage("Ownership details are required");
      return;
    }

    // ❌ SAFE CHECK (VERY IMPORTANT)
    if (!selectedReport?._id) {
      setErrorMessage("Item not found. Please select again.");
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

      setSuccessMessage(res?.message || "Claim submitted successfully");

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

      // Close after delay
      setTimeout(() => {
        setSuccessMessage("");
        onClose?.();
      }, 1500);
    } catch (error) {
      console.error("Claim submission error:", error);
      const errorMsg =
        error?.data?.message ||
        error?.error ||
        "Failed to submit claim. Please try again.";
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-3xl border shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#0B1C3D] to-[#17346E] p-5 text-white">
          <div className="flex items-center gap-3">
            <ShieldCheck />
            <div>
              <p className="text-xs opacity-70">Secure Claim</p>
              <h2 className="text-lg font-bold">Claim Item</h2>
            </div>
          </div>
        </div>

        {/* ITEM */}
        {selectedReport && (
          <div className="p-4">
            <div className="flex gap-3 bg-gray-50 p-3 rounded-xl">
              <img
                src={selectedReport?.foundimage?.url}
                alt="Found item"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-bold">{selectedReport?.name}</h3>
                <p className="text-sm text-gray-500">
                  {selectedReport?.location}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ERROR */}
        {errorMessage && (
          <div className="mx-4 mt-3 bg-red-50 p-3 rounded-xl flex items-center gap-2">
            <X className="text-red-600" size={16} />
            <p className="text-red-700 text-sm">{errorMessage}</p>
          </div>
        )}

        {/* SUCCESS */}
        {successMessage && (
          <div className="mx-4 mt-3 bg-green-50 p-3 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="text-green-600" />
            <p className="text-green-700 text-sm">{successMessage}</p>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* NAME */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B1C3D] focus:border-[#0B1C3D] outline-none"
              required
            />
          </div>

          {/* PHONE */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B1C3D] focus:border-[#0B1C3D] outline-none"
              required
            />
          </div>

          {/* DETAILS */}
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Ownership Details
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Describe how you own this item"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B1C3D] focus:border-[#0B1C3D] outline-none"
              rows={3}
              required
            />
          </div>

          {/* IMAGE */}
          <div>
            <label htmlFor="proofImage" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Proof (Image)
            </label>
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-xl border border-gray-200"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label
                htmlFor="proofImage-input"
                className="block border border-dashed p-6 text-center rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Upload Proof</p>
                <p className="text-xs text-gray-400">JPG, PNG, GIF (max 5MB)</p>
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

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0B1C3D] text-white p-3 rounded-xl flex justify-center gap-2 items-center hover:bg-[#17346E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" />
                <span className="ml-2">Submitting...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span className="ml-2">Submit Claim</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ClaimForm;