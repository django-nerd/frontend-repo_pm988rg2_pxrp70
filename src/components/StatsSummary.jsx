import { Trophy, Flame, Sparkles } from 'lucide-react';

export default function StatsSummary({ stats }) {
  const items = [
    {
      icon: <Sparkles size={18} />, label: 'EcoPoints', value: stats.points.toLocaleString(),
      hint: '+ streak bonus applied',
    },
    {
      icon: <Flame size={18} />, label: 'Current streak', value: `${stats.streak} days`,
      hint: 'Keep it going!',
    },
    {
      icon: <Trophy size={18} />, label: 'Level', value: stats.level,
      hint: stats.nextLevel ? `${stats.nextLevel.remaining} pts to ${stats.nextLevel.name}` : 'Max level',
    },
  ];

  return (
    <section className="w-full">
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((i, idx) => (
          <div key={idx} className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900">
            <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-100">
              <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-400/10 grid place-items-center text-emerald-700 dark:text-emerald-300">
                {i.icon}
              </div>
              <span className="text-sm font-medium opacity-80">{i.label}</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-neutral-50">{i.value}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{i.hint}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
