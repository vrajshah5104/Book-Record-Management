# Book-Record-Mnanagement
# Mongo-Db

Server >> Storing certain book data
       >> User register
       >> Subscriber

This is a Book Record Management API Server / Back-end for the library system or management of records/manuels/books.

## Fine System Example:
User Book Issue Range: 06/03/2023 -> 06/06/2023
if returned on 07/03/2023 pay 50/-, if on 09/03/2023 pay 3*50=150/-

## Subscription Types:
3 months (Basic)
6 months (Standard)
12 months (Premium)

Eg. So if the subscription type is standard && if the subscription date is 06/03/2023
=> Subscription valid till 06/09/2023\
=> Within subscription date if we miss the renewal = 50/day
=> Subscription date missed and Renewal also missed = 100+50/day

Eg. >> book-1
    >> Basic Subscription
    >> Subscription date - 06/03/2023
    >> Borrowed a book from library - 07/03/2023
    >> Book-1 renewal date - 21/03/2023
    >> On 23/03/2023 we'll have to pay 50*(extra no of days)
    >> On 23/06/2023 we'll have to pay 100+(50*(no of days))

Missed by Renewal date >> 50/-
Missed by Subscription date >> 100/-
Missed by Renewal and Subscription date >> 150/-

# Routes and Endpoints

## /users
POST: Create a new user
GET: Get all the user info here

## /users/{id}
GET: Get a single user from the particular id
PUT: Update a user by their id
DELETE: Delete a user by their id (Check if he/she still has an issued book on their name && if there is any fine still left to be paid)

## /users/subscription-details/{id}
GET: Get user subscription details
       >> Date of Subscription
       >> Valid till
       >> Is there any fine

## /books
GET: Get all the books
POST: Create/Add a new book

## /books/{id}
GET: Get a book by id
PUT: Update a book by id

## /books/issued
GET: Get all issued books

## /books/issued/withFine
GET: Get all issued books with their fines

Get package.json
## npm init

Get nodemon (install it wrt developers dependencies)
## npm i nodemon --save-dev

Get express
## npm i express

Start/Run a server
## npm run dev

Create file .gitignore
Files/Folders in it will not be seen on github

MongoDb connection files, codes, notes also present in this Project

Continue Day-44 from 09:23