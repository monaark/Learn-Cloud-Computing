import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Layers, ShieldCheck, CheckCircle2, Cloud, HelpCircle, FileText, ArrowUp, GitCommitHorizontal } from 'lucide-react';
import { ThemeMode, CategoryKey, ConceptSubItem } from './types';
import { CLOUD_PILLARS } from './data/cloudConcepts';
import { ThemeToggle } from './components/ThemeToggle';
import { MermaidViewer } from './components/MermaidViewer';
import { ConceptCard } from './components/ConceptCard';
import { SharedResponsibilityMatrix } from './components/SharedResponsibilityMatrix';
import { ConceptDetailModal } from './components/ConceptDetailModal';
import { ArchitectureQuiz } from './components/ArchitectureQuiz';
import { SequentialRoadmap } from './components/SequentialRoadmap';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubItem, setSelectedSubItem] = useState<ConceptSubItem | null>(null);
  const [activeTab, setActiveTab] = useState<'sequential' | 'diagram' | 'pillars' | 'security' | 'quiz'>('sequential');

  const filteredPillars = useMemo(() => {
    return CLOUD_PILLARS.filter((pillar) => {
      if (activeCategory !== 'all' && pillar.id !== activeCategory) {
        return false;
      }

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const pillarMatch = pillar.title.toLowerCase().includes(q) || pillar.description.toLowerCase().includes(q);
      const subItemMatch = pillar.subItems.some(
        (sub) =>
          sub.title.toLowerCase().includes(q) ||
          sub.shortDesc.toLowerCase().includes(q) ||
          sub.fullDesc.toLowerCase().includes(q)
      );

      return pillarMatch || subItemMatch;
    });
  }, [activeCategory, searchQuery]);

  const totalAddedConcepts = useMemo(() => {
    return CLOUD_PILLARS.reduce(
      (acc, p) => acc + p.subItems.filter((item) => item.isAdded).length,
      0
    );
  }, []);

  const handleSelectConceptFromMermaid = (conceptText: string) => {
    if (!conceptText) return;
    const cleanText = conceptText.replace(/[☁️⚡🌐🧩🏢🛡️⭐[\]]/g, '').trim();
    if (!cleanText) return;

    for (const pillar of CLOUD_PILLARS) {
      for (const subItem of pillar.subItems) {
        if (
          subItem.title.toLowerCase() === cleanText.toLowerCase() ||
          cleanText.toLowerCase().includes(subItem.title.toLowerCase()) ||
          subItem.title.toLowerCase().includes(cleanText.toLowerCase())
        ) {
          setSelectedSubItem(subItem);
          return;
        }
      }
    }

    setSearchQuery(cleanText);
    setActiveTab('pillars');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200">
      {/* Sticky Navigation Bar */}
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-md transition-colors"
        style={{
          backgroundColor: theme === 'dark' ? 'rgba(10, 10, 12, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          borderColor: 'var(--border-main)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex flex-wrap items-center justify-between gap-3">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#10b981]/20 flex items-center justify-center border border-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <span className="text-[#10b981] text-base font-bold">☁️</span>
            </div>
            <div>
              <h1 className="font-bold text-base sm:text-lg tracking-tight uppercase" style={{ color: 'var(--text-main)' }}>
                Cloud Architecture <span className="text-[#10b981]">Map</span>
              </h1>
            </div>
            <div className="hidden md:block h-6 w-[1px] bg-[#222227] mx-1"></div>
            <span className="hidden md:inline-block text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30">
              Nexus v2.0
            </span>
          </div>

          {/* Quick Search & Theme Switcher */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar conceito (ex: Serverless, IAM)..."
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#10b981]/50 transition-all font-mono"
                style={{
                  backgroundColor: 'var(--bg-main)',
                  borderColor: 'var(--border-main)',
                  color: 'var(--text-main)',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                >
                  ×
                </button>
              )}
            </div>

            <ThemeToggle onThemeChange={setTheme} />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 w-full">
        {/* Definition Hero Banner */}
        <section
          className="rounded-2xl border p-6 sm:p-8 relative overflow-hidden transition-all shadow-lg"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-main)',
          }}
        >
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 text-[11px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              NIST Architecture & Governance Framework
            </div>

            <h2 className="text-2xl sm:text-4xl font-light leading-tight tracking-tight" style={{ color: 'var(--text-main)' }}>
              Computação em Nuvem <br className="hidden sm:inline" />
              <span className="font-bold text-[#10b981]">Guia de Referência Holístico</span>
            </h2>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Modelo para acesso ubíquo, conveniente e sob demanda a um conjunto compartilhado de recursos computacionais configuráveis (redes, servidores, armazenamento, aplicações e serviços), provisionados dinamicamente com mínima intervenção operacional.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono tracking-wider text-gray-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                {CLOUD_PILLARS.length} Pilares Estruturais
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                {totalAddedConcepts} Conceitos Vitais Adicionados
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                Visualização Mermaid.js Interativa
              </span>
            </div>
          </div>
        </section>

        {/* Section Navigation Tabs */}
        <div className="flex border-b overflow-x-auto no-scrollbar gap-1 sm:gap-4" style={{ borderColor: 'var(--border-main)' }}>
          <button
            onClick={() => setActiveTab('sequential')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'sequential'
                ? 'border-[#10b981] text-[#10b981]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <GitCommitHorizontal className="w-4 h-4" />
            Trilha Sequencial (Superficial ➔ Profundo)
          </button>
          <button
            onClick={() => setActiveTab('diagram')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'diagram'
                ? 'border-[#10b981] text-[#10b981]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            Diagrama Mermaid (Sequencial)
          </button>
          <button
            onClick={() => setActiveTab('pillars')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'pillars'
                ? 'border-[#10b981] text-[#10b981]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Cloud className="w-4 h-4" />
            Diretório de Pilares ({filteredPillars.length})
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'security'
                ? 'border-[#10b981] text-[#10b981]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Responsabilidade Compartilhada
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'quiz'
                ? 'border-[#10b981] text-[#10b981]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Avaliação de Conhecimento
          </button>
        </div>

        {/* Tab 1: Interactive Sequential Learning Roadmap */}
        {activeTab === 'sequential' && (
          <SequentialRoadmap onSelectSubItem={setSelectedSubItem} />
        )}

        {/* Tab 2: Mermaid Sequential Graphic View */}
        {activeTab === 'diagram' && (
          <div className="space-y-6">
            <MermaidViewer theme={theme} onSelectConcept={handleSelectConceptFromMermaid} />

            {/* Quick Overview Text Summary Card */}
            <div
              className="p-5 rounded-xl border text-xs sm:text-sm space-y-3"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-main)',
              }}
            >
              <h3 className="font-bold text-base flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                <FileText className="w-4 h-4 text-emerald-500" />
                Resumo da Sequência Pedagógica
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                O gráfico Mermaid acima reflete a progressão lógica em 5 etapas: partindo dos fundamentos conceituais (Nível 1), passando por infraestrutura física e modelos de abstração, até a engenharia de resiliência (Nível 4) e governança/FinOps profunda (Nível 5).
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Directory of Pillars (Concept Cards) */}
        {activeTab === 'pillars' && (
          <div className="space-y-6">
            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              <span className="text-xs font-mono font-bold uppercase shrink-0 mr-1" style={{ color: 'var(--text-muted)' }}>
                Filtrar Pillar:
              </span>
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1 text-xs font-medium rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === 'all'
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-zinc-800/20 text-gray-400 border-zinc-700/40 hover:text-gray-200'
                }`}
              >
                Todos ({CLOUD_PILLARS.length})
              </button>
              {CLOUD_PILLARS.map((pillar) => (
                <button
                  key={pillar.id}
                  onClick={() => setActiveCategory(pillar.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === pillar.id
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-zinc-800/20 text-gray-400 border-zinc-700/40 hover:text-gray-200'
                  }`}
                >
                  {pillar.title}
                </button>
              ))}
            </div>

            {/* Grid of Cards */}
            {filteredPillars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPillars.map((pillar) => (
                  <ConceptCard
                    key={pillar.id}
                    pillar={pillar}
                    searchQuery={searchQuery}
                    onSelectSubItem={setSelectedSubItem}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-xl" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-main)' }}>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Nenhum conceito encontrado para a busca &quot;{searchQuery}&quot;.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="mt-3 text-xs text-emerald-500 hover:underline cursor-pointer"
                >
                  Limpar filtros de pesquisa
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Shared Responsibility Model */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <SharedResponsibilityMatrix />
          </div>
        )}

        {/* Tab 4: Knowledge Evaluation Quiz */}
        {activeTab === 'quiz' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <ArchitectureQuiz />
          </div>
        )}
      </main>

      {/* Floating Back-to-Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-500 transition-all cursor-pointer z-30 focus:outline-none"
        title="Voltar ao Topo"
        aria-label="Voltar ao topo da página"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Deep-Dive Modal Drawer */}
      <ConceptDetailModal subItem={selectedSubItem} onClose={() => setSelectedSubItem(null)} />

      {/* Minimal Footer */}
      <footer
        className="mt-12 border-t py-6 text-center text-xs transition-colors"
        style={{
          borderColor: 'var(--border-main)',
          color: 'var(--text-muted)',
          backgroundColor: 'var(--bg-main)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-dim)' }}>
          <div>
            Analysis: Cloud Architecture v2.0 // Node Status: <span className="text-[#10b981] font-bold">Stable</span>
          </div>
          <div className="italic tracking-normal text-[11px]">
            Cloud Computing Concept Map — Professional Expert Edition
          </div>
        </div>
      </footer>
    </div>
  );
}
