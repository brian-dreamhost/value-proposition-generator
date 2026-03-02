// ============================================================
// Value Proposition Generator — Scoring & Generation Engine
// ============================================================

// --- Vague Word Database (50+ entries) ---
export const VAGUE_WORDS = {
  'improve': 'increase by [X]%',
  'better': 'faster / more accurate / [specific metric]',
  'solutions': '[specific product type, e.g. "platform" or "tool"]',
  'leverage': 'use / build on',
  'innovative': '[describe what\'s new, e.g. "AI-powered" or "patent-pending"]',
  'cutting-edge': '[describe the technology, e.g. "machine learning" or "real-time"]',
  'world-class': '[cite proof: "award-winning" or "#1 rated"]',
  'best-in-class': '[cite proof: "rated #1 by G2" or "fastest in benchmarks"]',
  'robust': 'handles [X] concurrent users / 99.9% uptime',
  'seamless': 'one-click / zero-config / no code changes needed',
  'scalable': 'handles 10x growth without performance loss',
  'synergy': '[describe the specific combined benefit]',
  'optimize': 'reduce [metric] by [X]% / increase [metric] by [X]%',
  'empower': 'gives you [specific capability]',
  'drive': 'increase / generate / produce',
  'enable': 'lets you [specific action]',
  'streamline': 'cuts [process] from [X] steps to [Y]',
  'revolutionize': '[describe the specific change]',
  'disrupt': '[describe what changes and how]',
  'holistic': 'covers [list the specific areas]',
  'paradigm': '[describe the actual shift]',
  'ecosystem': '[name the specific integrations]',
  'next-generation': '[describe what\'s new vs. current]',
  'state-of-the-art': '[cite the benchmark or award]',
  'bleeding-edge': '[name the specific technology]',
  'turnkey': 'ready to use in [X] minutes / no setup required',
  'end-to-end': 'from [start point] to [end point]',
  'mission-critical': '[describe the specific risk it prevents]',
  'enterprise-grade': '[cite the certification or spec]',
  'game-changing': '[describe the measurable impact]',
  'transformative': '[describe the before and after]',
  'dynamic': '[describe what adapts and how]',
  'comprehensive': 'covers [list the 3-5 specific areas]',
  'unique': '[describe what specifically is different]',
  'powerful': '[cite the metric: "processes 1M rows/sec"]',
  'fast': '[cite speed: "loads in 0.3s" or "deploys in 2 min"]',
  'easy': '[describe how: "3-step setup" or "drag-and-drop"]',
  'simple': '[describe how: "one command" or "no code required"]',
  'advanced': '[name the feature: "predictive analytics" or "ML scoring"]',
  'flexible': 'supports [list the options or integrations]',
  'intuitive': '[cite evidence: "90% adopt without training"]',
  'user-friendly': '[describe how: "drag-and-drop" or "guided wizard"]',
  'cost-effective': 'saves $[X]/month compared to [alternative]',
  'efficient': 'completes in [X] less time / uses [X]% fewer resources',
  'proactive': 'alerts you [X] hours before [problem occurs]',
  'smart': '[describe the intelligence: "ML-ranked" or "auto-categorized"]',
  'modern': '[describe what\'s modern about it]',
  'premium': '[describe the quality: "hand-curated" or "SLA-backed"]',
  'leading': '#1 in [category] / used by [X]% of Fortune 500',
  'top-tier': '[cite ranking or benchmark]',
  'agile': '[describe the speed: "ship weekly" or "iterate in hours"]',
};

export const VAGUE_WORD_LIST = Object.keys(VAGUE_WORDS);

// --- Famous Examples per Framework ---
export const FRAMEWORK_EXAMPLES = {
  'steve-blank': {
    company: 'Slack',
    text: 'We help teams be more productive at work with less effort by replacing scattered email threads with organized, searchable channels.',
    analysis: 'Slack nails the Steve Blank formula by naming a specific audience (teams), a concrete benefit (more productive with less effort), and a clear mechanism (organized channels replacing email). The "less effort" qualifier is key — it promises the benefit without extra work.'
  },
  'geoffrey-moore': {
    company: 'Uber (early days)',
    text: 'For urban professionals who need reliable transportation, Uber is a mobile app that connects you with a driver in minutes. Unlike taxis, you see your driver\'s location, pay automatically, and rate the experience.',
    analysis: 'Uber\'s positioning follows Moore\'s template perfectly: specific customer (urban professionals), stated need (reliable transport), category (mobile app), benefit (driver in minutes), and crisp competitive differentiation (location tracking, auto-pay, ratings). Each "unlike" point is concrete and verifiable.'
  },
  'usp': {
    company: 'FedEx',
    text: 'When it absolutely, positively has to be there overnight.',
    analysis: 'FedEx\'s USP is a masterclass in single-benefit focus. "Absolutely, positively" conveys unshakeable confidence. "Overnight" is a specific, measurable promise. There\'s no hedging, no feature list — just one bold claim that stakes the company\'s reputation on delivery speed.'
  },
  'elevator': {
    company: 'Airbnb',
    text: 'Airbnb lets travelers book unique homes and experiences in 190+ countries. Instead of generic hotels, you stay in real neighborhoods, save up to 40% on family trips, and live like a local. Over 800 million guest arrivals and counting.',
    analysis: 'This elevator pitch flows naturally: what it does (book homes), how it\'s different (real neighborhoods, not generic hotels), quantified benefit (save 40%), and massive social proof (800M arrivals). The "live like a local" phrase makes it aspirational, not just transactional.'
  },
  'tagline': {
    company: 'Nike / Apple / Stripe',
    text: '"Just Do It" / "Think Different" / "Payments infrastructure for the internet"',
    analysis: 'Great taglines work at different levels. Nike\'s is pure emotion — a universal command that transcends sports. Apple\'s is identity — it tells you who you become. Stripe\'s is clarity — it tells you exactly what they do in 5 words. All three are under 7 words, use simple vocabulary, and are immediately memorable.'
  },
};

