import { motion } from "framer-motion";

import ProfileHero from "../components/ProfileHero.jsx.jsx";
import StatsCards from "../components/StatsCards.jsx";
import MoodChart from "../components/MoodChart.jsx";
import RecentSongs from "../components/RecentSongs.jsx";
import FavoriteSongs from "../components/FavoriteSongs.jsx";
import AIInsight from "../components/AIInsight.jsx";
import AccountCard from "../components/AccountCard.jsx";
import ListeningActivity from "../components/ListeningActivity.jsx";
import BackButton from "../../../shared/BackButton.jsx";
import useAuth from "../../auth/hook/useAuth.js";


export default function Profile() {

    const {user,handleLogout} = useAuth()
    console.log('Profile : ' ,user)

    return (

        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        
            <BackButton />
            <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">

                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <ProfileHero user={user} />
                </motion.div>

                {/* <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: .1 }}
                >
                    <StatsCards />
                </motion.div> */}

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: .15 }}
                >
                    <MoodChart />
                </motion.div>

                {/* <motion.div
                    className="grid gap-8 lg:grid-cols-2"
                >

                    <RecentSongs />

                    <FavoriteSongs />

                </motion.div> */}

                {/* <ListeningActivity/> */}

                <AccountCard logOut={handleLogout} />

            </div>

        </div>

    );

}