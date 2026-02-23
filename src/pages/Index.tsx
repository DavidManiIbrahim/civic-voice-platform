import Layout from "@/components/Layout";
import HearingCard from "@/components/HearingCard";
import StatsCard from "@/components/StatsCard";
import { Radio, Users, MessageSquare, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-capitol.jpg";

const hearings = [
  {
    id: "1",
    title: "Clean Air Amendment Act — Environmental Impact Review",
    committee: "Environment & Public Works",
    date: "Feb 23, 2026 · 10:00 AM",
    status: "live" as const,
    viewers: 12847,
    comments: 342,
  },
  {
    id: "2",
    title: "Digital Privacy Rights — Consumer Protection Standards",
    committee: "Commerce & Technology",
    date: "Feb 24, 2026 · 2:00 PM",
    status: "upcoming" as const,
    viewers: 0,
    comments: 0,
  },
  {
    id: "3",
    title: "Education Funding Reform — K-12 Budget Allocation",
    committee: "Education & Labor",
    date: "Feb 21, 2026",
    status: "archived" as const,
    viewers: 8432,
    comments: 567,
  },
  {
    id: "4",
    title: "Healthcare Access Act — Rural Hospital Support",
    committee: "Health & Human Services",
    date: "Feb 19, 2026",
    status: "archived" as const,
    viewers: 15203,
    comments: 891,
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Capitol building" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-civic opacity-80" />
        </div>
        <div className="container relative py-20 text-center">
          <h1 className="animate-fade-up mb-4 font-display text-4xl font-black tracking-tight text-primary-foreground md:text-6xl">
            Your Voice in <span className="text-gradient-gold">Legislation</span>
          </h1>
          <p className="animate-fade-up mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80" style={{ animationDelay: "0.1s" }}>
            AI-powered civic engagement platform. Watch live hearings, share your opinion, and see how public sentiment shapes policy.
          </p>
          <div className="animate-fade-up flex justify-center gap-4" style={{ animationDelay: "0.2s" }}>
            <Link
              to="/hearing"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-transform hover:scale-105"
            >
              <Radio className="h-4 w-4" />
              Watch Live
            </Link>
            <Link
              to="/peoples-view"
              className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/30 px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              People's View
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container -mt-8 relative z-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard icon={<Radio className="h-5 w-5" />} label="Live Sessions" value="3" change="+2 this week" positive />
          <StatsCard icon={<Users className="h-5 w-5" />} label="Active Viewers" value="12.8K" change="+34% from last hearing" positive />
          <StatsCard icon={<MessageSquare className="h-5 w-5" />} label="Public Comments" value="1,800" change="+156 today" positive />
          <StatsCard icon={<TrendingUp className="h-5 w-5" />} label="Engagement Rate" value="78%" change="+5% this month" positive />
        </div>
      </section>

      {/* Hearings */}
      <section className="container py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-foreground">Legislative Hearings</h2>
          <span className="text-sm text-muted-foreground">{hearings.length} sessions</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {hearings.map((h) => (
            <HearingCard key={h.id} {...h} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
