import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Copy, Check, Download, ZoomIn, ZoomOut, RotateCcw, Code, Network, GitCommitHorizontal } from 'lucide-react';
import { ThemeMode } from '../types';
import { MERMAID_SEQUENTIAL_CODE, MERMAID_FLOWCHART_CODE } from '../data/cloudConcepts';

interface MermaidViewerProps {
  theme: ThemeMode;
  onSelectConcept?: (conceptId: string) => void;
}

export const MermaidViewer: React.FC<MermaidViewerProps> = ({ theme, onSelectConcept }) => {
  const [viewType, setViewType] = useState<'sequential' | 'flowchart' | 'code'>('sequential');
  const [copied, setCopied] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [renderingError, setRenderingError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(`mermaid-${Math.random().toString(36).substring(2, 9)}`);

  const currentCode = viewType === 'flowchart' ? MERMAID_FLOWCHART_CODE : MERMAID_SEQUENTIAL_CODE;

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      securityLevel: 'loose',
      themeVariables: {
        fontFamily: 'Inter, sans-serif',
        primaryColor: theme === 'dark' ? '#121216' : '#f9fafb',
        primaryTextColor: theme === 'dark' ? '#f3f4f6' : '#111827',
        primaryBorderColor: theme === 'dark' ? '#2e2e3a' : '#d1d5db',
        lineColor: theme === 'dark' ? '#10b981' : '#059669',
        mainBkg: theme === 'dark' ? '#121216' : '#f9fafb',
        nodeBkg: theme === 'dark' ? '#181820' : '#ffffff',
        clusterBkg: theme === 'dark' ? '#121216' : '#ffffff',
        titleColor: theme === 'dark' ? '#10b981' : '#059669',
        edgeLabelBackground: theme === 'dark' ? '#121216' : '#ffffff',
      },
    });

    if (viewType === 'code') return;

    let isMounted = true;

    const renderDiagram = async () => {
      setRenderingError(null);
      if (!containerRef.current) return;

      try {
        const uniqueId = `mermaid-svg-${Date.now()}`;
        const { svg } = await mermaid.render(uniqueId, currentCode);
        if (isMounted && containerRef.current) {
          containerRef.current.innerHTML = svg;
          
          // Add touch and click listeners to diagram elements
          const nodes = containerRef.current.querySelectorAll('.node, .mindmap-node, g.node');
          nodes.forEach((node) => {
            (node as HTMLElement).style.cursor = 'pointer';
            (node as HTMLElement).onclick = (e) => {
              e.stopPropagation();
              const textContent = node.textContent || '';
              if (onSelectConcept) {
                onSelectConcept(textContent.trim());
              }
            };
          });
        }
      } catch (err: unknown) {
        console.error('Mermaid render error:', err);
        if (isMounted) {
          setRenderingError('Falha ao renderizar a sintaxe do gráfico Mermaid.');
        }
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [theme, viewType, currentCode, onSelectConcept]);

  const handleCopyCode = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentCode);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = currentCode;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleDownloadSvg = () => {
    if (!containerRef.current) return;
    const svgEl = containerRef.current.querySelector('svg');
    if (!svgEl) return;

    const svgData = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `cloud-architecture-map-${viewType}-${theme}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
  };

  return (
    <section className="w-full rounded-xl border transition-colors shadow-lg overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-main)'
      }}>
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b"
        style={{ borderColor: 'var(--border-main)' }}>
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-emerald-500" />
          <h3 className="font-semibold text-base sm:text-lg tracking-tight" style={{ color: 'var(--text-main)' }}>
            Visualização Gráfica Interativa
          </h3>
          <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded-full border border-emerald-500/30 text-emerald-500 font-mono">
            Mermaid.js
          </span>
        </div>

        {/* View Switcher Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg p-1 border" style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-main)' }}>
            <button
              onClick={() => { setViewType('sequential'); setZoomLevel(1); }}
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                viewType === 'sequential'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <GitCommitHorizontal className="w-3.5 h-3.5" />
              Fluxo Sequencial
            </button>
            <button
              onClick={() => { setViewType('flowchart'); setZoomLevel(1); }}
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                viewType === 'flowchart'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              Visão Detalhada
            </button>
            <button
              onClick={() => setViewType('code')}
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                viewType === 'code'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              Código Source
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            {viewType !== 'code' && (
              <>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 2))}
                  className="p-1.5 rounded-md border text-gray-400 hover:text-emerald-400 hover:border-emerald-500 transition-colors cursor-pointer"
                  style={{ borderColor: 'var(--border-main)', backgroundColor: 'var(--bg-main)' }}
                  title="Aumentar Zoom"
                  aria-label="Aumentar zoom do diagrama"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.5))}
                  className="p-1.5 rounded-md border text-gray-400 hover:text-emerald-400 hover:border-emerald-500 transition-colors cursor-pointer"
                  style={{ borderColor: 'var(--border-main)', backgroundColor: 'var(--bg-main)' }}
                  title="Diminuir Zoom"
                  aria-label="Diminuir zoom do diagrama"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 rounded-md border text-gray-400 hover:text-emerald-400 hover:border-emerald-500 transition-colors cursor-pointer"
                  style={{ borderColor: 'var(--border-main)', backgroundColor: 'var(--bg-main)' }}
                  title="Resetar Zoom"
                  aria-label="Resetar zoom do diagrama"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDownloadSvg}
                  className="p-1.5 rounded-md border text-gray-400 hover:text-emerald-400 hover:border-emerald-500 transition-colors cursor-pointer"
                  style={{ borderColor: 'var(--border-main)', backgroundColor: 'var(--bg-main)' }}
                  title="Baixar SVG do Diagrama"
                  aria-label="Baixar diagrama em formato SVG"
                >
                  <Download className="w-4 h-4" />
                </button>
              </>
            )}

            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer"
              style={{
                backgroundColor: copied ? 'var(--accent-bg)' : 'var(--bg-main)',
                borderColor: copied ? 'var(--accent)' : 'var(--border-main)',
                color: copied ? 'var(--accent)' : 'var(--text-main)',
              }}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copiado!' : 'Copiar Código'}
            </button>
          </div>
        </div>
      </div>

      {/* Diagram Sub-legend Bar */}
      <div className="px-4 py-2 border-b flex flex-wrap items-center justify-between text-xs gap-3"
        style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-main)' }}>
        <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-gray-400 bg-gray-600/40 inline-block"></span>
            Original dos Slides
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block ring-2 ring-emerald-500/30"></span>
            <span className="font-semibold text-emerald-500">[ADICIONADO / COMPLEMENTAR]</span>
          </span>
        </div>
        <div className="font-mono text-[11px]" style={{ color: 'var(--text-dim)' }}>
          Mermaid v10 · Auto-adaptativo para Tema {theme === 'dark' ? 'Escuro' : 'Claro'}
        </div>
      </div>

      {/* Main Diagram Canvas or Code Box */}
      <div className="p-4 sm:p-8 min-h-[380px] flex items-center justify-center overflow-auto transition-all">
        {viewType === 'code' ? (
          <div className="w-full">
            <div className="flex items-center justify-between pb-2 mb-3 border-b text-xs font-mono" style={{ borderColor: 'var(--border-main)', color: 'var(--text-muted)' }}>
              <span>sintaxe: mermaid.js ({viewType})</span>
              <span>Cole no Mermaid Live Editor (mermaid.live)</span>
            </div>
            <pre className="p-4 rounded-lg font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed border"
              style={{ backgroundColor: 'var(--bg-main)', color: 'var(--accent)', borderColor: 'var(--border-main)' }}>
              <code>{currentCode}</code>
            </pre>
          </div>
        ) : renderingError ? (
          <div className="text-center p-6 text-red-400">
            <p className="font-medium text-sm">{renderingError}</p>
            <button
              onClick={() => setViewType('code')}
              className="mt-3 px-3 py-1.5 text-xs bg-red-500/20 text-red-300 rounded border border-red-500/40 hover:bg-red-500/30"
            >
              Ver Código Bruto
            </button>
          </div>
        ) : (
          <div
            className="mermaid-svg-container w-full flex justify-center items-center transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
            ref={containerRef}
            id={idRef.current}
          />
        )}
      </div>
    </section>
  );
};
