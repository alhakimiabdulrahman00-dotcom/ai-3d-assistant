import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Float } from '@react-three/drei';
import './App.css';

const AI3DAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now(),
        text: inputText,
        sender: 'user'
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      
      // محاكاة رد المساعد
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          text: `أهلاً! أنا مساعدك الذكي. لقد قلت: "${inputText}" - كيف يمكنني مساعدتك؟`,
          sender: 'ai'
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  return (
    <div className="app">
      {/* قسم الرسومات ثلاثية الأبعاد */}
      <div className="canvas-container">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
            <Sphere args={[1, 16, 16]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#4F46E5" />
            </Sphere>
          </Float>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      {/* قسم المحادثة */}
      <div className="chat-container">
        <div className="chat-header">
          <h1>🤖 المساعد الذكي ثلاثي الأبعاد</h1>
          <p>مرحباً! أنا هنا لمساعدتك في أي شيء تحتاجه</p>
        </div>

        <div className="messages-container">
          {messages.map(message => (
            <div key={message.id} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>

        <div className="input-container">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="اكتب رسالتك هنا..."
          />
          <button onClick={sendMessage}>إرسال</button>
        </div>
      </div>
    </div>
  );
};

export default AI3DAssistant;
