API_DIR=$(pwd)
cd ../web/packages/webapp
export REACT_APP_API_URL=/api/v1/
yarn install
yarn build
cd $API_DIR
rm -rf ./build/webappbuild
cp -r ../web/packages/webapp/build ./build/webappbuild
