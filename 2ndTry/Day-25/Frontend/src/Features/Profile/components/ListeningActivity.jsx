import { motion } from "framer-motion";

const data = [
  45,
  72,
  38,
  90,
  55,
  68,
  82,
];

export default function ListeningActivity() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        rounded-2xl
        border border-[var(--border)]
        bg-[var(--surface)]
        p-6
      "
    >
      <div className="mb-6">
        <h3 className="font-space-grotesk text-xl font-bold">
          Weekly Listening
        </h3>

        <p className="mt-1 font-manrope text-sm text-[var(--text-muted)]">
          Your activity over the last 7 days
        </p>
      </div>

      <div className="flex h-56 items-end justify-between gap-4">
        {data.map((value, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col items-center gap-3"
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${value}%` }}
              transition={{
                delay: index * 0.08,
                duration: 0.6,
              }}
              className="
                w-full
                rounded-xl
                bg-gradient-to-t
                from-[var(--primary)]
                to-[var(--primary-light)]
              "
            />

            <span className="text-xs text-[var(--text-muted)]">
              {days[index]}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}