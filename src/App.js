import React, { useState, useEffect } from "react";
import { Sparkles, RotateCcw, Lightbulb } from "lucide-react";

const WORD_HINTS = {
  "WHISTLEBLOWER": "Someone who exposes wrongdoing",
  "ETHICS": "Moral principles that govern behavior",
  "INTEGRITY": "Being honest and having strong moral principles",
  "EXCELLENCE": "The quality of being outstanding",
  "PIONEERING": "Being the first to develop new methods",
  "UNITY": "The state of being united or joined",
  "RESPONSIBILITY": "The state of being accountable",
  "TRANSPARENCY": "Openness and honesty in communication",
  "RESPECT": "Admiration for someone's qualities",
  "TRUST": "Firm belief in reliability of someone",
  "ACCOUNTABILITY": "Being responsible for your actions",
  "FAIRNESS": "Treating people equally and justly",
  "HONESTY": "The quality of being truthful",
  "DIVERSITY": "A range of different things",
  "EQUALITY": "The state of being equal",
  "MERITOCRACY": "System where advancement is based on ability",
  "INNOVATION": "The process of creating new ideas",
  "CITIZENSHIP": "The status of being a citizen",
  "SUSTAINABILITY": "Meeting needs without compromising the future",
  "COMPLIANCE": "Conforming to rules and regulations",
  "CONFIDENTIALITY": "Keeping information private",
  "LEADERSHIP": "The action of leading a group",
  "COMMITMENT": "The state of being dedicated",
  "COURAGE": "The ability to do something frightening",
  "EMPATHY": "Understanding others' feelings",
  "COLLABORATION": "Working together to achieve a goal",
  "PROFESSIONALISM": "Competence and skill in a profession",
  "TOLERANCE": "Willingness to accept different opinions",
  "UNDERSTANDING": "Comprehension of someone or something",
  "PRIVACY": "Freedom from being observed",
  "SAFETY": "The condition of being protected",
  "LEARNING": "The acquisition of knowledge",
  "DEVELOPMENT": "The process of growing or improving",
  "EMPOWERMENT": "Giving someone authority or power",
  "COMMUNICATION": "The means of sending information",
  "DISCLOSURE": "The action of revealing information",
  "PROTECTION": "The action of protecting someone",
  "GOVERNANCE": "The action of governing a state",
  "OBJECTIVITY": "Judgment based on facts, not influenced by feelings",
  "AUTHENTICITY": "The quality of being genuine",
  "INCLUSIVITY": "The practice of including all people",
  "RESPONSIVENESS": "Reacting quickly and positively",
  "CREDIBILITY": "The quality of being trusted",
  "DISCIPLINE": "The practice of training for obedience",
  "DEDICATION": "The quality of being committed",
  "MOTIVATION": "The reason for acting in a particular way",
  "CLARITY": "The quality of being clear",
  "SUPPORT": "Give assistance to someone",
  "ENGAGEMENT": "The action of engaging or being engaged",
  "CONTRIBUTION": "A gift or payment to help a cause",
  "IMPROVEMENT": "The action of making something better",
  "HONOUR": "High respect and great esteem",
  "VALUES": "Principles or standards of behavior",
  "PRINCIPLES": "Fundamental truths as the basis for reasoning",
  "FOCUS": "The center of interest or activity",
  "VISION": "The ability to think about the future",
  "STRATEGY": "A plan of action to achieve a goal",
  "PERFORMANCE": "The action of carrying out a task",
  "RESULTS": "A consequence or outcome of something",
  "QUALITY": "The standard of something measured",
  "SERVICE": "The action of helping someone",
  "RELIABILITY": "The quality of being trustworthy",
  "EFFICIENCY": "Achieving maximum productivity",
  "AGILITY": "Ability to move quickly and easily",
  "ADAPTABILITY": "The quality of being able to adjust",
  "BALANCE": "An even distribution of weight",
  "ETHICAL": "Relating to moral principles",
  "SOCIAL": "Relating to society or its organization",
  "ENVIRONMENT": "The surroundings in which we live",
  "VOLUNTEER": "A person who freely offers to help",
  "PARTNERSHIP": "An association of two or more people",
  "INCLUSION": "The action of including someone",
  "DIGNITY": "The state of being worthy of honor",
  "ACCOUNTABLE": "Required to explain actions or decisions",
  "TRANSPARENT": "Easy to perceive or detect",
  "SAFEGUARD": "A measure taken to protect someone",
  "PREVENTION": "The action of stopping something",
  "RESILIENCE": "The ability to recover quickly",
  "INSPIRATION": "The process of being mentally stimulated",
  "OPTIMISM": "Hopefulness about the future",
  "SYNERGY": "The interaction of elements for greater effect",
  "RESOLUTION": "A firm decision to do something",
  "CONFLICT": "A serious disagreement or argument",
  "FEEDBACK": "Information about reactions to a product",
  "RECOGNITION": "Acknowledgment of the existence of something",
  "ACHIEVEMENT": "A thing done successfully",
  "EXPERTISE": "Expert skill or knowledge",
  "KNOWLEDGE": "Facts and information acquired",
  "INFORMATION": "Facts provided about something",
  "DATA": "Facts and statistics collected for analysis",
  "PRINCIPLE": "A fundamental truth or proposition",
  "STANDARD": "A level of quality or attainment",
  "BENEFIT": "An advantage or profit gained",
  "OPPORTUNITY": "A set of circumstances for doing something",
  "GROWTH": "The process of increasing in size",
  "POTENTIAL": "Having the capacity to develop",
  "MERIT": "The quality of being deserving",
  "ETHOS": "The characteristic spirit of a culture",
  "CONSCIENCE": "An inner feeling of right and wrong",
  "REPUTATION": "The beliefs held about someone",
  "IDENTITY": "The fact of being who you are",
  "CULTURE": "The arts and customs of a society"
};

