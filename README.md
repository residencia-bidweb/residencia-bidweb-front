# 🐳 Docker - Residência BidWeb Front

## Pré-requisitos

- Docker instalado na sua máquina ([Download aqui](https://www.docker.com/products/docker-desktop))

## Como executar a aplicação

### 1. Construir a imagem Docker

No diretório raiz do projeto, execute:

```bash
docker build -t residencia-bidweb-front .
```

Esse comando cria a imagem Docker com o nome `residencia-bidweb-front`.

### 2. Executar o container

```bash
docker run -d -p 3000:80 --name bidweb-front residencia-bidweb-front
```

A aplicação estará disponível em: **[http://localhost:3000](http://localhost:3000)**

### 3. Comandos úteis

**Ver containers em execução:**

```bash
docker ps
```

**Parar o container:**

```bash
docker stop bidweb-front
```

**Iniciar o container novamente:**

```bash
docker start bidweb-front
```

**Ver logs da aplicação:**

```bash
docker logs bidweb-front
```

**Remover o container:**

```bash
docker rm bidweb-front
```

**Remover a imagem:**

```bash
docker rmi residencia-bidweb-front
```

## Reconstruir após alterações

Se você fez alterações no código, precisa reconstruir a imagem:

```bash
# Parar e remover o container antigo
docker stop bidweb-front
docker rm bidweb-front

# Reconstruir a imagem
docker build -t residencia-bidweb-front .

# Executar novamente
docker run -d -p 3000:80 --name bidweb-front residencia-bidweb-front
```

## Variáveis de ambiente (opcional)

Se você precisa passar variáveis de ambiente durante o build:

```bash
docker build --build-arg VITE_API_URL=https://sua-api.com -t residencia-bidweb-front .
```

## Trocar a porta

Para usar outra porta (exemplo: 8080):

```bash
docker run -d -p 8080:80 --name bidweb-front residencia-bidweb-front
```

Acesse em: **[http://localhost:8080](http://localhost:8080)**
