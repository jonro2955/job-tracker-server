var express = require("express");
var router = express.Router();
var pool = require("./db");

router.get("/api/connect", (req, res) => {
  res.json("connected to server");
});

/* https://www.freecodecamp.org/news/fullstack-react-blog-app-with-express-and-psql/#setting-up-express-routes-and-psql-queries */
router.post("/api/post/postapp", (req, res, next) => {
  const values = [
    req.body.username,
    req.body.postingURL,
    req.body.companyName,
    req.body.jobTitle,
    req.body.jobDescription,
    req.body.jobNotes,
    req.body.files,
    req.body.tags,
    req.body.careerName,
    req.body.applicationDate,
  ];
  console.log("backend", values);
  pool.query(
    `INSERT INTO apps(username, posting_url, company_name, job_title, job_description, job_notes, files, tags, career_name, application_date )
              VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
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
