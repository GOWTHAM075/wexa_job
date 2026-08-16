import driver from "../config/db.js";

const session = driver.session();

try {
  await session.run(`
    MATCH (n)
    DETACH DELETE n
  `);

  await session.run(`
    CREATE
    (gowtham:Candidate {
      id: "C001",
      name: "Gowtham K"
    }),

    (arun:Candidate {
      id: "C002",
      name: "Arun Kumar"
    }),

    (react:Skill {name: "React"}),
    (javascript:Skill {name: "JavaScript"}),
    (node:Skill {name: "Node.js"}),
    (java:Skill {name: "Java"}),
    (python:Skill {name: "Python"}),
    (mongodb:Skill {name: "MongoDB"}),
    (sql:Skill {name: "SQL"}),

    (frontend:Job {
      id: "J001",
      title: "Frontend Developer",
      location: "Bangalore",
      level: "Entry Level"
    }),

    (backend:Job {
      id: "J002",
      title: "Backend Developer",
      location: "Chennai",
      level: "Entry Level"
    }),

    (fullstack:Job {
      id: "J003",
      title: "Full Stack Developer",
      location: "Bangalore",
      level: "Entry Level"
    }),

    (javaDev:Job {
      id: "J004",
      title: "Java Developer",
      location: "Hyderabad",
      level: "Entry Level"
    }),

    (techNova:Company {
      id: "CO001",
      name: "TechNova"
    }),

    (wexa:Company {
      id: "CO002",
      name: "Wexa Solutions"
    }),

    (cloudWorks:Company {
      id: "CO003",
      name: "CloudWorks"
    }),

    (abc:Company {
      id: "CO004",
      name: "ABC Technologies"
    })

    CREATE
    (gowtham)-[:HAS_SKILL]->(react),
    (gowtham)-[:HAS_SKILL]->(javascript),
    (gowtham)-[:HAS_SKILL]->(node),
    (gowtham)-[:HAS_SKILL]->(mongodb),

    (arun)-[:HAS_SKILL]->(java),
    (arun)-[:HAS_SKILL]->(sql),

    (react)-[:REQUIRED_BY]->(frontend),
    (javascript)-[:REQUIRED_BY]->(frontend),

    (javascript)-[:REQUIRED_BY]->(backend),
    (node)-[:REQUIRED_BY]->(backend),

    (react)-[:REQUIRED_BY]->(fullstack),
    (javascript)-[:REQUIRED_BY]->(fullstack),
    (node)-[:REQUIRED_BY]->(fullstack),
    (mongodb)-[:REQUIRED_BY]->(fullstack),

    (java)-[:REQUIRED_BY]->(javaDev),
    (sql)-[:REQUIRED_BY]->(javaDev),

    (frontend)-[:OFFERED_BY]->(techNova),
    (backend)-[:OFFERED_BY]->(wexa),
    (fullstack)-[:OFFERED_BY]->(cloudWorks),
    (javaDev)-[:OFFERED_BY]->(abc)
  `);

  console.log("Seed data inserted successfully");
} catch (error) {
  console.error("Seed failed:", error);
} finally {
  await session.close();
  await driver.close();
}