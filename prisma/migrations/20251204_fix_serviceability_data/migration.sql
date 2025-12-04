-- Update existing serviceability_checks records to set proper serviceabilityType
-- based on their existing fields

-- Set to 'serviceable' for records that are truly serviceable
UPDATE "serviceability_checks"
SET "serviceabilityType" = 'serviceable'
WHERE "serviceable" = 1 
  AND ("cstatus" = 'schedulable' OR "status" = 'SERVICEABLE' OR "salesStatus" = 'Y')
  AND "serviceabilityType" = 'none';

-- Set to 'preorder' for records that are preorder/planned
UPDATE "serviceability_checks"
SET "serviceabilityType" = 'preorder'
WHERE ("cstatus" = 'presales' OR "status" = 'PLANNED' OR "salesStatus" = 'P')
  AND "serviceabilityType" = 'none';

-- Set to 'none' for records that explicitly have no service
UPDATE "serviceability_checks"
SET "serviceabilityType" = 'none'
WHERE ("cstatus" = 'future-service' OR "matchType" = 'NONE' OR "serviceable" = 0)
  AND "serviceabilityType" = 'none';

