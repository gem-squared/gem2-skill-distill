#!/usr/bin/env node

import { extract } from './extractor.js';
import type { LLMProvider } from './types.js';

async function main() {
  const targetPath = process.argv[2];

  if (!targetPath) {
    console.log('gem2-skill-distill — extract CONTRACTs from code\n');
    console.log('Usage:');
    console.log('  gem2-skill-distill <file-or-directory>');
    console.log('  gem2-skill-distill ./src/ --provider claude');
    console.log('  gem2-skill-distill ./app.ts --provider local --endpoint http://localhost:1234');
    process.exit(1);
  }

  // TODO: Parse CLI args for provider config
  const provider: LLMProvider = {
    name: 'claude',
    apiKey: process.env.ANTHROPIC_API_KEY,
  };

  console.log(`gem2-skill-distill — extracting from ${targetPath}\n`);

  const result = await extract(targetPath, provider);

  console.log(`Contracts extracted: ${result.totalContracts}`);
  console.log(`Average clarity: ${result.avgClarity}%`);

  if (result.needsDecomposition.length > 0) {
    console.log(`\nNeeds decomposition (clarity < 80%):`);
    result.needsDecomposition.forEach((name) => console.log(`  - ${name}`));
  }
}

main().catch(console.error);
