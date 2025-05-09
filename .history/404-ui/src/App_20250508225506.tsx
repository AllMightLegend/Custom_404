import React, { useState } from 'react';
import './App.css';

// Smaller rectangle size
const BOX_W = 36;
const BOX_H = 22;
// Hand-crafted coordinates for a detailed '404' outline
const BOXES_404 = [
  // --- 4 ---
  { x: 0, y: 44,  }, { x: 0, y: 66, }, { x: 0, y: 88, },
  { x: 36, y: 0, }, { x: 36, y: 22,  }, { x: 36, y: 44, }, { x: 36, y: 66,  }, { x: 36, y: 88, },
  { x: 72, y: 44,  }, { x: 72, y: 66,  }, { x: 72, y: 88, },
  { x: 108, y: 0, }, { x: 108, y: 22,  }, { x: 108, y: 44, }, { x: 108, y: 66, }, { x: 108, y: 88,  },
  { x: 144, y: 44, }, { x: 144, y: 66,  }, { x: 144, y: 88, },
  // --- 0 ---
  { x: 220, y: 0, }, { x: 256, y: 0,  }, { x: 292, y: 0,  }, { x: 328, y: 0,  },
  { x: 220, y: 22, }, 
  { x: 220, y: 44,  }, { x: 328, y: 44,  },
  { x: 220, y: 66, }, { x: 328, y: 66,  },
  { x: 220, y: 88,  }, { x: 256, y: 88,  }, { x: 292, y: 88, }, { x: 328, y: 88,  },
  { x: 256, y: 22, }, { x: 292, y: 22,  },
  { x: 256, y: 44, }, { x: 292, y: 44,  },
  { x: 256, y: 66, }, { x: 292, y: 66,  },
  // --- 4 ---
  { x: 404, y: 44,  }, { x: 404, y: 66, }, { x: 404, y: 88, },
  { x: 440, y: 0, }, { x: 440, y: 22,  }, { x: 440, y: 44, }, { x: 440, y: 66,  }, { x: 440, y: 88, },
  { x: 476, y: 44,  }, { x: 476, y: 66,  }, { x: 476, y: 88, },
  { x: 512, y: 0, }, { x: 512, y: 22,  }, { x: 512, y: 44, }, { x: 512, y: 66, }, { x: 512, y: 88,  },
  { x: 548, y: 44, }, { x: 548, y: 66,  }, { x: 548, y: 88, },
];

function getRandomImageUrl(seed: number) {
  // Use a placeholder image service, seed for variety
  return `https://source.unsplash.com/36x22/?design,abstract,art,${seed}`;
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
      <div className="notfound-404" style={{ width: 600, height: 120 }}>
        {BOXES_404.map(({ x, y }, i) => (
          <div
            key={i}
            className="notfound-box"
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
              borderRadius: '6px',
              border: '1.5px solid #fff',
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
