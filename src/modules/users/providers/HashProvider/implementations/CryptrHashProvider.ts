import "dotenv/config";

const Cryptr = require('cryptr');

import IHashProvider from '../models/IHashProvider';

class CryptrHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    const hash = new Cryptr(process.env.CRYPTR_SECRET);

    return hash.encrypt(payload);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const hash = new Cryptr(process.env.CRYPTR_SECRET);

    const encrypted = hash.encrypt(payload);

    if (encrypted === hashed) {
      return true;
    }

    return false;
  }
}

export default CryptrHashProvider;
