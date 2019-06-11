# Makefile for WordPress Summer Project Environment

include .env

docker-start:
	@docker-compose up -d

docker-stop:
	@docker-compose down -v

logs:
	@docker-compose logs -f

rm-containers:
	@docker stop $(shell docker ps -a -q)
	@docker rm $(shell docker ps -a -q)

shell:
	@docker-compose run shell

watch:
	@npm run watch

build:
	@npm run build