import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.YOUR_API_KEY);

// Predefined responses for specific phrases
const predefinedResponses = {
  "i feel stressed": "I'm sorry you're feeling this way. Try taking a deep breath and practicing mindfulness. Would you like some guided breathing exercises?",
  "i feel anxious": "Anxiety can be overwhelming. Try grounding yourself by focusing on your breath. You're not alone in this!",
  "i feel depressed": "I'm here for you. You're not alone. It might help to talk to a friend or a therapist. Would you like some self-care tips?",
  "i can't sleep": "Sleep troubles can be tough. Try limiting screen time before bed and practicing relaxation techniques. Would you like some sleep hygiene tips?",
  "i feel lonely": "I'm here to support you. Connecting with loved ones or engaging in a hobby might help. Would you like some ideas?",
  "i'm having a panic attack": "Try the 5-4-3-2-1 grounding technique: Identify 5 things you see, 4 you touch, 3 you hear, 2 you smell, and 1 you taste. Breathe slowly, you're safe.",
  "i feel worthless": "You matter more than you know. Be kind to yourself, and remember that your feelings do not define your worth. Would you like to talk about it?",
  "how to manage stress": "Managing stress starts with self-care. Exercise, deep breathing, and mindfulness can help. Would you like a guided relaxation exercise?",
  "i feel like giving up": "I'm really sorry you're feeling this way. Please remember that you're not alone. Reach out to someone you trust, or consider talking to a professional. You are valued and loved. 💙",
  "how to deal with anxiety": "Breathing exercises and grounding techniques can help. Would you like some calming strategies?",
  "i feel sad": "It's okay to feel sad sometimes. Allow yourself to feel, but also try engaging in activities that bring you comfort. Would you like some mood-boosting suggestions?",
  "i feel burned out": "Burnout is exhausting. Rest, take breaks, and prioritize self-care. Would you like some relaxation tips?",
};

// Mental health keywords for filtering queries
const mentalHealthKeywords = [
  "anxiety", "stress", "depression", "panic", "self-care", "loneliness",
  "burnout", "mental health", "grief", "self-esteem", "trauma", "coping",
  "meditation", "mindfulness", "support", "counseling", "psychologist",
  "therapy", "insomnia", "emotional support", "mental breakdown",
  "social anxiety","sad", "low","anger management", "positivity", "self-worth",
];

function isMentalHealthQuery(input) {
  const lowerCaseInput = input.toLowerCase();
  return mentalHealthKeywords.some((keyword) => lowerCaseInput.includes(keyword));
}

async function Gemini(prompt) {
  try {
    const lowerCasePrompt = prompt.toLowerCase();

    // Check for predefined responses
    for (const key in predefinedResponses) {
      if (lowerCasePrompt.includes(key)) {
        return predefinedResponses[key]; // Return predefined response
      }
    }

    // Check if input is related to mental health
    if (!isMentalHealthQuery(prompt)) {
      return "I'm here to support mental health conversations. How are you feeling today?";
    }

    // Generate AI response
    const query = `Provide a short, compassionate, and empathetic response to this mental health-related question: ${prompt}`;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(query);
    if (!result || !result.response || !result.response.text) {
      return "I'm sorry, but I couldn't process your request.";
    }

    let reply = result.response.text();
    const maxLength = 500;
    if (reply.length > maxLength) {
      reply = reply.slice(0, maxLength) + "...";
    }

    return reply;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, there was an error processing your request.";
  }
}

export default Gemini;
