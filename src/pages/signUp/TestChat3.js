import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

  const TestChat3 = () => {
    return (
      <div>
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
    );
  };
  


export default TestChat3;

