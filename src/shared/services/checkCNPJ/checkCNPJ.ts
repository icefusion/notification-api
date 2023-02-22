import axios from "axios";
import { injectable, inject } from "tsyringe";

@injectable()
class CheckCNPJ {
  constructor() {}

  public async execute(cnpj: string): Promise<any | null> {
    const { data } = await axios.get(
      `https://www.receitaws.com.br/v1/cnpj/${cnpj}`
    );

    if (data.status === "ERROR") {
      return null;
    }

    return data;
  }
}

export default CheckCNPJ;
