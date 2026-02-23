const words = [
  { text: "Clean Air", size: 48, opacity: 1 },
  { text: "Jobs", size: 40, opacity: 0.9 },
  { text: "Health", size: 44, opacity: 1 },
  { text: "Economy", size: 36, opacity: 0.85 },
  { text: "Timeline", size: 32, opacity: 0.8 },
  { text: "Small Business", size: 34, opacity: 0.85 },
  { text: "Tax Credits", size: 28, opacity: 0.75 },
  { text: "Emissions", size: 38, opacity: 0.9 },
  { text: "Rural Impact", size: 26, opacity: 0.7 },
  { text: "Compliance", size: 30, opacity: 0.8 },
  { text: "Innovation", size: 24, opacity: 0.65 },
  { text: "Workforce", size: 28, opacity: 0.75 },
  { text: "Pollution", size: 36, opacity: 0.85 },
  { text: "Subsidies", size: 22, opacity: 0.6 },
  { text: "Transition", size: 26, opacity: 0.7 },
  { text: "Infrastructure", size: 24, opacity: 0.65 },
];

export default function TopicCloud() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-6">
      {words.map((w) => (
        <span
          key={w.text}
          className="cursor-pointer font-display font-bold text-primary transition-all hover:text-accent hover:scale-110"
          style={{ fontSize: `${w.size}px`, opacity: w.opacity }}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
}
