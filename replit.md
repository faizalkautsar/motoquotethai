# Car Insurance Quote Application

## Overview

This is a bilingual (Thai/English) car insurance quote calculator web application. The system allows users to fill out comprehensive vehicle and driver information through a multi-step wizard interface and receive instant insurance quotes for three coverage types (Type 1, Type 2, and Type 3). The application features a modern, responsive design with internationalization support and provides real-time quote calculations based on multiple risk factors.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**: React with TypeScript, Vite build system, and Wouter for client-side routing.

**UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling. The design system uses CSS variables for theming with support for light/dark modes and a neutral color palette.

**State Management**: 
- React Hook Form with Zod validation for complex multi-step form handling
- TanStack Query (React Query) for server state management and API interactions
- Local component state for UI interactions

**Internationalization**: i18next integration providing Thai (default) and English language support with translation files managing all user-facing text.

**Form Architecture**: Multi-step wizard pattern with 16+ steps collecting vehicle information, driver details, coverage preferences, and contact information. Each step has dedicated validation schemas ensuring data integrity before proceeding.

**Design Patterns**:
- Component composition with shadcn/ui components
- Custom hooks for mobile detection and toast notifications
- Separation of concerns with dedicated components for each wizard step

### Backend Architecture

**Runtime**: Node.js with Express.js framework using ESM modules.

**API Design**: RESTful API endpoints for quote operations:
- POST `/api/quotes` - Submit quote request and receive calculated prices
- GET `/api/quotes/:id` - Retrieve specific quote by ID

**Business Logic**: Quote calculation service implementing complex pricing algorithms based on:
- Vehicle age and characteristics
- Driver age and experience
- Driving history and claims
- Coverage type and deductible selection
- Additional coverage options

**Data Flow**:
1. Client submits complete quote data via POST request
2. Server validates data against Zod schemas
3. Quote calculator service computes prices for all three coverage types
4. Storage layer persists quote with calculated prices
5. Response returns complete quote object to client

### Data Storage Solutions

**Current Implementation**: In-memory storage using Map data structure (MemStorage class) for development/testing.

**Schema Design**: Drizzle ORM with PostgreSQL-ready schema definitions including:
- Vehicle information (brand, model, year, transmission, identification numbers)
- Driver information (age, experience, claims history, NCB status)
- Vehicle usage patterns (usage type, mileage, parking, modifications)
- Coverage selections (type, deductible, additional coverage as JSONB)
- Contact information (full personal details with Thai language support)
- Calculated prices (type1Price, type2Price, type3Price as integers)

**Migration Strategy**: Database configuration prepared for PostgreSQL via Neon serverless with Drizzle Kit for schema migrations. The storage interface (IStorage) provides abstraction allowing seamless transition from in-memory to database persistence.

### External Dependencies

**Database Services**:
- Neon Database (PostgreSQL serverless) - configured but not actively used
- Drizzle ORM for type-safe database operations
- Connect-pg-simple for session storage (configured)

**UI Component Libraries**:
- Radix UI primitives (20+ component packages) for accessible UI components
- Tailwind CSS for utility-first styling
- Embla Carousel for carousel components
- Lucide React for icons

**Development Tools**:
- Vite for development server and build tooling
- Replit-specific plugins for development environment integration
- ESBuild for production server bundling
- TypeScript for type safety across the stack

**Form & Validation**:
- React Hook Form for form state management
- Zod for runtime type validation
- @hookform/resolvers for integrating Zod with React Hook Form
- Drizzle-Zod for generating Zod schemas from database schemas

**Internationalization**:
- i18next for translation management
- react-i18next for React integration

**API & State**:
- TanStack Query for server state and caching
- Wouter for lightweight routing

The application is designed as a monorepo with shared schema definitions between client and server, ensuring type safety and validation consistency across the full stack.