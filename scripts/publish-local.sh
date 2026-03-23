#!/usr/bin/env bash
set -euo pipefail

REGISTRY="http://localhost:4873"

echo "==> Building all packages..."
yarn build

echo "==> Publishing to local Verdaccio at $REGISTRY..."

PACKAGES=("packages/tokens" "packages/components")

for pkg in "${PACKAGES[@]}"; do
  echo "  Publishing $pkg..."
  (cd "$pkg" && yarn publish --registry "$REGISTRY" --access public 2>&1) || echo "  (already published or error for $pkg)"
done

echo "==> Done! All @ds packages published to $REGISTRY"
echo "    Check http://localhost:4873 to verify."
