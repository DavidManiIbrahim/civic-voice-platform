import { useState } from "react";
import { ThumbsUp, MessageSquare, Send, User } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  hearingTimestamp?: string;
  upvotes: number;
  sentiment: "positive" | "neutral" | "negative";
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: "Sarah M.",
    text: "The phased implementation approach makes sense. Small businesses need time to adapt without losing jobs.",
    timestamp: "2 min ago",
    hearingTimestamp: "00:14:33",
    upvotes: 24,
    sentiment: "positive",
  },
  {
    id: "2",
    author: "Michael R.",
    text: "Why is the timeline only 5 years? Other countries took 10+ years for similar transitions. This feels rushed.",
    timestamp: "5 min ago",
    hearingTimestamp: "00:12:08",
    upvotes: 18,
    sentiment: "negative",
  },
  {
    id: "3",
    author: "Dr. Lisa Park",
    text: "The $4.2B in health savings is compelling. We need to weigh this against short-term compliance costs.",
    timestamp: "8 min ago",
    hearingTimestamp: "00:05:42",
    upvotes: 31,
    sentiment: "positive",
  },
  {
    id: "4",
    author: "James K.",
    text: "Would love to see more data on the rural impact. Urban and rural areas face very different challenges.",
    timestamp: "12 min ago",
    upvotes: 15,
    sentiment: "neutral",
  },
];

const sentimentBadge = {
  positive: "bg-success/10 text-success",
  neutral: "bg-info/10 text-info",
  negative: "bg-destructive/10 text-destructive",
};

export default function CommentPanel() {
  const [newComment, setNewComment] = useState("");

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <h3 className="font-display text-lg font-bold text-foreground">Public Comments</h3>
        <span className="text-xs text-muted-foreground">{mockComments.length} comments</span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {mockComments.map((c) => (
          <div key={c.id} className="rounded-lg border border-border bg-background p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-accent">
                <User className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-semibold text-foreground">{c.author}</span>
              <span className="text-xs text-muted-foreground">{c.timestamp}</span>
              <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold ${sentimentBadge[c.sentiment]}`}>
                {c.sentiment}
              </span>
            </div>
            <p className="mb-2 text-sm leading-relaxed text-foreground/90">{c.text}</p>
            <div className="flex items-center gap-4">
              {c.hearingTimestamp && (
                <button className="flex items-center gap-1 text-xs text-info hover:underline">
                  <MessageSquare className="h-3 w-3" />
                  @{c.hearingTimestamp}
                </button>
              )}
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent">
                <ThumbsUp className="h-3 w-3" />
                {c.upvotes}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comment input */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:bg-accent/90">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
