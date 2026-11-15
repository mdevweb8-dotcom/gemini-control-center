import { useState } from 'react';

export default function App() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState<string>('');

  const sendMessage = () => {
    const userMessage = { role: 'user', text: input };
    const aiMessage = { role: 'ai', text: 'جاري التحليل...' };
    setMessages([...messages, userMessage, aiMessage]);
    setInput('');
  };

  return (
    <div className='flex h-screen flex-col bg-[#1a1a2e]'>
      <header className='border-b border-white/10 p-4 text-center text-xl font-bold'>مركز التحكم في جيميني</header>
      <main className='flex-1 overflow-y-auto p-4'>
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-2xl p-3 ${message.role === 'user' ? 'bg-blue-600' : 'bg-white/10'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </main>
      <div className='border-t border-white/10 p-4'>
        <div className='flex gap-2'>
          <input
            type='text'
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                sendMessage();
              }
            }}
            placeholder='اكتب أمرك هنا'
            className='flex-1 rounded-full bg-white/10 p-3'
          />
          <button onClick={sendMessage} className='rounded-full bg-blue-600 px-4 py-3'>إرسال</button>
        </div>
      </div>
    </div>
  );
}