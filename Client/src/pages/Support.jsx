import { useState } from "react";

function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
    rating: 0,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.feedback || formData.rating === 0) {
      alert("Please fill all fields and provide a rating!");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="max-w-lg mx-auto mt-10  h-screen bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Feedback</h2>
      
      {submitted ? (
        <div className="text-center text-green-600 font-semibold">
          🎉 Thank you for your feedback!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 h-5">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          {/* Feedback */}
          <textarea
            name="feedback"
            placeholder="Write your feedback..."
            value={formData.feedback}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          ></textarea>

          {/* Star Rating */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRating(star)}
                className={`cursor-pointer text-2xl ${
                  formData.rating >= star ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-all"
          >
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
}

export default Support;
