import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Kit2ji999#',
  database: 'employee',
}).promise();

export async function getQuestions() {
  const [rows] = await pool.query('SELECT * FROM coding_questions');
  return rows;
}



  