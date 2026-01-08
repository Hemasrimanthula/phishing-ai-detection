
import { GoogleGenAI, Type } from "@google/genai";

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    riskScore: { type: Type.NUMBER },
    verdict: { type: Type.STRING, description: "Must be EXACTLY one of: SAFE, SUSPICIOUS, DANGEROUS" },
    redFlags: { 
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    explanation: { type: Type.STRING },
    heuristics: {
      type: Type.OBJECT,
      properties: {
        linguisticManipulation: { type: Type.NUMBER, description: "Score from 0-10" },
        linkEntropy: { type: Type.NUMBER, description: "Score from 0-10" },
        domainMasking: { type: Type.NUMBER, description: "Score from 0-10" }
      },
      required: ["linguisticManipulation", "linkEntropy", "domainMasking"]
    }
  },
  required: ["riskScore", "verdict", "redFlags", "explanation", "heuristics"]
};

async function generateAnalysis(prompt: string) {
  /**
   * IMPORTANT: Always create a new GoogleGenAI instance right before making an API call 
   * to ensure it uses the most up-to-date API key from the user selection dialog.
   */
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
        // Using a moderate thinking budget to allow the model to reason through 
        // complex phishing patterns before providing the final JSON.
        thinkingConfig: { thinkingBudget: 4096 }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Neural gateway returned an empty payload");

    const parsed = JSON.parse(text);
    
    // Normalize verdict for strict type compliance with the application's ScanResult type
    const v = String(parsed.verdict || 'SUSPICIOUS').toUpperCase();
    parsed.verdict = (['SAFE', 'SUSPICIOUS', 'DANGEROUS'].includes(v)) ? v : 'SUSPICIOUS';
    
    // Ensure heuristics are present and bounded between 0-10
    if (!parsed.heuristics) {
      parsed.heuristics = { linguisticManipulation: 5, linkEntropy: 5, domainMasking: 5 };
    }

    return parsed;
  } catch (error: any) {
    console.error("Forensic Service Failure:", error);
    // Propagate the specific error for UI handling (e.g., re-prompting for a paid API key)
    throw error;
  }
}

export async function analyzeEmailForPhishing(emailBody: string) {
  return generateAnalysis(`PERFORM DEEP LINGUISTIC FORENSICS: Analyze this email for social engineering patterns, BEC intent, and credential harvesting lures. Email Body: "${emailBody}"`);
}

export async function analyzeUrlReputation(url: string) {
  return generateAnalysis(`PERFORM DOMAIN REPUTATION SCAN: Analyze this URL for punycode spoofing, high-entropy random strings, and suspicious TLD patterns. URL: "${url}"`);
}

export async function analyzeSandboxArtifact(fileName: string, metadata: string) {
  return generateAnalysis(`PERFORM VIRTUAL SANDBOX ANALYSIS: Analyze file metadata and simulated system call logs for indicators of malicious intent. File: ${fileName}, Logs: ${metadata}`);
}

export async function analyzeApiRequest(payload: string) {
  return generateAnalysis(`PERFORM API SECURITY INSPECTION: Inspect this JSON payload for script injection or unauthorized data extraction markers. Payload: "${payload}"`);
}
