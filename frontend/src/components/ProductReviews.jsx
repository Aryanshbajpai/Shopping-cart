import React, { useEffect, useState } from "react";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState("0.0");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const fetchReviews = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/reviews/${productId}`);
      const data = await res.json();

      console.log("GET reviews:", data);

      if (data.success) {
        setReviews(data.data || []);
        setAverageRating(data.averageRating || "0.0");
      }
    } catch (error) {
      console.log("Fetch reviews error:", error);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/reviews/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
          userId: "123",
          userName: "Aryansh",
          rating: Number(rating),
          comment: comment,
        }),
      });

      const data = await res.json();

      console.log("POST review:", data);

      if (data.success) {
        alert("Review added successfully");
        setComment("");
        setRating(5);
        await fetchReviews();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Submit review error:", error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product Review & Rating</h2>

      <h3>Average Rating: {averageRating} ⭐</h3>

      <form onSubmit={submitReview}>
        <label>Rating</label>
        <br />

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="5">5 Star</option>
          <option value="4">4 Star</option>
          <option value="3">3 Star</option>
          <option value="2">2 Star</option>
          <option value="1">1 Star</option>
        </select>

        <br />
        <br />

        <label>Comment</label>
        <br />

        <textarea
          placeholder="Write your review here"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows="4"
          cols="40"
        ></textarea>

        <br />
        <br />

        <button type="submit">Add Review</button>
      </form>

      <hr />

      <h3>All Reviews</h3>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id}>
            <h4>{review.userName}</h4>
            <p>Rating: {review.rating} ⭐</p>
            <p>Comment: {review.comment}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default ProductReviews;