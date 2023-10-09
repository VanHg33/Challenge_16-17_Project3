// Get APIs data from JSearch for Data Analyst from every major cities from Australia
// Adelaide 
const url = 'https://jsearch.p.rapidapi.com/search?query=Data%20Analyst%20in%20Adelaide%2C%20Australia&page=1&num_pages=20';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3e9864d4cemshf9df764fec6e89fp10b0d8jsn7baee81f2b99',
		'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

// Brisbane
const url = 'https://jsearch.p.rapidapi.com/search?query=Data%20Analyst%20in%20Brisbane%2C%20Australia&page=1&num_pages=20';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3e9864d4cemshf9df764fec6e89fp10b0d8jsn7baee81f2b99',
		'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

// Canberra
const url = 'https://jsearch.p.rapidapi.com/search?query=Data%20Analyst%20in%20Canberra%2C%20Australia&page=1&num_pages=20';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3e9864d4cemshf9df764fec6e89fp10b0d8jsn7baee81f2b99',
		'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
// Darwin

// Hobart

// Melbourne

// Perth

// Sydney