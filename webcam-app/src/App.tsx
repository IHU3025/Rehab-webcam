import React, { useState } from 'react';
import VideoRecorder from './components/VideoRecorder';

const App: React.FC = () => {
  const [videoData, setVideoData] = useState<string | null>(null);

  return (
    <div>
      <h1>Video Recorder</h1>
      <VideoRecorder setData={setVideoData} />
      {videoData && (
        <div>
          <h2>Recorded Video</h2>
          <video src={videoData} controls />
        </div>
      )}
    </div>
  );
};

export default App;