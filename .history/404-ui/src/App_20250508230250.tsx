import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';

// Scale factor
const SCALE = 2;
const GAP = 12; // Gap between rectangles
// Larger rectangle size
const BOX_W = 36 * SCALE;
const BOX_H = 22 * SCALE;
// Hand-crafted coordinates for a detailed '404' outline, scaled up
const RAW_BOXES_404 = [
  // --- 4 ---
  { x: 36, y: 0, }, { x: 36, y: 22,  }, { x: 36, y: 44, },
  { x: 72, y: 44,  },
  { x: 108, y: 0, }, { x: 108, y: 22,  }, { x: 108, y: 44, }, { x: 108, y: 66, }, { x: 108, y: 88,  },
  // --- 0 ---
  { x: 220, y: 0, }, { x: 256, y: 0,  }, { x: 292, y: 0,  }, { x: 328, y: 0,  },
  { x: 220, y: 22, }, { x: 328, y: 22, },
  { x: 220, y: 44,  }, { x: 328, y: 44,  },
  { x: 220, y: 66, }, { x: 328, y: 66,  },
  { x: 220, y: 88,  }, { x: 256, y: 88,  }, { x: 292, y: 88, }, { x: 328, y: 88,  },
  // --- 4 ---
  { x: 440, y: 0, }, { x: 440, y: 22,  }, { x: 440, y: 44, },
  { x: 476, y: 44,  },
  { x: 512, y: 0, }, { x: 512, y: 22,  }, { x: 512, y: 44, }, { x: 512, y: 66, }, { x: 512, y: 88,  },
];
const BOXES_404 = RAW_BOXES_404.map(box => ({ x: box.x * SCALE + Math.floor(box.x / 36) * GAP, y: box.y * SCALE + Math.floor(box.y / 22) * GAP }));

function getRandomImageUrl(seed: number) {
  // Use a placeholder image service, seed for variety
  return `https://source.unsplash.com/${BOX_W}x${BOX_H}/?design,abstract,art,${seed}`;
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
      <div className="notfound-404" style={{ width: 1200, height: 240 }}>
        {BOXES_404.map(({ x, y }, i) => {
          const delay = Math.random() * 0.8 + 0.1; // random delay for fade-in
          return (
            <motion.div
              key={i}
              className="notfound-box"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay }}
              style={{
                left: x,
                top: y,
                width: BOX_W,
                height: BOX_H,
                zIndex: 2 + (i % 8),
                background: `hsl(${hue}, 100%, 60%)`,
                boxShadow: `0 4px 16px hsla(${hue}, 100%, 40%, 0.3)`,
                backgroundImage: `url(${getRandomImageUrl(i)})`,
                backgroundSize: 'cover',
                backgroundBlendMode: 'multiply',
                borderRadius: '12px',
                border: '2.5px solid #fff',
              }}
            />
          );
        })}
      </div>
      <div className="notfound-slider-wrap">
        <input
          type="range"
          min={0}
          max={360}
          value={hue}
          onChange={handleSlider}
          className="notfound-slider"
        />
        <div className="notfound-slider-bar" style={{ background: `linear-gradient(90deg, hsl(0,100%,60%), hsl(60,100%,60%), hsl(120,100%,60%), hsl(180,100%,60%), hsl(240,100%,60%), hsl(300,100%,60%), hsl(360,100%,60%))` }} />
      </div>
    </div>
  );
}

export default App;
