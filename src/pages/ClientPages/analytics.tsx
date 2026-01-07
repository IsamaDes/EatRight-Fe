import React, { useEffect, useState } from 'react';
import { getClientAnalytics } from "../../services/analyticsService"
import { ClientAnalyticsResponse, Insight } from '../../utils/clientAnalytics.contract';
import { Line } from 'react-chartjs-2';

type Props = {
  clientId: string;
};

const ClientAnalytics: React.FC<Props> = ({ clientId }) => {
  const [analytics, setAnalytics] = useState<ClientAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getClientAnalytics(clientId, '7d', ['weight', 'mood', 'insights']);
        setAnalytics(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [clientId]);

  if (loading) return <p>Loading analytics...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!analytics) return <p>No analytics available</p>;

  const { trends, summary, insights } = analytics;

  // Prepare chart data for calories
  const calorieChartData = {
    labels: trends.calories.daily.map(d => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Consumed Calories',
        data: trends.calories.daily.map(d => d.consumedCalories),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
      },
      {
        label: 'Target Calories',
        data: trends.calories.daily.map(d => d.targetCalories),
        borderColor: 'rgba(255, 99, 132, 1)',
        borderDash: [5, 5],
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Client Analytics</h2>

      {/* Summary */}
      <section className="mb-6 bg-white p-4 rounded-xl shadow-sm border">
        <h3 className="font-semibold">Summary</h3>
        <div className="flex justify-between mt-2">
          <div>Adherence Rate: {summary.adherenceRate}%</div>
          <div>Average Calories: {summary.avgCalories} kcal</div>
          <div>Streak: {summary.streak} days</div>
        </div>
      </section>

      {/* Calories Trend */}
      <section className="mb-6 bg-white p-4 rounded-xl shadow-sm border">
        <h3 className="font-semibold mb-2">Calories Trend (Last 7 days)</h3>
        <Line data={calorieChartData} />
      </section>

      {/* Weight Trend */}
      {trends.weight && trends.weight.weeklyAverage.length > 0 && (
        <section className="mb-6 bg-white p-4 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-2">Weight Trend</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            {trends.weight.weeklyAverage.map(w => (
              <li key={w.date}>
                {new Date(w.date).toLocaleDateString()}: {w.weight} kg
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Mood / Energy Trend */}
      {trends.mood && trends.mood.length > 0 && (
        <section className="mb-6 bg-white p-4 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-2">Mood & Energy</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            {trends.mood.map(m => (
              <li key={m.date}>
                {new Date(m.date).toLocaleDateString()}: Mood {m.moodScore}/5, Energy {m.energyScore}/5
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Insights */}
      {insights && insights.length > 0 && (
        <section className="bg-white p-4 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-2">Insights & Recommendations</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            {insights.map((insight: Insight) => (
              <li key={insight.id} className="border-l-4 pl-2" style={{ borderColor: insight.type === 'warning' ? 'red' : insight.type === 'positive' ? 'green' : 'gray' }}>
                <p className="font-semibold">{insight.title}</p>
                <p>{insight.description}</p>
                {insight.recommendation && <p className="italic text-gray-600">{insight.recommendation}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ClientAnalytics;
