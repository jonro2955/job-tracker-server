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

CREATE TABLE users (
  username TEXT UNIQUE NOT NULL, --user's email string or "demo" if logged out
  careers_list TEXT [] DEFAULT array['Career 1'], 
  current_career_num INT DEFAULT 0,
  PRIMARY KEY(username)
);

INSERT INTO users(username, careers_list, current_career_num) VALUES('demoUser', array['demo career 1', 'demo career 2', 'demo career 3'], 0);

CREATE TABLE apps (
  app_id SERIAL,
  username TEXT REFERENCES users(username),
  posting_url TEXT,
  job_description TEXT,
  company_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  job_notes TEXT,
  files BYTEA, --https://www.postgresql.org/docs/7.4/jdbc-binary-data.html
  tags TEXT [],
  career_name TEXT,
  application_date BIGINT NOT NULL,
  PRIMARY KEY(app_id)
);

CREATE TABLE companies (
  company_id SERIAL,
  company_name TEXT UNIQUE NOT NULL,
  jobs TEXT [],
  PRIMARY KEY(company_id)
);
