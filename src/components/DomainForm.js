import { useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import getSubdomainVisitCount from "../lib/getSubdomainVisitCount";

// const cpdomains = [
// 	"9001 discuss.websiteexample.com",
// 	"500 websiteexample.com",
// 	"300 com",
// ];

const DomainForm = ({ onResultsData }) => {
	const [formData, setFormData] = useState({
		domainCount: "",
		domainName: "",
	});
	const [submitted, setSubmitted] = useState(false);
	const [resultsData, setResultsData] = useState([]);

	const handleSubmit = (evt) => {
		evt.preventDefault();

		// Split the domainCount into an array of counts
		const countArray = formData.domainCount
			.split(",")
			.map((count) => count.trim());

		// Split the domainName into an array of subdomains
		const subdomains = formData.domainName.split(".");
		const formattedData = [];

		// Iterate over countArray and combine with subdomains
		for (const [i, count] of countArray.entries()) {
			const combinedDomain = `${count} ${subdomains.slice(i).join(".")}`;
			formattedData.push(combinedDomain);
		}

		const results = getSubdomainVisitCount(formattedData);
		setResultsData(results);
		setSubmitted(true);
	};

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	console.log("resultsData", resultsData);

	return (
		<Stack sx={{ marginBottom: "40px" }}>
			<Box component="form" onSubmit={handleSubmit}>
				<Stack direction="column" spacing={2}>
					<TextField
						label="Please enter the domain count, separated in commas ex: 3512, 340, 123"
						name="domainCount"
						variant="outlined"
						value={formData.domainCount}
						onChange={handleChange}
						type="string"
					/>
					<TextField
						label="Please enter the domain url string ex: hello.world.com"
						name="domainName"
						variant="outlined"
						value={formData.domainName}
						onChange={handleChange}
						type="string"
					/>
					<Button type="submit" variant="contained">
						Submit
					</Button>
				</Stack>
			</Box>
			<Box>{submitted && <p>Hello</p>}</Box>
		</Stack>
	);
};

export default DomainForm;
