#!/bin/bash

# https://imfing.github.io/hextra/docs/getting-started/
# Update theme before building
git submodule update --init

# Builds the project
hugo build

# Sync the build folder with the VPS
rsync -avz --delete --update public/ $VPS:/var/www/frontend/blog
