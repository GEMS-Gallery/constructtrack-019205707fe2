export const idlFactory = ({ IDL }) => {
  const SupplyItem = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'unit' : IDL.Text,
    'quantity' : IDL.Nat,
  });
  return IDL.Service({
    'addSupplyItem' : IDL.Func([IDL.Text, IDL.Nat, IDL.Text], [IDL.Nat], []),
    'getInventory' : IDL.Func([], [IDL.Vec(SupplyItem)], ['query']),
    'removeSupplyItem' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'updateSupplyItem' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Nat, IDL.Text],
        [IDL.Bool],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
