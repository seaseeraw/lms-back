

// // Get all books
// export const getAllBooks = async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.status(200).json({ success: true, data: books });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to fetch books", error: error.message });
//   }
// };

// // Get a book by ID
// export const getBookById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const book = await Book.findById(id);
//     if (!book) {
//       return res.status(404).json({ success: false, message: "Book not found" });
//     }
//     res.status(200).json({ success: true, data: book });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error fetching the book", error: error.message });
//   }
// };

// // Create a new book
// export const createBook = async (req, res) => {
//   try {
//     const bookData = req.body; // Assume the book data is sent in the request body
//     const newBook = new Book(bookData);
//     await newBook.save();
//     res.status(201).json({ success: true, message: "Book created successfully", data: newBook });
//   } catch (error) {
//     res.status(400).json({ success: false, message: "Error creating book", error: error.message });
//   }
// };

// // Update a book by ID
// export const updateBook = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = req.body; // Assume the updated data is sent in the request body
//     const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
//     if (!updatedBook) {
//       return res.status(404).json({ success: false, message: "Book not found" });
//     }
//     res.status(200).json({ success: true, message: "Book updated successfully", data: updatedBook });
//   } catch (error) {
//     res.status(400).json({ success: false, message: "Error updating book", error: error.message });
//   }
// };

// // Delete a book by ID
// export const deleteBook = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedBook = await Book.findByIdAndDelete(id);
//     if (!deletedBook) {
//       return res.status(404).json({ success: false, message: "Book not found" });
//     }
//     res.status(200).json({ success: true, message: "Book deleted successfully", data: deletedBook });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error deleting book", error: error.message });
//   }
// };


import bookSchema from "./bookschema.js";

// create user function
export const createNewBook = (userObj) => {
  return bookSchema(userObj).save();
};

