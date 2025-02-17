import express from 'express';
import cors from 'cors';
import { pool } from '/Users/pk888/OneDrive/Desktop/REACT/CodeLikePro/src/problemComponent/getProb.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's origin
    methods: 'GET,POST,PUT,DELETE',
    credentials: true // Include cookies in requests if needed
}));
app.use(express.json());
app.use(cookieParser());

// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = rows[0];

        // Secret key for JWT (use a strong secret in production, ideally from environment variables)
        const JWT_SECRET = 'Kit2ji999#'; 
        
        if (password === user.password_hash) {
            // Generate a token
            const token = jwt.sign(
                { 
                    id: user.id,         // Add user details you want to include in the token
                    role: user.role ,
                    name : user.full_name,
                    username : user.username,
                    problemsolved : user.problems_solved ,
                    score : user.total_score,
                    badges : user.badges_earned  // For example: user role
                },
                JWT_SECRET            // Secret key
            );

            res.cookie('UID', token, {
                path: '/',
                maxAge:24 * 60 * 60 * 1000, 
            });

            return res.status(200).json({
                token,
                role: user.role,
                message: 'Login successful',
            });
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

    } catch (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Questions route
app.get('/questions', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM coding_questions');
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/question/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM coding_questions WHERE id = ?', [id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/register',async (req,res)=>{
    try {
        const { name, email,username, password,number,country } = req.body;
        const [rows] = await pool.query('INSERT INTO users (full_name,username,email,password_hash,phone_number,country) VALUES (?, ?, ?, ?, ?, ?)'
            , [name, username,email,password,number,country]);

        return res.status(200).json({ message: 'user successfully registered '});
    }
    catch(error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


// jab port.listen get prob main tha error de rha tha lekin jab 
//is componnet main to thik ho gya because pehle vo isme app ko use jis per listen hi nahi ho rha tha