let express = require('express')
var cors = require('cors')



let mongoClient = require('mongodb').MongoClient
const { url } = require('./password')

let database;
mongoClient.connect(url, async function (err, client) {
    database = await client.db("libraryFromNode")
    console.log('mongo connected')
})


const app = express()
app.use(cors())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())


// app.post('/sendBook', function (request, response) {
//     let books = database.collection("books")
//     // console.log(books)
//     // console.log(request.body)

//     books.insertOne({
//         id: request.body.id,
//         name: request.body.name,
//         author: request.body.author
//     })

//     // books.find().toArray(function (err, documents) {
//     //     response.send(JSON.stringify(documents));
//     //     console.log(JSON.stringify(documents))
//     // });
// })
// listen to get all books
app.get('/api/books/get-all', function (request, response) {
    console.log(request.body)
    // send all books
    let books = database.collection("books")

    books.find().toArray(function (err, documents) {
        response.send(JSON.stringify(documents));
        console.log(JSON.stringify(documents))
    });
})

app.post('/api/books/create', function (request, response) {
    let books = database.collection("books")
    console.log('Create book: ', request.body)

    try {
        books.insertOne({
            id: request.body.id,
            name: request.body.name,
            author: request.body.author
        })
        response.send('OK')
    } catch (err) {
        console.error(err)
    }
})

app.get('/api/bookflow/get-all', function (request, response) {
    console.log(request.body)
    let bookflow = database.collection("bookflow")
    bookflow.find().toArray(function (err, documents) {
        response.send(JSON.stringify(documents));
        console.log(JSON.stringify(documents))
    });
})

app.post('/api/bookflow/create', function (request, response) {
    let bookflow = database.collection("bookflow")
    console.log(request.body)
    try {
        bookflow.insertOne(request.body)
        response.send('OK')
    } catch (err) {
        console.error(err)
    }
})

app.listen(3000)