module.exports = {
    secret: process.env.NODE_ENV === "production" ? process.env.SECRET : "AF908DF09D09809FD809FDW09W09W908",
    api: process.env.NODE_ENV === "production" ? "http://api.gabrielvidal.com.br" : "http://localhost:3000",
    loja: process.env.NODE_ENV === "production" ? "http://gabrielvidal.com.br" : "http://localhost:8000"
}