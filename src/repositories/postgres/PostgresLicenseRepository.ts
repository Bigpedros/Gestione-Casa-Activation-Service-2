import type { QueryResultRow } from 'pg';
import type { LicenseRecord, LicenseRepository } from '../interfaces/LicenseRepository.js';
import type { DbClient } from '../../database/types.js';
import { getPool } from '../../database/pool.js';

interface LicenseRow extends QueryResultRow {
  id: string;
  license_code: string;
  checksum: string;
  customer_id: string;
  license_type: string;
  status: string;
  schema_version: number;
  engine_version: string;
  generated_at: Date | string;
  expires_at: Date | string | null;
  max_activations: number;
  created_at: Date | string;
  updated_at: Date | string;
}

function mapRowToLicenseRecord(row: LicenseRow): LicenseRecord {
  return {
    id: row.id,
    licenseCode: row.license_code,
    checksum: row.checksum || '',
    customerId: row.customer_id,
    generatedAt: row.generated_at instanceof Date ? row.generated_at.toISOString() : String(row.generated_at),
    expiresAt: row.expires_at ? (row.expires_at instanceof Date ? row.expires_at.toISOString() : String(row.expires_at)) : undefined,
    engineVersion: row.engine_version,
    schemaVersion: Number(row.schema_version),
    status: row.status as LicenseRecord['status'],
    licenseType: row.license_type,
  };
}

export class PostgresLicenseRepository implements LicenseRepository {
  constructor(private client?: DbClient) {}

  private get db(): DbClient {
    return this.client || getPool();
  }

  async findById(id: string): Promise<LicenseRecord | null> {
    const res = await this.db.query<LicenseRow>(
      'SELECT * FROM licenses WHERE id = $1 LIMIT 1',
      [id]
    );
    if (res.rows.length === 0) return null;
    return mapRowToLicenseRecord(res.rows[0]);
  }

  async findByCode(licenseCode: string, options?: { forUpdate?: boolean }): Promise<LicenseRecord | null> {
    const query = options?.forUpdate
      ? 'SELECT * FROM licenses WHERE license_code = $1 LIMIT 1 FOR UPDATE'
      : 'SELECT * FROM licenses WHERE license_code = $1 LIMIT 1';
    const res = await this.db.query<LicenseRow>(query, [licenseCode]);
    if (res.rows.length === 0) return null;
    return mapRowToLicenseRecord(res.rows[0]);
  }

  async save(license: LicenseRecord): Promise<LicenseRecord> {
    const query = `
      INSERT INTO licenses (
        id, license_code, checksum, customer_id, license_type, status,
        schema_version, engine_version, generated_at, expires_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
      ON CONFLICT (id) DO UPDATE SET
        license_code = EXCLUDED.license_code,
        checksum = EXCLUDED.checksum,
        customer_id = EXCLUDED.customer_id,
        license_type = EXCLUDED.license_type,
        status = EXCLUDED.status,
        schema_version = EXCLUDED.schema_version,
        engine_version = EXCLUDED.engine_version,
        generated_at = EXCLUDED.generated_at,
        expires_at = EXCLUDED.expires_at,
        updated_at = NOW()
      RETURNING *;
    `;

    const res = await this.db.query<LicenseRow>(query, [
      license.id,
      license.licenseCode,
      license.checksum || '',
      license.customerId,
      license.licenseType,
      license.status,
      license.schemaVersion,
      license.engineVersion,
      license.generatedAt,
      license.expiresAt || null,
    ]);

    return mapRowToLicenseRecord(res.rows[0]);
  }

  async update(id: string, updates: Partial<LicenseRecord>): Promise<LicenseRecord | null> {
    const existing = await this.findById(id);
    if (!existing) return null;

    const updated: LicenseRecord = {
      ...existing,
      ...updates,
    };

    return this.save(updated);
  }
}
