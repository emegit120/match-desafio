# match-desafio

teste de API NodeJS para mensurar tempo de execução de script

Rode a aplicação a partir do comando
```SHELL
$ docker-compose --compatibility up --build
```

Após subir a aplicação faça um POST para:
- `http://localhost:3000/client`

Exemplo de POST:
`{
    "name": "Nome do cliente",
    "email": "email@email.com",
    "celphone": "11999999999",
    "status": 1
}`

Faça um GET passando o id da lista retornado no POST:
- `http://localhost:3000/client/:id`

No console do Docker exibirá o tempo de execução do script após o POST ou GET
- `tempo-execucao >`

O tempo médio de execução foi de 9ms

Tecnologias usadas
- Mysql 5.7
- NodeJs LTS
- Docker Compose 3.9

Emerson Almeida
