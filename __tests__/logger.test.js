import { logger } from '../dist/index.js';

describe('Logger', () => {
    test('Test', () => {
        const Logger = logger({
            level: 'debug',
            transport: {
                target: 'pino-pretty',
                options: {colorize: true, translateTime: "SYS:mm-dd HH:MM:ss"}
            },
            base: {}
        });
        expect(Logger).toBeTruthy();
    });
});