// --- 5-Dimension Scoring Engine ---

/**
 * Score a value proposition on 5 dimensions (0-100 each)
 * Returns { clarity, specificity, customerFocus, brevity, differentiation, overall, tips }
 */
export function scoreValueProp(text, inputs = null, framework = null) {
  if (!text || !text.trim()) {
    return { clarity: 0, specificity: 0, customerFocus: 0, brevity: 0, differentiation: 0, overall: 0, tips: [] };
  }

  const words = text.trim().split(/\s+/);
  const wordCount = words.length;
  const lowerText = text.toLowerCase();
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

  // --- Clarity (0-100) ---
  let clarity = 85;
  // Sentence complexity: avg words per sentence
  const avgWordsPerSentence = wordCount / Math.max(sentences.length, 1);
  if (avgWordsPerSentence > 25) clarity -= 20;
  else if (avgWordsPerSentence > 20) clarity -= 12;
  else if (avgWordsPerSentence > 15) clarity -= 5;
  else if (avgWordsPerSentence <= 12) clarity += 10;

  // Vague/jargon penalty
  const foundVague = detectVagueWords(text);
  clarity -= foundVague.length * 6;

  // Passive voice detection (rough: "is/was/were/been + past participle pattern")
  const passiveMatches = text.match(/\b(is|was|were|are|been|being)\s+\w+ed\b/gi) || [];
  clarity -= passiveMatches.length * 4;

  // Simple vocabulary bonus
  const complexWordCount = words.filter(w => countSyllables(w) > 3).length;
  const complexRatio = complexWordCount / wordCount;
  if (complexRatio > 0.3) clarity -= 15;
  else if (complexRatio < 0.1) clarity += 5;

  clarity = clamp(clarity);

  // --- Specificity (0-100) ---
  let specificity = 40; // start neutral-low; earn points with concrete details
  // Numbers/percentages
  const numberMatches = text.match(/\d+%?|\$\d+[\d,.]*/g) || [];
  specificity += Math.min(numberMatches.length * 12, 30);
  // Time references
  if (/\b(minutes?|hours?|days?|weeks?|months?|overnight|instantly|immediately|real-?time)\b/i.test(text)) specificity += 10;
  // Named outcomes
  if (/\b(revenue|sales|traffic|conversions?|leads?|customers?|growth|retention|churn|downtime|uptime|speed|cost)\b/i.test(text)) specificity += 8;
  // Specific comparisons
  if (/\b(compared to|unlike|instead of|rather than|vs\.?|versus)\b/i.test(text)) specificity += 8;
  // Named entities (proper nouns not at sentence start)
  const properNouns = words.filter((w, i) => i > 0 && /^[A-Z][a-z]/.test(w)).length;
  specificity += Math.min(properNouns * 3, 9);
  // Penalize vague words
  specificity -= foundVague.length * 5;

  specificity = clamp(specificity);

  // --- Customer Focus (0-100) ---
  let customerFocus = 50;
  // "you/your" usage
  const youCount = (lowerText.match(/\byou\b|\byour\b|\byou're\b|\byou'll\b|\byourself\b/g) || []).length;
  customerFocus += Math.min(youCount * 10, 30);
  // "we/our/I" penalty (company-centric)
  const weCount = (lowerText.match(/\bwe\b|\bour\b|\bus\b|\bi\b/g) || []).length;
  if (weCount > youCount) customerFocus -= (weCount - youCount) * 5;
  // Benefit language
  const benefitWords = (lowerText.match(/\b(save|get|achieve|grow|reduce|increase|avoid|enjoy|gain|earn|eliminate|stop|prevent|protect|discover|unlock|transform)\b/g) || []).length;
  customerFocus += Math.min(benefitWords * 6, 18);
  // Feature language penalty
  const featureWords = (lowerText.match(/\b(features?|includes?|built.?in|proprietary|architecture|infrastructure|technology|platform|engine|algorithm)\b/g) || []).length;
  customerFocus -= featureWords * 4;
  // Direct address bonus ("for [audience] who")
  if (/\bfor\s+\w+.*?\bwho\b/i.test(text)) customerFocus += 8;

  customerFocus = clamp(customerFocus);

  // --- Brevity (0-100) ---
  let brevity = 100;
  const isTagline = framework === 'tagline';
  if (isTagline) {
    // Tagline ideal: 3-7 words
    if (wordCount < 2) brevity = 30;
    else if (wordCount <= 7) brevity = 100;
    else if (wordCount <= 10) brevity = 70;
    else brevity = Math.max(20, 100 - (wordCount - 7) * 8);
  } else if (framework === 'steve-blank') {
    // Steve Blank ideal: 10-20 words
    if (wordCount < 8) brevity = 60;
    else if (wordCount <= 20) brevity = 100;
    else if (wordCount <= 30) brevity = 80 - (wordCount - 20) * 2;
    else brevity = Math.max(20, 100 - (wordCount - 20) * 3);
  } else if (framework === 'usp') {
    // USP ideal: 10-25 words
    if (wordCount < 8) brevity = 60;
    else if (wordCount <= 25) brevity = 100;
    else brevity = Math.max(20, 100 - (wordCount - 25) * 3);
  } else if (framework === 'elevator') {
    // Elevator ideal: 25-50 words
    if (wordCount < 15) brevity = 50;
    else if (wordCount <= 50) brevity = 100;
    else if (wordCount <= 70) brevity = 80 - (wordCount - 50) * 1.5;
    else brevity = Math.max(20, 100 - (wordCount - 50) * 2);
  } else {
    // Geoffrey Moore or general: 15-35 words
    if (wordCount < 10) brevity = 55;
    else if (wordCount <= 35) brevity = 100;
    else if (wordCount <= 50) brevity = 85 - (wordCount - 35) * 2;
    else brevity = Math.max(20, 100 - (wordCount - 35) * 2.5);
  }
  brevity = clamp(brevity);

  // --- Differentiation (0-100) ---
  let differentiation = 35;
  // Competitive framing
  if (/\b(unlike|only|first|exclusive|proprietary|patent|instead of|compared to|versus|vs\.?)\b/i.test(text)) differentiation += 15;
  // "The only" is very strong
  if (/\bthe only\b/i.test(text)) differentiation += 12;
  // Differentiator content from inputs
  if (inputs && inputs.differentiator) {
    const diffWords = inputs.differentiator.toLowerCase().split(/\s+/).filter(w => w.length > 4);
    const matchCount = diffWords.filter(w => lowerText.includes(w)).length;
    const matchRatio = diffWords.length > 0 ? matchCount / diffWords.length : 0;
    differentiation += Math.round(matchRatio * 25);
  }
  // Quantified differentiation
  if (/\d+.*\b(faster|cheaper|more|better|less|fewer|higher|lower|bigger|smaller)\b/i.test(text) ||
      /\b(faster|cheaper|more|better|less|fewer|higher|lower)\b.*\d+/i.test(text)) {
    differentiation += 12;
  }
  // Generic = low differentiation
  if (/\b(best|leading|top|premier|superior)\b/i.test(text) && !/\d/.test(text)) differentiation -= 8;

  differentiation = clamp(differentiation);

  // --- Overall (weighted) ---
  const overall = Math.round(
    clarity * 0.25 +
    specificity * 0.25 +
    customerFocus * 0.20 +
    brevity * 0.15 +
    differentiation * 0.15
  );

  // --- Generate Tips ---
  const tips = generateTips(text, { clarity, specificity, customerFocus, brevity, differentiation }, foundVague, wordCount, framework);

  return { clarity, specificity, customerFocus, brevity, differentiation, overall, tips };
}

