import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';

// Scale factor
const SCALE = 1.8; // Reduced scale factor
const GAP = 10; // Reduced gap between rectangles
// Smaller rectangle size
const BOX_W = 36 * SCALE; // Reduced width
const BOX_H = 22 * SCALE; // Reduced height
// Hand-crafted coordinates for a detailed '404' outline, scaled up
const RAW_BOXES_404 = [
  // --- 4 ---
  { x: 86, y: 0, }, { x: 61, y: 22,  }, { x: 36, y: 44, },
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

// Dribbble image URLs for each rectangle
const DRIBBBLE_IMAGES = [
  "https://cdn.dribbble.com/userupload/25307188/file/original-c0e08453653e59456bb0b3787524c587.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/42445649/file/original-0b06f1157f974f6c9895bed107e97cc1.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/26925499/file/still-08ef97e75812f51ddb06191a2e70e331.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/25086025/file/still-d3733e91b88f24a012f1593423abfb41.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/42026293/file/original-bf833ea3d26870aaaf2cbd7d0dd1f845.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/42145409/file/original-d21e14ee00664268d349fc8f0de4ce6c.jpg?resize=400x300",
  "https://cdn.dribbble.com/userupload/41983922/file/original-d5c13da353da1a4c4a56d2228a8f3c13.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/42124333/file/original-a8c58eb0ad61022c23fd238f097ff871.jpg?resize=400x300",
  "https://cdn.dribbble.com/userupload/23588638/file/original-4457472becc000cfa6ece87bb3cbad19.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/24954871/file/original-3a7de22aba4c9e2bf6f59b2f29821063.jpg?resize=400x300",
  "https://cdn.dribbble.com/userupload/29259032/file/still-e35b64fee6fe3a97a18ebcc39e5ee901.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/21072943/file/original-3b24690854af3fa5fee3a48620459b08.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/23395918/file/still-4d56154541c63955565010454f105f3c.gif?resize=400x300",
  "https://cdn.dribbble.com/userupload/26524406/file/original-0eaf9715f5e76dbed40b2d2ad78a05da.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/42385791/file/original-0d79d7def4be6405b206db4779366f55.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/23483785/file/still-813068a97712afb35bcde9fd5953cb7a.gif?resize=400x300",
  "https://cdn.dribbble.com/userupload/41734506/file/original-4f5bbd4b1e57d720ee5f909b24f066c4.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/21104274/file/still-45b4cd25eb6ad6500b769d45db739536.gif?resize=400x300",
  "https://cdn.dribbble.com/userupload/42011729/file/original-3ef427554fae60fc223f8eb386842f6a.jpg?resize=400x300",
  "https://cdn.dribbble.com/userupload/26719362/file/original-430f69da5a3a5972bf95f8e84baf76e1.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/23101545/file/still-13a91f45a2579d0798794100f743df49.gif?resize=400x300",
  "https://cdn.dribbble.com/userupload/42028815/file/original-f6627a141ab0d1439d386c51538caeb9.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/23305259/file/still-dd6600d17f5bdc4cd967d63fe84ab01c.gif?resize=400x300",
  "https://cdn.dribbble.com/userupload/42787642/file/still-95771f1db5abfeb05a91d6418f29f77c.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/32577238/file/still-adaa9b21a20d3cd67becb8f08d87ce96.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/25172026/file/still-f44caf01f09ecd5d095e58461601d43d.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/33007736/file/original-2f99a773cfa981a62ba52577170516b4.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/25155885/file/original-ea8154ab587c0c470a4951390b4f8f4d.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/25184141/file/original-a23bc4ead5765286d315b1957653b331.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/23546555/file/still-9740c51588762634d21351a02aae3607.gif?resize=400x300",
  "https://cdn.dribbble.com/userupload/25439209/file/original-e5a4dd8d2061a3e2ea4e2e321046fe8f.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/42309627/file/original-a15020636a6cc1a2eed5b8f33a9a235b.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/26150884/file/original-ae6470cab87a696ef0bd5f4f9592ff8b.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/41944453/file/still-6e4455b846f548ee9eb1efedb2a92fab.gif?resize=400x300",
  "https://cdn.dribbble.com/userupload/37154499/file/original-a3edd069df21f32931e1ce0372a877b7.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/42203711/file/original-151bcc98ff3f38bc27ce8f5b16063f1c.jpg?resize=400x300",
  "https://cdn.dribbble.com/userupload/23395920/file/still-306459da92a590ee426cf321665f9b9d.gif?resize=400x300",
  "https://cdn.dribbble.com/userupload/23902971/file/still-2d435ce989a72512c0915d2440c366f8.gif?resize=400x300",
  "https://cdn.dribbble.com/userupload/22609585/file/still-25e12c9c79a84375bcccdf642a15cfa7.gif?resize=400x300",
  "https://cdn.dribbble.com/userupload/25004890/file/original-daea20a35d21789f168fe062ae47503c.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/24181633/file/original-c7dee8528cb70bd070145f3de7b3a03e.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/21559434/file/still-2c38c893828d46bc271c3112f6dbf1db.gif?resize=400x300",
  "https://cdn.dribbble.com/userupload/26498164/file/still-b666c1b2934faa6449ea98141c5c279a.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/25639332/file/still-d6fc7bd0d4bdf1c09ef63b5284941de1.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/26253449/file/original-6948fc468aa064ccc2f3584d31999580.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/42127994/file/original-66daadc97e6bfd250572a602df75af71.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/42366812/file/original-6d92ba82044e5a464a9ea5a02ab7d008.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/24912243/file/original-91bc49feab9071fd2ad16dd0a925dd75.jpg?resize=400x300",
  "https://cdn.dribbble.com/userupload/29255032/file/original-9fefd77135d06fbd4aaee5ef318df153.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/42111146/file/original-b6c185e3e6b13a91f2465c999fa2f50d.png?resize=400x300",
  "https://cdn.dribbble.com/userupload/42070772/file/still-b324a54d3fac38f3aa9b7410d3300206.gif?resize=400x300",
  "https://cdn.dribbble.com/userupload/28245661/file/original-ee3fbd640f4a562eeadbf078de70c913.png?resize=400x300",
];

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
                backgroundImage: `url(${DRIBBBLE_IMAGES[i % DRIBBBLE_IMAGES.length]})`,
                backgroundSize: 'cover',
                backgroundBlendMode: 'multiply',
                borderRadius: '12px',
                border: '2.5px solid #fff',
                transform: `translateX(0%) translateY(0%) scale(${0.8 + Math.random() * 0.2})`,
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
