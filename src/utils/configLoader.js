export async function loadTestConfig(testId) {
    const url = `/data/tests/${testId}/test_config.json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load config: ${res.statusText}`);
    return res.json();
  }
  
  export async function loadCategories(testId) {
    const url = `/data/tests/${testId}/categories.json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load categories: ${res.statusText}`);
    return res.json();
  }
  
  export async function loadQuestionsFile(testId, fileName) {
    const url = `/data/tests/${testId}/${fileName}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load questions: ${fileName}`);
    return res.json();
  }
  