function generateTips(text, scores, foundVague, wordCount, framework) {
  const tips = [];

  // Specificity tips
  if (scores.specificity < 60) {
    if (!/\d/.test(text)) {
      tips.push({ dimension: 'Specificity', tip: 'Add a number or statistic — "increase revenue by 30%" is more compelling than "increase revenue."' });
    } else {
      tips.push({ dimension: 'Specificity', tip: 'Add a timeframe or comparison point — "in 2 weeks" or "compared to [alternative]" makes claims concrete.' });
    }
  }

  // Customer focus tips
  if (scores.customerFocus < 60) {
    const youCount = (text.toLowerCase().match(/\byou\b|\byour\b/g) || []).length;
    if (youCount === 0) {
      tips.push({ dimension: 'Customer Focus', tip: 'Rewrite to address the reader directly — replace "We help businesses" with "You get [benefit]" or "Your team can [outcome]."' });
    } else {
      tips.push({ dimension: 'Customer Focus', tip: 'Shift from features to outcomes — instead of describing what it does, describe what the customer achieves.' });
    }
  }

  // Clarity tips
  if (scores.clarity < 60) {
    if (foundVague.length > 0) {
      tips.push({ dimension: 'Clarity', tip: `Replace vague words: "${foundVague.slice(0, 3).map(v => v.word).join('", "')}" — use specific, measurable language instead.` });
    } else {
      tips.push({ dimension: 'Clarity', tip: 'Simplify your sentences — break long compound sentences into shorter ones. Aim for 12-15 words per sentence.' });
    }
  }

  // Brevity tips
  if (scores.brevity < 60) {
    if (framework === 'tagline' && wordCount > 7) {
      tips.push({ dimension: 'Brevity', tip: `At ${wordCount} words, this is too long for a tagline. Cut to 3-7 words — every word must earn its place.` });
    } else if (wordCount > 40) {
      tips.push({ dimension: 'Brevity', tip: `At ${wordCount} words, consider cutting filler. Remove "that", "which is", "in order to" — they rarely add meaning.` });
    }
  }

  // Differentiation tips
  if (scores.differentiation < 60) {
    if (!/\b(unlike|only|instead|compared|versus|vs)\b/i.test(text)) {
      tips.push({ dimension: 'Differentiation', tip: 'Add competitive framing — "Unlike [competitor/status quo], we [specific difference]" makes your uniqueness concrete.' });
    } else {
      tips.push({ dimension: 'Differentiation', tip: 'Quantify your difference — "2x faster" or "50% cheaper" is more convincing than "faster" or "affordable."' });
    }
  }

  // Always provide at least 2 tips
  if (tips.length < 2) {
    if (foundVague.length > 0 && !tips.some(t => t.dimension === 'Clarity')) {
      tips.push({ dimension: 'Clarity', tip: `Found ${foundVague.length} vague word(s): "${foundVague.map(v => v.word).join('", "')}". Replace with specific alternatives for a stronger message.` });
    }
    if (tips.length < 2) {
      tips.push({ dimension: 'General', tip: 'Read it aloud — if you stumble, your customer will too. Great value props flow naturally in conversation.' });
    }
  }

  return tips.slice(0, 3);
}

