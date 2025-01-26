import React, { useState } from 'react';
import { ArrowLeft, ArrowBigUp, MessageSquare, Send } from "lucide-react";
import DesktopTitlebar from '../../../components/header';


interface Author {
  name: string;
  avatar: string;
  role: string;
  points: number;
}

interface QuestionStats {
  views: number;
  answers: number;
  votes: number;
}

interface Answer {
  id: string;
  content: string;
  author: Author;
  createdAt: string;
  votes: number;
}

interface Question {
  id: string;
  title: string;
  content: string;
  subject: string;
  author: Author;
  tags: string[];
  stats: QuestionStats;
  createdAt: string;
  solved: boolean;
}

interface QuestionPageProps {
  params: {
    id?: string;
  };
}

const QuestionPage: React.FC<QuestionPageProps> = ({ params = {} }) => {
  // State to control answers visibility
  const [showAnswers, setShowAnswers] = useState(false);

 
  const question: Question = {
    id: params.id || 'default-id',
    title: "How do you solve quadratic equations using the quadratic formula?",
    content:
      "I'm having trouble understanding how to use the quadratic formula. Can someone explain the steps and maybe provide an example?",
    subject: "Mathematics",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg",
      role: "student",
      points: 150,
    },
    tags: ["algebra", "equations", "mathematics"],
    stats: {
      views: 1234,
      answers: 5,
      votes: 23,
    },
    createdAt: "2 hours ago",
    solved: true,
  };

  // Sample answers data
  const [answers, setAnswers] = useState<Answer[]>([
    {
      id: '1',
      content: "The quadratic formula is x = [-b ± √(b² - 4ac)] / 2a. Here's how to use it:\n1. Identify a, b, and c in the standard form ax² + bx + c = 0\n2. Plug these values into the formula\n3. Calculate both possible solutions",
      author: {
        name: "Math Tutor",
        avatar: "/math-tutor.svg",
        role: "teacher",
        points: 450
      },
      createdAt: "1 hour ago",
      votes: 15
    },
    {
      id: '2',
      content: "Example: For the equation x² + 5x + 6 = 0\na = 1, b = 5, c = 6\nPlugging into the formula: x = [-5 ± √(5² - 4(1)(6))] / 2(1)\nThis gives x = -2 and x = -3",
      author: {
        name: "Sarah Smith",
        avatar: "/sarah.svg",
        role: "student",
        points: 200
      },
      createdAt: "30 minutes ago",
      votes: 10
    }
  ]);

  // State for new answer input
  const [newAnswer, setNewAnswer] = useState<string>('');

  // Handle going back
  const handleGoBack = () => {
    window.history.back();
  };

  // Toggle answers visibility
  const handleToggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  // Handle adding a new answer
  const handleAddAnswer = () => {
    if (newAnswer.trim()) {
      const answer: Answer = {
        id: `${answers.length + 1}`,
        content: newAnswer,
        author: {
          name: "You",
          avatar: "/placeholder.svg",
          role: "student",
          points: 0
        },
        createdAt: "Just now",
        votes: 0
      };

      setAnswers([...answers, answer]);
      setNewAnswer(''); // Clear input after submission
      setShowAnswers(true); // Automatically show answers after adding
    }
  };

  // Handle upvoting an answer
  const handleUpvoteAnswer = (answerId: string) => {
    setAnswers(answers.map(answer => 
      answer.id === answerId 
        ? { ...answer, votes: answer.votes + 1 } 
        : answer
    ));
  };

  return (
    <div>
      <DesktopTitlebar pageTitle={'Our Community'}/>
      <div className='mt-2'>
      <button 
        onClick={handleGoBack} 
        className="mb-6 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </button>
      </div>
    <div className="w-full px-4 py-8">
      
      
      {/* Question Section */}
      <article className="space-y-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img 
              src={question.author.avatar} 
              alt={question.author.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(question.author.name)}`;
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{question.author.name}</span>
              <span className="px-2 py-0.5 text-xs bg-gray-100 rounded-full">
                {question.author.role}
              </span>
            </div>
            <p className="text-sm text-gray-500">{question.createdAt}</p>
          </div>
        </div>
        <h1 className="text-3xl font-bold">{question.title}</h1>
        <span className="inline-block px-3 py-1 text-sm bg-gray-100 rounded-full">
          {question.subject}
        </span>
        <div className="flex flex-wrap gap-2">
          {question.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="leading-relaxed">{question.content}</p>
        <div className="flex items-center gap-4 text-sm">
          <button 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowBigUp className="h-4 w-4" />
            {question.stats.votes}
          </button>
          <button 
            onClick={handleToggleAnswers}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <MessageSquare className="h-4 w-4" />
            {question.stats.answers} Answers
          </button>
        </div>
      </article>

       {/* Add Answer Section */}
       {showAnswers && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Add an Answer</h2>
          <div className="space-y-4">
            <textarea
              placeholder="Write your answer here..."
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className="w-full min-h-[70px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleAddAnswer} 
              disabled={!newAnswer.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
              Post Answer
            </button>
          </div>
        </section>
      )}

      {/* Answers Section - Conditionally Rendered */}
      {showAnswers && (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Answers ({answers.length})</h2>
          {answers.map((answer) => (
            <div key={answer.id} className="border-b pb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img 
                    src={answer.author.avatar} 
                    alt={answer.author.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(answer.author.name)}`;
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{answer.author.name}</span>
                    <span className="px-2 py-0.5 text-xs bg-gray-100 rounded-full">
                      {answer.author.role}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{answer.createdAt}</p>
                </div>
              </div>
              <p className="mb-4 leading-relaxed whitespace-pre-wrap">{answer.content}</p>
              <button 
                onClick={() => handleUpvoteAnswer(answer.id)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <ArrowBigUp className="h-4 w-4" />
                {answer.votes}
              </button>
            </div>
          ))}
        </section>
      )}

     
    </div>
    </div>
  );
};

export default QuestionPage;