import React, { useState, useEffect } from 'react';
import './Forum.css';

const Forum = () => {
    const [questions, setQuestions] = useState([]);
    const [showAskForm, setShowAskForm] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch('/api/forum');
            if (!response.ok) throw new Error('Failed to fetch questions');
            const data = await response.json();
            setQuestions(data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const askQuestion = async (e) => {
        e.preventDefault();
        if (!newQuestion.trim()) return;

        setLoading(true);
        try {
            const response = await fetch('/api/forum/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: currentUser._id,
                    question: newQuestion
                })
            });

            if (!response.ok) throw new Error('Failed to ask question');
            const data = await response.json();

            setQuestions([data, ...questions]);
            setNewQuestion('');
            setShowAskForm(false);
        } catch (error) {
            console.error('Error asking question:', error);
            alert('Error asking question: ' + error.message);
        }
        setLoading(false);
    };

    const answerQuestion = async (questionId, answer) => {
        if (!answer.trim()) return;

        try {
            const response = await fetch(`/api/forum/answer/${questionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answer })
            });

            if (!response.ok) throw new Error('Failed to answer question');
            const data = await response.json();

            setQuestions(questions.map(q => q._id === questionId ? data : q));
        } catch (error) {
            console.error('Error answering question:', error);
            alert('Error answering question: ' + error.message);
        }
    };

    return (
        <div className="forum-container">
            <div className="forum-header">
                <h2>Community Forum</h2>
                <button className="ask-button" onClick={() => setShowAskForm(true)}>
                    Ask Question
                </button>
            </div>

            {showAskForm && (
                <div className="ask-form-overlay">
                    <div className="ask-form">
                        <h3>Ask a Question</h3>
                        <form onSubmit={askQuestion}>
              <textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Type your question here..."
                  rows="5"
                  disabled={loading}
              />
                            <div className="form-actions">
                                <button type="button" onClick={() => setShowAskForm(false)}>Cancel</button>
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Asking...' : 'Ask Question'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="questions-list">
                {questions.map(question => (
                    <div key={question._id} className="question-card">
                        <div className="question-header">
                            <img src={question.user.profilePicture || '/default-avatar.png'} alt="Profile" />
                            <div>
                                <h4>{question.user.name}</h4>
                                <span className="user-role">{question.user.role}</span>
                                <div className="question-time">
                                    {new Date(question.timestamp).toLocaleString()}
                                </div>
                            </div>
                        </div>

                        <div className="question-content">
                            <p>{question.question}</p>
                        </div>

                        {question.answer && (
                            <div className="answer-section">
                                <div className="answer-header">
                  <span className="answered-by">
                    Answered by: {question.answeredBy === 'ai' ? 'AI Tutor' : 'Human Tutor'}
                  </span>
                                </div>
                                <div className="answer-content">
                                    <p>{question.answer}</p>
                                </div>
                            </div>
                        )}

                        {currentUser.role === 'tutor' && !question.answer && (
                            <div className="tutor-answer-form">
                <textarea
                    placeholder="Type your answer as a tutor..."
                    rows="3"
                    onBlur={(e) => answerQuestion(question._id, e.target.value)}
                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forum;