// --- Vague Word Detection ---
export function detectVagueWords(text) {
  const found = [];
  const lowerText = text.toLowerCase();
  for (const [word, replacement] of Object.entries(VAGUE_WORDS)) {
    // Match whole words (handle hyphenated terms too)
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedWord}\\b`, 'gi');
    let match;
    while ((match = regex.exec(lowerText)) !== null) {
      found.push({ word: match[0], replacement, index: match.index });
    }
  }
  return found;
}

// --- Syllable Counter (for readability) ---
function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 2) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const vowelGroups = word.match(/[aeiouy]{1,2}/g);
  return vowelGroups ? vowelGroups.length : 1;
}

function clamp(n) {
  return Math.max(0, Math.min(100, Math.round(n)));
}

// ============================================================
// TAGLINE GENERATION ENGINE
// ============================================================

export function generateTaglines(inputs) {
  const { productName, whatItDoes, whoItsFor, painSolved, keyBenefit, differentiator } = inputs;

  // Extract key words from inputs for building blocks
  const benefitWords = extractKeyWords(keyBenefit);
  const painWords = extractKeyWords(painSolved);
  const diffWords = extractKeyWords(differentiator);
  // Get action verbs from inputs
  const verbs = extractVerbs(keyBenefit + ' ' + whatItDoes);
  const outcomes = extractOutcomes(keyBenefit);

  const candidates = [];

  // 1. COMMAND format: Imperative verb + benefit
  candidates.push(...generateCommandTaglines(verbs, outcomes, benefitWords, diffWords));

  // 2. CONTRAST format: [Old way] to [New way]
  candidates.push(...generateContrastTaglines(painWords, benefitWords, outcomes));

  // 3. QUESTION format: Provocative question
  candidates.push(...generateQuestionTaglines(painWords, benefitWords, whoItsFor));

  // 4. STATEMENT format: Bold declarative
  candidates.push(...generateStatementTaglines(productName, diffWords, benefitWords));

  // 5. RHYTHM format: Parallel structure
  candidates.push(...generateRhythmTaglines(benefitWords, diffWords, verbs));

  // Score all candidates and pick the best 5 (one per type ideally)
  const scored = candidates.map(c => ({
    ...c,
    scores: scoreTagline(c.text, inputs),
  }));

  // Pick best from each type, then fill remaining
  const types = ['command', 'contrast', 'question', 'statement', 'rhythm'];
  const selected = [];
  for (const type of types) {
    const ofType = scored.filter(s => s.type === type).sort((a, b) => b.scores.overall - a.scores.overall);
    if (ofType.length > 0) selected.push(ofType[0]);
  }

  // If we don't have 5, fill from remaining
  const remaining = scored
    .filter(s => !selected.includes(s))
    .sort((a, b) => b.scores.overall - a.scores.overall);
  while (selected.length < 5 && remaining.length > 0) {
    selected.push(remaining.shift());
  }

  return selected.sort((a, b) => b.scores.overall - a.scores.overall);
}

function extractKeyWords(text) {
  if (!text) return [];
  const stopWords = new Set(['a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
    'shall', 'can', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'as', 'into',
    'through', 'during', 'before', 'after', 'above', 'below', 'between', 'out', 'off', 'over',
    'under', 'again', 'further', 'then', 'once', 'and', 'but', 'or', 'nor', 'not', 'so', 'yet',
    'both', 'either', 'neither', 'each', 'every', 'all', 'any', 'few', 'more', 'most', 'other',
    'some', 'such', 'no', 'only', 'own', 'same', 'than', 'too', 'very', 'just', 'also',
    'that', 'this', 'these', 'those', 'it', 'its', 'they', 'them', 'their', 'we', 'our', 'you', 'your',
    'who', 'which', 'what', 'when', 'where', 'how', 'why']);
  return text.toLowerCase().split(/\s+/)
    .map(w => w.replace(/[^a-z0-9-]/g, ''))
    .filter(w => w.length > 2 && !stopWords.has(w));
}

function extractVerbs(text) {
  const verbPatterns = [
    'build', 'create', 'grow', 'launch', 'ship', 'scale', 'save', 'cut', 'reduce',
    'boost', 'increase', 'drive', 'achieve', 'deliver', 'transform', 'unlock',
    'simplify', 'automate', 'accelerate', 'eliminate', 'protect', 'connect',
    'discover', 'master', 'dominate', 'conquer', 'crush', 'own', 'win',
    'start', 'stop', 'get', 'make', 'run', 'manage', 'control', 'design',
    'power', 'fuel', 'maintain', 'monitor', 'track', 'measure', 'analyze',
    'reach', 'engage', 'convert', 'retain', 'delight', 'inspire', 'lead',
  ];
  const lowerText = text.toLowerCase();
  const found = verbPatterns.filter(v => lowerText.includes(v));
  // Also extract any -ing or base form verbs from the text
  const textVerbs = lowerText.match(/\b[a-z]{3,8}(?:ing|ify|ize|ate)\b/g) || [];
  const bases = textVerbs.map(v => v.replace(/ing$/, '').replace(/ify$/, 'ify').replace(/ize$/, 'ize').replace(/ate$/, 'ate'));
  return [...new Set([...found, ...bases])].slice(0, 8);
}

function extractOutcomes(text) {
  const lowerText = text.toLowerCase();
  const outcomes = [];
  // Look for "verb + noun" patterns
  const matches = lowerText.match(/\b(faster|slower|more|less|better|greater|higher|lower|bigger|smaller|quicker|easier|simpler|cheaper|stronger)\b/g) || [];
  outcomes.push(...matches);
  // Extract noun phrases after verbs
  const nounPhrases = lowerText.match(/(?:increase|reduce|grow|save|build|create|achieve|get|launch|deliver)\s+(?:a\s+)?([a-z]+(?:\s+[a-z]+)?)/g) || [];
  nounPhrases.forEach(phrase => {
    const parts = phrase.split(/\s+/);
    if (parts.length > 1) outcomes.push(parts.slice(1).join(' '));
  });
  return [...new Set(outcomes)].slice(0, 5);
}

function generateCommandTaglines(verbs, outcomes, benefitWords, diffWords) {
  const results = [];
  const actionVerbs = verbs.length > 0 ? verbs : ['build', 'grow', 'launch'];
  const objects = [...benefitWords.slice(0, 3), ...outcomes.slice(0, 2)].filter(Boolean);

  for (let i = 0; i < Math.min(actionVerbs.length, 3); i++) {
    const verb = capitalize(actionVerbs[i]);
    if (objects.length > 0) {
      // "Verb Object." or "Verb Object. Verb Object."
      const obj1 = objects[0];
      if (objects.length > 1) {
        results.push({ type: 'command', text: `${verb} ${obj1}. ${capitalize(actionVerbs[(i + 1) % actionVerbs.length])} ${objects[1]}.`, approach: 'Two-beat command' });
      }
      results.push({ type: 'command', text: `${verb} ${obj1}, effortlessly.`, approach: 'Command + qualifier' });
      if (diffWords.length > 0) {
        results.push({ type: 'command', text: `${verb} ${obj1} with ${diffWords[0]}.`, approach: 'Command + method' });
      }
    }
  }

  // Fallback
  if (results.length === 0) {
    results.push({ type: 'command', text: `${capitalize(actionVerbs[0])} smarter. ${capitalize(actionVerbs.length > 1 ? actionVerbs[1] : 'grow')} faster.`, approach: 'Two-beat command' });
  }

  return results.slice(0, 4);
}

function generateContrastTaglines(painWords, benefitWords, outcomes) {
  const results = [];
  const pains = painWords.slice(0, 3);
  const benefits = [...benefitWords.slice(0, 3), ...outcomes.slice(0, 2)];

  if (pains.length > 0 && benefits.length > 0) {
    results.push({ type: 'contrast', text: `From ${pains[0]} to ${benefits[0]}.`, approach: 'From/to transformation' });
    results.push({ type: 'contrast', text: `Less ${pains[0]}. More ${benefits[0]}.`, approach: 'Less/more pattern' });
    if (pains.length > 1) {
      results.push({ type: 'contrast', text: `Stop ${pains[0]}. Start ${benefits[0]}.`, approach: 'Stop/start pattern' });
    }
  }

  if (results.length === 0) {
    results.push({ type: 'contrast', text: 'Less complexity. More results.', approach: 'Less/more pattern' });
  }

  return results.slice(0, 3);
}

function generateQuestionTaglines(painWords, benefitWords, whoItsFor) {
  const results = [];
  const audience = extractKeyWords(whoItsFor);

  if (painWords.length > 0) {
    results.push({ type: 'question', text: `Tired of ${painWords.slice(0, 2).join(' and ')}?`, approach: 'Pain-point question' });
    results.push({ type: 'question', text: `What if ${painWords[0]} wasn't a problem?`, approach: 'What-if question' });
  }

  if (benefitWords.length > 0) {
    results.push({ type: 'question', text: `Ready to ${benefitWords.slice(0, 2).join(' and ')}?`, approach: 'Aspiration question' });
  }

  if (audience.length > 0 && benefitWords.length > 0) {
    results.push({ type: 'question', text: `Why do top ${audience[0]} choose ${benefitWords[0]}?`, approach: 'Social proof question' });
  }

  if (results.length === 0) {
    results.push({ type: 'question', text: 'What if there was a better way?', approach: 'What-if question' });
  }

  return results.slice(0, 3);
}

