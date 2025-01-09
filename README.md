# InfiniFlix 🎬

Uma aplicação web moderna para explorar filmes e séries, construída com React e a API do TMDB.

## 🚀 Funcionalidades

- 🎥 Exploração de filmes e séries
- 🔍 Busca avançada com filtros
- 📱 Design responsivo
- 🌈 Interface moderna e intuitiva
- 🔄 Alternância fácil entre filmes e séries
- ⭐ Informações detalhadas como avaliações e datas
- 🎯 Filtros por categoria, ano e gênero

## 🛠️ Tecnologias Utilizadas

- React
- Vite
- React Router DOM
- CSS Modules
- TMDB API

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM ou Yarn
- Chave de API do TMDB

## ⚙️ Configuração

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/infiniflix.git
cd infiniflix
```

2. Instale as dependências:
```bash
npm install
# ou
yarn
```

3. Configure as variáveis de ambiente:
- Crie um arquivo `.env` baseado no `.env.example`
- Adicione sua chave de API do TMDB

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

## 🔧 Variáveis de Ambiente

```env
VITE_API_KEY=sua_chave_api_aqui
VITE_API=https://api.themoviedb.org/3/
VITE_IMG=https://image.tmdb.org/t/p/w500/
```

## 📦 Estrutura do Projeto

```
src/
├── components/      # Componentes reutilizáveis
├── pages/          # Páginas da aplicação
├── services/       # Serviços e configuração da API
├── styles/         # Arquivos de estilo
└── utils/          # Utilitários e helpers
```

## 🎨 Features de UI/UX

- Animações suaves de transição
- Feedback visual para interações
- Loading states informativos
- Design responsivo para todos os dispositivos
- Temas consistentes e modernos

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Adiciona nova feature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👏 Agradecimentos

- [TMDB](https://www.themoviedb.org/) pela excelente API
- [React Icons](https://react-icons.github.io/react-icons/) pelos ícones
- Comunidade React pelos recursos e suporte
