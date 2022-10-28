const mysql = require('mysql');
const env = require('dotenv').config();
const lodash = require('lodash');
const {v4: uuid} = require('uuid');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const port = process.env.PORT;
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testing_db"
});
app.post('/save/:value', (req, res) => {
    let content = req.params.value;
    content = content.replaceAll('-', " ");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(content);
    /* const id = uuid();
    db.connect((err) => {
        if (err) throw err;
        let sql = `INSERT INTO test1 VALUES ('', '${id}', '${content}')`;
        db.query(sql, (error, result) =>{
            if (error) throw error;
            res.json({
                "Comment-ID": id,
                "Message": content,
                "Status": "Saved into database.",
                "Database Message": `${result.affectedRows} Record saved.`
            });
        });
    }); */
});

app.get('/view/:cmt_id', (req, res) =>{
    let id = req.params.cmt_id;
    db.connect((err)=>{
        if(err) throw err; 
        let sql = `SELECT * FROM test1 WHERE CMT_ID = '${id}'`;
        db.query(sql, (error, result) => {
            if(error) throw error.message;
            res.json({
                "TestID": result[0].TestID,
                "Comment-ID": result[0].CMT_ID,
                "Message-Body": result[0].contents
            });
        });
    });
});

app.get('/all', (req, res) => {
    db.connect((error) => {
        if(error) throw error;
        db.query("SELECT * FROM test1", (err, result) => {
            if(err) throw err;
            res.send(result);
        });
    });
});

app.listen(port, () => console.log("Server started..!"));