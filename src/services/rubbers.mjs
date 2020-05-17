import sqlite3 from "sqlite3"
//import rubberService from './services/rubbers'
import express from 'express'

const app = express()
let db = new sqlite3.Database('../../rubbers_db.db');
// open the database


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/rubbers', (req, res) => {
  let sql = `SELECT Rubber FROM rubbers;`;
  let rubbers = []
  console.log('before query')

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row)
      rubbers.concat(row);
    });
  });

  return(
    //res.json(rubbers)
    res.send(rubbers)
  )
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// close the database connection
//db.close();