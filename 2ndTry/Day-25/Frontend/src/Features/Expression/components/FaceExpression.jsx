import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import { motion } from 'framer-motion'
import { Search, Bell, User, Camera, BrainCircuit, Play, Heart, RefreshCw, Sparkles, Music4, } from 'lucide-react';


export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);
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
        init({ landmarkerRef, videoRef, streamRef });

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick() {
        const expression = detect({ landmarkerRef, videoRef, setExpression, setAnalysis })
        console.log(expression)
        onClick(expression)
    }


    return (
       
        <div className='grid gap-6  lg:grid-cols-[1.1fr_0.9fr]'>

            {/* Webcam Card */}

            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className='rounded-3xl border  border-white/10 bg-white/5 p-6 backdrop-blur-xl'
            >

                <div className='mb-4 flex   items-center justify-between'>

                    <div>

                        <h3 className='text-xl font-bold'>

                            AI Face Scanner

                        </h3>

                        <p className='text-sm text-zinc-400'>

                            Real-time emotion recognition

                        </p>

                    </div>

                    <div className='flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300'>

                        <span className='h-2 w-2 rounded-full bg-emerald-400' />

                        Live

                    </div>

                </div>

                {/* Webcam Area */}

                <div className='relative flex flex-col justify-center aspect-video overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-950/40 to-cyan-950/30'>

                    {/* Placeholder */}

                    <div className='flex h-full items-center justify-center'>

                       
                        <video
                            ref={videoRef}
                            
                            className="w-[100%]  rounded-2xl scale-x-[-1] transform  "
                            playsInline
                        />

                    </div>

                    {/* Scan Line */}

                    <motion.div
                        className='absolute left-0 h-[2px] w-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]'
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />

                </div>

                {/* Scanner Status */}

                <div className='mt-5  flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3'>

                    <div className='flex items-center gap-3'>

                        <BrainCircuit className='text-violet-400' size={22} />

                        <div>

                            <p className='font-medium'>

                                AI Status

                            </p>

                            <p className='text-sm text-zinc-400'>

                                Scanning facial landmarks...
                                

                            </p>

                        </div>

                    </div>

                    <button onClick={handleClick} className='rounded-xl bg-gradient-to-r px-15 py-4 from-violet-600 to-cyan-500 px-4 py-2 text-sm font-semibold hover:opacity-90 hover:cursor-pointer '>

                        Scan Face

                    </button>

                </div>

            </motion.div>

            {/* Emotion Card */}

            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className='rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl'
            >

                <div className='mb-6 flex items-center justify-between'>

                    <div>

                        <h3 className='text-xl font-bold'>

                            Detected Emotion

                        </h3>

                        <p className='text-sm text-zinc-400'>

                            Latest AI prediction

                        </p>

                    </div>

                    <div className='rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300'>

                        96%

                    </div>

                </div>

                {/* Emotion Display */}

                <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 to-cyan-500/10 p-8 text-center">

                    <div className="text-7xl">
                        {analysis.emotion === "Happy"
                            ? "😊"
                            : analysis.emotion === "Sad"
                                ? "😔"
                                : analysis.emotion === "Surprised"
                                    ? "😲"
                                    : "😐"}
                    </div>

                    <h4 className="mt-4 text-3xl font-black">
                        {analysis.emotion}
                    </h4>

                    <p className="mt-2 text-zinc-300">
                        Confidence {analysis.confidence}%
                    </p>

                </div>

                {/* Confidence Bars */}

                <div className='mt-6 space-y-4'>

                    {
                        [
                            ["Smile", analysis.smile],
                            ["Frown", analysis.frown],
                            ["Jaw Open", analysis.jawOpen],
                            ["Eyebrow Raise", analysis.browRaise],
                        ].map(([label, value]) => (
                            <div key={label}>
                                <div className="mb-2 flex justify-between text-sm">
                                    <span>{label}</span>
                                    <span className="text-zinc-400">{value}%</span>
                                </div>

                                <div className="h-2 rounded-full bg-white/10">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${value}%` }}
                                        transition={{ duration: 0.6 }}
                                        className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                                    />
                                </div>
                            </div>
                        ))
                    }

                </div>

            </motion.div>

        </div>
    );
}