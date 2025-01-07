// src/components/SyncView.jsx
import { h } from "preact";
import { useState } from "preact/hooks";
import { loadAllConfigs, saveAllConfigs } from "../utils/configStorage.js";
import {
  uploadConfigsToServer,
  downloadConfigsFromServer,
} from "../utils/ServerSync.js";

export function SyncView() {
  const [status, setStatus] = useState("");
  const [serverData, setServerData] = useState(null);

  const handleUpload = async () => {
    setStatus("Uploading...");
    const local = loadAllConfigs();
    const result = await uploadConfigsToServer(local);
    if (result.success) {
      setStatus("Upload succeeded");
    } else {
      setStatus("Upload failed");
    }
  };

  const handleDownload = async () => {
    setStatus("Downloading...");
    const result = await downloadConfigsFromServer();
    if (result.success) {
      // Overwrite local storage
      saveAllConfigs(result.serverConfigs);
      setServerData(result.serverConfigs);
      setStatus("Download succeeded (local configs replaced)");
    } else {
      setStatus("Download failed");
    }
  };

  return (
    <div>
      <h2>Sync with Server</h2>
      <p style={{ margin: "0.5rem 0" }}>{status}</p>
      <button onClick={handleUpload} style={btnStyle}>
        Upload Local → Server
      </button>
      <button onClick={handleDownload} style={btnStyle}>
        Download Server → Local
      </button>

      {serverData && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Server Configs</h3>
          <pre style={{ background: "#eee", padding: "0.5rem" }}>
            {JSON.stringify(serverData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

const btnStyle = {
  marginRight: "1rem",
  background: "#666",
  color: "#fff",
  border: "none",
  padding: "0.4rem 0.8rem",
  cursor: "pointer",
};
