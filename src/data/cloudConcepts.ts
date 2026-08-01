import { ConceptPillar, SharedResponsibilityItem } from '../types';

export const CLOUD_PILLARS: ConceptPillar[] = [
  {
    id: 'characteristics',
    title: 'Características Principais',
    iconName: 'Zap',
    description: 'Atributos operacionais essenciais que definem o modelo financeiro e a agilidade da nuvem.',
    badgeText: 'Fundamentos',
    subItems: [
      {
        id: 'nist-def',
        title: 'Definição NIST & Conceito de Cloud',
        shortDesc: 'A definição oficial do NIST (SP 800-145) e os fundamentos constitutivos da computação em nuvem.',
        fullDesc: 'Segundo a publicação oficial NIST SP 800-145, a Computação em Nuvem é um modelo que permite acesso ubíquo, conveniente e sob demanda a um pool compartilhado de recursos computacionais configuráveis (redes, servidores, armazenamento, aplicações e serviços) que podem ser rapidamente provisionados e liberados com o mínimo esforço de gerenciamento ou interação com o provedor de serviços.',
        examples: ['Padrão ISO/IEC 17788', 'NIST SP 800-145 Framework', 'Cloud Adoption Frameworks (AWS/GCP/Azure CAF)'],
        keyTakeaways: ['5 características essenciais (On-Demand, Broad Network Access, Resource Pooling, Rapid Elasticity, Measured Service)', '3 modelos de serviço e 4 de implantação', 'Padrão global adotado por arquitetos de soluções'],
        architecturalImpact: 'Proporciona a linguagem técnica padronizada universalmente para avaliação e adoção de serviços de nuvem.'
      },
      {
        id: 'on-demand',
        title: 'Serviço On-demand (Self-service)',
        shortDesc: 'Ativação automática de recursos sem necessidade de intervenção humana do provedor.',
        fullDesc: 'Permite que usuários provisionem capacidades de computação (como tempo de servidor ou armazenamento de rede) automaticamente conforme a necessidade, via API, CLI ou console web.',
        examples: ['AWS Management Console', 'Google Cloud CLI', 'Terraform scripts'],
        keyTakeaways: ['Velocidade de provisionamento em segundos', 'Autonomia para times de desenvolvimento'],
        architecturalImpact: 'Elimina gargalos operacionais de ticketing e aprovação manual de hardware.'
      },
      {
        id: 'elasticity',
        title: 'Elasticidade Rápida (Rapid Elasticity)',
        shortDesc: 'Ajuste dinâmico e automático de recursos para cima ou para baixo conforme picos de carga.',
        fullDesc: 'Capacidade de alocar e desalocar recursos computacionais em tempo real para responder instantaneamente a variações de tráfego, evitando desperdício financeiro em horários ociosos.',
        examples: ['AWS Auto Scaling Groups', 'Kubernetes Horizontal Pod Autoscaler (HPA)', 'Azure Virtual Machine Scale Sets'],
        keyTakeaways: ['Desalocação em tempo real', 'Previne quedas por pico de tráfego'],
        architecturalImpact: 'Evita a necessidade de superdimensionamento (over-provisioning) preventivo.'
      },
      {
        id: 'pay-as-you-go',
        title: 'Pay-as-you-go (Serviço Mensurado)',
        shortDesc: 'Pagamento estritamente pelo tempo ou volume de recursos consumidos.',
        fullDesc: 'Modelo tarifário onde os recursos são monitorados, controlados e faturados com base em métricas de uso real (segundos de CPU, gigabytes armazenados, requisições HTTP).',
        examples: ['Cobrança por segundo em VMs', 'S3 por GB/mês', 'Lambda por milissegundo'],
        keyTakeaways: ['CapEx convertido em OpEx', 'Transparência no custo unitário'],
        architecturalImpact: 'Permite experimentar e validar hipóteses de negócios com investimento inicial irrisório.'
      },
      {
        id: 'scalability',
        title: 'Escalabilidade',
        isAdded: true,
        shortDesc: 'Capacidade planejada de expandir a infraestrutura verticalmente (Scale-up) ou horizontalmente (Scale-out).',
        fullDesc: 'Diferente da elasticidade (que é uma resposta dinâmica e automática de curto prazo), a escalabilidade é o design estrutural que permite ao sistema suportar aumento sustentado de carga sem perda de desempenho.',
        examples: ['Scale-up: Aumentar RAM de 16GB para 64GB em VM', 'Scale-out: Adicionar mais 10 instâncias ao cluster'],
        keyTakeaways: ['Scale-out (Horizontal) é preferível na nuvem', 'Evita single points of failure'],
        architecturalImpact: 'Arquiteturas stateless facilitam a escalabilidade horizontal quase infinita.'
      },
      {
        id: 'high-availability',
        title: 'Alta Disponibilidade (HA)',
        isAdded: true,
        shortDesc: 'Sistemas projetados para operar continuamente sem falhas perceptíveis, garantidos por SLAs.',
        fullDesc: 'Arquitetura que utiliza redundância, balanceamento de carga e réplicas distribuídas para garantir disponibilidade de 99.9% a 99.999% (os famintos "cinco noves").',
        examples: ['Multi-AZ deployment no RDS', 'Global Load Balancer com Health Checks'],
        keyTakeaways: ['Definida por SLAs contratuais', 'Exige redundância em múltiplos datacenters'],
        architecturalImpact: 'Garante continuidade do negócio mesmo em cenários de degradação física de hardware.'
      }
    ]
  },
  {
    id: 'deployment',
    title: 'Modelos de Implantação',
    iconName: 'Server',
    description: 'Estratégias de isolamento, propriedade e governança da infraestrutura física.',
    badgeText: 'Implantação',
    subItems: [
      {
        id: 'public-cloud',
        title: 'Nuvem Pública',
        shortDesc: 'Infraestrutura gerida por terceiros e partilhada entre vários clientes via internet pública.',
        fullDesc: 'Os recursos (servidores, redes, storage) são de propriedade de um provedor de nuvem (ex: AWS, Google) e compartilhados em modelo multi-tenant mantendo isolamento lógico rígido.',
        examples: ['AWS', 'Microsoft Azure', 'Google Cloud Platform'],
        keyTakeaways: ['Zero investimento prévio de hardware', 'Manutenção física 100% responsabilidade do provedor'],
        architecturalImpact: 'Proporciona alcance global instantâneo e inovação acelerada.'
      },
      {
        id: 'private-cloud',
        title: 'Nuvem Privada',
        shortDesc: 'Infraestrutura dedicada exclusivamente a uma única organização (on-premises ou terceirizada).',
        fullDesc: 'Oferece as características de auto-serviço e virtualização da nuvem, mas em um ambiente isolado onde hardware e rede são de uso exclusivo de uma corporação.',
        examples: ['VMware vSphere / Cloud Foundation', 'OpenStack on-premises', 'AWS Outposts'],
        keyTakeaways: ['Controle total de segurança e dados', 'Custo operacional elevado (CapEx/OpEx)'],
        architecturalImpact: 'Atende requisitos regulatórios estritos que proíbem multi-tenancy.'
      },
      {
        id: 'hybrid-cloud',
        title: 'Nuvem Híbrida',
        shortDesc: 'Combinação orquestrada de nuvem pública e privada com portabilidade de dados e apps.',
        fullDesc: 'Integra ambientes on-premises e nuvens públicas através de conexões dedicadas ou VPNs seguras, permitindo Cloud Bursting e migrações graduais.',
        examples: ['AWS Direct Connect + On-Prem', 'Azure Arc', 'Google Anthos'],
        keyTakeaways: ['Conecta legado com sistemas modernos', 'Portabilidade via containers'],
        architecturalImpact: 'Permite manter dados críticos no datacenter local enquanto usa a nuvem para cargas voláteis.'
      },
      {
        id: 'multicloud',
        title: 'Multicloud',
        shortDesc: 'Uso estratégico de múltiplos provedores de nuvem pública para otimizar serviços e custos.',
        fullDesc: 'Uso concomitante de duas ou mais nuvens públicas (ex: AWS + GCP) para mitigar risco de vendor lock-in, atender requisitos de latência regional ou aproveitar especialidades únicas de cada provedor.',
        examples: ['Workloads em AWS + Big Data / IA em GCP', 'Disaster Recovery cruzado'],
        keyTakeaways: ['Evita dependência de um único fornecedor', 'Aumenta complexidade de governança e rede'],
        architecturalImpact: 'Exige abstrações de infraestrutura como código neutras (Terraform, Pulumi).'
      },
      {
        id: 'community-cloud',
        title: 'Nuvem Comunitária',
        isAdded: true,
        shortDesc: 'Infraestrutura compartilhada por diversas organizações com requisitos e interesses comuns.',
        fullDesc: 'Ambiente compartilhado exclusivamente por organizações que possuem preocupações idênticas (ex: normas de conformidade bancárias, órgãos governamentais ou hospitais).',
        examples: ['GovCloud da AWS para agências federais dos EUA', 'Redes de cooperação bancária'],
        keyTakeaways: ['Custos divididos entre participantes', 'Conformidade setorial pré-aprovada'],
        architecturalImpact: 'Reduz custos de auditoria para regulamentações altamente específicas.'
      }
    ]
  },
  {
    id: 'services',
    title: 'Modelos de Serviço',
    iconName: 'Layers',
    description: 'Níveis de abstração e divisão de responsabilidade entre cliente e provedor.',
    badgeText: 'Abstração',
    subItems: [
      {
        id: 'iaas',
        title: 'IaaS (Infraestrutura como Serviço)',
        shortDesc: 'Fornece infraestrutura virtualizada (VMs, redes, storage). O cliente gerencia SO e apps.',
        fullDesc: 'Nível mais baixo de abstração. O provedor entrega capacidade de processamento, armazenamento e redes virtuais. O cliente tem controle total do Sistema Operacional até a aplicação.',
        examples: ['AWS EC2', 'Google Compute Engine', 'Azure VMs', 'DigitalOcean Droplets'],
        keyTakeaways: ['Máxima flexibilidade e controle', 'Exige gerenciamento de patches de SO e firewall'],
        architecturalImpact: 'Ideal para migração "Lift-and-Shift" de sistemas legados.'
      },
      {
        id: 'paas',
        title: 'PaaS (Plataforma como Serviço)',
        shortDesc: 'Ambiente completo de desenvolvimento e deploy. O cliente foca apenas no código.',
        fullDesc: 'O provedor gerencia o SO, servidores, bancos de dados e runtime. O desenvolvedor apenas envia o código da aplicação sem preocupações com infraestrutura subjacente.',
        examples: ['AWS Elastic Beanstalk', 'Google App Engine', 'Heroku', 'Vite / Cloud Run'],
        keyTakeaways: ['Foco total no código e regra de negócio', 'Menos controle sobre tuning de SO'],
        architecturalImpact: 'Acelera drasticamente o time-to-market para novas aplicações web e APIs.'
      },
      {
        id: 'saas',
        title: 'SaaS (Software como Serviço)',
        shortDesc: 'Aplicativos prontos hospedados e mantidos integralmente pelo provedor.',
        fullDesc: 'Modelo de consumo final onde o software é acessado via navegador ou aplicativo móvel. Toda a manutenção, atualização, disponibilidade e segurança é gerida pelo fornecedor.',
        examples: ['Google Workspace / Gmail', 'Microsoft 365', 'Salesforce', 'Slack'],
        keyTakeaways: ['Zero esforço de desenvolvimento', 'Modelo de assinatura recorrente por usuário'],
        architecturalImpact: 'Substitui desenvolvimento interno de ferramentas utilitárias padronizadas.'
      },
      {
        id: 'faas',
        title: 'FaaS / Serverless (Function as a Service)',
        isAdded: true,
        shortDesc: 'Execução de funções acionadas por eventos, cobradas estritamente por milissegundo de uso.',
        fullDesc: 'O desenvolvedor escreve funções discretas que permanecem inativas até serem disparadas por eventos (requisições HTTP, novos arquivos em storage, mensagens em fila). O provedor escala de 0 a milhares de instâncias instantaneamente.',
        examples: ['AWS Lambda', 'Google Cloud Functions', 'Azure Functions'],
        keyTakeaways: ['Custo zero quando ocioso', 'Escala automática de 0 a N instâncias'],
        architecturalImpact: 'Ideal para arquiteturas event-driven e APIs de microsserviços.'
      },
      {
        id: 'caas',
        title: 'CaaS (Container as a Service)',
        isAdded: true,
        shortDesc: 'Orquestração gerenciada de containers para empacotamento e deploy padronizado.',
        fullDesc: 'Plataformas que simplificam a implantação, dimensionamento e gerenciamento de containers Docker através de orquestradores como Kubernetes totalmente gerenciados.',
        examples: ['AWS EKS / ECS', 'Google Kubernetes Engine (GKE)', 'Azure AKS'],
        keyTakeaways: ['Padronização entre dev e prod', 'Elimina o overhead de gerenciar a control plane do K8s'],
        architecturalImpact: 'Padrão da indústria para microsserviços e portabilidade de aplicações.'
      }
    ]
  },
  {
    id: 'infrastructure',
    title: 'Infraestrutura Global',
    iconName: 'Globe',
    description: 'Rede física de datacenters, conexões de fibra e pontos de presença espalhados pelo mundo.',
    badgeText: 'Rede Física',
    subItems: [
      {
        id: 'regions',
        title: 'Regiões (Regions)',
        shortDesc: 'Área geográfica física que contém múltiplos clusters independentes de datacenters.',
        fullDesc: 'Uma região é uma zona geográfica distinta (ex: us-east-1 em N. Virginia ou sa-east-1 em São Paulo) que abriga múltiplos datacenters. Regiões são isoladas entre si para suportar conformidade e soberania de dados.',
        examples: ['us-east-1 (N. Virginia)', 'sa-east-1 (São Paulo)', 'eu-west-1 (Irlanda)'],
        keyTakeaways: ['Critério de escolha: Latência, Preço e Conformidade legal', 'Regiões não compartilham falhas'],
        architecturalImpact: 'Determina onde os dados do usuário residirão fisicamente.'
      },
      {
        id: 'availability-zones',
        title: 'Zonas de Disponibilidade (AZs)',
        shortDesc: 'Datacenters físicos distintos dentro de uma região, com energia e rede independentes.',
        fullDesc: 'Cada Região é composta por no mínimo 2 a 6 Zonas de Disponibilidade isoladas. Cada AZ é um ou mais datacenters com suprimento de energia, refrigeração e segurança física próprios, conectados por redes de altíssima velocidade e baixíssima latência.',
        examples: ['us-east-1a, us-east-1b, us-east-1c'],
        keyTakeaways: ['Distantes o suficiente para evitar desastres simultâneos', 'Conectadas por fibra com latência sub-milissegundo'],
        architecturalImpact: 'Implantar aplicações distribuídas entre 2+ AZs é o requisito base de Alta Disponibilidade.'
      },
      {
        id: 'edge-locations',
        title: 'Pontos de Presença (Edge Locations / CDN)',
        isAdded: true,
        shortDesc: 'Datacenters perimétricos para cache local de dados e redução drástica de latência.',
        fullDesc: 'Locais de infraestrutura distribuídos em centenas de grandes cidades pelo mundo. Funcionam como pontos de cache de borda (CDN) e otimizadores de rota para entregar conteúdos dinâmicos e estáticos com menor tempo de resposta.',
        examples: ['AWS CloudFront Edge', 'Cloudflare Points of Presence', 'Google Cloud CDN'],
        keyTakeaways: ['Reduz a latência para o usuário final', 'Proteção integrada contra ataques DDoS (WAF)'],
        architecturalImpact: 'Descarrega requisições repetitivas dos servidores principais de backend.'
      },
      {
        id: 'load-balancing',
        title: 'Balanceamento de Carga & Disaster Recovery',
        isAdded: true,
        shortDesc: 'Distribuição inteligente de tráfego entre instâncias e mitigação de desastres operacionais.',
        fullDesc: 'Balanceadores de Carga (Load Balancers) atuam como o ponto de entrada da aplicação, distribuindo requisições HTTP/HTTPS/TCP entre múltiplas instâncias saudáveis espalhadas em diferentes Zonas de Disponibilidade. Em conjunto com estratégias de Disaster Recovery (RPO e RTO), previnem gargalos de tráfego e garantem continuidade dos negócios.',
        examples: ['AWS Application Load Balancer (ALB)', 'Google Cloud HTTP(S) Load Balancing', 'Azure Front Door / Traffic Manager'],
        keyTakeaways: ['Health checks contínuos removem instâncias com falha do rodízio', 'Descarregamento de criptografia SSL/TLS (Offloading)', 'Terminação de sessão e persistência (Sticky Sessions)'],
        architecturalImpact: 'Elimina o ponto único de falha (SPOF) na camada de rede e possibilita zero-downtime deployments (Blue/Green).'
      }
    ]
  },
  {
    id: 'providers',
    title: 'Principais Provedores',
    iconName: 'Cloud',
    description: 'Os grandes hiperescaladores de nuvem que dominam o mercado global.',
    badgeText: 'Mercado',
    subItems: [
      {
        id: 'aws',
        title: 'Amazon Web Services (AWS)',
        shortDesc: 'Líder de mercado com maior ecossistema e catálogo de serviços da indústria.',
        fullDesc: 'Pioneira e líder em nuvem pública desde 2006. Conhecida por sua abrangência imensa de serviços, maturidade em segurança e ecossistema gigantesco de parceiros e certificações.',
        examples: ['Amazon EC2 (VMs)', 'Amazon S3 (Storage)', 'Amazon RDS (Relational DB)', 'Amazon EKS (Kubernetes)'],
        keyTakeaways: ['Maior market share global', 'Documentação e comunidade massivas'],
        architecturalImpact: 'Escolha padrão em muitas empresas devido ao catálogo profundo.'
      },
      {
        id: 'azure',
        title: 'Microsoft Azure',
        shortDesc: 'Forte presença em empresas corporativas e ecossistemas legados Windows/Active Directory.',
        fullDesc: 'Segundo maior provedor global. Destaca-se pela integração perfeita com identidades corporativas (Entra ID / Active Directory), contratos corporativos consolidados e forte presença em ambientes híbridos.',
        examples: ['Azure VMs', 'Azure App Services', 'Azure Cosmos DB', 'Entra ID (Azure AD)'],
        keyTakeaways: ['Líder em integração com sistemas corporativos Microsoft', 'Excelente suporte para Nuvem Híbrida'],
        architecturalImpact: 'Facilita migrações de empresas que já utilizam licenciamento Microsoft.'
      },
      {
        id: 'gcp',
        title: 'Google Cloud Platform (GCP)',
        shortDesc: 'Referência global em Big Data, Analytics, Inteligência Artificial e Containers.',
        fullDesc: 'Terceiro maior provedor global. Notório por sua infraestrutura de rede global proprietária de alta velocidade, excelência em processamento analítico de massa e liderança nativa em Kubernetes e modelos de IA (Gemini).',
        examples: ['Google BigQuery (Data Warehouse)', 'Google Kubernetes Engine (GKE)', 'Compute Engine'],
        keyTakeaways: ['Referência em Big Data e Machine Learning', 'Criadora do Kubernetes (GKE é a melhor experiência)'],
        architecturalImpact: 'Provedor de escolha para pipelines de dados massivos e treinamento de modelos de IA.'
      }
    ]
  },
  {
    id: 'security',
    title: 'Segurança & Governança',
    iconName: 'ShieldCheck',
    description: 'Regras de ouro, disciplina financeira e controle de acessos em nuvem.',
    badgeText: 'ADICIONADO',
    isAddedPillar: true,
    subItems: [
      {
        id: 'shared-responsibility',
        title: 'Modelo de Responsabilidade Compartilhada',
        isAdded: true,
        shortDesc: 'Regra de ouro que divide obrigações de segurança entre Provedor e Cliente.',
        fullDesc: 'Definição crucial que estipula: O Provedor é responsável pela "Segurança DA Nuvem" (hardware, datacenters físicos, refrigeração, rede física e hipervisor). O Cliente é responsável pela "Segurança NA Nuvem" (dados, criptografia, configurações de firewall, gestão de contas e código).',
        examples: ['Provedor protege o servidor do S3', 'Cliente configura permissões de bucket público vs privado'],
        keyTakeaways: ['Provedor cuida DA nuvem', 'Cliente cuida NA nuvem'],
        architecturalImpact: 'Evita a falsa premissa de que ir para a nuvem torna a aplicação automaticamente segura sem configuração.'
      },
      {
        id: 'finops',
        title: 'FinOps (Cloud Financial Management)',
        isAdded: true,
        shortDesc: 'Cultura e prática para otimizar continuamente custos de nuvem com responsabilidade.',
        fullDesc: 'União de Engenharia, Finanças e Negócios para promover responsabilidade financeira na nuvem através de métricas de custos por serviço/time, reservas de instâncias (Savings Plans), visibilidade em tempo real e eliminação de recursos ociosos.',
        examples: ['Alertas de orçamento no AWS Cost Explorer', 'Rightsizing de instâncias', 'Desligar ambientes de dev à noite'],
        keyTakeaways: ['Custo é uma variável de engenharia', 'Evita surpresas no faturamento mensal'],
        architecturalImpact: 'Transforma gastos de TI de um mistério contábil em alavanca estratégica de eficiência.'
      },
      {
        id: 'iam',
        title: 'IAM (Gestão de Identidades e Acessos)',
        isAdded: true,
        shortDesc: 'Controle rigoroso de quem pode acessar o quê sob o Princípio do Privilégio Mínimo.',
        fullDesc: 'Serviço central que gerencia identidades (usuários, aplicações, papéis/roles) e suas permissões granulares. Exige autenticação de múltiplos fatores (MFA) e políticas restritivas.',
        examples: ['AWS IAM Policies e Roles', 'GCP Service Accounts', 'Azure RBAC Roles'],
        keyTakeaways: ['Princípio do privilégio mínimo (Least Privilege)', 'Nunca usar credenciais root/admin no dia a dia'],
        architecturalImpact: 'Constitui a primeira linha de defesa contra vazamentos de dados na nuvem.'
      }
    ]
  }
];

