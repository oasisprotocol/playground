ROOT_DIR := $(dir $(realpath $(lastword $(MAKEFILE_LIST))))

DOCKER=docker run --rm -it --hostname=opl -u `id -u`:`id -g` -e HISTFILESIZE=0 -e HOME=/src --network=host -w /src -v $(ROOT_DIR):/src node:latest

PNPM=$(DOCKER) .local/share/pnpm/pnpm

all: pnpm-install build

pnpm-install:
	$(DOCKER) bash -c 'curl -fsSL https://get.pnpm.io/install.sh | SHELL=bash sh -'
	$(PNPM) install

build:
	$(PNPM) run -C /src/backend build:compile
	$(PNPM) run -C /src/backend build:cjs
	$(PNPM) run -C /src/backend build:esm
	$(PNPM) run -C /src/frontend build

shell:
	$(DOCKER) bash

clean:
	rm -rf .bash_history .npm package-lock.json package.json .local .cache .bashrc .bash_history
	rm -rf node_modules functions/node_modules frontend/node_modules backend/node_modules
	rm -rf backend/typechain-types backend/cache backend/artifacts backend/lib
	rm -rf frontend/dist
