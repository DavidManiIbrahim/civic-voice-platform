import Layout from "@/components/Layout";
import TranscriptPanel from "@/components/TranscriptPanel";
import CommentPanel from "@/components/CommentPanel";
import { Radio, Users, Clock, Download } from "lucide-react";

export default function HearingPage() {
  return (
    <Layout>
      <div className="container py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
              </span>
              LIVE NOW
            </span>
            <span className="text-sm text-muted-foreground">Environment & Public Works Committee</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Clean Air Amendment Act — Environmental Impact Review
          </h1>
          <div className="mt-2 flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              12,847 watching
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              Started 1h 45m ago
            </span>
            <button className="flex items-center gap-1.5 text-accent hover:underline">
              <Download className="h-4 w-4" />
              Download Transcript
            </button>
          </div>
        </div>

        {/* Video + panels */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Video */}
          <div className="lg:col-span-2">
            <div className="mb-6 aspect-video overflow-hidden rounded-xl bg-primary">
              <div className="flex h-full items-center justify-center">
                <div className="text-center text-primary-foreground">
                  <Radio className="mx-auto mb-3 h-12 w-12 animate-pulse-slow opacity-60" />
                  <p className="text-lg font-semibold">Live Stream</p>
                  <p className="text-sm opacity-70">Hearing in progress — stream placeholder</p>
                </div>
              </div>
            </div>
            <TranscriptPanel />
          </div>

          {/* Comments */}
          <div className="lg:col-span-1">
            <CommentPanel />
          </div>
        </div>
      </div>
    </Layout>
  );
}
