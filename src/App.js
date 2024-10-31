import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/Card';
import { Input } from './components/ui/Input';
import { Alert, AlertDescription } from './components/ui/Alert';

const statistics = [
  { name: "Australia: Real GDP growth rate (2024)", value: 1, unit: "%" },
  { name: "Australia: Cash rate (September 2024)", value: 4.35, unit: "%" },
  { name: "Australia: Unemployment rate (September 2024)", value: 4.1, unit: "%" },
  { name: "Australia: Participation rate (September 2024)", value: 67.2, unit: "%" },
  { name: "Australia: Inflation CPI headline (September 2024)", value: 3.8, unit: "%" },
  { name: "Australia: Inflation CPI underlying (September 2024)", value: 4, unit: "%" },
  { name: "Australia: Inflation CPI this quarter", value: 1, unit: "%" },
  { name: "Australia: CA Balance (June 2024)", value: -10.73, unit: "$AUD billion dollars" },
  { name: "Global: Gross World Product (2023)", value: 105, unit: "US$ Trillion" },
  { name: "Global: World Real GDP Growth (2023)", value: 3.2, unit: "%" },
  { name: "Global: World Real GDP Growth (2024)", value: 3.2, unit: "%" },
  { name: "Global: Exports as percentage of GWP (2023)", value: 29, unit: "%" },
  { name: "Global: Foreign Direct Investment", value: 1.36, unit: "US$ Trillion" },
  { name: "Global: Population with internet access (2021)", value: 63, unit: "%" },
  { name: "Global: Population with internet access (2000)", value: 7, unit: "%" },
  { name: "Global: Mobile subscriptions (2022)", value: 108, unit: "per 100 people" },
  { name: "Global: Mobile subscriptions (2000)", value: 12, unit: "per 100 people" },
  { name: "Global: Air Passengers (2021)", value: 2.3, unit: "billion passengers" },
  { name: "Global: Air Passengers (2000)", value: 1.7, unit: "billion passengers" },
  { name: "Global: Migrants as percentage of population (2020)", value: 3.6, unit: "%" },
  { name: "Global: Total migrants (2020)", value: 280.6, unit: "million people" },
  { name: "Global: GINI coefficient (2020)", value: 0.67, unit: "" },
  { name: "Global: GINI coefficient (2000)", value: 0.72, unit: "" },
  { name: "Australia: Human Development Index (2022)", value: 0.946, unit: "" },
  { name: "Australia: Human Development Index (1990)", value: 0.865, unit: "" },
  { name: "Australia: Exports (2023)", value: 26.7, unit: "% of GDP" },
  { name: "Australia: Imports (2023)", value: 21.4, unit: "% of GDP" },
  { name: "BOGS surplus value (June 2024)", value: 12, unit: "Billion dollars" },
  { name: "Capital and Financial account (June 2024)", value: 9.25, unit: "Billion dollars" },
  { name: "Australia: China's share in exports", value: 33, unit: "%" },
  { name: "Australia: China's share in imports", value: 21, unit: "%" },
  { name: "Australia: Foreign Direct Investment (2023)", value: 46, unit: "US$ billion" },
  { name: "Australia: Underemployment rate", value: 6.4, unit: "%" },
  { name: "Australia: NAIRU", value: 4.5, unit: "%" },
  { name: "Australia: GINI coefficient for income", value: 0.324, unit: "" },
  { name: "Australia: GINI coefficient for wealth", value: 0.611, unit: "" },
  { name: "Australia: CO2 emissions per person (2022)", value: 15, unit: "tonnes" },
  { name: "Australia: Labour productivity growth (2022-23)", value: -2.9, unit: "%" },
  { name: "Australia: Minimum wage", value: 24.10, unit: "AU$" },
  { name: "Australia: CHAFTA (2015)", value: null, unit: "Bilaterial" },
  { name: "Australia: A-UKFTA (2023)", value: null, unit: "Bilaterial" },
  { name: "Australia: ASEAN (2010)", value: null, unit: "Multilaterial" },
  { name: "Australia: AANZFTA (2010)", value: null, unit: "Multilaterial" },
  { name: "Australia: Real GDP growth rate (Dec 2022 to Dec 2023)", value: 1.5, unit: "%" },
  { name: "Australia: Real GDP growth rate (2024)", value: 1, unit: "%" },
  { name: "Australia: Unemployment rate (June 2024)", value: 4.1, unit: "%" },
  { name: "Australia: Participation rate (June 2024)", value: 67.2, unit: "%" },
  { name: "Australia: Underemployment rate", value: 6.4, unit: "%" },
  { name: "Australia: NAIRU", value: 4.5, unit: "%" },
  { name: "Australia: Individual tax as percentage of government revenue", value: 50, unit: "%" },
  { name: "Australia: Budget Position 2021-22", value: -32, unit: "AUD$ Billion" },
  { name: "Australia: Budget Position 2022-23", value: 4.2, unit: "AUD$ Billion" },
  { name: "Australia: Budget Position 2023-24", value: 13.9, unit: "AUD$ Billion" },
  { name: "Australia: Budget Position 2024-25", value: -18.8, unit: "AUD$ Billion" },
  { name: "Indiividual tax contribution to budget", value: 250, unit: "AUD$ Billion" }
];

