import React, { useState } from 'react';
import { MessageList, Input, Button } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const TestChat2 = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = (message) => {
    if (message.trim() !== '') {
      const userMessage = {
        position: 'right',
        type: 'text',
        text: message,
        date: new Date(),
      };

      setMessages([...messages, userMessage]);

      // 자동응답 추가
      if (message === '안녕') {
        const autoReply = {
          position: 'left',
          type: 'text',
          text: '안녕하세요!',
          date: new Date(),
        };
        setMessages([...messages, autoReply]);
      } else if (message === '날씨') {
        const autoReply = {
          position: 'left',
          type: 'text',
          text: '오늘은 맑은 날씨입니다.',
          date: new Date(),
        };
        setMessages([...messages, autoReply]);
      }

      setInput('');
    }
  };

  return (
    <div className="auto-reply-chat-container">
      <MessageList
        className="message-list"
        lockable={true}
        toBottomHeight={'100%'}
        dataSource={messages}
      />
      <Input
        placeholder="메시지를 입력하세요..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage(input);
          }
        }}
        rightButtons={[
          <Button
            text="보내기"
            onClick={() => handleSendMessage(input)}
            key="send"
          />,
          <Button
            text="안녕"
            onClick={() => handleSendMessage('안녕')}
            key="hello"
          />,
          <Button
            text="날씨"
            onClick={() => handleSendMessage('날씨')}
            key="weather"
          />,
        ]}
      />
    </div>
  );
};

export default TestChat2;
