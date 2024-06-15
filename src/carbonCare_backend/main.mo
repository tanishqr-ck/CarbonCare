import Principal "mo:base/Principal";
import CreditActorClass "./Credit/credit";
import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Array "mo:base/Array";

actor carbon {
  private type Listing = {
    itemOwner : Principal;
    itemPrice : Nat;
  };
  var tickets = 0;
  var mapOfCredits = HashMap.HashMap<Principal, CreditActorClass.credit>(1, Principal.equal, Principal.hash);
  var mapOfOwners = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);

  var mapOfListings = HashMap.HashMap<Principal, Listing>(1, Principal.equal, Principal.hash);
  public shared (msg) func mint(issAuth : Text, units : Text) : async Principal {

    tickets := 0;
    Debug.print(debug_show ("hello"));
    let owner : Principal = msg.caller;
    Debug.print(debug_show (Cycles.balance()));
    Cycles.add(100_500_000_000);
    let newCredit = await CreditActorClass.credit(units, owner, issAuth);
    Debug.print(debug_show (Cycles.balance()));

    let newCreditPrincipal = await newCredit.getCanisterId();
    mapOfCredits.put(newCreditPrincipal, newCredit);
    addToOwnershipMap(owner, newCreditPrincipal);
    return newCreditPrincipal;
  };

  private func addToOwnershipMap(owner : Principal, CreditId : Principal)

  {
    var ownedCredits : List.List<Principal> = switch (mapOfOwners.get(owner)) {
      case null List.nil<Principal>();
      case (?notnull) notnull;

    };

    ownedCredits := List.push(CreditId, ownedCredits);
    mapOfOwners.put(owner, ownedCredits);

  };

  public query func getOwnedCredits(user : Principal) : async [Principal] {
    var userCredits : List.List<Principal> = switch (mapOfOwners.get(user)) {
      case null List.nil<Principal>();
      case (?notnull) notnull;
    };
    Debug.print(debug_show ("MapofOwners", userCredits));
    return List.toArray(userCredits);
  };

  public query func getListedCredits() : async [Principal] {
    let ids = Iter.toArray(mapOfListings.keys());
    Debug.print(debug_show ("MapofListings", ids));
    return ids;
  };

  public shared (msg) func listItem(id : Principal, price : Nat) : async Text {
    var item : CreditActorClass.credit = switch (mapOfCredits.get(id)) {
      case null return "Credit does not exist.";
      case (?result) result;
    };
    let owner = await item.getOwner();
    if (Principal.equal(owner, msg.caller)) {
      let newListing : Listing = {
        itemOwner = owner;
        itemPrice = price;
      };
      mapOfListings.put(id, newListing);
      return "Success";
    } else {
      return "Operation Denied!!!";
    };
  };
  public query func getcarbonCanisterId() : async Principal {
    return Principal.fromActor(carbon);

  };
  public query func isListed(id : Principal) : async Bool {
    if (mapOfListings.get(id) == null) {
      return false;
    } else { return true };
  };
  public query func getListedCreditPrice(id : Principal) : async Nat {
    var listing : Listing = switch (mapOfListings.get(id)) {
      case null return 0;
      case (?result) result;
    };
    return listing.itemPrice;
  };
  public query func getOriginalOwner(id : Principal) : async Principal {
    var listing : Listing = switch (mapOfListings.get(id)) {
      case null return Principal.fromText("");
      case (?result) result;
    };

    return listing.itemOwner;
  };
  public shared (msg) func completePurchase(id : Principal, ownerId : Principal, newOwnerId : Principal) : async Text {
    var purchasedCredit : CreditActorClass.credit = switch (mapOfCredits.get(id)) {
      case null return "Credit does not exist";
      case (?result) result;
    };

    let transferResult = await purchasedCredit.transferOwnership(newOwnerId);
    if (transferResult == "Success") {
      mapOfListings.delete(id);
      var ownedCredits : List.List<Principal> = switch (mapOfOwners.get(ownerId)) {
        case null List.nil<Principal>();
        case (?result) result;
      };
      ownedCredits := List.filter(
        ownedCredits,
        func(listItemId : Principal) : Bool {
          return listItemId != id;
        },
      );

      addToOwnershipMap(newOwnerId, id);
      return "Success";
    } else {
      Debug.print("hello");
      return transferResult;

    };
  };

  //Token code goes here.
  var owner : Principal = Principal.fromText("kllr6-rv53e-6pyzg-m7axo-dzq2t-csykq-xcxnj-vtua3-jz3wj-hkm5b-rqe");
  var totalSupply : Nat = 1000000000;
  var symbol : Text = "RPT";
  Debug.print(debug_show ("hello"));
  private stable var balanceEntries : [(Principal, Nat)] = [];
  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  if (balances.size() < 1) {
    balances.put(owner, totalSupply);
  };
  public query func balanceOf(who : Principal) : async Nat {
    let balance : Nat = switch (balances.get(who)) {
      case null 0;
      case (?result) result;
    };
    return balance;
  };
  public query func getSymbol() : async Text {
    return symbol;
  };
  public shared (msg) func claimToken() : async Text {
    Debug.print(debug_show (msg.caller));
    if (balances.get(msg.caller) == null) {
      let amount : Nat = 10000;
      let result = await transfer(msg.caller, amount);
      return result;
    } else return "Already Claimed";
  };
  public shared (msg) func transfer(to : Principal, amount : Nat) : async Text {
    let fromBalance : Nat = await balanceOf(msg.caller);
    if (fromBalance > amount) {
      let newFromBalance : Nat = fromBalance -amount;
      balances.put(msg.caller, newFromBalance);
      let toBalance : Nat = await balanceOf(to);
      let newAmount : Nat = toBalance +amount;
      balances.put(to, newAmount);

      return "Successfully transferred";
    } else return "Insufficient balance";
  };
  public shared (msg) func getCaller() : async Principal {
    return msg.caller;
  };
  system func preupgrade() {
    balanceEntries := Iter.toArray(balances.entries());
  };
  system func postupgrade() {
    balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
    if (balances.size() < 1) {
      balances.put(owner, totalSupply);
    };
  };

  public query func getTicketStatus() : async Nat {
    return tickets;
  };

  public shared (msg) func issueTicket(value : Nat) : async Text {
    tickets := value;
    return "success";
  };
};