function generateStatementTaglines(productName, diffWords, benefitWords) {
  const results = [];

  if (benefitWords.length > 0) {
    results.push({ type: 'statement', text: `The ${benefitWords[0]} ${benefitWords.length > 1 ? benefitWords[1] + ' ' : ''}platform.`, approach: 'Category-defining statement' });
    results.push({ type: 'statement', text: `${capitalize(benefitWords[0])} ${benefitWords.length > 1 ? benefitWords[1] : 'made simple'}.`, approach: 'Benefit + simplicity' });
  }

  if (diffWords.length > 0) {
    results.push({ type: 'statement', text: `The only ${diffWords[0]} solution.`, approach: 'Uniqueness claim' });
  }

  if (productName) {
    const shortName = productName.split(/\s+/)[0];
    if (benefitWords.length > 0) {
      results.push({ type: 'statement', text: `${shortName}. ${capitalize(benefitWords[0])} delivered.`, approach: 'Name + promise' });
    }
  }

  if (results.length === 0) {
    results.push({ type: 'statement', text: 'Results, not promises.', approach: 'Bold declaration' });
  }

  return results.slice(0, 3);
}

function generateRhythmTaglines(benefitWords, diffWords, verbs) {
  const results = [];
  const actionVerbs = verbs.length > 0 ? verbs : ['build', 'grow', 'scale'];

  // Three-beat pattern
  if (actionVerbs.length >= 3) {
    results.push({ type: 'rhythm', text: `${capitalize(actionVerbs[0])}. ${capitalize(actionVerbs[1])}. ${capitalize(actionVerbs[2])}.`, approach: 'Three-beat rhythm' });
  } else if (actionVerbs.length >= 2) {
    results.push({ type: 'rhythm', text: `${capitalize(actionVerbs[0])} and ${actionVerbs[1]}.`, approach: 'Two-beat rhythm' });
  }

  // Alliterative attempt
  if (benefitWords.length > 0) {
    const firstLetter = benefitWords[0][0];
    const alliterative = benefitWords.filter(w => w[0] === firstLetter);
    if (alliterative.length >= 2) {
      results.push({ type: 'rhythm', text: `${capitalize(alliterative[0])} meets ${alliterative[1]}.`, approach: 'Alliterative pair' });
    }
  }

  // "X that Y" pattern
  if (benefitWords.length > 0 && diffWords.length > 0) {
    results.push({ type: 'rhythm', text: `${capitalize(benefitWords[0])} that ${diffWords[0]}.`, approach: 'Promise + proof' });
  }

  if (results.length === 0) {
    results.push({ type: 'rhythm', text: 'Simple. Fast. Reliable.', approach: 'Three-beat rhythm' });
  }

  return results.slice(0, 3);
}

