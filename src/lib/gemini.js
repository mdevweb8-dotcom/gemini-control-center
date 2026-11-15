export async function askGemini(prompt) {
  const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.5-pro', 'gemini-1.5-flash', 'gemini-3.8-flash'];
  const apiKey = localStorage.getItem('googleAiApiKey') || '';
  for (let i = 0; i < models.length; i += 1) {
    const model = models[i];
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
        }),
      });
      const data = await response.json();
      if (data.candidates && data.candidates[0]) {
        return data.candidates[0].content.parts[0].text;
      }
      throw new Error('No response');
    } catch (error) {
      if (i === models.length - 1) {
        throw error;
      }
      return 'الموديل توقف، جاري التحويل';
    }
  }
  return '';
}