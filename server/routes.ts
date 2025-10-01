import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { completeQuoteSchema } from "@shared/schema";
import { calculateQuote } from "./services/quote-calculator";

export async function registerRoutes(app: Express): Promise<Server> {
  // Submit quote request and get calculated prices
  app.post("/api/quotes", async (req, res) => {
    try {
      const validatedData = completeQuoteSchema.parse(req.body);
      
      // Calculate quote prices
      const { type1Price, type2Price, type3Price } = calculateQuote(validatedData);
      
      // Save quote with calculated prices
      const quote = await storage.createQuote({
        ...validatedData,
        type1Price,
        type2Price,
        type3Price,
      });
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ 
        message: "Invalid quote data", 
        errors: error.errors || error.message 
      });
    }
  });

  // Get quote by ID
  app.get("/api/quotes/:id", async (req, res) => {
    try {
      const quote = await storage.getQuote(req.params.id);
      
      if (!quote) {
        return res.status(404).json({ message: "Quote not found" });
      }
      
      res.json(quote);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
