var express = require("express");
var router = express.Router();

router.get("/api/connect", (req, res) => {
  res.json("connected to server");
});

/* https://www.freecodecamp.org/news/fullstack-react-blog-app-with-express-and-psql/#setting-up-express-routes-and-psql-queries */
router.post("/api/post/posttodb", (req, res, next) => {
  const values = [req.body.title, req.body.body, req.body.uid, req.body.username];
  pool.query(
    `INSERT INTO posts(title, body, user_id, author, date_created)
              VALUES($1, $2, $3, $4, NOW() )`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      res.json(q_res.rows);
    }
  );
});

router.put("/api/put/post", (req, res, next) => {
  const values = [req.body.title, req.body.body, req.body.uid, req.body.pid, req.body.username];
  pool.query(
    `UPDATE posts SET title= $1, body=$2, user_id=$3, author=$5, date_created=NOW()
              WHERE pid = $4`,
    values,
    (q_err, q_res) => {
      console.log(q_res);
      console.log(q_err);
    }
  );
});

module.exports = router;
