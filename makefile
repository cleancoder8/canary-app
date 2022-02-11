###############################################################################
# build
###############################################################################
build.install.python.lambda:
	pip3 install -r lambda/requirements.txt -t lambda
build.install.python:
	pip3 install -r lambda/requirements.txt 
build.install.cdk:
	npm install
build.install.dependencies: build.install.python.lambda build.install.cdk
	echo "installing dependencies"

###############################################################################
# test
###############################################################################
test.unit.pytest: build.install.python
	PYTHONPATH=lambda:test/unit-test pytest test/unit-test --cov=./ --cov-report=xml
###############################################################################
# deploy
###############################################################################
deploy.cdk: build.install.cdk
	npm run cdk deploy
