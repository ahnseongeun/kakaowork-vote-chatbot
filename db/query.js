exports.createUser = `
  CREATE TABLE IF NOT EXISTS user(
    id INTEGER PRIMARY KEY,
	making INTEGER NULL,
    duplicated_check INTEGER NULL,
	making_vote_title VARCHAR(45) NULL,
	making_choice_number INTEGER NULL
  )`

exports.createVote = `
  CREATE TABLE IF NOT EXISTS vote(
    conversation_id VARCHAR(45) PRIMARY KEY,
    host_id VARCHAR(45) NULL,
    duplicated_check INTEGER NULL,
    /*add_detail_check INTEGER NULL,*/
	vote_title VARCHAR(45) NULL,
	choice_number INTEGER NULL,
    /* create_date DATETIME NULL,
    end_date DATETIME NULL */
    status INTEGER NULL
  )`

exports.createVoteUser = `
  CREATE TABLE IF NOT EXISTS vote_user(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
	conversation_id VARCHAR(45) NULL,
	user_id INTEGER NULL,
    choice VARCHAR(45) NULL,
	choice_id INTEGER NULL
  )`

exports.createVoteDetail = `
  CREATE TABLE IF NOT EXISTS vote_detail(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
	conversation_id VARCHAR(45) NULL,
	choice VARCHAR(45) NULL
  )`


exports.dropUser = 'DROP TABLE IF EXISTS user'
exports.dropVote = 'DROP TABLE IF EXISTS vote'
exports.dropVoteUser = 'DROP TABLE IF EXISTS vote_user'
exports.dropVoteDetail = 'DROP TABLE IF EXISTS vote_detail'