import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, UserCheck, Building2, HelpCircle } from 'lucide-react';
import { SHARED_RESPONSIBILITY_MATRIX } from '../data/cloudConcepts';

export const SharedResponsibilityMatrix: React.FC = () => {
  const [activeModel, setActiveModel] = useState<'iaas' | 'paas' | 'saas' | 'faas'>('iaas');

  const renderBadge = (type: 'customer' | 'provider' | 'shared') => {
    if (type === 'customer') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/15 text-amber-500 border border-amber-500/30">
          <UserCheck className="w-3 h-3" />
          Cliente
        </span>
      );
    }
    if (type === 'provider') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
          <Building2 className="w-3 h-3" />
          Provedor
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
        <HelpCircle className="w-3 h-3" />
        Compartilhado
      </span>
    );
  };

  return (
    <div className="rounded-xl border p-5 sm:p-6 transition-all shadow-lg"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-main)'
      }}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-5 border-b" style={{ borderColor: 'var(--border-main)' }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-lg tracking-tight" style={{ color: 'var(--text-main)' }}>
              Matriz do Modelo de Responsabilidade Compartilhada
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-500 border border-emerald-500/40">
              [ADICIONADO]
            </span>
          </div>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
            A regra de ouro da segurança em nuvem: O Provedor garante a segurança <strong>DA</strong> nuvem; o Cliente garante a segurança <strong>NA</strong> nuvem.
          </p>
        </div>

        {/* Model Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-lg border" style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-main)' }}>
          {(['iaas', 'paas', 'saas', 'faas'] as const).map((model) => (
            <button
              key={model}
              onClick={() => setActiveModel(model)}
              className={`px-3 py-1 text-xs font-semibold rounded-md uppercase transition-all cursor-pointer ${
                activeModel === model
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {model}
            </button>
          ))}
        </div>
      </div>

      {/* Model Context Summary Banner */}
      <div className="p-3.5 rounded-lg mb-5 text-xs sm:text-sm border flex items-center justify-between gap-3"
        style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)' }}>
        <div>
          <span className="font-bold uppercase text-emerald-500 mr-2">
            Modelo Ativo: {activeModel.toUpperCase()}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>
            {activeModel === 'iaas' && 'Você gerencia do SO para cima (patches, firewall, código, dados).'}
            {activeModel === 'paas' && 'O provedor cuida do SO e runtime; você foca apenas no código e dados.'}
            {activeModel === 'saas' && 'O provedor cuida de 100% da aplicação; você gerencia apenas acesso e dados.'}
            {activeModel === 'faas' && 'O provedor gerencia servidores e execuções; você escreve apenas a função.'}
          </span>
        </div>
      </div>

      {/* Interactive Responsibility Table */}
      <div className="overflow-x-auto rounded-lg border" style={{ borderColor: 'var(--border-main)' }}>
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="border-b uppercase font-mono text-[11px] tracking-wider"
              style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-main)', color: 'var(--text-muted)' }}>
              <th className="p-3.5">Camada de Arquitetura</th>
              <th className="p-3.5">Descrição</th>
              <th className="p-3.5 text-center">Responsável ({activeModel.toUpperCase()})</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
            {SHARED_RESPONSIBILITY_MATRIX.map((item, idx) => {
              const resp = item[activeModel];
              return (
                <tr
                  key={idx}
                  className="transition-colors hover:bg-emerald-500/5"
                  style={{ backgroundColor: idx % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-main)' }}
                >
                  <td className="p-3.5 font-medium" style={{ color: 'var(--text-main)' }}>
                    {item.layer}
                  </td>
                  <td className="p-3.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                    {item.description}
                  </td>
                  <td className="p-3.5 text-center whitespace-nowrap">
                    {renderBadge(resp)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Key Architectural Principle footer */}
      <div className="mt-4 pt-3 border-t flex items-center gap-2 text-xs" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-dim)' }}>
        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
        <span>
          A linha de demarcação varia conforme o modelo de serviço. Em SaaS você tem menos controle mas maior agilidade; em IaaS você tem controle total da pilha técnica.
        </span>
      </div>
    </div>
  );
};
