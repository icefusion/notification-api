import crypto from "crypto"

import { ICrypt } from "./types/ICrypt";

export default class Crypt implements ICrypt {
  md5(value: string): string {
    return crypto.createHash('md5').update(value).digest('hex');
  }
}
