import express from "express";
import { newBurrowValidation } from "../middlewares/joiValidation.js";
import { auth } from "../middlewares/authMiddleware.js";
import { insertBurrow } from "../models/borrowHistory/BorrowModel.js";
import { getABookById, updateABookById } from "../models/books/BookModel.js";

// Due date is 15 days from burrow date
const DUE_DURATION = 15;
const router = express.Router();

// endpoints

const createBurrowRecord = async (req, res, next) => {
  try {
    const { _id, name } = req.userInfo;

    const { bookId, bookTitle, thumbnail } = req.body;

    const dueDate = new Date(+new Date() + DUE_DURATION * 24 * 60 * 60 * 1000);

    const bookDatat = await getABookById(bookId);

    if (bookDatat) {
      if (bookDatat.isAvailable) {
        const obj = {
          userId: _id,
          bookId,
          bookTitle,
          thumbnail,
          dueDate,
        };
        const burrow = await insertBurrow(obj);

        if (burrow) {
          const bookBurrowed = await updateABookById(bookId, {
            isAvailable: false,
            expectedAvailable: dueDate,
          });

          return res.json({
            status: "success",
            message: "Book Borrowed Successfully",
          });
        }
      } else {
        const error = {
          status: 404,
          message: "Book already borrowed",
        };
        next(error);
      }
    } else {
      const error = {
        status: 404,
        message: "Book not found",
      };
      next(error);
    }
    // book available condition
  } catch (error) {
    next(error);
  }
};

router.post("/", auth, newBurrowValidation, createBurrowRecord);

export default router;
