let express = require('express')
var cors = require('cors')



let mongoClient = require('mongodb').MongoClient
const { url } = require('./password')

let database;

mongoClient.connect(url, function (err, client) {
    database = client.db("libraryFromNode")
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
    // let books = database.collection("books")
    console.log(request.body)
    // response.send()
    // books.insertOne({
    //     id: request.body.id,
    //     name: request.body.name,
    //     author: request.body.author
    // })
})

app.listen(3000)