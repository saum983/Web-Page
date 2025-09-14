const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    let collectHeaderData = fs.readFileSync("header.html", "utf-8");
    let collectFooterData = fs.readFileSync("footer.html", "utf-8");

    let file = req.url;
    if (file === '/') {
        file = 'index.html';
    } else if (!file.endsWith(".html") && file !=="/style.css" && file !== "/background-blur.jpg") {
        file += ".html";
    }

    if (req.url === '/style.css') {
        fs.readFile("style.css", "utf-8", (err, data) => {
            if (err) {
                res.writeHead(500, { "content-type": "text/plain" });
                res.end("CSS NOT FOUND!");
                return false;
            }
            res.writeHead(200, { "content-type": "text/css" });

            res.end(data);
        });
    } else if (req.url === '/background-blur.jpg') {
        fs.readFile("background-blur.jpg", (err, data) => {
            if (err) {
                res.writeHead(500, {"content-type" : "text/plain"});
                res.end("IMAGE NOT FOUND");
                return false;
            }
            res.writeHead(200, {"content-type" : "image/jpeg"});
            res.end(data);
        });
    } else {
        fs.readFile("./" + file, "utf-8", (err, data) => {
            if (err) {
                res.writeHead(500, { "content-type": "text/plain" });
                res.end("Internal Server Error");
                return false;
            }
            res.write(collectHeaderData + data + collectFooterData);
            res.end();
        });
    }

}).listen(6200);