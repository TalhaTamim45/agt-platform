'use client';

import { useState, useEffect } from 'react';
import { BarChart3, Users, Smartphone, TrendingUp, Activity, Clock } from 'lucide-react';

export default function QRAnalytics({ isOpen, onClose }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/track-scan', { method: 'POST' });
        const data = await res.json();
        setAnalytics(data);
      } catch {
        setAnalytics({
          totalScans: 0,
          todayScans: 0,
          uniqueVisitors: 0,
          mobilePercentage: 0,
          last7Days: {},
          recentScans: [],
        });
      }
      setLoading(false);
    };

    fetchAnalytics();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/60 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[85vh] overflow-y-auto glass-panel rounded-2xl p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-extrabold text-navy-950">QR Scan Analytics</h2>
            <p className="text-xs text-navy-700/70 font-medium">PMD catalog engagement tracking</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-gold-600" />
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center">
            <Activity className="w-8 h-8 text-gold-500 animate-pulse mx-auto mb-3" />
            <p className="text-sm text-navy-700/60 font-medium">Loading analytics...</p>
          </div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <StatCard
                icon={<TrendingUp className="w-4 h-4" />}
                label="Total Scans"
                value={analytics.totalScans}
                accent="gold"
              />
              <StatCard
                icon={<Activity className="w-4 h-4" />}
                label="Today"
                value={analytics.todayScans}
                accent="emerald"
              />
              <StatCard
                icon={<Users className="w-4 h-4" />}
                label="Unique Visitors"
                value={analytics.uniqueVisitors}
                accent="blue"
              />
              <StatCard
                icon={<Smartphone className="w-4 h-4" />}
                label="Mobile %"
                value={`${analytics.mobilePercentage}%`}
                accent="purple"
              />
            </div>

            {/* 7-Day Trend */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-navy-950 mb-3">Last 7 Days</h3>
              <div className="flex items-end gap-1 h-20">
                {Object.entries(analytics.last7Days).reverse().map(([date, count]) => {
                  const maxCount = Math.max(1, ...Object.values(analytics.last7Days));
                  const heightPct = (count / maxCount) * 100;
                  return (
                    <div key={date} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[9px] font-bold text-navy-700/60">{count}</span>
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-gold-500 to-gold-400 transition-all duration-500"
                        style={{ height: `${Math.max(heightPct, 4)}%` }}
                      ></div>
                      <span className="text-[8px] font-medium text-navy-600/50">
                        {new Date(date).toLocaleDateString('en', { weekday: 'short' }).slice(0, 2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Scans */}
            {analytics.recentScans.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-navy-950 mb-3">Recent Scans</h3>
                <div className="space-y-2">
                  {analytics.recentScans.slice(0, 5).map((scan, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-cream-100/80 border border-cream-300/50"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-gold-500" />
                        <span className="font-medium text-navy-800">
                          {new Date(scan.timestamp).toLocaleString('en', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <span className="text-navy-600/60 font-medium text-[10px]">
                        {/mobile|android|iphone/i.test(scan.userAgent) ? '📱 Mobile' : '💻 Desktop'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analytics.totalScans === 0 && (
              <div className="py-8 text-center">
                <p className="text-sm text-navy-700/50 font-medium">No scans recorded yet.</p>
                <p className="text-xs text-navy-600/40 mt-1">Share the QR code with PMDs to start tracking.</p>
              </div>
            )}
          </>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          className="w-full mt-5 py-2.5 rounded-xl border border-cream-300 text-sm font-bold text-navy-800 hover:bg-cream-150 transition-colors"
        >
          Close Dashboard
        </button>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, accent }) {
  const accentColors = {
    gold: 'bg-gold-100 text-gold-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="p-3.5 rounded-xl bg-white border border-cream-200 shadow-cream-sm">
      <div className={`w-7 h-7 rounded-lg ${accentColors[accent]} flex items-center justify-center mb-2`}>
        {icon}
      </div>
      <p className="text-xl font-extrabold text-navy-950">{value}</p>
      <p className="text-[10px] font-bold text-navy-700/50 uppercase tracking-wider">{label}</p>
    </div>
  );
}
