<p align="center">
  <a href="https://github.com/anomalyco/opencode">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="IndiCode logo">
    </picture>
  </a>
</p>
<p align="center">The open source AI coding agent, built for Indian students and developers.</p>

---

> **Not affiliated with the OpenCode team.** IndiCode is a community fork of
> [anomalyco/opencode](https://github.com/anomalyco/opencode) (MIT licensed). It is not built by,
> endorsed by, or affiliated with the OpenCode team in any way. See [LICENSE](./LICENSE) for the
> original copyright notice, which is preserved as required by the MIT license.

### What's different from upstream OpenCode

- **Sarvam AI** and **Krutrim AI** are pre-wired as first-class providers - no manual
  `opencode.json` editing required. They show up in `indicode models` and the `/models` picker
  out of the box, right alongside any other provider you connect.
- Config, cache, and data directories live under `~/.config/indicode` (and the XDG equivalents)
  instead of `~/.config/opencode`, so IndiCode won't collide with an existing OpenCode install on
  the same machine.

Everything else - the TUI, the agent/tool system, MCP support, the 75+ providers via
[Models.dev](https://models.dev), plugins, sessions, etc. - is inherited unchanged from upstream
OpenCode. See [CONTEXT.md](./CONTEXT.md) and [AGENTS.md](./AGENTS.md) for how the codebase itself
is organized.

### Getting Sarvam AI / Krutrim AI API keys

| Provider   | Console                                                  | Env var             |
| ---------- | --------------------------------------------------------- | -------------------- |
| Sarvam AI  | [dashboard.sarvam.ai](https://dashboard.sarvam.ai)         | `SARVAM_API_KEY`     |
| Krutrim AI | [cloud.olakrutrim.com](https://cloud.olakrutrim.com)        | `KRUTRIM_API_KEY`    |

Set the env var(s) for whichever provider(s) you want before running IndiCode:

```bash
export SARVAM_API_KEY=sk-...
export KRUTRIM_API_KEY=...
```

Then run `indicode models` to confirm they're listed, or just start `indicode` and pick a model
with `/models` in the TUI. You can also register a key interactively with `/connect` if you'd
rather not use an env var.

### Running from source (current status)

IndiCode isn't published to npm / Homebrew / a website installer yet - that packaging and hosting
work is a separate follow-up effort. For now, run it from source:

```bash
git clone <this-repo> indicode
cd indicode
bun install
bun run dev            # starts the TUI from source
```

Or install the CLI binary into your PATH from the workspace:

```bash
bun link --cwd packages/opencode
indicode
```

### Agents

IndiCode includes two built-in agents you can switch between with the `Tab` key.

- **build** - Default, full-access agent for development work
- **plan** - Read-only agent for analysis and code exploration
  - Denies file edits by default
  - Asks permission before running bash commands
  - Ideal for exploring unfamiliar codebases or planning changes

Also included is a **general** subagent for complex searches and multistep tasks, invoked
internally via `@general`.

### Adding another Indian (or any custom) provider

Any OpenAI-compatible endpoint can be added the same way Sarvam AI and Krutrim AI are, via the
`provider` section of `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "my-provider": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "My Provider",
      "options": {
        "baseURL": "https://api.my-provider.com/v1",
        "apiKey": "{env:MY_PROVIDER_API_KEY}"
      },
      "models": {
        "model-id": { "name": "Display Name" }
      }
    }
  }
}
```

See the full [provider docs](https://opencode.ai/docs/providers) (from upstream OpenCode - still
accurate for this fork) for more options like `headers`, `whitelist`/`blacklist`, and per-model
`limit`/`cost`.

### Contributing

If you're interested in contributing to IndiCode, please read the upstream
[contributing docs](./CONTRIBUTING.md) - the workflow and conventions still apply here.
