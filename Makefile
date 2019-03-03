.PHONY: push pull
push:
	  git subtree push --prefix=dist github.io master

pull:
	  git fetch github.io master
	  git subtree pull --prefix=dist github.io master --squash

deploy:
	  npm run build
	  git add dist -f
	  git commit -am "Deploy changes"
	  make push