const EconomicStatChallenge = () => {
  const [currentStat, setCurrentStat] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [round, setRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!gameOver) {
      nextQuestion();
    }
  }, [gameOver]);

  const nextQuestion = () => {
    if (round < 100) {
      const randomStat = statistics[Math.floor(Math.random() * statistics.length)];
      setCurrentStat(randomStat);
      setUserGuess('');
      setMessage('');
      setRound(prevRound => prevRound + 1);
    } else {
      setGameOver(true);
      setMessage(`Game Over! Your final score is ${score} out of 100.`);
    }
  };

  const handleGuess = () => {
  	if (!currentStat) return;

  	const guess = parseFloat(userGuess);
  	if (isNaN(guess)) {
    		setMessage("Please enter a valid number.");
	    	return;
  	}

  	const actual = currentStat.value;
  	const difference = Math.abs(guess - actual);
  	let points = 0;

  	if (difference === 0) {
    		points = 10;
    		setMessage(`Perfect! You got it exactly right. The correct answer is ${actual} ${currentStat.unit}.`);
    		setIsCorrect(true);
  	} else if (difference <= actual * 0.1) {
    		points = 5;
    		setMessage(`Close! You were within 10%. The correct answer is ${actual} ${currentStat.unit}.`);
    		setIsCorrect(false);
  	} else if (difference <= actual * 0.2) {
    		points = 2;
    		setMessage(`Not bad! You were within 20%. The correct answer is ${actual} ${currentStat.unit}.`);
    		setIsCorrect(false);
  	} else {
    		setMessage(`Sorry, that's not correct. The correct answer is ${actual} ${currentStat.unit}.`);
    		setIsCorrect(false);
  	}

  	setScore(prevScore => prevScore + points);
  	setTimeout(nextQuestion, 2000);
  };


  const [isCorrect, setIsCorrect] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleGuess();
    }
  };

  const startNewGame = () => {
    setScore(0);
    setRound(0);
    setGameOver(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Economic Stat Challenge</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Current Score: {score} / 100</p>
        <p className="mb-4">Round: {round} / 100</p>
        {!gameOver ? (
          <div>
            <p className="mb-2">{currentStat?.name}</p>
            <Input
 		type="number"
  		value={userGuess}
  		onChange={(e) => setUserGuess(e.target.value)}
  		onKeyPress={handleKeyPress}
 		placeholder={`Enter your guess (${currentStat?.unit}) and press Enter`}
  		className={`mb-4 w-full ${isCorrect ? 'border-green-500' : ''}`}
	    />

          </div>
        ) : (
          <button onClick={startNewGame} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Start New Game
          </button>
        )}
        {message && (
          <Alert className="mt-4">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default EconomicStatChallenge;