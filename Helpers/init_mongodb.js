const mongoose = require("mongoose");
const fs = require("fs");

// Absolute path to your X.509 certificate file
const certificatePath = process.env.X509_CERT_PATH

// Connect to MongoDB using mongoose.connect
mongoose
  .connect(process.env.MONGO_URI,
    {
      ssl: true,
      tlsCertificateKeyFile: certificatePath,
      dbName: process.env.DB_NAME,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    if (error.code === "ENOENT") {
      console.error("Error: Certificate file not found at", certificatePath);
    } else {
      console.error("Error connecting to MongoDB:", error);
    }
  });

mongoose.connection.on("error", (error) => {
  console.error("Mongoose connection error:", error);
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected to db");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
