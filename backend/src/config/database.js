require('dotenv/config')

const config = {
    development: {
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
    },
    production: {
        database: process.env.SQL_DATABASE,
        dialect: "mssql",
        dialectModulePath: "tedious",
        host: process.env.SQL_HOST,
        username: process.env.SQL_USERNAME,
        password: process.env.SQL_PASSWORD,
        dialectOptions: {
            options: {
                encrypt: true,
                trustServerCertificate: true
            }
        },
        define: {
            timestamps: true,
            underscored: true
        }
    }
}

module.exports = config[process.env.NODE_ENV]