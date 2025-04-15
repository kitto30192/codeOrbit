import { pool } from '/Users/pk888/OneDrive/Desktop/REACT/CodeLikePro/src/problemComponent/getProb.js';

export const getAllQuestions = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM coding_questions');
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getQuestionById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM coding_questions WHERE id = ?', [id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};