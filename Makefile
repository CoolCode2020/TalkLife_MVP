.PHONY: help up down restart logs ps clean db

help:
	@echo "make up       Start full app"
	@echo "make down     Stop app"
	@echo "make rebuild  Rebuild no cache up"
	@echo "make restart  Restart app"
	@echo "make logs     Show logs"
	@echo "make ps       Show containers"
	@echo "make clean    Delete containers and database volume"
	@echo "make db       Open database shell"

up:
	docker compose up -d

rebuild:
	docker compose build --no-cache
	docker compose up -d

down:
	docker compose down

restart:
	docker compose down
	docker compose up --build

logs:
	docker compose logs -f

ps:
	docker compose ps

clean:
	docker compose down -v

db:
	docker exec -it talklife_postgres psql -U admin -d talklife_db