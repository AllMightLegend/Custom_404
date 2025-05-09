import React, { useState } from 'react';
import './App.css';

const BOXES_404 = [
  // Each entry: [x, y, width, height, angle, zIndex]
  // These are relative positions and sizes for the 404 structure
  // 4
  [0, 0, 60, 60, 10, 2], [0, 70, 60, 60, -8, 3], [0, 140, 60, 60, 5, 4],
  [70, 0, 60, 60, 15, 5], [70, 70, 60, 60, -12, 6], [70, 140, 60, 60, 8, 7],
  [140, 0, 60, 60, 20, 8], [140, 70, 60, 60, -15, 9],
  // 0
  [300, 0, 60, 60, 12, 2], [300, 70, 60, 60, -10, 3], [300, 140, 60, 60, 7, 4],
  [370, 0, 60, 60, 18, 5], [370, 70, 60, 60, -14, 6], [370, 140, 60, 60, 10, 7],
  [440, 0, 60, 60, 22, 8], [440, 70, 60, 60, -17, 9], [440, 140, 60, 60, 13, 10],
  // 4
  [600, 0, 60, 60, 11, 2], [600, 70, 60, 60, -9, 3], [600, 140, 60, 60, 6, 4],
  [670, 0, 60, 60, 16, 5], [670, 70, 60, 60, -13, 6], [670, 140, 60, 60, 9, 7],
  [740, 0, 60, 60, 21, 8], [740, 70, 60, 60, -16, 9],
];

function getRandomImageUrl(seed: number) {
  // Use a placeholder image service, seed for variety
  return `https://source.unsplash.com/60x60/?abstract,${seed}`;
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
      <div className="notfound-404">
        {BOXES_404.map(([x, y, w, h, angle, z], i) => (
          <div
            key={i}
            className="notfound-box"
            style={{
              left: x,
              top: y,
              width: w,
              height: h,
              transform: `rotate(${angle}deg)`,
              zIndex: z,
              background: `hsl(${hue}, 100%, 60%)`,
              boxShadow: `0 4px 16px hsla(${hue}, 100%, 40%, 0.3)`,
              backgroundImage: `url(${getRandomImageUrl(i)})`,
              backgroundSize: 'cover',
              backgroundBlendMode: 'multiply',
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
