const Logger = require("../src/Logger");
const logger = new Logger();

test("Debug message", () => {
    logger.debug("Simple log message.");
    const log = logger.getLast();
    expect(log).toMatchObject({
        date: expect.any(Number),
        level: 0,
        message: expect.stringMatching(/Simple log message./),
        markers: []
    });
    expect(log.details).toBe(undefined);
});

test("Info message with details", () => {
    logger.info("Simple log message.", {some: "details"});
    const log = logger.getLast();
    expect(log).toMatchObject({
        date: expect.any(Number),
        level: 1,
        message: expect.stringMatching(/Simple log message./),
        markers: []
    });
    expect(log.details).toMatchObject({some: "details"});
});

test("Warn message with context", () => {
    this.teqFwLogMarkers = ["instance_001"];
    logger.warn(this, "Simple log message.");
    const log = logger.getLast();
    expect(log).toMatchObject({
        date: expect.any(Number),
        level: 2,
        message: expect.stringMatching(/Simple log message./),
        markers: ["instance_001"]
    });
    expect(log.details).toBe(undefined);
});
test("Error message with context and details", () => {
    this.teqFwLogMarkers = ["instance_002"];
    logger.error(this, "Simple log message.", {var1: 10, var2: "test"});
    const log = logger.getLast();
    expect(log).toMatchObject({
        date: expect.any(Number),
        level: 3,
        message: expect.stringMatching(/Simple log message./),
        markers: ["instance_002"]
    });
    expect(log.details).toMatchObject({var1: 10, var2: "test"});
});