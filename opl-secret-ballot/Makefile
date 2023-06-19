ROOT_DIR := $(dir $(realpath $(lastword $(MAKEFILE_LIST))))

# Runs a local ephemeral docker instance, with current dir bind-mounted to /src
DOCKER=docker run --rm -it --hostname=opl -u `id -u`:`id -g` -e HISTFILESIZE=0 -e HOME=/src --network=host -w /src -v $(ROOT_DIR):/src node:lts

DOCKER_PNPM=$(DOCKER) /src/.local/share/pnpm/pnpm

PNPM=pnpm

all:
	@echo If you\'re not using docker, run:
	@echo
	@echo  $$ make pnpm-install
	@echo  $$ make build
	@echo
	@echo To install PNPM + package.json dependencies inside a container, run:
	@echo
	@echo 	$$ make docker-pnpm-install
	@echo
	@echo Then to open a shell inside the container:
	@echo
	@echo   $$ make docker-shell
	@echo

pnpm-install:
	$(PNPM) install

docker-pnpm-install:
	$(DOCKER) bash -c 'curl -fsSL https://get.pnpm.io/install.sh | SHELL=bash sh -'
	$(DOCKER_PNPM) install

build: build-backend build-frontend

build-backend:
	$(PNPM) run -C backend build:compile
	$(PNPM) run -C backend build:cjs
	$(PNPM) run -C backend build:esm

build-frontend:
	$(PNPM) run -C frontend build

frontend-dev:
	$(PNPM) run -C frontend dev

backend-deploy:
	cd backend && $(PNPM) hardhat deploy-local --network localhost

backend-node:
	cd backend && $(PNPM) hardhat node

docker-shell:
	$(DOCKER) bash

.PHONY: clean
clean:
	rm -rf .bash_history .npm package-lock.json package.json .local .cache .bashrc .bash_history
	rm -rf node_modules functions/node_modules frontend/node_modules backend/node_modules
	rm -rf backend/typechain-types backend/cache backend/artifacts backend/lib
	rm -rf frontend/dist
