The application uses a graph database because job recommendations naturally depend on relationships between candidates, skills, jobs, and companies. A single recommendation can traverse multiple relationships from a candidate's skills to suitable jobs and the companies offering them.

-------------------------------------------------------
┌─────────────┐
│  Candidate  │
└──────┬──────┘
       │ HAS_SKILL
       ▼
┌─────────────┐
│    Skill    │
└──────┬──────┘
       │ REQUIRED_BY
       ▼
┌─────────────┐
│     Job     │
└──────┬──────┘
       │ OFFERED_BY
       ▼
┌─────────────┐
│   Company   │
└─────────────┘
--------------------------------