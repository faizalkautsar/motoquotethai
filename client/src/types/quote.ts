export interface VehicleInfo {
  carBrand: string;
  carModel: string;
  carYear: number;
  transmission: string;
}

export interface VehicleDetails {
  licensePlate: string;
  chassisNumber: string;
  engineNumber: string;
  color: string;
}

export interface CoverageSelection {
  coverageType: "comprehensive" | "type2" | "type3";
  deductible: number;
  additionalCoverage?: string[];
}

export interface DriverInfo {
  driverAge: string;
  drivingExperience: string;
  claimsHistory: string;
  hasNCB: string;
}

export interface VehicleUsage {
  vehicleUsage: string;
  annualMileage: string;
  parkingLocation: string;
  hasModifications: string;
}

export interface ContactInfo {
  title: string;
  gender: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  idCard: string;
  phone: string;
  email: string;
  address: string;
  province: string;
  postalCode: string;
  occupation: string;
}

export interface QuoteFormData extends VehicleInfo, VehicleDetails, CoverageSelection, DriverInfo, VehicleUsage, ContactInfo {}

export interface QuoteResult {
  id: string;
  type1Price: number;
  type2Price: number;
  type3Price: number;
  carBrand: string;
  carModel: string;
  carYear: number;
  licensePlate: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
}
