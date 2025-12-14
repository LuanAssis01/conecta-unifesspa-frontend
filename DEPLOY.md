# Deploy na Vercel - Conecta Unifesspa Frontend

## 📋 Pré-requisitos

1. Conta na [Vercel](https://vercel.com)
2. Repositório GitHub com o código do projeto
3. Backend deployado e acessível

## 🚀 Passos para Deploy

### 1. Prepare o Projeto

Certifique-se de que o arquivo `vercel.json` está presente na raiz do projeto.

### 2. Configure as Variáveis de Ambiente

No painel da Vercel, adicione a seguinte variável de ambiente:

```
VITE_API_BASE_URL=http://193.203.183.147:3000
```

**Importante:** Substitua pela URL real do seu backend em produção.

### 3. Deploy via Vercel Dashboard

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Importe o repositório `conecta-unifesspa-frontend`
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Adicione as variáveis de ambiente
6. Clique em "Deploy"

### 4. Deploy via CLI (Alternativa)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy em produção
vercel --prod
```

## 🔧 Configurações Importantes

### Backend CORS

Certifique-se de que o backend está configurado para aceitar requisições do domínio da Vercel:

```javascript
// backend/api/server.ts
server.register(cors, {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://seu-projeto.vercel.app",
    "https://*.vercel.app"
  ],
});
```

### Variáveis de Ambiente

**Desenvolvimento (.env):**
```env
VITE_API_BASE_URL=http://localhost:3333
```

**Produção (Vercel Dashboard):**
```env
VITE_API_BASE_URL=http://193.203.183.147:3000
```

## 📝 Estrutura de Arquivos

```
conecta-unifesspa-frontend/
├── vercel.json         # Configuração da Vercel
├── .vercelignore       # Arquivos ignorados no deploy
├── .env.production     # Variáveis de produção (exemplo)
├── .env.example        # Exemplo de variáveis
└── dist/               # Build de produção
```

## 🔄 Atualizações

Após fazer alterações no código:

1. Faça commit e push para o GitHub
2. A Vercel fará o deploy automaticamente
3. Ou execute `vercel --prod` para deploy manual

## ⚠️ Troubleshooting

### Erro de CORS
- Verifique se o backend permite o domínio da Vercel
- Adicione `https://*.vercel.app` nas origens permitidas

### Rotas retornando 404
- Verifique se `vercel.json` tem as configurações de rewrite
- Certifique-se de que todas as rotas do React Router estão funcionando

### Variáveis de ambiente não funcionam
- Variáveis devem começar com `VITE_`
- Reconstrua o projeto após alterar variáveis na Vercel

## 🌐 Links Úteis

- [Documentação Vercel](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router](https://reactrouter.com/)
