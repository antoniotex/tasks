require('dotenv/config')

const config = {
    development: {
        dialect: "mssql",
        server: "localhost",
        username: "sa",
        password: "#Atex8612#",
        database: "tasks",
        dialectModulePath: "tedious",
        dialectOptions: {
            options: {
                encrypt: true,
                trustServerCertificate: true
            },
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
console.log(process.env.NODE_ENV)
module.exports = config[process.env.NODE_ENV || `development`]