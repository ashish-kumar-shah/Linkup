const client = require("../Config/Redis");

async function getCache(key) {
  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error(`❌ Redis GET error for key ${key}:`, err);
    return null; // fail gracefully
  }
}

async function setCache(key, value, expiry = 300) {
  try {
    await client.set(key, JSON.stringify(value), { EX: expiry });
  } catch (err) {
    console.error(`❌ Redis SET error for key ${key}:`, err);
  }
}

async function deleteCache(key) {
  try {
    await client.del(key);
  } catch (err) {
    console.error(`❌ Redis DEL error for key ${key}:`, err);
  }
}

// Production-safe auto fallback
async function getOrSetCache(key, fetchFunction, expiry = 300) {
  const cached = await getCache(key);
  if (cached) return cached;

  const fresh = await fetchFunction();
  await setCache(key, fresh, expiry);
  return fresh;
}

module.exports = {
  getCache,
  setCache,
  deleteCache,
  getOrSetCache
};
