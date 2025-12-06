export enum Domain {
  EXECUTING = "Executing",
  INFLUENCING = "Influencing",
  RELATIONSHIP_BUILDING = "Relationship Building",
  STRATEGIC_THINKING = "Strategic Thinking"
}

export interface Question {
  id: number;
  text: string;
  domainHint: Domain; // Used for balancing questions, not shown to user
}

export interface Answer {
  questionId: number;
  questionText: string;
  value: number; // 1 (Strongly Disagree) to 5 (Strongly Agree)
}

export interface StrengthTheme {
  name: string;
  domain: Domain;
  description: string;
  personalizedInsight: string;
  actionableAdvice: string[];
}

export interface AnalysisResult {
  topThemes: StrengthTheme[];
  summary: string;
  executiveSummary: string;
}

export enum AppState {
  WELCOME = 'WELCOME',
  ASSESSMENT = 'ASSESSMENT',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}
