import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Moon,
  Bell,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function AccountCard({logOut}) {
  const settings = [
    {
      icon: User,
      title: "Edit Profile",
      subtitle: "Update your personal information",
    },
    {
      icon: Mail,
      title: "Email Address",
      subtitle: "zia@example.com",
    },
    {
      icon: Lock,
      title: "Change Password",
      subtitle: "Keep your account secure",
    },
    {
      icon: Moon,
      title: "Appearance",
      subtitle: "Dark Mode Enabled",
    },
    {
      icon: Bell,
      title: "Notifications",
      subtitle: "Manage app notifications",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        mt-8
        rounded-2xl
        border border-[var(--border)]
        bg-[var(--surface)]
        p-7
      "
    >
      {/* Header */}

      {/* <div className="mb-8">

        <h2 className="font-space-grotesk text-2xl font-bold">
          Account Settings
        </h2>

        <p className="mt-1 font-manrope text-[var(--text-muted)]">
          Manage your Moodify account and preferences.
        </p>

      </div> */}

      {/* Setting Items */}

      {/* <div className="space-y-4">

        {settings.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="
                flex
                w-full
                items-center
                justify-between
                rounded-xl
                border border-[var(--border)]
                bg-[var(--surface-light)]
                p-5
                transition-all
                hover:border-[var(--primary)]
                hover:bg-[var(--surface-hover)]
              "
            >
              <div className="flex items-center gap-4">

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-[var(--primary)]
                    text-white
                  "
                >
                  <Icon size={20} />
                </div>

                <div className="text-left">

                  <h3 className="font-space-grotesk text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="font-manrope text-sm text-[var(--text-muted)]">
                    {item.subtitle}
                  </p>

                </div>

              </div>

              <ChevronRight
                size={20}
                className="text-[var(--text-muted)]"
              />
            </button>
          );
        })}

      </div> */}

      {/* Logout */}

      <button
      onClick={logOut}
        className="
          mt-8
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-xl
          border
          border-red-500/30
          bg-red-500/10
          py-4
          font-semibold
          text-red-400
          transition-all
          hover:bg-red-500/20
        "
      >
        <LogOut size={20} />
        Logout
      </button>
    </motion.section>
  );
}