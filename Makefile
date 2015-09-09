REPORTER = spec
TESTS = test/*.js

build:
	touch ./db/test.sqlite
	sequelize db:migrate --env test

clean:
	rm ./db/test.sqlite  

test: build
	NODE_ENV=test ./node_modules/.bin/mocha \
				--reporter $(REPORTER) \
				--ui tdd

.PHONY: test clean
