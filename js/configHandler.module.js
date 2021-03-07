import config from "../config.js";

export async function getCurrentServer() {
    let lsServerConfig = localStorage.getItem("APK_CurrentServer");
    if (lsServerConfig) {
        try {
            let lssc = JSON.parse(lsServerConfig);
            if (lssc && typeof lssc.location === "string" && typeof lssc.mode === "string") {
                return {
                    location: lssc.location,
                    mode: lssc.mode,
                    defaultPos: config.defaultServers.findIndex(v => v.location === lssc.location)
                }
            }
        } catch {
            return autoSelectServers();
        }
    } else {
        return autoSelectServers();
    }
}

export async function autoSelectServers() {
    for (let serverLoc in config.defaultServers) {
        let server = config.defaultServers[serverLoc];
        if (server.mode === "auto") {
            for (let mode of ["socket"]) {
                if (await testServer(server.location, mode)) {
                    return {
                        location: server.location,
                        mode: server.mode,
                        defaultPos: +serverLoc
                    }
                }
            }
        } else {
            if (await testServer(server.location, server.mode)) {
                return {
                    location: server.location,
                    mode: server.mode,
                    defaultPos: +serverLoc
                }
            }
        }
    }

    return {
        location: "http://localhost:3000/apksocket",
        mode: "auto",
        defaultPos: -1
    }
}

export async function testServer(location, mode) {
    let urlObj = new URL(location);
    urlObj.href += "ping?mode=" + mode;
    try {
        let pingRequest = await fetch(urlObj.toString());
        return pingRequest.ok;
    } catch {
        return false;
    }
}
