import type { SyncStatus } from '../common/types.js';
import type { CustomerDocument } from './types.js';
export interface ManagerCustomerEntityLike {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    displayName?: string | null;
    email: string;
    phone?: string | null;
    company?: string | null;
    status: string;
    notes?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    version?: number;
    sourceDeviceId?: string | null;
    syncStatus?: SyncStatus;
    licenseCode?: string | null;
    metadata?: Record<string, unknown>;
}
/**
 * Converts a ManagerCustomerEntityLike record into a canonical CustomerDocument.
 */
export declare function managerCustomerEntityToDocument(record: ManagerCustomerEntityLike): CustomerDocument;
//# sourceMappingURL=adapters.d.ts.map