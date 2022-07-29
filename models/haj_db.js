const sqlite = require("better-sqlite3");
const path = require("path");
const db = new sqlite(path.resolve("haj.db"), { fileMustExist: true });

const getReceiptById = async (id) => {
  return db.prepare("SELECT * FROM receipt WHERE patientId = ?").all(id);
};

const getAllLanguages = () => {
  return db.prepare("SELECT * FROM language").all();
};

const addReceipt = (receipt) => {
  return db
    .prepare(
      "INSERT INTO receipt (patientId, patientName, date, drugName, doseAmount, amountType, timeType, takingMethod, dosesPerDay, dosesTime, duration, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    )
    .run(
      receipt.patientId,
      receipt.patientName,
      receipt.date,
      receipt.drugName,
      receipt.doseAmount,
      receipt.amountType,
      receipt.timeType,
      receipt.takingMethod,
      receipt.dosesPerDay,
      receipt.dosesTime,
      receipt.duration,
      receipt.comment
    );
};

// addMealReview(review);
module.exports = {
  getAllLanguages,
  getReceiptById,
  addReceipt,
};
