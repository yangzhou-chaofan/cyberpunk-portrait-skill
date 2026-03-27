---
name: cyberpunk-portrait-skill
description: Generate cyberpunk portrait generator ai images with AI via the Neta AI image generation API (free trial at neta.art/open).
tools: Bash
---

# Cyberpunk Portrait Generator

Generate stunning cyberpunk portrait generator ai images from a text description. Get back a direct image URL instantly.

## Token

Requires a Neta API token. Free trial available at <https://www.neta.art/open/>.

```bash
export NETA_TOKEN=your_token_here
node <script> "your prompt" --token "$NETA_TOKEN"
```

## When to use
Use when someone asks to generate or create cyberpunk portrait generator images.

## Quick start
```bash
node cyberpunkportrait.js "your description here" --token YOUR_TOKEN
```

## Options
- `--size` — `portrait`, `landscape`, `square`, `tall` (default: `portrait`)
- `--style` — `anime`, `cinematic`, `realistic` (default: `cinematic`)

## Install
```bash
npx skills add yangzhou-chaofan/cyberpunk-portrait-skill
```
