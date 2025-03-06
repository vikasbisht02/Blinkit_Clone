import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`Database connected`);
	} catch (error) {
		console.error(`Error connecting to Database: ${error.message}`);
		process.exit(1);
	}
};
