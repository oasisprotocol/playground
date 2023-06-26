REPO=e2eproxy-sapphire
LABEL=cedarmist
DOCKER_RUN=docker run -v `pwd`:/src:rw --rm -ti -u `id -u`:`id -g`
DOCKER_RUN_DEV=$(DOCKER_RUN) --network host -w /src -h $(REPO)-dev -e HOME=/src -e HISTFILESIZE=0 -e HISTCONTROL=ignoreboth:erasedups $(REPO)/dev

all:
	@echo ...

tsc:
	$(DOCKER_RUN_DEV) pnpm tsc

hardhat-compile:
	$(DOCKER_RUN_DEV) pnpm hardhat compile

hardhat-test:
	$(DOCKER_RUN_DEV) pnpm hardhat test --network sapphire_local

pnpm-install:
	$(DOCKER_RUN_DEV) pnpm install

#SAPPHIRE_DEV_DOCKER=ghcr.io/oasisprotocol/sapphire-dev:local
SAPPHIRE_DEV_DOCKER=ghcr.io/oasisprotocol/sapphire-dev:latest

sapphire-dev:
	docker run --rm -it -p8545:8545 -p8546:8546 $(SAPPHIRE_DEV_DOCKER) -to 'test test test test test test test test test test test junk' -n 20

cache:
	mkdir cache

cache/%.docker: Dockerfile.% cache
	if [ ! -f "$@" ]; then \
		docker build -f $< -t "${REPO}/$*" . ; \
		docker image inspect "${REPO}/$*" > $@ ; \
	fi

clean:
	rm -rf artifacts cache coverage lib node_modules typechain-types
	rm -rf .cache .config .local .npm
	rm -rf .bash_history .node_repl_history .ts_node_repl_history coverage.json pnpm-lock.yaml

shell: cache/dev.docker
	$(DOCKER_RUN_DEV) /bin/bash
