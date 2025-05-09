import React, { useState } from 'react';
import './App.css';

// Helper to generate a grid for each digit
const DIGIT_MAPS = {
  '4': [
    // y, x pairs (row, col)
    [0,2],[1,2],[2,2],[3,2],[4,2], // vertical
    [4,0],[4,1],[4,2],[4,3],[4,4], // horizontal
    [2,0],[3,0],[4,0], // left leg
    [0,4],[1,4],[2,4], // right leg
  ],
  '0': [
    [0,1],[0,2],[0,3],
    [1,0],[1,4],
    [2,0],[2,4],
    [3,0],[3,4],
    [4,1],[4,2],[4,3],
  ]
};

// Generate all boxes for '404'
const BOX_SIZE = 44;
const BOX_GAP = 6;
const DIGIT_WIDTH = 5 * (BOX_SIZE + BOX_GAP);
const DIGIT_HEIGHT = 5 * (BOX_SIZE + BOX_GAP);
const DIGIT_SPACING = 48;

function getBoxesFor404() {
  const boxes = [];
  let xOffset = 0;
  const digits = ['4', '0', '4'];
  let boxIndex = 0;
  digits.forEach((digit, dIdx) => {
    const map = DIGIT_MAPS[digit];
    map.forEach(([row, col]) => {
      const x = xOffset + col * (BOX_SIZE + BOX_GAP);
      const y = row * (BOX_SIZE + BOX_GAP);
      const angle = (Math.random() - 0.5) * 18; // -9 to +9 deg
      const z = Math.floor(Math.random() * 8) + 2;
      boxes.push({
        x, y, angle, z, boxIndex: boxIndex++
      });
    });
    xOffset += DIGIT_WIDTH + DIGIT_SPACING;
  });
  return boxes;
}

const BOXES_404 = getBoxesFor404();

function getRandomImageUrl(seed: number) {
  // Use a placeholder image service, seed for variety
  return `https://source.unsplash.com/44x44/?design,abstract,art,${seed}`;
}

function App() {
  const [hue, setHue] = useState(270);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHue(Number(e.target.value));
  };

  return (
    <div className="notfound-bg">
      <h1 className="notfound-title">Whoops, that page is gone.</h1>
      <p className="notfound-desc">
        While you're here, feast your eyes upon these tantalizing popular designs matching the color
        <span style={{ color: `hsl(${hue}, 100%, 60%)`, marginLeft: 4 }}>#{hue.toString(16).padStart(6, '0')}</span>.
      </p>
      <div className="notfound-404" style={{ width: 3*DIGIT_WIDTH + 2*DIGIT_SPACING, height: DIGIT_HEIGHT }}>
        {BOXES_404.map(({x, y, angle, z, boxIndex}) => (
          <div
            key={boxIndex}
            className="notfound-box"
            style={{
              left: x,
              top: y,
              width: BOX_SIZE,
              height: BOX_SIZE,
              transform: `rotate(${angle}deg)` ,
              zIndex: z,
              background: `hsl(${hue}, 100%, 60%)`,
              boxShadow: `0 4px 16px hsla(${hue}, 100%, 40%, 0.3)`,
              backgroundImage: `url(${getRandomImageUrl(boxIndex)})`,
              backgroundSize: 'cover',
              backgroundBlendMode: 'multiply',
              borderRadius: '10px',
              border: '2px solid #fff',
            }}
          />
        ))}
      </div>
      <div className="notfound-slider-wrap">
        <input
          type="range"
          min={200}
          max={320}
          value={hue}
          onChange={handleSlider}
          className="notfound-slider"
        />
        <div className="notfound-slider-bar" style={{ background: `linear-gradient(90deg, hsl(200,100%,60%), hsl(320,100%,60%))` }} />
      </div>
    </div>
  );
}

export default App;
