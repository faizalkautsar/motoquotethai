import { pgTable, text, varchar, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const quotes = pgTable("quotes", {
  id: varchar("id").primaryKey().default("gen_random_uuid()"),
  // Vehicle Information
  carBrand: text("car_brand").notNull(),
  carModel: text("car_model").notNull(),
  carYear: integer("car_year").notNull(),
  transmission: text("transmission").notNull(),
  licensePlate: text("license_plate").notNull(),
  chassisNumber: text("chassis_number").notNull(),
  engineNumber: text("engine_number").notNull(),
  color: text("color").notNull(),
  
  // Driver Information
  driverAge: text("driver_age").notNull(),
  drivingExperience: text("driving_experience").notNull(),
  claimsHistory: text("claims_history").notNull(),
  hasNCB: text("has_ncb").notNull(),
  
  // Vehicle Usage
  vehicleUsage: text("vehicle_usage").notNull(),
  annualMileage: text("annual_mileage").notNull(),
  parkingLocation: text("parking_location").notNull(),
  hasModifications: text("has_modifications").notNull(),
  
  // Coverage Selection
  coverageType: text("coverage_type").notNull(),
  deductible: integer("deductible").notNull(),
  additionalCoverage: jsonb("additional_coverage").$type<string[]>(),
  
  // Contact Information
  title: text("title").notNull(),
  gender: text("gender").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  birthDate: text("birth_date").notNull(),
  idCard: text("id_card").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
  province: text("province").notNull(),
  postalCode: text("postal_code").notNull(),
  occupation: text("occupation").notNull(),
  
  // Quote Results
  type1Price: integer("type1_price"),
  type2Price: integer("type2_price"),
  type3Price: integer("type3_price"),
  
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  createdAt: true,
});

export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type Quote = typeof quotes.$inferSelect;

// Validation schemas for form steps
export const vehicleInfoSchema = z.object({
  carBrand: z.string().min(1, "Please select a car brand"),
  carModel: z.string().min(1, "Please select a car model"),
  carYear: z.number().min(1990).max(2025),
  transmission: z.string().min(1, "Please select transmission type"),
});

export const vehicleDetailsSchema = z.object({
  licensePlate: z.string().min(1, "License plate is required"),
  chassisNumber: z.string().min(1, "Chassis number is required"),
  engineNumber: z.string().min(1, "Engine number is required"),
  color: z.string().min(1, "Please select a color"),
});

export const coverageSelectionSchema = z.object({
  coverageType: z.enum(["type1", "type2", "type3"]),
  deductible: z.number(),
  additionalCoverage: z.array(z.string()).optional(),
});

export const driverInfoSchema = z.object({
  driverAge: z.string().min(1, "Please select age range"),
  drivingExperience: z.string().min(1, "Please select experience"),
  claimsHistory: z.string().min(1, "Please select claims history"),
  hasNCB: z.string().min(1, "Please specify NCB status"),
});

export const vehicleUsageSchema = z.object({
  vehicleUsage: z.string().min(1, "Please select vehicle usage"),
  annualMileage: z.string().min(1, "Please select annual mileage"),
  parkingLocation: z.string().min(1, "Please select parking location"),
  hasModifications: z.string().min(1, "Please specify modifications"),
});

export const contactInfoSchema = z.object({
  title: z.string().min(1, "Please select title"),
  gender: z.string().min(1, "Please select gender"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  birthDate: z.string().min(1, "Birth date is required"),
  idCard: z.string().min(13, "ID card must be at least 13 characters"),
  phone: z.string().min(10, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  province: z.string().min(1, "Please select province"),
  postalCode: z.string().min(5, "Postal code is required"),
  occupation: z.string().min(1, "Please select occupation"),
});

export const completeQuoteSchema = insertQuoteSchema.extend({
  carYear: z.number(),
  deductible: z.number(),
});