export const MERMAID_SEQUENTIAL_CODE = `graph TD
    subgraph L1 ["🟢 NÍVEL 1: FUNDAMENTOS & O QUE É CLOUD (Superficial)"]
        N1_1["1.1 Definição NIST & Conceito"] --> N1_2["1.2 On-Demand Self-Service"]
        N1_2 --> N1_3["1.3 Pay-As-You-Go & OpEx"]
        N1_3 --> N1_4["1.4 Elasticidade Rápida"]
    end

    subgraph L2 ["🔵 NÍVEL 2: ONDE & COMO RODA A NUVEM"]
        N2_1["2.1 Modelos: Pública, Privada, Híbrida, Multicloud"] --> N2_2["2.2 Infra Global: Regiões & Zonas de Disponibilidade (AZs)"]
        N2_2 --> N2_3["2.3 Edge Locations & CDNs ⭐"]
    end

    subgraph L3 ["🟣 NÍVEL 3: MODELOS DE SERVIÇO & COMPUTÇÃO"]
        N3_1["3.1 Pirâmide: IaaS ➔ PaaS ➔ SaaS"] --> N3_2["3.2 CaaS: Containers & Kubernetes ⭐"]
        N3_2 --> N3_3["3.3 FaaS & Serverless ⭐"]
        N3_3 --> N3_4["3.4 Provedores: AWS, Azure, GCP"]
    end

    subgraph L4 ["🟠 NÍVEL 4: ARQUITETURA, RESILIÊNCIA & ESCALABILIDADE"]
        N4_1["4.1 Escalabilidade Horizontal vs Vertical ⭐"] --> N4_2["4.2 Alta Disponibilidade & Redundância Multi-AZ ⭐"]
        N4_2 --> N4_3["4.3 Disaster Recovery & Load Balancing"]
    end

    subgraph L5 ["⭐ NÍVEL 5: SEGURANÇA PROFUNDA, FINOPS & GOVERNANÇA (Profundo)"]
        N5_1["5.1 Resp. Compartilhada: Segurança DA vs NA Nuvem ⭐"] --> N5_2["5.2 IAM & Princípio do Privilégio Mínimo ⭐"]
        N5_2 --> N5_3["5.3 FinOps & Engenharia Financeira de Nuvem ⭐"]
    end

    N1_4 ==> N2_1
    N2_3 ==> N3_1
    N3_4 ==> N4_1
    N4_3 ==> N5_1

    classDef lev1 fill:#1e293b,stroke:#3b82f6,color:#f8fafc,stroke-width:2px;
    classDef lev2 fill:#1e293b,stroke:#06b6d4,color:#f8fafc,stroke-width:2px;
    classDef lev3 fill:#1e293b,stroke:#8b5cf6,color:#f8fafc,stroke-width:2px;
    classDef lev4 fill:#1e293b,stroke:#f59e0b,color:#f8fafc,stroke-width:2px;
    classDef lev5 fill:#064e3b,stroke:#10b981,color:#ffffff,stroke-width:3px;

    class N1_1,N1_2,N1_3,N1_4 lev1;
    class N2_1,N2_2,N2_3 lev2;
    class N3_1,N3_2,N3_3,N3_4 lev3;
    class N4_1,N4_2,N4_3 lev4;
    class N5_1,N5_2,N5_3 lev5;
`;

