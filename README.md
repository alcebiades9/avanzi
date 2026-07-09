# Painel de Produção — Avanzi Química

Sistema de Planejamento e Controle da Produção (PCP) desenvolvido para acompanhamento em tempo real da produção da Avanzi Química.

---

## 📊 Funcionalidades

- **Produção em tempo real** — status de cada reator (Em andamento, Finalizado, Planejado, **Parado**)
- **Capacidade dos reatores (CRP)** — horas necessárias vs capacidade disponível, atualizado conforme produtos são finalizados
- **Plano da semana (MRP)** — produtos planejados com status de execução e cálculo automático de matéria-prima
- **Status de matéria-prima** — calcula automaticamente quanto de cada MP ainda será necessário com base no que falta produzir (COMPRAR / PRODUZIR / OK), com **Cobertura de Estoque em Dias**
- **Média mensal por produto** — histórico de produção desde o início dos registros
- **Gráfico de evolução mensal** — tendência de volume produzido com filtro por mês e por semana
- **OEE (Eficiência Global dos Reatores)** — Disponibilidade × Performance × Qualidade por reator, com filtro por mês e OEE geral da fábrica
- **Pareto de Paradas** — ranking dos motivos que mais tiram tempo de produção, sem contar em dobro eventos simultâneos entre reatores
- **MTBF / MTTR** — tempo médio entre falhas e tempo médio de reparo, por reator
- **Evolução do OEE por mês** — gráfico de linha mostrando a tendência de eficiência ao longo do tempo
- **Linha do Tempo dos Reatores** — calendário visual mostrando o que cada reator produziu dia a dia, com barras contínuas por lote
- **Ficha do Lote** — busca por Número da OS ou nome do produto, mostra todos os dados daquele lote específico e permite imprimir/exportar em PDF
- **Histórico completo** — mais de 1 ano de registros de produção disponíveis para consulta
- **Relatório Semanal em PDF** — gerado diretamente pelo painel com um clique, escolhendo mês e semana
- **Relatório Gerencial em PDF** — resumo mensal com produtividade, comparativo, qualidade e ranking de produtos
- **Alerta de MP crítica por e-mail** — script Python envia e-mail automático quando alguma matéria-prima está abaixo do estoque mínimo
- **Histórico de alertas de MP** — registro de todos os alertas com data, pedido de compra, chegada e impacto na produção
- **Modo escuro** — toggle claro/escuro com preferência salva no navegador
- **Menu lateral** — acesso rápido a relatórios, planta de produção, documentação e modo escuro
- **Rastreamento de acessos** — Google Analytics integrado para monitorar uso do painel
- **Atualização automática** — recarrega os dados a cada 3 minutos
- **PWA (Progressive Web App)** — instalável no celular e desktop como app nativo, com ícone na tela inicial e verificação automática de atualizações
- **Notificações push no celular** — alerta direto no navegador/celular quando matéria-prima está abaixo do estoque mínimo, com inscrição pelo próprio painel
- **Layout responsivo** — testado e ajustado para uso confortável no celular

---

## 🗂️ Estrutura

| Arquivo | Descrição |
|---|---|
| `Painel_Producao_Avanzigit.html` | Painel web publicado via GitHub Pages |
| `producao_unificado.xlsm` | Planilha principal com Registro de Produção, MRP, CRP, Controle de MP, OEE e Histórico de Alertas |
| `planta_producao_avanzi_final.pdf` | Planta baixa da área de produção com zonas de segurança e equipamentos |
| `alerta_mp_avanzi.py` | Script Python de alerta de MP crítica por e-mail e notificações push |
| `manifest.json` | Manifesto PWA (nome, ícones, cores, modo standalone) |
| `sw.js` | Service Worker — cache offline e controle de atualizações |
| `icon-192.png` / `icon-512.png` | Ícones do app (logo Avanzi) para instalação PWA |

---

## ⚙️ Como funciona

```
Excel (producao_unificado.xlsm)
        ↓ salva e sincroniza
Google Drive (arquivo público)
        ↓ painel lê a cada 3 minutos
Painel HTML (GitHub Pages) ← instalável como PWA
        ↓ exibe para qualquer dispositivo

--- Fluxo de Alertas ---

alerta_mp_avanzi.py (Agendador de Tarefas, 08h)
        ↓ lê estoque via Google Sheets
        ↓ MP abaixo do mínimo?
        ├→ E-mail com tabela de MPs críticas
        └→ Push notification nos dispositivos inscritos
               ↑
        Google Sheets (Inscricoes_Push_Avanzi)
        armazena inscrições dos navegadores
```

1. Os dados são registrados no arquivo Excel
2. O Google Drive for Desktop sincroniza automaticamente ao salvar
3. O painel lê os dados direto do Google Drive via SheetJS
4. Qualquer pessoa com o link visualiza o painel atualizado

