import React from "react";
import {TransactionErrorMessage} from "./TransactionErrorMessage";

export function Swag({ addr, claimSwag, drawSwag, swag, swagTokenId }) {
  return (
    <div className="text-center">
      <h4>Get Oasis Swag!</h4>
      <button
            className="btn btn-warning"
            type="button"
            onClick={drawSwag}
      >
        Spin the wheel!
      </button>
      <div>
        <img
            alt="wheel"
            id="wheel"
            src={process.env.PUBLIC_URL + "/wheel.svg"}
            className={swag ? "blur" : ""}
        />
          {swag && (
              <div /*style={{marginTop:"-300px"}}*/>
                <h4>Congratulations!</h4>
                <h5>{swag.name}</h5>
                <img src={swag.image} alt={swag.name} />
              </div>
          )}
          {swag && (<button
              className="btn btn-warning"
              type="button"
              onClick={claimSwag}
          >
              Add Swag to your NFT collection
          </button>)}
          {swagTokenId && (
              <div>
                  <h4>NFT claimed</h4>
                  If it doesn't show up in your wallet, add it manually:
                  <p>Contract address: {addr}</p>
                  <p>Token ID: {swagTokenId}</p>
              </div>
          )}
      </div>
    </div>
  );
}
