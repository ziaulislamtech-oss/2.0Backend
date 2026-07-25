import { motion } from "framer-motion";
import {
    SmilePlus,
    Music4,
    Heart,
    Clock3,
} from "lucide-react";

const stats = [
    {
        title: "Today's Mood",
        value: "😊 Happy",
        subtitle: "Most detected emotion",
        icon: SmilePlus,
    },
    {
        title: "Songs Played",
        value: "126",
        subtitle: "Total listening sessions",
        icon: Music4,
    },
    {
        title: "Favorites",
        value: "18",
        subtitle: "Saved nasheeds",
        icon: Heart,
    },
    {
        title: "Listening Time",
        value: "8.4 hrs",
        subtitle: "This week",
        icon: Clock3,
    },
];

export default function StatsCards() {

    return (

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((item, index) => {

                const Icon = item.icon;

                return (

                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: .4,
                            delay: index * .08,
                        }}
                        whileHover={{
                            y: -6,
                            scale: 1.02,
                        }}
                        className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
                    >

                        {/* Glow */}

                        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--primary)]/10 blur-3xl transition group-hover:bg-[var(--primary)]/20" />

                        {/* Icon */}

                        <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--primary)] text-white shadow-lg">

                            <Icon size={24} />

                        </div>

                        {/* Content */}

                        <div className="relative mt-6">

                            <p className="font-manrope text-sm text-[var(--text-muted)]">

                                {item.title}

                            </p>

                            <h3 className="mt-2 font-space-grotesk text-3xl font-bold">

                                {item.value}

                            </h3>

                            <p className="mt-2 font-manrope text-sm text-[var(--text-muted)]">

                                {item.subtitle}

                            </p>

                        </div>

                    </motion.div>

                );

            })}

        </section>

    );

}