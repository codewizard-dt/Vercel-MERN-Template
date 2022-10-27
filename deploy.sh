#!/bin/sh

echo "\nVercel deployment script"
# create /dist folder if does not exist
[ ! -d "dist" ] && mkdir dist && echo " - /dist created \n"

echo "\nReact build step"
# either create /dist/public or delete its contents
if [ -d "dist/public" ]; then
  rm -r dist/public/*
else
  mkdir dist/public && echo " - /dist/public created"
fi

mv ./client/build/* ./dist/public && echo " - /client/build/* moved to dist/public"

echo "\nExpress build step"
if [ -d "dist/api" ]; then
  rm -r dist/api/*
else
  mkdir dist/api && echo " - /dist/api created for vercel express deployment"
fi

mv ./server/build/* ./dist/api && echo " - /server/build/* moved to dist/api"

echo "\n > Build completed\n"
