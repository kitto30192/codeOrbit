import express from 'express';


import cors from 'cors'; 

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



export {pool};
