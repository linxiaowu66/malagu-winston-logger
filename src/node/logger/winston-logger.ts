import { Logger, Component, Value, LOGGER_CONFIG } from '@malagu/core';
import { Context } from '@malagu/web/lib/node';
import { createLogger, Logger as winstonLogger, transports } from 'winston';
import * as Transport from 'winston-transport';
import * as os from 'os';

@Component({ id: Logger, rebind: true })
export class WinstonLogger implements Logger {

  protected logger: winstonLogger;

  constructor (
    @Value(LOGGER_CONFIG)
    protected readonly config: any
  ) {
    const { winstonConfig } = this.config;
    this.logger = createLogger({
      ...winstonConfig,
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
      return  `${traceId ? `${traceId}` : ' '}${method.toLocaleUpperCase()} ${path} on ${hostname} in pid[${pid}]`;
      return;
    }

    return `${hostname} in pid[${pid}]`;
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
