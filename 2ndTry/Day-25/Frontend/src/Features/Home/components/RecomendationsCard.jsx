import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Heart,
  RotateCcw,
  Music4,
  Clock3,
  Sparkles,
} from "lucide-react";

import useHome from "../hooks/useHome";

export default function RecommendationCard({
  song,
  onRefresh = () => { },
}) {

  const {
    currentSong,
    isPlaying,
    toggleSong,
    currentTime,
    duration,
    audioRef,
  } = useHome();

  const isCurrentSong = currentSong?._id === song?._id;

  function formatTime(time) {

    if (!time) return "0:00";

    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);

    return `${min}:${sec.toString().padStart(2, "0")}`;

  }

  if (!song) {

    return (

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 rounded-[32px] border border-white/5 bg-[#141D2D]/90 p-10 backdrop-blur-xl"
      >

        <div className="flex flex-col items-center justify-center py-10">

          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-600/20 to-cyan-500/20">

            <Music4
              size={42}
              className="text-violet-300"
            />

          </div>

          <h2 className="text-3xl font-bold">

            No Recommendation Yet

          </h2>

          <p className="mt-3 max-w-lg text-center text-slate-400">

            Scan your face and let Moodify understand your emotions to
            recommend a meaningful Arabic or Urdu Nasheed.

          </p>

        </div>

      </motion.div>

    );

  }

  return (

    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .5 }}
      className=" mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl backdrop-blur-md
"
    >

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <p className="font-manrope text-sm font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
            AI Recommendation
          </p>

          <h2 className="mt-2 font-space-grotesk text-3xl font-bold text-[var(--text)]">

            Recommended Nasheed

          </h2>

        </div>

        <div className=" rounded-lg border border-[var(--border)] bg-[var(--surface-light)] px-4 py-2 ">

          <div className="flex items-center gap-2">

            <Sparkles
              size={15}
              className="text-[var(--primary)]"
            />

            <span className="font-manrope text-sm font-medium text-[var(--primary)]">

              Perfect Match

            </span>

          </div>

        </div>

      </div>

      {/* Content */}

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

        {/* Cover */}

        <div className=" overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-light)] ">

          <img
            src={song.coverImage}
            alt={song.title}
            className=" aspect-square w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />

        </div>

        {/* Details */}

        <div className="flex flex-col justify-between">

          <div>

            <h3 className=" font-space-grotesk text-4xl font-bold text-[var(--text)] ">

              {song.title}

            </h3>

            <p className=" mt-2 font-manrope text-lg text-[var(--text-muted)] ">

              {song.artist}

            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              <div className=" rounded-lg border border-[var(--border)] bg-[var(--surface-light)] px-4 py-2 font-manrope text-sm text-[var(--primary)] ">

                {song.mood}

              </div>

              <div className=" rounded-lg border border-[var(--border)] bg-[var(--surface-light)] px-4 py-2 font-manrope text-sm text-[var(--primary)] ">

                Arabic

              </div>

              <div className=" flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-light)] px-4 py-2 font-manrope text-sm text-[var(--text-muted)] ">

                <Clock3 size={16} />

                {song.duration}

              </div>

            </div>

            <p
              className=" mt-8 max-w-2xl font-manrope leading-8 text-[var(--text-muted)]">

              {song.description}

            </p>

          </div>

          {/* Progress */}

          <div className="mt-10">

            <div className="mb-3 flex justify-between font-manrope text-sm text-[var(--text-muted)]">

              <span>

                {isCurrentSong
                  ? formatTime(currentTime)
                  : "0:00"}

              </span>

              <span>

                {isCurrentSong
                  ? formatTime(duration)
                  : song.duration}

              </span>

            </div>

            <input
              type="range"
              min={0}
              max={duration || 0}
              value={isCurrentSong ? currentTime : 0}
              disabled={!isCurrentSong}
              onChange={(e) => {

                audioRef.current.currentTime = Number(e.target.value);

              }}
              className="
        h-1.5
        w-full
        cursor-pointer
        accent-[var(--primary)]
        disabled:cursor-not-allowed
        disabled:opacity-40
    "
            />

          </div>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap gap-3">

            <button
              onClick={() => toggleSong(song)}
              className="
        flex
        items-center
        gap-3
        rounded-xl
        bg-[var(--primary)]
        px-7
        py-3.5
        font-manrope
        font-semibold
        text-white
        transition-all
        duration-300
        hover:bg-[var(--primary-hover)]
        hover:shadow-lg
    "
            >

              {isCurrentSong && isPlaying
                ? <Pause size={18} />
                : <Play size={18} />}

              {isCurrentSong && isPlaying
                ? "Pause"
                : "Play"}

            </button>

            <button
              disabled
              className=" flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-light)] px-7 py-3.5 font-manrope text-[var(--text-muted)] opacity-60 cursor-not-allowed
"
            >

              <Heart size={20} />

              Save

            </button>

            <button
              onClick={onRefresh}
              className=" flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-light)] px-7 py-3.5 font-manrope text-[var(--text)] transition-all duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >

              <RotateCcw size={20} />

              Scan Again

            </button>

          </div>

        </div>

      </div>

    </motion.div>

  );

}