import { createClient, RedisClientType } from "redis";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
const redisClient: RedisClientType = createClient({ url: redisUrl });

redisClient.on("error", (err: Error) => {
  console.error("Redis Client Error", err);
});

const connectRedis = async (): Promise<void> => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Connected to Redis");
  }
};

export { redisClient, connectRedis };
