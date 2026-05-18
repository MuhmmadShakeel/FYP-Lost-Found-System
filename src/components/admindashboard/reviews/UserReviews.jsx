import React, { useState, useMemo } from "react";
import {
  FaSearch,
  FaStar,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaThumbsUp,
  FaComment,
  FaFilter,
  FaTimes,
  FaStarHalfAlt,
  FaRegStar,
  FaTrash,
} from "react-icons/fa";

import {
  useGetAllReviewsQuery,
  useDeleteReviewMutation,
} from "../../../redux/Reviews";

function UserReviews() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState("All Ratings");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  const { data, isLoading } = useGetAllReviewsQuery();
  const [deleteReview] = useDeleteReviewMutation();

  const reviewsData = data?.reviews || [];

  const reviews = useMemo(() => {
    return reviewsData.map((review) => ({
      id: review._id,
      name: review?.user?.name || "Unknown User",
      email: review?.user?.email || "No Email",
      rating: review?.rating || 0,
      comment: review?.comment || "",
      helpful: review?.helpful || 0,
      date: review?.createdAt || new Date(),
      avatar:
        review?.user?.name
          ?.split(" ")
          ?.map((w) => w[0])
          ?.join("")
          ?.slice(0, 2)
          ?.toUpperCase() || "U",
    }));
  }, [reviewsData]);

  const filteredReviews = useMemo(() => {
    let filtered = reviews.filter((review) => {
      const matchesSearch =
        review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesRating = true;

      if (selectedRating !== "All Ratings") {
        matchesRating = review.rating === parseInt(selectedRating);
      }

      return matchesSearch && matchesRating;
    });

    return filtered.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, [reviews, searchTerm, selectedRating]);

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);

  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id) => {
    try {
      await deleteReview(id).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 text-sm" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400 text-sm" />);
      }
    }
    return stars;
  };

  const stats = {
    total: reviews.length,
    average:
      reviews.length > 0
        ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1)
        : "0.0",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="pt-20 px-4 sm:px-6 lg:px-8 md:pl-72">
        <div className="max-w-360 mx-auto">

          {/* HEADER */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                User Reviews
              </h1>
              <p className="text-slate-500 mt-2 text-sm sm:text-base">
                Manage and analyze user feedback
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm border border-slate-200">
              <span>{reviews.length} total reviews</span>
            </div>
          </div>

          {/* STATS */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mb-6">

            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">Total Reviews</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{stats.total}</p>
            </div>

            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">Average Rating</p>
              <p className="mt-2 text-3xl font-semibold text-yellow-600">
                {stats.average} ⭐
              </p>
            </div>

            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">Positive Reviews</p>
              <p className="mt-2 text-3xl font-semibold text-green-600">
                {reviews.filter(r => r.rating >= 4).length}
              </p>
            </div>

          </div>

          {/* FILTERS */}
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-4 flex items-center gap-3">
              <FaSearch className="text-slate-400" />
              <input
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by name, email, or comment"
                className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
              />
            </div>
            <label className="flex flex-col gap-2 bg-white rounded-3xl border border-slate-200 p-4">
              <span className="text-sm font-medium text-slate-700">Rating Filter</span>
              <select
                value={selectedRating}
                onChange={(e) => {
                  setSelectedRating(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent outline-none text-slate-700"
              >
                <option>All Ratings</option>
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
              </select>
            </label>
          </div>

          {/* REVIEWS LIST */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            {isLoading ? (
              <div className="p-10 text-center text-slate-500">Loading reviews...</div>
            ) : paginatedReviews.length === 0 ? (
              <div className="p-10 text-center text-slate-500">No reviews found</div>
            ) : (
              <div className="divide-y divide-slate-200">
                {paginatedReviews.map((review) => (
                  <article
                    key={review.id}
                    className="p-5 sm:p-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm">
                          {review.avatar}
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-slate-900">
                            {review.name}
                          </p>
                          <p className="text-sm text-slate-500">{review.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-slate-600">({review.rating})</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">
                        {review.comment}
                      </p>
                      <p className="text-xs text-slate-500">
                        Posted on: {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-3">
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <FaThumbsUp />
                        {review.helpful}
                      </div>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600 transition hover:bg-red-100"
                        aria-label="Delete review"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-3xl bg-white px-4 py-4 shadow-sm border border-slate-200">
              <div className="text-sm text-slate-600">
                Showing {paginatedReviews.length} of {filteredReviews.length} reviews
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-4 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaChevronLeft />
                </button>
                <span className="min-w-18 text-center text-sm font-semibold text-slate-700">
                  {currentPage} / {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-4 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
export default UserReviews;