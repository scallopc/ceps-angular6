# Consulta de CEP - Angular Application

Aplicação Angular para consulta e gerenciamento de endereços através do serviço ViaCEP.

## Recursos Implementados

### Interface e UX
- Design responsivo com Material UI (v6.4.7) e Bootstrap (v4.3.1)
- Header com menu hamburguer em telas pequenas
- Animações suaves de transição
- Feedback visual para todas as ações do usuário
- Layout adaptativo para diferentes tamanhos de tela

### Funcionalidades
- Busca de CEP com validação em tempo real usando ngx-mask
- Lista de endereços pesquisados
- Persistência local dos dados (LocalStorage)
- Prevenção de duplicatas de CEP
- Toast notifications para feedback
- Exclusão de endereços da lista

### Componentes Reutilizáveis
- Toast genérico e customizável
- Componente de busca com validação
- Lista de resultados com ações
- Breadcrumb para navegação


### Desafios Implementados
1. **Validação de CEP**
   - Máscara de input com ngx-mask
   - Validação em tempo real
   - Feedback visual de erros

2. **Gerenciamento de Estado**
   - Persistência com LocalStorage
   - Controle de duplicatas
   - Atualização reativa da interface usando RxJS (v6.2.2)

3. **Componentização**
   - Componentes genéricos e reutilizáveis
   - Comunicação entre componentes via @Input/@Output
   - Separação de responsabilidades

4. **UX/UI**
   - Design responsivo com flexbox
   - Animações fluidas com CSS transitions
   - Feedback visual consistente usando Material Design

## Instalação

### Pré-requisitos
- Node.js (versão 8.x)
- NPM (versão 5.x )
- Angular CLI (versão 6.2.9)

```bash
# Instalar Angular CLI globalmente
npm install -g @angular/cli@6.2.9

# Clonar o repositório
git clone <url-do-repositorio>

# Entrar no diretório
cd ceps-angular6

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
ng serve
```

A aplicação estará disponível em `http://localhost:4200/`

## Deploy

### Build para Produção

```bash
# Gerar build de produção
ng build --prod
```

Os arquivos de build serão gerados no diretório `dist/`.

### Versões das Dependências Principais
```json
"dependencies": {
  "@angular/animations": "6.1.10",
  "@angular/cdk": "6.4.7",
  "@angular/core": "6.1.10",
  "@angular/material": "6.4.7",
  "bootstrap": "4.3.1",
  "ngx-mask": "6.1.2",
  "rxjs": "6.2.2"
}
```

### Deploy em Servidores

#### Servidor Apache/Nginx
1. Copie o conteúdo da pasta `dist/` para o diretório do servidor
2. Configure o servidor para redirecionar todas as requisições para `index.html`

## Testes

```bash
# Executar testes unitários com Karma e Jasmine
ng test

# Executar testes end-to-end com Protractor
ng e2e
```

## Estrutura do Projeto

```
src/
├── app/
│   ├── _services/      # Serviços (CepStorageService, ViaCepService)
│   ├── components/     # Componentes reutilizáveis (Toast)
│   ├── header/         # Componente de header responsivo
│   └── cep/           # Módulo principal de CEP
│       ├── search-home/    # Componente principal de busca
│       └── search-list/    # Componente de lista de resultados
├── assets/            # Recursos estáticos (imagens)
└── styles/           # Estilos globais
```