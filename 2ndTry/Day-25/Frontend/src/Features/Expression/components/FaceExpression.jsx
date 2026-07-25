import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import { motion } from 'framer-motion'
import { Search, Bell, User, Camera, BrainCircuit, Play, Heart, RefreshCw, Sparkles, Music4, } from 'lucide-react';


export default function FaceExpression({ onClick = () => { }, getSong }) {

    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);
    const [cameraOn, setCameraOn] = useState(false);
    const [analysis, setAnalysis] = useState({
        emotion: "Neutral",
        confidence: 0,
        smile: 0,
        frown: 0,
        jawOpen: 0,
        browRaise: 0,
    });


    const [expression, setExpression] = useState("Detecting...");

    useEffect(() => {

        if (cameraOn) {
            init({
                landmarkerRef,
                videoRef,
                streamRef
            });
        }

        return () => {

            if (landmarkerRef.current) {
                landmarkerRef.current.close();
                landmarkerRef.current = null;
            }

            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }

            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }

        };

    }, [cameraOn]);

    function handleCameraToggle() {
        setCameraOn(prev => !prev);
    }

    async function handleClick() {
        const expression = detect({ landmarkerRef, videoRef, setExpression, setAnalysis })
        getSong(expression)
        console.log(expression)
        onClick(expression)
    }


    return (

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.15fr_0.85fr]">

            {/* Webcam Card */}

            {/* ===================== AI Scanner ===================== */}

            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className=" rounded-2xl border border-[var(--border)]  p-6 shadow-xl backdrop-blur-md" >
                {/* Header */}

                <div className="mb-6 flex items-center justify-between">

                    <div>

                        <div className="mb-2 flex items-center gap-3">

                            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[var(--primary)] text-white
