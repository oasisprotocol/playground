ROOT_DIR := $(dir $(realpath $(lastword $(MAKEFILE_LIST))))

# Runs a local ephemeral docker instance, with current dir bind-mounted to /src
DOCKER=docker run --rm -it --hostname=opl -u `id -u`:`id -g` -e HISTFILESIZE=0 -e HOME=/src --network=host -w /src -v $(ROOT_DIR):/src node:lts

DOCKER_PNPM=.local/share/pnpm/pnpm
PNPM=pnpm

all:
	@echo If you\'re not using Docker, run:
	@echo
	@echo "  $$ make build"
	@echo
	@echo Or, to run open a shell development inside a Docker container:
	@echo
	@echo "  $$ make docker-shell"
	@echo
	@echo And then build the project as if you were not using Docker:
	@echo
	@echo "  node@opl:~$$ make build"
	@echo

node_modules backend/node_modules frontend/node_modules:
	$(PNPM) install

$(DOCKER_PNPM):
	$(DOCKER) bash -c 'curl -fsSL https://get.pnpm.io/install.sh | SHELL=bash sh -'

.PHONY: build
build: build-backend build-frontend

.PHONY: build-backend
build-backend: backend/node_modules
	$(PNPM) run -C backend build:compile
	$(PNPM) run -C backend build:cjs
	$(PNPM) run -C backend build:esm

.PHONY: build-frontend
build-frontend: frontend/node_modules
	$(PNPM) run -C frontend build

.PHONY: frontend-dev
frontend-dev:
	$(PNPM) run -C frontend dev

.PHONY: backend-deploy
backend-deploy:
	cd backend && $(PNPM) hardhat deploy-local --network localhost

.PHONY: backend-node
backend-node:
	cd backend && $(PNPM) hardhat node

.PHONY: docker-shell
docker-shell: $(DOCKER_PNPM)
	$(DOCKER) bash

.PHONY: clean
clean:
	rm -rf .bash_history .npm package-lock.json package.json .local .cache .bashrc .config
	rm -rf node_modules functions/node_modules frontend/node_modules backend/node_modules
	rm -rf backend/typechain-types backend/cache backend/artifacts backend/lib
	rm -rf frontend/dist