export interface SequentialLevel {
  levelNumber: number;
  depthLabel: 'Superficial' | 'Básico' | 'Intermediário' | 'Avançado' | 'Profundo / Arquiteto';
  title: string;
  badgeColor: string;
  borderColor: string;
  description: string;
  keyGoal: string;
  topics: {
    title: string;
    description: string;
    isAdded?: boolean;
    subItemId?: string;
    subItemIds?: string[];
  }[];
}

export const SEQUENTIAL_LEARNING_LEVELS: SequentialLevel[] = [
  {
    levelNumber: 1,
    depthLabel: 'Superficial',
    title: 'Nível 1: Fundamentos & O Que É Cloud Computing?',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    borderColor: 'border-blue-500/40',
    description: 'A camada mais superficial do conhecimento. Entenda a definição formal da nuvem, a mudança de paradigma do modelo tradicional (CapEx) para o modelo sob demanda (OpEx) e suas 5 características vitais.',
    keyGoal: 'Entender a definição do NIST e saber explicar por que as empresas abandonam datacenters físicos locais.',
    topics: [
      {
        title: 'Definição NIST & Conceito de Cloud',
        description: 'Acesso ubíquo, conveniente e sob demanda a recursos computacionais configuráveis.',
        subItemId: 'nist-def'
      },
      {
        title: 'Serviço On-Demand & Self-Service',
        description: 'Provisionamento de servidores e armazenamento sem precisar falar com atendentes humanos.',
        subItemId: 'on-demand'
      },
      {
        title: 'Pay-As-You-Go (OpEx vs CapEx)',
        description: 'Pague apenas pelo que consumir. Troca de grandes investimentos iniciais por custos operacionais contínuos.',
        subItemId: 'pay-as-you-go'
      },
      {
        title: 'Elasticidade Rápida',
        description: 'A capacidade de expandir e encolher recursos automaticamente conforme a demanda oscila.',
        subItemId: 'elasticity'
      }
    ]
  },
  {
    levelNumber: 2,
    depthLabel: 'Básico',
    title: 'Nível 2: Modelos de Implantação & Infraestrutura Global',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    borderColor: 'border-cyan-500/40',
    description: 'Entenda onde seus dados rodam fisicamente e como a nuvem é isolada ou compartilhada entre empresas e usuários ao redor do globo.',
    keyGoal: 'Saber diferenciar Nuvem Pública, Privada, Híbrida e Multicloud, além de entender Regiões, AZs e CDNs.',
    topics: [
      {
        title: 'Nuvem Pública vs Privada vs Híbrida',
        description: 'Os diferentes isolamentos e integrações entre infraestrutura própria e provedores de nuvem.',
        subItemIds: ['public-cloud', 'private-cloud', 'hybrid-cloud']
      },
      {
        title: 'Multicloud & Nuvem Comunitária',
        description: 'Estratégia de usar múltiplos provedores (AWS + GCP) para evitar lock-in e garantir resiliência extrema.',
        isAdded: true,
        subItemIds: ['multicloud', 'community-cloud']
      },
      {
        title: 'Infra Global: Regiões & Zonas de Disponibilidade (AZs)',
        description: 'Datacenters isolados e geograficamente distribuídos ligados por redes de altíssima velocidade.',
        subItemIds: ['regions', 'availability-zones']
      },
      {
        title: 'Edge Locations & Content Delivery Networks (CDN)',
        description: 'Pontos de presença periféricos que entregam conteúdo em cache com latência ultrabaixa.',
        isAdded: true,
        subItemId: 'edge-locations'
      }
    ]
  },
  {
    levelNumber: 3,
    depthLabel: 'Intermediário',
    title: 'Nível 3: Modelos de Serviço & Abstração Computacional',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    borderColor: 'border-purple-500/40',
    description: 'Nível intermediário onde você escolhe quanto controle técnico deseja ter sobre o sistema operacional e os servidores versus focar apenas no código.',
    keyGoal: 'Comparar IaaS, PaaS e SaaS, e dominar as abstrações modernas de CaaS (Containers) e FaaS (Serverless).',
    topics: [
      {
        title: 'Tríade de Serviços: IaaS, PaaS e SaaS',
        description: 'Do aluguel de máquinas virtuais (IaaS) até o uso direto de softwares prontos (SaaS).',
        subItemIds: ['iaas', 'paas', 'saas']
      },
      {
        title: 'CaaS: Containers & Orquestração (Kubernetes)',
        description: 'Empacotamento de aplicações em microsserviços portáveis entre qualquer ambiente.',
        isAdded: true,
        subItemId: 'caas'
      },
      {
        title: 'FaaS / Serverless Computing',
        description: 'Execução de código orientada a eventos sem qualquer gerenciamento de servidor. Cobrança por milissegundo.',
        isAdded: true,
        subItemId: 'faas'
      },
      {
        title: 'Provedores Líderes (AWS, Azure, GCP)',
        description: 'Ecossistemas dos três gigantes do mercado de nuvem pública e suas especialidades técnicas.',
        subItemIds: ['aws', 'azure', 'gcp']
      }
    ]
  },
  {
    levelNumber: 4,
    depthLabel: 'Avançado',
    title: 'Nível 4: Arquitetura, Resiliência & Escalabilidade',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    borderColor: 'border-amber-500/40',
    description: 'Nível avançado de engenharia. Como projetar sistemas altamente disponíveis que toleram falhas de datacenters inteiros sem sair do ar.',
    keyGoal: 'Desenhar topologias de alta disponibilidade com balanceamento de carga e estratégias de escalabilidade automatizada.',
    topics: [
      {
        title: 'Escalabilidade Horizontal (Scale-Out) vs Vertical (Scale-Up)',
        description: 'Adicionar mais servidores pareados em vez de apenas colocar mais RAM em um único servidor.',
        isAdded: true,
        subItemId: 'scalability'
      },
      {
        title: 'Alta Disponibilidade (HA) & Redundância Multi-AZ',
        description: 'Distribuir réplicas ativas da aplicação em múltiplas zonas físicas tolerantes a desastres.',
        isAdded: true,
        subItemIds: ['high-availability', 'availability-zones']
      },
      {
        title: 'Balanceadores de Carga (Load Balancers)',
        description: 'Distribuidores inteligentes de tráfego que direcionam requisições apenas para servidores saudáveis.',
        subItemId: 'load-balancing'
      }
    ]
  },
  {
    levelNumber: 5,
    depthLabel: 'Profundo / Arquiteto',
    title: 'Nível 5: Governança, Segurança Profunda & FinOps',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    borderColor: 'border-emerald-500/40',
    description: 'O nível mais profundo de especialização. Abrange a responsabilidade jurídica e operacional da segurança, controle granular de acessos e eficiência financeira avançada.',
    keyGoal: 'Garantir conformidade total de segurança e controle financeiro preditivo em larga escala empresarial.',
    topics: [
      {
        title: 'Modelo de Responsabilidade Compartilhada',
        description: 'A regra fundamental: O provedor cuida da segurança DA nuvem, o cliente cuida da segurança NA nuvem.',
        isAdded: true,
        subItemId: 'shared-responsibility'
      },
      {
        title: 'IAM & Princípio do Privilégio Mínimo',
        description: 'Gestão granular de acessos e papéis (Roles) com MFA obrigatório e auditoria contínua de segurança.',
        isAdded: true,
        subItemId: 'iam'
      },
      {
        title: 'FinOps & Engenharia Financeira de Nuvem',
        description: 'Cultura e métricas de controle financeiro para eliminar desperdício de infraestrutura sem perder agilidade.',
        isAdded: true,
        subItemId: 'finops'
      }
    ]
  }
];


