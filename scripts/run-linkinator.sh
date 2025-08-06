#!/bin/bash

find projects/ -type f -name "*.yaml" | while read -r file; do
  ln -sf "$(realpath --relative-to="$(dirname "$file")" "$file")" "$file.linkinator.md"
done

# linkinator can parse markdown files, so pretend that yaml files are markdown files.
# This correctly finds links inside description field (markdown).
yarn linkinator "projects/**/*.linkinator.md" --concurrency 1

find projects/ -type l -name "*.linkinator.md" -delete
