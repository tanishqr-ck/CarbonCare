import Debug "mo:base/Debug";
import Principal "mo:base/Principal";

actor class credit(unit : Text, owner : Principal, issAuth : Text) = this {

  private let itemName = unit;
  private var creditOwner = owner;
  private let issuingAuth = issAuth;

  public query func getUnit() : async Text {
    return itemName;
  };

  public query func getOwner() : async Principal {
    return creditOwner;
  };

  public query func getAuth() : async Text {
    return issuingAuth;
  };

  public query func getCanisterId() : async Principal {
    return Principal.fromActor(this);
  };

  public shared (msg) func transferOwnership(newOwner : Principal) : async Text {

    if (msg.caller != creditOwner) {
      creditOwner := newOwner;
      return "Success";
    } else {
      return "Error: Not initated by Credit Owner.";
    };
  };

};
