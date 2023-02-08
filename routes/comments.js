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
  let interval = setInterval(() => {
    mysql.getConnection((error, conn) => {
      if (error) {
        clearInterval(interval);
        return res.status(500).send({ error: error });
      }
      conn.query(
        "SELECT * FROM comments WHERE id=?;",
        [req.params.id],
        (error, resultado, field) => {
          if (error) {
            clearInterval(interval);
            return res.status(500).send({ error: error });
          }
          clearInterval(interval);
          return res.status(200).send({ message: resultado });
        }
      );
    });
  }, 1000);
});
//Visualiza nomes
router.get("/", (req, res, next) => {
  let interval = setInterval(() => {
    mysql.getConnection((error, conn) => {
      if (error) {
        clearInterval(interval);
        return res.status(500).send({ error: error });
      }
      conn.query("SELECT * FROM comments;", (error, resultado, field) => {
        if (error) {
          clearInterval(interval);
          return res.status(500).send({ error: error });
        }
        clearInterval(interval);
        return res.status(200).send({ message: resultado });
      });
    });
  }, 1000);
});
// Posta nomes
router.post("/", (req, res, next) => {
  let interval = setInterval(() => {
    mysql.getConnection((error, conn) => {
      if (error) {
        clearInterval(interval);
        return res.status(500).send({ error: error });
      }
      conn.query(
        "INSERT INTO comments (question_text, feedback_text, created_at) VALUES (?,?,NOW())",
        [req.body.question_text, req.body.feedback_text, req.body.created_at],
        (error, resultado, field) => {
          conn.release();
          if (error) {
            clearInterval(interval);
            return res.status(500).send({
              error: error,
              message: null,
            });
          }
          clearInterval(interval);
          res.status(201).send({
            mensagem: "O participante foi inserido com sucesso.",
            id: resultado.insertId,
          });
        }
      );
    });
  }, 1000);
});

router.get("/polling", (req, res) => {
  let interval = setInterval(() => {
    mysql.getConnection((error, conn) => {
      if (error) {
        clearInterval(interval);
        return res.status(500).send({ error: error });
      }
      conn.query("SELECT * FROM comments;", (error, resultado, field) => {
        if (error) {
          clearInterval(interval);
          return res.status(500).send({ error: error });
        }
        if (resultado.length !== 0) {
          clearInterval(interval);
          return res.status(200).send({ message: resultado });
        }
      });
    });
  }, 1000);
});

module.exports = router;
