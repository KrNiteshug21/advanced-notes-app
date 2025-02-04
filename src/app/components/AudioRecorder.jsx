"use client";
import { Clock, Mic } from "lucide-react";
import { useRef } from "react";

const AudioRecorder = ({
  isRecording,
  setIsRecording,
  elapsedTime,
  setElapsedTime,
  content,
  setContent,
}) => {
  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const intervalRef = useRef(null);

  // Format time in mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
      setIsRecording(true);
      setElapsedTime(0);

      // Timer to track elapsed time
      intervalRef.current = setInterval(() => {
        setElapsedTime((prev) => {
          if (prev >= 59) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);

      // Stop recording automatically after 1 min
      timerRef.current = setTimeout(() => stopRecording(), 60000);

      // Setup Speech Recognition
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Speech Recognition is not supported in this browser.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const lastResult = event.results[event.results.length - 1];
        if (lastResult.isFinal) {
          setContent(lastResult[0].transcript);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    clearTimeout(timerRef.current);
    clearInterval(intervalRef.current);
  };

  // Create Note
  const createNote = async () => {
    if (!content) {
      alert("No transcript available.");
      return;
    }

    const note = {
      title: "New Voice Note",
      content: content,
      contentType: "text",
    };

    try {
      const res = await fetch("/api/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });

      if (res.ok) {
        alert("Note created successfully!");
      } else {
        alert("Failed to create note.");
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div className="mb-4">
      <div className="p-8 border rounded-lg">
        <div className="flex flex-col items-center gap-4">
          {/* <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-4 py-2 rounded-md ${
          isRecording ? "bg-red-500" : "bg-blue-500"
        } text-white`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button> */}

          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isRecording ? "bg-red-500" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <Mic
              className={`w-6 h-6 ${
                isRecording ? "text-white" : "text-gray-600"
              }`}
            />
          </button>

          {/* <p className="mt-2 text-gray-600 text-sm">
            Recording Time:{" "}
            <span className="font-semibold">{formatTime(elapsedTime)}</span>
          </p> */}

          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Clock className="w-4 h-4" />
            {formatTime(elapsedTime)}
          </div>

          <p className="text-gray-500 text-sm">
            {isRecording ? "Recording..." : "Click to start recording"}
          </p>

          {content && (
            <div className="">
              <h3 className="font-semibold">Transcription:</h3>
              <p className="">{content}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;