const WORDS = Object.keys(WORD_HINTS);

const MAX_WRONG_GUESSES = 6;

const HangmanDrawing = ({ wrongCount }) => {
  const parts = [
    // Head
    <circle
      key="head"
      cx="100"
      cy="60"
      r="20"
      className="stroke-red-500 fill-none stroke-[3px] animate-fadeIn"
    />,
    // Body
    <line
      key="body"
      x1="100"
      y1="80"
      x2="100"
      y2="130"
      className="stroke-red-500 stroke-[3px] animate-fadeIn"
    />,
    // Left arm
    <line
      key="leftarm"
      x1="100"
      y1="95"
      x2="75"
      y2="115"
      className="stroke-red-500 stroke-[3px] animate-fadeIn"
    />,
    // Right arm
    <line
      key="rightarm"
      x1="100"
      y1="95"
      x2="125"
      y2="115"
      className="stroke-red-500 stroke-[3px] animate-fadeIn"
    />,
    // Left leg
    <line
      key="leftleg"
      x1="100"
      y1="130"
      x2="80"
      y2="160"
      className="stroke-red-500 stroke-[3px] animate-fadeIn"
    />,
    // Right leg
    <line
      key="rightleg"
      x1="100"
      y1="130"
      x2="120"
      y2="160"
      className="stroke-red-500 stroke-[3px] animate-fadeIn"
    />,
  ];

  return (
    <div className="flex justify-center items-center mb-8">
      <svg width="200" height="200" className="drop-shadow-lg">
        {/* Gallows */}
        <line
          x1="20"
          y1="180"
          x2="120"
          y2="180"
          className="stroke-gray-700 stroke-[4px]"
        />
        <line
          x1="50"
          y1="180"
          x2="50"
          y2="20"
          className="stroke-gray-700 stroke-[4px]"
        />
        <line
          x1="50"
          y1="20"
          x2="100"
          y2="20"
          className="stroke-gray-700 stroke-[4px]"
        />
        <line
          x1="100"
          y1="20"
          x2="100"
          y2="40"
          className="stroke-gray-700 stroke-[4px]"
        />

        {/* Body parts based on wrong count */}
        {parts.slice(0, wrongCount)}
      </svg>
    </div>
  );
};

