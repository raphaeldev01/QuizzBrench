# Quiz App

Este é um projeto fullstack de uma página de quiz, onde os usuários podem responder perguntas, ver suas pontuações e desafiar amigos. O projeto é desenvolvido utilizando uma abordagem fullstack, com front-end interativo e back-end para processamento de dados.

## Links

- [Vercel](https://vercel.com/) Utilizado para hospedar a aplicação de forma gratuita,
- [Preview](https://quizz-branch.vercel.app) Teste agora mesmo no seu dispositivo sem necessidade de instalações
- [Repositorio front-end](https://github.com/raphaeldev01/QuizzBranchReact) arquivos do React app

## Tecnologias

### Front-end: 
- React.js
- React Router Dom
- Lucide react
### Back-end: 
- Node.js
- Express
- Banco de Dados: Firebase Firestore
### Autenticação:
- JWT (JSON Web Token)

### Outros: 
- Axios
- Dotenv, 
- Bcryptjs
- Uniqid

## Funcionalidades

- Pagina de login, Cadastro e Esqueceu senha funcional 
- HomePage com todos os Quizzes, com sistema de busca e filtros
- Pagina de meu quizzes com todos os quizzes criado por você, tambem com sistema de filtro e busca, 
- Historico de quizzes feitos, com tempo de duração, pontuação,
- Pagina de criar Quizz para criar de forma dinamica e simples


# Instalação

### 1. Clonar o Repositório
Primeiro, clone o repositório:
```
git clone https://github.com/seu-usuario/quiz-app.git
```


### 2. Instalar Dependências do Backend
Entre na pasta e instale as dependências:

```
cd backend
```
```
npm install
```
### 4. Configurar o Banco de Dados

- Crie um projeto: Acesse o [Firebase](http://console.firebase.google.com/), crie uma conta e um novo projeto.
- Escolha o banco de dados: Vá em "Firestore Database" ou "Realtime Database" no painel do Firebase e clique em "Criar banco de dados".
- Defina as regras de segurança: Ajuste as regras conforme necessário para controlar o acesso. 
- Adicione as seguintes coleções: **users** e **quizes**

- **Integre com sua aplicação:**
- Crie o arquivo .env: Na raiz do seu projeto, crie um arquivo chamado .env.
- Adicione as credenciais: Coloque as credenciais do Firebase no formato:

```
PORT= 5000
JWT_SECRET= SEU_TOKEN
apiKey= your-api-key
authDomain= your-auth-domain
projectId= your-project-id
storageBucket= your-storage-bucket
messagingSenderId= your-messaging-sender
```

### 5. Rodar a aplicação
execute:

```
node .
```
### 6. Aplicação online

Aplicação rodando na porta [5000](http://localhost:5000) do seu pc

## Fique a vontade para contribuir! 


Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
