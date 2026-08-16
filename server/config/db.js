import neo4j from "neo4j-driver";
import "dotenv/config";

const uri = process.env.COGNODB_URI;
const username = process.env.COGNODB_USERNAME;
const password = process.env.COGNODB_PASSWORD;

console.log("URI:", uri);
console.log("USERNAME:", username);
console.log("PASSWORD EXISTS:", !!password);

const driver = neo4j.driver(
  uri,
  neo4j.auth.basic(username, password)
);

export default driver;