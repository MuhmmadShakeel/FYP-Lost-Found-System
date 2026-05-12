import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// RTK Query Hooks
import {
  useCreateReviewsMutation,
  useGetAllReviewsQuery,
} from "../../../../redux/Reviews";

function Reviews() {
  const [newComment, setNewComment] = useState("");

  // 🔥 API Hooks
  const { data, isLoading, refetch } = useGetAllReviewsQuery();
  const [createReview, { isLoading: isPosting }] =
    useCreateReviewsMutation();

  // 🔥 AOS Init
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
    });
  }, []);

  // 🔥 Normalize data (VERY IMPORTANT)
  const reviewsList = Array.isArray(data)
    ? data
    : data?.reviews || [];

  // 🔥 Handle Add Review
  const handleAddReview = async () => {
    if (!newComment.trim()) return;

    try {
      await createReview({
        reviews: newComment,   // ✅ matches backend
        rating: 5,             // ✅ required field
      }).unwrap();

      setNewComment("");
      refetch();
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  return (
    <section className="py-4 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Heading */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a8a]">
            Community Reviews
          </h2>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Real feedback from users who successfully reconnected with their
            lost belongings through our Lost & Found system.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">

          {/* LEFT IMAGE */}
          <div
            data-aos="fade-right"
            className="rounded-3xl overflow-hidden border border-gray-200 shadow-md"
          >
            <img
              src="https://i.pinimg.com/1200x/e1/c5/15/e1c5157514f9a5819b4e9ec0ce25c5cd.jpg"
              alt="Community"
              className="w-full h-[500px] object-cover hover:scale-105 transition duration-500"
            />
          </div>

          {/* RIGHT PANEL */}
          <div
            data-aos="fade-left"
            className="bg-white rounded-3xl border border-gray-200 p-10 flex flex-col h-[500px] shadow-md"
          >

            {/* ADD REVIEW */}
            <div className="flex gap-4 mb-8">
              <input
                type="text"
                placeholder="Share your experience..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 border border-gray-300 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
              />

              <button
                onClick={handleAddReview}
                disabled={isPosting}
                className="bg-[#1e3a8a] hover:bg-[#162a70] text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg disabled:opacity-50"
              >
                {isPosting ? "Posting..." : "Post"}
              </button>
            </div>

            {/* REVIEWS LIST */}
            <div className="flex-1 overflow-y-auto space-y-6 pr-3">

              {/* LOADING */}
              {isLoading && (
                <p className="text-center text-gray-500">Loading reviews...</p>
              )}

              {/* EMPTY */}
              {!isLoading && reviewsList.length === 0 && (
                <p className="text-center text-gray-400">
                  No reviews yet. Be the first!
                </p>
              )}

              {/* DATA */}
              {reviewsList.map((review, index) => (
                <div
                  key={review._id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="flex gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:shadow-md transition"
                >
                  {/* Avatar */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1e3a8a] text-white font-semibold text-lg shadow-md">
                    {review.user?.name?.charAt(0) || "U"}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800 text-base">
                        {review.user?.name || "Anonymous"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {review.createdAt
                          ? new Date(review.createdAt).toLocaleString()
                          : "Just now"}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                      {review.reviews}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Reviews;