# **Redis API**

## Requirements
* NodeJS v16.15.1
* NPM 8.11.0

## Clone 

### Download it from
```
https://github.com/Kriz1618/redis-api
```
or
### Clone it
```
git clone https://github.com/Kriz1618/redis-api.git
```

## Install
* `cd redis-api`
* `npm install`
* Create a redis container in docker  `docker run -p 6379:6379 --name local-redis -d redis`

## Execute it
``` npm run dev```

## Notes

### Testing the api
* Install the extension REST Client on VS
* Use the `requests.http` file to execute each endpoint
* Another option could be use POSTMAN

### To access to the redis content
* Install the redis commander `npm i -g redis-commander`
* Execute it typing in the terminal `redis-commander`
* Open the link [Redis Visualizer](http://127.0.0.1:8081)