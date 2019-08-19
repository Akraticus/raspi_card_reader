import Path from "path";
import Moment from "moment";
import {createObjectCsvWriter} from "csv-writer";
import Fs from "fs";
import { csvSaveDirectory } from "./writer.config";

export interface Record{
    uid:string,
    dateTime:Moment.Moment
}

/**
 * Writes the record to the appropriate file.
 * The file written to is named by the date of the record: "YYYY-MM-DD.csv"
 * If the file doesn't exist, it is created. If the file exists, the record is appended to it.
 * @param {Record} record
 * @returns {Promise<boolean>}
 */
export async function writeRecord(record:Record):Promise<boolean>{
    let path = getCurrentFilePath(record.dateTime);

    let doesExist = false;
    return dirExists(path)
        .then(exists => {
            let dir = Path.dirname(path);
            return exists ? new Promise(() => true) : Fs.promises.mkdir(dir, {recursive: true});
        })
        .then(() => fileExists(path))
        .then(exists => {
            doesExist = exists;
            return Fs.promises.open(path, "a+");
        })
        .then(() => {
            let headers = [{id: "uid", title: "UID"}, {id: "dateTime", title: "DateTime"}];
            let writer = createObjectCsvWriter({path: path, header: headers, append: doesExist});
            return writer.writeRecords([record])
        })
        .then(() => true, () => false);
}

export function getCurrentFilePath(dateTime?:Moment.Moment){
    dateTime = dateTime ? dateTime : Moment();
    let currentDate =  dateTime.format("YYYY-MM-DD");
    return Path.join(csvSaveDirectory, currentDate + ".csv");
}

export function fileExists(path:string):Promise<boolean>{
    return Fs.promises.access(path, Fs.constants.F_OK)
        .then(() => true, () => false);
}

export function dirExists(dirPath:string):Promise<boolean>{
    return Fs.promises.stat(dirPath)
    .then(v => v.isDirectory(), () => false);
    
}