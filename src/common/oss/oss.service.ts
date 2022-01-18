import { Injectable } from '@nestjs/common';
import * as OSS from 'ali-oss';
import * as stream from 'stream';
import * as crypto from 'crypto';

@Injectable()
export class OssService {
  private client: any;

  public constructor() {
    this.client = new OSS({
      region: process.env.OSS_REGION,
      accessKeyId: process.env.OSS_ACCESS_KEY_ID,
      accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
      bucket: process.env.OSS_BUCKET,
    });
  }

  public async putStream(ossPath: string, buffer: any) {
    try {
      const imageStream = new stream.PassThrough().end(buffer);

      return await this.client.putStream(
        `image/${ossPath}`,
        // stream,
        imageStream,
      );
    } catch (err) {
      console.log(err);
    }
  }

  public async putBuffer(originalName: string, buffer: any) {
    const hs = crypto.pseudoRandomBytes(16).toString('hex');
    const fileName = hs + originalName.substr(originalName.lastIndexOf('.'));

    try {
      return await this.client.put(`image/${fileName}`, buffer);
    } catch (e) {
      console.log(e);
    }
  }

  public async deleteFile(fileName: string) {
    try {
      // 填写Object完整路径。Object完整路径中不能包含Bucket名称。
      return await this.client.delete(fileName);
    } catch (e) {
      console.log(e);
    }
  }
}
