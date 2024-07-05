const mongoose = require("mongoose");
const config = require("./config");
const connectDB = async () => {
	try {
		await mongoose.connect(config.MONGO_URI, {});

		const db = mongoose.connection.db;

		if (!db) {
			console.error("Failed to get MongoDB database.");
			return;
		}

		console.log(
			`MongoDB connected to ${mongoose.connection.host} with url: ${config.MONGO_URI}`
		);

		// Check collections and create if they are not exist
		const collections = await db.collections();

		const existingCollections = collections.map(
			(collection) => collection.collectionName
		);
		const models = Object.keys(mongoose.models);
		const modelNames = models.map((model) => model.toLowerCase() + "s");

		for (const model of modelNames) {
			if (!existingCollections.includes(model)) {
				await db.createCollection(model);
				console.log(`Collection ${model} created.`);
			}
		}
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

module.exports = connectDB;