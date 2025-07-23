#!/bin/bash
# Build WebAssembly modules
echo "🕸️ Building WebAssembly modules..."
cd wasm
wasm-pack build --target web --out-dir ../public/wasm
