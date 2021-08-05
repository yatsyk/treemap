import { observer } from "mobx-react";
import React from "react";
import { GITHUB_URL } from "../../lib/settings";
import { MainPreview } from "../MainPreview/MainPreview";
import { Footer } from "./Footer";
import { ForkCorner } from "./ForkCornet";

export const Layout = observer((props) => {
  const { children } = props;
  return (
    <div className="wrapper">
      <div className="page-wrapper">
        <MainPreview />
        <ForkCorner />
        <div className="container">
          <div className="page-header d-print-none">
            <div className="row align-items-center">
              <div className="col">
                <h2 className="page-title">Cushion Treemap</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="page-body">
          <div className="container-xl">
            <div className="card card-lg">
              <div className="card-body">{children}</div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
});
