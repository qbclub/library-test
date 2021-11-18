let express = require('express')
var cors = require('cors')

 

let mongoClient = require('mongodb').MongoClient
let url = "mongodb://AdminMongo:QbitMongo@grif-qbit.duckdns.org:27017/"

let database;

mongoClient.connect(url, function (err, client) {
    database = client.db("libraryFromNode")
})


let app = express()
app.use(cors())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())


app.post('/sendBook', function (request, response) {
    let books = database.collection("books")
    console.log(request.body)
    books.insertOne({
        id: request.body.id,
        name: request.body.name,
        author: request.body.author
    })
 
    books.find().toArray(function (err, documents) {
        response.send(JSON.stringify(documents));
    });


    
})




app.listen(3000)