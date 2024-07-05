const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require("./config");
const client = new MongoClient(config.MONGO_URI, {
	serverApi: {
	  version: ServerApiVersion.v1,
	  strict: true,
	  deprecationErrors: true,
	}
  });
const connectDB = async () => {
	try {
		await client.connect();
	  // Send a ping to confirm a successful connection
		await client.db("bloximatask").command({ ping: 1 });
		const db = client.db("bloximatask");
		console.log(
			`MongoDB connected to host with url: ${config.MONGO_URI}`
		);
		return db;
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

module.exports = connectDB;