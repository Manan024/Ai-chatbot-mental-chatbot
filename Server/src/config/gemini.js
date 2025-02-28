import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.YOUR_API_KEY);

const mentalHealthKeywords = [
  "hii",
  "hello",
  "anxiety",
  "stress",
  "depression",
  "mood",
  "therapy",
  "panic",
  "well-being",
  "self-care",
  "loneliness",
  "burnout",
  "mental health",
  "sadness",
  "grief",
  "self-esteem",
  "self-harm",
  "addiction",
  "trauma",
  "phobia",
  "bipolar",
  "schizophrenia",
  "PTSD",
  "OCD",
  "eating disorder",
  "body image",
  "validation",
  "suicide",
  "coping",
  "emotions",
  "anger",
  "fatigue",
  "resilience",
  "healing",
  "meditation",
  "mindfulness",
  "support",
  "counseling",
  "treatment",
  "medication",
  "psychotherapy",
  "psychologist",
  "psychiatrist",
  "therapy session",
  "sleep disorder",
  "insomnia",
  "psychological",
  "mental illness",
  "mental disorder",
  "mood swings",
  "psychosis",
  "binge eating",
  "relationship issues",
  "grief support",
  "social anxiety",
  "mental breakdown",
  "nervous breakdown",
  "coping mechanisms",
  "emotional support",
  "self-compassion",
  "wellness",
  "positivity",
  "acceptance",
  "mindset",
  "stress management",
  "therapy dog",
  "mind-body connection",
  "mental health awareness",
  "cognitive behavioral therapy",
  "CBT",
  "feel",
  "better",
  "support group",
  "depressive episodes",
  "panic attacks",
  "chronic illness",
  "ADHD",
  "borderline personality disorder",
  "PTSD recovery",
  "behavioral health",
  "anger management",
  "validation",
  "conflict resolution",
  "mental fog",
  "motivation",
  "self-worth",
  "emotional intelligence",
  "self-reflection",
];

function isMentalHealthQuery(input) {
  const lowerCaseInput = input.toLowerCase();
  return mentalHealthKeywords.some((keyword) =>
    lowerCaseInput.includes(keyword)
  );
}

async function Gemini(prompt) {
  try {
    // Check if the user input is related to mental health topics
    if (!isMentalHealthQuery(prompt)) {
      return "Sorry, I can only help with mental health-related issues. How are you feeling today?";
    }

    // Update the query to encourage empathy, support, and engagement
    const query = `Provide a short not too long compassionate and empathetic response for the following mental health-related query. Be concise, supportive, and offer encouragement. Avoid lengthy responses. Here is the input: ${prompt}`;

    console.log("Query to Gemini AI:", query); // Log the query for debugging

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(query);

    // Check if the result is valid
    if (!result || !result.response || !result.response.text) {
      console.error("Invalid response from Gemini API", result);
      return "Sorry, there was an error processing your request.";
    }

    let reply = result.response.text();

    // Limit the response length to a reasonable size (e.g., 300 characters)
    const maxLength = 500; // You can adjust this value as needed
    if (reply.length > maxLength) {
      reply = reply.slice(0, maxLength) + "..."; // Trim the response if it's too long
    }

    console.log("AI Response:", reply); // Log the response for debugging

    return reply;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, there was an error processing your request.";
  }
}

export default Gemini;
