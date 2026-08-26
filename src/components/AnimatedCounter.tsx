import { useCountUp } from '../lib/useCountUp';
import { useScrollReveal } from '../lib/useScrollReveal';

interface Props {
  value: number;
  label: string;
  suffix?: string;
  icon?: React.ReactNode;
  delay?: number;
}

export function AnimatedCounter({ value, label, suffix = '', icon, delay = 0 }: Props) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const count = useCountUp(value, 1800, visible);

  return (
    <div
      ref={ref}
      className={`f1-card p-5 reveal ${visible ? 'is-visible' : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-display font-bold uppercase tracking-[0.15em] text-f1-silver">{label}</span>
        {icon && <span className="text-f1-red">{icon}</span>}
      </div>
      <div className="font-display font-black text-3xl md:text-4xl text-f1-red">
        {count.toLocaleString()}{suffix}
      </div>
    </div>
  );
}
