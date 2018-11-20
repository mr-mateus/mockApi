# MockApi
MockApi é uma aplicação desenvolvida para possibilitar inserção de retornos de ```endpoints``` para auxiliar no desenvolvimento ou automação da página web. 


## Instalação

* Você precisará ter o ```Node``` e o ```NPM``` instalado na sua maquina
* Clonar o repositório -> `https://github.com/mr-mateus/mockApi.git`
* Dentro do repositório ```master``` baixar as dependências do projeto utilizando o comando ```npm install```

### Trocando a porta do servidor ###

* Por padrão a aplicação ```Node``` vem com a porta ```1337``` configurada. Caso seja necessário trocar a porta,  localize o arquivo ```config.json``` localizado dentro do repositório  ```principal```, e troque o parâmetro da propriedade ```port```, colocando uma porta valida dentro do seu ambiente de desenvolvimento.

### Iniciando a aplicação ###

* Dentro do repositório ```master``` utilizar o comando ```npm start```


### Como utilizar  ###

MockAPI foi feito para trabalhar com requisições REST, utilizando json como tipo de dado a ser inserido. 
Com o servidor rodando, fica disponível duas funções: inserção de endpoint e eliminação de todos os endpoints. 

Para inserir um endpoint é necessário utilizar a ```uri``` abaixo: 
* http://localhost:1337/mochapi/apis | Método ```POST```

#### Objeto para o post #####
```json
    {
      "object": {
        "path": "path", // Path relativo do endpoint 
        "method": "method", // Método que será utilizado pelo client
        "response": "{{JSONOBject}}" // Objeto que deve ser retornado, quando esse endpoint for requisitado
      }
    }
```
Para limpar os endpoints disponíveis utiliar a ```uri``` abaixo
* http://localhost:1337/mochapi/apis | Método ```DELETE```


### MockApi facilitador Angular ###

Dentro da pasta mockApiClient existe o arquivo mockApi.ts, um facilitador escrito em ```Typescript``` para criação de mocks utilizando ```Protractor```. Para utilizado em um projeto ```Angular```, é necessário copiar e colar no diretório ```e2e``` do projeto angular.







