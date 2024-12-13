// Helper functions if needed. Currently minimal.
export function classifyScore(score, classifications) {
    for (const c of classifications) {
      if (score >= c.min && score <= c.max) return c.name;
    }
    return 'Undefined';
  }
  