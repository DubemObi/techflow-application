# TechFlow Solutions — Inventory Management API

**Amdari Internship Programme | DevOps Track**

> **Note:** Do not modify the source code. Fork this repo and build your CI/CD pipeline around it.

## Stack

| Layer | Tool |
|---|---|
| Application | Node.js / Express |
| Tests | Jest + Supertest |
| Containerisation | Docker |
| Registry | DockerHub |
| CI/CD | GitHub Actions (`pipeline.yml`) |
| Cloud | AWS EC2 (t2.micro) |
| Notifications | Slack webhook |

## Running Locally

```bash
npm install
npm start
# → http://localhost:3000
```

## Running Tests

```bash
npm test
```

All tests must pass before the pipeline proceeds to build and deploy.

## API Routes

| Method | Route | Description |
|---|---|---|
| GET | `/` | Status check |
| GET | `/health` | Health check (used by pipeline) |
| GET | `/api/inventory` | List all inventory items |
| GET | `/api/inventory/:id` | Get a single item |
| POST | `/api/inventory` | Add a new item |

## Docker

```bash
# Build
docker build -t techflow-api .

# Run
docker run -p 3000:3000 techflow-api

# Test
curl http://localhost:3000/health
```

## GitHub Secrets Required

| Secret | Value |
|---|---|
| `DOCKERHUB_USERNAME` | Your DockerHub username |
| `DOCKERHUB_TOKEN` | DockerHub access token |
| `EC2_HOST` | EC2 public IP or DNS |
| `EC2_USER` | SSH username (`ubuntu` or `ec2-user`) |
| `EC2_SSH_KEY` | Private key (.pem file contents) |
| `SLACK_WEBHOOK_URL` | Slack incoming webhook URL |

## Pipeline Flow

```
Push to main
    │
    ▼
Job 1: Jest tests
    │  fail → stop, notify
    ▼  pass ↓
Job 2: docker build → DockerHub push
    │  (tags: <sha>, latest, previous_stable)
    ▼
Job 3: SSH → EC2
    ├── docker pull latest
    ├── docker run
    ├── health check (5 retries)
    │       fail → rollback to previous_stable
    │       pass → deployment complete
    └── Slack notification (success or failure)
```

## Week-by-Week Tasks

**Week 1:** Fork repo → run locally → add 2 Jest tests → write Dockerfile → push to DockerHub

**Week 2:** GitHub Actions pipeline.yml → EC2 provisioning → health check + rollback → Slack notifications → end-to-end demo
