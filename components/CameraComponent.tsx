import React, { useState, useRef, useCallback } from 'react';

interface CameraComponentProps {
    onCapture: (imageDataUrl: string) => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ onCapture }) => {
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startCamera = async () => {
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    streamRef.current = stream;
                }
                setIsCameraOn(true);
                setError(null);
            } else {
                 setError('Your browser does not support camera access.');
            }
        } catch (err) {
            console.error("Error accessing camera: ", err);
            setError('Could not access camera. Please check permissions.');
        }
    };

    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            setIsCameraOn(false);
        }
    }, []);

    const takePicture = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const context = canvas.getContext('2d');
            if(context){
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                const imageDataUrl = canvas.toDataURL('image/jpeg');
                onCapture(imageDataUrl);
                stopCamera();
            } else {
                 setError('Could not process image.');
            }
        }
    };
    
    return (
        <div className="flex flex-col items-center">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="w-full max-w-sm h-64 bg-sss-black rounded-lg overflow-hidden flex items-center justify-center mb-4">
                {isCameraOn ? (
                     <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                ) : (
                    <p className="text-sss-grey">Camera is off</p>
                )}
            </div>
            {!isCameraOn ? (
                <button onClick={startCamera} className="bg-sss-sage text-white font-bold py-2 px-6 rounded-md hover:bg-opacity-80 transition-colors">
                    Start Camera
                </button>
            ) : (
                <div className="flex space-x-4">
                    <button onClick={takePicture} className="bg-green-500 text-white font-bold py-2 px-6 rounded-md hover:bg-green-600 transition-colors">
                        Take Picture
                    </button>
                    <button onClick={stopCamera} className="bg-sss-grey text-white font-bold py-2 px-6 rounded-md hover:bg-opacity-80 transition-colors">
                        Stop Camera
                    </button>
                </div>
            )}
        </div>
    );
};

export default CameraComponent;