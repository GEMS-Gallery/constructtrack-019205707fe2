import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface SupplyItem {
  'id' : bigint,
  'name' : string,
  'unit' : string,
  'quantity' : bigint,
}
export interface _SERVICE {
  'addSupplyItem' : ActorMethod<[string, bigint, string], bigint>,
  'getInventory' : ActorMethod<[], Array<SupplyItem>>,
  'removeSupplyItem' : ActorMethod<[bigint], boolean>,
  'updateSupplyItem' : ActorMethod<[bigint, string, bigint, string], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
