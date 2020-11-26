const { Pool } = require('pg');

const avg = process.argv.slice(2);
console.log(avg);
const pool = new Pool({
  user: 'vagrant',
  password: '1234',
  host: 'localhost',
  database: 'bootcampx'
});
const queryString = `SELECT students.id as student_id,students.name as student_name,cohorts.name as cohort_name  FROM  students JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2`;
const cohortName = avg[0];
const limit = avg[1] || 5;
const values = [`%${cohortName}`,limit];

pool.query(queryString,values)
  .then(res=>{
    res.rows.forEach(user => {
      console.log(`${user.student_name} has an id of ${user.student_id} and was in the ${user.cohort_name} cohort`);
    });
  }).catch(err => console.error('query error',err.stack));