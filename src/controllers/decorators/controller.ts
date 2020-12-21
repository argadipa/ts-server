import 'reflect-metadata';
import express from 'express';

export const router = express.Router();

export function controller (routePrefix: string) {
  // use Function as target for class controller, use protoype for method controller
  return function (target: Function) {
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata('path', target.prototype, key);

      if (path) {
        router.get(`${routePrefix}${path}`, routeHandler);
      }
    }
  }
}