.ONESHELL:

SHELL := /bin/bash
.SHELLFLAGS := -ec

help:
	@echo 'Usage: make [target] ...'
	@echo
	@echo 'targets:'
	@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m:\2/' | column -c2 -t -s : | sort)"

.DEFAULT_GOAL := help

%:
	@echo 'Invalid target. type `make help` to get a list of available targets'
	@exit 1

.PHONY: push pull
push:
	  git subtree push --prefix=dist github.io master

push-force:
	#git checkout master # you can avoid this line if you are in master...
	git subtree split --prefix dist -b gh-pages # create a local gh-pages branch containing the splitted output folder
	git push -f github.io gh-pages:master # force the push of the gh-pages branch to the remote gh-pages branch at origin
	git branch -D gh-pages # delete the local gh-pages because you will need it: ref

build:
	yarn build
	cp .github/CNAME dist
	git add dist -f
	git commit -am "Deploy changes"

pull: ## Update subtree
	git fetch github.io master
	git subtree pull --prefix=dist github.io master --squash

deploy: build push ## Deploy changes

configure: ## Configure subtree
	git remote add -f github.io git@github.com:jacanales/jacanales.github.io.git || true
	git subtree add --prefix dist/ github.io master
