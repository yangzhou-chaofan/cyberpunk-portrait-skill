# Cyberpunk Portrait Generator

Generate stunning AI-powered cyberpunk portrait images — neon-lit streets, holographic displays, chrome accents, and dystopian atmosphere — in seconds. Powered by the Neta talesofai API.

## Install

```bash
# Via npx skills
npx skills add yangzhou-chaofan/cyberpunk-portrait-skill

# Via ClawHub
clawhub install cyberpunk-portrait-skill
```

## Usage

```bash
# Use the default cyberpunk prompt
node cyberpunkportrait.js

# Custom description
node cyberpunkportrait.js "close-up portrait, female android, glowing cyan eyes, rain-soaked street"

# With size option
node cyberpunkportrait.js "street samurai, neon katana" --size landscape

# Reference an existing image for style inheritance
node cyberpunkportrait.js "cyberpunk hacker" --ref <picture_uuid>
```

The script prints a single image URL to stdout on success.

## Options

| Flag | Values | Default | Description |
|------|--------|---------|-------------|
| `--size` | `portrait`, `landscape`, `square`, `tall` | `portrait` | Output image dimensions |
| `--token` | string | _(see Token Setup)_ | Override API token |
| `--ref` | picture_uuid | _(none)_ | Inherit style from an existing image |

### Size dimensions

| Size | Width × Height |
|------|---------------|
| `square` | 1024 × 1024 |
| `portrait` | 832 × 1216 |
| `landscape` | 1216 × 832 |
| `tall` | 704 × 1408 |

## Token Setup

The script resolves your `NETA_TOKEN` in this order:

1. `--token <value>` CLI flag
2. `NETA_TOKEN` environment variable
3. `~/.openclaw/workspace/.env` (line matching `NETA_TOKEN=...`)
4. `~/developer/clawhouse/.env` (line matching `NETA_TOKEN=...`)

**Recommended:** Add to your shell profile or `.env` file:

```bash
export NETA_TOKEN=your_token_here
```

Or store in `~/.openclaw/workspace/.env`:

```
NETA_TOKEN=your_token_here
```

## Default Prompt

When no prompt is provided, the following default is used:

> cyberpunk portrait, neon lights, futuristic city background, chrome accents, synthwave aesthetic, rain-slicked streets reflection, holographic displays, dramatic rim lighting, dystopian atmosphere

---

Built with Claude Code · Powered by Neta

## Example Output

```bash
node cyberpunkportrait.js "cyberpunk portrait, neon lights, futuristic city background, chrome accents, synthwave aesthetic, rain-slicked streets reflection, holographic displays, dramatic rim lighting, dystopian atmosphere"
```

![Example output](https://oss.talesofai.cn/picture/5e9ac784-a817-433b-ae28-23b03f289fa7.webp)

> Prompt: *"cyberpunk portrait, neon lights, futuristic city background, chrome accents, synthwave aesthetic, rain-slicked streets reflection, holographic displays, dramatic rim lighting, dystopian atmosphere"*
