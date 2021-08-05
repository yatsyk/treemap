import { observer } from "mobx-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FolderStatApp } from "../../../store/FolderStatApp/FolderStatApp";
import { APP_NAME } from "../settings";
import Image from "next/image";

type Props = {
  app: FolderStatApp;
};

export const Landing = observer((props: Props) => {
  const { app } = props;
  const filesRef = useRef(null);
  const disabled = false;

  return (
    <div style={{ minHeight: "100%", display: 'flex',flexDirection: 'column'  }}>
      <div style={{ height: 30, backgroundColor: "white" }} className="header">
        <div className="container">
          <div className="d-flex align-items-center position-relative">
            <Link href="/">
              <a href="/" className="logo">
                <div>Treemaps</div>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-primary" style={{}}>
        <div className="container" style={{ padding: 10, color: "white" }}>
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-6 text-center text-lg-left pr-lg-5">
              <h1 className="welcome-title" style={{ fontSize: 44 }}>
                {APP_NAME}
              </h1>
              <p className="welcome-description">
                Immediately understand what file or files consume disk space by
                visualizing folder as squarified{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Treemapping"
                  target="wikipedia"
                  style={{ color: "white" }}
                >
                  tree map
                </a>
                .
              </p>
            </div>
            <div className="col-lg-5 pt-6 pt-lg-0">
              <div className="welcome-image welcome-image-2">
                <div className="device device-macbook-pro device-spacegray">
                  <Image
                    src={"/appui.jpg"}
                    width={1024 / 2}
                    height={503 / 2}
                    alt="screenshot"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: 10 }}>
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header">
            <h3 className="">Browse folder from this webapp</h3>
          </div>
          <div className="card-body">
            {app.isFileApiSupported ? (
              <div>
                Click{" "}
                <button
                  onClick={() => app.showOpenFolderFileAccess()}
                  className="btn btn-primary"
                >
                  Select Folder
                </button>{" "}
                to open folder you want to analyze. Please note that this
                application doesn't make any modifications of your computer file
                system. Any information about files is never left your computer
                and all visulalization performed client side.
              </div>
            ) : (
              <div>
                Your borwser doent's supprt{" "}
                <a
                  href="https://wicg.github.io/file-system-access/"
                  target="wicg"
                >
                  File System Access
                </a>
                , please use{" "}
                <a
                  href="https://caniuse.com/native-filesystem-api"
                  target="caniuse"
                >
                  browser that supports this API
                </a>{" "}
                to analyze folders on your computer
              </div>
            )}
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="">
              Upload <em>du</em> report
            </h3>
          </div>
          <div className="card-body">
            Run command{" "}
            <code className="language-plaintext highlighter-rouge">
              du -ab PATH &gt; report.txt
            </code>
            . Mac version of{" "}
            <code className="language-plaintext highlighter-rouge">du</code>{" "}
            utility doesn't support <b>b</b> flag, so information will be
            provided in blocks.{" "}
            <input
              ref={filesRef}
              type="file"
              hidden
              onChange={(evt) => {
                app.loadDuFile(filesRef.current?.files[0]);
                evt.preventDefault();
              }}
            />
            <button
              onClick={(evt) => {
                filesRef.current?.click();
                evt.preventDefault();
              }}
              disabled={disabled}
              className="btn btn-primary"
            >
              Upload
            </button>{" "}
            <code className="language-plaintext highlighter-rouge">
              report.txt
            </code>
            .
          </div>
        </div>
      </div>
      <footer className="footer footer-transparent d-print-none">
        <div className="container">
          <div className="row text-center align-items-center flex-row-reverse">
            <div className="col-lg-auto ms-lg-auto">
              <ul className="list-inline mb-0"></ul>
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
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
        }
      `}</style>
    </div>
  );
});
