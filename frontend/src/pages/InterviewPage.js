import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InterviewPage() {
    const [question, setQuestion] = useState('');
    const [userAnswer, setUserAnswer] = useState('');
    const [evaluation, setEvaluation] = useState('');

    // 질문을 가져오는 함수
    const fetchQuestion = async () => {
        try {
            const response = await axios.get('/api/interview/question');
            setQuestion(response.data.question);
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    // 컴포넌트가 처음 렌더링될 때 질문을 가져옴
    useEffect(() => {
        fetchQuestion();
    }, []);

    // 질문 제출 및 평가를 처리하는 함수
    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/interview/answer', {
                question,
                userAnswer
            });
            setEvaluation(response.data.evaluation);
        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    };

    return (
        <div>
            <h2>Interview</h2>
            {/* 질문 텍스트와 버튼을 추가 */}
            <div>
                <p><strong>Question:</strong> {question}</p>
                <button onClick={fetchQuestion}>Generate New Question</button>
            </div>
            <div>
                <textarea
                    placeholder="Write your answer here..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    rows="5"
                    cols="50"
                ></textarea>
                <button onClick={handleSubmit}>Submit Answer</button>
            </div>
            {evaluation && <p><strong>Evaluation:</strong> {evaluation}</p>}
        </div>
    );
}

export default InterviewPage;
