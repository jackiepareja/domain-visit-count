// input
// const cpdomains = [
// 	"9001 discuss.websiteexample.com",
// 	"500 websiteexample.com",
// 	"300 com",
// ];

// output
// ["9801 com", "9501 websiteexample.com", "9001 discuss.websiteexample.com"];

const getSubdomainVisitCount = (cpdomains) => {
	// Initialize an empty map
	const countMap = new Map();

	// Loop over the cpdomains array, and for each item in the array
	for (const domain of cpdomains) {
		// Since we're using the split operation at the " ", we can destructure the count and domain
		const [countString, domainName] = domain.split(" ");
		// Convert countString into a number to use the add operation later
		const count = parseInt(countString);

		// Split the domainName at the . and reverse to start at the last/root domain
		const subdomains = domainName.split(".").reverse();
		// Initialize empty string for currentSubdomain
		let currentSubdomain = "";

		// Loop over
		for (const part of subdomains) {
			/*
			For each part >> com websiteexample discuss
			Concat the reversed array of subdomains >> com > websiteexample.com > discuss.websiteexample.com
		*/
			currentSubdomain =
				part + (currentSubdomain ? "." : "") + currentSubdomain;

			// Initialize the count for the current subdomain if it doesn't exist
			if (!countMap.has(currentSubdomain)) {
				countMap.set(currentSubdomain, 0);
			}

			countMap.set(
				currentSubdomain,
				// Retrieve the currentSubdomain and to ensure to always be an int with the ||
				(countMap.get(currentSubdomain) || 0) + count
			);
		}
	}

	const resultArray = [...countMap.entries()].map(
		([domain, count]) => `${count} ${domain}`
	);
	return resultArray;
};

export default getSubdomainVisitCount;
