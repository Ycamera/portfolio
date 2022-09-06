function randomAlphabet() {
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function randomAlphabet2() {
	const alphabet = "abcdefghijklmnopqrstuvwxygABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	return alphabet[Math.floor(Math.random() * alphabet.length)];
}

export function textEffect(key, callback) {
	let count = 0;
	const numberOfWordChange = 5;
	let word = "";

	function loop() {
		setTimeout(() => {
			callback(key, word + randomAlphabet());

			count++;
			if (count % numberOfWordChange === 0) word += key[count / numberOfWordChange - 1];
			if (count / numberOfWordChange === key.length) {
				callback(key, key);
				return;
			}

			loop();
		}, 30);
	}
	loop();
}

export function setTextEffect(key, callback) {
	let count = 0;
	const numberOfWordChange = 5;
	let word = "";

	function loop() {
		setTimeout(() => {
			callback(word + randomAlphabet2());

			count++;
			if (count % numberOfWordChange === 0) word += key[count / numberOfWordChange - 1];
			if (count / numberOfWordChange === key.length) {
				callback(key);
				return;
			}

			loop();
		}, 20);
	}
	loop();
}
