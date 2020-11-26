const { Pool } = require('pg');

const avg = process.argv.slice(2);
console.log(avg);
const pool = new Pool({
  user: 'vagrant',
  password: '1234',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString =`SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name  = $1
ORDER BY teacher;`;
//const cohort = avg[0];
const value = [`${avg[0] || 'JUL02'}`];


pool.query(queryString,value).then(res=>{
  res.rows.forEach(user => {
    console.log(`${user.cohort} :${user.teacher} `);
  });
}).catch(err => console.error('query error',err.stack));