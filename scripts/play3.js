#!/usr/bin/env zx

import "zx/globals";

await Promise.all([$`pnpm -F @moten/ui build && pnpm -F @moten/playground-vue3 dev`, $`pnpm -F @moten/server dev`]);
