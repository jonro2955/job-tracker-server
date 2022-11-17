/* 
This file does not create the database. These commands must be entered into PSQL terminal  manually or in a batch in order to initially set up the database.
  
Job application data storage format: 

const data = {
  jobPostingURL: jobPostingURL,
  jobDescription: jobDescription.toString("html"),
  companyName: companyName,
  jobTitle: jobTitle,
  jobNotes: jobNotes.toString("html"),
  droppedFiles: droppedFiles,
  tags: tags.split(","),
  // careersList: careersList, //not needed for saving job app
  // currentCareerNum: currentCareerNum, //not needed for saving job app
  careerName: careersList[currentCareerNum],
  username: context.isAuthenticated ? context.user.email : "demo",
  applicationDate: getDateNumber(),
}
*/
CREATE TABLE applications (
  app_id SERIAL,
  username TEXT REFERENCES users(username),
  posting_url TEXT,
  job_description TEXT,
  company_name TEXT NOT NULL REFERENCES companies(company_name),
  job_title TEXT NOT NULL,
  job_notes TEXT,
  files BYTEA, --https://www.postgresql.org/docs/7.4/jdbc-binary-data.html
  tags TEXT [],
  career_name TEXT,
  application_date INT NOT NULL,
  PRIMARY KEY(app_id)
);

CREATE TABLE users (
  username TEXT UNIQUE NOT NULL, --user's email string or "demo" if logged out
  careers_list TEXT [], 
  current_career_num INT,
  date_created DATE,
  last_login DATE,
  PRIMARY KEY(username)
);

CREATE TABLE companies (
  company_id SERIAL,
  company_name TEXT UNIQUE NOT NULL,
  jobs TEXT [],
  PRIMARY KEY(company_id)
);

