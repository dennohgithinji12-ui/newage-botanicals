/**
 * Supplier Schema — Gate 5: Supplier Discovery & Traceability
 * Ensures rigorous vetting for quality, safety, and compliance.
 */

const Joi = require('joi'); // Using Joi for validation schema, similar to botanical schema

const SupplierProfileSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  location: Joi.string().required(), // e.g., "Nanyuki, Kenya"
  botanicalSupplied: Joi.string().required(), // ID of the botanical
  originType: Joi.string().valid('farmed', 'wild-harvested').required(),
  extractionMethod: Joi.string().required(), // e.g., "Cold-pressed", "Sun-dried powder"
  productionCapacityKgPerMonth: Joi.number().min(0).required(),
  leadTimeDays: Joi.number().min(0).required()
});

const ComplianceSpecsSchema = Joi.object({
  kebsCertified: Joi.boolean().required(), // Kenya Bureau of Standards
  fdaRegistered: Joi.boolean().required(),
  gmpCompliant: Joi.boolean().required(), // Good Manufacturing Practice
  organicCertified: Joi.boolean().required(),
  certifyingBody: Joi.string().allow('', null)
});

const SafetyLimitsSchema = Joi.object({
  heavyMetals: Joi.object({
    leadPpm: Joi.number().max(10).required(), // Strict limits
    arsenicPpm: Joi.number().max(2).required(),
    cadmiumPpm: Joi.number().max(0.3).required(),
    mercuryPpm: Joi.number().max(1).required()
  }).required(),
  microbial: Joi.object({
    totalPlateCount: Joi.number().max(10000).required(),
    yeastAndMold: Joi.number().max(100).required(),
    eColi: Joi.string().valid('absent').required(),
    salmonella: Joi.string().valid('absent').required()
  }).required(),
  pesticideResidueFree: Joi.boolean().required(),
  lastTestedDate: Joi.date().iso().required()
});

const BatchStandardizationSchema = Joi.object({
  activeMarker: Joi.string().required(), // e.g., "Vitamin C", "Oleic Acid"
  minimumConcentrationPercentage: Joi.number().min(0).max(100).required(),
  testingMethod: Joi.string().required() // e.g., "HPLC", "GC-MS"
});

const SupplierRecordSchema = Joi.object({
  profile: SupplierProfileSchema,
  compliance: ComplianceSpecsSchema,
  safety: SafetyLimitsSchema,
  standardization: BatchStandardizationSchema,
  status: Joi.string().valid('pending', 'approved', 'rejected').default('pending'),
  rejectionReason: Joi.string().allow('', null)
});

module.exports = {
  SupplierRecordSchema,
  SupplierProfileSchema,
  ComplianceSpecsSchema,
  SafetyLimitsSchema,
  BatchStandardizationSchema
};
