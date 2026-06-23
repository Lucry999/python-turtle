# AI Study - SaaS Platform for Smart Learning

Eine moderne KI-gestützte Lernplattform für Schüler und Studenten. Erstelle in Sekunden Zusammenfassungen, Karteikarten, Quiz und Lernpläne aus deinen Dokumenten.

## 🎯 Features

- 📄 **PDF-Upload** mit Drag & Drop
- 🤖 **KI-Generierung** von Zusammenfassungen, Karteikarten & Quiz
- 📊 **Lernplan-Generator** basierend auf Prüfungsdatum
- 💳 **Premium-System** mit Stripe Integration
- 🌙 **Dark & Light Mode**
- 📱 **Vollständig Responsive**
- ⚡ **Hochperformant** mit Next.js & Server Components
- 🔒 **Sichere Authentifizierung** mit Supabase

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Next.js API Routes, Supabase
- **Datenbank:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Authentifizierung:** Supabase Auth
- **Datenspeicher:** Supabase Storage
- **KI:** OpenAI API
- **Zahlung:** Stripe
- **Deployment:** Vercel

## 📋 Systemanforderungen

- Node.js 18+
- npm oder yarn
- PostgreSQL Datenbank (Supabase)
- OpenAI API Key
- Stripe Account (optional, für Premium)

## 🚀 Installation

### 1. Repository klonen
```bash
git clone <repository-url>
cd ai-study
```

### 2. Dependencies installieren
```bash
npm install
```

### 3. Environment Variables konfigurieren
```bash
cp .env.example .env.local
```

Fülle folgende Variablen aus:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI
OPENAI_API_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Datenbank migrieren
```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Entwicklungsserver starten
```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000)

## 📚 Datenbank Setup

### Supabase vorbereiten

1. Gehe zu [supabase.com](https://supabase.com)
2. Erstelle ein neues Projekt
3. Kopiere die URL und Anon Key
4. Gehe zu SQL Editor
5. Führe folgende Migration aus:

```sql
-- Users Table (wird durch Supabase Auth erstellt)

-- Documents Table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  pages INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Summaries Table
CREATE TABLE summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Flashcards Table
CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  difficulty TEXT DEFAULT 'medium',
  last_reviewed TIMESTAMP,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quiz Table
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  question_type TEXT NOT NULL, -- 'multiple_choice' or 'open'
  options JSONB, -- Für Multiple Choice
  correct_answer TEXT NOT NULL,
  difficulty TEXT DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quiz Attempts
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  score INTEGER,
  max_score INTEGER,
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Learning Plans
CREATE TABLE learning_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  exam_date DATE NOT NULL,
  hours_per_day FLOAT NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT DEFAULT 'free', -- 'free' or 'premium'
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT DEFAULT 'active',
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Usage Tracking
CREATE TABLE usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  uploads_count INTEGER DEFAULT 0,
  quiz_questions_count INTEGER DEFAULT 0,
  flashcards_count INTEGER DEFAULT 0
);

-- Enable RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own documents"
  ON documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents"
  ON documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents"
  ON documents FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents"
  ON documents FOR DELETE
  USING (auth.uid() = user_id);

-- Ähnliche Policies für andere Tabellen...
```

## 🔑 OpenAI API Setup

1. Gehe zu [platform.openai.com](https://platform.openai.com)
2. Erstelle einen API Key
3. Speichern unter `OPENAI_API_KEY`

## 💳 Stripe Setup

1. Gehe zu [stripe.com](https://stripe.com)
2. Erstelle Products für Premium Plan
3. Speichern die Keys in `.env.local`

## 📁 Projektstruktur

```
ai-study/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── documents/
│   │   ├── quiz/
│   │   ├── flashcards/
│   │   ├── learning-plan/
│   │   ├── settings/
│   │   └── layout.tsx
│   ├── (landing)/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/
│   │   ├── documents/
│   │   ├── ai/
│   │   ├── stripe/
│   │   └── webhooks/
│   └── layout.tsx
├── components/
│   ├── auth/
│   ├── dashboard/
│   ├── common/
│   ├── ui/ (shadcn)
│   └── providers/
├── lib/
│   ├── supabase/
│   ├── openai/
│   ├── stripe/
│   └── utils.ts
├── hooks/
├── types/
├── styles/
├── public/
├── prisma/
│   └── schema.prisma
├── .env.example
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── eslintrc.json
└── package.json
```

## 🚀 Deployment

### Vercel

1. Push zu GitHub
2. Verbinde Repo mit Vercel
3. Konfiguriere Environment Variables
4. Deploy

```bash
npm run build
```

## 📖 API Dokumentation

### POST /api/documents/upload
PDFs hochladen

### POST /api/ai/summarize
Zusammenfassung generieren

### POST /api/ai/generate-quiz
Quiz generieren

### POST /api/ai/generate-flashcards
Flashcards generieren

## 🔒 Sicherheit

- ✅ Row Level Security (RLS) in Supabase
- ✅ CSRF Protection
- ✅ XSS Prevention
- ✅ Input Validation
- ✅ Rate Limiting
- ✅ Secure Headers

## 📊 Monitoring & Analytics

- Error Logging
- Performance Metrics
- User Analytics (mit Consent)

## 🤝 Contributing

Contributions sind willkommen! Bitte erstelle einen PR.

## 📄 Lizenz

MIT

## 📞 Support

Für Fragen: support@aistudy.com

---

**Made with ❤️ by AI Study Team**