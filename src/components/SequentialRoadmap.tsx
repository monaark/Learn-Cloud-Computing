import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Sparkles, BookOpen, Layers, ArrowDown, ExternalLink } from 'lucide-react';
import { SEQUENTIAL_LEARNING_LEVELS, SequentialLevel, CLOUD_PILLARS } from '../data/cloudConcepts';
import { ConceptSubItem } from '../types';

interface SequentialRoadmapProps {
  onSelectSubItem: (subItem: ConceptSubItem) => void;
}

export const SequentialRoadmap: React.FC<SequentialRoadmapProps> = ({ onSelectSubItem }) => {
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});

  const toggleTopic = (title: string) => {
    setCompletedTopics((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const totalTopics = SEQUENTIAL_LEARNING_LEVELS.reduce((acc, lvl) => acc + lvl.topics.length, 0);
  const completedCount = Object.values(completedTopics).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalTopics) * 100);

  const getSubItemById = (id: string): ConceptSubItem | null => {
    for (const pillar of CLOUD_PILLARS) {
      const found = pillar.subItems.find((s) => s.id === id);
      if (found) return found;
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Progress & Overview Banner */}
      <div
        className="p-6 rounded-2xl border relative overflow-hidden shadow-md space-y-4"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-main)',
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Estrutura Sequencial de Aprendizado
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
              Trilha Progressiva: Do Superficial ao Profundo
            </h2>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
              Siga os 5 níveis ordenados em sequência pedagógica lógica para construir seu conhecimento sobre Computação em Nuvem.
            </p>
          </div>

          {/* Progress Meter */}
          <div className="bg-[#0a0a0c] border border-[#222227] p-4 rounded-xl shrink-0 min-w-[220px] space-y-2">
            <div className="flex justify-between items-center text-xs font-mono font-bold">
              <span style={{ color: 'var(--text-muted)' }}>Progresso Geral</span>
              <span className="text-[#10b981]">{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#1c1c24] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#10b981] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-gray-500 font-mono text-right">
              {completedCount} de {totalTopics} tópicos concluídos
            </p>
          </div>
        </div>

        {/* Depth Meter Visual Stepper */}
        <div className="pt-2 border-t border-[#222227] grid grid-cols-5 gap-2 text-center text-[10px] font-mono font-bold uppercase tracking-wider">
          <div className="p-2 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">1. Superficial</div>
          <div className="p-2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">2. Básico</div>
          <div className="p-2 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">3. Intermediário</div>
          <div className="p-2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">4. Avançado</div>
          <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">5. Profundo</div>
        </div>
      </div>

      {/* Level Cards Steps Container */}
      <div className="space-y-6 relative">
        {/* Connecting Timeline Line */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-[#222227] hidden md:block z-0" />

        {SEQUENTIAL_LEARNING_LEVELS.map((level: SequentialLevel, index: number) => {
          const isLast = index === SEQUENTIAL_LEARNING_LEVELS.length - 1;
          const levelCompletedCount = level.topics.filter((t) => completedTopics[t.title]).length;

          return (
            <React.Fragment key={level.levelNumber}>
              <div
                className={`relative z-10 p-6 rounded-2xl border transition-all ${level.borderColor} hover:border-[#10b981]/50 shadow-md`}
                style={{
                  backgroundColor: 'var(--bg-card)',
                }}
              >
                {/* Level Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#222227]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#0a0a0c] border border-[#222227] flex items-center justify-center font-mono font-bold text-sm text-[#10b981] shadow-inner">
                      0{level.levelNumber}
                    </div>
                    <div>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${level.badgeColor}`}>
                        {level.depthLabel}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold mt-1" style={{ color: 'var(--text-main)' }}>
                        {level.title}
                      </h3>
                    </div>
                  </div>

                  <div className="text-xs font-mono text-gray-400 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#10b981]" />
                    <span>Concluído: {levelCompletedCount}/{level.topics.length}</span>
                  </div>
                </div>

                {/* Description & Goal */}
                <div className="py-3 space-y-2 text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                  <p>{level.description}</p>
                  <p className="text-xs font-mono text-emerald-400/90 bg-emerald-500/5 p-2 rounded border border-emerald-500/10">
                    💡 <strong>Objetivo Principal:</strong> {level.keyGoal}
                  </p>
                </div>

                {/* Topic Checklist Grid */}
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {level.topics.map((topic) => {
                    const isDone = !!completedTopics[topic.title];

                    return (
                      <div
                        key={topic.title}
                        className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between space-y-2 ${
                          isDone
                            ? 'bg-[#10b981]/5 border-[#10b981]/40'
                            : 'bg-[#0a0a0c] border-[#222227] hover:border-gray-700'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <label className="flex items-center gap-2 font-bold text-xs sm:text-sm cursor-pointer select-none" style={{ color: 'var(--text-main)' }}>
                              <input
                                type="checkbox"
                                checked={isDone}
                                onChange={() => toggleTopic(topic.title)}
                                className="w-4 h-4 rounded accent-[#10b981] cursor-pointer"
                              />
                              <span className={isDone ? 'line-through opacity-70' : ''}>
                                {topic.title}
                              </span>
                            </label>

                            {topic.isAdded && (
                              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                                ADICIONADO
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] leading-relaxed pl-6" style={{ color: 'var(--text-muted)' }}>
                            {topic.description}
                          </p>
                        </div>

                        {/* Detail Buttons */}
                        {(topic.subItemIds && topic.subItemIds.length > 0) || topic.subItemId ? (
                          <div className="pt-2 pl-6 flex flex-wrap justify-end gap-1.5">
                            {topic.subItemIds && topic.subItemIds.length > 0 ? (
                              topic.subItemIds.map((id) => {
                                const item = getSubItemById(id);
                                if (!item) return null;
                                return (
                                  <button
                                    key={id}
                                    onClick={() => onSelectSubItem(item)}
                                    className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-[#10b981] border border-emerald-500/30 flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                                    title={`Ver detalhes sobre ${item.title}`}
                                  >
                                    <span>{item.title}</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </button>
                                );
                              })
                            ) : topic.subItemId ? (
                              (() => {
                                const item = getSubItemById(topic.subItemId);
                                if (!item) return null;
                                return (
                                  <button
                                    onClick={() => onSelectSubItem(item)}
                                    className="text-[11px] font-mono font-semibold text-[#10b981] hover:underline flex items-center gap-1 cursor-pointer"
                                  >
                                    Explorar em detalhes ({item.title})
                                    <ExternalLink className="w-3 h-3" />
                                  </button>
                                );
                              })()
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>

              {!isLast && (
                <div className="flex justify-center my-2">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#121216] border border-[#222227] text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest shadow">
                    <ArrowDown className="w-3.5 h-3.5 text-[#10b981] animate-bounce" />
                    Avançar para o Próximo Nível
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
