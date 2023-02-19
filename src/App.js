import React, { useState, useEffect } from 'react';
import './App.css';

function WhackAMole() {
  // State variables
  const [molePosition, setMolePosition] = useState(null);
  const [isMoleVisible, setIsMoleVisible] = useState(false);
  const [score, setScore] = useState(0);

  // Event handlers
  const handleWhack = (row, col) => {
    // Check if the mole is in this position
    if (molePosition && molePosition.row === row && molePosition.col === col) {
      console.log('Whack!');
      // Hide the mole
      setIsMoleVisible(false);
      // Increase the score
      setScore(score + 1);
    }
  };

  // Function to generate a random mole position
  function generateRandomPosition() {
    const row = Math.floor(Math.random() * 3);
    const col = Math.floor(Math.random() * 3);
    return { row, col };
  }

  // Use the useEffect hook to update the mole's position and visibility at regular intervals
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Generate a new position and set it as the mole position
      const newPosition = generateRandomPosition();
      setMolePosition(newPosition);

      // Show the mole
      setIsMoleVisible(true);

      // Hide the mole after a short delay
      setTimeout(() => {
        setIsMoleVisible(false);
      }, 1000);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Render the game board
  return (
    <div>
      <h1>Whack-a-Mole</h1>
      <p>Score: {score}</p>
      <table>
        <tbody>
          {[0, 1, 2].map(row => (
            <tr key={row}>
              {[0, 1, 2].map(col => (
                <td key={col}>
                  <button onClick={() => handleWhack(row, col)}>
                    {row === molePosition?.row && col === molePosition?.col && isMoleVisible ? '🐭' : ''}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WhackAMole;
