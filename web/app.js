import { MidiDataLogger } from "./data_logger.js";
import { drawHistogram } from "./histogram.js";

const logger = new MidiDataLogger();
const plotElement = document.getElementById("histogram-plot");
const overlayElement = document.getElementById("histogram-overlay");
const statusBadge = document.getElementById("connection-status");
const deviceSelector = document.getElementById("device-selector");
const channelSelector = document.getElementById("channel-selector");
const limitSelector = document.getElementById("limit-selector");
const limitDurationsSelector = document.getElementById("limit-durations-selector");
const clearButton = document.getElementById("clear-button");

let currentInput = null;

// Initialize logger with default values
logger.setLimit(limitSelector.value);
logger.setMaxStd(limitDurationsSelector.value);

// Enable WebMidi.js and trigger the onEnabled() function when ready.
WebMidi
  .enable()
  .then(onEnabled)
  .catch(err => {
    statusBadge.innerText = err;
  });

function updateHistogram() {
  const data = logger.getAll();
  overlayElement.style.display = data.length > 0 ? "none" : "flex";
  drawHistogram(plotElement, data);
}

function onEnabled() {
  updateDeviceList();

  // Listen for device connections/disconnections
  WebMidi.addListener("connected", updateDeviceList);
  WebMidi.addListener("disconnected", updateDeviceList);

  deviceSelector.addEventListener("change", () => {
    setupListeners();
  });

  channelSelector.addEventListener("change", () => {
    setupListeners();
  });

  limitSelector.addEventListener("change", () => {
    logger.setLimit(limitSelector.value);
    updateHistogram();
  });

  limitDurationsSelector.addEventListener("change", () => {
    logger.setMaxStd(limitDurationsSelector.value);
    updateHistogram();
  });

  clearButton.addEventListener("click", () => {
    logger.clear();
    updateHistogram();
  });
}

function updateDeviceList() {
  const previousSelection = deviceSelector.value;
  deviceSelector.innerHTML = '<option value="" disabled>Select Device</option>';

  if (WebMidi.inputs.length < 1) {
    statusBadge.innerText = "No Devices";
    statusBadge.className = "status-badge status-disconnected";
    const opt = document.createElement("option");
    opt.text = "No devices detected";
    opt.value = "";
    deviceSelector.add(opt);
  } else {
    statusBadge.innerText = "Connected";
    statusBadge.className = "status-badge status-connected";

    WebMidi.inputs.forEach((device, index) => {
      const opt = document.createElement("option");
      opt.text = `${device.manufacturer} ${device.name} (${device.type})`;
      opt.value = index;
      deviceSelector.add(opt);
    });

    // Restore previous selection if it still exists, otherwise pick the first one
    if (previousSelection !== "" && WebMidi.inputs[previousSelection]) {
      deviceSelector.value = previousSelection;
    } else {
      deviceSelector.value = 0;
    }
  }
  setupListeners();
}

function setupListeners() {
  // Remove existing listeners from current input
  if (currentInput) {
    currentInput.removeListener("noteon");
    currentInput.removeListener("noteoff");
  }

  const inputIndex = deviceSelector.value;
  currentInput = WebMidi.inputs[inputIndex];

  if (!currentInput) return;

  const channelValue = channelSelector.value;
  const target = channelValue === "all" ? currentInput : currentInput.channels[channelValue];

  target.addListener("noteon", e => {
    logger.noteOn(e.note.identifier);
  });

  target.addListener("noteoff", e => {
    logger.noteOff(e.note.identifier);
    updateHistogram();
  });
}
