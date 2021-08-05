import React from "react";
import Link from "next/link";
import { CORE_NPM, GITHUB_URL } from "../../lib/settings";

export const Footer = () => (
  <footer className="footer footer-transparent d-print-none">
    <div className="container">
      <div className="row text-center align-items-center flex-row-reverse">
        <div className="col-lg-auto ms-lg-auto">
          <ul className="list-inline mb-0">
            <li className="list-inline-item">
              <Link href={GITHUB_URL}>
                <a className="link-secondary">github</a>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link href={`https://www.npmjs.com/package/${CORE_NPM}`}>
                <a className="link-secondary">{CORE_NPM}</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-12 col-lg-auto mt-3 mt-lg-0">
          <ul className="list-inline mb-0">
            <li className="list-inline-item">
              Copyright © 2021
              <Link href="https://andrey.yatsyk.com">
                <a className="link-secondary"> Andrey Yatsyk</a>
              </Link>
              . All rights reserved.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);
