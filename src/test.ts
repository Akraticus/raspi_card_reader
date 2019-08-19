import moment = require("moment");
import {writeRecord} from "./dataWriter";

writeRecord({
        uid: Math.floor(Math.random() * 1000000).toString(), 
        dateTime: moment()
    });