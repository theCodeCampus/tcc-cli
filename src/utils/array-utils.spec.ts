import { reduceSynchronized } from "./array-utils";

var winston = require("winston");
// winston.level = "debug";

describe("array utils", function () {
  describe("reduceSynchronized", function () {
    it("should not call worker function a second time before first promise resolves", function (done) {
      let spyContainer: any = {
        callback: function (previous: number, current: number) {
          winston.debug(`calling callback with ${current}`)
          winston.debug("testing spy calls");
          expect(spyContainer.callback.calls.count()).toBe(1, "callback function has to be called exactly one time");
          return new Promise(function (resolve) {
            setTimeout(function () {
              winston.debug("reset spy calls");
              expect(spyContainer.callback.calls.count()).toBe(1, "callback function has to be called exactly one time");
              spyContainer.callback.calls.reset();

              winston.debug(`resolve callback return with ${current}`);
              resolve(current);
            }, 10);
          });
        }
      };

      spyOn(spyContainer, "callback").and.callThrough();

      reduceSynchronized([1, 2], spyContainer.callback, 0).then(
        function () { done(); },
        function () { done.fail(); }
      );
    });
  });
});

