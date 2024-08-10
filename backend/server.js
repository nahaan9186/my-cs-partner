const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const Question = require('./models/Question'); // 모델 파일

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// OpenAI 클라이언트 설정
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// CS 질문 생성 API
app.get('/api/interview/question', async (req, res) => {
    try {
        const response = await openai.completions.create({
            model: 'text-davinci-003',
            prompt: 'Generate a technical CS interview question.',
            max_tokens: 50
        });

        const questionText = response.choices[0].text.trim();
        res.json({ question: questionText });
    } catch (error) {
        res.status(500).json({ error: 'Error generating question' });
    }
});

// 응답 평가 API
app.post('/api/interview/answer', async (req, res) => {
    const { question, userAnswer } = req.body;

    try {
        const response = await openai.completions.create({
            model: 'text-davinci-003',
            prompt: `Evaluate the following answer to the question: "${question}"\nAnswer: ${userAnswer}`,
            max_tokens: 100
        });

        const evaluation = response.choices[0].text.trim();
        res.json({ evaluation });
    } catch (error) {
        res.status(500).json({ error: 'Error evaluating answer' });
    }
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
