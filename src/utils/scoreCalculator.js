import { classifyScore } from './dataTransforms.js';

export function calculateScores(config, questions, responses) {
  const axes = Object.keys(config.axes);
  const { baseNeutral } = config.scoring;

  // Sum raw scores
  const rawSums = {};
  axes.forEach(a => { rawSums[a] = 0; });

  questions.forEach(q => {
    const userValue = responses[q.id];
    if (!userValue) return; // Shouldn't happen if user answered all
    const offset = userValue - baseNeutral; // e.g. (response - 3)
    // q.weights is assumed structure after your nested weights changes
    for (const axis of axes) {
      const weight = q.weights[axis] || 0;
      rawSums[axis] += offset * weight;
    }
  });

  // Normalize scores
  const axesResults = {};
  for (const axis of axes) {
    const { scaleFactor, baseOffset, classifications } = config.axes[axis];
    const finalScore = (rawSums[axis] * scaleFactor) + baseOffset;
    const classification = classifyScore(finalScore, classifications);
    axesResults[axis] = {
      label: config.axes[axis].label,
      finalScore,
      classification
    };
  }

  // Interpretation (for pair_axes)
  const interpretation = interpretResult(config, axesResults);

  return { axesResults, interpretation };
}

function interpretResult(config, axesResults) {
  const { interpretation } = config;
  if (!interpretation || !interpretation.mappings) return null;

  // For pair_axes: we assume we have exactly two axes order and morality
  // We'll try to find the mapping that matches the classifications
  for (const mapping of interpretation.mappings) {
    const { conditions, result, description } = mapping;
    let allMatch = true;
    for (const axisKey in conditions) {
      if (axesResults[axisKey].classification !== conditions[axisKey]) {
        allMatch = false;
        break;
      }
    }
    if (allMatch) {
      return { result, description };
    }
  }

  return { result: "Undefined", description: "No matching interpretation." };
}
