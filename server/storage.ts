import { type Quote, type InsertQuote } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getQuote(id: string): Promise<Quote | undefined>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  getAllQuotes(): Promise<Quote[]>;
}

export class MemStorage implements IStorage {
  private quotes: Map<string, Quote>;

  constructor() {
    this.quotes = new Map();
  }

  async getQuote(id: string): Promise<Quote | undefined> {
    return this.quotes.get(id);
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = randomUUID();
    const quote: Quote = {
      ...insertQuote,
      additionalCoverage: (insertQuote.additionalCoverage as string[] | null | undefined) || null,
      type1Price: insertQuote.type1Price ?? null,
      type2Price: insertQuote.type2Price ?? null,
      type3Price: insertQuote.type3Price ?? null,
      id,
      createdAt: new Date(),
    };
    this.quotes.set(id, quote);
    return quote;
  }

  async getAllQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values());
  }
}

export const storage = new MemStorage();
