// Clarity scoring algorithm
// Base 100 points
// -3 per word over 20 (for tagline: -5 per word over 7)
// +5 if numbers/percentages present
// +3 for proper nouns (capitalized words not at sentence start)
// -10 if contains vague words: "innovative", "leading", "solutions", "synergy", "best-in-class", "cutting-edge", "world-class", "seamless", "robust", "scalable"
// Final: clamp 0–100

export function clarityScore(text, isTagline = false) {
  if (!text || !text.trim()) return 0;
  const words = text.trim().split(/\s+/);
  let score = 100;
  const limit = isTagline ? 7 : 20;
  const penalty = isTagline ? 5 : 3;
  if (words.length > limit) score -= (words.length - limit) * penalty;
  if (/\d+%?|\$\d+/.test(text)) score += 5;
  const sentences = text.split(/[.!?]/);
  let properNounCount = 0;
  words.forEach((word, i) => {
    if (i === 0) return;
    const prevChar = text[text.indexOf(word) - 1];
    if (/[A-Z]/.test(word[0]) && !/^[.!?]\s*$/.test(prevChar || '')) {
      properNounCount++;
    }
  });
  score += Math.min(properNounCount * 3, 9);
  const vague = ['innovative', 'leading', 'solutions', 'synergy', 'best-in-class', 'cutting-edge', 'world-class', 'seamless', 'robust', 'scalable'];
  vague.forEach(word => { if (text.toLowerCase().includes(word)) score -= 10; });
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function generateFrameworks(inputs) {
  const { productName, whatItDoes, whoItsFor, painSolved, keyBenefit, differentiator, socialProof } = inputs;
  const proofSuffix = socialProof ? ` ${socialProof}.` : '';

  const steveBlank = `We help ${whoItsFor} ${keyBenefit} by ${whatItDoes}.`;

  const geoffreyMoore = `For ${whoItsFor} who struggle with ${painSolved}, ${productName} is a solution that ${keyBenefit}. Unlike other alternatives, we ${differentiator}.`;

  const usp = `${productName} is the only choice for ${whoItsFor} that ${differentiator} — so you can ${keyBenefit}.`;

  const elevatorPitch = `${productName} helps ${whoItsFor} ${keyBenefit}. We do this by ${whatItDoes}, which means you no longer have to deal with ${painSolved}. ${differentiator}.${proofSuffix}`;

  const tagline = buildTagline(keyBenefit, differentiator, productName);

  return [
    { id: 'steve-blank', name: 'Steve Blank Formula', description: '"We help [WHO] [ACHIEVE WHAT] by [HOW]"', text: steveBlank },
    { id: 'geoffrey-moore', name: 'Geoffrey Moore Positioning', description: '"For [WHO] who [NEED], [PRODUCT] is a [CATEGORY] that [BENEFIT]."', text: geoffreyMoore },
    { id: 'usp', name: 'USP Statement', description: 'One punchy sentence focused on your single biggest differentiator', text: usp },
    { id: 'elevator', name: 'Elevator Pitch', description: '2–3 natural conversational sentences', text: elevatorPitch },
    { id: 'tagline', name: 'Tagline', description: '3–7 word memorable phrase, benefit-focused', text: tagline, isTagline: true },
  ];
}

function buildTagline(keyBenefit, differentiator, productName) {
  // Extract a short punchy tagline from key benefit
  const words = keyBenefit.split(/\s+/).slice(0, 6);
  return words.join(' ');
}

export function analyzeExisting(text) {
  if (!text || !text.trim()) return null;
  const wordCount = text.trim().split(/\s+/).length;
  const score = clarityScore(text);

  // Identify framework
  let framework = 'Custom';
  if (/we help .+ (do|achieve|get|grow|save|build|create)/i.test(text)) {
    framework = 'Steve Blank Formula';
  } else if (/for .+ who .+, .+ is a/i.test(text)) {
    framework = 'Geoffrey Moore Positioning';
  } else if (/only .+ (that|for|who)/i.test(text)) {
    framework = 'USP Statement';
  } else if (wordCount <= 7) {
    framework = 'Tagline';
  } else if (wordCount <= 20) {
    framework = 'USP Statement or Tagline';
  }

  // Generate tips
  const tips = [];
  if (wordCount > 25) tips.push(`Shorten it: at ${wordCount} words, it's too long to read at a glance. Aim for under 20 words.`);
  const vague = ['innovative', 'leading', 'solutions', 'synergy', 'best-in-class', 'cutting-edge', 'seamless'];
  const foundVague = vague.filter(w => text.toLowerCase().includes(w));
  if (foundVague.length > 0) tips.push(`Remove vague words like "${foundVague.join('", "')}" — replace with specific, concrete language.`);
  if (!/\d+/.test(text)) tips.push('Add a specific number or statistic — it immediately increases credibility and memorability.');
  if (!text.toLowerCase().includes('you') && !text.toLowerCase().includes('your')) tips.push('Make it customer-centric: use "you" or "your" to speak directly to the reader.');
  if (tips.length < 3) tips.push('Start with the customer\'s pain or goal, not your product\'s features.');

  // Generate rewrite
  const rewrite = generateRewrite(text, framework);

  return { wordCount, score, framework, tips: tips.slice(0, 3), rewrite };
}

function generateRewrite(text, framework) {
  const wordCount = text.trim().split(/\s+/).length;
  if (wordCount <= 7) {
    return `Consider expanding this into: "We help [your target customer] [achieve specific goal] by [your unique method]."`;
  }
  return `Rewritten suggestion: "[${framework} format] For [specific customer type] who struggle with [concrete pain point], [your product] helps you [achieve specific outcome] — without [the thing they hate]. [Optional: Used by X customers / Trusted since Y]."`;
}
