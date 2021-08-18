import { Service } from 'egg';

/**
 * Test Service
 */
export default class User extends Service {
  /**
   * sayHi to you
   * @param name - your name
   */
  public async register(name: string) {
    return `hi, ${name}`;
  }
}
