SELECT sum(duration) as total_duration from assignment_submissions JOIN students ON students.id=student_id where students.start_date = '2018-02-12';

SELECT sum(assignment_submissions.duration) as total_duration
FROM assignment_submissions
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = 'FEB12';