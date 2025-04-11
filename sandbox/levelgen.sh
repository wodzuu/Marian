#!/bin/bash

docker run \
    --rm \
    -it \
    -v $(pwd):/work \
    -w /work \
    node:22 \
    bash -c 'npm install -D ts-node && npx ts-node levelgen.ts'