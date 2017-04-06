#insert a class into the database
SET @course_subject = 'CSCI';
SET @course_number = '2400';
SET @course_title = 'Computer Systems';
SET @credit_hours = 4;
SET @section_number = '100';
SET @term_year = 2017;
SET @term_section = 'SPRING';
INSERT INTO courses (subject_id, course_number, course_title, credit_hours, description)
	SELECT
    s.id,
    @course_number,
    @course_title,
    @credit_hours,
    NULL
    FROM subjects s WHERE s.subject_name = @course_subject;

#insert a section into the database
INSERT INTO sections (class_id, course_id, section_description, enrollment_restriction,
    consent_required, available_seats, wait_list_total, room, instructor,
    startdate, enddate, term_year, term_section)
    SELECT
    28021,
    c.id,
    '100-LECBoulder 16-Wk Session/Full Sem',
    True,
    False,
    0,
    0,
    'GOLD A2B70',
    'Richard Han',
    '2017-01-17',
    '2017-05-05',
    @term_year,
    @term_section
    FROM courses c WHERE c.course_number = @course_number;
    
    
#determine if a class already exists
SELECT COUNT(*) FROM sections s
JOIN courses c
ON c.id = s.course_id
JOIN subjects sub
ON sub.id = c.subject_id
WHERE @course_subject = sub.subject_name
AND @course_number = c.course_number
AND s.section_description LIKE CONCAT(@section_number, '%')
AND @term_year = s.term_year
AND @term_section = s.term_section;

#get all of the information about a class
SELECT * FROM sections s
JOIN courses c
ON c.id = s.course_id
JOIN subjects sub
ON sub.id = c.subject_id
WHERE @course_subject = sub.subject_name
AND @course_number = c.course_number
AND s.section_description LIKE CONCAT(@section_number, '%')
AND @term_year = s.term_year
AND @term_section = s.term_section;