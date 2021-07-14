(function () {
  window.bootstrapper = window.bootstrapper || {};
  window.bootstrapper.start = function () {
    sensors.setupHearRateMonitor(function (heartRate) {
      var box = document.querySelector("#hrm");
      box.innerHTML = heartRate;
    });

    sensors.setupStepFrequencyMonitor(function (pedometerInfo) {
      var box = document.querySelector("#step");
      box.innerHTML = pedometerInfo.walkingFrequency.toFixed(2);
    });

    sensors.setupLinearAccelerationMonitor(function (sensorData) {
      var box = document.querySelector("#acc");
      box.innerHTML =
        sensorData.x.toFixed(2) +
        " " +
        sensorData.y.toFixed(2) +
        " " +
        sensorData.z.toFixed(2);
    });
  };

  window.bootstrapper.tearDown = function (e) {
		if (e.keyName == "back")
		  try {
			sensors.unload()
			tizen.application.getCurrentApplication().exit();
		  } catch (ignore) {}
	  }
})();
