import bcrypt from 'bcrypt'
// 1. Generate a random refresh token (usually done with crypto or jwt)
const plainRefreshToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTNkNDQyYzRiMzcyNzk3Yjc5ZDc2MDIiLCJpYXQiOjE3NjU3MTI1MjEsImV4cCI6MTc2ODMwNDUyMX0.cpWJowMnrAhCLxRjVszRe0DDD37s3M7irP-swORIhfI";
const plainRefreshToken1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTNkNDQyYzRiMzcyNzk3Yjc5ZDc2MDIiLCJpYXQiOjE3NjU3MTIwMDksImV4cCI6MTc2ODMwNDAwOX0.GKR-o_VYbr0bSBsV5gaXkplMhktZML8fqAPEUG2YKnY";

// 2. Hash it before saving to DB (This auto-generates the salt!)
const saltRounds = 10;
const hashToStore = await bcrypt.hash(plainRefreshToken, saltRounds);

// 3. Save 'hashToStore' in your database under the user's record
// DB Record looks like: { username: "user1", refreshTokenHash: "$2b$10$EixZa..." }

console.log("Saved Hash:", hashToStore);
console.log("Sent to User:", plainRefreshToken);

const isValid = await bcrypt.compare(plainRefreshToken1, hashToStore);

if (isValid) {
  console.log("Success! Give user a new Access Token.");
} else {
  console.log("Error! Token does not match or is invalid.");
}