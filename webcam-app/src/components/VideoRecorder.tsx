import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@mui/material';
import { RadioButtonChecked, RadioButtonUnchecked } from '@mui/icons-material';

interface VideoRecorderProps {
  setData: (data: string) => void;
}

const VideoRecorder: React.FC<VideoRecorderProps> = ({ setData }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturing, setCapturing] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error("Error accessing camera:", (error as Error).message);
      }
    };
    getUserMedia();

    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  useEffect(() => {
    if (!capturing && recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      setData(URL.createObjectURL(blob));
    }
  }, [capturing, recordedChunks, setData]);

  const startRecording = () => {
    if (!stream) return;

    setCapturing(true);
    setRecordedChunks([]);
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks(prev => [...prev, event.data]);
      }
    };

    mediaRecorder.onstop = () => {
      setCapturing(false);
    };

    recorderRef.current = mediaRecorder;
    mediaRecorder.start();
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', maxWidth: '640px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
      <div style={{ marginTop: '16px' }}>
        {capturing ? (
          <Button
            startIcon={<RadioButtonChecked color="error" />}
            variant={'contained'}
            color="secondary"
            onClick={stopRecording}
          >
            Stop Recording
          </Button>
        ) : (
          <Button
            startIcon={<RadioButtonUnchecked color="action" />}
            variant={'contained'}
            color="primary"
            onClick={startRecording}
          >
            Start Recording
          </Button>
        )}
      </div>
    </div>
  );
};

export default VideoRecorder;
