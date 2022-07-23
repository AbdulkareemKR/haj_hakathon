const sqlite = require("better-sqlite3");
const path = require("path");
const db = new sqlite(path.resolve("haj.db"), { fileMustExist: true });

const getReceiptById = async (id) => {
  return db.prepare("SELECT * FROM receipt WHERE patientId = ?").all(id);
};

const getAllLanguages = () => {
  return db.prepare("SELECT * FROM language").all();
};

const getMealReviews = (meal_id) => {
  return db.prepare("SELECT * FROM reviews WHERE meal_id = ?").all(meal_id);
};

const getMealAVGRating = (meal_id) => {
  return db
    .prepare(
      "SELECT ROUND (AVG(rating),2) as rating FROM reviews WHERE meal_id = ?"
    )
    .all(meal_id);
};

const getAllAVGRating = () => {
  return db
    .prepare(
      "SELECT meal_id, ROUND (AVG(rating),2) as rating FROM reviews GROUP BY meal_id"
    )
    .all();
};

// console.log(getMealAVGRating(3));

const addMealReview = (review) => {
  return db
    .prepare(
      "INSERT INTO reviews (reviewer_name, city, date, rating, review, meal_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
    .run(
      review.reviewer_name,
      review.city,
      review.date,
      review.rating,
      review.review,
      review.meal_id,
      review.image
    );
};

review = {
  reviewer_name: "abdullah",
  city: "Riyadh",
  date: "2015-34-43",
  rating: 1,
  review: "goood",
  meal_id: 3,
};

// addMealReview(review);
module.exports = {
  getAllLanguages,
  getReceiptById,
  getMealReviews,
  addMealReview,
  getMealAVGRating,
  getAllAVGRating,
};
