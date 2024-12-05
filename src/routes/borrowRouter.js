import express from "express";
import { newBurrowValidation } from "../middlewares/joiValidation.js";
import { auth } from "../middlewares/authMiddleware.js";
import {
  getABurrowById,
  getAllBurrows,
  insertBurrow,
  updateABurrowById,
} from "../models/borrowHistory/BorrowModel.js";
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

router.get("/", auth, async (req, res, next) => {
  // get user id
  // fetch borrow list using user id

  const { _id } = req.userInfo;

  const filter = {
    userId: _id,
  };
  const borrows = await getAllBurrows(filter);

  return res.json({
    status: "success",
    message: "borrows found",
    borrows,
  });
});

router.put("/return/:id", auth, async (req, res, next) => {
  // 0. get user id
  // check if user id is matching the user id in borrow data
  const { id } = req.params;
  const userId = req.userInfo._id;

  const borrowData = await getABurrowById(id);
  console.log(userId.toString());
  console.log(borrowData.userId.toString());
  if (userId.toString() == borrowData.userId.toString()) {
    console.log("INSIDE CHECK");
    const updateData = {
      isReturned: true,
      returnedDate: new Date(),
    };

    // update borrow data
    await updateABurrowById(id, updateData);
    // update book data

    const bookBurrowed = await updateABookById(borrowData.bookId, {
      isAvailable: true,
    });

    return res.json({
      status: "success",
      message: "Book Returned",
    });
  } else {
    const error = {
      status: 403,
      message: "Return not allowed",
    };
    next(error);
  }

  // 1. update the borrow data
  // 2. update the book data
});
export default router;
