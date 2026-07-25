import { motion } from "framer-motion";
import {
    Play,
    Clock3,
    Music4,
} from "lucide-react";

const recentSongs = [
    {
        id: 1,
        title: "Be Happy",
        artist: "Othman Al Ibrahim",
        duration: "3:42",
        cover:
            "https://ik.imagekit.io/18kjj0yy3/songs/nasheedDefaultPoster.jpg",
    },
    {
        id: 2,
        title: "Hasbi Rabbi",
        artist: "Mesut Kurtis",
        duration: "4:15",
        cover:
            "https://ik.imagekit.io/18kjj0yy3/songs/nasheedDefaultPoster.jpg",
    },
    {
        id: 3,
        title: "The Way of Tears",
        artist: "Muhammad Al Muqit",
        duration: "5:03",
        cover:
            "https://ik.imagekit.io/18kjj0yy3/songs/nasheedDefaultPoster.jpg",
    },
    {
        id: 4,
        title: "Ya Nabi Salam",
        artist: "Maher Zain",
        duration: "4:37",
        cover:
            "https://ik.imagekit.io/18kjj0yy3/songs/nasheedDefaultPoster.jpg",
    },
];

export default function RecentSongs() {

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

                        Recently Played

                    </p>

                    <h2 className="mt-1 font-space-grotesk text-2xl font-bold">

                        Your Last Sessions

                    </h2>

                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)] text-white">

                    <Music4 size={22} />

                </div>

            </div>

            {/* Songs */}

            <div className="space-y-4">

                {recentSongs.map((song, index) => (

                    <motion.div
                        key={song.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * .08 }}
                        whileHover={{
                            x: 6,
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

                        <div className="flex items-center gap-6">

                            <div className="flex items-center gap-2 font-manrope text-sm text-[var(--text-muted)]">

                                <Clock3 size={16} />

                                {song.duration}

                            </div>

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

        </motion.section>

    );

}