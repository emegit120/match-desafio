# match-desafio

teste de API NodeJS para mensurar tempo de execução de script

Rode a aplicação a partir do comando
```SHELL
$ docker-compose --compatibility up --build
```

Após subir a aplicação faça um POST para:
- `http://localhost:3000/client`

Depois de criar a lista faça um GET para:
- `http://localhost:3000/client/:id`

No console do Docker exibirá o tempo de execução do script após o POST ou GET
`tempo-execucao >`

O tempo médio de execução foi de 9ms

Tecnologias usadas
- Mysql 5.7
- NodeJs LTS
- Docker Compose 3.9

Emerson Almeida
