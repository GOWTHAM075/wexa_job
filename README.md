# Wexa Job Graph

A graph-powered job recommendation application built for the **Wexa AI Take-Home Assignment**.

The application uses **CognoDB** as the graph database and the official **Neo4j JavaScript Driver** to model relationships between candidates, skills, jobs, and companies.

---

## 🚀 Overview

Wexa Job Graph is a web application that allows users to explore job opportunities and discover jobs based on candidate skills.

The application models the following relationships:

Candidate → HAS_SKILL → Skill → REQUIRED_BY → Job → OFFERED_BY → Company

The graph-based approach makes it possible to perform multi-hop relationship queries and provide skill-based job recommendations.

### Main Features

- Explore available jobs
- View candidates
- View companies associated with jobs
- Get job recommendations for candidates
- Display matching skills
- Perform multi-hop graph traversal
- Use parameterised Cypher queries
- Handle database connection failures gracefully
- Clean and responsive user interface

---

# 🧠 Why a Graph Database?

A graph database is particularly suitable for this application because the important information is based on relationships.

For example:

```text
Candidate
    |
    | HAS_SKILL
    ↓
  Skill
    |
    | REQUIRED_BY
    ↓
   Job
    |
    | OFFERED_BY
    ↓
 Company

 Finding jobs that match a candidate's skills requires traversing multiple relationships.

In a traditional relational database, this could require several tables and JOIN operations such as:
Candidates
    ↓
CandidateSkills
    ↓
Skills
    ↓
JobSkills
    ↓
Jobs
    ↓
Companies

🏗️ Architecture
                  ┌──────────────────────┐
                  │    React Frontend    │
                  │        Vite          │
                  └──────────┬───────────┘
                             │
                           Axios
                             │
                             ▼
                  ┌──────────────────────┐
                  │    Express Backend   │
                  │       Node.js        │
                  └──────────┬───────────┘
                             │
                       Neo4j Driver
                             │
                             ▼
                  ┌──────────────────────┐
                  │       CognoDB        │
                  │    Graph Database    │
                  └──────────────────────┘
🛠️ Technology Stack
-----Frontend
React
Vite
JavaScript
Axios
CSS
-----Backend
Node.js
Express.js
CORS
dotenv
Neo4j JavaScript Driver
-----Database
CognoDB
openCypher
Bolt protocol
----Development
Git
GitHub
Visual Studio Code


📁 Project Structure
wexa-job-graph/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── queries/
│   │   ├── graphQueries.js
│   │   └── queries.cypher
│   │
│   ├── routes/
│   │   ├── candidates.js
│   │   └── jobs.js
│   │
│   ├── seed/
│   │   └── seed.js
│   │
│   ├── server.js
│   ├── test-db.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md