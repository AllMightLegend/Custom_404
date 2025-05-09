import React, { useState } from 'react';
import './App.css';

// Rectangular box size
const BOX_W = 80;
const BOX_H = 48;
const BOXES_404 = [
  // --- 4 ---
  { x: 0, y: 0, angle: -8 },
  { x: 0, y: 60, angle: 5 },
  { x: 0, y: 120, angle: 10 },
  { x: 0, y: 180, angle: 8 },
  { x: 60, y: 120, angle: -10 },
  { x: 120, y: 120, angle: 7 },
  { x: 120, y: 60, angle: 12 },
  { x: 120, y: 0, angle: -6 },
  { x: 60, y: 0, angle: 6 },
  { x: 60, y: 180, angle: 2 },
  { x: 120, y: 180, angle: -12 },
  // --- 0 ---
  { x: 260, y: 0, angle: 7 },
  { x: 320, y: 0, angle: -8 },
  { x: 380, y: 0, angle: 10 },
  { x: 440, y: 0, angle: -7 },
  { x: 260, y: 60, angle: 8 },
  { x: 440, y: 60, angle: 6 },
  { x: 260, y: 120, angle: -9 },
  { x: 440, y: 120, angle: 11 },
  { x: 260, y: 180, angle: 7 },
  { x: 320, y: 180, angle: -8 },
  { x: 380, y: 180, angle: 10 },
  { x: 440, y: 180, angle: -7 },
  // --- 4 ---
  { x: 580, y: 0, angle: -8 },
  { x: 580, y: 60, angle: 5 },
  { x: 580, y: 120, angle: 10 },
  { x: 580, y: 180, angle: 8 },
  { x: 640, y: 120, angle: -10 },
  { x: 700, y: 120, angle: 7 },
  { x: 700, y: 60, angle: 12 },
  { x: 700, y: 0, angle: -6 },
  { x: 640, y: 0, angle: 6 },
  { x: 640, y: 180, angle: 2 },
  { x: 700, y: 180, angle: -12 },
];

function getRandomImageUrl(seed: number) {
  // Use a placeholder image service, seed for variety
  return `https://source.unsplash.com/80x48/?design,abstract,art,${seed}`;
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
      <div className="notfound-404" style={{ width: 800, height: 240 }}>
        {BOXES_404.map(({ x, y, angle }, i) => (
          <div
            key={i}
            className="notfound-box"
            style={{
              left: x,
              top: y,
              width: BOX_W,
              height: BOX_H,
              transform: `rotate(${angle}deg)` ,
              zIndex: 2 + (i % 8),
              background: `hsl(${hue}, 100%, 60%)`,
              boxShadow: `0 4px 16px hsla(${hue}, 100%, 40%, 0.3)`,
              backgroundImage: `url(${getRandomImageUrl(i)})`,
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
