let express = require('express')
var cors = require('cors')



let mongoClient = require('mongodb').MongoClient
const { url } = require('./password')

let database;
mongoClient.connect(url, function (err, client) {
    database = client.db("libraryFromNode")
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

    books.find({}).toArray(function (err, documents) {
        response.send(JSON.stringify(documents));
        console.log(JSON.stringify(documents))
    });
})

app.get('/api/books', function (request, response) {
    // console.log(request.query)
    const bookId = request.query.id;
    let books = database.collection("books")

    books.find({ id: bookId }).toArray(function (err, documents) {
        response.send(JSON.stringify(documents));
        console.log(JSON.stringify(documents))
    })
})

app.post('/api/books/create', async function (request, response) {
    let books = database.collection("books")
    let book = request.body;
    console.log('Create book:\n', book)

    try {
        await books.insertOne(book)
        response.send('OK')
    } catch (err) {
        console.error(err)
    }
})

app.get('/api/books/clear', function (request, response) {
    let books = database.collection("books")
    try {
        books.deleteMany({})
        books.find().toArray(function (err, documents) {
            response.send(JSON.stringify(documents));
            console.log(JSON.stringify(documents))
        });
    } catch (err) {
        console.error(err)
    }
})


app.get('/api/bookflow/get-all', function (request, response) {
    let bookflow = database.collection("bookflow")
    bookflow.find().toArray(function (err, documents) {
        response.send(JSON.stringify(documents));
        console.log(JSON.stringify(documents))
    });
})

app.post('/api/bookflow/create', async function (request, response) {
    let bookflow = database.collection("bookflow")
    console.log(request.body)
    try {
        await bookflow.insertOne(request.body)
        response.send('OK')
    } catch (err) {
        console.error(err)
    }
})

app.get('/api/bookflow/clear', function (request, response) {
    let bookflow = database.collection("bookflow")
    try {
        bookflow.deleteMany({})
        bookflow.find().toArray(function (err, documents) {
            response.send(JSON.stringify(documents));
            console.log(JSON.stringify(documents))
        });
    } catch (err) {
        console.error(err)
    }
})

app.get('/api/users/get-all', function (request, response) {
    let users = database.collection("users")
    users.find().toArray(function (err, documents) {
        response.send(JSON.stringify(documents));
        console.log(JSON.stringify(documents))
    });
})

app.post('/api/users/create', async function (request, response) {
    let users = database.collection("users")
    console.log(request.body)
    try {
        await users.insertOne(request.body)
        response.send('OK')
    } catch (err) {
        console.error(err)
    }
})

app.get('/api/users/clear', function (request, response) {
    let users = database.collection("users")
    try {
        users.deleteMany({})
        users.find().toArray(function (err, documents) {
            response.send(JSON.stringify(documents));
            console.log(JSON.stringify(documents))
        });
    } catch (err) {
        console.error(err)
    }
})

app.listen(3000)
