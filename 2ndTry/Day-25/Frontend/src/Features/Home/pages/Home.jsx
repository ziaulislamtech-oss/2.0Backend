import { motion } from 'framer-motion';
import { Search, Bell, User, Camera, BrainCircuit, Play, Heart, RefreshCw, Sparkles, Music4, } from 'lucide-react';

import FaceExpression from '../../Expression/components/FaceExpression'

const recentNasheeds = [
    {
        title: 'Ya Hayyu Ya Qayyum',
        artist: 'Mishary Alafasy',
    },
    {
        title: 'Tala Al Badru',
        artist: 'Maher Zain',
    },
    {
        title: 'Hasbi Rabbi',
        artist: 'Sami Yusuf',
    },
];

const Home = () => {
    return (
        <div className='min-h-screen  bg-[#09090B] text-white'>

            {/* Background Glow */}

            <div className='absolute left-0 top-0 h-96 w-96 rounded-full bg-violet-600/20 blur-[160px]' />

            <div className='absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[200px]' />

            {/* Navbar */}

            <header className='sticky top-0 z-50 border-b border-white/10 bg-[#09090B]/80 backdrop-blur-xl'>

                <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6'>

                    {/* Logo */}

                    <div className='flex   items-center gap-3 w-50 h-20'>

                        {/* <img className='w-[200px]' src={'logo.png'} alt="" /> */}
                        <h2 className='text-2xl font-bold'>Moodify</h2>
                        
                    </div>

                    {/* Search */}

                    <div className='hidden flex-1 justify-center md:flex'>

                        <div className='flex w-full max-w-md items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2'>

                            <Search size={18} className='text-zinc-400' />

                            <input
                                type='text'
                                placeholder='Search nasheeds, artists...'
                                className='w-full bg-transparent text-sm outline-none placeholder:text-zinc-500'
                            />

                        </div>

                    </div>

                    {/* Right */}

                    <div className='flex items-center gap-3'>

                        <button className='rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10'>

                            <Bell size={18} />

                        </button>

                        <button className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 font-semibold'>

                            Z

                        </button>

                    </div>

                </div>

            </header>

            {/* Main */}

            <main className='relative mx-auto max-w-7xl px-6 py-8'>

                {/* Greeting */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='mb-8'>

                    <div className='flex items-center gap-2 text-violet-300'>

                        <Sparkles size={18} />

                        <span className='text-sm font-medium'>

                            Assalamu Alaikum

                        </span>

                    </div>

                    <h2 className='mt-2 text-4xl font-black'>

                        How are you feeling today?

                    </h2>

                    <p className='mt-3 text-zinc-400'>

                        Let AI analyze your expression and find a meaningful Arabic or Urdu Nasheed for your current mood.

                    </p>

                </motion.div>

                {/* Hero Grid */}

               <FaceExpression/>

                {/* Recommendation */}

                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl'
                >

                    <div className='mb-6 flex items-center justify-between'>

                        <div>

                            <h3 className='text-2xl font-bold'>

                                Recommended For You

                            </h3>

                            <p className='text-zinc-400'>

                                Based on your current emotional state

                            </p>

                        </div>

                        <button className='flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10'>

                            <RefreshCw size={16} />

                            Refresh

                        </button>

                    </div>

                    <div className='grid gap-6 lg:grid-cols-[220px_1fr]'>

                        {/* Album Art */}

                        <div className='aspect-square overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/30 to-cyan-500/20'>

                            <div className='flex h-full items-center justify-center'>

                                <div className='text-center'>

                                    <Music4 size={56} className='mx-auto text-violet-200' />

                                    <p className='mt-3 text-sm text-violet-100'>

                                        Album Art

                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Content */}

                        <div className='flex flex-col justify-between'>

                            <div>

                                <div className='inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-3 py-1 text-sm text-violet-300'>

                                    <Sparkles size={14} />

                                    AI Match

                                </div>

                                <h4 className='mt-4 text-3xl font-black'>

                                    Ya Hayyu Ya Qayyum

                                </h4>

                                <p className='mt-2 text-lg text-zinc-300'>

                                    Mishary Rashid Alafasy

                                </p>

                                <p className='mt-4 max-w-2xl leading-7 text-zinc-400'>

                                    This Nasheed was selected because its calm rhythm and reflective tone align closely with your detected emotional state of peaceful contemplation.

                                </p>

                            </div>

                            {/* Controls */}

                            <div className='mt-8 flex flex-wrap items-center gap-4'>

                                <button className='flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 font-semibold shadow-lg shadow-violet-500/20 hover:opacity-90'>

                                    <Play size={18} fill='currentColor' />

                                    Play Now

                                </button>

                                <button className='flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 hover:bg-white/10'>

                                    <Heart size={18} />

                                    Save

                                </button>

                            </div>

                        </div>

                    </div>

                </motion.section>

                {/* Recently Played */}

                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className='mt-8'
                >

                    <div className='mb-5 flex items-center justify-between'>

                        <div>

                            <h3 className='text-2xl font-bold'>

                                Recently Played

                            </h3>

                            <p className='text-zinc-400'>

                                Continue listening where you left off

                            </p>

                        </div>

                    </div>

                    <div className='grid gap-4 md:grid-cols-3'>

                        {recentNasheeds.map((item, index) => (
                            <motion.div
                                key={item.title}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.2 }}
                                className='rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl'
                            >

                                <div className='mb-4 aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-500/20'>

                                    <div className='flex h-full items-center justify-center'>

                                        <Music4 className='text-violet-200' size={36} />

                                    </div>

                                </div>

                                <h4 className='font-semibold'>{item.title}</h4>

                                <p className='mt-1 text-sm text-zinc-400'>{item.artist}</p>

                                <button className='mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2 text-sm hover:bg-white/10'>

                                    <Play size={16} />

                                    Play Again

                                </button>

                            </motion.div>
                        ))}

                    </div>

                </motion.section>

            </main>

        </div>
    );
};

export default Home;