export default function HangmanGame() {
  const [currentWord, setCurrentWord] = useState("");
  const [previousWord, setPreviousWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("playing"); // playing, won, lost
  const [showAnimation, setShowAnimation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);

  useEffect(() => {
    startNewGame();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startNewGame = () => {
    let randomWord;
    do {
      randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    } while (randomWord === previousWord && WORDS.length > 1);

    setPreviousWord(currentWord);
    setCurrentWord(randomWord);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameState("playing");
    setShowAnimation(false);
    setShowHint(false);
    setHintUsed(false);
  };

  const resetGame = () => {
    setScore(0);
    setPreviousWord("");
    startNewGame();
  };

  const toggleHint = () => {
    setShowHint(!showHint);
    if (!hintUsed) {
      setHintUsed(true);
    }
  };

  const handleGuess = (letter) => {
    if (gameState !== "playing" || guessedLetters.has(letter)) return;

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    if (!currentWord.includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);

      if (newWrongGuesses >= MAX_WRONG_GUESSES) {
        setGameState("lost");
        setShowAnimation(true);
      }
    } else {
      // Check if word is complete
      const isComplete = currentWord
        .split("")
        .every((char) => newGuessedLetters.has(char));
      if (isComplete) {
        setGameState("won");
        setScore(score + 1);
        setShowAnimation(true);
        setTimeout(() => {
          startNewGame();
        }, 2500);
      }
    }
  };

  const displayWord = () => {
    return currentWord.split("").map((letter, idx) => {
      const isGuessed = guessedLetters.has(letter);
      return (
        <div
          key={idx}
          className={`w-10 h-12 sm:w-12 sm:h-14 flex items-center justify-center text-2xl sm:text-3xl font-bold border-b-4 mx-1 transition-all duration-300 ${
            isGuessed
              ? "border-green-500 text-white scale-110"
              : "border-white text-transparent"
          }`}
        >
          {isGuessed ? letter : "_"}
        </div>
      );
    });
  };

  const generateKeyboard = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return alphabet.map((letter) => {
      const isGuessed = guessedLetters.has(letter);
      const isCorrect = isGuessed && currentWord.includes(letter);
      const isWrong = isGuessed && !currentWord.includes(letter);

      return (
        <button
          key={letter}
          onClick={() => handleGuess(letter)}
          disabled={isGuessed || gameState !== "playing"}
          className={`w-10 h-10 sm:w-12 sm:h-12 m-1 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 transform hover:scale-110 active:scale-95 disabled:cursor-not-allowed ${
            isCorrect
              ? "bg-green-500 text-white shadow-lg"
              : isWrong
              ? "bg-red-500 text-white opacity-50"
              : "bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-md hover:shadow-xl"
          }`}
        >
          {letter}
        </button>
      );
    });
  };

  const getEmoji = () => {
    if (gameState === "won") return "🎉";
    if (gameState === "lost") return "💀";
    if (wrongGuesses >= 4) return "😰";
    if (wrongGuesses >= 2) return "😅";
    return "🎮";
  };

  const getStatusMessage = () => {
    if (gameState === "won") return "Amazing! You won! 🌟";
    if (gameState === "lost") return `Game Over! The word was: ${currentWord}`;
    return "Guess the word, one letter at a time!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-4">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce 2s ease-in-out infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      {/* TATA ETHICS WEEK GAMES Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-2">
          TATA ETHICS WEEK GAMES
        </h1>
      </div>

      <div className="max-w-4xl w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-yellow-300 animate-spin-slow" size={32} />
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Hangman
            </h1>
            <Sparkles className="text-yellow-300 animate-spin-slow" size={32} />
          </div>
          <p className="text-purple-200 text-lg">{getStatusMessage()}</p>
        </div>

        {/* Score & Stats */}
        <div className="flex justify-between items-center mb-8 bg-white/5 rounded-2xl p-4">
          <div className="text-center">
            <div className="text-5xl mb-1 animate-bounce-slow">
              {getEmoji()}
            </div>
          </div>
          <div className="text-center">
            <p className="text-purple-300 text-sm font-semibold">SCORE</p>
            <p className="text-4xl font-black text-white">{score}</p>
          </div>
          <div className="text-center">
            <p className="text-purple-300 text-sm font-semibold">REMAINING</p>
            <p className="text-4xl font-black text-white">
              {MAX_WRONG_GUESSES - wrongGuesses}
            </p>
          </div>
        </div>

        {/* Hangman Drawing and Hint Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-8">
          <HangmanDrawing wrongCount={wrongGuesses} />
          
          {/* Hint Section */}
          <div className="relative">
            <button
              onClick={toggleHint}
              className={`bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 ${
                hintUsed ? 'opacity-75' : 'animate-pulse-slow'
              }`}
            >
              <Lightbulb size={24} className={showHint ? 'animate-bounce' : ''} />
              {showHint ? 'Hide Hint' : 'Get Hint'}
            </button>
            
            {showHint && (
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-2xl shadow-2xl animate-slideIn min-w-[280px] max-w-[320px] z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb size={20} className="text-yellow-300" />
                  <span className="font-bold text-sm">HINT</span>
                </div>
                <p className="text-sm leading-relaxed">
                  {WORD_HINTS[currentWord]}
                </p>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rotate-45"></div>
              </div>
            )}
          </div>
        </div>

        {/* Word Display */}
        <div className="flex justify-center flex-wrap mb-8 min-h-[60px]">
          {displayWord()}
        </div>

        {/* Win/Loss Animation */}
        {showAnimation && (
          <div className="text-center mb-6">
            {gameState === "won" ? (
              <div className="text-6xl animate-bounce-slow">🎊 🏆 🎊</div>
            ) : (
              <div className="space-y-4">
                <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-6">
                  <div className="text-4xl mb-2">😔</div>
                  <p className="text-white text-xl font-bold mb-2">Oops! Nice try!</p>
                  <p className="text-purple-200 text-lg mb-3">The correct word was:</p>
                  <div className="text-3xl font-black text-yellow-300 tracking-wider">
                    {currentWord}
                  </div>
                </div>
                <button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
                >
                  <RotateCcw size={20} />
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}

        {/* Keyboard */}
        <div className="flex flex-wrap justify-center max-w-2xl mx-auto">
          {generateKeyboard()}
        </div>

        {/* Reset Button */}
        <div className="text-center mt-8">
          <button
            onClick={resetGame}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 transform hover:scale-105 border border-gray-300"
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}
