import { type InsertQuote } from "@shared/schema";

interface QuoteCalculation {
  type1Price: number;
  type2Price: number;
  type3Price: number;
}

export function calculateQuote(quoteData: InsertQuote): QuoteCalculation {
  // Base prices for each coverage type
  let type1BasePrice = 15000;
  let type2BasePrice = 8500;
  let type3BasePrice = 3200;

  // Vehicle age factor
  const carYear = quoteData.carYear;
  const currentYear = new Date().getFullYear();
  const vehicleAge = currentYear - carYear;
  
  if (vehicleAge >= 7) {
    type1BasePrice *= 1.2;
    type2BasePrice *= 1.15;
  } else if (vehicleAge >= 3) {
    type1BasePrice *= 1.1;
    type2BasePrice *= 1.05;
  }

  // Driver age factor
  const ageMultiplier = {
    "18-25": 1.3,
    "26-35": 1.1,
    "36-50": 1.0,
    "51-65": 1.05,
    "65+": 1.2,
  }[quoteData.driverAge] || 1.0;

  type1BasePrice *= ageMultiplier;
  type2BasePrice *= ageMultiplier;
  type3BasePrice *= ageMultiplier;

  // Driving experience factor
  const experienceDiscount = {
    "0-2": 0,
    "3-5": 0.05,
    "6-10": 0.1,
    "11-15": 0.15,
    "15+": 0.2,
  }[quoteData.drivingExperience] || 0;

  type1BasePrice *= (1 - experienceDiscount);
  type2BasePrice *= (1 - experienceDiscount);
  type3BasePrice *= (1 - experienceDiscount);

  // Claims history factor
  const claimsMultiplier = {
    "0": 0.8,    // NCB discount
    "1": 0.9,
    "2+": 1.0,
  }[quoteData.claimsHistory] || 1.0;

  type1BasePrice *= claimsMultiplier;
  type2BasePrice *= claimsMultiplier;
  type3BasePrice *= claimsMultiplier;

  // NCB (No Claims Bonus)
  if (quoteData.hasNCB === "yes") {
    type1BasePrice *= 0.85;
    type2BasePrice *= 0.85;
    type3BasePrice *= 0.85;
  }

  // Vehicle usage factor
  const usageMultiplier = {
    "personal": 1.0,
    "business": 1.15,
    "commercial": 1.3,
  }[quoteData.vehicleUsage] || 1.0;

  type1BasePrice *= usageMultiplier;
  type2BasePrice *= usageMultiplier;
  type3BasePrice *= usageMultiplier;

  // Annual mileage factor
  const mileageMultiplier = {
    "under10k": 0.95,
    "10k-20k": 1.0,
    "20k-30k": 1.1,
    "over30k": 1.2,
  }[quoteData.annualMileage] || 1.0;

  type1BasePrice *= mileageMultiplier;
  type2BasePrice *= mileageMultiplier;
  type3BasePrice *= mileageMultiplier;

  // Parking location factor
  const parkingMultiplier = {
    "garage": 0.95,
    "driveway": 1.0,
    "street": 1.1,
    "public": 1.15,
  }[quoteData.parkingLocation] || 1.0;

  type1BasePrice *= parkingMultiplier;
  type2BasePrice *= parkingMultiplier;
  type3BasePrice *= parkingMultiplier;

  // Modifications factor
  if (quoteData.hasModifications === "yes") {
    type1BasePrice *= 1.15;
    type2BasePrice *= 1.15;
  }

  // Deductible adjustment (for Type 1 and 2)
  const deductibleDiscount = {
    0: 1.0,
    5000: 0.9,
    10000: 0.85,
    15000: 0.8,
  }[quoteData.deductible] || 1.0;

  type1BasePrice *= deductibleDiscount;
  type2BasePrice *= deductibleDiscount;

  // Additional coverage add-ons
  let additionalCost = 0;
  const additionalCoverage = quoteData.additionalCoverage as string[] | null | undefined;
  if (additionalCoverage && additionalCoverage.length > 0) {
    const addonPrices: Record<string, number> = {
      "flood": 800,
      "fire": 600,
      "theft": 1200,
      "driver-pa": 500,
      "passenger": 600,
      "windshield": 400,
    };

    additionalCoverage.forEach((addon: string) => {
      additionalCost += addonPrices[addon] || 0;
    });
  }

  // Add additional coverage costs (only to Type 1 and 2)
  type1BasePrice += additionalCost;
  type2BasePrice += additionalCost * 0.7; // Partial coverage for Type 2

  // Round to nearest 100
  const type1Price = Math.round(type1BasePrice / 100) * 100;
  const type2Price = Math.round(type2BasePrice / 100) * 100;
  const type3Price = Math.round(type3BasePrice / 100) * 100;

  return {
    type1Price,
    type2Price,
    type3Price,
  };
}
