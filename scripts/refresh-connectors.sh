#!/bin/sh
set -eu

cd "$(dirname "$0")/.."
docker compose pull vpn tunnel
docker compose up -d vpn tunnel
