import { motion } from "framer-motion";
import {
    BrainCircuit,
    TrendingUp,
} from "lucide-react";

const moods = [
    {
        mood: "Happy",
        emoji: "😊",
        percentage: 52,
    },
    {
        mood: "Calm",
        emoji: "😌",
        percentage: 27,
    },
    {
        mood: "Neutral",
        emoji: "😐",
        percentage: 14,
    },
    {
        mood: "Sad",
        emoji: "😔",
        percentage: 7,
    },
];

export default function MoodChart() {

    return (

        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8"
        >

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <p className="font-manrope text-sm text-[var(--primary)]">

                        AI Mood Analytics

                    </p>

                    <h2 className="mt-2 font-space-grotesk text-3xl font-bold">

                        Weekly Emotion Report

                    </h2>

                    <p className="mt-2 font-manrope text-[var(--text-muted)]">

                        Based on your recent facial emotion scans.

                    </p>

                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--primary)] text-white">

                    <BrainCircuit size={26} />

                </div>

            </div>

            {/* Bars */}

            <div className="mt-10 space-y-7">

                {moods.map((item, index) => (

                    <div key={item.mood}>

                        <div className="mb-2 flex items-center justify-between">

                            <div className="flex items-center gap-3">

                                <span className="text-2xl">

                                    {item.emoji}

                                </span>

                                <span className="font-manrope font-medium">

                                    {item.mood}

                                </span>

                            </div>

                            <span className="font-space-grotesk font-bold text-[var(--primary)]">

                                {item.percentage}%

                            </span>

                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-[var(--surface-light)]">

                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{
                                    width: `${item.percentage}%`,
                                }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: .8,
                                    delay: index * .15,
                                }}
                                className="h-full rounded-full bg-[var(--primary)]"
                            />

                        </div>

                    </div>

                ))}

            </div>

            {/* Insight */}

            <div className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--surface-light)] p-6">

                <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary)] text-white">

                        <TrendingUp size={22} />

                    </div>

                    <div>

                        <h3 className="font-space-grotesk text-lg font-semibold">

                            AI Insight

                        </h3>

                        <p className="mt-2 font-manrope leading-7 text-[var(--text-muted)]">

                            You appeared <span className="font-semibold text-[var(--primary)]">Happy</span> in
                            most of your scans this week. Your listening
                            history suggests that motivational nasheeds help
                            maintain a positive emotional state.

                        </p>

                    </div>

                </div>

            </div>

        </motion.section>

    );

}