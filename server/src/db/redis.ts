import Redis from 'ioredis'
const REDIS_PORT = process.env.REDIS_PORT || '6379'
export const redis = new Redis(REDIS_PORT)
