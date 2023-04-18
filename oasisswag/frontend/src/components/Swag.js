import React from "react";
import {TransactionErrorMessage} from "./TransactionErrorMessage";

export function Swag({ drawSwag, swag }) {
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
              <div style={{marginTop:"-300px"}}>
                <h4>Congratulations!</h4>
                <h5>{swag.name}</h5>
                <img src={"data:"+swag.image} alt={swag.name} />
              </div>
          )}
      </div>
    </div>
  );
}
