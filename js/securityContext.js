(function () {
  function permitRequester(uri) {
    return new Promise(function (resolve, reject) {
      tizen.ppm.requestPermission(
        uri,
        function (success) {
          resolve(success);
        },
        function (error) {
          reject(error);
        }
      );
    });
  }

  window.securityContext = window.securityContext || {};

  securityContext.allowPermission = function (allowedContext) {
    permitRequester("http://tizen.org/privilege/healthinfo").then(function () {
      allowedContext();
    });
  };
})();
