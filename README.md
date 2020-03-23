# Malagu - Winston Logger
该组件是基于[malagu](https://github.com/muxiangqiu/malagu)框架，结合[winston](https://github.com/winstonjs/winston)开发
的一款组件。

### 组件安装

```
$ yarn add malagu-winston
```

或

```
$ npm install malagu-winston
```

### 组件配置
因为是基于winston的，所以winston的所有配置，该组件都支持，比如：

```yaml
malagu:
  logger:
    winstonConfig:
      level: 'info'
```

所有的配置都挂在`malagu.logger.winstonConfig`，如果配置是个函数类型的，该组件还提供依赖注入的方式导入配置，比如winston的
transport配置。**该组件默认只引入`ConsoleTransport`。**

举个例子(示例来源于[doumi-blog](https://github.com/linxiaowu66/doumi-blog))，我们需要引入`winston-daily-rotate-file`这个transport，那么配置如下：

```yaml
malagu:
  logger:
    winstonConfig:
      level: 'info'
    dailyRotateConfig:
      frequency: '24h'
      filename: 'doumi-blog-%DATE%.log'
      dirname: './log'
```

然后定义一个config的文件，如下：

```typescript
import { Component, Value, LOGGER_CONFIG } from '@malagu/core';
import { WinstonConfig } from 'malagu-winston';
import { format, transports } from 'winston';
import * as Transport from 'winston-transport';

const DailyRotateFile = require('winston-daily-rotate-file');

@Component(WinstonConfig)
export class WinstonConfigImpl implements WinstonConfig {
  transports: Transport[];

  constructor(
    @Value(LOGGER_CONFIG)
    protected readonly config: any,
    @Value('mode')
    protected readonly mode: string
  ) {
    const { dailyRotateConfig } = this.config;
    this.transports = [
      new DailyRotateFile({
        ...dailyRotateConfig,
        format: format.combine(
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss,SSS'}),
          format.simple(),
          format.printf(msg =>
            `${msg.timestamp} - ${msg.level}: ${msg.message}`
          )
        ),
      }),
    ];
    if (this.mode.includes('local')) {
      this.transports.push(new transports.Console({
        format: format.combine(
          format.colorize(),
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss,SSS'}),
          format.simple(),
          format.printf(msg =>
            `${msg.timestamp} - ${msg.level}: ${msg.message}`
          )
        ),
      }));
    };
  }
}

```

于是就可以开心地使用该组件了

### 组件的使用
直接依赖注入该组件即可：
```
import { Autowired, Logger } from '@malagu/core';
import { WinstonLogger } from 'malagu-winston';

export class Test {
  @Autowired(Logger) logger: WinstonLogger;

  testMe() {
    this.logger.info('test me!'); // INFO  test me
  }
}
```
