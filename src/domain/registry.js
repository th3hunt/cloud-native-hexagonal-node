/**
 * A registry of dependencies that provides the app
 * with a very primitive DI mechanism.
 */
class Registry {
  constructor({eventBus}) {
    this.map = new Map();
    this.map.set('eventBus', eventBus);
  }

  /**
   * The global event bus
   * @type {EventEmitter}
   */
  get eventBus() {
    return this.map.get('eventBus');
  }

  toPOJO() {
    return {
      eventBus: this.eventBus
    };
  }
}

export default Registry;
