import * as request from 'request';
export class MockApi {
  private host = "localhost";
  private port = 1337;
  private url = `http://${this.host}:${this.port}`;
  constructor(port?: number, host?: string) {
    this.port = port ? port : this.port;
    this.host = host ? host : this.host;
  }

  public async addEndPoint(object) {
    return await request.post(`${this.url}/mochApi/apis`, { json: object }, (error, response, body) => { });
  }
}
