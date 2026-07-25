import { motion } from "framer-motion";
import { useEffect, useState } from "react"
import {
  BrainCircuit,
  UploadCloud,
  Image,
  Database,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    icon: Image,
    text: "Uploading cover image...",
    color: "text-violet-400",
  },
  {
    icon: UploadCloud,
    text: "Uploading audio...",
    color: "text-cyan-400",
  },
  {
    icon: Database,
    text: "Saving metadata...",
    color: "text-emerald-400",
  },
];

export default function UploadLoader() {

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setActiveStep((prev) => (prev + 1) % steps.length);

    }, 2000);

    return () => clearInterval(interval);

  }, []);


  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg)] px-6">

      {/* Background Glow */}

      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-[var(--primary)]/20 blur-[180px]" />

      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-[var(--primary-glow)]/20 blur-[220px]" />
      {/* Floating Particles */}

      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-[var(--primary)]/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
          }}
        />
      ))}

      <div className="relative w-full max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10 shadow-xl backdrop-blur-md">

        {/* AI Core */}

        <div className="relative mx-auto h-28 w-28">

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="absolute inset-0 rounded-full bg-[var(--primary)] blur-xl opacity-70"
          />

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-full border border-[var(--primary)]/40"
          />

          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-3 rounded-full border border-[var(--primary)]/20"
          />

          <div className="absolute inset-6 flex items-center justify-center rounded-full bg-[var(--primary)] shadow-[0_0_30px_rgba(99,102,241,.35)]">

            <BrainCircuit size={38} />

          </div>

        </div>

        {/* Heading */}

        <h2 className="mt-10 text-center font-space-grotesk text-3xl font-bold text-[var(--text)]">

          AI Processing

        </h2>

        <motion.p
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="mt-3 flex items-center justify-center gap-2 font-manrope text-[var(--text-muted)]"
        >
          <Sparkles size={16} />
          Preparing your nasheed...
        </motion.p>

        {/* Progress */}

        <div className="mt-10 h-2 overflow-hidden rounded-full bg-[var(--surface-light)]">

          <motion.div
            className="h-2 rounded-full bg-[var(--primary)]"
            animate={{
              x: ["-50%", "500%"],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: "25%",
            }}
          />

        </div>

        {/* Steps */}

        <div className="mt-10 space-y-5">

          {steps.map((step, index) => {

            const Icon = step.icon;

            const isActive = activeStep === index;

            return (

              <motion.div
                key={step.text}
                animate={{
                  opacity: isActive ? 1 : 0.35,
                  scale: isActive ? 1.02 : 1,
                }}
                transition={{
                  duration: 0.4,
                }}
                className={`flex items-center gap-4 rounded-2xl border px-5 py-3 transition-all ${isActive
                    ? "border-violet-500/30 bg-violet-500/10"
                    : "border-white/5 bg-transparent"
                  }`}
              >

                <motion.div
                  animate={{
                    rotate: isActive ? 360 : 0,
                    scale: isActive ? 1.2 : 1,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                >
                  <Icon
                    size={22}
                    className={step.color}
                  />
                </motion.div>

                <span className="text-slate-300">

                  {step.text}

                </span>

              </motion.div>

            );

          })}

        </div>

        {/* Footer */}

        <p className="mt-10 text-center font-manrope text-sm text-[var(--text-muted)]">

          Please don't close this window while the upload completes.

        </p>

      </div>

    </div>
  );
}