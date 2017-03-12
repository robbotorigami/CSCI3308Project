CREATE TABLE IF NOT EXISTS subjects (
	id SERIAL PRIMARY KEY,
    subject_name CHAR(4) NOT NULL
);

CREATE TABLE IF NOT EXISTS courses (
	id SERIAL PRIMARY KEY,
    subject_id INT,
    course_number CHAR(4) NOT NULL,
    course_title VARCHAR(100),
    credit_hours INT,
    description VARCHAR(2000)
);

-- these types are required because psql sucks; they will error
-- because there's no elegant IF NOT EXISTS solution afaik >.>
CREATE TYPE termEnum AS ENUM ('FALL', 'SPRING', 'SUMMER');

CREATE TABLE IF NOT EXISTS sections (
	class_id SERIAL PRIMARY KEY,
    course_id INT,
    section_description VARCHAR(100),
    enrollment_restriction BOOL,
    consent_required BOOL,
    available_seats INT,
    wait_list_total INT,
    room VARCHAR(20),
    instructor VARCHAR(40),
    startdate DATE,
    enddate DATE,
    term_year INT,
    term_section termEnum
);

CREATE TYPE dayEnum AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

CREATE TABLE IF NOT EXISTS classtimes (
	id SERIAL PRIMARY KEY,
    section_id INT,
    day dayEnum,
    start_time TIME,
    end_time TIME
);

