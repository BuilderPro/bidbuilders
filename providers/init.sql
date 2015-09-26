-- START OVER --
DROP TABLE IF EXISTS invites;
DROP TYPE IF EXISTS invite_status;
DROP TABLE IF EXISTS relationships;
DROP TABLE IF EXISTS relationship_types;
DROP TABLE IF EXISTS bids;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS user_type;


-- INIT TABLES --
CREATE TYPE user_type AS ENUM ('general_contractor', 'sub_contractor', 'engineer', 'architect', 'owner');

CREATE TABLE users (
	user_id						varchar(36) PRIMARY KEY,
	email						varchar(254) UNIQUE NOT NULL,
	hash						varchar(60) NOT NULL,
	firstname					varchar(35),
	lastname					varchar(35),
	user_type					user_type NOT NULL
);

CREATE TABLE projects (
	project_id					varchar(36) PRIMARY KEY,
	parent_id					varchar(36) REFERENCES projects DEFAULT NULL,
	owner						varchar(36) REFERENCES users NOT NULL,
	accepted_bid				varchar(36) DEFAULT NULL,
	name						varchar(60),
	description					varchar(256)
);

CREATE TABLE bids (
	bid_id						varchar(36) PRIMARY KEY,
	project_id					varchar(36) REFERENCES projects NOT NULL,
	owner						varchar(36) REFERENCES users NOT NULL,
	amount						money NOT NULL
);

CREATE TABLE relationship_types (
	type 						varchar(60) PRIMARY KEY
);

CREATE TABLE relationships (
	user_primary				varchar(36) REFERENCES users,
	user_secondary				varchar(36) REFERENCES users,
	type  						varchar(60) REFERENCES relationship_types
);

CREATE TYPE invite_status AS ENUM ('pending', 'rejected', 'expired', 'accepted');

CREATE TABLE invites (
	invite_token				varchar(36) PRIMARY KEY,
	email						varchar(256) NOT NULL,
	invited_ts					timestamp NOT NULL,
	invitee 					varchar(36) REFERENCES users NOT NULL,
	status						invite_status DEFAULT 'pending',
	project_id					varchar(36) REFERENCES projects DEFAULT NULL		
);

