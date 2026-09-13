// Consumer insurance copy. Internals stay hidden: no methods, no math, no pricing.

export const PROCESS = [
  {
    n: '01',
    title: 'Apply',
    tag: 'A two-minute form',
    body: 'Tell us what your agent does and where it runs. No code access, no security review on your side, no homework.',
  },
  {
    n: '02',
    title: 'We assess',
    tag: 'Our machinery, hidden',
    body: 'Our specialists evaluate your agent end to end. You never see the machinery — just a clear verdict on the risk.',
  },
  {
    n: '03',
    title: 'Get covered',
    tag: 'Policy + certificate',
    body: 'You receive a plain-English policy with clear limits, plus a certificate to show buyers, partners, and regulators.',
  },
  {
    n: '04',
    title: 'Claims handled',
    tag: 'We take it from here',
    body: 'If your agent causes harm, file a claim in minutes. Humans handle it and keep you posted throughout.',
  },
];

export const COVERAGE = [
  {
    t: 'Financial mistakes',
    d: 'Wrong charges, duplicate orders, and billing errors your agent makes while doing its job.',
  },
  {
    t: 'Data & privacy slip-ups',
    d: 'Customer or company data your agent exposes by accident — and the cleanup that follows.',
  },
  {
    t: 'Downtime it causes',
    d: 'Outages and interruptions your agent triggers across your stack and your customers.',
  },
  {
    t: 'Harm to third parties',
    d: 'Losses your agent inflicts on customers or partners while acting on your behalf.',
  },
  {
    t: 'Regulatory fallout',
    d: 'Fines and legal costs when the rules shift under an already-deployed agent.',
  },
];

export const TERMINAL_SCRIPT = [
  { tone: 'cmd', text: 'fade cover --agent checkout-assistant' },
  { tone: 'dim', text: 'Application received .................... done' },
  { tone: 'dim', text: 'Assessment complete ..................... done' },
  { tone: 'ok', text: '✓ Approved for coverage' },
  { tone: 'hi', text: '→ Policy issued. Certificate + claims line active.' },
  { tone: 'dim', text: 'Questions? A human replies within a day.' },
];

export const WHY = [
  {
    n: '01',
    title: 'One policy, plain English',
    body: 'A single document that says what\u2019s covered, up to how much, in words your whole company understands.',
  },
  {
    n: '02',
    title: 'Claims with humans',
    body: 'File in minutes, talk to a person, get updates throughout. No chatbot standing between you and your payout.',
  },
  {
    n: '03',
    title: 'Proof for outsiders',
    body: 'A certificate that answers buyer security reviews before they\u2019re asked — and shortens enterprise sales cycles.',
  },
];

export const WHO = [
  {
    title: 'Agent builders',
    body: 'Ship with a safety net. Launch the ambitious version knowing a mistake won\u2019t sink the company.',
  },
  {
    title: 'Product & compliance',
    body: 'Launch reviews backed by an actual policy instead of crossed fingers. Show legal one page.',
  },
  {
    title: 'Partners & platforms',
    body: 'Ask every vendor touching your stack for proof of cover — the way you\u2019d ask for a SOC 2.',
  },
];

export const FAQS = [
  {
    q: 'What does AI agent insurance cover?',
    a: 'The failures unique to agents acting on their own: financial mistakes, accidental data exposure, downtime they cause, harm to third parties, and the regulatory fallout around all of it. Your exact limits are written in plain words before you sign.',
  },
  {
    q: 'How is this different from our general liability?',
    a: 'General liability was written before software could issue refunds by itself. Fade is purpose-built: assessed per agent, covering the failures only an autonomous agent can produce — with a certificate for each deployment.',
  },
  {
    q: 'Do you need access to our code or data?',
    a: 'No. We assess behavior through your agent\u2019s normal interfaces. Your internals stay yours — and how we evaluate stays ours. You get the verdict, the policy, and the proof.',
  },
  {
    q: 'How do claims work?',
    a: 'File in minutes through your claims line. A human adjuster takes it from there, keeps you updated throughout, and pays out within your policy limits. That\u2019s the whole point.',
  },
  {
    q: 'How do we start?',
    a: 'Request cover below. We\u2019ll scope a pilot on one agent in a single call — most teams go from application to covered in days.',
  },
];
