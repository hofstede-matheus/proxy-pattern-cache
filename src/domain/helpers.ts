import { container } from "tsyringe";

export interface UseCase {
  execute(...args: any[]): Promise<Either<Error, any>>;
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

export class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left<L, A>(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a);
};

export interface Cacheable<Data, ExpireCondition, TTL> {
  readonly value: Data | undefined;
  readonly ttl: TTL;
  readonly expiresAt: ExpireCondition;
}

interface Proxy {
  proxy<Data>(source: () => any): Promise<Data | undefined>
}

export class InMemmoryCacheProxy implements Proxy {
  async proxy<Data>(source: () => any): Promise<Data | undefined> {
    const dataFromCache = container.resolve<Cacheable<Data, Date, number>>(source.name);

    if (new Date() < dataFromCache.expiresAt) {
      return dataFromCache.value;
    }
    else {
      const dataFromRealSource = await source();
      container.registerInstance<Cacheable<Data[], Date, number>>(
        source.name,
        {
          value: dataFromRealSource,
          ttl: dataFromCache.ttl,
          expiresAt: new Date(new Date().getTime() + dataFromCache.ttl),
        }
      )
      return dataFromRealSource;
    }
  }
}

export function generateProxeeToken(token: Symbol): string {
  return "Proxee" + token.toString();
}