import { motion } from "framer-motion";
import {
  Search,
  Bell,
  Moon,
  UserCircle2,
  Upload,
  Menu,
  X
} from "lucide-react";

import FaceExpression from "../../Expression/components/FaceExpression";
import RecommendationCard from "../components/RecomendationsCard";
import useHome from "../hooks/useHome";
import AllSongs from "../components/AllSongs";
import Footer from "../components/Footer";
import GlobalMusicPlayer from "../components/GlobalMusicPlayer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {

  const { loading, song, allSongs, handleGetSong } = useHome()

  const [mobileMenu, setMobileMenu] = useState(false);
  

  const navigate = useNavigate()

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--text)]">

      {/* Background Glow */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-[var(--primary)]/10 blur-[180px]" />

        <div className="absolute right-[-220px] top-[20%] h-[420px] w-[420px] rounded-full bg-[var(--secondary)]/8 blur-[200px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-[1700px] px-8 py-6">

        {/* ========================= Navbar ========================= */}


        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden lg:flex mb-12 flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--card)]/80 px-8 py-4 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,.35)] "
        >

          {/* Logo */}

          <div>

            <h1 className="font-orbitron text-2xl font-bold tracking-wide">

              <span className="bg-gradient-to-r from-[var(--text)] to-[var(--primary)] bg-clip-text text-transparent">

                Moodify

              </span>

            </h1>

            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--text)]">

              AI Emotion Based Nasheeds

            </p>

          </div>

          {/* Search */}

          <div className=" hidden w-100  items-center gap-3 rounded-md border border-[var(--border)] bg-black/20 px-5 py-3 transition focus-within:border-[var(--primary)] lg:flex
">

            <Search size={20} className="text-[var(--text)]" />

            <input
              type="text"
              placeholder="Search Nasheeds..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--text-muted)]"
            />

          </div>

          {/* Right */}

          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate('/uploadsong')}
              className="flex justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 transition hover:border-[var(--primary)] hover:bg-[var(--card-hover)] ">

              Upload song

            </button>


            <button
              onClick={() => navigate('/profile')}
              className=" flex justify-center gap-2 text-center items-center px-3 py-1 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-[2px] ">

              <UserCircle2 size={38} /> Profile

            </button>

          </div>

        </motion.nav>

        {/* ========================= Mobile Navbar ========================= */}

        <motion.nav
          className="
    lg:hidden
    mb-8
    rounded-2xl
    border
    border-[var(--border)]
    bg-[var(--card)]
    p-4
    "
        >

          <div className="flex items-center justify-between">

            <div>

              <h1 className="font-orbitron text-xl font-bold">

                Moodify

              </h1>

              <p className="text-xs text-[var(--text-muted)]">

                AI Emotion

              </p>

            </div>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
            >

              {
                mobileMenu
                  ? <X size={28} />
                  : <Menu size={28} />
              }

            </button>

          </div>

          {
            mobileMenu && (

              <div className="mt-5 space-y-4">

                {/* Search */}

                <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-black/20 px-4 py-3">

                  <Search size={18} />

                  <input
                    placeholder="Search..."
                    className="w-full bg-transparent outline-none"
                  />

                </div>

                <button
                  onClick={() => navigate("/uploadsong")}
                  className="w-full rounded-xl bg-[var(--card-hover)] p-3"
                >

                  Upload Song

                </button>

                <button
                  onClick={() => navigate("/profile")}
                  className="w-full rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] p-3"
                >

                  Profile

                </button>

              </div>

            )
          }

        </motion.nav>

        {/* ========================= Hero ========================= */}

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .2 }}
          className="mb-20 flex flex-col items-center text-center"
        >


          <p className="font-manrope font-bold tracking-[5px] text-[var(--primary)]">EMOTION-AWARE NASHEED COMPANION</p>

          <h2 className="mt-2 max-w-3xl text-5xl tracking-[4px] font-space-grotesk font-extrabold leading-tight">Music that meets</h2>
          <h2 className="mt-2 max-w-3xl tracking-[5px] text-[var(--primary)] text-4xl font-space-grotesk font-extrabold leading-tight">your soul</h2>

          <p className="mt-5 font-manrope tracking-[2px] max-w-2xl text-lg leading-8 text-center text-slate-400">

            Look into the camera and let Moodify read your mood — then discover nasheeds chosen just for this moment.

          </p>

        </motion.section>

        {/* ========================= Scanner ========================= */}

       
        <FaceExpression getSong={handleGetSong}  />


        <RecommendationCard song={song} />
        <AllSongs allSongs={allSongs} />
      </div>
      <GlobalMusicPlayer />
      <Footer />
    </div>
  );
}