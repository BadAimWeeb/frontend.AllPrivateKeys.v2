import * as configHandler from "./configHandler.module.js";
import Communicator from "./communicator.module.js";
import Headroom from "./headroom.module.js";
import config from "../config.js";

window.onload = async () => {
    const HNavBar = document.getElementsByClassName("navbar")[0];
    window.renderChangeHandler = async () => {
        let style = getComputedStyle(HNavBar);
        document.body.style.paddingTop = style.height;
    }
    document.addEventListener("resize", window.renderChangeHandler);
    window.renderChangeHandler();

    let headroom = new Headroom(HNavBar);
    headroom.init();

    const HCoinList = document.getElementById("coinList");
    const HBrand = document.getElementById("brand");
    const HItemPerPage = document.getElementById("itemCount");
    const HTable = document.getElementsByClassName("twlist")[0];
    const HCPageNumber = document.getElementById("currentPageNumber");
    const HCPageNumberPadding = document.getElementById("currentPageNumberPadding");
    const HMPageNumber = document.getElementById("maxPageNumber");
    const HRandomButton = document.getElementById("randomPage");
    const HPrevButton = document.getElementById("prevPage");
    const HNextButton = document.getElementById("nextPage");
    const HIPageNumber = document.getElementById("pn");
    HCoinList.innerHTML = ""

    let hd = location.hash.slice(1).split('!').map(x => x.split('@')).flat();

    let currentServer = await configHandler.getCurrentServer();
    let server = await (new Communicator()).connect(currentServer.location, currentServer.mode);

    let currentPage = -1;
    let currentCoin = "";

    // Get supported coins
    let supportedCoins = await server.querySupportedCoin();
    for (let coin of supportedCoins) {
        let e = document.createElement("button");
        e.onclick = () => changeCoin(coin.short);
        e.innerText = coin.name;

        HCoinList.appendChild(e);
    }

    function changeCoin(shortName) {
        currentPage = "-1";
        currentCoin = shortName;
        queryAndRenderInfo();
    }

    async function queryAndRenderInfo() {
        window.location.hash = `@!${currentCoin}@${currentPage}!${HItemPerPage.value}`;

        HBrand.style.color = "transparent";
        let d = await server.getPageInfo(currentCoin, currentPage, HItemPerPage.value);

        let thead = HTable.querySelector("thead");
        let trhead = document.createElement("tr");
        for (let hValue of (d?.header ?? [])) {
            let th = document.createElement("th");
            th.innerHTML = hValue;

            trhead.appendChild(th);
        }
        [...thead.children].forEach(e => thead.removeChild(e));
        thead.appendChild(trhead);

        let tbody = HTable.querySelector("tbody");
        [...tbody.children].forEach(e => tbody.removeChild(e));
        for (let row of (d?.rows ?? [])) {
            let tr = document.createElement("tr");
            for (let value of (row ?? [])) {
                let td = document.createElement("td");
                td.innerHTML = value;
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }

        HCPageNumber.innerText = currentPage = d?.page;
        HMPageNumber.innerText = d?.maxPage;
        HCPageNumberPadding.innerHTML = "&nbsp;".repeat(
            HMPageNumber.innerText.length - HCPageNumber.innerText.length
        );

        HBrand.style.color = "white";
        HBrand.innerText = `AllPrivateKeys: ${supportedCoins.find(c => c.short === currentCoin)?.name}`;

        window.location.hash = `@!${currentCoin}@${currentPage}!${HItemPerPage.value}`;
    }

    if (hd.length - 1) {
        currentCoin = hd[2];
        currentPage = hd[3];
        HItemPerPage.value = hd[4];
        queryAndRenderInfo();
    } else {
        changeCoin(supportedCoins[0].short);
    }

    HRandomButton.addEventListener("click", () => {
        currentPage = "-1";
        queryAndRenderInfo();
    });

    HPrevButton.addEventListener("click", () => {
        currentPage = (BigInt(currentPage) - 1n).toString();
        queryAndRenderInfo();
    });

    HNextButton.addEventListener("click", () => {
        currentPage = (BigInt(currentPage) + 1n).toString();
        queryAndRenderInfo();
    });

    HIPageNumber.addEventListener("focusout", () => {
        if (HIPageNumber.value.length) {
            try {
                BigInt(HIPageNumber.value);
            } catch { return; }
            currentPage = HIPageNumber.value;
            queryAndRenderInfo();
        }
    });

    HIPageNumber.addEventListener("keypress", e => {
        if (e.key === "Enter") {
            document.activeElement.blur();
        }
    });

    HItemPerPage.addEventListener("focusout", () => {
        if (HItemPerPage.value > 100) HItemPerPage.value = 100;
        if (HItemPerPage.value < 1) HItemPerPage.value = 1;
        queryAndRenderInfo();
    });

    HItemPerPage.addEventListener("keypress", e => {
        if (e.key === "Enter") {
            document.activeElement.blur();
        }
    })
}