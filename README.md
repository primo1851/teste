Olá participante, seja bem vindo ao seu desafio.  

Para prosseguir na sua candidatura a vaga de Pessoa Desenvolvedora Back-end Node Jr/Pl (Exclusiva para PCD) você terá que demonstrar os seguintes conhecimentos: 

* NodeJS 

* Sequelize 

* PostgreSQL 

* Jest 

* Docker 

  

Seu desafio está dividido em três fases, e a seguir tem um resumo do que deve ser feito em cada uma delas. 

  

Como você pode observar aqui tem um projeto iniciado em uma estrutura semelhante a que você irá trabalhar com a gente. E esse projeto já tem algumas bibliotecas e até um *model* pronto. Ao entrar nele pela primeira vez se certifique que tem instalado na sua máquina:  

* Node: v18.14.2 

* yarn: v1.22.19 

* docker: v24.0.2 

Após se certificar disso rode o seguinte comando no terminal, dentro da pasta do projeto: 

```

yarn 

``` 

Agora você já tem todas as dependências do projeto! Para rodar o banco de dados em um container rode:

``` 

docker compose up 

```  
Para criar o banco e a primeira tabela no banco de dados:

``` 

yarn sequelize db:create;
yarn sequelize db:migrate;

``` 

Rode o seguinte comando para inicializar o projeto: 

``` 

yarn dev 

```  

Agora você tem o server disponível em http://localhost:3333 e pode testar abrindo no seu navegador. 

Agora já pode por a mão na massa!!  

  

FASE 1 [OBRIGATÓRIA] 

  

Na fase 1 do projeto você vai ficar responsável por criar um CRUD de usuário com a tabela que já existe no projeto e seguindo a estrutura proposta pelo avaliador. Nessa Fase é importante lembrar de não cadastrar a senha do usuário diretamente no banco de dados sem antes criptografa-la! Lembre-se também que na criação de toda API é importante disponibilizar uma documentação clara para quem for usá-la, recomendo que utilize o *Swagger*. No mais, use e abuse da sua criatividade! 

  

FASE 2 [OPCIONAL] 

  

Nessa fase você vai ficar responsável por inserir testes em todo o seu CRUD, não esqueça de fazer testes unitários e de integração. 

  

FASE 3 [PLUS] 

  

Aqui é onde separamos os Padawans dos Jedis! Aqui você vai apontar algumas melhorias que podem ser feitas na arquitetura da aplicação, dockerizar o app e utilizar seus conhecimentos para incrementar a aplicação para deixa-la com a sua cara.  

  

Vamos lá?!  

 

 