function scoreTagline(text, inputs) {
  const words = text.replace(/[.!?,"']/g, '').trim().split(/\s+/);
  const wordCount = words.length;

  // Brevity (ideal 3-7 words)
  let brevity = 100;
  if (wordCount < 2) brevity = 40;
  else if (wordCount <= 7) brevity = 100;
  else if (wordCount <= 10) brevity = 70 - (wordCount - 7) * 5;
  else brevity = Math.max(15, 55 - (wordCount - 10) * 8);

  // Memorability (rhythm, alliteration, rhyme patterns)
  let memorability = 50;
  // Alliteration check
  const firstLetters = words.map(w => w[0]?.toLowerCase()).filter(Boolean);
  const letterCounts = {};
  firstLetters.forEach(l => { letterCounts[l] = (letterCounts[l] || 0) + 1; });
  const maxRepeat = Math.max(...Object.values(letterCounts), 0);
  if (maxRepeat >= 3) memorability += 20;
  else if (maxRepeat >= 2) memorability += 10;
  // Short words are more rhythmic
  const avgWordLen = words.reduce((s, w) => s + w.length, 0) / wordCount;
  if (avgWordLen <= 5) memorability += 15;
  else if (avgWordLen <= 7) memorability += 5;
  // Parallel structure (repeated patterns like "X. Y. Z.")
  if (/\w+\.\s+\w+\.\s+\w+\./i.test(text)) memorability += 15;
  else if (/\w+\.\s+\w+\./i.test(text)) memorability += 8;

  memorability = clamp(memorability);

  // Clarity
  let clarity = 80;
  const foundVague = detectVagueWords(text);
  clarity -= foundVague.length * 15;
  const complexWords = words.filter(w => countSyllables(w) > 2).length;
  clarity -= complexWords * 8;
  clarity = clamp(clarity);

  // Uniqueness (does it use words from the user's actual inputs?)
  let uniqueness = 40;
  if (inputs) {
    const inputWords = extractKeyWords(
      `${inputs.keyBenefit} ${inputs.differentiator} ${inputs.painSolved}`
    );
    const taglineWords = words.map(w => w.toLowerCase().replace(/[^a-z]/g, '')).filter(w => w.length > 2);
    const matchCount = taglineWords.filter(tw => inputWords.some(iw => iw.includes(tw) || tw.includes(iw))).length;
    uniqueness += Math.min(matchCount * 15, 45);
  }
  uniqueness = clamp(uniqueness);

  const overall = Math.round(brevity * 0.3 + memorability * 0.25 + clarity * 0.25 + uniqueness * 0.2);

  return { brevity, memorability, clarity, uniqueness, overall };
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============================================================
// FRAMEWORK GENERATION
// ============================================================

export function generateFrameworks(inputs) {
  const { productName, whatItDoes, whoItsFor, painSolved, keyBenefit, differentiator, socialProof } = inputs;
  const proofSuffix = socialProof ? ` ${socialProof}.` : '';

  const steveBlank = `We help ${whoItsFor} ${keyBenefit} by ${whatItDoes}.`;

  const geoffreyMoore = `For ${whoItsFor} who struggle with ${painSolved}, ${productName} is a solution that ${keyBenefit}. Unlike other alternatives, we ${differentiator}.`;

  const usp = `${productName} is the only choice for ${whoItsFor} that ${differentiator} — so you can ${keyBenefit}.`;

  const elevatorPitch = `${productName} helps ${whoItsFor} ${keyBenefit}. We do this by ${whatItDoes}, which means you no longer have to deal with ${painSolved}. ${differentiator}.${proofSuffix}`;

  // Generate real taglines
  const taglines = generateTaglines(inputs);
  const bestTagline = taglines.length > 0 ? taglines[0].text : `${productName}: ${keyBenefit.split(/\s+/).slice(0, 5).join(' ')}.`;

  return [
    {
      id: 'steve-blank',
      name: 'Steve Blank Formula',
      description: '"We help [WHO] [ACHIEVE WHAT] by [HOW]" — concise, customer-centric, one sentence',
      text: steveBlank,
      frameworkKey: 'steve-blank',
    },
    {
      id: 'geoffrey-moore',
      name: 'Geoffrey Moore Positioning',
      description: '"For [WHO] who [NEED], [PRODUCT] is a [CATEGORY] that [BENEFIT]." — competitive positioning',
      text: geoffreyMoore,
      frameworkKey: 'geoffrey-moore',
    },
    {
      id: 'usp',
      name: 'USP Statement',
      description: 'One punchy sentence focused on your single biggest differentiator',
      text: usp,
      frameworkKey: 'usp',
    },
    {
      id: 'elevator',
      name: 'Elevator Pitch',
      description: '2-3 natural conversational sentences with proof',
      text: elevatorPitch,
      frameworkKey: 'elevator',
    },
    {
      id: 'tagline',
      name: 'Tagline',
      description: '3-7 word memorable phrase, benefit-focused',
      text: bestTagline,
      isTagline: true,
      frameworkKey: 'tagline',
      taglineCandidates: taglines,
    },
  ];
}

// ============================================================
// ANALYZE EXISTING VALUE PROPOSITION
// ============================================================

export function analyzeExisting(text) {
  if (!text || !text.trim()) return null;
  const wordCount = text.trim().split(/\s+/).length;

  // Run 5-dimension scoring
  const scores = scoreValueProp(text);

  // Detect framework
  const framework = detectFramework(text, wordCount);

  // Detect vague words
  const vagueWords = detectVagueWords(text);

  // Generate specific rewrites
  const rewriteSuggestions = generateRewriteSuggestions(text, scores, vagueWords);

  // Generate improved version
  const improvedVersion = generateImprovedVersion(text, vagueWords, scores);

  return {
    wordCount,
    scores,
    framework,
    vagueWords,
    rewriteSuggestions,
    improvedVersion,
  };
}

function detectFramework(text, wordCount) {
  const patterns = [
    {
      id: 'steve-blank',
      name: 'Steve Blank Formula',
      regex: /we help .+?(do|achieve|get|grow|save|build|create|launch|reduce|increase|avoid|manage|maintain|run|find|reach|eliminate)/i,
      confidence: 0,
    },
    {
      id: 'geoffrey-moore',
      name: 'Geoffrey Moore Positioning',
      regex: /for .+? who .+?, .+? is a/i,
      confidence: 0,
    },
    {
      id: 'usp',
      name: 'USP Statement',
      regex: /\b(only|single|exclusive|first)\b.+?(that|for|who|which)/i,
      confidence: 0,
    },
    {
      id: 'elevator',
      name: 'Elevator Pitch',
      regex: /.+? helps? .+?\..+?\./i,
      confidence: 0,
    },
    {
      id: 'tagline',
      name: 'Tagline',
      regex: /^.{5,50}$/,
      confidence: 0,
    },
  ];

  // Score each pattern
  for (const p of patterns) {
    if (p.regex.test(text)) p.confidence += 40;
  }

  // Length-based scoring
  if (wordCount <= 7) {
    patterns.find(p => p.id === 'tagline').confidence += 50;
  } else if (wordCount <= 15) {
    patterns.find(p => p.id === 'steve-blank').confidence += 20;
    patterns.find(p => p.id === 'usp').confidence += 15;
  } else if (wordCount <= 30) {
    patterns.find(p => p.id === 'geoffrey-moore').confidence += 15;
    patterns.find(p => p.id === 'usp').confidence += 10;
  } else {
    patterns.find(p => p.id === 'elevator').confidence += 25;
  }

  // Additional signals
  if (/we help/i.test(text)) patterns.find(p => p.id === 'steve-blank').confidence += 25;
  if (/unlike/i.test(text)) patterns.find(p => p.id === 'geoffrey-moore').confidence += 20;
  if (/\bonly\b/i.test(text)) patterns.find(p => p.id === 'usp').confidence += 20;

  const best = patterns.sort((a, b) => b.confidence - a.confidence)[0];
  return {
    id: best.id,
    name: best.name,
    confidence: Math.min(best.confidence, 100),
  };
}

function generateRewriteSuggestions(text, scores, vagueWords) {
  const suggestions = [];

  // Vague word replacements
  if (vagueWords.length > 0) {
    vagueWords.slice(0, 5).forEach(vw => {
      suggestions.push({
        type: 'vague-word',
        label: `Replace "${vw.word}"`,
        detail: `"${vw.word}" is vague. Try: ${vw.replacement}`,
        original: vw.word,
        index: vw.index,
      });
    });
  }

  // Length suggestions
  const wordCount = text.trim().split(/\s+/).length;
  if (scores.brevity < 60) {
    // Find cuttable phrases
    const fillerPhrases = ['in order to', 'that is', 'which is', 'there is', 'there are',
      'it is important to', 'the fact that', 'due to the fact', 'at this point in time',
      'in the event that', 'for the purpose of', 'with regard to', 'in terms of',
      'as a matter of fact', 'needless to say', 'it goes without saying'];
    const foundFillers = fillerPhrases.filter(f => text.toLowerCase().includes(f));
    if (foundFillers.length > 0) {
      suggestions.push({
        type: 'brevity',
        label: 'Cut filler phrases',
        detail: `Remove: "${foundFillers.join('", "')}" — they add words without meaning.`,
      });
    } else if (wordCount > 40) {
      suggestions.push({
        type: 'brevity',
        label: 'Too long for quick comprehension',
        detail: `At ${wordCount} words, split into 2-3 shorter sentences or cut to under 30 words for the core message.`,
      });
    }
  }

  // Customer focus suggestions
  if (scores.customerFocus < 60) {
    const youCount = (text.toLowerCase().match(/\byou\b|\byour\b/g) || []).length;
    const weCount = (text.toLowerCase().match(/\bwe\b|\bour\b/g) || []).length;
    if (youCount === 0) {
      suggestions.push({
        type: 'customer-focus',
        label: 'Add direct address',
        detail: 'No "you" or "your" found. Rewrite to speak directly to the reader: "You get..." or "Your team can..."',
      });
    }
    if (weCount > 2) {
      suggestions.push({
        type: 'customer-focus',
        label: `Reduce company-centric language`,
        detail: `Found "${weCount}" instances of "we/our." Flip to customer perspective — "You achieve X" instead of "We deliver X."`,
      });
    }
  }

  // Specificity suggestions
  if (scores.specificity < 60) {
    if (!/\d/.test(text)) {
      suggestions.push({
        type: 'specificity',
        label: 'Add quantified proof',
        detail: 'No numbers found. Add metrics: "Reduce churn by 30%", "10,000+ teams trust us", "Setup in 5 minutes."',
      });
    }
    if (!/\b(minutes?|hours?|days?|weeks?|months?)\b/i.test(text)) {
      suggestions.push({
        type: 'specificity',
        label: 'Add a timeframe',
        detail: 'Adding "in [X] minutes/days" makes your promise tangible and testable.',
      });
    }
  }

  return suggestions.slice(0, 6);
}

function generateImprovedVersion(text, vagueWords, scores) {
  let improved = text;

  // Replace first 3 vague words with bracketed suggestions
  const sortedVague = [...vagueWords].sort((a, b) => b.index - a.index); // reverse order to preserve indices
  for (const vw of sortedVague.slice(0, 3)) {
    const before = improved.substring(0, vw.index);
    const after = improved.substring(vw.index + vw.word.length);
    improved = before + `[${vw.replacement}]` + after;
  }

  // If no "you/your" and low customer focus, add a note
  if (scores.customerFocus < 50 && !/\byou\b|\byour\b/i.test(text)) {
    if (improved.match(/^we /i)) {
      improved = improved.replace(/^we /i, 'You get ');
    }
  }

  return improved;
}

// ============================================================
// EXPORT / UTILITY FUNCTIONS
// ============================================================

export function formatAllForExport(frameworks, inputs) {
  const lines = [];
  lines.push('VALUE PROPOSITION GENERATOR — RESULTS');
  lines.push('='.repeat(50));
  lines.push('');
  if (inputs) {
    lines.push(`Product: ${inputs.productName}`);
    lines.push(`Audience: ${inputs.whoItsFor}`);
    lines.push(`Key Benefit: ${inputs.keyBenefit}`);
    lines.push('');
  }

  for (const fw of frameworks) {
    if (fw.id === 'tagline' && fw.taglineCandidates) {
      lines.push(`--- TAGLINE CANDIDATES ---`);
      lines.push(`Format: ${fw.description}`);
      lines.push('');
      fw.taglineCandidates.forEach((t, i) => {
        const scores = t.scores;
        lines.push(`  ${i + 1}. "${t.text}"`);
        lines.push(`     Approach: ${t.approach} | Score: ${scores.overall}/100`);
      });
    } else {
      const scores = scoreValueProp(fw.text, inputs, fw.frameworkKey);
      lines.push(`--- ${fw.name.toUpperCase()} ---`);
      lines.push(`Format: ${fw.description}`);
      lines.push('');
      lines.push(fw.text);
      lines.push('');
      lines.push(`  Clarity: ${scores.clarity} | Specificity: ${scores.specificity} | Customer Focus: ${scores.customerFocus} | Brevity: ${scores.brevity} | Differentiation: ${scores.differentiation} | Overall: ${scores.overall}`);
    }
    lines.push('');
  }

  lines.push('---');
  lines.push('Generated with DreamHost Free Marketing Tools');
  lines.push('https://seo-tools-tau.vercel.app/copywriting/');

  return lines.join('\n');
}

export function formatAsMarkdown(frameworks, inputs) {
  const lines = [];
  lines.push('# Value Proposition Generator Results');
  lines.push('');
  if (inputs) {
    lines.push(`**Product:** ${inputs.productName}  `);
    lines.push(`**Audience:** ${inputs.whoItsFor}  `);
    lines.push(`**Key Benefit:** ${inputs.keyBenefit}  `);
    lines.push('');
  }

  for (const fw of frameworks) {
    if (fw.id === 'tagline' && fw.taglineCandidates) {
      lines.push(`## Tagline Candidates`);
      lines.push('');
      fw.taglineCandidates.forEach((t, i) => {
        lines.push(`${i + 1}. **"${t.text}"** — _${t.approach}_ (Score: ${t.scores.overall}/100)`);
      });
    } else {
      const scores = scoreValueProp(fw.text, inputs, fw.frameworkKey);
      lines.push(`## ${fw.name}`);
      lines.push(`_${fw.description}_`);
      lines.push('');
      lines.push(`> ${fw.text}`);
      lines.push('');
      lines.push(`| Clarity | Specificity | Customer Focus | Brevity | Differentiation | Overall |`);
      lines.push(`|---------|-------------|----------------|---------|-----------------|---------|`);
      lines.push(`| ${scores.clarity} | ${scores.specificity} | ${scores.customerFocus} | ${scores.brevity} | ${scores.differentiation} | **${scores.overall}** |`);
    }
    lines.push('');
  }

  lines.push('---');
  lines.push('*Generated with [DreamHost Free Marketing Tools](https://seo-tools-tau.vercel.app/copywriting/)*');

  return lines.join('\n');
}
