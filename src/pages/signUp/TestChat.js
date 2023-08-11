import React, { useState } from 'react';
import { MessageBox, MessageList, Input } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

function TestChat(){
  // 메시지 목록과 입력값을 상태로 관리합니다.
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // 사용자가 메시지를 보낼 때 호출되는 함수입니다.
  const handleSendMessage = () => {
    if (input.trim() !== '') {
      // 새로운 메시지 객체를 생성하여 메시지 목록에 추가합니다.
      const newMessage = {
        position: 'right', // 사용자 메시지는 오른쪽에 표시됩니다.
        type: 'text', // 텍스트 타입의 메시지입니다.
        text: input, // 입력된 텍스트를 메시지 내용으로 설정합니다.
        date: new Date(), // 현재 시간을 메시지의 날짜로 설정합니다.
      };

      // 기존 메시지 목록과 새로운 메시지를 합쳐서 업데이트합니다.
      setMessages([...messages, newMessage]);

      // 입력 필드를 초기화합니다.
      setInput('');
    }
  };

  return (
    <div className="chatbot-container">
      {/* 메시지 목록을 표시합니다. */}
      <MessageList className="message-list" lockable={true} toBottomHeight={'100%'} dataSource={messages} />

      {/* 메시지 입력 필드를 표시하고 사용자 입력을 처리합니다. */}
      <Input
        placeholder="메시지를 입력하세요..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
        rightButtons={
          // '보내기' 버튼을 클릭하면 메시지를 보내는 함수를 호출합니다.
          <button onClick={handleSendMessage} className="send-button">
            보내기
          </button>
        }
      />
    </div>
  );
};

export default TestChat;
