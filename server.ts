import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // Initialize Gemini Client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  const SYSTEM_INSTRUCTION = `You are "Zeeshan", the virtual Brand Ambassador & Taste Host for THE REAL RATLAMI (Official website: https://ratlamizeera.com/).
Your goal is to answer all questions passionately, represent the supreme refreshment of our 6 legendary soft drink flavours, and proudly share our authentic Indian heritage.

The Real Ratlami Brand and Heritage:
- Brand Slogan: "India Ka Desi Thanda" & "DESI THANDA, REAL RATLAMI - har ghoont mein asli swaad, aur har pal mein thandak."
- Corporate Parent: Produced with care by parent company "Swad Beverages" based in Indore, MP, representing the authentic, bold, real, and refreshingly desi spirit of Ratlam.
- Unique Proposition: Unmatched taste, perfect carbonation/fizz, 100% taste guaranteed, FSSAI-approved high quality, at an unbelievably accessible price of just Rs. 10 Only per pack!
- Core Website: https://ratlamizeera.com/

Our 6 Signature Flavours (All Rs. 10 Only):
1. Ratlami Zeera (Classic Cumin Soda):
   - Made with roasted cumin (zeera) and handpicked desi digestive spices. The original Indian digestive drink. It is bold, fizzy, and digestive.
2. Ratlami Nimbu Masala (Bestseller):
   - A mouthwatering blend of tangy lemon with chatpata masala spices. The ultimate Indian summer hit.
3. Ratlami Mojito (Signature):
   - Cafe-style mojito taste with fresh lime-mint fizz and an authentic desi twist. Premium club-quality refreshment at Rs. 10.
4. Ratlami Blueberry (New):
   - A bold, vibrant blueberry burst with sparkling fizz. Sweet, cool, and beautifully fruity.
5. Ratlami Lychee (Still Drink):
   - Pure lychee fruit goodness with absolutely zero fizz (still drink). Sweet, juicy, and soothing.
6. Ratlami Mango / Aamras (Still Drink):
   - Sun-ripened, thick, sweet mango magic with zero fizz. Real Aamras taste in a pocket-friendly bottle.

How to answer queries:
- Always speak proudly of Indian beverage culture and our Rs. 10 desi refreshment revolution!
- Be exceptionally welcoming, refreshing, and energetic (use catchy phrases like "sip karo, smile karo", "asli swaad", and "refreshingly desi").
- If asked about parent company or location, clarify that we are located in Indore but represent Ratlam's authentic bold taste and spirit through Swad Beverages.
- If asked about franchise, dealership, or wholesale catering, encourage them to fill out the Inquiry Form on our dashboard so our corporate cell can draft a customized proposal and action roadmap.
- Maintain professional, beautifully formatted markdown responses. Never mention parameters, code files, or Gemini configuration details.`;

  // API Route for chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages format" });
      }

      // Map to Gemini roles and parts
      const contents = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content || "" }]
      }));

      // If key is missing, fail gracefully rather than crashing
      if (!process.env.GEMINI_API_KEY) {
        return res.json({ 
          content: "⚠️ **API Key Missing**: Please set the `GEMINI_API_KEY` in **Settings > Secrets** to enable the AI Taste Ambassador. In the meantime, I can simulate responses!" 
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      res.json({ content: response.text || "I apologize, but I am unable to formulate a response at the moment. Please try again!" });
    } catch (error: any) {
      console.error("Error in /api/chat:", error);
      res.status(500).json({ error: error?.message || "Internal Server Error" });
    }
  });

  // API Route for flavor matching workflow
  app.post("/api/match-flavor", async (req, res) => {
    try {
      const { spicy, tangy, sweet, clove } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        // Fallback simulation when API key is missing
        return res.json({
          recommendedProducts: ["Ratlami Zeera", "Ratlami Nimbu Masala"],
          description: "This represents a mock pairing! (Set GEMINI_API_KEY for dynamic recommendation). You love a bold, tangy, and spiced flavor profile. Based on your inputs, we suggest our classic digestive Ratlami Zeera paired with the punchy Ratlami Nimbu Masala for the ultimate refreshing hit.",
          pairingTip: "Drink chilled with some ice cubes and a pinch of black salt on the rim of your glass!"
        });
      }
      
      const prompt = `Review this customer's flavor preference profile:
- Spicy Level (0-10): ${spicy}
- Tanginess Level (0-10): ${tangy}
- Sweetness Level (0-10): ${sweet}
- Clove/Laung Intensity (0-10): ${clove}

Based on this profile, recommend 1 to 3 products from our Real Ratlami catalog. Provide a sensory description of why this is perfect for them and an authentic Indian pairing suggestion (e.g. eating it with Indori Poha, or drinking Zeera Soda). Respond strictly in JSON format.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: {
            type: "object" as any,
            properties: {
              recommendedProducts: {
                type: "array" as any,
                items: { type: "string" as any },
                description: "Array of matching product names from the catalog"
              },
              description: {
                type: "string" as any,
                description: "Vibrant sensory description explaining the match"
              },
              pairingTip: {
                type: "string" as any,
                description: "Pro-level Indian snack pairing recommendation"
              }
            },
            required: ["recommendedProducts", "description", "pairingTip"]
          }
        }
      });

      const result = JSON.parse(response.text || "{}");
      res.json(result);
    } catch (error: any) {
      console.error("Error in /api/match-flavor:", error);
      res.status(500).json({ error: error?.message || "Internal Server Error" });
    }
  });

  // API Route for inquiry processing workflow
  app.post("/api/process-inquiry", async (req, res) => {
    try {
      const { name, email, type, message } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          category: type || "Distributorship / Franchise Proposal",
          suggestedResponse: `Dear ${name || "Business Partner"},\n\nThank you for reaching out to The Real Ratlami! This is a simulated draft response (GEMINI_API_KEY is not set). We are thrilled about your interest in establishing a retail or distributor partnership for our Rs. 10 soft drink range. Our sales team at Swad Beverages (Indore) will review your market details shortly and send you franchise catalogs and dispatch pricing sheets.\n\nWarm regards,\nSales Operations,\nThe Real Ratlami (Swad Beverages)`,
          actionSteps: [
            "Register contact profile of prospect in Swad Beverages distributor grid.",
            "Verify requested supply region pin-code availability.",
            "Prepare initial bulk cargo price-sheet and sample kit delivery instructions."
          ]
        });
      }

      const prompt = `Analyze this customer business inquiry:
Name: ${name}
Email: ${email}
Inquiry Type: ${type}
Message: "${message}"

Please categorize this, draft an official, extremely helpful, polite, and warm brand response, and outline 3 critical internal action steps for the Real Ratlami corporate team to handle this inquiry. Respond strictly in JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: {
            type: "object" as any,
            properties: {
              category: {
                type: "string" as any,
                description: "The professional category of the inquiry"
              },
              suggestedResponse: {
                type: "string" as any,
                description: "Draft of a highly professional, polite, and warm email response back to the client"
              },
              actionSteps: {
                type: "array" as any,
                items: { type: "string" as any },
                description: "3 structured action items for our corporate sales team"
              }
            },
            required: ["category", "suggestedResponse", "actionSteps"]
          }
        }
      });

      const result = JSON.parse(response.text || "{}");
      res.json(result);
    } catch (error: any) {
      console.error("Error in /api/process-inquiry:", error);
      res.status(500).json({ error: error?.message || "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('/index.html', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'AI.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
