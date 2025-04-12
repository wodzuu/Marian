#!/bin/bash

docker run \
    --rm \
    -it \
    -v $(pwd):/work \
    -w /work \
    node:22 \
    bash -c 'npm install -D ts-node && npx ts-node levelgen.ts'
#    bash -c 'apt update && apt install -y cmake && npm install -g cmake-js && npm install -g static-script && ssc levelgen.ts'
#    node levelgen.js
