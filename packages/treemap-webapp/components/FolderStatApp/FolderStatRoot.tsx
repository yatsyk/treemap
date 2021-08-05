import { observer } from "mobx-react";
import useDimensions from "react-cool-dimensions";
import React, { useEffect, useState } from "react";
import { FolderStatApp } from "../../store/FolderStatApp/FolderStatApp";
import { OpenedFolderPage } from "./OpenedFolderPage";
import { Landing } from "./Landing/Landing";

export const FolderStatRoot = observer(() => {
  const [app, setApp] = useState<FolderStatApp | null>(null);
  useEffect(() => {
    setApp(new FolderStatApp());
  }, []);

  return (
    app && (app.folder ? <OpenedFolderPage app={app} /> : <Landing app={app} />)
  );
});
