import { useState } from "react";
import { Container, Text, VStack, Textarea, Button, Box, Heading } from "@chakra-ui/react";

const Index = () => {
  const [emailText, setEmailText] = useState("");
  const [summary, setSummary] = useState("");

  const handleSummarize = async () => {
    try {
      const response = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer YOUR_OPENAI_API_KEY`,
        },
        body: JSON.stringify({
          prompt: `Summarize the following email:\n\n${emailText}\n\nSummary:`,
          max_tokens: 50,
        }),
      });

      const data = await response.json();
      setSummary(data.choices[0].text.trim());
    } catch (error) {
      console.error("Error summarizing email:", error);
      setSummary("An error occurred while summarizing the email.");
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Email Summary Tool</Heading>
        <Textarea
          placeholder="Paste your email text here..."
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          size="md"
          height="200px"
        />
        <Button colorScheme="blue" onClick={handleSummarize}>Summarize Email</Button>
        {summary && (
          <Box p={4} borderWidth="1px" borderRadius="lg" width="100%">
            <Heading as="h2" size="md">Summary</Heading>
            <Text mt={2}>{summary}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;