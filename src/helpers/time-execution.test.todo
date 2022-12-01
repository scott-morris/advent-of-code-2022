// Libraries

import { describe, it, expect, vi, afterEach } from "vitest";

// Dependencies

const timeExecution = require("./time-execution");

// Tests

describe("time-execution.js:", () => {
  test("when called, it will return an object with the result and duration", () => {
    const mockFn = vi.fn().mockImplementation((scalar) => scalar * 2);
    const timedMock = timeExecution(mockFn);

    expect(timedMock(2)).toEqual(
      expect.objectContaining({
        result: 4,
        duration: expect.any(Number),
      })
    );
  });
});
