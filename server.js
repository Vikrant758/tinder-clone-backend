import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import Cors from 'cors';

//App Con fig
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://admin:ctoK2mJBph6cyrr2@cluster0.uxso7.mongodb.net/tinderdb?retryWrites=true&w=majority`;

//Middlewares
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(connection_url, {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology:true})
const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('Database Connected');
}).catch(err =>{
    console.log('Connection failed');
})

//API endpoints
app.get('/',(req, res)=>{
    res.status(200).send("HIi vicky");
});

app.post('/tinder/cards', (req, res)=>{
    const dbCard = req.body;
    Cards.create(dbCard, (err, data )=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    });    
})

app.get('/tinder/cards', (req, res)=>{
    Cards.find((err, data )=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    });
})

//Listners
app.listen(port, ()=>{
    console.log(`Listening on localhost ${port}`);
    
})
