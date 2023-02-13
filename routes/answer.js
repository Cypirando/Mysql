const express = require("express");
const router = express.Router();
const mysql = require("../mysqlNewApi").pool;
const app = express();
var cors = require("cors");
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});
//Visualiza nomes
router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      conn.release();
      return res.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM answer;", (error, resultado, field) => {
      if (error) {
        conn.release();
        return res.status(500).send({ error: error });
      }
      conn.release();
      return res.status(200).send({ message: resultado });
    });
  });
});
// Posta nomes
router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      conn.release();
      return res.status(500).send({ error: error });
    }
    conn.query(
      `INSERT INTO answer (id_comments, feedback_end, created_at, rating) VALUES (23, ?, NOW(), ?)`,
      [req.body.feedback_end, req.body.rating],
      (error, resultado, field) => {
        conn.release();
        if (error) {
          conn.release();
          return res.status(500).send({
            error: error,
            message: null,
          });
        }
        conn.release();
        res.status(201).send({
          mensagem: "O participante foi inserido com sucesso.",
          id: resultado.insertId,
        });
      }
    );
  });
});


module.exports = router;
