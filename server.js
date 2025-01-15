
const http = require("http");
const app = require("./app"); 

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Serwer nasłuchuje na porcie ${port}`);
});

server.on("error", (error) => {
    console.error("Błąd serwera:", error.message);
});