---

## 📑 Abas do painel

| Aba | Conteúdo |
|---|---|
| **Produção** | KPIs gerais, plano da semana e capacidade dos reatores |
| **Matéria-prima** | Status de MP com Cobertura de Estoque em Dias |
| **Média mensal** | Histórico e gráfico de evolução por produto |
| **OEE** | Disponibilidade, Performance, Qualidade, Pareto de Paradas, MTBF/MTTR e evolução mensal |
| **Linha do Tempo** | Calendário visual da ocupação de cada reator, dia a dia |
| **Ficha do Lote** | Busca e consulta individual de qualquer lote (por OS ou produto) |

---

## 📋 Abas da planilha

| Aba | Função |
|---|---|
| `Registro_Produção` | Registro de todos os lotes produzidos com status, qualidade, tempo de produção, tempo parado, motivo da parada (OBS), reator e número de OS |
| `MRP` | Plano semanal, receitas dos produtos e cálculo de necessidade de matéria-prima |
| `CRP` | Capacidade dos reatores por produto, horas previstas na semana e OEE (Disponibilidade × Performance × Qualidade) por reator |
| `Média` | Histórico de média mensal por produto |
| `RESUMO_MP` | Estoque total de matéria-prima consolidado |
| `HISTORICO_ALERTAS` | Registro de alertas de MP com datas de pedido, chegada, tempo de reposição e impacto na produção |
| `CONTAINER / TAMBOR / TANQUE / BOMBONA / SACARIA / ACABADO` | Estoques por tipo de armazenamento |

---

## 📈 OEE — Eficiência Global dos Reatores

O painel calcula automaticamente a eficiência de cada reator com as 3 dimensões clássicas do OEE:

- **Disponibilidade** — tempo produzindo vs tempo parado (usa colunas Tempo_Total e TEMPO_PARADO, contando também paradas resolvidas em lotes já finalizados ou parados no momento)
- **Performance** — compara a velocidade real de cada lote (min/kg) com a média histórica do produto — acima de 100% é mais rápido que o normal, abaixo é mais lento
- **Qualidade** — lotes conformes vs total de lotes finalizados
- **OEE** = Disponibilidade × Performance × Qualidade
- **OEE Geral da Fábrica** — média dos 4 reatores
- **Filtro por mês** — acompanhe a evolução da eficiência ao longo do tempo
- **Referência**: ≥ 85% Excelente | 60-84% Bom | < 60% Precisa melhorar

A coluna **REATOR** (coluna O) no Registro_Produção identifica qual reator produziu cada lote. A coluna **TEMPO_PARADO** (coluna P) registra quanto tempo aquele lote ficou parado, e a coluna **OBS** guarda o motivo.

### Pareto de Paradas

Ranking dos motivos de parada (baseado no texto da coluna OBS) que mais tiram tempo de produção, do maior pro menor — segue o Princípio de Pareto (80% do tempo perdido costuma vir de 20% dos motivos). Um mesmo evento que afeta vários reatores ao mesmo tempo (ex: falta de energia geral) é identificado e contado uma única vez, não somado por reator.

### MTBF / MTTR

- **MTBF** (tempo médio entre falhas): de quanto em quanto tempo, em média, cada reator para
- **MTTR** (tempo médio de reparo): quanto tempo em média leva pra voltar a rodar depois que parou

Precisa de pelo menos 2 paradas registradas no mesmo reator para calcular o MTBF; com menos que isso, aparece "dados insuficientes".

---

## 🗓️ Linha do Tempo dos Reatores

Visualização tipo calendário: cada linha é um reator, cada coluna é um dia do mês selecionado. Lotes que levam mais de 24h aparecem como uma barra contínua ocupando vários dias (não um bloco só no dia de início), e lotes ainda em andamento continuam "crescendo" até o dia atual, já que ainda não têm data de término definida.

Cores: 🟢 Finalizado · 🟠 Em andamento · 🟣 Parado · ⚫ Ocioso (nenhuma produção naquele dia)

---

## 🔍 Ficha do Lote

Busca individual por **Número da OS** (mais preciso) ou **nome do produto** (mostra uma lista de lotes pra escolher). A ficha mostra produto, data, quantidade, reator, tempo de produção, qualidade e, se houve, motivo e duração da parada. Campos que dependem do lote já ter finalizado (tempo total, qualidade) aparecem como "ainda não finalizou" / "ainda não avaliada" quando o lote está em andamento. Tem botão para imprimir ou exportar como PDF.

---

## 📦 Cobertura de Estoque em Dias

Na aba Matéria-prima, cada item mostra quantos dias o estoque atual ainda dura, no ritmo do plano de produção da semana (estoque atual ÷ consumo médio diário). Estoque zerado sempre mostra "0 dias", independente de ter consumo previsto ou não.

