(function () {
  window.sensors = window.sensors || {};

  var linearAccelerationSensor = tizen.sensorservice.getDefaultSensor(
    "LINEAR_ACCELERATION"
  );

  sensors.setupHearRateMonitor = function (onUpdate) {
    tizen.humanactivitymonitor.start(
      "HRM",
      function (e) {
        setTimeout(function () {
          if (e.heartRate > 0) {
            onUpdate(e.heartRate);
          }
        }, 500);
      },
      function () {},
      { callbackInterval: 1000, sampleInterval: 1000 }
    );
  };

  sensors.setupStepFrequencyMonitor = function (onUpdate) {
    tizen.humanactivitymonitor.setAccumulativePedometerListener(dataAvaiable);

    function dataAvaiable(pedometerInfo) {
      setTimeout(function () {
        onUpdate(pedometerInfo);
      }, 100);
    }
  };

  sensors.setupLinearAccelerationMonitor = function (onUpdate) {
    linearAccelerationSensor.start(sensorStarted, function () {}, {
      callbackInterval: 100,
      sampleInterval: 100,
    });

    function sensorStarted() {
      setTimeout(function () {
        linearAccelerationSensor.getLinearAccelerationSensorData(
          dataAvaiable,
          function () {}
        );
      }, 100);
    }

    function dataAvaiable(sensorData) {
      onUpdate(sensorData);
      setTimeout(function () {
        linearAccelerationSensor.getLinearAccelerationSensorData(
          dataAvaiable,
          function () {}
        );
      }, 50);
    }
  };

  sensors.unload = function () {
    tizen.humanactivitymonitor.stop("HRM");
    tizen.humanactivitymonitor.unsetAccumulativePedometerListener();
    linearAccelerationSensor.stop();
  };
})();
