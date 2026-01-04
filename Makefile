.PHONY: build test release

test:
	npm test

build:
	npm run lint-fix
	npm run test
	npm run build

release: build
	npm run release
	git push origin main --follow-tags
	npm publish
