const express = require('express')
const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')
const app = express()
const port = 3000
const con = require('./db_connection')

app.use(express.json());

const addList = async (id) => {

  let i = 99

  while(i >= 0){

    let register = {
      name: 'Nome',
      email: 'email@email.com',
      celphone: '11999999999',
      status: 1,
      hash: uuidv4()
    }

    var list = `INSERT INTO client_list (id, listid, name, email, celphone, status, hash, created_at, last_updated) VALUES (
      '${uuidv4()}',
      '${id}',
      '${register.name}',
      '${register.email}',
      '${register.celphone}',
      '${register.status}',
      '${register.hash}',
      '${new Date().toISOString().slice(0, 19).replace('T', ' ')}',
      '${new Date().toISOString().slice(0, 19).replace('T', ' ')}')`;
  
  
    con.query(list, function (err, result) {
      if (err){
        throw err
      }
    })
    i--
  }

}

app.post('/client', cors(), function (req, res) {
  console.time('tempo-execucao > ');
  let request = req.body

  request.id = CryptoJS.MD5(uuidv4()).toString()
  request.hash = CryptoJS.MD5(uuidv4()).toString()
  request.listid = CryptoJS.MD5(uuidv4()).toString()

  var sql = `INSERT INTO client (id, listid, name, email, celphone, status, hash, created_at, last_updated) VALUES (
    '${request.id}',
    '${request.listid}',
    '${request.name}',
    '${request.email}',
    '${request.celphone}',
    '${request.status}',
    '${request.hash}',
    '${new Date().toISOString().slice(0, 19).replace('T', ' ')}',
    '${new Date().toISOString().slice(0, 19).replace('T', ' ')}')`;


    addList(request.listid).then(

      con.query(sql, function (err, result) {
        if (err){
          res.status(422).send({
            error: err
          })
        }else{
          res.status(201).send({
            id: request.listid
          })
        }
      })

    )
    
    // Tempo de execução do script
    console.timeEnd('tempo-execucao > ');

    

})


app.get('/client/:id', cors(), function (req, res) {
  console.time('tempo-execucao > ');
  var sql = `SELECT * FROM client_list WHERE listid = '${req.params.id}'`

  con.query(sql, function (err, result) {
    if (err){
     res.status(422).send({
        error: err
      })
    }else{
      res.status(200).send({
       list: result
      })
    }
  })
  console.timeEnd('tempo-execucao > ');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})