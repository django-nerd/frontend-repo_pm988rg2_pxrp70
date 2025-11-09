import { useMemo } from 'react';
import { Leaf, Zap, Recycle } from 'lucide-react';

const PRIMARY = '#A8D5BA';

function formatNumber(n) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);
}

export default function ImpactPreview({ category = 'transport', quantity = 1 }) {
  const factors = {
    transport: { co2: 2.31, energy: 7.4, waste: 0.02 }, // per km biking instead of car
    energy: { co2: 0.4, energy: 1, waste: 0.0 }, // per kWh saved
    waste: { co2: 0.1, energy: 0.2, waste: 1 }, // per kg recycled
    food: { co2: 2.5, energy: 0.5, waste: 0.2 }, // per vegetarian meal
    water: { co2: 0.05, energy: 0.1, waste: 0.0 }, // per 10L conserved
  };

  const impact = useMemo(() => {
    const f = factors[category] || factors.transport;
    return {
      co2: quantity * f.co2,
      energy: quantity * f.energy,
      waste: quantity * f.waste,
    };
  }, [category, quantity]);

  const cards = [
    {
      icon: <Leaf size={18} />, label: 'CO₂ saved', value: `${formatNumber(impact.co2)} kg`,
      gradient: 'from-emerald-200 to-emerald-100 dark:from-emerald-400/20 dark:to-emerald-300/10',
    },
    {
      icon: <Zap size={18} />, label: 'Energy conserved', value: `${formatNumber(impact.energy)} kWh`,
      gradient: 'from-sky-200 to-sky-100 dark:from-sky-400/20 dark:to-sky-300/10',
    },
    {
      icon: <Recycle size={18} />, label: 'Waste reduced', value: `${formatNumber(impact.waste)} kg`,
      gradient: 'from-amber-200 to-amber-100 dark:from-amber-400/20 dark:to-amber-300/10',
    },
  ];

  return (
    <section className="w-full">
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c, idx) => (
          <div
            key={idx}
            className={`rounded-xl bg-gradient-to-br ${c.gradient} border border-white/60 dark:border-white/10 p-4 shadow-sm`}
            style={{ boxShadow: `0 10px 30px -12px ${PRIMARY}33` }}
          >
            <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-100">
              <div className="h-8 w-8 rounded-lg bg-white/70 dark:bg-white/10 grid place-items-center">
                {c.icon}
              </div>
              <span className="text-sm font-medium opacity-80">{c.label}</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
              {c.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