Referência: 🔴 até 7 dias · 🟠 8-15 dias · 🟢 16+ dias

---

## 📄 Relatório Semanal em PDF

Acessível pelo menu lateral → **📄 Relatório Semanal**:

- KPIs da semana (total produzido, lotes, produtos diferentes, MPs para comprar)
- Ranking de produtos com quantidade, lotes e % do total
- Matérias-primas com ação necessária (COMPRAR / PRODUZIR)
- Nota com data de consulta do estoque
- Data e hora de geração

Basta escolher o mês e a semana desejados.

---

## 📊 Relatório Gerencial em PDF

Acessível pelo menu lateral → **📊 Relatório Gerencial**:

- **Produtividade** — total produzido em kg, lotes finalizados e comparativo com o mês anterior
- **Qualidade** — lotes conformes, não conformes e taxa de conformidade
- **Ranking de produtos** — todos os produtos produzidos no mês com lotes, kg e % do total

Basta escolher o mês e o mês anterior para comparativo.

---

## 📧 Alerta de MP Crítica por E-mail e Push

Script Python (`alerta_mp_avanzi.py`) que verifica automaticamente os estoques e envia alertas quando alguma matéria-prima está abaixo do estoque mínimo.

- Configurado via **Agendador de Tarefas do Windows** para rodar todo dia às 08:00
- Envia **e-mail** com tabela formatada quando há MPs críticas — sem spam quando tudo está OK
- Envia **notificação push** direto no celular/navegador dos dispositivos inscritos
- Lê as inscrições push de uma planilha Google Sheets (`Inscricoes_Push_Avanzi`)
- Remove automaticamente inscrições inválidas (dispositivos que desativaram os alertas)
- Estoque mínimo configurável por matéria-prima

---

## 📋 Histórico de Alertas de MP

A aba **HISTORICO_ALERTAS** registra o ciclo completo de cada alerta:

| Coluna | Descrição |
|---|---|
| DATA ALERTA | Quando o alerta foi detectado |
| NOME_MP / CÓDIGO | Matéria-prima identificada |
| ESTOQUE NO ALERTA | Quanto tinha no momento do alerta |
| ESTOQUE MÍNIMO | Referência de estoque mínimo |
| DATA PEDIDO COMPRA | Quando o pedido foi feito |
| DATA CHEGADA | Quando o material chegou |
| TEMPO REPOSIÇÃO | Calculado automaticamente (chegada - alerta) |
| ATRASOU PRODUÇÃO? | S ou N |
| OBSERVAÇÃO | Detalhes adicionais |

Resumo automático com total de alertas, % de sucesso e tempo médio de reposição.

---

## 🌙 Modo Escuro

- Toggle acessível pelo menu lateral
- Preferência salva no navegador (localStorage)
- Todas as cores adaptadas para modo escuro com transição suave
- Gráficos e gauges atualizam automaticamente ao trocar o tema

---

## 🏭 Planta Baixa

Planta baixa técnica da área de produção com:

- Dique 1 (Amidas + Betaina) e Dique 2 (Less 27 + Potassa)
- Localização dos reatores, boilers, tanques e equipamentos
- Áreas de movimentação, estufas e porta paletes
- Zonas de segurança e sinalização

📥 **[Abrir / Baixar Planta Baixa](https://alcebiades9.github.io/avanzi/planta_producao_avanzi_final.pdf)**

---

## 📱 PWA — App Instalável

O painel funciona como Progressive Web App:

- **Instalar no celular** — ao acessar pelo Chrome, aparece um banner "Adicionar à tela inicial". O painel fica com ícone próprio, abre em tela cheia sem barra do navegador
- **Instalar no PC** — Chrome mostra ícone de instalação na barra de endereço
- **Verificação de atualizações** — a cada 2 minutos o painel verifica se há versão nova no servidor (via ETag). Se houver, exibe aviso para recarregar
- **Service Worker** — gerencia cache e permite carregamento mais rápido

---

## 🔔 Notificações Push

Qualquer usuário do painel pode ativar alertas de matéria-prima direto no celular:

1. Abre o menu lateral → seção **Alertas**
2. Clica em **Ativar notificações**
3. Aceita a permissão do navegador
4. Pronto — quando o script Python rodar e detectar MP abaixo do mínimo, o celular recebe a notificação mesmo com o navegador fechado

As inscrições ficam salvas em uma planilha Google Sheets separada (`Inscricoes_Push_Avanzi`). A comunicação usa protocolo Web Push com chaves VAPID.

---

## 👤 Desenvolvido por

**Alcebíades Correia** — Assistente Administrativo de Produção
Avanzi Química
