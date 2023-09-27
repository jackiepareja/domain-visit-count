// input
// const cpdomains = [
// 	"9001 discuss.websiteexample.com",
// 	"500 websiteexample.com",
// 	"300 com",
// ];

// output
// ["9801 com", "9501 websiteexample.com", "9001 discuss.websiteexample.com"];

// iterate over cpdomains
// "9001 discuss.websiteexample.com"
// split at the space ' '
// grab the first index - find the sum of all

// const countPairDomains = cpdomains.map((domain) => {
// 	const countMap = new Map();

// 	const counts = parseInt(domain.split(" ")[0]);
// 	console.log(typeof counts);
// 	const domains = domain.split(" ")[1];
// 	const d = domains.split(".").reverse();

// 	let subdomain = "";
// 	for (const part of d) {
// 		subdomain = part + (subdomain.length > 0 ? "." : "") + subdomain;
// 	}

// 	let currCount = counts || 0;

// 	countMap.set(subdomain, currCount);
// 	console.log(countMap);
// });
