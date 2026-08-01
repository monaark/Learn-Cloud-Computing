import React, { useEffect } from 'react';
import { X, CheckCircle2, Lightbulb, ExternalLink, PlusCircle, Server } from 'lucide-react';
import { ConceptSubItem } from '../types';

interface ConceptDetailModalProps {
  subItem: ConceptSubItem | null;
  onClose: () => void;
}

export const ConceptDetailModal: React.FC<ConceptDetailModalProps> = ({ subItem, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!subItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border p-6 sm:p-8 shadow-2xl transition-all"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-main)',
          color: 'var(--text-main)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-lg border text-gray-400 hover:text-white hover:border-emerald-500 transition-colors cursor-pointer"
          style={{ borderColor: 'var(--border-main)', backgroundColor: 'var(--bg-main)' }}
          aria-label="Fechar janela"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-10 mb-6">
          <div className="flex items-center gap-2 mb-2">
            {subItem.isAdded ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/40">
                <PlusCircle className="w-3 h-3" />
                CONCEITO ADICIONADO PELO ARQUITETO
              </span>
            ) : (
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                CONCEITO ESTRUTURAL BASE
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
            {subItem.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {subItem.shortDesc}
          </p>
        </div>

        {/* Deep Explanation */}
        <div className="space-y-6">
          <div className="p-4 rounded-xl border text-sm leading-relaxed"
            style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)' }}>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-emerald-500 mb-2">
              Definição Arquitetural Completa
            </h4>
            <p style={{ color: 'var(--text-main)' }}>{subItem.fullDesc}</p>
          </div>

          {/* Key Takeaways */}
          {subItem.keyTakeaways && subItem.keyTakeaways.length > 0 && (
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-emerald-500 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Pontos-Chave de Aprendizado
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {subItem.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span style={{ color: 'var(--text-main)' }}>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Real-world Examples */}
          {subItem.examples && subItem.examples.length > 0 && (
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-emerald-500 mb-2 flex items-center gap-1.5">
                <Server className="w-4 h-4" />
                Exemplos de Serviços no Mercado
              </h4>
              <div className="flex flex-wrap gap-2">
                {subItem.examples.map((ex, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-lg border font-mono font-medium"
                    style={{
                      backgroundColor: 'var(--bg-main)',
                      borderColor: 'var(--border-main)',
                      color: 'var(--text-main)',
                    }}
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Architectural Impact */}
          {subItem.architecturalImpact && (
            <div className="p-4 rounded-xl border bg-emerald-500/10 border-emerald-500/30 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 font-bold text-emerald-500 mb-1">
                <Lightbulb className="w-4 h-4" />
                Impacto no Design de Soluções
              </div>
              <p style={{ color: 'var(--text-main)' }}>{subItem.architecturalImpact}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t flex justify-end" style={{ borderColor: 'var(--border-main)' }}>
          <button
            onClick={onClose}
            type="button"
            className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
