import { Logger, Component, Value, LOGGER_CONFIG, Autowired, Optional } from '@malagu/core';
import { Context } from '@malagu/web/lib/node';
import { createLogger, Logger as winstonLogger, transports } from 'winston';
import * as Transport from 'winston-transport';
import * as os from 'os';
import { WinstonConfig } from './winston-logger-protocol';

@Component({ id: Logger, rebind: true })
export class WinstonLogger implements Logger {

  protected logger: winstonLogger;

  constructor (
    @Value(LOGGER_CONFIG)
    protected readonly config: any,
    @Autowired(WinstonConfig)
    @Optional()
    protected readonly winstonConfig1: WinstonConfig
  ) {
    const { winstonConfig } = this.config;
    this.logger = createLogger({
      ...winstonConfig,
      ...winstonConfig1,
      transports: [new transports.Console()]
    });
  }

  public addTransports(transport: Transport[] | Transport) {
    if (Array.isArray(transport)) {
      transport.map(item => this.logger.add(item));
      return;
    }
    this.logger.add(transport);
  }
  public removeTransports(transport: Transport[] | Transport) {
    if (Array.isArray(transport)) {
      transport.map(item => this.logger.remove(item));
      return;
    }
    this.logger.remove(transport);
  }

  public getLogger() {
    return this.logger;
  }

  messagePrefix() {
    const hostname = os.hostname();
    const pid = process.pid;
    if (Context.getCurrent()) {
      const traceId = Context.getTraceId();
      const path = Context.getRequest().path;
      const method = Context.getRequest().method;
      return  `${method.toLocaleUpperCase()} ${path} ( ${pid} on ${hostname})${traceId ? ` with ${traceId}` : ''}`;
      return;
    }

    return `(${pid} on ${hostname})`;
  }

  error(message: string, prefix = this.messagePrefix()) {
    this.logger.error(`${prefix} ${message}`);
  }

  warn(message: string, prefix = this.messagePrefix()) {
    this.logger.warn(`${prefix} ${message}`);
  }

  info(message: string, prefix = this.messagePrefix()) {
    this.logger.info(`${prefix} ${message}`);
  }

  debug(message: string, prefix = this.messagePrefix()) {
    this.logger.debug(`${prefix} ${message}`);
  }

  verbose(message: string, prefix = this.messagePrefix()) {
    this.logger.verbose(`${prefix} ${message}`);
  }
}
