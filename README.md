# NG.Cash Challenge

Projeto como objetivo de estruturar uma aplicação web fullstack, dockerizada, cujo objetivo seja possibilitar que usuários da NG consigam realizar transferências internas entre si.

## INTRUÇÕES PARA RODAR O PROJETO LOCALMENTE

O diretório raiz é composto por dois sub-diretórios, sendo eles backend e frontend.
Para rodar cada aplicação (backend e frontend) é necessário estar dentro do diretório específico de cada uma delas e seguir os passos:

### Criação do banco de dados e iniciando a aplicação Backend
<summary><strong>Instruções para rodar a aplicação localmente</strong></summary>

1. Primeiramente será necessário criar um arquivo `.env` que tenha as variáveis de ambiente necessárias para que a aplicação acesse seu bancode dados Postgres.

O arquivo '.env' deve conter o seguinte conteúdo:

```bash
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=postgres
DB_HOST=hostname
DB_PORT=5432
APP_PORT=3001
JWT_SECRET=jwtsecret
```

Onde:
- DB_USERNAME: Nome de usuário do Postgres. Aqui estamos utilizando o usuário **postgres** mas, em um ambiente de produção, deve-se utilizar um outro usuário por questões de segurança;
- DB_PASSWORD: A senha do nome de usuário especificado em DB_USERNAME;
- DB_NAME: O nome que irá dar ao banco de dados;
- DB_HOST: O nome do _host_ (computador hospedeiro) no qual o servidor Postgres está sendo executado. Caso você esteja executando o servidor Postgres no seu computador local o valor deve ser `127.0.0.1`;
- DB_PORT: A porta usada pelo servidor Postgres.
- APP_PORT: A porta usada pelo servidor Node da API.

2. Instale as dependências

```bash
npm install
```

3. Execute os seguintes comandos para criar a base de dados no seu servidor Postgres e popular as tabelas com alguns dados

```bash
npx sequelize-cli db:drop
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

4. Inicie o servidor da API

```bash
npm run dev
```


### Inicialização do Frontend

1. Instale as dependências

```bash
npm install
```

2. Inicie a aplicação

```bash
npm run dev
```

## INTRUÇÕES PARA RODAR O PROJETO COM DOCKER

1. Primeiramente serão criados os container para o banco de dados, aplicação backend e fontend.
```bash
docker-compose up --build
```
Feito isso as aplicaçãoes já devem estar disponíveis:
- Servidor backend rindando na porta 3001;
- Fontend tondando na porta 3000;
- E o banco de dados na porta 5432.

2. Execute os seguintes comandos para criar a base de dados no seu servidor Postgres e popular as tabelas com alguns dados

```bash
npx sequelize-cli db:drop
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
