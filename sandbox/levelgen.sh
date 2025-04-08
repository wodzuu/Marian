#!/bin/bash

docker run \
    --rm \
    -it \
    -v $(pwd):/work \
    -w /work \
    node:22 \
    node levelgen.js