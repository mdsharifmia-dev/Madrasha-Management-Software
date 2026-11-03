import { app } from './app.js';
import { env } from './config/env.js';

const server = app.listen(env.PORT, () => {
  console.log('================================================================');
  console.log(`🚀 জাতীয় মাদ্রাসা ম্যানেজমেন্ট প্ল্যাটফর্ম Core API Server`);
  console.log(`🌐 Server running at: ${env.API_BASE_URL}`);
  console.log(`🛡️  Environment: ${env.NODE_ENV} | Timezone: ${env.TZ}`);
  console.log(`⚡ Health Check: ${env.API_BASE_URL}/api/health`);
  console.log('================================================================');
});

// Graceful Shutdown handling
const handleGracefulShutdown = (signal: string) => {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
  server.close(() => {
    console.log('🔌 HTTP server closed.');
    process.exit(0);
  });

  // Force close after 10 seconds if not exited
  setTimeout(() => {
    console.error('⚠️ Could not close connections in time, forcefully shutting down.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));
process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));
