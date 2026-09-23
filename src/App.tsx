import { useState } from "react";
import { ToastProvider } from "./components/common/Toast";
import { CinematicReader } from "./components/CinematicReader/CinematicReader";
import { splitText } from "./utils/textSplitter";
import type { Scene } from "./types";
import "./App.css";

type AppStep = "home" | "upload" | "reader";

export default function App() {
  const [step, setStep] = useState<AppStep>("home");
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    try {
      const text = await file.text();
      const splitScenes = await splitText(text, "paragraph");
      setScenes(splitScenes);
      setStep("reader");
    } catch (error) {
      console.error("Failed to process file:", error);
      alert("파일 처리 중 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
    const file = e.dataTransfer.files[0];
    if (file && (file.type.includes("text") || file.name.endsWith(".txt"))) {
      handleFileUpload(file);
    }
  };

  return (
    <ToastProvider>
      {step === "home" && (
        <div className="home">
          <div className="hero">
            <h1>NONEMAVL</h1>
            <p>소설을 인터랙티브 시각적 프로토타입으로 변환하세요</p>
          </div>
          <button onClick={() => setStep("upload")} className="btn btn-primary">
            시작하기
          </button>
        </div>
      )}

      {step === "upload" && (
        <div className="upload-screen">
          <div
            className="upload-area"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="upload-content">
              <h2>📄 텍스트 파일 업로드</h2>
              <p>txt 파일을 드래그 앤드 드롭하거나 클릭해서 선택하세요</p>
              <input
                type="file"
                accept=".txt,.text"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                style={{ display: "none" }}
                id="file-input"
              />
              <button
                className="btn btn-secondary"
                onClick={() => document.getElementById("file-input")?.click()}
                disabled={isProcessing}
              >
                {isProcessing ? "처리 중..." : "파일 선택"}
              </button>
            </div>
          </div>
          <button onClick={() => setStep("home")} className="btn btn-back">
            돌아가기
          </button>
        </div>
      )}

      {step === "reader" && <CinematicReader scenes={scenes} onBack={() => setStep("home")} />}
    </ToastProvider>
  );
}
