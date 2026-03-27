import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Reviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Ali Khan",
      comment: "Great platform! I found my lost wallet within 2 days.",
      time: "2 hours ago",
    },
    {
      id: 2,
      name: "Sara Ahmed",
      comment: "Very helpful system. Clean and easy to use.",
      time: "1 day ago",
    },
    {
      id: 3,
      name: "Ahmed Ali",
      comment: "Fast response! Loved the system.",
      time: "3 days ago",
    },
    {
      id: 4,
      name: "Fatima Noor",
      comment: "User-friendly and efficient platform.",
      time: "4 days ago",
    },
  ]);

  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
    });
  }, []);

  const handleAddReview = () => {
    if (!newComment.trim()) return;

    const newReview = {
      id: Date.now(),
      name: "You",
      comment: newComment,
      time: "Just now",
    };

    setReviews([newReview, ...reviews]);
    setNewComment("");
  };

  return (
    <section className="py-4">
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

          {/* LEFT - IMAGE */}
          <div
            data-aos="fade-right"
            className="rounded-3xl overflow-hidden border border-gray-200"
          >
            <img
              src="https://i.pinimg.com/1200x/e1/c5/15/e1c5157514f9a5819b4e9ec0ce25c5cd.jpg"
              alt="Community"
              className="w-full h-[500px] object-cover hover:scale-105 transition duration-500"
            />
          </div>

          {/* RIGHT - REVIEW CARD */}
          <div
            data-aos="fade-left"
            className="bg-white rounded-3xl border border-gray-200 p-10 flex flex-col h-[500px]"
          >

            {/* Add Review */}
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
                className="bg-[#1e3a8a] hover:bg-[#162a70] text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg"
              >
                Post
              </button>
            </div>

            {/* Reviews List */}
            <div className="flex-1 overflow-y-auto space-y-6 pr-3">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="flex gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:shadow-md transition"
                >
                  {/* Avatar */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1e3a8a] text-white font-semibold text-lg shadow-md">
                    {review.name.charAt(0)}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800 text-base">
                        {review.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {review.time}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                      {review.comment}
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