# Painel de Produção — Avanzi Química

Sistema de Planejamento e Controle da Produção (PCP) desenvolvido para acompanhamento em tempo real da produção da Avanzi Química.

---

## 📊 Funcionalidades

- **Produção em tempo real** — status de cada reator (Em andamento, Finalizado, Planejado)
- **Capacidade dos reatores** — horas necessárias vs capacidade disponível, atualizado conforme produtos são finalizados
- **Plano da semana** — produtos planejados com status de execução
- **Status de matéria-prima** — calcula automaticamente quanto de cada MP ainda será necessário com base no que falta produzir
- **Média mensal por produto** — histórico de produção desde o início dos registros
- **Gráfico de evolução** — tendência mensal de volume produzido com filtro por produto e mês
- **Atualização automática** — recarrega os dados a cada 3 minutos

---

## 🗂️ Estrutura

| Arquivo | Descrição |
|---|---|
| `Painel_Producao_Avanzigit.html` | Painel web publicado via GitHub Pages |
| `producao_unificado.xlsm` | Planilha principal com Registro de Produção, MRP, CRP e Controle de MP |

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
| `Registro_Produção` | Registro de todos os lotes produzidos com tempo, status e qualidade |
| `MRP` | Plano semanal, receitas dos produtos e status de matéria-prima |
| `CRP` | Capacidade dos reatores por produto |
| `Média` | Histórico de média mensal por produto |
| `RESUMO_MP` | Estoque total de matéria-prima (consolidado) |
| `CONTAINER / TAMBOR / TANQUE / BOMBONA / SACARIA / ACABADO` | Estoques por tipo de armazenamento |

---

## 👤 Desenvolvido por

**Alcebíades Correia** — Assistente Administrativo de Produção /
Avanzi Química
