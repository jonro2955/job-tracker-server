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

CREATE DATABASE jobtracker;

/* When inside the jobtracker database */
CREATE TABLE users (
  username TEXT UNIQUE NOT NULL, --user's email string or "demo" if logged out
  careers_list TEXT [] DEFAULT array['Career 1'], 
  current_career_num INT DEFAULT 0,
  PRIMARY KEY(username)
);

INSERT INTO users(username, careers_list, current_career_num) VALUES('demoUser', array['demo career 1', 'demo career 2', 'demo career 3'], 0);

CREATE TABLE apps (
  app_id SERIAL UNIQUE,
  username TEXT UNIQUE REFERENCES users(username),
  career_name TEXT,
  posting_url TEXT,
  company_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  job_description TEXT,
  job_notes TEXT,
  resume_file BYTEA, 
  cover_letter_file BYTEA,
  tags TEXT [],
  application_date TEXT,
  PRIMARY KEY(app_id)
);

/* 
Note that BYTEA column values will be extremly long and will not be visible when printing column values to the terminal via the normal "SELECT * from apps" command. 
If you want to visually check that there is some value in there, you can print out a partial value to psql terminal by running the following (for the left starting side):
jobtracker=> select left(encode(resume_file,'hex'),40) from apps; 
*/

CREATE TABLE companies (
  company_id SERIAL,
  company_name TEXT UNIQUE NOT NULL,
  jobs TEXT [],
  PRIMARY KEY(company_id)
);
