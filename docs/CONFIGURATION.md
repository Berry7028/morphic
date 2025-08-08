# Configuration Guide

## Environment Variables

### Required Environment Variables

```bash
# Database
DATABASE_URL=[YOUR_DATABASE_URL]

# Authentication
NEXT_PUBLIC_SUPABASE_URL=[YOUR_SUPABASE_URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_SUPABASE_ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[YOUR_SUPABASE_SERVICE_ROLE_KEY]

# Redis (Optional)
UPSTASH_REDIS_REST_URL=[YOUR_REDIS_URL]
UPSTASH_REDIS_REST_TOKEN=[YOUR_REDIS_TOKEN]
```

### AI Provider API Keys

#### OpenAI

```bash
OPENAI_API_KEY=[YOUR_API_KEY]
```

#### Google Generative AI

```bash
GOOGLE_GENERATIVE_AI_API_KEY=[YOUR_API_KEY]
```

#### Anthropic

```bash
ANTHROPIC_API_KEY=[YOUR_API_KEY]
```

#### Groq

```bash
GROQ_API_KEY=[YOUR_API_KEY]
```

#### Ollama

```bash
OLLAMA_BASE_URL=http://localhost:11434
```

#### Azure OpenAI

```bash
AZURE_API_KEY=[YOUR_API_KEY]
AZURE_RESOURCE_NAME=[YOUR_RESOURCE_NAME]
```

#### DeepSeek

```bash
DEEPSEEK_API_KEY=[YOUR_API_KEY]
```

#### Fireworks

```bash
FIREWORKS_API_KEY=[YOUR_API_KEY]
```

#### xAI

```bash
XAI_API_KEY=[YOUR_XAI_API_KEY]
```

#### OpenAI Compatible Model

```bash
OPENAI_COMPATIBLE_API_KEY=[YOUR_API_KEY]
OPENAI_COMPATIBLE_API_BASE_URL=[YOUR_API_BASE_URL]
```

#### LMStudio

```bash
LMSTUDIO_BASE_URL=http://localhost:1234/v1
```

## Model Configuration

Models are configured in `public/config/models.json`. Each model requires its corresponding API key to be set in the environment variables.

### Model Configuration Format

```json
{
  "models": [
    {
      "id": "model-id",
      "name": "Model Name",
      "provider": "Provider Name",
      "providerId": "provider-id",
      "enabled": true,
      "toolCallType": "native|manual",
      "toolCallModel": "tool-call-model-id" // optional, only needed if toolCallType is "manual" and you need to specify a different model for tool calls
    }
  ]
}
```

### Provider API Keys

### Google Generative AI

```bash
GOOGLE_GENERATIVE_AI_API_KEY=[YOUR_API_KEY]
```

### Anthropic

```bash
ANTHROPIC_API_KEY=[YOUR_API_KEY]
```

### Groq

```bash
GROQ_API_KEY=[YOUR_API_KEY]
```

### Ollama

```bash
OLLAMA_BASE_URL=http://localhost:11434
```

### Azure OpenAI

```bash
AZURE_API_KEY=[YOUR_API_KEY]
AZURE_RESOURCE_NAME=[YOUR_RESOURCE_NAME]
```

### DeepSeek

```bash
DEEPSEEK_API_KEY=[YOUR_API_KEY]
```

### Fireworks

```bash
FIREWORKS_API_KEY=[YOUR_API_KEY]
```

### xAI

```bash
XAI_API_KEY=[YOUR_XAI_API_KEY]
```

### OpenAI Compatible Model

```bash
OPENAI_COMPATIBLE_API_KEY=[YOUR_API_KEY]
OPENAI_COMPATIBLE_API_BASE_URL=[YOUR_API_BASE_URL]
```

### LMStudio

```bash
LMSTUDIO_BASE_URL=http://localhost:1234/v1
```

**Note:** LMStudio requires the local server to be running. Start it with `lms server start` command.

## Other Features

### Share Feature

```bash
NEXT_PUBLIC_ENABLE_SHARE=true
```

### Video Search

```bash
SERPER_API_KEY=[YOUR_API_KEY]
```

### Alternative Retrieve Tool

```bash
JINA_API_KEY=[YOUR_API_KEY]
```
