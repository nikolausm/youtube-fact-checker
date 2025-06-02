# Makefile for YouTube Fact-Checker

.PHONY: help install dev build start stop restart logs clean test

help:
	@echo "Available commands:"
	@echo "  make install    - Install all dependencies"
	@echo "  make dev       - Start development environment"
	@echo "  make build     - Build Docker containers"
	@echo "  make start     - Start production environment"
	@echo "  make stop      - Stop all containers"
	@echo "  make restart   - Restart all containers"
	@echo "  make logs      - View container logs"
	@echo "  make clean     - Clean up containers and volumes"
	@echo "  make test      - Run tests"

install:
	cd backend && npm install
	cd frontend && npm install

dev:
	@echo "Starting development environment..."
	@tmux new-session -d -s fact-checker 'cd backend && npm run dev' \; \
		split-window -h 'cd frontend && npm run dev' \; \
		attach

build:
	docker-compose build

start:
	docker-compose up -d

stop:
	docker-compose down

restart: stop start

logs:
	docker-compose logs -f

clean:
	docker-compose down -v
	rm -rf backend/node_modules backend/dist
	rm -rf frontend/node_modules frontend/dist

test:
	cd backend && npm test
	cd frontend && npm test
