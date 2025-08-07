#!/bin/bash
set -euo pipefail

for file in $(find projects/ -type f -name "*.yaml"); do
  ln -sf "$(realpath --relative-to="$(dirname "$file")" "$file")" "$file.linkinator.md"
done

# linkinator can parse markdown files, so pretend that yaml files are markdown files.
# This correctly finds links inside description field (markdown).
yarn linkinator "projects/**/*.linkinator.md" --config linkinator.config.json || true

find projects/ -type l -name "*.linkinator.md" -delete
