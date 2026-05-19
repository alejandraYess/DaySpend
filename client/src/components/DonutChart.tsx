import { CATEGORIES } from '../types';
import { formatAmount } from '../utils/format';
import { CATEGORY_COLORS as COLORS } from '../utils/colors';

interface Props {
  byCategory: Record<string, number>;
  total: number;
}

function polarToCartesian(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, R: number, r: number, start: number, end: number) {
  const s = polarToCartesian(cx, cy, R, start);
  const e = polarToCartesian(cx, cy, R, end);
  const si = polarToCartesian(cx, cy, r, start);
  const ei = polarToCartesian(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return [
    `M ${s.x} ${s.y}`,
    `A ${R} ${R} 0 ${large} 1 ${e.x} ${e.y}`,
    `L ${ei.x} ${ei.y}`,
    `A ${r} ${r} 0 ${large} 0 ${si.x} ${si.y}`,
    'Z',
  ].join(' ');
}

export default function DonutChart({ byCategory, total }: Props) {
  const segments = CATEGORIES.filter((c) => byCategory[c.value]).map((c) => ({
    ...c,
    amount: byCategory[c.value] ?? 0,
    pct: total > 0 ? (byCategory[c.value] ?? 0) / total : 0,
    color: COLORS[c.value],
  }));

  let currentAngle = 0;
  const arcs = segments.map((seg) => {
    const startAngle = currentAngle;
    const endAngle = currentAngle + seg.pct * 360;
    currentAngle = endAngle;
    return { ...seg, startAngle, endAngle };
  });

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 px-4 sm:px-5 py-5">
      <div className="shrink-0">
        <svg viewBox="0 0 200 200" width="160" height="160">
          {arcs.map((arc) => (
            <path
              key={arc.value}
              d={arcPath(100, 100, 80, 48, arc.startAngle, arc.endAngle - 1)}
              fill={arc.color}
              opacity={0.9}
            />
          ))}
          <text x="100" y="96" textAnchor="middle" fill="currentColor" fontSize="13" fontWeight="600" className="fill-gray-800 dark:fill-zinc-200">
            {formatAmount(total)}
          </text>
          <text x="100" y="112" textAnchor="middle" fontSize="9" className="fill-gray-400 dark:fill-zinc-500">
            TOTAL
          </text>
        </svg>
      </div>

      <div className="flex flex-col gap-2 w-full">
        {arcs.map((arc) => (
          <div key={arc.value} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: arc.color }} />
              <span className="text-sm text-gray-700 dark:text-zinc-300 truncate">{arc.label}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-gray-400 dark:text-zinc-500">{Math.round(arc.pct * 100)}%</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-zinc-100 w-16 text-right">
                {formatAmount(arc.amount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
