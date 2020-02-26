import { Logger, Component, Value, LOGGER_CONFIG } from '@malagu/core';
import { Context } from '@malagu/web/lib/node';
import { createLogger, Logger as winstonLogger } from 'winston';
import * as Transport from 'winston-transport';
import * as os from 'os';

@Component({ id: Logger, rebind: true })
export class WinstonLogger implements Logger {

  protected logger: winstonLogger;

  protected prefix = '';

  constructor (
    @Value(LOGGER_CONFIG)
    protected readonly config: any
  ) {
    const { winstonConfig } = this.config;
    this.logger = createLogger({
      ...winstonConfig,
    });
  }

  public addTransports(transports: Transport[] | Transport) {
    if (Array.isArray(transports)) {
      transports.map(transport => this.logger.add(transport));
      return;
    }
    this.logger.add(transports);
  }
  public removeTransports(transports: Transport[] | Transport) {
    if (Array.isArray(transports)) {
      transports.map(transport => this.logger.remove(transport));
      return;
    }
    this.logger.remove(transports);
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
      this.prefix = `${traceId} ${method.toLocaleUpperCase()} ${path} on ${hostname} in pid[${pid}]`;
      return;
    }

    this.prefix = `${hostname} in pid[${pid}]`;
  }

  error(message: string) {
    this.logger.error(`${this.prefix} ${message}`);
  }

  warn(message: string) {
    this.logger.warn(`${this.prefix} ${message}`);
  }

  info(message: string) {
    this.logger.info(`${this.prefix} ${message}`);
  }

  debug(message: string) {
    this.logger.debug(`${this.prefix} ${message}`);
  }

  verbose(message: string) {
    this.logger.verbose(`${this.prefix} ${message}`);
  }
}
