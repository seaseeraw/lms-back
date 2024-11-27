import express from 'express';
import { 
  getAllBooks, 
  getBookById, 
  createBook, 
  updateBook, 
  deleteBook 
} from '../controllers/bookController.js';

const router = express.Router();

// Route: Get all books
router.get('/', getAllBooks);

// Route: Get book by ID
router.get('/:id', getBookById);

// Route: Create a new book
router.post('/', createBook);

// Route: Update a book by ID
router.put('/:id', updateBook); // Use PUT or PATCH as needed

// Route: Delete a book by ID
router.delete('/:id', deleteBook);

export default router;
