# Junie Guidelines for Fullstack Development

Este documento contém as diretrizes para o desenvolvimento dos projetos `laco-web-backend` (Spring Boot) e `laco-web-frontend` (Angular). O objetivo é garantir consistência, manutenibilidade e o uso das melhores práticas com as versões mais recentes.

---

## 🧠 Visão Geral

* Repositório único contendo dois projetos:
    - `laco-web-backend` → Spring Boot (Java)
    - `laco-web-frontend` → Angular

* Sempre utilizar a versão mais recente estável de cada tecnologia.

---

## ☕ Backend: Spring Boot

### Core Technologies & Versions

- **Java:** Utilize a versão LTS mais recente (ex: Java 21).
- **Spring Boot:** Use sempre a versão estável mais recente da linha 3.x ou superior.
- **Build Tool:** Maven com parent POM atualizado e plugins compatíveis.

### Estrutura de Projeto

- **Prefira Package-by-Feature ao invés de Package-by-Layer.**

**Exemplo Recomendado:**

```
com.example.application
├── posts
│   ├── PostController.java
│   ├── PostService.java
│   ├── PostRepository.java
│   └── dto
│       ├── PostCreateRequest.java
│       └── PostSummaryResponse.java
├── users
│   ├── UserController.java
│   ├── UserService.java
│   └── UserRepository.java
└── common
    └── exception
        └── ResourceNotFoundException.java
```

### Requisições HTTP

- Use `RestClient` (Spring 6+) para chamadas HTTP. Evite `RestTemplate`.

### Boas Práticas Java

- Prefira `record` para DTOs imutáveis.
- Evite setters desnecessários. Prefira imutabilidade.

### Spring Boot

- **Injeção de Dependência:** Use injeção por construtor.
- **Configuração:** Use `application.yml` com `@ConfigurationProperties`.
- **Erros:** Trate exceções com `@ControllerAdvice` e erros padronizados.
- **Logs:** Use SLF4J (Logback por padrão).

### Testes

- **Unitários:** JUnit 5 + Mockito.
- **Integração:** `@SpringBootTest` + Testcontainers ou H2.
- Testes em `src/test/java`, espelhando estrutura de pacotes do código fonte.

---

## 🧩 Frontend: Angular

### Core Technologies & Versions

- **Node.js:** Use a versão LTS mais recente.
- **Angular CLI:** Sempre utilize a versão estável mais recente (ex: Angular 17+).
- **Gerenciador de pacotes:** npm ou pnpm (preferível pelo desempenho).

### Estrutura de Projeto

- **Modules por Funcionalidade (Feature Modules)**
- **Lazy Loading:** Use rotas preguiçosas para módulos grandes.
- **Shared Module:** Para componentes, pipes e diretivas reutilizáveis.

**Exemplo Recomendado:**

```
src/
├── app/
│   ├── core/             # Serviços singleton, guards, interceptors
│   ├── shared/           # Componentes, pipes e módulos reutilizáveis
│   ├── features/
│   │   ├── login/
│   │   ├── dashboard/
│   │   └── users/
│   └── app.module.ts
```

### Boas Práticas Angular

- **Change Detection:** Use `OnPush` onde possível.
- **Tipagem:** Sempre use TypeScript com tipagem explícita.
- **Serviços:** Use `HttpClient` com `Observable`, evite lógica em componentes.
- **Componentes:** Mantenha simples, evite lógica pesada.
- **Responsividade:** Use Angular Material ou Tailwind CSS para UI responsiva.
- **Validação:** Reactive Forms + Validators customizados.
- **Estado:** Use `Signal`, `BehaviorSubject`, ou bibliotecas como NgRx apenas quando necessário.

### Testes

- Desconsidere testes para o projeto angular.
- Desconsidere testes para o projeto angular.
- Desconsidere testes para o projeto angular.

### Qualidade de Código

- Use ESLint + Prettier para padronização.
- Configure Husky + lint-staged para verificação pré-commit.
- Documente componentes complexos e serviços com JSDoc.

---

## 🚀 Considerações Finais

- Sempre versionar e manter atualizadas as dependências com segurança.
- Validar builds locais e CI/CD antes de merges para o main.
- Usar ambientes separados (`.env`) para dev/stage/prod.