export const MERMAID_FLOWCHART_CODE = `graph TD
    Root["☁️ Cloud Computing"] --> Char["⚡ Características"]
    Root --> Dep["🌐 Modelos de Implantação"]
    Root --> Serv["🧩 Modelos de Serviço"]
    Root --> Infra["🏢 Infraestrutura Global"]
    Root --> Prov["☁️ Provedores"]
    Root --> Sec["🛡️ Segurança & Governança ⭐"]

    Char --> C1["On-Demand Self-Service"]
    Char --> C2["Elasticidade Rápida"]
    Char --> C3["Pay-As-You-Go"]
    Char --> C4["Escalabilidade ⭐"]
    Char --> C5["Alta Disponibilidade ⭐"]

    Dep --> D1["Nuvem Pública"]
    Dep --> D2["Nuvem Privada"]
    Dep --> D3["Nuvem Híbrida"]
    Dep --> D4["Multicloud"]
    Dep --> D5["Nuvem Comunitária ⭐"]

    Serv --> S1["IaaS - Infraestrutura"]
    Serv --> S2["PaaS - Plataforma"]
    Serv --> S3["SaaS - Software"]
    Serv --> S4["FaaS - Serverless ⭐"]
    Serv --> S5["CaaS - Containers ⭐"]

    Infra --> I1["Regiões físicas"]
    Infra --> I2["Zonas de Disponibilidade (AZ)"]
    Infra --> I3["Edge Locations / CDN ⭐"]

    Prov --> P1["AWS (Amazon)"]
    Prov --> P2["Azure (Microsoft)"]
    Prov --> P3["GCP (Google)"]

    Sec --> SEC1["Modelo de Responsabilidade Compartilhada ⭐"]
    Sec --> SEC2["FinOps & Otimização de Custo ⭐"]
    Sec --> SEC3["IAM - Gestão de Acesso Granular ⭐"]

    classDef add fill:#10b981,stroke:#059669,color:#ffffff,font-weight:bold;
    class C4,C5,D5,S4,S5,I3,Sec,SEC1,SEC2,SEC3 add;
`;

