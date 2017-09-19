import request from 'superagent';

const host = 'http://101.200.129.112:9527/';
const GET_FILE = host + 'file/get/';
const RENAME_FILE = host +'file/rename';

export function getFileList(path,successObj,errorObj){
    request
        .get(GET_FILE)
        .query({
            path:path
        })
        .end(function(err,res){
            if(err){return errorCb(err)}
            successObj(res.body);
        })
}

export function rename(query,successObj,errorObj){
    request
        .get(RENAME_FILE)
        .query(query)
        .end(function(err,res){
            if(err){return errorObj(err)}
            successObj(res.body)
        })
}