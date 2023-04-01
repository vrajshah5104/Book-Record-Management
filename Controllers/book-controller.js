// Brain or the logical part of the routes
// Writing all the routes here with the help of database
// Instead of accessing our json files, we'll be accessing our database files

const {UserModel, BookModel} = require("../Models/localindex");

// Completing this method inorder to call the books.js wala API
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

const getSingleBookById = () => {};

module.exports = {getAllBooks, getSingleBookById};