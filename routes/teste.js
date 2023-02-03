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

// const express = require("express");
// const router = express.Router();
// const mysql = require("../mysqlNewApi").pool;
// //Visualiza nomes
// router.get("/", (req, res, next) => {
//   mysql.getConnection((error, conn) => {
//     if (error) {
//       return res.status(500).send({ error: error });
//     }
//     conn.query("SELECT * FROM answer;", (error, resultado, field) => {
//       if (error) {
//         return res.status(500).send({ error: error });
//       }

//       return res.status(200).send({ message: resultado });
//     });
//   });
// });
// // Posta nomes
// const id_comments = await connection.query(
//   "SELECT id FROM comments WHERE question_text = ?",
//   [req.body.question_text]
// );
// router.post("/", (req, res, next) => {
//   mysql.getConnection((error, conn) => {
//     if (error) {
//       return res.status(500).send({ error: error });
//     }

//     conn.query(
//       `
//       INSERT INTO answer (id_comments, feedback_end, created_at, received, rating) VALUES (?, ?, NOW(), ?, ?)
      
//       `,

//       [
//         id_comments[0].id,
//         req.body.feedback_end,
//         req.body.received,
//         req.body.rating,
//       ],
//       (error, resultado, field) => {
//         conn.release();
//         if (error) {
//           return res.status(500).send({
//             error: error,
//             message: null,
//           });
//         }
//         res.status(201).send({
//           mensagem: "O participante foi inserido com sucesso.",
//           id: resultado.insertId,
//         });
//       }
//     );
//   });
// });

// module.exports = router;




// const id_comments = await conn.query(
//   `SELECT id FROM comments WHERE feedback_text = ?`,
//   [req.body.feedback_text]
// );

// conn.query(
//   `INSERT INTO answer (id_comments, feedback_end, created_at, received, rating) VALUES (?, ?, NOW(), ?, ?)`,
//   [id_comments[0].id, req.body.feedback_end, req.body.received, req.body.rating],
//   (error, results) => {
//     if (error) throw error;
//     console.log(results);
//   }
// );


// SELECT id FROM comments WHERE question_text = 'Excelente produto' AND feedback_text = 'obrigado' AND created_at = '2023-01-31T23:34:59.000Z';


// INSERT INTO answer (id_comments, feedback_end, created_at, received, rating) VALUES ((resultado da query acima), ?, NOW(), ?, ?);

// SELECT * FROM comments WHERE id_comments = ?

// SELECT * FROM comments WHERE feedback_text = ? AND created_at >= ?


// // app
// const express = require("express");
// const morgan = require("morgan");
// const app = express();
// const bodyParser = require("body-parser");
// const routComments = require("./routes/comments");
// const routAnswer = require("./routes/answer");
// var cors = require("cors");
// app.use(cors());
// app.use(morgan("dev"));
// app.use(bodyParser.urlencoded({ extended: false })); // apenas dados simples
// app.use(bodyParser.json()); // json de entrada no body

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Header",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );

//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).send({});
//   }
//   next();
// });

// app.use("/quiz", routComments);
// app.use("/assessment", routAnswer);

// //Quando não encontra a rota
// app.use((req, res, next) => {
//   const erro = new Error("Não encontrado!");
//   erro.status = 404;
//   next(erro);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   return res.send({
//     erro: {
//       menagem: error.message,
//     },
//   });
// });
// module.exports = app;

// // answer 

// const express = require("express");
// const router = express.Router();
// const mysql = require("../mysqlNewApi").pool;
// //Visualiza nomes
// router.get("/", (req, res, next) => {
//   mysql.getConnection((error, conn) => {
//     if (error) {
//       return res.status(500).send({ error: error });
//     }
//     conn.query("SELECT * FROM answer;", (error, resultado, field) => {
//       if (error) {
//         return res.status(500).send({ error: error });
//       }

//       return res.status(200).send({ message: resultado });
//     });
//   });
// });
// // Posta nomes
// router.post("/", (req, res, next) => {
//   mysql.getConnection((error, conn) => {
//     if (error) {
//       return res.status(500).send({ error: error });
//     }
//     conn.query(
//       `INSERT INTO answer (id_comments, feedback_end, created_at, received, rating) VALUES (aqui, ?, NOW(), ?, ?)`,
//       [req.body.feedback_end, req.body.received, req.body.rating],
//       (error, resultado, field) => {
//         conn.release();
//         if (error) {
//           return res.status(500).send({
//             error: error,
//             message: null,
//           });
//         }
//         res.status(201).send({
//           mensagem: "O participante foi inserido com sucesso.",
//           id: resultado.insertId,
//         });
//       }
//     );
//   });
// });

// module.exports = router;

// // commnets 

// const express = require("express");
// const router = express.Router();
// const mysql = require("../mysqlNewApi").pool;
// //Visualiza nomes
// router.get("/", (req, res, next) => {
//   mysql.getConnection((error, conn) => {
//     if (error) {
//       return res.status(500).send({ error: error });
//     }
//     conn.query("SELECT * FROM comments;", (error, resultado, field) => {
//       if (error) {
//         return res.status(500).send({ error: error });
//       }
     
//       return res.status(200).send({ message: resultado });
//     });
//   });
// });
// // Posta nomes
// router.post("/", (req, res, next) => {
//   mysql.getConnection((error, conn) => {
//     if (error) {
//       return res.status(500).send({ error: error });
//     }
//     conn.query(
//       "INSERT INTO comments (question_text, feedback_text, created_at) VALUES (?,?,NOW())",
//       [
//         req.body.question_text,
//         req.body.feedback_text,
//         req.body.created_at,
//       ],
//       (error, resultado, field) => {
//         conn.release();
//         if (error) {
//           return res.status(500).send({
//             error: error,
//             message: null,
//           });
//         }
//         res.status(201).send({
//           mensagem: "O participante foi inserido com sucesso.",
//           id: resultado.insertId,
//         });
//       }
//     );
//   });
// });


// module.exports = router;
