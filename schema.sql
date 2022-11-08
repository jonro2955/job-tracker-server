-- This file provides a reference for the database structure. It does not create a database. These commands need to be enetered into the PSQL terminal either manually or as a batch in order to create the database.
-- In keeping with SQL convention, all lowercase text is user defined column or table names, and all uppercase text is SQL commands.

/*     
const data = {
  jobPostingURL: jobPostingURL,
  jobDescription: jobDescription.toString("html"),
  companyName: companyName,
  jobTitle: jobTitle,
  jobNotes: jobNotes.toString("html"),
  files: files,
  currentCareerNum: currentCareerNum,
  careerName: careersList[currentCareerNum],
  username: context.isAuthenticated ? context.user.email : "demo",
  applicationDate: getDate(),
};
*/

CREATE TABLE user (
  username TEXT UNIQUE NOT NULL, --this is the user's email (or "demo")
  careers_list TEXT [], 
  current_career_num INT,
  date_created DATE,
  last_login DATE,
  PRIMARY KEY(username)
);

CREATE TABLE company (
  company_name TEXT NOT NULL,
  jobs TEXT [],
  PRIMARY KEY(company_name)
);

CREATE TABLE app (
  app_id SERIAL,
  company_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  applicant_name TEXT REFERENCES users(username),
  application_date INT NOT NULL,
  posting_url TEXT,
  career_name TEXT,
  job_description TEXT,
  job_notes TEXT,
  files TEXT, --Should not be TEXT. TBD
  PRIMARY KEY(app_id, company_name, job_title)
);