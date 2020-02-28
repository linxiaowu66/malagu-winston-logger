import * as winston from 'winston';

export const WinstonConfig = Symbol('WinstonConfig');

export interface WinstonConfig extends winston.LoggerOptions {

}
