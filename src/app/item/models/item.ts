// ใน models/item.ts
export interface Item {
  id: number;
  title: string;
  amount: number;
  quantity: number;
  status: string; // ปรับ status ให้เป็น string
  owner_id: number;
}

export enum ItemStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}
