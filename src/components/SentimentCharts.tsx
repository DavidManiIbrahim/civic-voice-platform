import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

const sentimentOverTime = [
  { time: "10:00", positive: 45, neutral: 30, negative: 25 },
  { time: "10:15", positive: 52, neutral: 28, negative: 20 },
  { time: "10:30", positive: 38, neutral: 35, negative: 27 },
  { time: "10:45", positive: 60, neutral: 22, negative: 18 },
  { time: "11:00", positive: 55, neutral: 25, negative: 20 },
  { time: "11:15", positive: 48, neutral: 32, negative: 20 },
  { time: "11:30", positive: 62, neutral: 20, negative: 18 },
  { time: "11:45", positive: 58, neutral: 27, negative: 15 },
];

const pieData = [
  { name: "Positive", value: 52, color: "hsl(142, 76%, 36%)" },
  { name: "Neutral", value: 28, color: "hsl(199, 89%, 48%)" },
  { name: "Negative", value: 20, color: "hsl(0, 84%, 60%)" },
];

const topicSentiment = [
  { topic: "Air Quality", positive: 72, negative: 28 },
  { topic: "Job Impact", positive: 35, negative: 65 },
  { topic: "Health Benefits", positive: 85, negative: 15 },
  { topic: "Timeline", positive: 28, negative: 72 },
  { topic: "Tax Incentives", positive: 68, negative: 32 },
];

export default function SentimentCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Sentiment over time */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-card">
        <h3 className="mb-4 font-display text-lg font-bold text-foreground">Sentiment Over Time</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={sentimentOverTime}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
            <XAxis dataKey="time" tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(214, 32%, 91%)",
                borderRadius: "8px",
              }}
            />
            <Area type="monotone" dataKey="positive" stackId="1" stroke="hsl(142, 76%, 36%)" fill="hsl(142, 76%, 36%, 0.3)" />
            <Area type="monotone" dataKey="neutral" stackId="1" stroke="hsl(199, 89%, 48%)" fill="hsl(199, 89%, 48%, 0.3)" />
            <Area type="monotone" dataKey="negative" stackId="1" stroke="hsl(0, 84%, 60%)" fill="hsl(0, 84%, 60%, 0.3)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Pie breakdown */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-card">
        <h3 className="mb-4 font-display text-lg font-bold text-foreground">Overall Sentiment</h3>
        <div className="flex items-center gap-8">
          <ResponsiveContainer width="50%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={2}>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-sm text-foreground">{d.name}</span>
                <span className="ml-auto text-sm font-bold text-foreground">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Topic sentiment */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-card lg:col-span-2">
        <h3 className="mb-4 font-display text-lg font-bold text-foreground">Sentiment by Topic</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={topicSentiment} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
            <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }} />
            <YAxis dataKey="topic" type="category" width={100} tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }} />
            <Tooltip />
            <Bar dataKey="positive" fill="hsl(142, 76%, 36%)" radius={[0, 4, 4, 0]} />
            <Bar dataKey="negative" fill="hsl(0, 84%, 60%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
