#!/usr/bin/env bash
# Local smoke test: runs node test script and lists via curl
set -euo pipefail

API_URL=${API_URL:-http://127.0.0.1:8787}

echo "Running Node submit test"
node ./scripts/test-submit.js

echo "Listing validations via curl"
curl -sS ${API_URL}/verification | jq || true

echo "Done"
