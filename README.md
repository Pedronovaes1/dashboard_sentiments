# Dashboard Sentiments

Este projeto é um dashboard interativo para análise de sentimentos de clientes e funcionários, desenvolvido em Next.js com React, TypeScript e Recharts. Ele consome dados de uma API para exibir visualizações e métricas sobre sentimentos predominantes, distribuição de sentimentos, comentários recentes e análise de tópicos.

## Funcionalidades

- **Tendência de Sentimentos:** Gráfico de linha mostrando a evolução dos sentimentos nos últimos 30 dias.
- **Distribuição de Sentimentos:** Gráfico de pizza com proporção de sentimentos positivos, negativos e neutros.
- **Sentimento Predominante:** Destaque para o sentimento mais frequente no período.
- **Comentários Recentes:** Lista dos últimos comentários analisados, com sentimento identificado.
- **Análise de Tópicos:** Principais tópicos mencionados nos comentários, com sentimento associado.
- **Relatórios e Análises Detalhadas:** Seções para relatórios personalizados e análises aprofundadas.

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Recharts](https://recharts.org/) (gráficos)
- [Radix UI](https://www.radix-ui.com/) (componentes de UI)
- [Luxon](https://moment.github.io/luxon/) (datas)
- [FastAPI](https://fastapi.tiangolo.com/) (backend/API)

## Como rodar o projeto

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/Pedronovaes1/dashboard_sentiments.git
   cd dashboard_sentiments
   ```

2. **Instale as depdências**
3. **Configure as variáveis de ambiente**: Crie um arquivo .env na raiz do projeto com o conteúdo NEXT_PUBLIC_API_URL=http://localhost:8000
4. **Inicie o projeto**:
   ```sh
   npm run dev
   ```
