/**
 * Supplier Vetting Engine
 * Automatically audits supplier data against our strict safety, 
 * quality, and compliance thresholds.
 */

const fs = require('fs');
const path = require('path');
const { SupplierRecordSchema } = require('./supplier-schema');

class SupplierVettingEngine {
  constructor() {
    this.databasePath = path.join(__dirname, 'supplier-database.json');
  }

  loadSuppliers() {
    try {
      const data = fs.readFileSync(this.databasePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error("Error loading supplier database:", error);
      return [];
    }
  }

  saveSuppliers(suppliers) {
    fs.writeFileSync(this.databasePath, JSON.stringify(suppliers, null, 2));
  }

  evaluateSupplier(supplier) {
    // 1. Validate Schema
    const { error } = SupplierRecordSchema.validate(supplier, { abortEarly: false });
    
    if (error) {
      return {
        status: 'rejected',
        reason: `Schema Validation Failed: ${error.details.map(d => d.message).join(', ')}`
      };
    }

    // 2. Heavy Metal Thresholds (Hard Limits)
    const metals = supplier.safety.heavyMetals;
    if (metals.leadPpm > 10 || metals.arsenicPpm > 2 || metals.cadmiumPpm > 0.3 || metals.mercuryPpm > 1) {
      return { status: 'rejected', reason: 'Fails Heavy Metal Safety Limits' };
    }

    // 3. Microbial Safety (Hard Limits)
    const microbial = supplier.safety.microbial;
    if (microbial.eColi !== 'absent' || microbial.salmonella !== 'absent') {
      return { status: 'rejected', reason: 'Pathogens Detected (E.Coli / Salmonella)' };
    }
    if (microbial.totalPlateCount > 10000) {
      return { status: 'rejected', reason: 'Total Plate Count Exceeds 10,000 limits' };
    }

    // 4. Compliance Check (Needs at least KEBS or GMP)
    if (!supplier.compliance.kebsCertified && !supplier.compliance.gmpCompliant && !supplier.compliance.fdaRegistered) {
      return { status: 'rejected', reason: 'No recognized manufacturing certification (KEBS/GMP/FDA)' };
    }

    // 5. Check Pesticides
    if (!supplier.safety.pesticideResidueFree) {
      return { status: 'rejected', reason: 'Fails Pesticide Residue checks' };
    }

    // 6. Test freshness
    const daysSinceTest = (new Date() - new Date(supplier.safety.lastTestedDate)) / (1000 * 60 * 60 * 24);
    if (daysSinceTest > 365) {
      return { status: 'rejected', reason: 'Safety tests are older than 1 year. Fresh COA required.' };
    }

    // If all pass
    return { status: 'approved', reason: 'Passed all safety, quality, and compliance thresholds.' };
  }

  runAudit() {
    const suppliers = this.loadSuppliers();
    
    console.log(`Auditing ${suppliers.length} suppliers...`);
    let approved = 0;
    let rejected = 0;

    const auditedSuppliers = suppliers.map(supplier => {
      const evaluation = this.evaluateSupplier(supplier);
      
      supplier.status = evaluation.status;
      if (evaluation.status === 'rejected') {
        supplier.rejectionReason = evaluation.reason;
        rejected++;
      } else {
        supplier.rejectionReason = null;
        approved++;
      }
      
      return supplier;
    });

    this.saveSuppliers(auditedSuppliers);
    console.log(`Audit Complete. Approved: ${approved}, Rejected: ${rejected}`);
    return { approved, rejected };
  }
}

// Allow running directly from CLI
if (require.main === module) {
  const engine = new SupplierVettingEngine();
  engine.runAudit();
}

module.exports = SupplierVettingEngine;
