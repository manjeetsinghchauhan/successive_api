module.exports = {
    port: process.env.PORT || 3000,
    db: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      options: {
        dialect: process.env.DIALECT || 'mysql',
        host: process.env.HOST || 'localhost',
        logging: false,
        port: '3306',
        freezeTableName: true,
        operatorsAliases: false,
        define: {
          charset: 'utf8',
          collate: 'utf8_general_ci',
          timestamps: true
        }
      }
    }
}