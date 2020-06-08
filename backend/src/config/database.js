module.exports = {
    dialect: "mssql",
    server: "DESKTOP-EVHUFLE",
    username: "sa",
    password: "861260",
    database: "tasks",
    dialectModulePath: "tedious",
    dialectOptions: {
        driver: "SQL Server Native Client 11.0",
        trustedConnection: true
    },
    host: "localhost",
    port: 1433,
    logging: false,
    options: {
        encrypt: false,
        // enableArithAbort: true,
        // trustServerCertificate: true
    },
    define: {
        timestamps: true,
        underscored: true
    }
}