import { useState, useEffect } from 'react';

type MediaStreamConstraints = {
  video: boolean | MediaTrackConstraints;
  audio: boolean | MediaTrackConstraints;
};

const useUserMedia = (requestedMedia: MediaStreamConstraints) => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    let isMounted = true;

    const enableStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(requestedMedia);
        if (isMounted) {
          setMediaStream(stream);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (!mediaStream) {
      enableStream();
    }

    return () => {
      isMounted = false;
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaStream, requestedMedia]);

  return mediaStream;
};

export default useUserMedia;