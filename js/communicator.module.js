import io from "./socket.io.module.js";
import { testServer } from "./configHandler.module.js";

export default class Communicator {
    connectionData = {};
    location = "";
    method = "";

    constructor() { }

    /** @return {Promise<Communicator>} */
    async connect(location, mode) {
        switch (mode) {
            case "auto":
                if (await testServer(location, "socket")) {
                    return this.connectSocket(location);
                } else {
                    throw new Error("Unknown mode supplied.");
                }
            case "socket":
                return this.connectSocket(location);
            default:
                throw new Error("Unknown mode supplied.");
        }
    }

    async connectSocket(location) {
        let url = new URL(location);
        let socketClient = this.connectionData.socketClient = io(`${url.protocol}//${url.hostname}:${url.port}/apksocket`, {
            path: url.pathname
        });

        this.location = location;
        this.method = "socket";

        return new Promise(r => {
            socketClient.on("connect", () => {
                this.connectionData.mode = "socket";
                socketClient.asend = function asyncSend(...data) {
                    return new Promise(r => {
                        socketClient.send(...data, r);
                    });
                }

                r(this);
            });
        });
    }

    async querySupportedCoin() {
        switch (this.connectionData.mode) {
            case "socket":
                return this.connectionData.socketClient.asend("query_supported_coin");
            default:
                throw new Error("Unknown mode supplied.");
        }
    }

    async getPageInfo(coin, page, count) {
        switch (this.connectionData.mode) {
            case "socket":
                return this.connectionData.socketClient.asend("query_page", coin, page, count);
            default:
                throw new Error("Unknown mode supplied.");
        }
    }
}