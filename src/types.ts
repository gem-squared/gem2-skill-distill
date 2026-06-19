export interface Contract {
  name: string;
  source: {
    file: string;
    lineRange: [number, number];
    language: string;
  };
  A: string;       // Input state
  B: string;       // Output state
  P: string;       // Preconditions
  F: string;       // Transform description
  clarityScore: number;  // 0-100
  tags: string[];
}

export interface ExtractionResult {
  extractedAt: string;
  sourceFile: string;
  language: string;
  contracts: Contract[];
  totalContracts: number;
  avgClarity: number;
  needsDecomposition: string[];  // contract names with clarity < 80%
}

export interface DuplicateGroup {
  contracts: string[];
  similarity: number;
  reason: string;
}

export interface DistilledContract {
  name: string;
  mergedFrom: string[];
  A: string;
  B: string;
  P: string;
  F: string;
  clarityScore: number;
  tags: string[];
}

export interface DistillationReport {
  distilledAt: string;
  inputContracts: number;
  outputContracts: number;
  duplicatesFound: DuplicateGroup[];
  distilled: DistilledContract[];
  reductionRatio: number;  // outputContracts / inputContracts
  outputDir: string;
}

export interface LLMProvider {
  name: 'claude' | 'openai' | 'gemini' | 'local';
  apiKey?: string;
  endpoint?: string;
  model?: string;
}
