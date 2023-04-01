// Data Transfer Object - Book Data

class issuedBooks {
    _id; // Not just 'id' because we want it to be auto-generated
    name;
    author;
    genre;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnDate;

    // Defualt Constructor gets called/invoked as soon as we make a class

// This is a Parameterized Constructor
// In JS we can just write the keyword constructor and call it without writing any class name
    constructor (user) {
        // 'this' is a special keyword always used on the left hand side
        this._id = user.issuedBooks._id;
        this.name = user.issuedBooks.name;
        this.author = user.issuedBooks.author;
        this.genre = user.issuedBooks.genre;
        this.price = user.issuedBooks.price;
        this.publisher = user.issuedBooks.publisher;
        this.issuedBy = user.issuedBooks.issuedBy;
        this.issuedDate = user.issuedBooks.issuedDate;
        this.returnDate = user.issuedBooks.returnDate;
    }
}

module.exports = issuedBooks;