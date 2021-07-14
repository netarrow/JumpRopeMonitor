window.onload = function () {
  document.addEventListener("tizenhwkey", bootstrapper.tearDown);

  window.securityContext.allowPermission(bootstrapper.start);
};
