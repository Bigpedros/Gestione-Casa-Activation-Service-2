export interface LicenseRecord {
  id: string;
  licenseCode: string;
  checksum: string;
  customerId: string;
  deviceId?: string;
  expiresAt?: string;
  generatedAt: string;
  engineVersion: string;
  schemaVersion: number;
  status: 'assigned' | 'revoked' | 'expired' | 'suspended';
  licenseType: string;
}

export interface LicenseRepository {
  findById(id: string): Promise<LicenseRecord | null>;
  findByCode(licenseCode: string, options?: { forUpdate?: boolean }): Promise<LicenseRecord | null>;
  save(license: LicenseRecord): Promise<LicenseRecord>;
  update(id: string, updates: Partial<LicenseRecord>): Promise<LicenseRecord | null>;
}
