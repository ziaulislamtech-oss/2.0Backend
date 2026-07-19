import {
    FaceLandmarker,
    FilesetResolver
} from "@mediapipe/tasks-vision";


// this init function gives us the initial setup 

export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    landmarkerRef.current = await FaceLandmarker.createFromOptions(
        vision,
        {
            baseOptions: {
                modelAssetPath:
                    "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
            },
            outputFaceBlendshapes: true,
            runningMode: "VIDEO",
            numFaces: 1
        }
    );

    streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = streamRef.current;
    await videoRef.current.play();
};

export const detect = ({
    landmarkerRef,
    videoRef,
    setExpression,
    setAnalysis,
}) => {
    if (!landmarkerRef.current || !videoRef.current) return;

    const results = landmarkerRef.current.detectForVideo(
        videoRef.current,
        performance.now()
    );



    if (results.faceBlendshapes?.length > 0) {
        const blendshapes = results.faceBlendshapes[0].categories;

        const getScore = (name) =>
            blendshapes.find((b) => b.categoryName === name)?.score || 0;

        const smile =
            (getScore("mouthSmileLeft") + getScore("mouthSmileRight")) / 2;

        const frown =
            (getScore("mouthFrownLeft") + getScore("mouthFrownRight")) / 2;

        const jawOpen = getScore("jawOpen");

        const browRaise = getScore("browInnerUp");

        let currentExpression = "Neutral";
        let confidence = 75;

       
        if (smile > 0.5) {
            currentExpression = "Happy";
            confidence = Math.round(smile * 100);
        } else if (jawOpen > 0.1 && browRaise > 0.2) {
            currentExpression = "Surprised";
            confidence = Math.round(((jawOpen + browRaise) / 2) * 100);
        } else if (frown > 0.002) {
            currentExpression = "Sad";
            confidence = Math.round(frown * 100);
        }

        setExpression(currentExpression);

        setAnalysis({
            emotion: currentExpression,
            confidence,
            smile: Math.round(smile * 100),
            frown: Math.round(frown * 100),
            jawOpen: Math.round(jawOpen * 100),
            browRaise: Math.round(browRaise * 100),
        });

        return currentExpression;
    }
};