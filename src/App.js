import React, { useState, useEffect } from "react";
import { Sparkles, RotateCcw } from "lucide-react";

const WORDS = [
  "WHISTLEBLOWER",
  "ETHICS",
  "INTEGRITY",
  "EXCELLENCE",
  "PIONEERING",
  "UNITY",
  "RESPONSIBILITY",
  "TRANSPARENCY",
  "ETHICS",
  "RESPECT",
  "TRUST",
  "ACCOUNTABILITY",
  "FAIRNESS",
  "HONESTY",
  "DIVERSITY",
  "EQUALITY",
  "MERITOCRACY",
  "INNOVATION",
  "CITIZENSHIP",
  "SUSTAINABILITY",
  "COMPLIANCE",
  "CONFIDENTIALITY",
  "LEADERSHIP",
  "COMMITMENT",
  "COURAGE",
  "EMPATHY",
  "COLLABORATION",
  "PROFESSIONALISM",
  "TOLERANCE",
  "UNDERSTANDING",
  "PRIVACY",
  "SAFETY",
  "LEARNING",
  "DEVELOPMENT",
  "EMPOWERMENT",
  "COMMUNICATION",
  "DISCLOSURE",
  "PROTECTION",
  "GOVERNANCE",
  "OBJECTIVITY",
  "AUTHENTICITY",
  "INCLUSIVITY",
  "RESPONSIVENESS",
  "CREDIBILITY",
  "DISCIPLINE",
  "DEDICATION",
  "MOTIVATION",
  "CLARITY",
  "SUPPORT",
  "ENGAGEMENT",
  "CONTRIBUTION",
  "IMPROVEMENT",
  "HONOUR",
  "VALUES",
  "PRINCIPLES",
  "FOCUS",
  "VISION",
  "STRATEGY",
  "PERFORMANCE",
  "RESULTS",
  "QUALITY",
  "SERVICE",
  "RELIABILITY",
  "EFFICIENCY",
  "AGILITY",
  "ADAPTABILITY",
  "BALANCE",
  "ETHICAL",
  "SOCIAL",
  "ENVIRONMENT",
  "VOLUNTEER",
  "PARTNERSHIP",
  "INCLUSION",
  "DIGNITY",
  "ACCOUNTABLE",
  "TRANSPARENT",
  "SAFEGUARD",
  "PREVENTION",
  "RESILIENCE",
  "INSPIRATION",
  "OPTIMISM",
  "SYNERGY",
  "RESOLUTION",
  "CONFLICT",
  "FEEDBACK",
  "RECOGNITION",
  "ACHIEVEMENT",
  "EXPERTISE",
  "KNOWLEDGE",
  "INFORMATION",
  "DATA",
  "PRINCIPLE",
  "STANDARD",
  "BENEFIT",
  "OPPORTUNITY",
  "GROWTH",
  "POTENTIAL",
  "MERIT",
  "ETHOS",
  "CONSCIENCE",
  "REPUTATION",
  "IDENTITY",
  "CULTURE",
];

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

  useEffect(() => {
    startNewGame();
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
  };

  const resetGame = () => {
    setScore(0);
    setPreviousWord("");
    startNewGame();
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

        {/* Hangman Drawing */}
        <HangmanDrawing wrongCount={wrongGuesses} />

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
              <div className="flex justify-center gap-2">
                <button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  <RotateCcw size={20} />
                  Play Again
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
