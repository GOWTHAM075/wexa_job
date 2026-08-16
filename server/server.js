import express from "express";
import cors from "cors";
import "dotenv/config";
import driver from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Wexa Job Graph API is running"
  });
});

// Get all jobs
app.get("/api/jobs", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (j:Job)-[:OFFERED_BY]->(c:Company)
      RETURN j, c
      ORDER BY j.title
    `);

    const jobs = result.records.map(record => ({
      ...record.get("j").properties,
      company: record.get("c").properties.name
    }));

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Database unavailable"
    });
  } finally {
    await session.close();
  }
});

// Get candidates
app.get("/api/candidates", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (c:Candidate)
      RETURN c
      ORDER BY c.name
    `);

    const candidates = result.records.map(record =>
      record.get("c").properties
    );

    res.json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Database unavailable"
    });
  } finally {
    await session.close();
  }
});

// Job recommendations
app.get("/api/candidates/:id/recommendations", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (candidate:Candidate {id: $candidateId})
            -[:HAS_SKILL]->(skill:Skill)
            -[:REQUIRED_BY]->(job:Job)
            -[:OFFERED_BY]->(company:Company)

      RETURN job,
             company,
             collect(DISTINCT skill.name) AS matchingSkills
      ORDER BY size(matchingSkills) DESC
      `,
      {
        candidateId: req.params.id
      }
    );

    const jobs = result.records.map(record => ({
      ...record.get("job").properties,
      company: record.get("company").properties.name,
      matchingSkills: record.get("matchingSkills")
    }));

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Could not get recommendations"
    });
  } finally {
    await session.close();
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});