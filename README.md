# YouTube Fact-Checker 🔍

An AI-powered fact-checking tool for YouTube videos that analyzes video transcripts and verifies claims using OpenAI GPT-4.

## Features

- 📹 Automatic YouTube transcript extraction
- 🤖 AI-powered claim detection using GPT-4
- ✅ Fact verification with accuracy scores
- 📊 Visual results with accuracy indicators
- 💾 Export results as CSV
- 🐳 Docker support for easy deployment
- 🔒 Secure API key management

## Architecture

- **Frontend**: React + Vite + TypeScript
- **Backend**: Node.js + Express + TypeScript
- **AI**: OpenAI GPT-4 API
- **Containerization**: Docker & Docker Compose

## Prerequisites

- Docker and Docker Compose
- OpenAI API Key
- (Optional) Google Fact Check API Key

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/nikolausm/youtube-fact-checker.git
cd youtube-fact-checker
```

2. Copy the environment file:
```bash
cp .env.example .env
```

3. Add your API keys to `.env`:
```env
OPENAI_API_KEY=your-openai-api-key
GOOGLE_API_KEY=your-google-api-key (optional)
```

4. Start with Docker Compose:
```bash
docker-compose up --build
```

5. Open http://localhost:3000 in your browser

## Development

### Backend Development
```bash
cd backend
npm install
npm run dev
```

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

- `POST /api/analyze` - Analyze a YouTube video
- `GET /api/transcript/:videoId` - Get video transcript
- `POST /api/fact-check` - Fact-check statements
- `GET /api/health` - Health check

## Project Structure

```
youtube-fact-checker/
├── backend/              # Node.js backend
│   ├── src/
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   └── utils/       # Utilities
│   └── Dockerfile
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API clients
│   │   └── types/       # TypeScript types
│   └── Dockerfile
├── docker-compose.yml   # Docker orchestration
└── README.md
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key for GPT-4 | Yes |
| `GOOGLE_API_KEY` | Google API key for Fact Check API | No |
| `PORT` | Backend server port (default: 5000) | No |
| `NODE_ENV` | Environment (development/production) | No |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Author

Michael Nikolaus - [GitHub](https://github.com/nikolausm)
