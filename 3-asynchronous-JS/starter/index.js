const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
	return new Promise((resolve, reject) => {
		fs.readFile(file, (err, data) => {
			if (err) reject("I could not find that file 😢");
			resolve(data);
		});
	});
};

const writeFilePro = (file, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(file, data, (err) => {
			if (err) reject("I could not write that file");
			resolve("success");
		});
	});
};

const getDogPic = async () => {
	try {
		const data = await readFilePro(`${__dirname}/dog.txt`);
		console.log(`Breed: ${data}`);

		// Wrap each superagent request in a Promise
		const [res1Pro, res2Pro, res3Pro] = await Promise.all([
			superagent.get(`https://dog.ceo/api/breed/${data}/images/random`),
			superagent.get(`https://dog.ceo/api/breed/${data}/images/random`),
			superagent.get(`https://dog.ceo/api/breed/${data}/images/random`),
		]);

		const imgs = [res1Pro, res2Pro, res3Pro].map((el) => el.body.message);
		console.log(imgs);

		await writeFilePro("dog-img.txt", imgs.join("\n"));
		console.log("Random dog images saved to the file!");
	} catch (err) {
		console.log(err);
		throw err;
	}
	return "2: READY 🐶";
};

(async () => {
	try {
		console.log("1: Will get docs pics!");
		const x = await getDogPic();
		console.log(x);
		console.log("3: Done getting dog pics!");
	} catch (err) {
		console.log("ERROR 💥");
	}
})();

/* 
console.log("1: Will get docs pics!");
getDogPic()
	.then((x) => {
		console.log(x);
		console.log("3: Done getting dog pics!");
	})
	.catch((err) => {
		console.log("ERROR 💥");
	});
*/

/* 
readFilePro(`${__dirname}/dog.txt`)
	.then((data) => {
		console.log(`Breed: ${data}`);

		return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
	})
	.then((res) => {
		console.log(res.body.message);

		return writeFilePro("dog-img.txt", res.body.message);

		// fs.writeFile("dog-img.txt", res.body.message, (err) => {
		// });
	})
	.then(() => {
		console.log("Random dog image saved to the file!");
	})
	.catch((err) => {
		console.log(err);
	});
*/