-- Below section will create the table for subjects
INSERT INTO subjects (subject_name) VALUES ('ACCT');
INSERT INTO subjects (subject_name) VALUES ('AIRR');
INSERT INTO subjects (subject_name) VALUES ('ANTH');
INSERT INTO subjects (subject_name) VALUES ('APPM');
INSERT INTO subjects (subject_name) VALUES ('APRD');
INSERT INTO subjects (subject_name) VALUES ('ARAB');
INSERT INTO subjects (subject_name) VALUES ('ARCH');
INSERT INTO subjects (subject_name) VALUES ('AREN');
INSERT INTO subjects (subject_name) VALUES ('ARSC');
INSERT INTO subjects (subject_name) VALUES ('ARTF');
INSERT INTO subjects (subject_name) VALUES ('ARTH');
INSERT INTO subjects (subject_name) VALUES ('ARTS');
INSERT INTO subjects (subject_name) VALUES ('ASEN');
INSERT INTO subjects (subject_name) VALUES ('ASIA');
INSERT INTO subjects (subject_name) VALUES ('ASTR');
INSERT INTO subjects (subject_name) VALUES ('ATLS');
INSERT INTO subjects (subject_name) VALUES ('ATOC');
INSERT INTO subjects (subject_name) VALUES ('BADM');
INSERT INTO subjects (subject_name) VALUES ('BAKR');
INSERT INTO subjects (subject_name) VALUES ('BASE');
INSERT INTO subjects (subject_name) VALUES ('BCOR');
INSERT INTO subjects (subject_name) VALUES ('BMEN');
INSERT INTO subjects (subject_name) VALUES ('BPOL');
INSERT INTO subjects (subject_name) VALUES ('BSLW');
INSERT INTO subjects (subject_name) VALUES ('BUSM');
INSERT INTO subjects (subject_name) VALUES ('CACI');
INSERT INTO subjects (subject_name) VALUES ('CAMW');
INSERT INTO subjects (subject_name) VALUES ('CASP');
INSERT INTO subjects (subject_name) VALUES ('CEES');
INSERT INTO subjects (subject_name) VALUES ('CESR');
INSERT INTO subjects (subject_name) VALUES ('CHEM');
INSERT INTO subjects (subject_name) VALUES ('CHEN');
INSERT INTO subjects (subject_name) VALUES ('CHIN');
INSERT INTO subjects (subject_name) VALUES ('CLAS');
INSERT INTO subjects (subject_name) VALUES ('CMCI');
INSERT INTO subjects (subject_name) VALUES ('CMDP');
INSERT INTO subjects (subject_name) VALUES ('COEN');
INSERT INTO subjects (subject_name) VALUES ('COEN');
INSERT INTO subjects (subject_name) VALUES ('COML');
INSERT INTO subjects (subject_name) VALUES ('COMM');
INSERT INTO subjects (subject_name) VALUES ('COMR');
INSERT INTO subjects (subject_name) VALUES ('CSCI');
INSERT INTO subjects (subject_name) VALUES ('CSVC');
INSERT INTO subjects (subject_name) VALUES ('CVEN');
INSERT INTO subjects (subject_name) VALUES ('CWCV');
INSERT INTO subjects (subject_name) VALUES ('DANE');
INSERT INTO subjects (subject_name) VALUES ('DNCE');
INSERT INTO subjects (subject_name) VALUES ('EALC');
INSERT INTO subjects (subject_name) VALUES ('EBIO');
INSERT INTO subjects (subject_name) VALUES ('ECEN');
INSERT INTO subjects (subject_name) VALUES ('ECON');
INSERT INTO subjects (subject_name) VALUES ('EDEN');
INSERT INTO subjects (subject_name) VALUES ('EDUC');
INSERT INTO subjects (subject_name) VALUES ('EHON');
INSERT INTO subjects (subject_name) VALUES ('EMEN');
INSERT INTO subjects (subject_name) VALUES ('EMUS');
INSERT INTO subjects (subject_name) VALUES ('ENEN');
INSERT INTO subjects (subject_name) VALUES ('ENGL');
INSERT INTO subjects (subject_name) VALUES ('ENST');
INSERT INTO subjects (subject_name) VALUES ('ENVD');
INSERT INTO subjects (subject_name) VALUES ('ENVM');
INSERT INTO subjects (subject_name) VALUES ('ENVS');
INSERT INTO subjects (subject_name) VALUES ('ESBM');
INSERT INTO subjects (subject_name) VALUES ('ESLG');
INSERT INTO subjects (subject_name) VALUES ('ETHN');
INSERT INTO subjects (subject_name) VALUES ('EVEN');
INSERT INTO subjects (subject_name) VALUES ('FARR');
INSERT INTO subjects (subject_name) VALUES ('FILM');
INSERT INTO subjects (subject_name) VALUES ('FINN');
INSERT INTO subjects (subject_name) VALUES ('FNCE');
INSERT INTO subjects (subject_name) VALUES ('FREN');
INSERT INTO subjects (subject_name) VALUES ('FRSI');
INSERT INTO subjects (subject_name) VALUES ('FYSM');
INSERT INTO subjects (subject_name) VALUES ('GEEN');
INSERT INTO subjects (subject_name) VALUES ('GEOG');
INSERT INTO subjects (subject_name) VALUES ('GEOL');
INSERT INTO subjects (subject_name) VALUES ('GREK');
INSERT INTO subjects (subject_name) VALUES ('GRMN');
INSERT INTO subjects (subject_name) VALUES ('GRTE');
INSERT INTO subjects (subject_name) VALUES ('GSAP');
INSERT INTO subjects (subject_name) VALUES ('GSLL');
INSERT INTO subjects (subject_name) VALUES ('HEBR');
INSERT INTO subjects (subject_name) VALUES ('HIND');
INSERT INTO subjects (subject_name) VALUES ('HIST');
INSERT INTO subjects (subject_name) VALUES ('HONR');
INSERT INTO subjects (subject_name) VALUES ('HUEN');
INSERT INTO subjects (subject_name) VALUES ('HUMN');
INSERT INTO subjects (subject_name) VALUES ('IAFS');
INSERT INTO subjects (subject_name) VALUES ('IAWP');
INSERT INTO subjects (subject_name) VALUES ('INBU');
INSERT INTO subjects (subject_name) VALUES ('INDO');
INSERT INTO subjects (subject_name) VALUES ('INFO');
INSERT INTO subjects (subject_name) VALUES ('INVS');
INSERT INTO subjects (subject_name) VALUES ('IPHY');
INSERT INTO subjects (subject_name) VALUES ('ITAL');
INSERT INTO subjects (subject_name) VALUES ('JOUR');
INSERT INTO subjects (subject_name) VALUES ('JPNS');
INSERT INTO subjects (subject_name) VALUES ('JRNL');
INSERT INTO subjects (subject_name) VALUES ('JWST');
INSERT INTO subjects (subject_name) VALUES ('KREN');
INSERT INTO subjects (subject_name) VALUES ('LATN');
INSERT INTO subjects (subject_name) VALUES ('LAWS');
INSERT INTO subjects (subject_name) VALUES ('LDSP');
INSERT INTO subjects (subject_name) VALUES ('LEAD');
INSERT INTO subjects (subject_name) VALUES ('LGBT');
INSERT INTO subjects (subject_name) VALUES ('LGTC');
INSERT INTO subjects (subject_name) VALUES ('LIBB');
INSERT INTO subjects (subject_name) VALUES ('LIBR');
INSERT INTO subjects (subject_name) VALUES ('LING');
INSERT INTO subjects (subject_name) VALUES ('MATH');
INSERT INTO subjects (subject_name) VALUES ('MBAC');
INSERT INTO subjects (subject_name) VALUES ('MBAX');
INSERT INTO subjects (subject_name) VALUES ('MCDB');
INSERT INTO subjects (subject_name) VALUES ('MCEN');
INSERT INTO subjects (subject_name) VALUES ('MDRP');
INSERT INTO subjects (subject_name) VALUES ('MDST');
INSERT INTO subjects (subject_name) VALUES ('MEMS');
INSERT INTO subjects (subject_name) VALUES ('MGMT');
INSERT INTO subjects (subject_name) VALUES ('MILR');
INSERT INTO subjects (subject_name) VALUES ('MKTG');
INSERT INTO subjects (subject_name) VALUES ('MSBC');
INSERT INTO subjects (subject_name) VALUES ('MSBX');
INSERT INTO subjects (subject_name) VALUES ('MSEN');
INSERT INTO subjects (subject_name) VALUES ('MSEN');
INSERT INTO subjects (subject_name) VALUES ('MUEL');
INSERT INTO subjects (subject_name) VALUES ('MUSC');
INSERT INTO subjects (subject_name) VALUES ('MUSM');
INSERT INTO subjects (subject_name) VALUES ('NAVR');
INSERT INTO subjects (subject_name) VALUES ('NCBE');
INSERT INTO subjects (subject_name) VALUES ('NCED');
INSERT INTO subjects (subject_name) VALUES ('NCEN');
INSERT INTO subjects (subject_name) VALUES ('NCFA');
INSERT INTO subjects (subject_name) VALUES ('NCGK');
INSERT INTO subjects (subject_name) VALUES ('NCHS');
INSERT INTO subjects (subject_name) VALUES ('NCIE');
INSERT INTO subjects (subject_name) VALUES ('NCMU');
INSERT INTO subjects (subject_name) VALUES ('NCPS');
INSERT INTO subjects (subject_name) VALUES ('NCSO');
INSERT INTO subjects (subject_name) VALUES ('NCSP');
INSERT INTO subjects (subject_name) VALUES ('NCSS');
INSERT INTO subjects (subject_name) VALUES ('NCTM');
INSERT INTO subjects (subject_name) VALUES ('NORW');
INSERT INTO subjects (subject_name) VALUES ('NRLN');
INSERT INTO subjects (subject_name) VALUES ('NRSC');
INSERT INTO subjects (subject_name) VALUES ('OPIM');
INSERT INTO subjects (subject_name) VALUES ('OPMG');
INSERT INTO subjects (subject_name) VALUES ('ORMG');
INSERT INTO subjects (subject_name) VALUES ('PACS');
INSERT INTO subjects (subject_name) VALUES ('PHIL');
INSERT INTO subjects (subject_name) VALUES ('PHYS');
INSERT INTO subjects (subject_name) VALUES ('PMUS');
INSERT INTO subjects (subject_name) VALUES ('PORT');
INSERT INTO subjects (subject_name) VALUES ('PRLC');
INSERT INTO subjects (subject_name) VALUES ('PSCI');
INSERT INTO subjects (subject_name) VALUES ('PSYC');
INSERT INTO subjects (subject_name) VALUES ('REAL');
INSERT INTO subjects (subject_name) VALUES ('RLST');
INSERT INTO subjects (subject_name) VALUES ('RUSS');
INSERT INTO subjects (subject_name) VALUES ('SCAN');
INSERT INTO subjects (subject_name) VALUES ('SEWL');
INSERT INTO subjects (subject_name) VALUES ('SLHS');
INSERT INTO subjects (subject_name) VALUES ('SNSK');
INSERT INTO subjects (subject_name) VALUES ('SOCY');
INSERT INTO subjects (subject_name) VALUES ('SPAN');
INSERT INTO subjects (subject_name) VALUES ('SSIR');
INSERT INTO subjects (subject_name) VALUES ('SUST');
INSERT INTO subjects (subject_name) VALUES ('SWED');
INSERT INTO subjects (subject_name) VALUES ('TBTN');
INSERT INTO subjects (subject_name) VALUES ('TDXD');
INSERT INTO subjects (subject_name) VALUES ('THTR');
INSERT INTO subjects (subject_name) VALUES ('TLEN');
INSERT INTO subjects (subject_name) VALUES ('TMUS');
INSERT INTO subjects (subject_name) VALUES ('WGST');
INSERT INTO subjects (subject_name) VALUES ('WMST');
INSERT INTO subjects (subject_name) VALUES ('WRTG');
INSERT INTO subjects (subject_name) VALUES ('YIDD');
