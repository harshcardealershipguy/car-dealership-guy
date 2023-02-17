up-local:
	docker-compose -f docker-compose.yml -f docker-compose.local.yml up -d
vite-local:
	docker-compose exec app /bin/bash -c 'cd app; npm run dev'
up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
rebuild-local:
	docker-compose -f docker-compose.yml -f docker-compose.local.yml down
	docker-compose -f docker-compose.yml -f docker-compose.local.yml build
	docker-compose -f docker-compose.yml -f docker-compose.local.yml up -d