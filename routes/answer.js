const express = require("express");
const router = express.Router();
const mysql = require("../mysqlNewApi").pool;
const cors = require("cors");
const app = express();

app.use(cors());
//Visualiza nomes
router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM answer;", (error, resultado, field) => {
      if (error) {
        return res.status(500).send({ error: error });
      }

      return res.status(200).send({ message: resultado });
    });
  });
});
// Posta nomes
router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `INSERT INTO answer (id_comments, feedback_end, created_at, received, rating) VALUES (1, ?, NOW(), ?, ?)`,
      [req.body.feedback_end, req.body.received, req.body.rating],
      (error, resultado, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error,
            message: null,
          });
        }
        res.status(201).send({
          mensagem: "O participante foi inserido com sucesso.",
          id: resultado.insertId,
        });
      }
    );
  });
});

module.exports = router;
