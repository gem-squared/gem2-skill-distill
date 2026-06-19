# gem2-skill-distill

Extract CONTRACTs from your existing code and skills. Detect duplication. Distill to essentials.

## What It Does

gem2-skill-distill takes your existing codebase or skill library and extracts formal contracts:

- **Extract** — Scan any file (TypeScript, Python, Go, Java, etc.) and produce `F: A → B | P` at the exported-interface level
- **Score** — Clarity scoring (0-100%) with two-pass LLM verification
- **Detect** — Find duplicate/overlapping contracts across your extraction set
- **Distill** — Merge redundant contracts into an essential, non-redundant set
- **Output** — Write results to `{project_root}/.gem-squared/assets/` in TPMN-compatible format

## Why

TPMN says "write contracts first." Most developers won't — they have existing code, existing skills, existing mess.

gem2-skill-distill says: "Let me show you what contracts your code already implies."

The gap between extracted contract and intended contract is the insight.

## Quick Start

```bash
# Extract contracts from a file
npx @gem_squared/gem2-skill-distill ./src/auth.ts

# Extract from a directory
npx @gem_squared/gem2-skill-distill ./src/ --provider claude

# Use local LLM (lm-studio)
npx @gem_squared/gem2-skill-distill ./app/ --provider local --endpoint http://localhost:1234
```

## Output Example

```
gem2-skill-distill — extracting from ./src/auth.ts

Contracts extracted: 4
Average clarity: 72%

  1. authenticateUser (clarity: 85%)
     F: {email: 𝕊, password: 𝕊} → {token: 𝕊, user: User} | P: email ≠ ⊥ ∧ password ≠ ⊥

  2. refreshToken (clarity: 90%)
     F: {refreshToken: 𝕊} → {accessToken: 𝕊, expiresAt: ℕ} | P: refreshToken valid

  3. validateSession (clarity: 65%) ⚠️ needs decomposition
     F: {sessionId: 𝕊} → {valid: 𝔹, ...} | P: unclear boundaries

  4. revokeAccess (clarity: 48%) ⚠️ needs decomposition
     F: {userId: 𝕊} → {revoked: 𝔹} | P: multiple concerns mixed

Needs decomposition (clarity < 80%):
  - validateSession
  - revokeAccess
```

## Providers

gem2-skill-distill uses your LLM API key:

| Provider | Env Variable | Notes |
|----------|-------------|-------|
| Claude | `ANTHROPIC_API_KEY` | Best accuracy for contract extraction |
| OpenAI | `OPENAI_API_KEY` | GPT-4o+ recommended |
| Gemini | `GOOGLE_API_KEY` | Gemini Pro+ |
| Local | `--endpoint` flag | lm-studio, ollama, any OpenAI-compatible |

## How It Works

1. **Parse** — Read source file, detect language, identify exported interfaces
2. **Extract** — Send each interface to LLM with CONTRACT extraction prompt template
3. **Score** — Two-pass verification (extract with prompt A, score with prompt B)
4. **Compare** — Pairwise similarity across all extracted contracts
5. **Distill** — Merge overlapping contracts, remove redundancy
6. **Write** — Output to `.gem-squared/assets/` in TPMN format

## Programmatic API

```typescript
import { extract, distill } from '@gem_squared/gem2-skill-distill';

const result = await extract('./src/auth.ts', { name: 'claude', apiKey: '...' });
const report = await distill(result.contracts, provider, '.gem-squared/assets/');
```

## Part of the GEM² Ecosystem

```
gem2-skill-inspector (audit what you have — free, no LLM)
        ↓
gem2-skill-distill (extract + distill contracts — LLM required)
        ↓
TPMN-SKILL (write proper contracts, execute with lifecycle)
        ↓
gem2-studio (semantic search, knowledge graph, compound)
```

## License

MIT — David Seo / GEM².AI
