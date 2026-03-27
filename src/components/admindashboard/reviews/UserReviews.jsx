import React, { useState, useMemo } from "react";
import { 
  FaSearch, FaStar, FaUser, FaCalendarAlt, FaChevronLeft, FaChevronRight, 
  FaThumbsUp, FaComment, FaFilter, FaTimes, FaStarHalfAlt, FaRegStar
} from "react-icons/fa";

function UserReviews() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState("All Ratings");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const reviews = [
    { 
      id: 1, 
      name: "Ali Khan", 
      email: "ali@example.com",
      rating: 5, 
      comment: "Amazing platform! Found my lost wallet within hours. The team is very responsive and helpful. Highly recommend this service to everyone.",
      date: "2024-03-15",
      helpful: 24,
      avatar: "AK"
    },
    { 
      id: 2, 
      name: "Sara Ahmed", 
      email: "sara@example.com",
      rating: 5, 
      comment: "Excellent service! I lost my phone and someone found it through this platform. The process was smooth and efficient. Thank you!",
      date: "2024-03-14",
      helpful: 18,
      avatar: "SA"
    },
    { 
      id: 3, 
      name: "Usman Tariq", 
      email: "usman@example.com",
      rating: 4, 
      comment: "Good platform but could use some improvements in the search functionality. Overall satisfied with the service.",
      date: "2024-03-13",
      helpful: 12,
      avatar: "UT"
    },
    { 
      id: 4, 
      name: "Ayesha Malik", 
      email: "ayesha@example.com",
      rating: 5, 
      comment: "Life saver! Got my bag back with all contents intact. The reporting system is very user-friendly.",
      date: "2024-03-12",
      helpful: 32,
      avatar: "AM"
    },
    { 
      id: 5, 
      name: "Bilal Hassan", 
      email: "bilal@example.com",
      rating: 3, 
      comment: "Decent platform but response time could be faster. Still helped me find my keys eventually.",
      date: "2024-03-11",
      helpful: 8,
      avatar: "BH"
    },
    { 
      id: 6, 
      name: "Fatima Zahra", 
      email: "fatima@example.com",
      rating: 5, 
      comment: "Absolutely fantastic! The team went above and beyond to help me locate my lost documents. Forever grateful!",
      date: "2024-03-10",
      helpful: 45,
      avatar: "FZ"
    },
    { 
      id: 7, 
      name: "Omar Farooq", 
      email: "omar@example.com",
      rating: 4, 
      comment: "Very helpful platform. Found my laptop charger through this site. Would definitely recommend.",
      date: "2024-03-09",
      helpful: 15,
      avatar: "OF"
    },
    { 
      id: 8, 
      name: "Zara Ahmed", 
      email: "zara@example.com",
      rating: 5, 
      comment: "Best lost and found platform ever! Quick response and very professional. 10/10 experience.",
      date: "2024-03-08",
      helpful: 28,
      avatar: "ZA"
    }
  ];

  const ratingOptions = ["All Ratings", "5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"];

  const filteredReviews = useMemo(() => {
    let filtered = reviews.filter(review => {
      const matchesSearch = review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesRating = true;
      if (selectedRating !== "All Ratings") {
        const ratingValue = parseInt(selectedRating);
        matchesRating = review.rating === ratingValue;
      }
      
      return matchesSearch && matchesRating;
    });
    
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchTerm, selectedRating]);

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    average: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    fiveStar: reviews.filter(r => r.rating === 5).length,
    fourStar: reviews.filter(r => r.rating === 4).length,
    threeStar: reviews.filter(r => r.rating === 3).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="pt-20 px-4 sm:px-6 lg:px-8 lg:pl-72">
        <div className="w-full max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">User Reviews</h1>
                <p className="text-slate-500 mt-1 text-sm">Read what users say about their experience</p>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Reviews</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{stats.total}</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <FaComment className="text-blue-500" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Average Rating</p>
                  <div className="flex items-center gap-1 mt-1">
                    <p className="text-2xl font-bold text-slate-800">{stats.average}</p>
                    <FaStar className="text-yellow-400 text-sm" />
                  </div>
                </div>
                <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <FaStar className="text-yellow-500" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">5 Star Reviews</p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.fiveStar}</p>
                </div>
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <FaStar className="text-emerald-500" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">4+ Star Reviews</p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">{stats.fourStar + stats.fiveStar}</p>
                </div>
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <FaThumbsUp className="text-purple-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or review content..."
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <FaTimes size={12} />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 border rounded-lg"
                >
                  <FaFilter size={12} /> Filters
                </button>
                <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex gap-3`}>
                  <select
                    value={selectedRating}
                    onChange={(e) => { setSelectedRating(e.target.value); setCurrentPage(1); }}
                    className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm cursor-pointer"
                  >
                    {ratingOptions.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          {paginatedReviews.length > 0 ? (
            <>
              <div className="space-y-4">
                {paginatedReviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all">
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm">{review.avatar}</span>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <div>
                              <h3 className="font-semibold text-slate-800">{review.name}</h3>
                              <p className="text-xs text-slate-400">{review.email}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex gap-0.5">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-xs text-slate-500 ml-1">{review.rating}.0</span>
                            </div>
                          </div>
                          
                          <p className="text-slate-600 text-sm leading-relaxed mb-3">{review.comment}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1.5">
                                <FaCalendarAlt className="text-slate-400 text-xs" />
                                <span className="text-xs text-slate-500">{new Date(review.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <FaThumbsUp className="text-slate-400 text-xs" />
                                <span className="text-xs text-slate-500">{review.helpful} found helpful</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-xs text-slate-500">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredReviews.length)} of {filteredReviews.length} reviews
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="p-2 border rounded-lg bg-white disabled:opacity-50 hover:bg-slate-50"
                    >
                      <FaChevronLeft size={12} />
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 rounded-lg text-sm ${
                            currentPage === pageNum
                              ? "bg-blue-500 text-white"
                              : "border bg-white hover:bg-slate-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 border rounded-lg bg-white disabled:opacity-50 hover:bg-slate-50"
                    >
                      <FaChevronRight size={12} />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-slate-400 text-3xl" />
              </div>
              <h3 className="text-lg font-medium text-slate-800 mb-1">No reviews found</h3>
              <p className="text-slate-500 text-sm">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserReviews;