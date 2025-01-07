// src/utils/serverSync.js

// In-memory server DB
let serverData = {
    // e.g. "user123": { "Bar A": { ...barData }, "Bar B": { ... } }
};

// Fake user ID for the example
const USER_ID = 'demoUser';

// Sync all local configs to the server
export function uploadConfigsToServer(localConfigs) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (!serverData[USER_ID]) {
                serverData[USER_ID] = {};
            }
            // Merge or overwrite
            serverData[USER_ID] = { ...localConfigs };
            resolve({ success: true, serverConfigs: serverData[USER_ID] });
        }, 0); // Simulate network delay
    });
}

// Download configs from the server to local
export function downloadConfigsFromServer() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const userConfigs = serverData[USER_ID] || {};
            resolve({ success: true, serverConfigs: userConfigs });
        }, 0);
    });
}


// // Real example with fetch/axios:
// export async function uploadConfigsToServer(localConfigs) {
//     const response = await fetch('/api/sync', {
//       method: 'POST',
//       body: JSON.stringify(localConfigs),
//       headers: { 'Content-Type': 'application/json' },
//     });
//     const data = await response.json();
//     return data;
//   }
// export async function downloadConfigsFromServer() {
//     const response = await fetch('/api/sync');
//     const data = await response.json();
//     return data;
// }
