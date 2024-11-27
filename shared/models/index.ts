export * from './db';

export type BaseEntity = {
  id: string | number;
  property_id?: string | number;
}