import winston from "winston";

const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.cli(),
    transports: [new winston.transports.Console()],
});

export default logger;