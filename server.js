// server.js
console.log('May Node be with you');
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectionString = 'mongodb+srv://yoda:kekw@agsoftwarezcluster.b2hct.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(connectionString,  {})
    .then(client => {
        console.log('Connected to Database');

        const db = client.db('quotes-database');
        const quotesCollection = db.collection('names-ages');


        app.use(bodyParser.urlencoded({ extended: true}))
        app.use(bodyParser.json())
        app.use(express.static('public'))

        app.get('/', (req, res) => {
            db.collection('names-ages').find().toArray()
                .then(results => {
                    console.log(results)
                    res.render('index.ejs', { quotes: results });
                })
                .catch(error => console.log(error))

            console.log('We got a client!');
        });


        app.post('/quotes', (req, res) => {
            //res.sendFile(__dirname + '/index.html');
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                    console.log(result)
                })
                .catch(error => console.error(error))
        });

        app.put('/quotes', (req, res) => {
            quotesCollection.findOneAndUpdate(
                {name: 'Yoda'},
                {
                    $set: {
                        name: req.body.name,
                        age: req.body.age
                    }
                },
                {
                    upsert: false 
                }
            )
                .then(result => {
                    res.json('Success')
                    console.log(result)
                })
                .catch(error => console.error(error))
                console.log(req.body)
        })

        app.delete('/quotes', (req, res) => {
            //handle event here
            quotesCollection.deleteOne(
                {name: req.body.name }
            )
                .then(result =>{ 
                    if (result.deletedCount === 0){
                        return res.json('No DV quote to delete.')
                    }
                    res.json('Deleted DV.')
                })
            .catch(error => console.error(error))
        })

        app.listen(3000, function() {
        console.log('listening on 3000')
        });

    })
    .catch(error => console.error(error));

