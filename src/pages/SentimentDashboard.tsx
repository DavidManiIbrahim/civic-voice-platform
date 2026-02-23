import Layout from "@/components/Layout";
import SentimentCharts from "@/components/SentimentCharts";

export default function SentimentDashboard() {
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Sentiment Analysis</h1>
          <p className="mt-1 text-muted-foreground">
            AI-powered analysis of public comments and hearing transcript for the Clean Air Amendment Act.
          </p>
        </div>
        <SentimentCharts />
      </div>
    </Layout>
  );
}
