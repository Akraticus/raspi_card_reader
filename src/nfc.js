const NFC = require("nfc-pcsc");

const nfc = new NFC();

nfc.on("reader", reader => {
    reader.on("card", card => {
        console.log(card.uid);
    });

    reader.on("error", error => {
        console.log("Reader Error: " + error);
    });

    reader.on("end", () => {
        console.log("Reader disconnected");
    });
});

nfc.on("error", error => {
    console.log("NFC Error: " + error);
});