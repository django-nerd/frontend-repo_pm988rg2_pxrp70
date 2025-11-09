import { useEffect, useState } from 'react';
import EcoHeader from './components/EcoHeader';
import QuickLogForm from './components/QuickLogForm';
import ImpactPreview from './components/ImpactPreview';
import StatsSummary from './components/StatsSummary';

const PRIMARY = '#A8D5BA';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [preview, setPreview] = useState({ category: 'transport', quantity: 2, date: new Date().toISOString().slice(0,10), description: 'Biked to work' });

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) setTheme(stored);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-neutral-950 dark:to-neutral-950">
      <EcoHeader theme={theme} setThemeState={setTheme} />

      <main className="max-w-6xl mx-auto px-4">
        {/* Hero */}
        <section className="py-12 sm:py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                Log eco actions. Track real impact.
              </h2>
              <p className="mt-3 text-neutral-600 dark:text-neutral-400">
                EcoEcho turns your daily choices into measurable CO₂ savings, energy conserved, and waste reduced.
              </p>
              <div className="mt-6">
                <StatsSummary
                  stats={{ points: 12850, streak: 5, level: 'Sequoia', nextLevel: { name: 'Rainforest', remaining: 1150 } }}
                />
              </div>
            </div>
            <div>
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/70 backdrop-blur p-5 shadow-lg" style={{boxShadow:`0 30px 80px -24px ${PRIMARY}55`}}>
                <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-100 mb-3">Quick Log</h3>
                <QuickLogForm onPreview={setPreview} />
                <div className="mt-6">
                  <ImpactPreview category={preview.category} quantity={preview.quantity} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Snapshot */}
        <section className="py-10">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-emerald-100/70 to-white dark:from-emerald-400/10 dark:to-neutral-900 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">Community Impact</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Collective savings from everyone using EcoEcho.</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">82,415</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">kg CO₂</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">154,220</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">kWh</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">12,908</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">kg waste</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center text-sm text-neutral-500 dark:text-neutral-500">
          Built with care for our planet. Primary color: <span className="inline-block h-3 w-3 rounded-full align-middle" style={{background: PRIMARY}} />
        </footer>
      </main>
    </div>
  );
}
