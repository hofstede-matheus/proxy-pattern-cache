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

export interface Cacheable<Data, ExpireCondition> {
  readonly value: Data | undefined;
  readonly expiresAt: ExpireCondition;
}

interface Proxy<TTL> {
  ttl: TTL;
  proxy<Data>(source: () => any): Promise<Data | undefined>
}

export class CacheProxy implements Proxy<number> {
  ttl: number = 2000;
  async proxy<Data>(source: () => any): Promise<Data | undefined> {
    const cacheable = container.resolve<Cacheable<Data, Date>>(source.name);

    if (new Date() < cacheable.expiresAt) {
      return cacheable.value;
    }
    else {
      const result = await source();
      container.registerInstance<Cacheable<Data[], Date>>(
        source.name,
        {
          value: result,
          expiresAt: new Date(new Date().getTime() + this.ttl),
        }
      )
      return source();
    }
  }
}

export function generateProxeeToken(token: Symbol): string {
  return "Proxee" + token.toString();
}