export const SHARED_RESPONSIBILITY_MATRIX: SharedResponsibilityItem[] = [
  {
    layer: 'Dados do Cliente & Classificação de Informação',
    description: 'Propriedade intelectual, registros bancários, dados sensíveis dos usuários.',
    iaas: 'customer',
    paas: 'customer',
    saas: 'customer',
    faas: 'customer'
  },
  {
    layer: 'Gestão de Usuários & Controle de Acessos (IAM)',
    description: 'Autenticação, MFA, permissões de usuários e senhas.',
    iaas: 'customer',
    paas: 'customer',
    saas: 'customer',
    faas: 'customer'
  },
  {
    layer: 'Código da Aplicação & Regras de Negócio',
    description: 'Frontends, backends, APIs, microsserviços e bibliotecas.',
    iaas: 'customer',
    paas: 'customer',
    saas: 'provider',
    faas: 'customer'
  },
  {
    layer: 'Runtime & Configuração do Servidor Web',
    description: 'Ambientes Node.js, Python, Java, JVM e servidores Nginx/Apache.',
    iaas: 'customer',
    paas: 'provider',
    saas: 'provider',
    faas: 'provider'
  },
  {
    layer: 'Sistema Operacional & Patches de Segurança',
    description: 'Kernel do Linux/Windows, atualizações do SO, antivírus.',
    iaas: 'customer',
    paas: 'provider',
    saas: 'provider',
    faas: 'provider'
  },
  {
    layer: 'Redes Virtuais & Regras de Firewall (Security Groups)',
    description: 'VPCs, sub-redes virtuais, regras de portas de entrada e saída.',
    iaas: 'customer',
    paas: 'shared',
    saas: 'provider',
    faas: 'provider'
  },
  {
    layer: 'Virtualização & Hipervisor',
    description: 'KVM, Xen, Nitro, isolamento entre máquinas virtuais.',
    iaas: 'provider',
    paas: 'provider',
    saas: 'provider',
    faas: 'provider'
  },
  {
    layer: 'Hardware Físico, Servidores & Storage',
    description: 'Racks de servidores, discos rígidos, memória RAM física.',
    iaas: 'provider',
    paas: 'provider',
    saas: 'provider',
    faas: 'provider'
  },
  {
    layer: 'Segurança Física do Datacenter',
    description: 'Controle de portaria, biometria, geradores de energia, refrigeração.',
    iaas: 'provider',
    paas: 'provider',
    saas: 'provider',
    faas: 'provider'
  }
];

