import { motion } from "framer-motion";
import {
    UserRound,
    CalendarDays,
    ScanFace,
    Pencil,
    Share2,
    Sparkles,
} from "lucide-react";

export default function ProfileHero({user}) {

    return (

        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5 }}
            className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8"
        >

            {/* Background Glow */}

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--primary)]/10 blur-3xl" />

            <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[var(--accent)]/10 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center text-center">

                {/* Avatar */}

                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-[var(--primary)] bg-[var(--surface-light)] shadow-lg">

                    <UserRound
                        size={56}
                        className="text-[var(--primary)]"
                    />

                </div>

                {/* Greeting */}

                <p className="mt-6 font-manrope text-sm uppercase tracking-[0.3em] text-[var(--primary)]">

                    Assalam-u-Alaikum

                </p>

                <h1 className="mt-2 font-space-grotesk text-5xl font-bold">

                    {user.username}

                </h1>

                <p className="mt-3 max-w-xl font-manrope text-[var(--text-muted)]">

                    Welcome back to your Moodify journey.
                    Discover your emotional patterns, revisit your favourite
                    nasheeds, and explore your listening insights.

                </p>

                {/* Badge */}

                <div className="mt-6 flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-5 py-2">

                    <Sparkles
                        size={16}
                        className="text-[var(--primary)]"
                    />

                    <span className="font-manrope text-sm text-[var(--primary)]">

                        Moodify Explorer

                    </span>

                </div>

                {/* Stats */}

                <div className="mt-10 flex flex-wrap items-center justify-center gap-8">

                    <div className="flex items-center gap-3">

                        <CalendarDays
                            size={18}
                            className="text-[var(--primary)]"
                        />

                        <div>

                            <p className="font-manrope text-xs text-[var(--text-muted)]">

                                Joined

                            </p>

                            <h4 className="font-space-grotesk font-semibold">

                                August 2026

                            </h4>

                        </div>

                    </div>

                    <div className="h-10 w-px bg-[var(--border)]" />

                    <div className="flex items-center gap-3">

                        <ScanFace
                            size={18}
                            className="text-[var(--primary)]"
                        />

                        <div>

                            <p className="font-manrope text-xs text-[var(--text-muted)]">

                                Emotion Scans

                            </p>

                            <h4 className="font-space-grotesk font-semibold">

                                32

                            </h4>

                        </div>

                    </div>

                </div>

                {/* Buttons */}

                {/* <div className="mt-10 flex flex-wrap justify-center gap-4">

                    <button className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 font-manrope font-semibold text-white transition hover:scale-105">

                        <Pencil size={18} />

                        Edit Profile

                    </button>

                    <button className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-light)] px-6 py-3 font-manrope font-semibold transition hover:border-[var(--primary)]">

                        <Share2 size={18} />

                        Share Journey

                    </button>

                </div> */}

            </div>

        </motion.section>

    );

}