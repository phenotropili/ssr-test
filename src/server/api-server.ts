import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";

const cleanRegex = new RegExp("/", "g");
console.log({ cleanRegex });

const app = express();
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.get("*", (req, res) => {
	const cleanedPath = req.path.slice(1).replace(cleanRegex, "_");
	const fileName = path.resolve(__dirname, "mock-data", `${cleanedPath}.json`);

	let fileContent = "";

	if (fs.existsSync(fileName)) {
		fileContent = fs.readFileSync(fileName, { encoding: "utf-8" });
	} else {
		console.log(`File ${fileName} does'n exist`);
	}

	res.send(fileContent);
});

app.listen(3001, () => {
	console.log(`Api server is listening on port 3001`);
});
