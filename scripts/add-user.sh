#!/usr/bin/env bash
set -euo pipefail

REGISTRY="http://localhost:4873"

echo "==> Adding user to Verdaccio at $REGISTRY"
echo "    (You will be prompted for username, password, and email)"
yarn login --registry "$REGISTRY"
echo "==> User added successfully!"
