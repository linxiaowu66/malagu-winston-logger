import { Logger, Component, Value, LOGGER_CONFIG } from '@malagu/core';
import { Context } from '@malagu/web/lib/node';
import * as os from 'os';

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

@Component({ id: Logger, rebind: true })
export class WinstonLogger implements Logger {
  @Value(LOGGER_CONFIG)
  protected readonly config: any;

  protected logger: Logger;

  constructor () {
    const { dailyRotateConfig, winstonConfig } = this.config;
    const transport = new DailyRotateFile(dailyRotateConfig);
    this.logger = winston({
      ...winstonConfig,
      transports: [transport]
    });
    this.proxyLogger(this.defaultPrefix());
  }

  proxyLogger(prefix: string) {
    new Proxy(this.logger, {
      get(target, propKey: string) {
        if (!['error', 'warn', 'info', 'debug', 'verbose'].includes(propKey)) {
          return function(...argument: any[]) {
            return origMethod.apply(undefined, ...argument);
          };
        }
        const origMethod = target[propKey as 'error'|'warn'|'info'|'debug'|'verbose'];
        return function(...argument: any[]) {
          return origMethod.apply(undefined, [prefix, ...argument]);
        };
      }
    });
  }

  defaultPrefix() {
    const traceId = Context.getTraceId();
    const path = Context.getRequest().path;
    const method = Context.getRequest().method;
    const hostname = os.hostname();
    const pid = process.pid;

    return `${traceId} ${method.toLocaleUpperCase()} ${path} on ${hostname} in pid[${pid}]`;
  }

  error(message: string) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  info(message: string) {
    this.logger.info(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
