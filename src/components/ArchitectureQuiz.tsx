import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { KNOWLEDGE_QUIZ } from '../data/cloudConcepts';

export const ArchitectureQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = KNOWLEDGE_QUIZ[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (selectedOpt !== null) return; // Prevent changing answer
    setSelectedOpt(idx);
    setShowExplanation(true);
    if (idx === currentQ.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < KNOWLEDGE_QUIZ.length) {
      setCurrentIdx((c) => c + 1);
      setSelectedOpt(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  return (
    <div className="rounded-xl border p-5 sm:p-6 transition-all shadow-lg"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-main)'
      }}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b" style={{ borderColor: 'var(--border-main)' }}>
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-500" />
          <h3 className="font-bold text-lg tracking-tight" style={{ color: 'var(--text-main)' }}>
            Avaliação Prática de Arquitetura Cloud
          </h3>
        </div>
        <span className="text-xs font-mono font-medium px-2.5 py-1 rounded border"
          style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
          {quizFinished ? 'Concluído' : `Questão ${currentIdx + 1} de ${KNOWLEDGE_QUIZ.length}`}
        </span>
      </div>

      {!quizFinished ? (
        <div className="space-y-5">
          {/* Question text */}
          <h4 className="font-semibold text-base sm:text-lg leading-snug" style={{ color: 'var(--text-main)' }}>
            {currentQ.question}
          </h4>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, idx) => {
              let btnStyle = 'border-zinc-800 bg-zinc-900/40 text-zinc-300';
              if (selectedOpt !== null) {
                if (idx === currentQ.correctIndex) {
                  btnStyle = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500';
                } else if (idx === selectedOpt) {
                  btnStyle = 'border-red-500 bg-red-500/20 text-red-300';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={selectedOpt !== null}
                  type="button"
                  className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all flex items-start justify-between gap-3 cursor-pointer ${btnStyle}`}
                  style={{
                    backgroundColor: selectedOpt === null ? 'var(--bg-main)' : undefined,
                    borderColor: selectedOpt === null ? 'var(--border-main)' : undefined,
                    color: selectedOpt === null ? 'var(--text-main)' : undefined,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono font-bold text-xs shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/30">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {selectedOpt !== null && idx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  )}
                  {selectedOpt !== null && idx === selectedOpt && idx !== currentQ.correctIndex && (
                    <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div className="p-4 rounded-xl border bg-emerald-500/10 border-emerald-500/30 text-xs sm:text-sm animate-fade-in">
              <span className="font-bold text-emerald-500 block mb-1">Explicação do Arquiteto:</span>
              <p style={{ color: 'var(--text-main)' }}>{currentQ.explanation}</p>
            </div>
          )}

          {/* Action Footer */}
          {selectedOpt !== null && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                type="button"
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                {currentIdx + 1 < KNOWLEDGE_QUIZ.length ? 'Próxima Questão →' : 'Ver Resultado Final'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Final Score Card */
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-500 mx-auto flex items-center justify-center">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h4 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>
              Avaliador Concluído!
            </h4>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              Sua pontuação final foi <span className="font-bold text-emerald-500 text-lg">{score}</span> de {KNOWLEDGE_QUIZ.length}
            </p>
          </div>

          <p className="text-xs max-w-md mx-auto" style={{ color: 'var(--text-dim)' }}>
            {score === KNOWLEDGE_QUIZ.length
              ? 'Excelente! Você domina todos os pilares essenciais e avançados de Arquitetura Cloud.'
              : 'Bom trabalho! Revise os conceitos no mapa mental para consolidar todos os tópicos.'}
          </p>

          <button
            onClick={handleReset}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 text-xs font-semibold cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Refazer Teste
          </button>
        </div>
      )}
    </div>
  );
};
