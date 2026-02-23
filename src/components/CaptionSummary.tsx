import { useState } from "react";
import { Captions, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface CaptionSummaryProps {
  transcriptText: string;
}

export default function CaptionSummary({ transcriptText }: CaptionSummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-sentiment", {
        body: { text: transcriptText, type: "caption_summary" },
      });
      if (error) throw error;
      setSummary(data.text);
    } catch (e) {
      console.error("Summary error:", e);
    }
    setLoading(false);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Captions className="h-5 w-5 text-accent" />
          <h3 className="font-display text-base font-bold text-foreground">AI Caption Summary</h3>
        </div>
        <Button size="sm" variant="outline" onClick={generateSummary} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? "Generating..." : "Summarize"}
        </Button>
      </div>
      {summary ? (
        <p className="text-sm leading-relaxed text-foreground/85">{summary}</p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Click "Summarize" to get an AI-generated closed caption summary of the current hearing discussion.
        </p>
      )}
    </div>
  );
}
