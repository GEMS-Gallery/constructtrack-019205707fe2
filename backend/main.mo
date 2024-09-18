import Bool "mo:base/Bool";
import Func "mo:base/Func";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

actor {
  // Define the SupplyItem type
  type SupplyItem = {
    id: Nat;
    name: Text;
    quantity: Nat;
    unit: Text;
  };

  // Create a stable variable to store the next available ID
  stable var nextId: Nat = 0;

  // Create a stable variable to store the inventory data
  stable var inventoryEntries: [(Nat, SupplyItem)] = [];

  // Initialize the inventory HashMap
  var inventory = HashMap.fromIter<Nat, SupplyItem>(inventoryEntries.vals(), 10, Nat.equal, Nat.hash);

  // Function to add a new supply item
  public func addSupplyItem(name: Text, quantity: Nat, unit: Text) : async Nat {
    let id = nextId;
    nextId += 1;
    let newItem: SupplyItem = {
      id;
      name;
      quantity;
      unit;
    };
    inventory.put(id, newItem);
    id
  };

  // Function to update an existing supply item
  public func updateSupplyItem(id: Nat, name: Text, quantity: Nat, unit: Text) : async Bool {
    switch (inventory.get(id)) {
      case (null) {
        false
      };
      case (?existingItem) {
        let updatedItem: SupplyItem = {
          id;
          name;
          quantity;
          unit;
        };
        inventory.put(id, updatedItem);
        true
      };
    };
  };

  // Function to remove a supply item
  public func removeSupplyItem(id: Nat) : async Bool {
    switch (inventory.remove(id)) {
      case (null) { false };
      case (?_) { true };
    };
  };

  // Function to get the current inventory
  public query func getInventory() : async [SupplyItem] {
    Iter.toArray(inventory.vals())
  };

  // Pre-upgrade hook to store the inventory data
  system func preupgrade() {
    inventoryEntries := Iter.toArray(inventory.entries());
  };

  // Post-upgrade hook to restore the inventory data
  system func postupgrade() {
    inventory := HashMap.fromIter<Nat, SupplyItem>(inventoryEntries.vals(), 10, Nat.equal, Nat.hash);
  };
}
