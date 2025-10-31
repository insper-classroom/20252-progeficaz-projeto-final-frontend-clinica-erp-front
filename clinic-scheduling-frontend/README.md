# Frontend - Sistema de Gerenciamento de Clínica

Interface web desenvolvida em React + Vite para gerenciamento de clínicas médicas.

## Tecnologias

- React 18 + Vite
- React Router DOM
- Axios
- React Hook Form
- date-fns

## Instalação e Execução

```bash
npm install
npm run dev
```

Acesse em: `http://localhost:5173`

**Importante:** O backend precisa estar rodando em `http://localhost:5000`

## Estrutura

```
src/
├── api/              # Configuração Axios
├── components/       # Componentes reutilizáveis
├── pages/           # Páginas da aplicação
└── utils/           # Utilitários (gerador de horários)
```

## Funcionalidades

- **Landing Page** (`/home`): Página inicial com cadastro e login
- **Médicos** (`/doctors`): Cadastro e listagem de médicos
- **Horários** (`/schedules`): Geração automática de horários por expediente

## Scripts

```bash
npm run dev      # Desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
```
