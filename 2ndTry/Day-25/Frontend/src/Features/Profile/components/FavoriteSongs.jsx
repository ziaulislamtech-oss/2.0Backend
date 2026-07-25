import { motion } from "framer-motion";
import {
    Heart,
    Play,
    Music4,
} from "lucide-react";

const favoriteSongs = [
    {
        id: 1,
        title: "Be Happy",
        artist: "Othman Al Ibrahim",
        mood: "Happy",
        cover:
            "https://ik.imagekit.io/18kjj0yy3/songs/nasheedDefaultPoster.jpg",
    },
    {
        id: 2,
        title: "Hasbi Rabbi",
        artist: "Mesut Kurtis",
        mood: "Calm",
        cover:
            "https://ik.imagekit.io/18kjj0yy3/songs/nasheedDefaultPoster.jpg",
    },
    {
        id: 3,
        title: "The Way of Tears",
        artist: "Muhammad Al Muqit",
        mood: "Peaceful",
        cover:
            "https://ik.imagekit.io/18kjj0yy3/songs/nasheedDefaultPoster.jpg",
    },
];

export default function FavoriteSongs() {

    return (

        <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
        >

            {/* Header */}

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <p className="font-manrope text-sm text-[var(--primary)]">

                        Favorite Collection

                    </p>

                    <h2 className="mt-1 font-space-grotesk text-2xl font-bold">

                        Loved Nasheeds

                    </h2>

                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)] text-white">

                    <Heart size={22} fill="white" />

                </div>

            </div>

            {/* Songs */}

            <div className="space-y-4">

                {favoriteSongs.map((song, index) => (

                    <motion.div
                        key={song.id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: index * .08,
                        }}
                        whileHover={{
                            scale: 1.02,
                        }}
                        className="group flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-light)] p-4 transition"
                    >

                        {/* Left */}

                        <div className="flex items-center gap-4">

                            <img
                                src={song.cover}
                                alt={song.title}
                                className="h-14 w-14 rounded-lg object-cover"
                            />

                            <div>

                                <h3 className="font-space-grotesk font-semibold">

                                    {song.title}

                                </h3>

                                <p className="mt-1 font-manrope text-sm text-[var(--text-muted)]">

                                    {song.artist}

                                </p>

                            </div>

                        </div>

                        {/* Right */}

                        <div className="flex items-center gap-3">

                            <span className="rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-medium text-[var(--primary)]">

                                {song.mood}

                            </span>

                            <button
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-white transition hover:scale-110"
                            >

                                <Play
                                    size={18}
                                    fill="white"
                                />

                            </button>

                        </div>

                    </motion.div>

                ))}

            </div>

            {/* Footer */}

            <div className="mt-8 rounded-xl border border-dashed border-[var(--border)] p-5 text-center">

                <Music4
                    size={28}
                    className="mx-auto text-[var(--primary)]"
                />

                <p className="mt-3 font-manrope text-sm text-[var(--text-muted)]">

                    Your favorite nasheeds will appear here once you start
                    saving them.

                </p>

            </div>

        </motion.section>

    );

}