var express = require("express");
var router = express.Router();
var pool = require("./db");
/* https://www.freecodecamp.org/news/fullstack-react-blog-app-with-express-and-psql/#setting-up-express-routes-and-psql-queries */

/**
 * Gets
 */
router.get("/api/get/userprofilefromdb", (req, res) => {
  const username = req.query.email;
  pool.query(`SELECT * FROM users WHERE username = $1`, [username], (q_err, q_res) => {
    res.json(q_res.rows);
  });
});

/**
 * Posts
 */
router.post("/api/post/userprofiletodb", (req, res) => {
  const values = [req.body.email];
  pool.query(
    `INSERT INTO users(username) VALUES($1) ON CONFLICT DO NOTHING`,
    values,
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

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

/**
 * Puts
 */
router.put("/api/put/careernum", (req, res, next) => {
  const values = [req.body.currentCareerNum, req.body.username];
  pool.query(
    `UPDATE users SET current_career_num = $1 WHERE username = $2`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      res.json(q_res.rows);
    }
  );
});

router.put("/api/put/careerslist", (req, res, next) => {
  const values = [req.body.careersList, req.body.username];
  pool.query(`UPDATE users SET careers_list = $1 WHERE username = $2`, values, (q_err, q_res) => {
    if (q_err) return next(q_err);
    res.json(q_res);
  });
});

/* 
req.body = {
  username: 'freemovement@live.ca',
  careersList: [
    '111', '22', '3',
    '4',   '5',  '6',
    '7',   '8',  '9',
    '10',  '11', '12'
  ],
  oldCareerName: 'o',
  newCareerName: 'n'
}
*/
router.put("/api/put/renamecareer", (req, res, next) => {
  let err_combined = { err1: {}, err2: {} };
  let res_combined = { update_result_1: {}, update_result_2: {} };
  pool.query(
    `UPDATE apps SET career_name = $1 WHERE career_name = $2 AND username = $3`,
    [req.body.newCareerName, req.body.oldCareerName, req.body.username],
    (q_err, q_res) => {
      if (q_err) {
        err_combined.err1 = q_err;
      } else {
        res_combined.update_result_1 = q_res;
      }
    }
  );
  pool.query(
    `UPDATE users SET careers_list = $1 WHERE username = $2`,
    [req.body.careersList, req.body.username],
    (q_err, q_res) => {
      if (q_err) {
        err_combined.err2 = q_err;
        return next(err_combined);
      }
      res_combined.update_result_2 = q_res;
      res.json(res_combined);
    }
  );
});

module.exports = router;
