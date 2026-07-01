# Painel de Produção — Avanzi Química

Sistema de Planejamento e Controle da Produção (PCP) desenvolvido para acompanhamento em tempo real da produção da Avanzi Química.

---

## 📊 Funcionalidades

- **Produção em tempo real** — status de cada reator (Em andamento, Finalizado, Planejado)
- **Capacidade dos reatores (CRP)** — horas necessárias vs capacidade disponível, atualizado conforme produtos são finalizados
- **Plano da semana (MRP)** — produtos planejados com status de execução e cálculo automático de matéria-prima
- **Status de matéria-prima** — calcula automaticamente quanto de cada MP ainda será necessário com base no que falta produzir (COMPRAR / PRODUZIR / OK)
- **Média mensal por produto** — histórico de produção desde o início dos registros
- **Gráfico de evolução mensal** — tendência de volume produzido com filtro por mês e por semana
- **OEE (Eficiência Global dos Reatores)** — indicador de Disponibilidade × Qualidade por reator, com filtro por mês e OEE geral da fábrica
- **Histórico completo** — mais de 1 ano de registros de produção disponíveis para consulta
- **Relatório Semanal em PDF** — gerado diretamente pelo painel com um clique, escolhendo mês e semana
- **Relatório Gerencial em PDF** — resumo mensal com produtividade, comparativo, qualidade e ranking de produtos
- **Alerta de MP crítica por e-mail** — script Python envia e-mail automático quando alguma matéria-prima está abaixo do estoque mínimo
- **Histórico de alertas de MP** — registro de todos os alertas com data, pedido de compra, chegada e impacto na produção
- **Modo escuro** — toggle claro/escuro com preferência salva no navegador
- **Menu lateral** — acesso rápido a relatórios, planta de produção, documentação e modo escuro
- **Rastreamento de acessos** — Google Analytics integrado para monitorar uso do painel
- **Atualização automática** — recarrega os dados a cada 3 minutos

---

## 🗂️ Estrutura

| Arquivo | Descrição |
|---|---|
| `Painel_Producao_Avanzigit.html` | Painel web publicado via GitHub Pages |
| `producao_unificado.xlsm` | Planilha principal com Registro de Produção, MRP, CRP, Controle de MP, OEE e Histórico de Alertas |
| `planta_producao_avanzi_final.pdf` | Planta baixa da área de produção com zonas de segurança e equipamentos |
| `alerta_mp_avanzi.py` | Script Python de alerta de MP crítica por e-mail |

---

## ⚙️ Como funciona

```
Excel (producao_unificado.xlsm)
        ↓ salva e sincroniza
Google Drive (arquivo público)
        ↓ painel lê a cada 3 minutos
Painel HTML (GitHub Pages)
        ↓ exibe para qualquer dispositivo
```

1. Os dados são registrados no arquivo Excel
2. O Google Drive for Desktop sincroniza automaticamente ao salvar
3. O painel lê os dados direto do Google Drive via SheetJS
4. Qualquer pessoa com o link visualiza o painel atualizado

---

## 📋 Abas da planilha

| Aba | Função |
|---|---|
| `Registro_Produção` | Registro de todos os lotes produzidos com status, qualidade, tempo de produção, tempo parado, reator e número de OS |
| `MRP` | Plano semanal, receitas dos produtos e cálculo de necessidade de matéria-prima |
| `CRP` | Capacidade dos reatores por produto e horas previstas na semana |
| `Média` | Histórico de média mensal por produto |
| `RESUMO_MP` | Estoque total de matéria-prima consolidado |
| `HISTORICO_ALERTAS` | Registro de alertas de MP com datas de pedido, chegada, tempo de reposição e impacto na produção |
| `CONTAINER / TAMBOR / TANQUE / BOMBONA / SACARIA / ACABADO` | Estoques por tipo de armazenamento |

---

## 📈 OEE — Eficiência Global dos Reatores

O painel possui a aba **OEE** que calcula automaticamente a eficiência de cada reator:

- **Disponibilidade** — tempo produzindo vs tempo parado (usa colunas Tempo_Total e TEMPO_PARADO)
- **Qualidade** — lotes conformes vs total de lotes finalizados
- **OEE** = Disponibilidade × Qualidade
- **OEE Geral da Fábrica** — média ponderada de todos os reatores
- **Filtro por mês** — acompanhe a evolução da eficiência ao longo do tempo
- **Referência**: ≥ 85% Excelente | 60-84% Bom | < 60% Precisa melhorar

A coluna **REATOR** (coluna O) no Registro_Produção identifica qual reator produziu cada lote. A coluna **TEMPO_PARADO** (coluna P) é calculada automaticamente pelo VBA quando o status muda entre PARADO! e EM ANDAMENTO.

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

## 📧 Alerta de MP Crítica por E-mail

Script Python (`alerta_mp_avanzi.py`) que verifica automaticamente os estoques e envia um e-mail quando alguma matéria-prima está abaixo do estoque mínimo.

- Configurado via **Agendador de Tarefas do Windows** para rodar todo dia às 08:00
- Envia e-mail apenas quando há MPs críticas — sem spam quando tudo está OK
- E-mail formatado com tabela, ícones de alerta e rodapé profissional
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

## 👤 Desenvolvido por

**Alcebíades Correia** — PCP / Assistente Administrativo de Produção  
Avanzi Química
