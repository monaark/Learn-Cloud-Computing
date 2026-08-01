import React from 'react';
import { Zap, Server, Layers, Globe, Cloud, ShieldCheck, ChevronRight, PlusCircle } from 'lucide-react';
import { ConceptPillar, ConceptSubItem } from '../types';

interface ConceptCardProps {
  pillar: ConceptPillar;
  searchQuery?: string;
  onSelectSubItem: (subItem: ConceptSubItem) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Zap,
  Server,
  Layers,
  Globe,
  Cloud,
  ShieldCheck,
};

export const ConceptCard: React.FC<ConceptCardProps> = ({ pillar, searchQuery = '', onSelectSubItem }) => {
  const IconComponent = ICON_MAP[pillar.iconName] || Cloud;

  const matchesSearch = (text: string) => {
    if (!searchQuery.trim()) return false;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <div
      className={`rounded-xl border p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between hover:border-emerald-500/60 shadow-md ${
        pillar.isAddedPillar ? 'ring-1 ring-emerald-500/30' : ''
      }`}
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: pillar.isAddedPillar ? 'var(--accent)' : 'var(--border-main)',
      }}
    >
      <div>
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--accent)' }}>
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight tracking-tight" style={{ color: 'var(--text-main)' }}>
                {pillar.title}
              </h3>
            </div>
          </div>

          <span
            className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
              pillar.isAddedPillar
                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                : 'bg-zinc-800/20 text-zinc-400 border-zinc-700/40'
            }`}
          >
            {pillar.badgeText}
          </span>
        </div>

        <p className="text-xs sm:text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {pillar.description}
        </p>

        {/* Sub-items list */}
        <div className="space-y-2 border-t pt-3" style={{ borderColor: 'var(--border-subtle)' }}>
          {pillar.subItems.map((item) => {
            const isHighlighted =
              matchesSearch(item.title) || matchesSearch(item.shortDesc) || matchesSearch(item.fullDesc);

            return (
              <button
                key={item.id}
                onClick={() => onSelectSubItem(item)}
                type="button"
                className={`w-full text-left p-2.5 rounded-lg border text-xs sm:text-sm transition-all group flex items-start justify-between gap-2 cursor-pointer ${
                  isHighlighted ? 'ring-2 ring-emerald-500/80 bg-emerald-500/10' : ''
                }`}
                style={{
                  backgroundColor: 'var(--bg-main)',
                  borderColor: item.isAdded ? 'var(--accent-border)' : 'var(--border-subtle)',
                }}
              >
                <div className="space-y-0.5 pr-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold transition-colors group-hover:text-emerald-500" style={{ color: 'var(--text-main)' }}>
                      {item.title}
                    </span>
                    {item.isAdded && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-500 border border-emerald-500/40">
                        <PlusCircle className="w-2.5 h-2.5" />
                        ADICIONADO
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] sm:text-xs line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                    {item.shortDesc}
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