export const KNOWLEDGE_QUIZ = [
  {
    id: 1,
    question: 'Qual a principal diferença entre Elasticidade Rápida e Escalabilidade?',
    options: [
      'Elasticidade é apenas para servidores Windows, enquanto Escalabilidade é para Linux.',
      'Elasticidade é a resposta automática e dinâmica de curto prazo a oscilações de tráfego, enquanto Escalabilidade é a capacidade projetada do sistema de expandir sustentadamente.',
      'Elasticidade significa comprar mais servidores físicos, enquanto Escalabilidade significa usar apenas SaaS.',
      'Não há diferença, são termos exatamente sinônimos na computação em nuvem.'
    ],
    correctIndex: 1,
    explanation: 'Exato! A Elasticidade ajusta automaticamente recursos para cima/baixo em tempo real, enquanto a Escalabilidade é o design arquitetural que suporta crescimento contínuo de carga.'
  },
  {
    id: 2,
    question: 'No Modelo de Responsabilidade Compartilhada para IaaS (ex: AWS EC2), quem é responsável por aplicar atualizações de segurança no Sistema Operacional da VM?',
    options: [
      '100% responsabilidade do Provedor de Nuvem (ex: AWS, Azure, GCP).',
      'O Cliente que provisionou a VM.',
      'Uma entidade governamental externa.',
      'O fabricante do processador (Intel/AMD).'
    ],
    correctIndex: 1,
    explanation: 'Correto! Em IaaS, o provedor garante apenas o hardware e a virtualização. O cliente gerencia o Sistema Operacional instalado na VM, incluindo patches e segurança.'
  },
  {
    id: 3,
    question: 'Qual modelo de serviço ajusta os custos a R$ 0 quando inativo e é disparado estritamente por eventos (event-driven)?',
    options: [
      'IaaS (Infraestrutura como Serviço)',
      'SaaS (Software como Serviço)',
      'FaaS / Serverless (Function as a Service)',
      'Nuvem Privada On-Premises'
    ],
    correctIndex: 2,
    explanation: 'Perfeito! No modelo FaaS (ex: AWS Lambda, Cloud Functions), o código só roda e cobra milissegundos quando um evento o aciona. Fica a custo zero quando inativo.'
  },
  {
    id: 4,
    question: 'O que caracteriza uma Zona de Disponibilidade (AZ)?',
    options: [
      'Um país inteiro sem datacenters.',
      'Um único rack de computador dentro de uma sala de escritório.',
      'Datacenters físicos distintos dentro de uma mesma Região, com infraestruturas de energia e rede independentes.',
      'Uma conta gratuita de testes para desenvolvedores.'
    ],
    correctIndex: 2,
    explanation: 'Exato! Cada AZ consiste em um ou mais datacenters isolados fisicamente dentro de uma Região para mitigar falhas catastróficas em um único ponto.'
  },
  {
    id: 5,
    question: 'O que é a disciplina de FinOps na nuvem?',
    options: [
      'Uma ferramenta da Microsoft para recuperar senhas perdidas.',
      'A cultura e prática de gestão financeira contínua de nuvem, unindo Engenharia, Finanças e Negócios para otimizar custos.',
      'Um protocolo de segurança de criptografia de disco.',
      'Um tipo de banco de dados relacional distribuído.'
    ],
    correctIndex: 1,
    explanation: 'Correto! FinOps transforma a gestão de custos de nuvem em uma disciplina ativa de engenharia e governança contínua.'
  }
];
