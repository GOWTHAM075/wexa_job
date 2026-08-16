import driver from "./config/db.js";

async function testConnection() {
  const session = driver.session();

  try {
    console.log("Testing CognoDB connection...");

    const result = await session.run(
      "RETURN 1 AS result"
    );

    console.log("✅ DATABASE CONNECTED!");
    console.log(result.records[0].get("result"));

  } catch (error) {
    console.error("❌ DATABASE CONNECTION FAILED");
    console.error(error);
  } finally {
    await session.close();
    await driver.close();
  }
}

testConnection();