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

router.get("/:id", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM comments WHERE id=?;",
      [req.params.id],
      (error, resultado, field) => {
        if (error) {
          return res.status(500).send({ error: error });
        }

        return res.status(200).send({ message: resultado });
      }
    );
  });
});
//Visualiza nomes
router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      conn.release();

      return res.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM comments;", (error, resultado, field) => {
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
      conn.release()
      return res.status(500).send({ error: error });
    }
    conn.query(
      "INSERT INTO comments (question_text, feedback_text, created_at) VALUES (?,?,NOW())",
      [req.body.question_text, req.body.feedback_text, req.body.created_at],
      (error, resultado, field) => {
        conn.release();
        if (error) {
          conn.release()
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
