const Book = require('../models/books');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBook = async (req, res) => {
  const { title, author, publicationYear } = req.body;
  const userId = req.user;

  try {
    const newBook = await Book.create({ title, author, publicationYear, userId });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  const { title, author, publicationYear } = req.body;
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    book.title = title;
    book.author = author;
    book.publicationYear = publicationYear;
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    await book.remove();
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.filterBooks = async (req, res) => {
    const { author, publicationYear } = req.query;
    const filter = {};
  
    if (author) {
      filter.author = author;
    }
  
    if (publicationYear) {
      filter.publicationYear = publicationYear;
    }
  
    try {
        const userId = req.user
        const books = await Book.find({ ...filter, userId });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


  