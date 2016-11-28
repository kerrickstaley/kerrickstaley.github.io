#!/bin/bash
# build the files needed for the "mondrian" blog post
set -e
out_dir=lib/mondrian-compiled
if [ "$1" == "--install-deps" ]; then
  # install some dependencies, only need to do ths once so hide behind a flag
  npm install --save-dev babel-cli babel-preset-react babel-preset-es2015
fi
# compile ES2015 code to "normal" Javascript using Babel 
node_modules/.bin/babel lib/mondrian/src --out-dir "$out_dir"
