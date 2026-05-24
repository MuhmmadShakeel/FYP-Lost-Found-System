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
  const [createClaimItem, { isLoading }] =
    useCreateClaimItemMutation();

  const [preview, setPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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

    setFormData((prev) => ({
      ...prev,
      proofImage: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      proofImage: null,
    }));
    setPreview(null);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❌ SAFE CHECK (VERY IMPORTANT)
    if (!selectedReport?._id) {
      alert("Item not found. Please select again.");
      return;
    }

    try {
      const form = new FormData();
      form.append("name", formData.fullName);
      form.append("contact", formData.phone);
      form.append("details", formData.reason);

      if (formData.proofImage) {
        form.append("claimImage", formData.proofImage);
      }

      const res = await createClaimItem({
        id: selectedReport._id,
        formData: form,
      }).unwrap();

      setSuccessMessage(res?.message || "Claim submitted");

      setFormData({
        fullName: "",
        phone: "",
        reason: "",
        proofImage: null,
      });
      setPreview(null);

      setTimeout(() => {
        setSuccessMessage("");
        onClose?.();
      }, 1500);
    } catch (error) {
      console.log(error);
      alert(error?.data?.message || "Failed to submit claim");
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
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-bold">
                  {selectedReport?.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedReport?.location}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SUCCESS */}
        {successMessage && (
          <div className="mx-4 mt-3 bg-green-50 p-3 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="text-green-600" />
            <p className="text-green-700 text-sm">
              {successMessage}
            </p>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">

          {/* NAME */}
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 border rounded-xl"
            required
          />

          {/* PHONE */}
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-3 border rounded-xl"
            required
          />

          {/* DETAILS */}
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Ownership details"
            className="w-full p-3 border rounded-xl"
            rows={3}
            required
          />

          {/* IMAGE */}
          <div>
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  className="w-full h-32 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="block border border-dashed p-4 text-center rounded-xl cursor-pointer">
                <Upload className="mx-auto" />
                <p>Upload Proof</p>
                <input
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
            disabled={isLoading}
            className="w-full bg-[#0B1C3D] text-white p-3 rounded-xl flex justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Claim"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ClaimForm;