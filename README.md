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
- **Histórico completo** — mais de 1 ano de registros de produção disponíveis para consulta
- **Relatório Semanal em PDF** — gerado diretamente pelo painel com um clique, escolhendo mês e semana
- **Atualização automática** — recarrega os dados a cada 3 minutos

---

## 🗂️ Estrutura

| Arquivo | Descrição |
|---|---|
| `Painel_Producao_Avanzigit.html` | Painel web publicado via GitHub Pages |
| `producao_unificado.xlsm` | Planilha principal com Registro de Produção, MRP, CRP e Controle de MP |
| `planta_producao_avanzi.html` | Planta baixa da área de produção (imprimível) |

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
| `Registro_Produção` | Registro de todos os lotes produzidos com status, qualidade e data |
| `MRP` | Plano semanal, receitas dos produtos e cálculo de necessidade de matéria-prima |
| `CRP` | Capacidade dos reatores por produto e horas previstas na semana |
| `Média` | Histórico de média mensal por produto |
| `RESUMO_MP` | Estoque total de matéria-prima consolidado |
| `CONTAINER / TAMBOR / TANQUE / BOMBONA / SACARIA / ACABADO` | Estoques por tipo de armazenamento |

---

## 📄 Relatório Semanal em PDF

O painel possui um botão **"📄 Relatório Semanal"** que gera automaticamente um PDF com:

- KPIs da semana (total produzido, lotes, produtos diferentes, MPs para comprar)
- Ranking de produtos com quantidade e % do total
- Matérias-primas com ação necessária (COMPRAR / PRODUZIR)
- Data e hora de geração

Basta escolher o mês e a semana desejados — sem precisar de Python ou terminal.

---

## 🏭 Planta Baixa

Planta baixa técnica da área de produção disponível para impressão, com:

- Dique 1 (Amidas + Betaina) e Dique 2 (Less 27 + Potassa)
- Localização dos reatores, boilers, tanques e equipamentos
- Áreas de movimentação, estufas e porta paletes

📥 **https://alcebiades9.github.io/avanzi/planta_producao_avanzi.html**

---

## 👤 Desenvolvido por

**Alcebíades Correia** — Assistente Administrativo de Produção  
Avanzi Química
