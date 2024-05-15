import { MongoMemoryServer } from 'mongodb-memory-server';

(async () => {
  const mongod = await MongoMemoryServer.create({
    instance: {
      port: 27017,
    },
  });
  const uri = mongod.getUri();
  console.log(`Mongod started...!\nConnect at: ${uri}`);
})();
