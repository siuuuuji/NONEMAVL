import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import type { Scene } from "../../types";
import "./CinematicReader.css";

interface CinematicReaderProps {
  scenes: Scene[];
  onBack?: () => void;
}

export function CinematicReader({ scenes, onBack }: CinematicReaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [imageLoading, setImageLoading] = useState(false);

  const currentScene = scenes[currentIndex];
  const progress = ((currentIndex + 1) / scenes.length) * 100;

  useEffect(() => {
    if (!isAutoPlay) return;

    const delay = 3000 / speed;
    const timer = setTimeout(() => {
      if (currentIndex < scenes.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setIsAutoPlay(false);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isAutoPlay, speed, currentIndex, scenes.length]);

  const handleNext = () => {
    if (currentIndex < scenes.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  return (
    <div className="cinematic-reader">
      <div className="reader-container">
        {/* Image Section */}
        <div className="image-section">
          {currentScene.imageUrl && (
            <img
              src={currentScene.imageUrl}
              alt={`Scene ${currentIndex + 1}`}
              className="scene-image"
              onLoad={() => setImageLoading(false)}
            />
          )}
          {imageLoading && <div className="image-loading">이미지 로딩 중...</div>}
        </div>

        {/* Text Section */}
        <div className="text-section">
          <div className="scene-text">{currentScene.text}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          <span className="progress-text">
            {currentIndex + 1} / {scenes.length}
          </span>
        </div>

        <div className="control-buttons">
          <button onClick={handlePrev} disabled={currentIndex === 0} className="btn btn-prev">
            <ChevronLeft size={20} />
          </button>

          <button onClick={() => setIsAutoPlay(!isAutoPlay)} className="btn btn-play">
            {isAutoPlay ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <button onClick={handleNext} disabled={currentIndex === scenes.length - 1} className="btn btn-next">
            <ChevronRight size={20} />
          </button>
        </div>

        {isAutoPlay && (
          <div className="speed-control">
            <label>속도</label>
            <input type="range" min="0.5" max="2" step="0.25" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} />
            <span>{speed.toFixed(2)}x</span>
          </div>
        )}

        {onBack && (
          <button onClick={onBack} className="btn btn-back">
            돌아가기
          </button>
        )}
      </div>
    </div>
  );
}
