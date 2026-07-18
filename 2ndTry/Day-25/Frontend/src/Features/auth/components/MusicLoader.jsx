export function MusicLoader() {
  return (
    <div className="flex items-end gap-1 h-5">
      {[10, 18, 28, 18, 10].map((height, i) => (
        <span
          key={i}
          className="w-1 rounded-full bg-white animate-pulse"
          style={{
            height: `${height}px`,
            animationDelay: `${i * 0.12}s`,
            animationDuration: "0.8s",
          }}
        />
      ))}
    </div>
  );
}