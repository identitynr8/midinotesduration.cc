export class MidiDataLogger {
  constructor() {
    this.data = [];
    this.pressedNotes = new Map();
    this.maxNumNotes = 100;
    this.maxStd = 6;
  }

  setLimit(limit) {
    this.maxNumNotes = parseInt(limit, 10);
    this._enforceLimit();
  }

  setMaxStd(limit) {
    this.maxStd = parseInt(limit, 10);
  }

  noteOn(note) {
    this.pressedNotes.set(note, performance.now());
  }

  noteOff(note) {
    const startTime = this.pressedNotes.get(note);
    if (startTime === undefined) return;
    const ds = performance.now() - startTime;
    this.add(ds);
    this.pressedNotes.delete(note);
  }

  /**
   * Adds a value to the list.
   * @param {number} value - The floating point value (e.g., duration).
   */
  add(value) {
    this.data.push(value);
    this._enforceLimit();
  }

  _enforceLimit() {
    if (this.data.length > this.maxNumNotes) {
      this.data = this.data.slice(-this.maxNumNotes);
    }
  }

  clear() {
    this.data = [];
    this.pressedNotes.clear();
  }

  getAll() {
    if (this.data.length === 0) return [];
    if (this.maxStd === 99999) return this.data;

    const n = this.data.length;
    const mean = this.data.reduce((a, b) => a + b) / n;
    const stdDev = Math.sqrt(this.data.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);

    if (stdDev === 0) return this.data;

    const threshold = this.maxStd * stdDev + mean;

    return this.data.filter(x => x <= threshold);
  }
}
