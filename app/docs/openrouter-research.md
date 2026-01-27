# OpenRouter Integration Research

## Summary

OpenRouter provides a unified API to access 100+ AI models through a single endpoint. This allows switching between models (GPT-4, Claude, Gemini, Llama, etc.) without changing code.

## Key Benefits

1. **Vendor Agnostic** – Switch models by changing a string
2. **Cost Optimization** – OpenRouter can auto-select cheapest model
3. **Fallback Handling** – Automatic failover if a model is unavailable
4. **Single API Key** – One key for all models

## API Details

### Endpoint
```
https://openrouter.ai/api/v1/chat/completions
```

### Authentication
```
Authorization: Bearer <OPENROUTER_API_KEY>
```

### Using OpenAI SDK (Recommended)
The simplest approach uses the standard OpenAI SDK with a custom baseURL:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: '<OPENROUTER_API_KEY>',
  defaultHeaders: {
    'HTTP-Referer': '<YOUR_SITE_URL>',  // Optional
    'X-Title': '<YOUR_SITE_NAME>',       // Optional
  },
});

const completion = await openai.chat.completions.create({
  model: 'google/gemini-2.0-flash-exp:free',  // Any OpenRouter model ID
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Hello!' },
  ],
});
```

### Streaming Support
```typescript
const stream = await openai.chat.completions.create({
  model: 'google/gemini-2.0-flash-exp:free',
  messages: [...],
  stream: true,
});

for await (const chunk of stream) {
  const content = chunk.choices?.[0]?.delta?.content;
  if (content) {
    process.stdout.write(content);
  }
}
```

## Popular Models (January 2026)

| Model ID | Provider | Cost |
|----------|----------|------|
| `google/gemini-2.0-flash-exp:free` | Google | Free |
| `google/gemini-2.5-pro` | Google | Paid |
| `anthropic/claude-3.7-sonnet` | Anthropic | Paid |
| `openai/gpt-4.1-mini` | OpenAI | Paid |
| `meta-llama/llama-3.3-70b-instruct` | Meta | Paid |
| `deepseek/deepseek-chat` | DeepSeek | Cheap |

Full list: https://openrouter.ai/models

## Getting an API Key

1. Go to https://openrouter.ai/keys
2. Create account / sign in
3. Generate API key
4. Add credits (or use free tier models)

## Implementation Notes

### Environment Variable
```
VITE_OPENROUTER_API_KEY=sk-or-v1-xxxx
```

### Model Configuration
Store model ID in environment or config for easy switching:
```
VITE_LLM_MODEL=google/gemini-2.0-flash-exp:free
```

### Error Handling
OpenRouter returns standard OpenAI-compatible errors. Handle:
- `401` – Invalid API key
- `402` – Insufficient credits
- `429` – Rate limited
- `503` – Model temporarily unavailable (fallback kicks in)
