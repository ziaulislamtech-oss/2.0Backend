import { motion } from "framer-motion";
import {
  Play,
  Heart,
  Globe,
  Smile,
  Music4,
} from "lucide-react";
import useHome from "../hooks/useHome";
import { useEffect } from "react";

export default function AllSongs() {

  const {
    allSongs,
    handleGetAllSongs,
    currentSong,
    isPlaying,
    toggleSong,
  } = useHome();

  useEffect(() => {
    handleGetAllSongs()
  }, [])

  console.log("------ : ", allSongs)
  return (
    <section className="mt-16">

      {/* Heading */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-black text-white">

            All Nasheeds

          </h2>

          <p className="mt-2 text-slate-400">

            Explore your complete Moodify library

          </p>

        </div>

        <div className=" rounded-lg border border-[var(--border)] bg-[var(--surface-light)] px-4 py-2 font-manrope text-sm font-medium text-[var(--primary)] "
        >

          {allSongs.length} Nasheeds

        </div>

      </div>

      {/* Cards */}

      <div className="grid  gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {allSongs.map((song, index) => (

          <motion.div
            key={song._id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{
              y: 0,
              scale: 1,
            }}
            className=" group overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)] shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[var(--primary)] "
          >

            {/* Cover */}

            <div className="relative  h-52 overflow-hidden ">

              <img
                src={song.coverImage}
                alt={song.title}
                className=" h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <button
                onClick={() => toggleSong(song)}
                className=" absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary)] text-white opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-1 hover:bg-[var(--primary-hover)] "
              >
                {
                  currentSong?._id === song._id && isPlaying
                    ? "⏸"
                    : <Play size={20} fill="white" />
                }
              </button>

            </div>

            {/* Content */}

            <div className="p-6">

              <h3 className="truncate font-space-grotesk text-xl font-bold text-[var(--text)]">

                {song.title}

              </h3>

              <p className="mt-2 truncate font-manrope text-sm text-[var(--text-muted)]">

                {song.artist}

              </p>

              {/* Tags */}

              <div className="mt-4 flex flex-wrap gap-2">

                <span className="flex items-center gap-1 rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">

                  <Smile size={14} />

                  {song.mood}

                </span>

                <span className="flex items-center gap-1 rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">

                  <Globe size={14} />

                  {song.language}

                </span>

              </div>

              {/* Description */}

              <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-400">

                {song.description}

              </p>

              {/* Footer */}

              <div className="mt-6 flex items-center justify-between">

                <button
                  onClick={() => toggleSong(song)}
                  className="flex items-center gap-2 rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold transition hover:bg-violet-500"
                >
                  {
                    currentSong?._id === song._id && isPlaying
                      ? (
                        <>
                          ⏸ Pause
                        </>
                      )
                      : (
                        <>
                          <Play size={16} />
                          Play
                        </>
                      )
                  }
                </button>

                <button
                  disabled
                  className="cursor-not-allowed rounded-md border border-white/10 p-2 opacity-60"
                >
                  <Heart size={18} />
                </button>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

      {/* Empty State */}

      {allSongs.length === 0 && (

        <div className="flex h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-[#151D2D]">

          <Music4
            size={60}
            className="text-slate-600"
          />

          <h3 className="mt-6 text-2xl font-bold">

            No Nasheeds Found

          </h3>

          <p className="mt-2 text-slate-500">

            Upload your first nasheed to get started.

          </p>

        </div>

      )}

    </section>
  );
}