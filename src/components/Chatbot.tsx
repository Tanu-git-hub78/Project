import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Message {
  text: string;
  isBot: boolean;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm your assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = { text: input, isBot: false };
    setMessages(prev => [...prev, newMessage]);

    // Process the message and generate response
    const response = processMessage(input);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: response.text, isBot: true }]);
      if (response.action) {
        response.action();
      }
    }, 500);

    setInput('');
  };

  const processMessage = (message: string): { text: string; action?: () => void } => {
    const msg = message.toLowerCase();
    const studentDegree = (user && user.role === 'student') ? (user as any).degree || 'BSc CS' : 'BSc CS';

    if (user?.role === 'student') {
      if (msg.includes('upload') || msg.includes('how to upload')) {
        return {
          text: "I'll help you with project submission. Let me redirect you to the New Submission page.",
          action: () => navigate('/student/new-submission')
        };
      }
      if (msg.includes('topic') || msg.includes('idea') || msg.includes('project topics') || msg.includes(`topics for ${studentDegree.toLowerCase()}`)) {
        return {
          text: `Looking for project ideas for ${studentDegree}? Let me show you our AI-powered recommendations.`,
          action: () => navigate('/student/project-ideas')
        };
      }
      if (msg.includes('deadline')) {
        return {
          text: "Project submission deadline has been extended to May 20th, 2024. File size limit is 10MB. Check Guidelines for the latest updates."
        };
      }
      if (msg.includes('submission')) {
        return {
          text: "You can view all your submissions in the My Submissions section.",
          action: () => navigate('/student/my-submissions')
        };
      }
      if (msg.includes('guideline') || msg.includes('format') || msg.includes('notification')) {
        return {
          text: "Check the Guidelines section for the latest submission requirements, deadlines, and important notifications.",
          action: () => navigate('/student/guidelines')
        };
      }
    } else if (user?.role === 'admin') {
      if (msg.includes('analytics') || msg.includes('report')) {
        return {
          text: "Let me show you the analytics dashboard with project statistics.",
          action: () => navigate('/admin/analytics')
        };
      }
      if (msg.includes('student') || msg.includes('find') || msg.includes('degree')) {
        return {
          text: "I'll take you to the degrees and student management page.",
          action: () => navigate('/admin/degrees')
        };
      }
      if (msg.includes('project') || msg.includes('evaluate') || msg.includes('evaluation')) {
        return {
          text: "Let me take you to the project evaluation section where you can review submissions.",
          action: () => navigate('/admin/projects')
        };
      }
      if (msg.includes('how to evaluate') || msg.includes('how to add feedback')) {
        return {
          text: "To evaluate projects: Go to Projects & Evaluation → Click 'Evaluate' on any project → Add feedback and examiner comments → Choose Approve/Reject/Pending."
        };
      }
    }

    return {
      text: "I'm here to help! You can ask me about project submissions, deadlines, or navigation."
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full text-white shadow-lg hover:scale-110 transition-all duration-300 z-50 ${
          user?.role === 'student' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'
        }`}
      >
        {isOpen ? <X className="h-6 w-6 mx-auto" /> : <MessageCircle className="h-6 w-6 mx-auto" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col">
          <div className={`px-4 py-3 rounded-t-lg text-white ${
            user?.role === 'student' ? 'bg-blue-600' : 'bg-purple-600'
          }`}>
            <h3 className="font-semibold">AI Assistant</h3>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-xs px-3 py-2 rounded-lg ${
                  msg.isBot 
                    ? 'bg-gray-100 text-gray-800' 
                    : user?.role === 'student'
                      ? 'bg-blue-600 text-white'
                      : 'bg-purple-600 text-white'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={handleSend}
                className={`px-3 py-2 rounded-lg text-white hover:opacity-90 transition-colors ${
                  user?.role === 'student' ? 'bg-blue-600' : 'bg-purple-600'
                }`}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;