import { motion } from "framer-motion";
import { Music4, Heart, Home, User, Compass } from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="mt-24 border-t border-[var(--border)] bg-[var(--surface)]">

            <div className="mx-auto max-w-7xl px-6 py-14">

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)] text-white">

                                <Music4 size={22} />

                            </div>

                            <div>

                                <h2 className="font-space-grotesk text-2xl font-bold">
                                    Moodify
                                </h2>

                                <p className="font-manrope text-sm text-[var(--text-muted)]">
                                    AI Emotion Music
                                </p>

                            </div>

                        </div>

                        <p className="mt-5 font-manrope leading-7 text-[var(--text-muted)]">

                            Discover beautiful Islamic nasheeds recommended through
                            AI-powered facial emotion recognition.

                        </p>
                        <span className="mt-4 inline-flex font-manrope font-extrabold tracking-[3px] rounded-full bg-[var(--surface-light)] px-3 py-1 text-xs text-[var(--primary)]">
                            Version 1.0 • AI Powered
                        </span>

                    </div>

                    {/* Navigation */}

                    <div>

                        <h3 className="mb-5 font-space-grotesk text-lg font-semibold">
                            Explore
                        </h3>

                        <div className="space-y-4">

                            <button className="flex items-center gap-3 text-[var(--text-muted)] transition hover:text-[var(--primary)]">
                                <Home size={18} />
                                Home
                            </button>

                            <button className="flex items-center gap-3 text-[var(--text-muted)] transition hover:text-[var(--primary)]">
                                <Compass size={18} />
                                Discover
                            </button>

                            <button className="flex items-center gap-3 text-[var(--text-muted)] transition hover:text-[var(--primary)]">
                                <User size={18} />
                                Profile
                            </button>

                        </div>

                    </div>

                    {/* Tech */}

                    <div>

                        <h3 className="mb-5 font-space-grotesk text-lg font-semibold">
                            Built With
                        </h3>

                        <div className="space-y-3 font-manrope text-[var(--text-muted)]">

                            <p>React</p>

                            <p>TensorFlow.js</p>

                            <p>MediaPipe</p>

                            <p>Tailwind CSS</p>

                        </div>

                    </div>

                    {/* Social */}

                    <div>

                        <h3 className="mb-5 font-space-grotesk text-lg font-semibold">
                            Connect
                        </h3>

                        <div className="flex gap-4">

                            <a
                                href="https://github.com/ziaulislamtech-oss"
                                target="-blank"
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-light)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
                            >
                                <FaGithub />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/ziaulislam-/"
                                target="-blank"
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-light)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
                            >
                                <FaLinkedin />
                            </a>

                            <a
                                href="mailto:ziaulislam.tech@email.com"

                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-light)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
                            >
                                <FaEnvelope />
                            </a>


                        </div>

                    </div>

                </div>

                {/* Bottom */}

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 md:flex-row"
                >

                    <p className="font-manrope text-sm text-[var(--text-muted)]">

                        © {new Date().getFullYear()} Moodify. All rights reserved.

                    </p>

                    <p className="flex items-center gap-2 font-manrope text-sm text-[var(--text-muted)]">

                        Built with

                        <Heart
                            size={15}
                            className="fill-red-500 text-red-500"
                        />

                        by <span className="font-semibold text-[var(--text)]">Zia-ul-Islam</span>

                    </p>

                </motion.div>

            </div>

        </footer>
    );
}