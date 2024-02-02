import { sign, decode } from 'jsonwebtoken';

export class TokenManager {
  private secretKey: string;
  private accessExpiration: string;
  private refreshExpiration: string;

  //private instance of the token manager
  public constructor(options?: any) {
    this.secretKey = options?.secretKey ?? 'low_budget_jira';
    this.accessExpiration = options?.accessExpiration ?? '10d';
    this.refreshExpiration = options?.refreshExpiration ?? '30d';
  }

  public createToken({userId}: any): any {
    const accessToken = sign({ userId }, this.secretKey, {
      expiresIn: this.accessExpiration,
    });
    const refreshToken = sign({ userId }, this.secretKey, {
      expiresIn: this.refreshExpiration,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public async decodeToken(token: string): Promise<any> {
    return decode(token);
  }
}
