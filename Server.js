const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sybsc',
    database: 'linktree',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }

    console.log('Connected to the database');
});

const JWT_SECRET = 'afubcplo90u';


app.post('/signup', async(req,res) =>{
    const{email, password}= req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    console.log(req.body)


    const insertQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';

    const values= [email,hashedPassword]

    db.query(insertQuery, values, (err, result) => {
        if (err) {
        console.error('Registration failed:', err);
        return;
        }
        console.log('Registration successfull');

        const token= jwt.sign({id: result.insertId, email: email},JWT_SECRET,{expiresIn: '1h'});

        res.json({ message: 'Registration successfull',
            token: token
         });
        });
})