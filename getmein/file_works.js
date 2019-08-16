var fs = require('fs')
    , es = require('event-stream');


function processLogFile(){
    var lineNr = 0;

    var s = fs.createReadStream('/opt/projects/logs')
        .pipe(es.split())
        .pipe(es.mapSync(function(line){

            // pause the readstream
            s.pause();

            lineNr += 1;

            // process line here and call s.resume() when rdy
            // function below was for logging memory usage
            logMemoryUsage(lineNr);

            // resume the readstream, possibly from a callback
            s.resume();
        })
        .on('error', function(err){
            console.log('Error while reading file.', err);
        })
        .on('end', function(){
            console.log('Read entire file.')
        })
    );
}


//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join('/opt/storage/logs/');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file); 
    });
});