">

                                <Camera size={22} />

                            </div>

                            <div>

                                <h3 className="font-space-grotesk text-xl font-bold">

                                    AI Face Scanner

                                </h3>

                                <p className="font-manrope text-sm text-[var(--text-muted)]">

                                    Real-time facial analysis

                                </p>

                            </div>

                        </div>

                    </div>

                    <button
                        onClick={handleCameraToggle}
                        className={`rounded-md px-4 py-2 text-sm font-semibold transition
        ${cameraOn
                                ? "bg-red-500 hover:bg-red-600 text-white"
                                : "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
                            }`}
                    >
                        {cameraOn ? "Turn Off Camera" : "Enable Camera"}
                    </button>

                </div>

                {/* Camera */}

                <div className="relative overflow-hidden rounded-md border border-[var(--border)] bg-[var(--bg)]">

                    {cameraOn ? (

                        <video
                            ref={videoRef}
                            playsInline
                            autoPlay
                            muted
                            className="aspect-video w-full scale-x-[-1] object-cover"
                        />

                    ) : (

                        <div className="flex aspect-video items-center justify-center bg-[var(--surface-light)]">

                            <div className="text-center">

                                <Camera
                                    size={60}
                                    className="mx-auto text-[var(--text-muted)]"
                                />

                                <h3 className="mt-4 font-space-grotesk text-xl font-bold">
                                    Camera is Off
                                </h3>

                                <p className="mt-2 text-[var(--text-muted)]">
                                    Enable your camera to detect your mood.
                                </p>

                            </div>

                        </div>

                    )}

                    {/* Overlay */}

                    <div className="pointer-events-none absolute inset-0">

                        {/* Dark gradient */}

                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/70 via-transparent to-transparent" />

                        {/* Scan line */}

                        <motion.div
                            className="absolute left-0 h-[2px] w-full bg-[var(--primary)] shadow-[0_0_18px_rgba(99,102,241,.7)]"
                            animate={{
                                top: ["5%", "95%", "5%"],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />

                        {/* Scanner Corners */}

                        <div className="absolute left-5 top-5 h-12 w-12 border-l-4 border-t-4 border-[var(--primary)] rounded-tl-xl" />

                        <div className="absolute right-5 top-5 h-12 w-12 border-r-4 border-t-4 border-[var(--primary)] rounded-tr-xl" />

                        <div className="absolute bottom-5 left-5 h-12 w-12 border-l-4 border-b-4 border-[var(--primary)] rounded-bl-xl" />

                        <div className="absolute bottom-5 right-5 h-12 w-12 border-r-4 border-b-4 border-[var(--primary)] rounded-br-xl" />

                    </div>

                </div>

                {/* AI Status */}

                <div className="mt-6 rounded-md border border-[var(--border)] bg-[var(--surface-light)] p-5">

                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-md bg-[var(--primary)]/10">

                            <BrainCircuit
                                className="text-[var(--primary)]"
                                size={28}
                            />

                        </div>

                        <div className="flex-1">

                            <h4 className="font-space-grotesk text-lg font-semibold">

                                AI Engine Ready

                            </h4>

                            <p className="mt-1 font-manrope text-sm text-[var(--text-muted)]">

                                Face landmarks detected and ready for emotion analysis.

                            </p>

                        </div>

                    </div>

                    {/* Button */}

                    <button
                        onClick={handleClick}
                        disabled={!cameraOn}
                        className={`mt-6 flex w-full items-center justify-center gap-3 rounded-md py-4 font-semibold transition
        ${cameraOn
                                ? "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
                                : "cursor-not-allowed bg-gray-600 text-gray-300"
                            }`}
                    >
                        <Sparkles size={18} />
                        {cameraOn ? "Scan Face" : "Enable Camera First"}
                    </button>

                </div>

            </motion.div>

            {/* Emotion Card */}

            {/* ===================== Emotion Analysis ===================== */}

            <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl backdrop-blur-md"
            >

                {/* Header */}

                <div className="mb-8 flex items-center justify-between">

                    <div>

                        <h3 className="font-space-grotesk text-xl font-bold">

                            Emotion Analysis

                        </h3>

                        <p className="mt-1 font-manrope text-sm text-[var(--text-muted)]">

                            AI prediction based on facial landmarks

                        </p>

                    </div>

                    <div className="rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-3 py-1.5">

                        <span className="font-manrope text-sm font-semibold text-[var(--primary)]">

                            AI Result

                        </span>

                    </div>

                </div>

                {/* Emotion Circle */}

                <div className="relative flex flex-col items-center">

                    <div className="relative flex h-30 w-30 items-center justify-center rounded-full bg-[var(--surface-light)]">

                        <div className="absolute inset-0 rounded-full border border-[var(--primary)]/20" />

                        <div className="absolute h-52 w-52 rounded-full border border-[var(--primary)]/10 animate-pulse" />

                        <div className="text-6xl">

                            {
                                analysis.emotion === "Happy"
                                    ? "😊"
                                    : analysis.emotion === "Sad"
                                        ? "😔"
                                        : analysis.emotion === "Surprised"
                                            ? "😲"
                                            : "😐"
                            }

                        </div>

                    </div>

                    <h2 className="mt-6 font-space-grotesk text-4xl font-bold">

                        {analysis.emotion}

                    </h2>

                    <p className="mt-2 font-manrope text-sm text-[var(--text-muted)]">

                        AI Confidence

                    </p>

                    <div className="mt-4 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-5 py-2.5">

                        <span className="font-space-grotesk text-2xl font-bold text-[var(--primary)]">

                            {analysis.confidence}%

                        </span>

                    </div>

                </div>

                {/* Divider */}

                <div className="my-8 h-px bg-[var(--border)]" />

                {/* Metrics */}

                <div className="space-y-5">

                    {[
                        ["😊 Smile", analysis.smile],
                        ["😔 Frown", analysis.frown],
                        ["😮 Jaw Open", analysis.jawOpen],
                        ["🤨 Brow Raise", analysis.browRaise],
                    ].map(([label, value]) => (

                        <div key={label}>

                            <div className="mb-2 flex items-center justify-between">

                                <span className="font-manrope text-sm text-[var(--text)]">

                                    {label}

                                </span>

                                <span className="font-space-grotesk text-sm font-bold text-[var(--primary)]">

                                    {value}%

                                </span>

                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-light)]">

                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${value}%` }}
                                    transition={{ duration: .6 }}
                                    className="h-full rounded-full bg-[var(--primary)]"
                                />

                            </div>

                        </div>

                    ))}

                </div>

            </motion.div>


        </div>
    );
}