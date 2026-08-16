// 1. Get all jobs with their companies
MATCH (j:Job)-[:OFFERED_BY]->(c:Company)
RETURN j, c
ORDER BY j.title;


// 2. Get all candidates and their skills
MATCH (c:Candidate)-[:HAS_SKILL]->(s:Skill)
RETURN c.name, collect(s.name) AS skills
ORDER BY c.name;


// 3. Multi-hop job recommendation
// Candidate → Skill → Job → Company
MATCH (candidate:Candidate {id: $candidateId})
      -[:HAS_SKILL]->(skill:Skill)
      -[:REQUIRED_BY]->(job:Job)
      -[:OFFERED_BY]->(company:Company)

RETURN
    job.title AS jobTitle,
    company.name AS company,
    collect(DISTINCT skill.name) AS matchingSkills
ORDER BY size(matchingSkills) DESC;


// 4. Find candidates who share skills with a particular candidate
MATCH (candidate:Candidate {id: $candidateId})
      -[:HAS_SKILL]->(skill:Skill)
      <-[:HAS_SKILL]-(other:Candidate)

WHERE candidate <> other

RETURN
    other.name AS candidate,
    collect(DISTINCT skill.name) AS sharedSkills
ORDER BY size(sharedSkills) DESC;