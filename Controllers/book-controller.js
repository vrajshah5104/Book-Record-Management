// Brain or the logical part of the routes
// Writing all the routes here with the help of database
// Instead of accessing our json files, we'll be accessing our database files

const {UserModel, BookModel} = require("../Models/localindex");

const issuedBooks = require("../DTOs/book-dto");

// Completing this method inorder to call the books.js wala API
// Description: Getting all the books
// Fetching something from the database takes time, soo we need to make it in a synchronous way
// So we use Async and Await here
const getAllBooks = async(req, res) => {
    const books = await BookModel.find();

    if (books.length === 0) {
        return res.status(404).json ({
            success: false,
            message: "Book not found"
        })
    }
    return res.status(200).json ({
        success: true,
        message: "Books found",
        data: books // This data isn't from the json file now, it's rather from the BookModel table
    })
};

// Completing this method inorder to call the books.js wala API
// Description: Get all the Issued Books (Only if the user has issued any)
const getAllIssuedBooks = async(req, res) => {
    const users = await UserModel.find ({
        issuedBooks : {$exists: true}
    }).populate("issuedBooks")

    // DTO (Data Transfer Object)
    // Here we are transferring some data amongs our objects
    // Calling our DTO
    const issuedBooks = users.map((each) => new issuedBooks(each));
    
    if (issuedBooks.length === 0) {
        return res.status(404).json ({
            success: false,
            message: "No Books have been issued yet"
        })
    }
    return res.status(200).json ({
        success: true,
        message: "Users with the issued Books",
        data: issuedBooks
    })
}

// Completing this method inorder to call the books.js wala API
// Description: Adding a new book
const addNewBook = async(req, res) => {
    const {data} = req.body;
  
    if (!data) {
      return res.status(400).json ({
        sucess: false,
        message: "No Data To Add A Book"
      })
    }
    await BookModel.create(data);
    const allBooks = await BookModel.find();
  
    return res.status(201).json ({
        success: true,
        message: "Added Book Succesfully",
        data: allBooks
    })
};

// Completing this method inorder to call the books.js wala API
// Description: Updating a book by its id
const updateBookById = async(req, res) => {
    const {id} = req.params;
    const {data} = req.body;
    const updatedBook = await BookModel.findOneAndUpdate (
      {
        _id: id,
      },
      data,
      {
        new: true,
      }
    );
    return res.status(200).json ({
        success: true,
        message: "Updated a Book By Their Id",
        data: updatedBook,
    });
};

// Completing this method inorder to call the books.js wala API
// Description: Get books by their id
const getSingleBookById = async(req, res) => {
    const {id} = req.params;
    const book = await BookModel.findById(id);
  
    if (!book) {
      return res.status(404).json ({
        success: false,
        message: "Book Not Found",
      });
    }
    return res.status(200).json ({
        success: true,
        message: "Found The Book By Their Id",
        data: book,
    });
};

module.exports = {getAllBooks, getAllIssuedBooks, addNewBook, updateBookById, getSingleBookById};