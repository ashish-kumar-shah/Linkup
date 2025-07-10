const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');
const { Server, Socket } = require('socket.io');
const { setCache, deleteCache, getCache } = require('../Utility/Cache');

let ioInstance;

async function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin:false,

      credentials: true,
    },
  });

  const pubClient = createClient();
  const subClient = pubClient.duplicate();

  await pubClient.connect();
  await subClient.connect();

  io.adapter(createAdapter(pubClient, subClient));
  io.redisClient = pubClient;
  ioInstance = io;

  io.on('connection', (socket) => {
    console.log(`🔗 Socket connected: ${socket.id}`);

    socket.on('register', async (userId) => {
      socket.userId = userId;

      const oldSockets = await io.redisClient.sMembers(`online:${userId}`);
      if (oldSockets.length) {
        for (const oldSocketId of oldSockets) {
          if (oldSocketId !== socket.id) {
            await io.redisClient.sRem(`online:${userId}`, oldSocketId);
            console.log(`🧹 Removed stale socket ${oldSocketId} for user ${userId}`);
          }
        }
      }

      await io.redisClient.sAdd(`online:${userId}`, socket.id);
      await setCache(`status:${userId}`, 'online');

      console.log(`✅ Registered user ${userId} with socket ${socket.id}`);

      // ✅ Broadcast status change to everyone
      io.emit('user-status-change', { userId, status: true });
    });

    socket.on('user-status', async ({ from, to }) => {
      const userStatus = await getCache(`status:${to}`);
      emitToUser(from, 'user-status-change', { userId: to, status: userStatus !== null });
    });

    

    socket.on('typing', ({ to, from }) => {
      emitToUser(to, 'typing', { from });
    });

    socket.on('stop-typing', ({ to, from }) => {
      emitToUser(to, 'stop-typing', { from });
    });

    socket.on('disconnect', async () => {
      const userId = socket.userId;
      if (!userId) return;

      console.log(`❌ Socket disconnected: ${socket.id} for user ${userId}`);

      await io.redisClient.sRem(`online:${userId}`, socket.id);

      const left = await io.redisClient.sCard(`online:${userId}`);
      console.log(`ℹ️ Remaining sockets for user ${userId}: ${left}`);

      if (left === 0) {
        await deleteCache(`status:${userId}`);
        await io.redisClient.del(`online:${userId}`);
        console.log(`ℹ️ User ${userId} now offline`);

        // ✅ Broadcast status change to everyone
        io.emit('user-status-change', { userId, status: false });
      }
    });
  });

  console.log('✅ Socket.IO initialized with Redis adapter');
}

function emitToUser(userId, event, payload) {
  if (!ioInstance) throw new Error('Socket.IO not initialized');

  const redisClient = ioInstance.redisClient;

  redisClient
    .sMembers(`online:${userId}`)
    .then((sockets) => {
      if (sockets && sockets.length > 0) {
        sockets.forEach((socketId) => {
          ioInstance.to(socketId).emit(event, payload);
        });
        console.log(`✅ Emitted "${event}" to ${userId} → ${sockets}`);
      } else {
        console.log(`ℹ️ User ${userId} not online, skipping emit`);
      }
    })
    .catch(console.error);
}

module.exports = { initSocket, emitToUser };
