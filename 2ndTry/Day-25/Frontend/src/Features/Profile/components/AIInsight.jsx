import { motion } from "framer-motion";
import {
  Sparkles,
  Smile,
  MoonStar,
  Music2,
  BrainCircuit,
} from "lucide-react";

export default function AIInsight() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="
        mt-8
        rounded-2xl
        border border-[var(--border)]
        bg-[var(--surface)]
        p-7
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div
            className="
              flex h-14 w-14 items-center justify-center
              rounded-xl
              bg-[var(--primary)]
              text-white
              shadow-lg
            "
          >
            <BrainCircuit size={28} />
          </div>

          <div>
            <h2 className="font-space-grotesk text-2xl font-bold text-[var(--text)]">
              AI Mood Insight
            </h2>

            <p className="mt-1 font-manrope text-sm text-[var(--text-muted)]">
              Personalized analysis based on your listening history.
            </p>
          </div>

        </div>

        <div
          className="
            flex items-center gap-2
            rounded-full
            border border-[var(--border)]
            bg-[var(--surface-light)]
            px-4 py-2
          "
        >
          <Sparkles
            size={16}
            className="text-[var(--primary)]"
          />

          <span className="text-sm font-semibold text-[var(--primary)]">
            Moodify AI
          </span>
        </div>

      </div>

      {/* Insight */}

      <div
        className="
          mt-8
          rounded-xl
          border border-[var(--border)]
          bg-[var(--surface-light)]
          p-6
        "
      >
        <p className="font-manrope text-lg leading-8 text-[var(--text)]">
          Over the past month, you've mostly listened to uplifting nasheeds
          during the evening. Your listening habits suggest that peaceful,
          motivational recitations help you relax after a busy day.
        </p>

        <p className="mt-5 font-manrope text-[var(--text-muted)]">
          Keep exploring positive nasheeds to maintain consistency and improve
          your overall listening experience.
        </p>
      </div>

      {/* Stats */}

      <div className="mt-8 grid gap-4 md:grid-cols-3">

        <div
          className="
            rounded-xl
            border border-[var(--border)]
            bg-[var(--surface-light)]
            p-5
          "
        >
          <div className="mb-3 flex items-center gap-3">

            <Smile
              size={20}
              className="text-yellow-400"
            />

            <span className="font-manrope text-sm text-[var(--text-muted)]">
              Most Detected Mood
            </span>

          </div>

          <h3 className="font-space-grotesk text-2xl font-bold">
            Happy
          </h3>

          <p className="mt-1 text-sm text-[var(--text-muted)]">
            62% of scans
          </p>

        </div>

        <div
          className="
            rounded-xl
            border border-[var(--border)]
            bg-[var(--surface-light)]
            p-5
          "
        >
          <div className="mb-3 flex items-center gap-3">

            <MoonStar
              size={20}
              className="text-indigo-400"
            />

            <span className="font-manrope text-sm text-[var(--text-muted)]">
              Favorite Time
            </span>

          </div>

          <h3 className="font-space-grotesk text-2xl font-bold">
            Evening
          </h3>

          <p className="mt-1 text-sm text-[var(--text-muted)]">
            7 PM – 10 PM
          </p>

        </div>

        <div
          className="
            rounded-xl
            border border-[var(--border)]
            bg-[var(--surface-light)]
            p-5
          "
        >
          <div className="mb-3 flex items-center gap-3">

            <Music2
              size={20}
              className="text-green-400"
            />

            <span className="font-manrope text-sm text-[var(--text-muted)]">
              Listening Sessions
            </span>

          </div>

          <h3 className="font-space-grotesk text-2xl font-bold">
            48
          </h3>

          <p className="mt-1 text-sm text-[var(--text-muted)]">
            This month
          </p>

        </div>

      </div>
    </motion.section>
  );
}