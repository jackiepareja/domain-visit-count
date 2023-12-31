import { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import getSubdomainVisitCount from "./lib/getSubdomainVisitCount";

// const cpdomains = [
// 	"9001 discuss.websiteexample.com",
// 	"500 websiteexample.com",
// 	"300 com",
// ];

const App = () => {
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

	const Panel = () => {
		return (
			<Stack
				direction="row"
				spacing={4}
				justifyContent="center"
				textAlign="center"
				marginTop="20px"
			>
				{resultsData.map((result, idx) => (
					<Box
						key={idx}
						border="1px solid gray"
						padding={10}
						width="100%"
						borderRadius="5px"
					>
						<Typography variant="h2">{result.split(" ")[0]}</Typography>
						<Typography variant="h3">{result.split(" ")[1]}</Typography>
					</Box>
				))}
			</Stack>
		);
	};

	const ArrayDisplay = () => {
		return (
			<Box>
				<Typography
					variant="h2"
					sx={{ fontSize: "24px", margin: "40px auto 20px" }}
				>
					Display Array:
				</Typography>
				<code
					style={{
						backgroundColor: "gray",
						padding: "15px",
						borderRadius: "5px",
						color: "#FFF",
					}}
				>
					{JSON.stringify(resultsData)}
				</code>
			</Box>
		);
	};

	return (
		<Stack sx={{ padding: "40px" }}>
			<Box component="form" onSubmit={handleSubmit}>
				<Stack direction="column" spacing={2}>
					<TextField
						label="Please enter the domain count, separated in commas"
						name="domainCount"
						variant="outlined"
						value={formData.domainCount}
						onChange={handleChange}
						type="string"
					/>
					<TextField
						label="Please enter the domain url string"
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
			<Stack>{submitted && <Panel />}</Stack>
			<Stack>{submitted && <ArrayDisplay />}</Stack>
		</Stack>
	);
};

export default App;
