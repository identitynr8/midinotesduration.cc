export class MidiDataLogger {
  constructor() {
    this.data = [];
    this.pressedNotes = new Map();
    this.limit = 100;
  }

  setLimit(limit) {
    this.limit = parseInt(limit, 10);
    this._enforceLimit();
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
    if (this.data.length > this.limit) {
      this.data = this.data.slice(-this.limit);
    }
  }

  clear() {
    this.data = [];
    this.pressedNotes.clear();
  }

  /**
   * Returns the list of recorded pairs.
   * @returns {Array<{value: number, timestamp: number}>}
   */
  getAll() {
    return this.data;
  }
}
