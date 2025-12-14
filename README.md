# Conecta Unifesspa - Frontend

Plataforma web para gerenciamento de projetos de extensão da UNIFESSPA.

## 🚀 Tecnologias

- **React** 19.2.0
- **TypeScript**
- **Vite** - Build tool
- **React Router DOM** - Roteamento
- **React Hook Form** - Gerenciamento de formulários
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/LuanAssis01/conecta-unifesspa-frontend.git
cd conecta-unifesspa-frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env-example .env
```

Edite o arquivo `.env` com as configurações do seu backend:
```env
VITE_API_BASE_URL=http://localhost:3333
```

## 🏃 Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

### Build de Produção
```bash
npm run build
```

### Preview do Build
```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── assets/          # Imagens e recursos estáticos
├── components/      # Componentes reutilizáveis
│   ├── Button/
│   ├── Card/
│   ├── Header/
│   ├── Footer/
│   └── ...
├── context/         # Contextos React (Auth, User, API)
├── hooks/           # Custom hooks
├── pages/           # Páginas da aplicação
│   ├── HomePage/
│   ├── LoginPage/
│   ├── Dashboard/
│   └── ...
├── routes/          # Configuração de rotas
├── services/        # Serviços de API
│   ├── api.ts
│   ├── authService.ts
│   ├── projectService.ts
│   └── ...
└── types/           # TypeScript types e interfaces
```

## 🌐 Deploy

Para fazer deploy na Vercel, consulte o guia completo em [DEPLOY.md](./DEPLOY.md).

**Resumo:**
1. Configure as variáveis de ambiente no painel da Vercel
2. Importe o repositório
3. A Vercel detectará automaticamente as configurações do Vite

## 🔑 Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `VITE_API_BASE_URL` | URL base da API backend | `http://localhost:3333` |

## 📝 Funcionalidades

### Público
- Visualização de projetos de extensão
- Busca e filtros de projetos
- Detalhes de projetos

### Autenticado (Professor)
- Submissão de novos projetos
- Edição de projetos próprios
- Gerenciamento de keywords e indicadores de impacto
- Visualização de perfil

### Admin
- Aprovação/rejeição de projetos
- Gerenciamento de professores
- Gerenciamento de cursos
- Dashboard com métricas
- Visualização de todos os projetos

## 🔗 Integração com Backend

O frontend se comunica com o backend através de uma API REST. Os principais endpoints utilizados:

- `POST /login` - Autenticação
- `GET /projects` - Listar projetos
- `POST /projects` - Criar projeto
- `PUT /projects/:id` - Atualizar projeto
- `GET /courses` - Listar cursos
- `POST /keywords/projects/:id` - Adicionar keywords
- `POST /projects/:id/impact-indicators` - Adicionar indicadores

## 👥 Autores

- Ketly
- Luan Assis
- Marília
- Paulo

## 📄 Licença

ISC
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
