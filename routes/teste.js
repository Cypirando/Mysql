// // Obtém o id_comments
// const id_comments = await connection.query(
//   "SELECT id FROM comments WHERE question_text = ?",
//   [req.body.question_text]
// );

// // Insere os valores na tabela answer
// await connection.query(
//   "INSERT INTO answer (id_comments, feedback_end, created_at, received, rating) VALUES (?, ?, NOW(), ?, ?)",
//   [id_comments[0].id, req.body.feedback_end, req.body.received, req.body.rating]
// );
// //   "INSERT INTO answer (id_comments, feedback_test, created_at, received, rating) VALUES (?,?,NOW())"
//       // INSERT INTO answer (feedback_end, created_at, received, rating) VALUES (?,NOW(),?,?)
//       // SELECT a.id, c.question_text
//       //  FROM answer a
//       //  JOIN comments c ON a.id_comments = c.id;

//       //   SELECT c.id, ?, NOW(), ?, ?
//       //   FROM comments c
//       //   WHERE c.id = ?;

//       // SET @id_comments = (SELECT id FROM comments WHERE question_text);

//       // INSERT INTO answer (id_comments, feedback_end, created_at, received, rating)
//       // VALUES (@id_comments, ?, NOW(), ?, ?);

const express = require("express");
const router = express.Router();
const mysql = require("../mysqlNewApi").pool;
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
const id_comments = await connection.query(
  "SELECT id FROM comments WHERE question_text = ?",
  [req.body.question_text]
);
router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query(
      `
      INSERT INTO answer (id_comments, feedback_end, created_at, received, rating) VALUES (?, ?, NOW(), ?, ?)
      
      `,

      [
        id_comments[0].id,
        req.body.feedback_end,
        req.body.received,
        req.body.rating,
      ],
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
