import * as crypto from 'crypto';

/**
 * 生成盐的方法
 */
export function addSalt() {
  // 随机生成一个二进制的流
  // 然后转变为字符串，使用base64进行解码
  return crypto.randomBytes(3).toString('base64');
}

/**
 * 接收两个参数：用户密码(明文)、加密的盐(使用addSalt生成的盐)
 * 之后返回一个加密后的代码
 */
export function encript(userPassword: string, salt: string): string {
  // 调用它的加密方法
  // 参数：密码、加密盐、需要迭代的次数、导出加密后密码的长度、加密方式
  // 注：它默认生成的是一个二进制流的文件，需要转换一下。使用base64进行解码
  return crypto
    .pbkdf2Sync(userPassword, salt, 10000, 16, 'sha256')
    .toString('base64');
}
