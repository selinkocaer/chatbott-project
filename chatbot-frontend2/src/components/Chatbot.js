import React, { useState, useEffect } from 'react';
import { Input, Button, List, Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const questions = [
 "What is your favorite breed of cat, and why?",
  "How do you think cats communicate with their owners?",
  "Have you ever owned a cat? If so, what was their name and personality like?",
  "Why do you think cats love to sleep in small, cozy places?",
  "What’s the funniest or strangest behavior you’ve ever seen a cat do?",
  "Do you prefer cats or kittens, and what’s the reason for your preference?",
  "Why do you think cats are known for being independent animals?",
  "How do you think cats manage to land on their feet when they fall?",
  "What’s your favorite fact or myth about cats?",
  "How would you describe the relationship between humans and cats in three words?"
];

const Chatbot = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const generatedId = Math.random().toString(36).substr(2, 9);
    setSessionId(generatedId);
  }, []);

  const handleNext = async () => {
    if (inputValue) {
      const answerData = {
        sessionId,
        question: questions[currentQuestionIndex],
        answer: inputValue,
      };

      await axios.post('http://localhost:3001/answers', answerData);

      setMessages(prevMessages => [
        ...prevMessages,
        { text: questions[currentQuestionIndex], isUser: false }, 
        { text: inputValue, isUser: true } 
      ]);

      setInputValue('');

      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Chatbot</Title>
      {currentQuestionIndex < questions.length ? (
        <div>
          <List
            bordered
            dataSource={messages}
            renderItem={(item, index) => (
              <List.Item key={index} style={{ marginBottom: '10px' }}>
                <div
                  style={{
                    padding: '10px',
                    borderRadius: '5px',
                    backgroundColor: item.isUser ? '#1890ff' : '#f0f0f0',
                    color: item.isUser ? 'white' : 'black',
                    maxWidth: '80%',
                    marginLeft: item.isUser ? 'auto' : '0',
                  }}
                >
                  <strong>{item.isUser ? 'You' : 'Bot'}:</strong> {item.text}
                </div>
              </List.Item>
            )}
          />
          <Title level={4} style={{ marginBottom: '10px' }}>
            {questions[currentQuestionIndex]} {/* Şu anki soru */}
          </Title>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Your answer..."
            style={{ marginBottom: '10px' }}
          />
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        </div>
      ) : (
        <Title level={4}>Thank you for your answers!</Title>
      )}
    </div>
  );
};

export default Chatbot;
