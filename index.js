const express = require('express')
const CryptoJS = require("crypto-js")
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const app = express()
const port = 3000
const con = require('./db_connection')


app.use(express.json())

const addList = async (id, total) => {

  if (total > 0 && total <= 100) {

    let newtotal = total + 1

    con.getConnection(function (error, connection) {
      if (error) {
        res.status(400).send({
          error: error
        })
      } else {
        var list = `UPDATE client_list SET total = ${newtotal} WHERE listid = '${id}'`

        connection.query(list, function (err, result) {
          connection.release()

          if (err) {
            return err
          } else {
            return result
          }
        })
      }
    })
  } else {
    con.getConnection(function (error, connection) {
      if (error) {
        res.status(400).send({
          error: error
        })
      } else {
        var list = `INSERT INTO client_list (id, listid, total, created_at, last_updated) VALUES (
            '${uuidv4()}',
            '${id}',
            '1',
            '${new Date().toISOString().slice(0, 19).replace('T', ' ')}',
            '${new Date().toISOString().slice(0, 19).replace('T', ' ')}')`

        connection.query(list, function (error, result) {
          connection.release()
          if (error) {
            return error
          }
        })
      }
    })
  }
}


app.post('/client', cors(), function (req, res) {
  console.time('tempo-execucao > ')

  if (
    typeof (req.body) === 'object' && req.body !== '' &&
    typeof (req.body.name) === 'string' && req.body.name !== '' &&
    typeof (req.body.email) === 'string' && req.body.email !== '' &&
    typeof (req.body.celphone) === 'string' && req.body.celphone !== '' &&
    typeof (req.body.status) === 'number' && req.body.name !== ''
  ) {
    let request = req.body

    request.id = CryptoJS.MD5(uuidv4()).toString()
    request.hash = CryptoJS.MD5(uuidv4()).toString()
    let listid

    let total

    con.getConnection(function (error, connection) {
      if (error) {
        res.status(400).send({
          error: error
        })
      } else {

        var sqllist = `SELECT * FROM client_list WHERE total < 100`

        connection.query(sqllist, function (err, result, fields) {
          connection.release()
          if (err) {
            res.status(400).send({
              error: err
            })
          } else {

            if (result.length > 0) {
              listid = result[0].listid
              total = result[0].total
            } else {
              listid = CryptoJS.MD5(uuidv4()).toString()
              total = 0
            }

            addList(listid, total).then(

              con.getConnection(function (error, connection) {
                if (error) {
                  res.status(400).send({
                    error: error
                  })
                } else {

                  var sql = `INSERT INTO client (id, listid, name, email, celphone, status, hash, created_at, last_updated) VALUES (
                    '${request.id}',
                    '${listid}',
                    '${request.name}',
                    '${request.email}',
                    '${request.celphone}',
                    '${request.status}',
                    '${request.hash}',
                    '${new Date().toISOString().slice(0, 19).replace('T', ' ')}',
                    '${new Date().toISOString().slice(0, 19).replace('T', ' ')}')`

                  connection.query(sql, function (err, result) {
                    connection.release()
                    if (err) {
                      res.status(422).send({
                        error: err
                      })
                    } else {
                      res.status(201).send({
                        id: listid
                      })
                    }
                  })
                }
              })
            ).catch(err => {
              res.status(422).send({
                error: 'Erro ao inserir dados: ' + err
              })
            })
          }
        })
      }
    })
  } else {
    res.status(422).send({
      error: 'Dados incorretos'
    })
  }
  // Tempo de execução do script
  console.timeEnd('tempo-execucao > ')
})


app.get('/client/:id', cors(), function (req, res) {
  console.time('tempo-execucao > ')
  var sql = `SELECT * FROM client WHERE listid = '${req.params.id}'`

  con.getConnection(function (error, connection) {
    if (error) {
      res.status(400).send({
        error: error
      })
    } else {

      connection.query(sql, function (err, result) {
        connection.release()
        if (err) {
          res.status(400).send({
            error: 'Lista inexistente'
          })
        } else {
          res.status(200).send({
            list: result
          })
        }
      })

    }


  })

  console.timeEnd('tempo-execucao > ')
})


app.get('/clients', cors(), function (req, res) {
  console.time('tempo-execucao > ')
  var sql = `SELECT * FROM client_list`

  con.getConnection(function (error, connection) {
    if (error) {
      res.status(400).send({
        error: error
      })
    } else {
      connection.query(sql, function (err, result) {
        connection.release()
        if (err) {
          res.status(400).send({
            error: err
          })
        } else {
          res.status(200).send({
            result
          })
        }
      })
    }

  })

  console.timeEnd('tempo-execucao > ')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})