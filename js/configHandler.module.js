import config from "../config.js";

export async function getCurrentServer() {
    return autoSelectServers();
}

export async function autoSelectServers() {
    let servers = config.defaultServers.filter(v => {
        if (v.timeRestrict) {
            let c = new Date();
            if (v.timeRestrict.day && 
                (v.timeRestrict.day[0] > c.getUTCDate() || v.timeRestrict.day[1] < c.getUTCDate())
            ) return false;

            return true;
        } else return true;
    }).sort((a, b) => {
        let v = b.weight - a.weight;
        if (v === 0) return Math.random() - 0.5;
        return v;
    });

    for (let server of servers) {
        if (server.mode === "auto") {
            for (let mode of ["socket"]) {
                if (await testServer(server.location, mode)) {
                    return {
                        location: server.location,
                        mode: server.mode
                    }
                }
            }
        } else {
            if (await testServer(server.location, server.mode)) {
                return {
                    location: server.location,
                    mode: server.mode
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
