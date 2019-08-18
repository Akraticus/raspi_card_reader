import * as DataWriter from "../src/dataWriter";
import moment = require("moment");
import Path from "path";

class TestRecord implements DataWriter.Record {
    uid: string;    
    dateTime: moment.Moment;

    constructor(uid, dateTime) {
        this.uid = uid;
        this.dateTime = dateTime;
    }
}

test("getCurrentFilePath() -  returns expected file name", () => {
    
    let date = moment("2019-08-12", "YYYY-MM-DD");
    let filePath = DataWriter.getCurrentFilePath(date);
    let extension = Path.extname(filePath);
    let fileName = Path.basename(filePath);
    expect(extension).toBe(".csv");
    expect(fileName).toBe(date.format("YYYY-MM-DD") + ".csv");
});

test("writeRecord() - success", async () => {
    
    let date = moment("2019-08-12", "YYYY-MM-DD");
    try{
        let success = await DataWriter.writeRecord(new TestRecord(Math.round(Math.random() * 100000), date));
        expect(success).toBe(true);
    }
    catch(err){
        fail(err);
    }
});

test("writeRecord() - success for today's date", async () => {
    
    let date = moment();
    try{
        let success = await DataWriter.writeRecord(new TestRecord(Math.round(Math.random() * 100000), date));
        expect(success).toBe(true);
    }
    catch(err){
        fail(err);
    }
});

test("dirExists() - directory does not exist", async() => {
    let path = "this/path/does/not/exist";
    let success = await DataWriter.dirExists(path);
    expect(success).toBe(false);
});

test("dirExists() - directory exists", async() => {
    let date = moment("2019-08-12", "YYYY-MM-DD");

    let path = DataWriter.getCurrentFilePath(date);
    let success = await DataWriter.dirExists(path);
    expect(success).toBe(false);
});