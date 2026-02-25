
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model GeoJSONSource
 * 
 */
export type GeoJSONSource = $Result.DefaultSelection<Prisma.$GeoJSONSourcePayload>
/**
 * Model AddressSelection
 * 
 */
export type AddressSelection = $Result.DefaultSelection<Prisma.$AddressSelectionPayload>
/**
 * Model Address
 * 
 */
export type Address = $Result.DefaultSelection<Prisma.$AddressPayload>
/**
 * Model ServiceabilityCheck
 * 
 */
export type ServiceabilityCheck = $Result.DefaultSelection<Prisma.$ServiceabilityCheckPayload>
/**
 * Model BatchJob
 * 
 */
export type BatchJob = $Result.DefaultSelection<Prisma.$BatchJobPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more GeoJSONSources
 * const geoJSONSources = await prisma.geoJSONSource.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more GeoJSONSources
   * const geoJSONSources = await prisma.geoJSONSource.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.geoJSONSource`: Exposes CRUD operations for the **GeoJSONSource** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GeoJSONSources
    * const geoJSONSources = await prisma.geoJSONSource.findMany()
    * ```
    */
  get geoJSONSource(): Prisma.GeoJSONSourceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.addressSelection`: Exposes CRUD operations for the **AddressSelection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AddressSelections
    * const addressSelections = await prisma.addressSelection.findMany()
    * ```
    */
  get addressSelection(): Prisma.AddressSelectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.address`: Exposes CRUD operations for the **Address** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Addresses
    * const addresses = await prisma.address.findMany()
    * ```
    */
  get address(): Prisma.AddressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serviceabilityCheck`: Exposes CRUD operations for the **ServiceabilityCheck** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceabilityChecks
    * const serviceabilityChecks = await prisma.serviceabilityCheck.findMany()
    * ```
    */
  get serviceabilityCheck(): Prisma.ServiceabilityCheckDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.batchJob`: Exposes CRUD operations for the **BatchJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BatchJobs
    * const batchJobs = await prisma.batchJob.findMany()
    * ```
    */
  get batchJob(): Prisma.BatchJobDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.0
   * Query Engine version: ab56fe763f921d033a6c195e7ddeb3e255bdbb57
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    GeoJSONSource: 'GeoJSONSource',
    AddressSelection: 'AddressSelection',
    Address: 'Address',
    ServiceabilityCheck: 'ServiceabilityCheck',
    BatchJob: 'BatchJob'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "geoJSONSource" | "addressSelection" | "address" | "serviceabilityCheck" | "batchJob"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      GeoJSONSource: {
        payload: Prisma.$GeoJSONSourcePayload<ExtArgs>
        fields: Prisma.GeoJSONSourceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GeoJSONSourceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeoJSONSourcePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GeoJSONSourceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeoJSONSourcePayload>
          }
          findFirst: {
            args: Prisma.GeoJSONSourceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeoJSONSourcePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GeoJSONSourceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeoJSONSourcePayload>
          }
          findMany: {
            args: Prisma.GeoJSONSourceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeoJSONSourcePayload>[]
          }
          create: {
            args: Prisma.GeoJSONSourceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeoJSONSourcePayload>
          }
          createMany: {
            args: Prisma.GeoJSONSourceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GeoJSONSourceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeoJSONSourcePayload>[]
          }
          delete: {
            args: Prisma.GeoJSONSourceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeoJSONSourcePayload>
          }
          update: {
            args: Prisma.GeoJSONSourceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeoJSONSourcePayload>
          }
          deleteMany: {
            args: Prisma.GeoJSONSourceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GeoJSONSourceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GeoJSONSourceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeoJSONSourcePayload>[]
          }
          upsert: {
            args: Prisma.GeoJSONSourceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeoJSONSourcePayload>
          }
          aggregate: {
            args: Prisma.GeoJSONSourceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGeoJSONSource>
          }
          groupBy: {
            args: Prisma.GeoJSONSourceGroupByArgs<ExtArgs>
            result: $Utils.Optional<GeoJSONSourceGroupByOutputType>[]
          }
          count: {
            args: Prisma.GeoJSONSourceCountArgs<ExtArgs>
            result: $Utils.Optional<GeoJSONSourceCountAggregateOutputType> | number
          }
        }
      }
      AddressSelection: {
        payload: Prisma.$AddressSelectionPayload<ExtArgs>
        fields: Prisma.AddressSelectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AddressSelectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressSelectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AddressSelectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressSelectionPayload>
          }
          findFirst: {
            args: Prisma.AddressSelectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressSelectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AddressSelectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressSelectionPayload>
          }
          findMany: {
            args: Prisma.AddressSelectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressSelectionPayload>[]
          }
          create: {
            args: Prisma.AddressSelectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressSelectionPayload>
          }
          createMany: {
            args: Prisma.AddressSelectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AddressSelectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressSelectionPayload>[]
          }
          delete: {
            args: Prisma.AddressSelectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressSelectionPayload>
          }
          update: {
            args: Prisma.AddressSelectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressSelectionPayload>
          }
          deleteMany: {
            args: Prisma.AddressSelectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AddressSelectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AddressSelectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressSelectionPayload>[]
          }
          upsert: {
            args: Prisma.AddressSelectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressSelectionPayload>
          }
          aggregate: {
            args: Prisma.AddressSelectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAddressSelection>
          }
          groupBy: {
            args: Prisma.AddressSelectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AddressSelectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AddressSelectionCountArgs<ExtArgs>
            result: $Utils.Optional<AddressSelectionCountAggregateOutputType> | number
          }
        }
      }
      Address: {
        payload: Prisma.$AddressPayload<ExtArgs>
        fields: Prisma.AddressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AddressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AddressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          findFirst: {
            args: Prisma.AddressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AddressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          findMany: {
            args: Prisma.AddressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          create: {
            args: Prisma.AddressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          createMany: {
            args: Prisma.AddressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AddressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          delete: {
            args: Prisma.AddressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          update: {
            args: Prisma.AddressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          deleteMany: {
            args: Prisma.AddressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AddressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AddressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          upsert: {
            args: Prisma.AddressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          aggregate: {
            args: Prisma.AddressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAddress>
          }
          groupBy: {
            args: Prisma.AddressGroupByArgs<ExtArgs>
            result: $Utils.Optional<AddressGroupByOutputType>[]
          }
          count: {
            args: Prisma.AddressCountArgs<ExtArgs>
            result: $Utils.Optional<AddressCountAggregateOutputType> | number
          }
        }
      }
      ServiceabilityCheck: {
        payload: Prisma.$ServiceabilityCheckPayload<ExtArgs>
        fields: Prisma.ServiceabilityCheckFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceabilityCheckFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceabilityCheckPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceabilityCheckFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceabilityCheckPayload>
          }
          findFirst: {
            args: Prisma.ServiceabilityCheckFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceabilityCheckPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceabilityCheckFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceabilityCheckPayload>
          }
          findMany: {
            args: Prisma.ServiceabilityCheckFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceabilityCheckPayload>[]
          }
          create: {
            args: Prisma.ServiceabilityCheckCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceabilityCheckPayload>
          }
          createMany: {
            args: Prisma.ServiceabilityCheckCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceabilityCheckCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceabilityCheckPayload>[]
          }
          delete: {
            args: Prisma.ServiceabilityCheckDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceabilityCheckPayload>
          }
          update: {
            args: Prisma.ServiceabilityCheckUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceabilityCheckPayload>
          }
          deleteMany: {
            args: Prisma.ServiceabilityCheckDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceabilityCheckUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceabilityCheckUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceabilityCheckPayload>[]
          }
          upsert: {
            args: Prisma.ServiceabilityCheckUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceabilityCheckPayload>
          }
          aggregate: {
            args: Prisma.ServiceabilityCheckAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceabilityCheck>
          }
          groupBy: {
            args: Prisma.ServiceabilityCheckGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceabilityCheckGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceabilityCheckCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceabilityCheckCountAggregateOutputType> | number
          }
        }
      }
      BatchJob: {
        payload: Prisma.$BatchJobPayload<ExtArgs>
        fields: Prisma.BatchJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BatchJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BatchJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchJobPayload>
          }
          findFirst: {
            args: Prisma.BatchJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BatchJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchJobPayload>
          }
          findMany: {
            args: Prisma.BatchJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchJobPayload>[]
          }
          create: {
            args: Prisma.BatchJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchJobPayload>
          }
          createMany: {
            args: Prisma.BatchJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BatchJobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchJobPayload>[]
          }
          delete: {
            args: Prisma.BatchJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchJobPayload>
          }
          update: {
            args: Prisma.BatchJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchJobPayload>
          }
          deleteMany: {
            args: Prisma.BatchJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BatchJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BatchJobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchJobPayload>[]
          }
          upsert: {
            args: Prisma.BatchJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchJobPayload>
          }
          aggregate: {
            args: Prisma.BatchJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBatchJob>
          }
          groupBy: {
            args: Prisma.BatchJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<BatchJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.BatchJobCountArgs<ExtArgs>
            result: $Utils.Optional<BatchJobCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    geoJSONSource?: GeoJSONSourceOmit
    addressSelection?: AddressSelectionOmit
    address?: AddressOmit
    serviceabilityCheck?: ServiceabilityCheckOmit
    batchJob?: BatchJobOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type GeoJSONSourceCountOutputType
   */

  export type GeoJSONSourceCountOutputType = {
    addresses: number
  }

  export type GeoJSONSourceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    addresses?: boolean | GeoJSONSourceCountOutputTypeCountAddressesArgs
  }

  // Custom InputTypes
  /**
   * GeoJSONSourceCountOutputType without action
   */
  export type GeoJSONSourceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeoJSONSourceCountOutputType
     */
    select?: GeoJSONSourceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GeoJSONSourceCountOutputType without action
   */
  export type GeoJSONSourceCountOutputTypeCountAddressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
  }


  /**
   * Count Type AddressSelectionCountOutputType
   */

  export type AddressSelectionCountOutputType = {
    addresses: number
  }

  export type AddressSelectionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    addresses?: boolean | AddressSelectionCountOutputTypeCountAddressesArgs
  }

  // Custom InputTypes
  /**
   * AddressSelectionCountOutputType without action
   */
  export type AddressSelectionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressSelectionCountOutputType
     */
    select?: AddressSelectionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AddressSelectionCountOutputType without action
   */
  export type AddressSelectionCountOutputTypeCountAddressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
  }


  /**
   * Count Type AddressCountOutputType
   */

  export type AddressCountOutputType = {
    selections: number
    checks: number
  }

  export type AddressCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    selections?: boolean | AddressCountOutputTypeCountSelectionsArgs
    checks?: boolean | AddressCountOutputTypeCountChecksArgs
  }

  // Custom InputTypes
  /**
   * AddressCountOutputType without action
   */
  export type AddressCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressCountOutputType
     */
    select?: AddressCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AddressCountOutputType without action
   */
  export type AddressCountOutputTypeCountSelectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressSelectionWhereInput
  }

  /**
   * AddressCountOutputType without action
   */
  export type AddressCountOutputTypeCountChecksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceabilityCheckWhereInput
  }


  /**
   * Count Type BatchJobCountOutputType
   */

  export type BatchJobCountOutputType = {
    checks: number
  }

  export type BatchJobCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    checks?: boolean | BatchJobCountOutputTypeCountChecksArgs
  }

  // Custom InputTypes
  /**
   * BatchJobCountOutputType without action
   */
  export type BatchJobCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchJobCountOutputType
     */
    select?: BatchJobCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BatchJobCountOutputType without action
   */
  export type BatchJobCountOutputTypeCountChecksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceabilityCheckWhereInput
  }


  /**
   * Models
   */

  /**
   * Model GeoJSONSource
   */

  export type AggregateGeoJSONSource = {
    _count: GeoJSONSourceCountAggregateOutputType | null
    _avg: GeoJSONSourceAvgAggregateOutputType | null
    _sum: GeoJSONSourceSumAggregateOutputType | null
    _min: GeoJSONSourceMinAggregateOutputType | null
    _max: GeoJSONSourceMaxAggregateOutputType | null
  }

  export type GeoJSONSourceAvgAggregateOutputType = {
    addressCount: number | null
  }

  export type GeoJSONSourceSumAggregateOutputType = {
    addressCount: number | null
  }

  export type GeoJSONSourceMinAggregateOutputType = {
    id: string | null
    name: string | null
    fileName: string | null
    uploadedAt: Date | null
    addressCount: number | null
  }

  export type GeoJSONSourceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    fileName: string | null
    uploadedAt: Date | null
    addressCount: number | null
  }

  export type GeoJSONSourceCountAggregateOutputType = {
    id: number
    name: number
    fileName: number
    uploadedAt: number
    addressCount: number
    _all: number
  }


  export type GeoJSONSourceAvgAggregateInputType = {
    addressCount?: true
  }

  export type GeoJSONSourceSumAggregateInputType = {
    addressCount?: true
  }

  export type GeoJSONSourceMinAggregateInputType = {
    id?: true
    name?: true
    fileName?: true
    uploadedAt?: true
    addressCount?: true
  }

  export type GeoJSONSourceMaxAggregateInputType = {
    id?: true
    name?: true
    fileName?: true
    uploadedAt?: true
    addressCount?: true
  }

  export type GeoJSONSourceCountAggregateInputType = {
    id?: true
    name?: true
    fileName?: true
    uploadedAt?: true
    addressCount?: true
    _all?: true
  }

  export type GeoJSONSourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeoJSONSource to aggregate.
     */
    where?: GeoJSONSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeoJSONSources to fetch.
     */
    orderBy?: GeoJSONSourceOrderByWithRelationInput | GeoJSONSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GeoJSONSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeoJSONSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeoJSONSources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GeoJSONSources
    **/
    _count?: true | GeoJSONSourceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GeoJSONSourceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GeoJSONSourceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GeoJSONSourceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GeoJSONSourceMaxAggregateInputType
  }

  export type GetGeoJSONSourceAggregateType<T extends GeoJSONSourceAggregateArgs> = {
        [P in keyof T & keyof AggregateGeoJSONSource]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGeoJSONSource[P]>
      : GetScalarType<T[P], AggregateGeoJSONSource[P]>
  }




  export type GeoJSONSourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GeoJSONSourceWhereInput
    orderBy?: GeoJSONSourceOrderByWithAggregationInput | GeoJSONSourceOrderByWithAggregationInput[]
    by: GeoJSONSourceScalarFieldEnum[] | GeoJSONSourceScalarFieldEnum
    having?: GeoJSONSourceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GeoJSONSourceCountAggregateInputType | true
    _avg?: GeoJSONSourceAvgAggregateInputType
    _sum?: GeoJSONSourceSumAggregateInputType
    _min?: GeoJSONSourceMinAggregateInputType
    _max?: GeoJSONSourceMaxAggregateInputType
  }

  export type GeoJSONSourceGroupByOutputType = {
    id: string
    name: string
    fileName: string
    uploadedAt: Date
    addressCount: number
    _count: GeoJSONSourceCountAggregateOutputType | null
    _avg: GeoJSONSourceAvgAggregateOutputType | null
    _sum: GeoJSONSourceSumAggregateOutputType | null
    _min: GeoJSONSourceMinAggregateOutputType | null
    _max: GeoJSONSourceMaxAggregateOutputType | null
  }

  type GetGeoJSONSourceGroupByPayload<T extends GeoJSONSourceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GeoJSONSourceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GeoJSONSourceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GeoJSONSourceGroupByOutputType[P]>
            : GetScalarType<T[P], GeoJSONSourceGroupByOutputType[P]>
        }
      >
    >


  export type GeoJSONSourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    fileName?: boolean
    uploadedAt?: boolean
    addressCount?: boolean
    addresses?: boolean | GeoJSONSource$addressesArgs<ExtArgs>
    _count?: boolean | GeoJSONSourceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["geoJSONSource"]>

  export type GeoJSONSourceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    fileName?: boolean
    uploadedAt?: boolean
    addressCount?: boolean
  }, ExtArgs["result"]["geoJSONSource"]>

  export type GeoJSONSourceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    fileName?: boolean
    uploadedAt?: boolean
    addressCount?: boolean
  }, ExtArgs["result"]["geoJSONSource"]>

  export type GeoJSONSourceSelectScalar = {
    id?: boolean
    name?: boolean
    fileName?: boolean
    uploadedAt?: boolean
    addressCount?: boolean
  }

  export type GeoJSONSourceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "fileName" | "uploadedAt" | "addressCount", ExtArgs["result"]["geoJSONSource"]>
  export type GeoJSONSourceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    addresses?: boolean | GeoJSONSource$addressesArgs<ExtArgs>
    _count?: boolean | GeoJSONSourceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GeoJSONSourceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GeoJSONSourceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GeoJSONSourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GeoJSONSource"
    objects: {
      addresses: Prisma.$AddressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      fileName: string
      uploadedAt: Date
      addressCount: number
    }, ExtArgs["result"]["geoJSONSource"]>
    composites: {}
  }

  type GeoJSONSourceGetPayload<S extends boolean | null | undefined | GeoJSONSourceDefaultArgs> = $Result.GetResult<Prisma.$GeoJSONSourcePayload, S>

  type GeoJSONSourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GeoJSONSourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GeoJSONSourceCountAggregateInputType | true
    }

  export interface GeoJSONSourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GeoJSONSource'], meta: { name: 'GeoJSONSource' } }
    /**
     * Find zero or one GeoJSONSource that matches the filter.
     * @param {GeoJSONSourceFindUniqueArgs} args - Arguments to find a GeoJSONSource
     * @example
     * // Get one GeoJSONSource
     * const geoJSONSource = await prisma.geoJSONSource.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GeoJSONSourceFindUniqueArgs>(args: SelectSubset<T, GeoJSONSourceFindUniqueArgs<ExtArgs>>): Prisma__GeoJSONSourceClient<$Result.GetResult<Prisma.$GeoJSONSourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GeoJSONSource that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GeoJSONSourceFindUniqueOrThrowArgs} args - Arguments to find a GeoJSONSource
     * @example
     * // Get one GeoJSONSource
     * const geoJSONSource = await prisma.geoJSONSource.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GeoJSONSourceFindUniqueOrThrowArgs>(args: SelectSubset<T, GeoJSONSourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GeoJSONSourceClient<$Result.GetResult<Prisma.$GeoJSONSourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GeoJSONSource that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeoJSONSourceFindFirstArgs} args - Arguments to find a GeoJSONSource
     * @example
     * // Get one GeoJSONSource
     * const geoJSONSource = await prisma.geoJSONSource.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GeoJSONSourceFindFirstArgs>(args?: SelectSubset<T, GeoJSONSourceFindFirstArgs<ExtArgs>>): Prisma__GeoJSONSourceClient<$Result.GetResult<Prisma.$GeoJSONSourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GeoJSONSource that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeoJSONSourceFindFirstOrThrowArgs} args - Arguments to find a GeoJSONSource
     * @example
     * // Get one GeoJSONSource
     * const geoJSONSource = await prisma.geoJSONSource.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GeoJSONSourceFindFirstOrThrowArgs>(args?: SelectSubset<T, GeoJSONSourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__GeoJSONSourceClient<$Result.GetResult<Prisma.$GeoJSONSourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GeoJSONSources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeoJSONSourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GeoJSONSources
     * const geoJSONSources = await prisma.geoJSONSource.findMany()
     * 
     * // Get first 10 GeoJSONSources
     * const geoJSONSources = await prisma.geoJSONSource.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const geoJSONSourceWithIdOnly = await prisma.geoJSONSource.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GeoJSONSourceFindManyArgs>(args?: SelectSubset<T, GeoJSONSourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeoJSONSourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GeoJSONSource.
     * @param {GeoJSONSourceCreateArgs} args - Arguments to create a GeoJSONSource.
     * @example
     * // Create one GeoJSONSource
     * const GeoJSONSource = await prisma.geoJSONSource.create({
     *   data: {
     *     // ... data to create a GeoJSONSource
     *   }
     * })
     * 
     */
    create<T extends GeoJSONSourceCreateArgs>(args: SelectSubset<T, GeoJSONSourceCreateArgs<ExtArgs>>): Prisma__GeoJSONSourceClient<$Result.GetResult<Prisma.$GeoJSONSourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GeoJSONSources.
     * @param {GeoJSONSourceCreateManyArgs} args - Arguments to create many GeoJSONSources.
     * @example
     * // Create many GeoJSONSources
     * const geoJSONSource = await prisma.geoJSONSource.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GeoJSONSourceCreateManyArgs>(args?: SelectSubset<T, GeoJSONSourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GeoJSONSources and returns the data saved in the database.
     * @param {GeoJSONSourceCreateManyAndReturnArgs} args - Arguments to create many GeoJSONSources.
     * @example
     * // Create many GeoJSONSources
     * const geoJSONSource = await prisma.geoJSONSource.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GeoJSONSources and only return the `id`
     * const geoJSONSourceWithIdOnly = await prisma.geoJSONSource.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GeoJSONSourceCreateManyAndReturnArgs>(args?: SelectSubset<T, GeoJSONSourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeoJSONSourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GeoJSONSource.
     * @param {GeoJSONSourceDeleteArgs} args - Arguments to delete one GeoJSONSource.
     * @example
     * // Delete one GeoJSONSource
     * const GeoJSONSource = await prisma.geoJSONSource.delete({
     *   where: {
     *     // ... filter to delete one GeoJSONSource
     *   }
     * })
     * 
     */
    delete<T extends GeoJSONSourceDeleteArgs>(args: SelectSubset<T, GeoJSONSourceDeleteArgs<ExtArgs>>): Prisma__GeoJSONSourceClient<$Result.GetResult<Prisma.$GeoJSONSourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GeoJSONSource.
     * @param {GeoJSONSourceUpdateArgs} args - Arguments to update one GeoJSONSource.
     * @example
     * // Update one GeoJSONSource
     * const geoJSONSource = await prisma.geoJSONSource.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GeoJSONSourceUpdateArgs>(args: SelectSubset<T, GeoJSONSourceUpdateArgs<ExtArgs>>): Prisma__GeoJSONSourceClient<$Result.GetResult<Prisma.$GeoJSONSourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GeoJSONSources.
     * @param {GeoJSONSourceDeleteManyArgs} args - Arguments to filter GeoJSONSources to delete.
     * @example
     * // Delete a few GeoJSONSources
     * const { count } = await prisma.geoJSONSource.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GeoJSONSourceDeleteManyArgs>(args?: SelectSubset<T, GeoJSONSourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GeoJSONSources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeoJSONSourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GeoJSONSources
     * const geoJSONSource = await prisma.geoJSONSource.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GeoJSONSourceUpdateManyArgs>(args: SelectSubset<T, GeoJSONSourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GeoJSONSources and returns the data updated in the database.
     * @param {GeoJSONSourceUpdateManyAndReturnArgs} args - Arguments to update many GeoJSONSources.
     * @example
     * // Update many GeoJSONSources
     * const geoJSONSource = await prisma.geoJSONSource.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GeoJSONSources and only return the `id`
     * const geoJSONSourceWithIdOnly = await prisma.geoJSONSource.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GeoJSONSourceUpdateManyAndReturnArgs>(args: SelectSubset<T, GeoJSONSourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeoJSONSourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GeoJSONSource.
     * @param {GeoJSONSourceUpsertArgs} args - Arguments to update or create a GeoJSONSource.
     * @example
     * // Update or create a GeoJSONSource
     * const geoJSONSource = await prisma.geoJSONSource.upsert({
     *   create: {
     *     // ... data to create a GeoJSONSource
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GeoJSONSource we want to update
     *   }
     * })
     */
    upsert<T extends GeoJSONSourceUpsertArgs>(args: SelectSubset<T, GeoJSONSourceUpsertArgs<ExtArgs>>): Prisma__GeoJSONSourceClient<$Result.GetResult<Prisma.$GeoJSONSourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GeoJSONSources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeoJSONSourceCountArgs} args - Arguments to filter GeoJSONSources to count.
     * @example
     * // Count the number of GeoJSONSources
     * const count = await prisma.geoJSONSource.count({
     *   where: {
     *     // ... the filter for the GeoJSONSources we want to count
     *   }
     * })
    **/
    count<T extends GeoJSONSourceCountArgs>(
      args?: Subset<T, GeoJSONSourceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GeoJSONSourceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GeoJSONSource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeoJSONSourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GeoJSONSourceAggregateArgs>(args: Subset<T, GeoJSONSourceAggregateArgs>): Prisma.PrismaPromise<GetGeoJSONSourceAggregateType<T>>

    /**
     * Group by GeoJSONSource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeoJSONSourceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GeoJSONSourceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GeoJSONSourceGroupByArgs['orderBy'] }
        : { orderBy?: GeoJSONSourceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GeoJSONSourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGeoJSONSourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GeoJSONSource model
   */
  readonly fields: GeoJSONSourceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GeoJSONSource.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GeoJSONSourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    addresses<T extends GeoJSONSource$addressesArgs<ExtArgs> = {}>(args?: Subset<T, GeoJSONSource$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GeoJSONSource model
   */
  interface GeoJSONSourceFieldRefs {
    readonly id: FieldRef<"GeoJSONSource", 'String'>
    readonly name: FieldRef<"GeoJSONSource", 'String'>
    readonly fileName: FieldRef<"GeoJSONSource", 'String'>
    readonly uploadedAt: FieldRef<"GeoJSONSource", 'DateTime'>
    readonly addressCount: FieldRef<"GeoJSONSource", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * GeoJSONSource findUnique
   */
  export type GeoJSONSourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeoJSONSource
     */
    select?: GeoJSONSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeoJSONSource
     */
    omit?: GeoJSONSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeoJSONSourceInclude<ExtArgs> | null
    /**
     * Filter, which GeoJSONSource to fetch.
     */
    where: GeoJSONSourceWhereUniqueInput
  }

  /**
   * GeoJSONSource findUniqueOrThrow
   */
  export type GeoJSONSourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeoJSONSource
     */
    select?: GeoJSONSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeoJSONSource
     */
    omit?: GeoJSONSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeoJSONSourceInclude<ExtArgs> | null
    /**
     * Filter, which GeoJSONSource to fetch.
     */
    where: GeoJSONSourceWhereUniqueInput
  }

  /**
   * GeoJSONSource findFirst
   */
  export type GeoJSONSourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeoJSONSource
     */
    select?: GeoJSONSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeoJSONSource
     */
    omit?: GeoJSONSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeoJSONSourceInclude<ExtArgs> | null
    /**
     * Filter, which GeoJSONSource to fetch.
     */
    where?: GeoJSONSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeoJSONSources to fetch.
     */
    orderBy?: GeoJSONSourceOrderByWithRelationInput | GeoJSONSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeoJSONSources.
     */
    cursor?: GeoJSONSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeoJSONSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeoJSONSources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeoJSONSources.
     */
    distinct?: GeoJSONSourceScalarFieldEnum | GeoJSONSourceScalarFieldEnum[]
  }

  /**
   * GeoJSONSource findFirstOrThrow
   */
  export type GeoJSONSourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeoJSONSource
     */
    select?: GeoJSONSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeoJSONSource
     */
    omit?: GeoJSONSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeoJSONSourceInclude<ExtArgs> | null
    /**
     * Filter, which GeoJSONSource to fetch.
     */
    where?: GeoJSONSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeoJSONSources to fetch.
     */
    orderBy?: GeoJSONSourceOrderByWithRelationInput | GeoJSONSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeoJSONSources.
     */
    cursor?: GeoJSONSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeoJSONSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeoJSONSources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeoJSONSources.
     */
    distinct?: GeoJSONSourceScalarFieldEnum | GeoJSONSourceScalarFieldEnum[]
  }

  /**
   * GeoJSONSource findMany
   */
  export type GeoJSONSourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeoJSONSource
     */
    select?: GeoJSONSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeoJSONSource
     */
    omit?: GeoJSONSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeoJSONSourceInclude<ExtArgs> | null
    /**
     * Filter, which GeoJSONSources to fetch.
     */
    where?: GeoJSONSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeoJSONSources to fetch.
     */
    orderBy?: GeoJSONSourceOrderByWithRelationInput | GeoJSONSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GeoJSONSources.
     */
    cursor?: GeoJSONSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeoJSONSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeoJSONSources.
     */
    skip?: number
    distinct?: GeoJSONSourceScalarFieldEnum | GeoJSONSourceScalarFieldEnum[]
  }

  /**
   * GeoJSONSource create
   */
  export type GeoJSONSourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeoJSONSource
     */
    select?: GeoJSONSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeoJSONSource
     */
    omit?: GeoJSONSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeoJSONSourceInclude<ExtArgs> | null
    /**
     * The data needed to create a GeoJSONSource.
     */
    data: XOR<GeoJSONSourceCreateInput, GeoJSONSourceUncheckedCreateInput>
  }

  /**
   * GeoJSONSource createMany
   */
  export type GeoJSONSourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GeoJSONSources.
     */
    data: GeoJSONSourceCreateManyInput | GeoJSONSourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GeoJSONSource createManyAndReturn
   */
  export type GeoJSONSourceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeoJSONSource
     */
    select?: GeoJSONSourceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GeoJSONSource
     */
    omit?: GeoJSONSourceOmit<ExtArgs> | null
    /**
     * The data used to create many GeoJSONSources.
     */
    data: GeoJSONSourceCreateManyInput | GeoJSONSourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GeoJSONSource update
   */
  export type GeoJSONSourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeoJSONSource
     */
    select?: GeoJSONSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeoJSONSource
     */
    omit?: GeoJSONSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeoJSONSourceInclude<ExtArgs> | null
    /**
     * The data needed to update a GeoJSONSource.
     */
    data: XOR<GeoJSONSourceUpdateInput, GeoJSONSourceUncheckedUpdateInput>
    /**
     * Choose, which GeoJSONSource to update.
     */
    where: GeoJSONSourceWhereUniqueInput
  }

  /**
   * GeoJSONSource updateMany
   */
  export type GeoJSONSourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GeoJSONSources.
     */
    data: XOR<GeoJSONSourceUpdateManyMutationInput, GeoJSONSourceUncheckedUpdateManyInput>
    /**
     * Filter which GeoJSONSources to update
     */
    where?: GeoJSONSourceWhereInput
    /**
     * Limit how many GeoJSONSources to update.
     */
    limit?: number
  }

  /**
   * GeoJSONSource updateManyAndReturn
   */
  export type GeoJSONSourceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeoJSONSource
     */
    select?: GeoJSONSourceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GeoJSONSource
     */
    omit?: GeoJSONSourceOmit<ExtArgs> | null
    /**
     * The data used to update GeoJSONSources.
     */
    data: XOR<GeoJSONSourceUpdateManyMutationInput, GeoJSONSourceUncheckedUpdateManyInput>
    /**
     * Filter which GeoJSONSources to update
     */
    where?: GeoJSONSourceWhereInput
    /**
     * Limit how many GeoJSONSources to update.
     */
    limit?: number
  }

  /**
   * GeoJSONSource upsert
   */
  export type GeoJSONSourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeoJSONSource
     */
    select?: GeoJSONSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeoJSONSource
     */
    omit?: GeoJSONSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeoJSONSourceInclude<ExtArgs> | null
    /**
     * The filter to search for the GeoJSONSource to update in case it exists.
     */
    where: GeoJSONSourceWhereUniqueInput
    /**
     * In case the GeoJSONSource found by the `where` argument doesn't exist, create a new GeoJSONSource with this data.
     */
    create: XOR<GeoJSONSourceCreateInput, GeoJSONSourceUncheckedCreateInput>
    /**
     * In case the GeoJSONSource was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GeoJSONSourceUpdateInput, GeoJSONSourceUncheckedUpdateInput>
  }

  /**
   * GeoJSONSource delete
   */
  export type GeoJSONSourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeoJSONSource
     */
    select?: GeoJSONSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeoJSONSource
     */
    omit?: GeoJSONSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeoJSONSourceInclude<ExtArgs> | null
    /**
     * Filter which GeoJSONSource to delete.
     */
    where: GeoJSONSourceWhereUniqueInput
  }

  /**
   * GeoJSONSource deleteMany
   */
  export type GeoJSONSourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeoJSONSources to delete
     */
    where?: GeoJSONSourceWhereInput
    /**
     * Limit how many GeoJSONSources to delete.
     */
    limit?: number
  }

  /**
   * GeoJSONSource.addresses
   */
  export type GeoJSONSource$addressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    cursor?: AddressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * GeoJSONSource without action
   */
  export type GeoJSONSourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeoJSONSource
     */
    select?: GeoJSONSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeoJSONSource
     */
    omit?: GeoJSONSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeoJSONSourceInclude<ExtArgs> | null
  }


  /**
   * Model AddressSelection
   */

  export type AggregateAddressSelection = {
    _count: AddressSelectionCountAggregateOutputType | null
    _min: AddressSelectionMinAggregateOutputType | null
    _max: AddressSelectionMaxAggregateOutputType | null
  }

  export type AddressSelectionMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    filterCriteria: string | null
  }

  export type AddressSelectionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    filterCriteria: string | null
  }

  export type AddressSelectionCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    filterCriteria: number
    _all: number
  }


  export type AddressSelectionMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    filterCriteria?: true
  }

  export type AddressSelectionMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    filterCriteria?: true
  }

  export type AddressSelectionCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    filterCriteria?: true
    _all?: true
  }

  export type AddressSelectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AddressSelection to aggregate.
     */
    where?: AddressSelectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressSelections to fetch.
     */
    orderBy?: AddressSelectionOrderByWithRelationInput | AddressSelectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AddressSelectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressSelections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressSelections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AddressSelections
    **/
    _count?: true | AddressSelectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddressSelectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddressSelectionMaxAggregateInputType
  }

  export type GetAddressSelectionAggregateType<T extends AddressSelectionAggregateArgs> = {
        [P in keyof T & keyof AggregateAddressSelection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddressSelection[P]>
      : GetScalarType<T[P], AggregateAddressSelection[P]>
  }




  export type AddressSelectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressSelectionWhereInput
    orderBy?: AddressSelectionOrderByWithAggregationInput | AddressSelectionOrderByWithAggregationInput[]
    by: AddressSelectionScalarFieldEnum[] | AddressSelectionScalarFieldEnum
    having?: AddressSelectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddressSelectionCountAggregateInputType | true
    _min?: AddressSelectionMinAggregateInputType
    _max?: AddressSelectionMaxAggregateInputType
  }

  export type AddressSelectionGroupByOutputType = {
    id: string
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    filterCriteria: string
    _count: AddressSelectionCountAggregateOutputType | null
    _min: AddressSelectionMinAggregateOutputType | null
    _max: AddressSelectionMaxAggregateOutputType | null
  }

  type GetAddressSelectionGroupByPayload<T extends AddressSelectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AddressSelectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddressSelectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddressSelectionGroupByOutputType[P]>
            : GetScalarType<T[P], AddressSelectionGroupByOutputType[P]>
        }
      >
    >


  export type AddressSelectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    filterCriteria?: boolean
    addresses?: boolean | AddressSelection$addressesArgs<ExtArgs>
    _count?: boolean | AddressSelectionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["addressSelection"]>

  export type AddressSelectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    filterCriteria?: boolean
  }, ExtArgs["result"]["addressSelection"]>

  export type AddressSelectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    filterCriteria?: boolean
  }, ExtArgs["result"]["addressSelection"]>

  export type AddressSelectionSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    filterCriteria?: boolean
  }

  export type AddressSelectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "createdAt" | "updatedAt" | "filterCriteria", ExtArgs["result"]["addressSelection"]>
  export type AddressSelectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    addresses?: boolean | AddressSelection$addressesArgs<ExtArgs>
    _count?: boolean | AddressSelectionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AddressSelectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AddressSelectionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AddressSelectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AddressSelection"
    objects: {
      addresses: Prisma.$AddressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      createdAt: Date
      updatedAt: Date
      filterCriteria: string
    }, ExtArgs["result"]["addressSelection"]>
    composites: {}
  }

  type AddressSelectionGetPayload<S extends boolean | null | undefined | AddressSelectionDefaultArgs> = $Result.GetResult<Prisma.$AddressSelectionPayload, S>

  type AddressSelectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AddressSelectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AddressSelectionCountAggregateInputType | true
    }

  export interface AddressSelectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AddressSelection'], meta: { name: 'AddressSelection' } }
    /**
     * Find zero or one AddressSelection that matches the filter.
     * @param {AddressSelectionFindUniqueArgs} args - Arguments to find a AddressSelection
     * @example
     * // Get one AddressSelection
     * const addressSelection = await prisma.addressSelection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AddressSelectionFindUniqueArgs>(args: SelectSubset<T, AddressSelectionFindUniqueArgs<ExtArgs>>): Prisma__AddressSelectionClient<$Result.GetResult<Prisma.$AddressSelectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AddressSelection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AddressSelectionFindUniqueOrThrowArgs} args - Arguments to find a AddressSelection
     * @example
     * // Get one AddressSelection
     * const addressSelection = await prisma.addressSelection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AddressSelectionFindUniqueOrThrowArgs>(args: SelectSubset<T, AddressSelectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AddressSelectionClient<$Result.GetResult<Prisma.$AddressSelectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AddressSelection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressSelectionFindFirstArgs} args - Arguments to find a AddressSelection
     * @example
     * // Get one AddressSelection
     * const addressSelection = await prisma.addressSelection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AddressSelectionFindFirstArgs>(args?: SelectSubset<T, AddressSelectionFindFirstArgs<ExtArgs>>): Prisma__AddressSelectionClient<$Result.GetResult<Prisma.$AddressSelectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AddressSelection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressSelectionFindFirstOrThrowArgs} args - Arguments to find a AddressSelection
     * @example
     * // Get one AddressSelection
     * const addressSelection = await prisma.addressSelection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AddressSelectionFindFirstOrThrowArgs>(args?: SelectSubset<T, AddressSelectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AddressSelectionClient<$Result.GetResult<Prisma.$AddressSelectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AddressSelections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressSelectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AddressSelections
     * const addressSelections = await prisma.addressSelection.findMany()
     * 
     * // Get first 10 AddressSelections
     * const addressSelections = await prisma.addressSelection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const addressSelectionWithIdOnly = await prisma.addressSelection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AddressSelectionFindManyArgs>(args?: SelectSubset<T, AddressSelectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressSelectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AddressSelection.
     * @param {AddressSelectionCreateArgs} args - Arguments to create a AddressSelection.
     * @example
     * // Create one AddressSelection
     * const AddressSelection = await prisma.addressSelection.create({
     *   data: {
     *     // ... data to create a AddressSelection
     *   }
     * })
     * 
     */
    create<T extends AddressSelectionCreateArgs>(args: SelectSubset<T, AddressSelectionCreateArgs<ExtArgs>>): Prisma__AddressSelectionClient<$Result.GetResult<Prisma.$AddressSelectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AddressSelections.
     * @param {AddressSelectionCreateManyArgs} args - Arguments to create many AddressSelections.
     * @example
     * // Create many AddressSelections
     * const addressSelection = await prisma.addressSelection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AddressSelectionCreateManyArgs>(args?: SelectSubset<T, AddressSelectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AddressSelections and returns the data saved in the database.
     * @param {AddressSelectionCreateManyAndReturnArgs} args - Arguments to create many AddressSelections.
     * @example
     * // Create many AddressSelections
     * const addressSelection = await prisma.addressSelection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AddressSelections and only return the `id`
     * const addressSelectionWithIdOnly = await prisma.addressSelection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AddressSelectionCreateManyAndReturnArgs>(args?: SelectSubset<T, AddressSelectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressSelectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AddressSelection.
     * @param {AddressSelectionDeleteArgs} args - Arguments to delete one AddressSelection.
     * @example
     * // Delete one AddressSelection
     * const AddressSelection = await prisma.addressSelection.delete({
     *   where: {
     *     // ... filter to delete one AddressSelection
     *   }
     * })
     * 
     */
    delete<T extends AddressSelectionDeleteArgs>(args: SelectSubset<T, AddressSelectionDeleteArgs<ExtArgs>>): Prisma__AddressSelectionClient<$Result.GetResult<Prisma.$AddressSelectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AddressSelection.
     * @param {AddressSelectionUpdateArgs} args - Arguments to update one AddressSelection.
     * @example
     * // Update one AddressSelection
     * const addressSelection = await prisma.addressSelection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AddressSelectionUpdateArgs>(args: SelectSubset<T, AddressSelectionUpdateArgs<ExtArgs>>): Prisma__AddressSelectionClient<$Result.GetResult<Prisma.$AddressSelectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AddressSelections.
     * @param {AddressSelectionDeleteManyArgs} args - Arguments to filter AddressSelections to delete.
     * @example
     * // Delete a few AddressSelections
     * const { count } = await prisma.addressSelection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AddressSelectionDeleteManyArgs>(args?: SelectSubset<T, AddressSelectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AddressSelections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressSelectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AddressSelections
     * const addressSelection = await prisma.addressSelection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AddressSelectionUpdateManyArgs>(args: SelectSubset<T, AddressSelectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AddressSelections and returns the data updated in the database.
     * @param {AddressSelectionUpdateManyAndReturnArgs} args - Arguments to update many AddressSelections.
     * @example
     * // Update many AddressSelections
     * const addressSelection = await prisma.addressSelection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AddressSelections and only return the `id`
     * const addressSelectionWithIdOnly = await prisma.addressSelection.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AddressSelectionUpdateManyAndReturnArgs>(args: SelectSubset<T, AddressSelectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressSelectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AddressSelection.
     * @param {AddressSelectionUpsertArgs} args - Arguments to update or create a AddressSelection.
     * @example
     * // Update or create a AddressSelection
     * const addressSelection = await prisma.addressSelection.upsert({
     *   create: {
     *     // ... data to create a AddressSelection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AddressSelection we want to update
     *   }
     * })
     */
    upsert<T extends AddressSelectionUpsertArgs>(args: SelectSubset<T, AddressSelectionUpsertArgs<ExtArgs>>): Prisma__AddressSelectionClient<$Result.GetResult<Prisma.$AddressSelectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AddressSelections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressSelectionCountArgs} args - Arguments to filter AddressSelections to count.
     * @example
     * // Count the number of AddressSelections
     * const count = await prisma.addressSelection.count({
     *   where: {
     *     // ... the filter for the AddressSelections we want to count
     *   }
     * })
    **/
    count<T extends AddressSelectionCountArgs>(
      args?: Subset<T, AddressSelectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddressSelectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AddressSelection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressSelectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AddressSelectionAggregateArgs>(args: Subset<T, AddressSelectionAggregateArgs>): Prisma.PrismaPromise<GetAddressSelectionAggregateType<T>>

    /**
     * Group by AddressSelection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressSelectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AddressSelectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddressSelectionGroupByArgs['orderBy'] }
        : { orderBy?: AddressSelectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AddressSelectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddressSelectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AddressSelection model
   */
  readonly fields: AddressSelectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AddressSelection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AddressSelectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    addresses<T extends AddressSelection$addressesArgs<ExtArgs> = {}>(args?: Subset<T, AddressSelection$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AddressSelection model
   */
  interface AddressSelectionFieldRefs {
    readonly id: FieldRef<"AddressSelection", 'String'>
    readonly name: FieldRef<"AddressSelection", 'String'>
    readonly description: FieldRef<"AddressSelection", 'String'>
    readonly createdAt: FieldRef<"AddressSelection", 'DateTime'>
    readonly updatedAt: FieldRef<"AddressSelection", 'DateTime'>
    readonly filterCriteria: FieldRef<"AddressSelection", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AddressSelection findUnique
   */
  export type AddressSelectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressSelection
     */
    select?: AddressSelectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressSelection
     */
    omit?: AddressSelectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressSelectionInclude<ExtArgs> | null
    /**
     * Filter, which AddressSelection to fetch.
     */
    where: AddressSelectionWhereUniqueInput
  }

  /**
   * AddressSelection findUniqueOrThrow
   */
  export type AddressSelectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressSelection
     */
    select?: AddressSelectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressSelection
     */
    omit?: AddressSelectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressSelectionInclude<ExtArgs> | null
    /**
     * Filter, which AddressSelection to fetch.
     */
    where: AddressSelectionWhereUniqueInput
  }

  /**
   * AddressSelection findFirst
   */
  export type AddressSelectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressSelection
     */
    select?: AddressSelectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressSelection
     */
    omit?: AddressSelectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressSelectionInclude<ExtArgs> | null
    /**
     * Filter, which AddressSelection to fetch.
     */
    where?: AddressSelectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressSelections to fetch.
     */
    orderBy?: AddressSelectionOrderByWithRelationInput | AddressSelectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AddressSelections.
     */
    cursor?: AddressSelectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressSelections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressSelections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AddressSelections.
     */
    distinct?: AddressSelectionScalarFieldEnum | AddressSelectionScalarFieldEnum[]
  }

  /**
   * AddressSelection findFirstOrThrow
   */
  export type AddressSelectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressSelection
     */
    select?: AddressSelectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressSelection
     */
    omit?: AddressSelectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressSelectionInclude<ExtArgs> | null
    /**
     * Filter, which AddressSelection to fetch.
     */
    where?: AddressSelectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressSelections to fetch.
     */
    orderBy?: AddressSelectionOrderByWithRelationInput | AddressSelectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AddressSelections.
     */
    cursor?: AddressSelectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressSelections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressSelections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AddressSelections.
     */
    distinct?: AddressSelectionScalarFieldEnum | AddressSelectionScalarFieldEnum[]
  }

  /**
   * AddressSelection findMany
   */
  export type AddressSelectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressSelection
     */
    select?: AddressSelectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressSelection
     */
    omit?: AddressSelectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressSelectionInclude<ExtArgs> | null
    /**
     * Filter, which AddressSelections to fetch.
     */
    where?: AddressSelectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressSelections to fetch.
     */
    orderBy?: AddressSelectionOrderByWithRelationInput | AddressSelectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AddressSelections.
     */
    cursor?: AddressSelectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressSelections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressSelections.
     */
    skip?: number
    distinct?: AddressSelectionScalarFieldEnum | AddressSelectionScalarFieldEnum[]
  }

  /**
   * AddressSelection create
   */
  export type AddressSelectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressSelection
     */
    select?: AddressSelectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressSelection
     */
    omit?: AddressSelectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressSelectionInclude<ExtArgs> | null
    /**
     * The data needed to create a AddressSelection.
     */
    data: XOR<AddressSelectionCreateInput, AddressSelectionUncheckedCreateInput>
  }

  /**
   * AddressSelection createMany
   */
  export type AddressSelectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AddressSelections.
     */
    data: AddressSelectionCreateManyInput | AddressSelectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AddressSelection createManyAndReturn
   */
  export type AddressSelectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressSelection
     */
    select?: AddressSelectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AddressSelection
     */
    omit?: AddressSelectionOmit<ExtArgs> | null
    /**
     * The data used to create many AddressSelections.
     */
    data: AddressSelectionCreateManyInput | AddressSelectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AddressSelection update
   */
  export type AddressSelectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressSelection
     */
    select?: AddressSelectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressSelection
     */
    omit?: AddressSelectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressSelectionInclude<ExtArgs> | null
    /**
     * The data needed to update a AddressSelection.
     */
    data: XOR<AddressSelectionUpdateInput, AddressSelectionUncheckedUpdateInput>
    /**
     * Choose, which AddressSelection to update.
     */
    where: AddressSelectionWhereUniqueInput
  }

  /**
   * AddressSelection updateMany
   */
  export type AddressSelectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AddressSelections.
     */
    data: XOR<AddressSelectionUpdateManyMutationInput, AddressSelectionUncheckedUpdateManyInput>
    /**
     * Filter which AddressSelections to update
     */
    where?: AddressSelectionWhereInput
    /**
     * Limit how many AddressSelections to update.
     */
    limit?: number
  }

  /**
   * AddressSelection updateManyAndReturn
   */
  export type AddressSelectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressSelection
     */
    select?: AddressSelectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AddressSelection
     */
    omit?: AddressSelectionOmit<ExtArgs> | null
    /**
     * The data used to update AddressSelections.
     */
    data: XOR<AddressSelectionUpdateManyMutationInput, AddressSelectionUncheckedUpdateManyInput>
    /**
     * Filter which AddressSelections to update
     */
    where?: AddressSelectionWhereInput
    /**
     * Limit how many AddressSelections to update.
     */
    limit?: number
  }

  /**
   * AddressSelection upsert
   */
  export type AddressSelectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressSelection
     */
    select?: AddressSelectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressSelection
     */
    omit?: AddressSelectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressSelectionInclude<ExtArgs> | null
    /**
     * The filter to search for the AddressSelection to update in case it exists.
     */
    where: AddressSelectionWhereUniqueInput
    /**
     * In case the AddressSelection found by the `where` argument doesn't exist, create a new AddressSelection with this data.
     */
    create: XOR<AddressSelectionCreateInput, AddressSelectionUncheckedCreateInput>
    /**
     * In case the AddressSelection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AddressSelectionUpdateInput, AddressSelectionUncheckedUpdateInput>
  }

  /**
   * AddressSelection delete
   */
  export type AddressSelectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressSelection
     */
    select?: AddressSelectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressSelection
     */
    omit?: AddressSelectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressSelectionInclude<ExtArgs> | null
    /**
     * Filter which AddressSelection to delete.
     */
    where: AddressSelectionWhereUniqueInput
  }

  /**
   * AddressSelection deleteMany
   */
  export type AddressSelectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AddressSelections to delete
     */
    where?: AddressSelectionWhereInput
    /**
     * Limit how many AddressSelections to delete.
     */
    limit?: number
  }

  /**
   * AddressSelection.addresses
   */
  export type AddressSelection$addressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    cursor?: AddressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * AddressSelection without action
   */
  export type AddressSelectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressSelection
     */
    select?: AddressSelectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressSelection
     */
    omit?: AddressSelectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressSelectionInclude<ExtArgs> | null
  }


  /**
   * Model Address
   */

  export type AggregateAddress = {
    _count: AddressCountAggregateOutputType | null
    _avg: AddressAvgAggregateOutputType | null
    _sum: AddressSumAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  export type AddressAvgAggregateOutputType = {
    longitude: number | null
    latitude: number | null
  }

  export type AddressSumAggregateOutputType = {
    longitude: number | null
    latitude: number | null
  }

  export type AddressMinAggregateOutputType = {
    id: string | null
    sourceId: string | null
    longitude: number | null
    latitude: number | null
    number: string | null
    street: string | null
    unit: string | null
    city: string | null
    region: string | null
    postcode: string | null
    addressString: string | null
    properties: string | null
    createdAt: Date | null
  }

  export type AddressMaxAggregateOutputType = {
    id: string | null
    sourceId: string | null
    longitude: number | null
    latitude: number | null
    number: string | null
    street: string | null
    unit: string | null
    city: string | null
    region: string | null
    postcode: string | null
    addressString: string | null
    properties: string | null
    createdAt: Date | null
  }

  export type AddressCountAggregateOutputType = {
    id: number
    sourceId: number
    longitude: number
    latitude: number
    number: number
    street: number
    unit: number
    city: number
    region: number
    postcode: number
    addressString: number
    properties: number
    createdAt: number
    _all: number
  }


  export type AddressAvgAggregateInputType = {
    longitude?: true
    latitude?: true
  }

  export type AddressSumAggregateInputType = {
    longitude?: true
    latitude?: true
  }

  export type AddressMinAggregateInputType = {
    id?: true
    sourceId?: true
    longitude?: true
    latitude?: true
    number?: true
    street?: true
    unit?: true
    city?: true
    region?: true
    postcode?: true
    addressString?: true
    properties?: true
    createdAt?: true
  }

  export type AddressMaxAggregateInputType = {
    id?: true
    sourceId?: true
    longitude?: true
    latitude?: true
    number?: true
    street?: true
    unit?: true
    city?: true
    region?: true
    postcode?: true
    addressString?: true
    properties?: true
    createdAt?: true
  }

  export type AddressCountAggregateInputType = {
    id?: true
    sourceId?: true
    longitude?: true
    latitude?: true
    number?: true
    street?: true
    unit?: true
    city?: true
    region?: true
    postcode?: true
    addressString?: true
    properties?: true
    createdAt?: true
    _all?: true
  }

  export type AddressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Address to aggregate.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Addresses
    **/
    _count?: true | AddressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AddressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AddressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddressMaxAggregateInputType
  }

  export type GetAddressAggregateType<T extends AddressAggregateArgs> = {
        [P in keyof T & keyof AggregateAddress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddress[P]>
      : GetScalarType<T[P], AggregateAddress[P]>
  }




  export type AddressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithAggregationInput | AddressOrderByWithAggregationInput[]
    by: AddressScalarFieldEnum[] | AddressScalarFieldEnum
    having?: AddressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddressCountAggregateInputType | true
    _avg?: AddressAvgAggregateInputType
    _sum?: AddressSumAggregateInputType
    _min?: AddressMinAggregateInputType
    _max?: AddressMaxAggregateInputType
  }

  export type AddressGroupByOutputType = {
    id: string
    sourceId: string
    longitude: number
    latitude: number
    number: string | null
    street: string | null
    unit: string | null
    city: string | null
    region: string | null
    postcode: string | null
    addressString: string
    properties: string
    createdAt: Date
    _count: AddressCountAggregateOutputType | null
    _avg: AddressAvgAggregateOutputType | null
    _sum: AddressSumAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  type GetAddressGroupByPayload<T extends AddressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AddressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddressGroupByOutputType[P]>
            : GetScalarType<T[P], AddressGroupByOutputType[P]>
        }
      >
    >


  export type AddressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sourceId?: boolean
    longitude?: boolean
    latitude?: boolean
    number?: boolean
    street?: boolean
    unit?: boolean
    city?: boolean
    region?: boolean
    postcode?: boolean
    addressString?: boolean
    properties?: boolean
    createdAt?: boolean
    source?: boolean | GeoJSONSourceDefaultArgs<ExtArgs>
    selections?: boolean | Address$selectionsArgs<ExtArgs>
    checks?: boolean | Address$checksArgs<ExtArgs>
    _count?: boolean | AddressCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>

  export type AddressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sourceId?: boolean
    longitude?: boolean
    latitude?: boolean
    number?: boolean
    street?: boolean
    unit?: boolean
    city?: boolean
    region?: boolean
    postcode?: boolean
    addressString?: boolean
    properties?: boolean
    createdAt?: boolean
    source?: boolean | GeoJSONSourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>

  export type AddressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sourceId?: boolean
    longitude?: boolean
    latitude?: boolean
    number?: boolean
    street?: boolean
    unit?: boolean
    city?: boolean
    region?: boolean
    postcode?: boolean
    addressString?: boolean
    properties?: boolean
    createdAt?: boolean
    source?: boolean | GeoJSONSourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>

  export type AddressSelectScalar = {
    id?: boolean
    sourceId?: boolean
    longitude?: boolean
    latitude?: boolean
    number?: boolean
    street?: boolean
    unit?: boolean
    city?: boolean
    region?: boolean
    postcode?: boolean
    addressString?: boolean
    properties?: boolean
    createdAt?: boolean
  }

  export type AddressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sourceId" | "longitude" | "latitude" | "number" | "street" | "unit" | "city" | "region" | "postcode" | "addressString" | "properties" | "createdAt", ExtArgs["result"]["address"]>
  export type AddressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | GeoJSONSourceDefaultArgs<ExtArgs>
    selections?: boolean | Address$selectionsArgs<ExtArgs>
    checks?: boolean | Address$checksArgs<ExtArgs>
    _count?: boolean | AddressCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AddressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | GeoJSONSourceDefaultArgs<ExtArgs>
  }
  export type AddressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | GeoJSONSourceDefaultArgs<ExtArgs>
  }

  export type $AddressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Address"
    objects: {
      source: Prisma.$GeoJSONSourcePayload<ExtArgs>
      selections: Prisma.$AddressSelectionPayload<ExtArgs>[]
      checks: Prisma.$ServiceabilityCheckPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sourceId: string
      longitude: number
      latitude: number
      number: string | null
      street: string | null
      unit: string | null
      city: string | null
      region: string | null
      postcode: string | null
      addressString: string
      properties: string
      createdAt: Date
    }, ExtArgs["result"]["address"]>
    composites: {}
  }

  type AddressGetPayload<S extends boolean | null | undefined | AddressDefaultArgs> = $Result.GetResult<Prisma.$AddressPayload, S>

  type AddressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AddressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AddressCountAggregateInputType | true
    }

  export interface AddressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Address'], meta: { name: 'Address' } }
    /**
     * Find zero or one Address that matches the filter.
     * @param {AddressFindUniqueArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AddressFindUniqueArgs>(args: SelectSubset<T, AddressFindUniqueArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Address that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AddressFindUniqueOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AddressFindUniqueOrThrowArgs>(args: SelectSubset<T, AddressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Address that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AddressFindFirstArgs>(args?: SelectSubset<T, AddressFindFirstArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Address that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AddressFindFirstOrThrowArgs>(args?: SelectSubset<T, AddressFindFirstOrThrowArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Addresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Addresses
     * const addresses = await prisma.address.findMany()
     * 
     * // Get first 10 Addresses
     * const addresses = await prisma.address.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const addressWithIdOnly = await prisma.address.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AddressFindManyArgs>(args?: SelectSubset<T, AddressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Address.
     * @param {AddressCreateArgs} args - Arguments to create a Address.
     * @example
     * // Create one Address
     * const Address = await prisma.address.create({
     *   data: {
     *     // ... data to create a Address
     *   }
     * })
     * 
     */
    create<T extends AddressCreateArgs>(args: SelectSubset<T, AddressCreateArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Addresses.
     * @param {AddressCreateManyArgs} args - Arguments to create many Addresses.
     * @example
     * // Create many Addresses
     * const address = await prisma.address.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AddressCreateManyArgs>(args?: SelectSubset<T, AddressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Addresses and returns the data saved in the database.
     * @param {AddressCreateManyAndReturnArgs} args - Arguments to create many Addresses.
     * @example
     * // Create many Addresses
     * const address = await prisma.address.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Addresses and only return the `id`
     * const addressWithIdOnly = await prisma.address.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AddressCreateManyAndReturnArgs>(args?: SelectSubset<T, AddressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Address.
     * @param {AddressDeleteArgs} args - Arguments to delete one Address.
     * @example
     * // Delete one Address
     * const Address = await prisma.address.delete({
     *   where: {
     *     // ... filter to delete one Address
     *   }
     * })
     * 
     */
    delete<T extends AddressDeleteArgs>(args: SelectSubset<T, AddressDeleteArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Address.
     * @param {AddressUpdateArgs} args - Arguments to update one Address.
     * @example
     * // Update one Address
     * const address = await prisma.address.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AddressUpdateArgs>(args: SelectSubset<T, AddressUpdateArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Addresses.
     * @param {AddressDeleteManyArgs} args - Arguments to filter Addresses to delete.
     * @example
     * // Delete a few Addresses
     * const { count } = await prisma.address.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AddressDeleteManyArgs>(args?: SelectSubset<T, AddressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Addresses
     * const address = await prisma.address.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AddressUpdateManyArgs>(args: SelectSubset<T, AddressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Addresses and returns the data updated in the database.
     * @param {AddressUpdateManyAndReturnArgs} args - Arguments to update many Addresses.
     * @example
     * // Update many Addresses
     * const address = await prisma.address.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Addresses and only return the `id`
     * const addressWithIdOnly = await prisma.address.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AddressUpdateManyAndReturnArgs>(args: SelectSubset<T, AddressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Address.
     * @param {AddressUpsertArgs} args - Arguments to update or create a Address.
     * @example
     * // Update or create a Address
     * const address = await prisma.address.upsert({
     *   create: {
     *     // ... data to create a Address
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Address we want to update
     *   }
     * })
     */
    upsert<T extends AddressUpsertArgs>(args: SelectSubset<T, AddressUpsertArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressCountArgs} args - Arguments to filter Addresses to count.
     * @example
     * // Count the number of Addresses
     * const count = await prisma.address.count({
     *   where: {
     *     // ... the filter for the Addresses we want to count
     *   }
     * })
    **/
    count<T extends AddressCountArgs>(
      args?: Subset<T, AddressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AddressAggregateArgs>(args: Subset<T, AddressAggregateArgs>): Prisma.PrismaPromise<GetAddressAggregateType<T>>

    /**
     * Group by Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AddressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddressGroupByArgs['orderBy'] }
        : { orderBy?: AddressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Address model
   */
  readonly fields: AddressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Address.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AddressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    source<T extends GeoJSONSourceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GeoJSONSourceDefaultArgs<ExtArgs>>): Prisma__GeoJSONSourceClient<$Result.GetResult<Prisma.$GeoJSONSourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    selections<T extends Address$selectionsArgs<ExtArgs> = {}>(args?: Subset<T, Address$selectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressSelectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    checks<T extends Address$checksArgs<ExtArgs> = {}>(args?: Subset<T, Address$checksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceabilityCheckPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Address model
   */
  interface AddressFieldRefs {
    readonly id: FieldRef<"Address", 'String'>
    readonly sourceId: FieldRef<"Address", 'String'>
    readonly longitude: FieldRef<"Address", 'Float'>
    readonly latitude: FieldRef<"Address", 'Float'>
    readonly number: FieldRef<"Address", 'String'>
    readonly street: FieldRef<"Address", 'String'>
    readonly unit: FieldRef<"Address", 'String'>
    readonly city: FieldRef<"Address", 'String'>
    readonly region: FieldRef<"Address", 'String'>
    readonly postcode: FieldRef<"Address", 'String'>
    readonly addressString: FieldRef<"Address", 'String'>
    readonly properties: FieldRef<"Address", 'String'>
    readonly createdAt: FieldRef<"Address", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Address findUnique
   */
  export type AddressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address findUniqueOrThrow
   */
  export type AddressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address findFirst
   */
  export type AddressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address findFirstOrThrow
   */
  export type AddressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address findMany
   */
  export type AddressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Addresses to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address create
   */
  export type AddressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The data needed to create a Address.
     */
    data: XOR<AddressCreateInput, AddressUncheckedCreateInput>
  }

  /**
   * Address createMany
   */
  export type AddressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Addresses.
     */
    data: AddressCreateManyInput | AddressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Address createManyAndReturn
   */
  export type AddressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * The data used to create many Addresses.
     */
    data: AddressCreateManyInput | AddressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Address update
   */
  export type AddressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The data needed to update a Address.
     */
    data: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
    /**
     * Choose, which Address to update.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address updateMany
   */
  export type AddressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Addresses.
     */
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyInput>
    /**
     * Filter which Addresses to update
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to update.
     */
    limit?: number
  }

  /**
   * Address updateManyAndReturn
   */
  export type AddressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * The data used to update Addresses.
     */
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyInput>
    /**
     * Filter which Addresses to update
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Address upsert
   */
  export type AddressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The filter to search for the Address to update in case it exists.
     */
    where: AddressWhereUniqueInput
    /**
     * In case the Address found by the `where` argument doesn't exist, create a new Address with this data.
     */
    create: XOR<AddressCreateInput, AddressUncheckedCreateInput>
    /**
     * In case the Address was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
  }

  /**
   * Address delete
   */
  export type AddressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter which Address to delete.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address deleteMany
   */
  export type AddressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Addresses to delete
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to delete.
     */
    limit?: number
  }

  /**
   * Address.selections
   */
  export type Address$selectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressSelection
     */
    select?: AddressSelectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressSelection
     */
    omit?: AddressSelectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressSelectionInclude<ExtArgs> | null
    where?: AddressSelectionWhereInput
    orderBy?: AddressSelectionOrderByWithRelationInput | AddressSelectionOrderByWithRelationInput[]
    cursor?: AddressSelectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressSelectionScalarFieldEnum | AddressSelectionScalarFieldEnum[]
  }

  /**
   * Address.checks
   */
  export type Address$checksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceabilityCheck
     */
    select?: ServiceabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceabilityCheck
     */
    omit?: ServiceabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceabilityCheckInclude<ExtArgs> | null
    where?: ServiceabilityCheckWhereInput
    orderBy?: ServiceabilityCheckOrderByWithRelationInput | ServiceabilityCheckOrderByWithRelationInput[]
    cursor?: ServiceabilityCheckWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceabilityCheckScalarFieldEnum | ServiceabilityCheckScalarFieldEnum[]
  }

  /**
   * Address without action
   */
  export type AddressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
  }


  /**
   * Model ServiceabilityCheck
   */

  export type AggregateServiceabilityCheck = {
    _count: ServiceabilityCheckCountAggregateOutputType | null
    _avg: ServiceabilityCheckAvgAggregateOutputType | null
    _sum: ServiceabilityCheckSumAggregateOutputType | null
    _min: ServiceabilityCheckMinAggregateOutputType | null
    _max: ServiceabilityCheckMaxAggregateOutputType | null
  }

  export type ServiceabilityCheckAvgAggregateOutputType = {
    isPreSale: number | null
  }

  export type ServiceabilityCheckSumAggregateOutputType = {
    isPreSale: number | null
  }

  export type ServiceabilityCheckMinAggregateOutputType = {
    id: string | null
    addressId: string | null
    checkedAt: Date | null
    selectionId: string | null
    batchJobId: string | null
    serviceable: boolean | null
    serviceabilityType: string | null
    salesType: string | null
    status: string | null
    cstatus: string | null
    isPreSale: number | null
    salesStatus: string | null
    matchType: string | null
    apiCreateDate: Date | null
    apiUpdateDate: Date | null
    error: string | null
  }

  export type ServiceabilityCheckMaxAggregateOutputType = {
    id: string | null
    addressId: string | null
    checkedAt: Date | null
    selectionId: string | null
    batchJobId: string | null
    serviceable: boolean | null
    serviceabilityType: string | null
    salesType: string | null
    status: string | null
    cstatus: string | null
    isPreSale: number | null
    salesStatus: string | null
    matchType: string | null
    apiCreateDate: Date | null
    apiUpdateDate: Date | null
    error: string | null
  }

  export type ServiceabilityCheckCountAggregateOutputType = {
    id: number
    addressId: number
    checkedAt: number
    selectionId: number
    batchJobId: number
    serviceable: number
    serviceabilityType: number
    salesType: number
    status: number
    cstatus: number
    isPreSale: number
    salesStatus: number
    matchType: number
    apiCreateDate: number
    apiUpdateDate: number
    error: number
    _all: number
  }


  export type ServiceabilityCheckAvgAggregateInputType = {
    isPreSale?: true
  }

  export type ServiceabilityCheckSumAggregateInputType = {
    isPreSale?: true
  }

  export type ServiceabilityCheckMinAggregateInputType = {
    id?: true
    addressId?: true
    checkedAt?: true
    selectionId?: true
    batchJobId?: true
    serviceable?: true
    serviceabilityType?: true
    salesType?: true
    status?: true
    cstatus?: true
    isPreSale?: true
    salesStatus?: true
    matchType?: true
    apiCreateDate?: true
    apiUpdateDate?: true
    error?: true
  }

  export type ServiceabilityCheckMaxAggregateInputType = {
    id?: true
    addressId?: true
    checkedAt?: true
    selectionId?: true
    batchJobId?: true
    serviceable?: true
    serviceabilityType?: true
    salesType?: true
    status?: true
    cstatus?: true
    isPreSale?: true
    salesStatus?: true
    matchType?: true
    apiCreateDate?: true
    apiUpdateDate?: true
    error?: true
  }

  export type ServiceabilityCheckCountAggregateInputType = {
    id?: true
    addressId?: true
    checkedAt?: true
    selectionId?: true
    batchJobId?: true
    serviceable?: true
    serviceabilityType?: true
    salesType?: true
    status?: true
    cstatus?: true
    isPreSale?: true
    salesStatus?: true
    matchType?: true
    apiCreateDate?: true
    apiUpdateDate?: true
    error?: true
    _all?: true
  }

  export type ServiceabilityCheckAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceabilityCheck to aggregate.
     */
    where?: ServiceabilityCheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceabilityChecks to fetch.
     */
    orderBy?: ServiceabilityCheckOrderByWithRelationInput | ServiceabilityCheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceabilityCheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceabilityChecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceabilityChecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceabilityChecks
    **/
    _count?: true | ServiceabilityCheckCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceabilityCheckAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceabilityCheckSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceabilityCheckMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceabilityCheckMaxAggregateInputType
  }

  export type GetServiceabilityCheckAggregateType<T extends ServiceabilityCheckAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceabilityCheck]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceabilityCheck[P]>
      : GetScalarType<T[P], AggregateServiceabilityCheck[P]>
  }




  export type ServiceabilityCheckGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceabilityCheckWhereInput
    orderBy?: ServiceabilityCheckOrderByWithAggregationInput | ServiceabilityCheckOrderByWithAggregationInput[]
    by: ServiceabilityCheckScalarFieldEnum[] | ServiceabilityCheckScalarFieldEnum
    having?: ServiceabilityCheckScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceabilityCheckCountAggregateInputType | true
    _avg?: ServiceabilityCheckAvgAggregateInputType
    _sum?: ServiceabilityCheckSumAggregateInputType
    _min?: ServiceabilityCheckMinAggregateInputType
    _max?: ServiceabilityCheckMaxAggregateInputType
  }

  export type ServiceabilityCheckGroupByOutputType = {
    id: string
    addressId: string
    checkedAt: Date
    selectionId: string | null
    batchJobId: string | null
    serviceable: boolean
    serviceabilityType: string
    salesType: string | null
    status: string | null
    cstatus: string | null
    isPreSale: number | null
    salesStatus: string | null
    matchType: string | null
    apiCreateDate: Date | null
    apiUpdateDate: Date | null
    error: string | null
    _count: ServiceabilityCheckCountAggregateOutputType | null
    _avg: ServiceabilityCheckAvgAggregateOutputType | null
    _sum: ServiceabilityCheckSumAggregateOutputType | null
    _min: ServiceabilityCheckMinAggregateOutputType | null
    _max: ServiceabilityCheckMaxAggregateOutputType | null
  }

  type GetServiceabilityCheckGroupByPayload<T extends ServiceabilityCheckGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceabilityCheckGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceabilityCheckGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceabilityCheckGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceabilityCheckGroupByOutputType[P]>
        }
      >
    >


  export type ServiceabilityCheckSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    addressId?: boolean
    checkedAt?: boolean
    selectionId?: boolean
    batchJobId?: boolean
    serviceable?: boolean
    serviceabilityType?: boolean
    salesType?: boolean
    status?: boolean
    cstatus?: boolean
    isPreSale?: boolean
    salesStatus?: boolean
    matchType?: boolean
    apiCreateDate?: boolean
    apiUpdateDate?: boolean
    error?: boolean
    address?: boolean | AddressDefaultArgs<ExtArgs>
    batchJob?: boolean | ServiceabilityCheck$batchJobArgs<ExtArgs>
  }, ExtArgs["result"]["serviceabilityCheck"]>

  export type ServiceabilityCheckSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    addressId?: boolean
    checkedAt?: boolean
    selectionId?: boolean
    batchJobId?: boolean
    serviceable?: boolean
    serviceabilityType?: boolean
    salesType?: boolean
    status?: boolean
    cstatus?: boolean
    isPreSale?: boolean
    salesStatus?: boolean
    matchType?: boolean
    apiCreateDate?: boolean
    apiUpdateDate?: boolean
    error?: boolean
    address?: boolean | AddressDefaultArgs<ExtArgs>
    batchJob?: boolean | ServiceabilityCheck$batchJobArgs<ExtArgs>
  }, ExtArgs["result"]["serviceabilityCheck"]>

  export type ServiceabilityCheckSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    addressId?: boolean
    checkedAt?: boolean
    selectionId?: boolean
    batchJobId?: boolean
    serviceable?: boolean
    serviceabilityType?: boolean
    salesType?: boolean
    status?: boolean
    cstatus?: boolean
    isPreSale?: boolean
    salesStatus?: boolean
    matchType?: boolean
    apiCreateDate?: boolean
    apiUpdateDate?: boolean
    error?: boolean
    address?: boolean | AddressDefaultArgs<ExtArgs>
    batchJob?: boolean | ServiceabilityCheck$batchJobArgs<ExtArgs>
  }, ExtArgs["result"]["serviceabilityCheck"]>

  export type ServiceabilityCheckSelectScalar = {
    id?: boolean
    addressId?: boolean
    checkedAt?: boolean
    selectionId?: boolean
    batchJobId?: boolean
    serviceable?: boolean
    serviceabilityType?: boolean
    salesType?: boolean
    status?: boolean
    cstatus?: boolean
    isPreSale?: boolean
    salesStatus?: boolean
    matchType?: boolean
    apiCreateDate?: boolean
    apiUpdateDate?: boolean
    error?: boolean
  }

  export type ServiceabilityCheckOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "addressId" | "checkedAt" | "selectionId" | "batchJobId" | "serviceable" | "serviceabilityType" | "salesType" | "status" | "cstatus" | "isPreSale" | "salesStatus" | "matchType" | "apiCreateDate" | "apiUpdateDate" | "error", ExtArgs["result"]["serviceabilityCheck"]>
  export type ServiceabilityCheckInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    address?: boolean | AddressDefaultArgs<ExtArgs>
    batchJob?: boolean | ServiceabilityCheck$batchJobArgs<ExtArgs>
  }
  export type ServiceabilityCheckIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    address?: boolean | AddressDefaultArgs<ExtArgs>
    batchJob?: boolean | ServiceabilityCheck$batchJobArgs<ExtArgs>
  }
  export type ServiceabilityCheckIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    address?: boolean | AddressDefaultArgs<ExtArgs>
    batchJob?: boolean | ServiceabilityCheck$batchJobArgs<ExtArgs>
  }

  export type $ServiceabilityCheckPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceabilityCheck"
    objects: {
      address: Prisma.$AddressPayload<ExtArgs>
      batchJob: Prisma.$BatchJobPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      addressId: string
      checkedAt: Date
      selectionId: string | null
      batchJobId: string | null
      serviceable: boolean
      serviceabilityType: string
      salesType: string | null
      status: string | null
      cstatus: string | null
      isPreSale: number | null
      salesStatus: string | null
      matchType: string | null
      apiCreateDate: Date | null
      apiUpdateDate: Date | null
      error: string | null
    }, ExtArgs["result"]["serviceabilityCheck"]>
    composites: {}
  }

  type ServiceabilityCheckGetPayload<S extends boolean | null | undefined | ServiceabilityCheckDefaultArgs> = $Result.GetResult<Prisma.$ServiceabilityCheckPayload, S>

  type ServiceabilityCheckCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceabilityCheckFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceabilityCheckCountAggregateInputType | true
    }

  export interface ServiceabilityCheckDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceabilityCheck'], meta: { name: 'ServiceabilityCheck' } }
    /**
     * Find zero or one ServiceabilityCheck that matches the filter.
     * @param {ServiceabilityCheckFindUniqueArgs} args - Arguments to find a ServiceabilityCheck
     * @example
     * // Get one ServiceabilityCheck
     * const serviceabilityCheck = await prisma.serviceabilityCheck.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceabilityCheckFindUniqueArgs>(args: SelectSubset<T, ServiceabilityCheckFindUniqueArgs<ExtArgs>>): Prisma__ServiceabilityCheckClient<$Result.GetResult<Prisma.$ServiceabilityCheckPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServiceabilityCheck that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceabilityCheckFindUniqueOrThrowArgs} args - Arguments to find a ServiceabilityCheck
     * @example
     * // Get one ServiceabilityCheck
     * const serviceabilityCheck = await prisma.serviceabilityCheck.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceabilityCheckFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceabilityCheckFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceabilityCheckClient<$Result.GetResult<Prisma.$ServiceabilityCheckPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceabilityCheck that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceabilityCheckFindFirstArgs} args - Arguments to find a ServiceabilityCheck
     * @example
     * // Get one ServiceabilityCheck
     * const serviceabilityCheck = await prisma.serviceabilityCheck.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceabilityCheckFindFirstArgs>(args?: SelectSubset<T, ServiceabilityCheckFindFirstArgs<ExtArgs>>): Prisma__ServiceabilityCheckClient<$Result.GetResult<Prisma.$ServiceabilityCheckPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceabilityCheck that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceabilityCheckFindFirstOrThrowArgs} args - Arguments to find a ServiceabilityCheck
     * @example
     * // Get one ServiceabilityCheck
     * const serviceabilityCheck = await prisma.serviceabilityCheck.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceabilityCheckFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceabilityCheckFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceabilityCheckClient<$Result.GetResult<Prisma.$ServiceabilityCheckPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServiceabilityChecks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceabilityCheckFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceabilityChecks
     * const serviceabilityChecks = await prisma.serviceabilityCheck.findMany()
     * 
     * // Get first 10 ServiceabilityChecks
     * const serviceabilityChecks = await prisma.serviceabilityCheck.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceabilityCheckWithIdOnly = await prisma.serviceabilityCheck.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceabilityCheckFindManyArgs>(args?: SelectSubset<T, ServiceabilityCheckFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceabilityCheckPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServiceabilityCheck.
     * @param {ServiceabilityCheckCreateArgs} args - Arguments to create a ServiceabilityCheck.
     * @example
     * // Create one ServiceabilityCheck
     * const ServiceabilityCheck = await prisma.serviceabilityCheck.create({
     *   data: {
     *     // ... data to create a ServiceabilityCheck
     *   }
     * })
     * 
     */
    create<T extends ServiceabilityCheckCreateArgs>(args: SelectSubset<T, ServiceabilityCheckCreateArgs<ExtArgs>>): Prisma__ServiceabilityCheckClient<$Result.GetResult<Prisma.$ServiceabilityCheckPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServiceabilityChecks.
     * @param {ServiceabilityCheckCreateManyArgs} args - Arguments to create many ServiceabilityChecks.
     * @example
     * // Create many ServiceabilityChecks
     * const serviceabilityCheck = await prisma.serviceabilityCheck.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceabilityCheckCreateManyArgs>(args?: SelectSubset<T, ServiceabilityCheckCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceabilityChecks and returns the data saved in the database.
     * @param {ServiceabilityCheckCreateManyAndReturnArgs} args - Arguments to create many ServiceabilityChecks.
     * @example
     * // Create many ServiceabilityChecks
     * const serviceabilityCheck = await prisma.serviceabilityCheck.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceabilityChecks and only return the `id`
     * const serviceabilityCheckWithIdOnly = await prisma.serviceabilityCheck.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceabilityCheckCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceabilityCheckCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceabilityCheckPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServiceabilityCheck.
     * @param {ServiceabilityCheckDeleteArgs} args - Arguments to delete one ServiceabilityCheck.
     * @example
     * // Delete one ServiceabilityCheck
     * const ServiceabilityCheck = await prisma.serviceabilityCheck.delete({
     *   where: {
     *     // ... filter to delete one ServiceabilityCheck
     *   }
     * })
     * 
     */
    delete<T extends ServiceabilityCheckDeleteArgs>(args: SelectSubset<T, ServiceabilityCheckDeleteArgs<ExtArgs>>): Prisma__ServiceabilityCheckClient<$Result.GetResult<Prisma.$ServiceabilityCheckPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServiceabilityCheck.
     * @param {ServiceabilityCheckUpdateArgs} args - Arguments to update one ServiceabilityCheck.
     * @example
     * // Update one ServiceabilityCheck
     * const serviceabilityCheck = await prisma.serviceabilityCheck.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceabilityCheckUpdateArgs>(args: SelectSubset<T, ServiceabilityCheckUpdateArgs<ExtArgs>>): Prisma__ServiceabilityCheckClient<$Result.GetResult<Prisma.$ServiceabilityCheckPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServiceabilityChecks.
     * @param {ServiceabilityCheckDeleteManyArgs} args - Arguments to filter ServiceabilityChecks to delete.
     * @example
     * // Delete a few ServiceabilityChecks
     * const { count } = await prisma.serviceabilityCheck.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceabilityCheckDeleteManyArgs>(args?: SelectSubset<T, ServiceabilityCheckDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceabilityChecks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceabilityCheckUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceabilityChecks
     * const serviceabilityCheck = await prisma.serviceabilityCheck.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceabilityCheckUpdateManyArgs>(args: SelectSubset<T, ServiceabilityCheckUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceabilityChecks and returns the data updated in the database.
     * @param {ServiceabilityCheckUpdateManyAndReturnArgs} args - Arguments to update many ServiceabilityChecks.
     * @example
     * // Update many ServiceabilityChecks
     * const serviceabilityCheck = await prisma.serviceabilityCheck.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServiceabilityChecks and only return the `id`
     * const serviceabilityCheckWithIdOnly = await prisma.serviceabilityCheck.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceabilityCheckUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceabilityCheckUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceabilityCheckPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServiceabilityCheck.
     * @param {ServiceabilityCheckUpsertArgs} args - Arguments to update or create a ServiceabilityCheck.
     * @example
     * // Update or create a ServiceabilityCheck
     * const serviceabilityCheck = await prisma.serviceabilityCheck.upsert({
     *   create: {
     *     // ... data to create a ServiceabilityCheck
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceabilityCheck we want to update
     *   }
     * })
     */
    upsert<T extends ServiceabilityCheckUpsertArgs>(args: SelectSubset<T, ServiceabilityCheckUpsertArgs<ExtArgs>>): Prisma__ServiceabilityCheckClient<$Result.GetResult<Prisma.$ServiceabilityCheckPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServiceabilityChecks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceabilityCheckCountArgs} args - Arguments to filter ServiceabilityChecks to count.
     * @example
     * // Count the number of ServiceabilityChecks
     * const count = await prisma.serviceabilityCheck.count({
     *   where: {
     *     // ... the filter for the ServiceabilityChecks we want to count
     *   }
     * })
    **/
    count<T extends ServiceabilityCheckCountArgs>(
      args?: Subset<T, ServiceabilityCheckCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceabilityCheckCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceabilityCheck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceabilityCheckAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceabilityCheckAggregateArgs>(args: Subset<T, ServiceabilityCheckAggregateArgs>): Prisma.PrismaPromise<GetServiceabilityCheckAggregateType<T>>

    /**
     * Group by ServiceabilityCheck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceabilityCheckGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceabilityCheckGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceabilityCheckGroupByArgs['orderBy'] }
        : { orderBy?: ServiceabilityCheckGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceabilityCheckGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceabilityCheckGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceabilityCheck model
   */
  readonly fields: ServiceabilityCheckFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceabilityCheck.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceabilityCheckClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    address<T extends AddressDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AddressDefaultArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    batchJob<T extends ServiceabilityCheck$batchJobArgs<ExtArgs> = {}>(args?: Subset<T, ServiceabilityCheck$batchJobArgs<ExtArgs>>): Prisma__BatchJobClient<$Result.GetResult<Prisma.$BatchJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ServiceabilityCheck model
   */
  interface ServiceabilityCheckFieldRefs {
    readonly id: FieldRef<"ServiceabilityCheck", 'String'>
    readonly addressId: FieldRef<"ServiceabilityCheck", 'String'>
    readonly checkedAt: FieldRef<"ServiceabilityCheck", 'DateTime'>
    readonly selectionId: FieldRef<"ServiceabilityCheck", 'String'>
    readonly batchJobId: FieldRef<"ServiceabilityCheck", 'String'>
    readonly serviceable: FieldRef<"ServiceabilityCheck", 'Boolean'>
    readonly serviceabilityType: FieldRef<"ServiceabilityCheck", 'String'>
    readonly salesType: FieldRef<"ServiceabilityCheck", 'String'>
    readonly status: FieldRef<"ServiceabilityCheck", 'String'>
    readonly cstatus: FieldRef<"ServiceabilityCheck", 'String'>
    readonly isPreSale: FieldRef<"ServiceabilityCheck", 'Int'>
    readonly salesStatus: FieldRef<"ServiceabilityCheck", 'String'>
    readonly matchType: FieldRef<"ServiceabilityCheck", 'String'>
    readonly apiCreateDate: FieldRef<"ServiceabilityCheck", 'DateTime'>
    readonly apiUpdateDate: FieldRef<"ServiceabilityCheck", 'DateTime'>
    readonly error: FieldRef<"ServiceabilityCheck", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ServiceabilityCheck findUnique
   */
  export type ServiceabilityCheckFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceabilityCheck
     */
    select?: ServiceabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceabilityCheck
     */
    omit?: ServiceabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceabilityCheckInclude<ExtArgs> | null
    /**
     * Filter, which ServiceabilityCheck to fetch.
     */
    where: ServiceabilityCheckWhereUniqueInput
  }

  /**
   * ServiceabilityCheck findUniqueOrThrow
   */
  export type ServiceabilityCheckFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceabilityCheck
     */
    select?: ServiceabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceabilityCheck
     */
    omit?: ServiceabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceabilityCheckInclude<ExtArgs> | null
    /**
     * Filter, which ServiceabilityCheck to fetch.
     */
    where: ServiceabilityCheckWhereUniqueInput
  }

  /**
   * ServiceabilityCheck findFirst
   */
  export type ServiceabilityCheckFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceabilityCheck
     */
    select?: ServiceabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceabilityCheck
     */
    omit?: ServiceabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceabilityCheckInclude<ExtArgs> | null
    /**
     * Filter, which ServiceabilityCheck to fetch.
     */
    where?: ServiceabilityCheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceabilityChecks to fetch.
     */
    orderBy?: ServiceabilityCheckOrderByWithRelationInput | ServiceabilityCheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceabilityChecks.
     */
    cursor?: ServiceabilityCheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceabilityChecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceabilityChecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceabilityChecks.
     */
    distinct?: ServiceabilityCheckScalarFieldEnum | ServiceabilityCheckScalarFieldEnum[]
  }

  /**
   * ServiceabilityCheck findFirstOrThrow
   */
  export type ServiceabilityCheckFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceabilityCheck
     */
    select?: ServiceabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceabilityCheck
     */
    omit?: ServiceabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceabilityCheckInclude<ExtArgs> | null
    /**
     * Filter, which ServiceabilityCheck to fetch.
     */
    where?: ServiceabilityCheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceabilityChecks to fetch.
     */
    orderBy?: ServiceabilityCheckOrderByWithRelationInput | ServiceabilityCheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceabilityChecks.
     */
    cursor?: ServiceabilityCheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceabilityChecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceabilityChecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceabilityChecks.
     */
    distinct?: ServiceabilityCheckScalarFieldEnum | ServiceabilityCheckScalarFieldEnum[]
  }

  /**
   * ServiceabilityCheck findMany
   */
  export type ServiceabilityCheckFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceabilityCheck
     */
    select?: ServiceabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceabilityCheck
     */
    omit?: ServiceabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceabilityCheckInclude<ExtArgs> | null
    /**
     * Filter, which ServiceabilityChecks to fetch.
     */
    where?: ServiceabilityCheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceabilityChecks to fetch.
     */
    orderBy?: ServiceabilityCheckOrderByWithRelationInput | ServiceabilityCheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceabilityChecks.
     */
    cursor?: ServiceabilityCheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceabilityChecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceabilityChecks.
     */
    skip?: number
    distinct?: ServiceabilityCheckScalarFieldEnum | ServiceabilityCheckScalarFieldEnum[]
  }

  /**
   * ServiceabilityCheck create
   */
  export type ServiceabilityCheckCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceabilityCheck
     */
    select?: ServiceabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceabilityCheck
     */
    omit?: ServiceabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceabilityCheckInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceabilityCheck.
     */
    data: XOR<ServiceabilityCheckCreateInput, ServiceabilityCheckUncheckedCreateInput>
  }

  /**
   * ServiceabilityCheck createMany
   */
  export type ServiceabilityCheckCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceabilityChecks.
     */
    data: ServiceabilityCheckCreateManyInput | ServiceabilityCheckCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceabilityCheck createManyAndReturn
   */
  export type ServiceabilityCheckCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceabilityCheck
     */
    select?: ServiceabilityCheckSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceabilityCheck
     */
    omit?: ServiceabilityCheckOmit<ExtArgs> | null
    /**
     * The data used to create many ServiceabilityChecks.
     */
    data: ServiceabilityCheckCreateManyInput | ServiceabilityCheckCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceabilityCheckIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceabilityCheck update
   */
  export type ServiceabilityCheckUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceabilityCheck
     */
    select?: ServiceabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceabilityCheck
     */
    omit?: ServiceabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceabilityCheckInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceabilityCheck.
     */
    data: XOR<ServiceabilityCheckUpdateInput, ServiceabilityCheckUncheckedUpdateInput>
    /**
     * Choose, which ServiceabilityCheck to update.
     */
    where: ServiceabilityCheckWhereUniqueInput
  }

  /**
   * ServiceabilityCheck updateMany
   */
  export type ServiceabilityCheckUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceabilityChecks.
     */
    data: XOR<ServiceabilityCheckUpdateManyMutationInput, ServiceabilityCheckUncheckedUpdateManyInput>
    /**
     * Filter which ServiceabilityChecks to update
     */
    where?: ServiceabilityCheckWhereInput
    /**
     * Limit how many ServiceabilityChecks to update.
     */
    limit?: number
  }

  /**
   * ServiceabilityCheck updateManyAndReturn
   */
  export type ServiceabilityCheckUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceabilityCheck
     */
    select?: ServiceabilityCheckSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceabilityCheck
     */
    omit?: ServiceabilityCheckOmit<ExtArgs> | null
    /**
     * The data used to update ServiceabilityChecks.
     */
    data: XOR<ServiceabilityCheckUpdateManyMutationInput, ServiceabilityCheckUncheckedUpdateManyInput>
    /**
     * Filter which ServiceabilityChecks to update
     */
    where?: ServiceabilityCheckWhereInput
    /**
     * Limit how many ServiceabilityChecks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceabilityCheckIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceabilityCheck upsert
   */
  export type ServiceabilityCheckUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceabilityCheck
     */
    select?: ServiceabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceabilityCheck
     */
    omit?: ServiceabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceabilityCheckInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceabilityCheck to update in case it exists.
     */
    where: ServiceabilityCheckWhereUniqueInput
    /**
     * In case the ServiceabilityCheck found by the `where` argument doesn't exist, create a new ServiceabilityCheck with this data.
     */
    create: XOR<ServiceabilityCheckCreateInput, ServiceabilityCheckUncheckedCreateInput>
    /**
     * In case the ServiceabilityCheck was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceabilityCheckUpdateInput, ServiceabilityCheckUncheckedUpdateInput>
  }

  /**
   * ServiceabilityCheck delete
   */
  export type ServiceabilityCheckDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceabilityCheck
     */
    select?: ServiceabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceabilityCheck
     */
    omit?: ServiceabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceabilityCheckInclude<ExtArgs> | null
    /**
     * Filter which ServiceabilityCheck to delete.
     */
    where: ServiceabilityCheckWhereUniqueInput
  }

  /**
   * ServiceabilityCheck deleteMany
   */
  export type ServiceabilityCheckDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceabilityChecks to delete
     */
    where?: ServiceabilityCheckWhereInput
    /**
     * Limit how many ServiceabilityChecks to delete.
     */
    limit?: number
  }

  /**
   * ServiceabilityCheck.batchJob
   */
  export type ServiceabilityCheck$batchJobArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchJob
     */
    select?: BatchJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchJob
     */
    omit?: BatchJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchJobInclude<ExtArgs> | null
    where?: BatchJobWhereInput
  }

  /**
   * ServiceabilityCheck without action
   */
  export type ServiceabilityCheckDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceabilityCheck
     */
    select?: ServiceabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceabilityCheck
     */
    omit?: ServiceabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceabilityCheckInclude<ExtArgs> | null
  }


  /**
   * Model BatchJob
   */

  export type AggregateBatchJob = {
    _count: BatchJobCountAggregateOutputType | null
    _avg: BatchJobAvgAggregateOutputType | null
    _sum: BatchJobSumAggregateOutputType | null
    _min: BatchJobMinAggregateOutputType | null
    _max: BatchJobMaxAggregateOutputType | null
  }

  export type BatchJobAvgAggregateOutputType = {
    totalAddresses: number | null
    checkedCount: number | null
    serviceableCount: number | null
    preorderCount: number | null
    noServiceCount: number | null
    currentIndex: number | null
  }

  export type BatchJobSumAggregateOutputType = {
    totalAddresses: number | null
    checkedCount: number | null
    serviceableCount: number | null
    preorderCount: number | null
    noServiceCount: number | null
    currentIndex: number | null
  }

  export type BatchJobMinAggregateOutputType = {
    id: string | null
    selectionId: string | null
    name: string | null
    status: string | null
    recheckType: string | null
    totalAddresses: number | null
    checkedCount: number | null
    serviceableCount: number | null
    preorderCount: number | null
    noServiceCount: number | null
    startedAt: Date | null
    completedAt: Date | null
    lastCheckAt: Date | null
    currentIndex: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BatchJobMaxAggregateOutputType = {
    id: string | null
    selectionId: string | null
    name: string | null
    status: string | null
    recheckType: string | null
    totalAddresses: number | null
    checkedCount: number | null
    serviceableCount: number | null
    preorderCount: number | null
    noServiceCount: number | null
    startedAt: Date | null
    completedAt: Date | null
    lastCheckAt: Date | null
    currentIndex: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BatchJobCountAggregateOutputType = {
    id: number
    selectionId: number
    name: number
    status: number
    recheckType: number
    totalAddresses: number
    checkedCount: number
    serviceableCount: number
    preorderCount: number
    noServiceCount: number
    startedAt: number
    completedAt: number
    lastCheckAt: number
    currentIndex: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BatchJobAvgAggregateInputType = {
    totalAddresses?: true
    checkedCount?: true
    serviceableCount?: true
    preorderCount?: true
    noServiceCount?: true
    currentIndex?: true
  }

  export type BatchJobSumAggregateInputType = {
    totalAddresses?: true
    checkedCount?: true
    serviceableCount?: true
    preorderCount?: true
    noServiceCount?: true
    currentIndex?: true
  }

  export type BatchJobMinAggregateInputType = {
    id?: true
    selectionId?: true
    name?: true
    status?: true
    recheckType?: true
    totalAddresses?: true
    checkedCount?: true
    serviceableCount?: true
    preorderCount?: true
    noServiceCount?: true
    startedAt?: true
    completedAt?: true
    lastCheckAt?: true
    currentIndex?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BatchJobMaxAggregateInputType = {
    id?: true
    selectionId?: true
    name?: true
    status?: true
    recheckType?: true
    totalAddresses?: true
    checkedCount?: true
    serviceableCount?: true
    preorderCount?: true
    noServiceCount?: true
    startedAt?: true
    completedAt?: true
    lastCheckAt?: true
    currentIndex?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BatchJobCountAggregateInputType = {
    id?: true
    selectionId?: true
    name?: true
    status?: true
    recheckType?: true
    totalAddresses?: true
    checkedCount?: true
    serviceableCount?: true
    preorderCount?: true
    noServiceCount?: true
    startedAt?: true
    completedAt?: true
    lastCheckAt?: true
    currentIndex?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BatchJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BatchJob to aggregate.
     */
    where?: BatchJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BatchJobs to fetch.
     */
    orderBy?: BatchJobOrderByWithRelationInput | BatchJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BatchJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BatchJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BatchJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BatchJobs
    **/
    _count?: true | BatchJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BatchJobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BatchJobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BatchJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BatchJobMaxAggregateInputType
  }

  export type GetBatchJobAggregateType<T extends BatchJobAggregateArgs> = {
        [P in keyof T & keyof AggregateBatchJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBatchJob[P]>
      : GetScalarType<T[P], AggregateBatchJob[P]>
  }




  export type BatchJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BatchJobWhereInput
    orderBy?: BatchJobOrderByWithAggregationInput | BatchJobOrderByWithAggregationInput[]
    by: BatchJobScalarFieldEnum[] | BatchJobScalarFieldEnum
    having?: BatchJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BatchJobCountAggregateInputType | true
    _avg?: BatchJobAvgAggregateInputType
    _sum?: BatchJobSumAggregateInputType
    _min?: BatchJobMinAggregateInputType
    _max?: BatchJobMaxAggregateInputType
  }

  export type BatchJobGroupByOutputType = {
    id: string
    selectionId: string | null
    name: string
    status: string
    recheckType: string
    totalAddresses: number
    checkedCount: number
    serviceableCount: number
    preorderCount: number
    noServiceCount: number
    startedAt: Date | null
    completedAt: Date | null
    lastCheckAt: Date | null
    currentIndex: number
    createdAt: Date
    updatedAt: Date
    _count: BatchJobCountAggregateOutputType | null
    _avg: BatchJobAvgAggregateOutputType | null
    _sum: BatchJobSumAggregateOutputType | null
    _min: BatchJobMinAggregateOutputType | null
    _max: BatchJobMaxAggregateOutputType | null
  }

  type GetBatchJobGroupByPayload<T extends BatchJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BatchJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BatchJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BatchJobGroupByOutputType[P]>
            : GetScalarType<T[P], BatchJobGroupByOutputType[P]>
        }
      >
    >


  export type BatchJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    selectionId?: boolean
    name?: boolean
    status?: boolean
    recheckType?: boolean
    totalAddresses?: boolean
    checkedCount?: boolean
    serviceableCount?: boolean
    preorderCount?: boolean
    noServiceCount?: boolean
    startedAt?: boolean
    completedAt?: boolean
    lastCheckAt?: boolean
    currentIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    checks?: boolean | BatchJob$checksArgs<ExtArgs>
    _count?: boolean | BatchJobCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["batchJob"]>

  export type BatchJobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    selectionId?: boolean
    name?: boolean
    status?: boolean
    recheckType?: boolean
    totalAddresses?: boolean
    checkedCount?: boolean
    serviceableCount?: boolean
    preorderCount?: boolean
    noServiceCount?: boolean
    startedAt?: boolean
    completedAt?: boolean
    lastCheckAt?: boolean
    currentIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["batchJob"]>

  export type BatchJobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    selectionId?: boolean
    name?: boolean
    status?: boolean
    recheckType?: boolean
    totalAddresses?: boolean
    checkedCount?: boolean
    serviceableCount?: boolean
    preorderCount?: boolean
    noServiceCount?: boolean
    startedAt?: boolean
    completedAt?: boolean
    lastCheckAt?: boolean
    currentIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["batchJob"]>

  export type BatchJobSelectScalar = {
    id?: boolean
    selectionId?: boolean
    name?: boolean
    status?: boolean
    recheckType?: boolean
    totalAddresses?: boolean
    checkedCount?: boolean
    serviceableCount?: boolean
    preorderCount?: boolean
    noServiceCount?: boolean
    startedAt?: boolean
    completedAt?: boolean
    lastCheckAt?: boolean
    currentIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BatchJobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "selectionId" | "name" | "status" | "recheckType" | "totalAddresses" | "checkedCount" | "serviceableCount" | "preorderCount" | "noServiceCount" | "startedAt" | "completedAt" | "lastCheckAt" | "currentIndex" | "createdAt" | "updatedAt", ExtArgs["result"]["batchJob"]>
  export type BatchJobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    checks?: boolean | BatchJob$checksArgs<ExtArgs>
    _count?: boolean | BatchJobCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BatchJobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BatchJobIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BatchJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BatchJob"
    objects: {
      checks: Prisma.$ServiceabilityCheckPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      selectionId: string | null
      name: string
      status: string
      recheckType: string
      totalAddresses: number
      checkedCount: number
      serviceableCount: number
      preorderCount: number
      noServiceCount: number
      startedAt: Date | null
      completedAt: Date | null
      lastCheckAt: Date | null
      currentIndex: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["batchJob"]>
    composites: {}
  }

  type BatchJobGetPayload<S extends boolean | null | undefined | BatchJobDefaultArgs> = $Result.GetResult<Prisma.$BatchJobPayload, S>

  type BatchJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BatchJobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BatchJobCountAggregateInputType | true
    }

  export interface BatchJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BatchJob'], meta: { name: 'BatchJob' } }
    /**
     * Find zero or one BatchJob that matches the filter.
     * @param {BatchJobFindUniqueArgs} args - Arguments to find a BatchJob
     * @example
     * // Get one BatchJob
     * const batchJob = await prisma.batchJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BatchJobFindUniqueArgs>(args: SelectSubset<T, BatchJobFindUniqueArgs<ExtArgs>>): Prisma__BatchJobClient<$Result.GetResult<Prisma.$BatchJobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BatchJob that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BatchJobFindUniqueOrThrowArgs} args - Arguments to find a BatchJob
     * @example
     * // Get one BatchJob
     * const batchJob = await prisma.batchJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BatchJobFindUniqueOrThrowArgs>(args: SelectSubset<T, BatchJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BatchJobClient<$Result.GetResult<Prisma.$BatchJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BatchJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchJobFindFirstArgs} args - Arguments to find a BatchJob
     * @example
     * // Get one BatchJob
     * const batchJob = await prisma.batchJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BatchJobFindFirstArgs>(args?: SelectSubset<T, BatchJobFindFirstArgs<ExtArgs>>): Prisma__BatchJobClient<$Result.GetResult<Prisma.$BatchJobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BatchJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchJobFindFirstOrThrowArgs} args - Arguments to find a BatchJob
     * @example
     * // Get one BatchJob
     * const batchJob = await prisma.batchJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BatchJobFindFirstOrThrowArgs>(args?: SelectSubset<T, BatchJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__BatchJobClient<$Result.GetResult<Prisma.$BatchJobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BatchJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BatchJobs
     * const batchJobs = await prisma.batchJob.findMany()
     * 
     * // Get first 10 BatchJobs
     * const batchJobs = await prisma.batchJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const batchJobWithIdOnly = await prisma.batchJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BatchJobFindManyArgs>(args?: SelectSubset<T, BatchJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BatchJob.
     * @param {BatchJobCreateArgs} args - Arguments to create a BatchJob.
     * @example
     * // Create one BatchJob
     * const BatchJob = await prisma.batchJob.create({
     *   data: {
     *     // ... data to create a BatchJob
     *   }
     * })
     * 
     */
    create<T extends BatchJobCreateArgs>(args: SelectSubset<T, BatchJobCreateArgs<ExtArgs>>): Prisma__BatchJobClient<$Result.GetResult<Prisma.$BatchJobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BatchJobs.
     * @param {BatchJobCreateManyArgs} args - Arguments to create many BatchJobs.
     * @example
     * // Create many BatchJobs
     * const batchJob = await prisma.batchJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BatchJobCreateManyArgs>(args?: SelectSubset<T, BatchJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BatchJobs and returns the data saved in the database.
     * @param {BatchJobCreateManyAndReturnArgs} args - Arguments to create many BatchJobs.
     * @example
     * // Create many BatchJobs
     * const batchJob = await prisma.batchJob.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BatchJobs and only return the `id`
     * const batchJobWithIdOnly = await prisma.batchJob.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BatchJobCreateManyAndReturnArgs>(args?: SelectSubset<T, BatchJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchJobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BatchJob.
     * @param {BatchJobDeleteArgs} args - Arguments to delete one BatchJob.
     * @example
     * // Delete one BatchJob
     * const BatchJob = await prisma.batchJob.delete({
     *   where: {
     *     // ... filter to delete one BatchJob
     *   }
     * })
     * 
     */
    delete<T extends BatchJobDeleteArgs>(args: SelectSubset<T, BatchJobDeleteArgs<ExtArgs>>): Prisma__BatchJobClient<$Result.GetResult<Prisma.$BatchJobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BatchJob.
     * @param {BatchJobUpdateArgs} args - Arguments to update one BatchJob.
     * @example
     * // Update one BatchJob
     * const batchJob = await prisma.batchJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BatchJobUpdateArgs>(args: SelectSubset<T, BatchJobUpdateArgs<ExtArgs>>): Prisma__BatchJobClient<$Result.GetResult<Prisma.$BatchJobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BatchJobs.
     * @param {BatchJobDeleteManyArgs} args - Arguments to filter BatchJobs to delete.
     * @example
     * // Delete a few BatchJobs
     * const { count } = await prisma.batchJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BatchJobDeleteManyArgs>(args?: SelectSubset<T, BatchJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BatchJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BatchJobs
     * const batchJob = await prisma.batchJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BatchJobUpdateManyArgs>(args: SelectSubset<T, BatchJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BatchJobs and returns the data updated in the database.
     * @param {BatchJobUpdateManyAndReturnArgs} args - Arguments to update many BatchJobs.
     * @example
     * // Update many BatchJobs
     * const batchJob = await prisma.batchJob.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BatchJobs and only return the `id`
     * const batchJobWithIdOnly = await prisma.batchJob.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BatchJobUpdateManyAndReturnArgs>(args: SelectSubset<T, BatchJobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchJobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BatchJob.
     * @param {BatchJobUpsertArgs} args - Arguments to update or create a BatchJob.
     * @example
     * // Update or create a BatchJob
     * const batchJob = await prisma.batchJob.upsert({
     *   create: {
     *     // ... data to create a BatchJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BatchJob we want to update
     *   }
     * })
     */
    upsert<T extends BatchJobUpsertArgs>(args: SelectSubset<T, BatchJobUpsertArgs<ExtArgs>>): Prisma__BatchJobClient<$Result.GetResult<Prisma.$BatchJobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BatchJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchJobCountArgs} args - Arguments to filter BatchJobs to count.
     * @example
     * // Count the number of BatchJobs
     * const count = await prisma.batchJob.count({
     *   where: {
     *     // ... the filter for the BatchJobs we want to count
     *   }
     * })
    **/
    count<T extends BatchJobCountArgs>(
      args?: Subset<T, BatchJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BatchJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BatchJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BatchJobAggregateArgs>(args: Subset<T, BatchJobAggregateArgs>): Prisma.PrismaPromise<GetBatchJobAggregateType<T>>

    /**
     * Group by BatchJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchJobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BatchJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BatchJobGroupByArgs['orderBy'] }
        : { orderBy?: BatchJobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BatchJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBatchJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BatchJob model
   */
  readonly fields: BatchJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BatchJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BatchJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    checks<T extends BatchJob$checksArgs<ExtArgs> = {}>(args?: Subset<T, BatchJob$checksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceabilityCheckPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BatchJob model
   */
  interface BatchJobFieldRefs {
    readonly id: FieldRef<"BatchJob", 'String'>
    readonly selectionId: FieldRef<"BatchJob", 'String'>
    readonly name: FieldRef<"BatchJob", 'String'>
    readonly status: FieldRef<"BatchJob", 'String'>
    readonly recheckType: FieldRef<"BatchJob", 'String'>
    readonly totalAddresses: FieldRef<"BatchJob", 'Int'>
    readonly checkedCount: FieldRef<"BatchJob", 'Int'>
    readonly serviceableCount: FieldRef<"BatchJob", 'Int'>
    readonly preorderCount: FieldRef<"BatchJob", 'Int'>
    readonly noServiceCount: FieldRef<"BatchJob", 'Int'>
    readonly startedAt: FieldRef<"BatchJob", 'DateTime'>
    readonly completedAt: FieldRef<"BatchJob", 'DateTime'>
    readonly lastCheckAt: FieldRef<"BatchJob", 'DateTime'>
    readonly currentIndex: FieldRef<"BatchJob", 'Int'>
    readonly createdAt: FieldRef<"BatchJob", 'DateTime'>
    readonly updatedAt: FieldRef<"BatchJob", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BatchJob findUnique
   */
  export type BatchJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchJob
     */
    select?: BatchJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchJob
     */
    omit?: BatchJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchJobInclude<ExtArgs> | null
    /**
     * Filter, which BatchJob to fetch.
     */
    where: BatchJobWhereUniqueInput
  }

  /**
   * BatchJob findUniqueOrThrow
   */
  export type BatchJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchJob
     */
    select?: BatchJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchJob
     */
    omit?: BatchJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchJobInclude<ExtArgs> | null
    /**
     * Filter, which BatchJob to fetch.
     */
    where: BatchJobWhereUniqueInput
  }

  /**
   * BatchJob findFirst
   */
  export type BatchJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchJob
     */
    select?: BatchJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchJob
     */
    omit?: BatchJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchJobInclude<ExtArgs> | null
    /**
     * Filter, which BatchJob to fetch.
     */
    where?: BatchJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BatchJobs to fetch.
     */
    orderBy?: BatchJobOrderByWithRelationInput | BatchJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BatchJobs.
     */
    cursor?: BatchJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BatchJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BatchJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BatchJobs.
     */
    distinct?: BatchJobScalarFieldEnum | BatchJobScalarFieldEnum[]
  }

  /**
   * BatchJob findFirstOrThrow
   */
  export type BatchJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchJob
     */
    select?: BatchJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchJob
     */
    omit?: BatchJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchJobInclude<ExtArgs> | null
    /**
     * Filter, which BatchJob to fetch.
     */
    where?: BatchJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BatchJobs to fetch.
     */
    orderBy?: BatchJobOrderByWithRelationInput | BatchJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BatchJobs.
     */
    cursor?: BatchJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BatchJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BatchJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BatchJobs.
     */
    distinct?: BatchJobScalarFieldEnum | BatchJobScalarFieldEnum[]
  }

  /**
   * BatchJob findMany
   */
  export type BatchJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchJob
     */
    select?: BatchJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchJob
     */
    omit?: BatchJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchJobInclude<ExtArgs> | null
    /**
     * Filter, which BatchJobs to fetch.
     */
    where?: BatchJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BatchJobs to fetch.
     */
    orderBy?: BatchJobOrderByWithRelationInput | BatchJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BatchJobs.
     */
    cursor?: BatchJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BatchJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BatchJobs.
     */
    skip?: number
    distinct?: BatchJobScalarFieldEnum | BatchJobScalarFieldEnum[]
  }

  /**
   * BatchJob create
   */
  export type BatchJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchJob
     */
    select?: BatchJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchJob
     */
    omit?: BatchJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchJobInclude<ExtArgs> | null
    /**
     * The data needed to create a BatchJob.
     */
    data: XOR<BatchJobCreateInput, BatchJobUncheckedCreateInput>
  }

  /**
   * BatchJob createMany
   */
  export type BatchJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BatchJobs.
     */
    data: BatchJobCreateManyInput | BatchJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BatchJob createManyAndReturn
   */
  export type BatchJobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchJob
     */
    select?: BatchJobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BatchJob
     */
    omit?: BatchJobOmit<ExtArgs> | null
    /**
     * The data used to create many BatchJobs.
     */
    data: BatchJobCreateManyInput | BatchJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BatchJob update
   */
  export type BatchJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchJob
     */
    select?: BatchJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchJob
     */
    omit?: BatchJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchJobInclude<ExtArgs> | null
    /**
     * The data needed to update a BatchJob.
     */
    data: XOR<BatchJobUpdateInput, BatchJobUncheckedUpdateInput>
    /**
     * Choose, which BatchJob to update.
     */
    where: BatchJobWhereUniqueInput
  }

  /**
   * BatchJob updateMany
   */
  export type BatchJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BatchJobs.
     */
    data: XOR<BatchJobUpdateManyMutationInput, BatchJobUncheckedUpdateManyInput>
    /**
     * Filter which BatchJobs to update
     */
    where?: BatchJobWhereInput
    /**
     * Limit how many BatchJobs to update.
     */
    limit?: number
  }

  /**
   * BatchJob updateManyAndReturn
   */
  export type BatchJobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchJob
     */
    select?: BatchJobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BatchJob
     */
    omit?: BatchJobOmit<ExtArgs> | null
    /**
     * The data used to update BatchJobs.
     */
    data: XOR<BatchJobUpdateManyMutationInput, BatchJobUncheckedUpdateManyInput>
    /**
     * Filter which BatchJobs to update
     */
    where?: BatchJobWhereInput
    /**
     * Limit how many BatchJobs to update.
     */
    limit?: number
  }

  /**
   * BatchJob upsert
   */
  export type BatchJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchJob
     */
    select?: BatchJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchJob
     */
    omit?: BatchJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchJobInclude<ExtArgs> | null
    /**
     * The filter to search for the BatchJob to update in case it exists.
     */
    where: BatchJobWhereUniqueInput
    /**
     * In case the BatchJob found by the `where` argument doesn't exist, create a new BatchJob with this data.
     */
    create: XOR<BatchJobCreateInput, BatchJobUncheckedCreateInput>
    /**
     * In case the BatchJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BatchJobUpdateInput, BatchJobUncheckedUpdateInput>
  }

  /**
   * BatchJob delete
   */
  export type BatchJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchJob
     */
    select?: BatchJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchJob
     */
    omit?: BatchJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchJobInclude<ExtArgs> | null
    /**
     * Filter which BatchJob to delete.
     */
    where: BatchJobWhereUniqueInput
  }

  /**
   * BatchJob deleteMany
   */
  export type BatchJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BatchJobs to delete
     */
    where?: BatchJobWhereInput
    /**
     * Limit how many BatchJobs to delete.
     */
    limit?: number
  }

  /**
   * BatchJob.checks
   */
  export type BatchJob$checksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceabilityCheck
     */
    select?: ServiceabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceabilityCheck
     */
    omit?: ServiceabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceabilityCheckInclude<ExtArgs> | null
    where?: ServiceabilityCheckWhereInput
    orderBy?: ServiceabilityCheckOrderByWithRelationInput | ServiceabilityCheckOrderByWithRelationInput[]
    cursor?: ServiceabilityCheckWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceabilityCheckScalarFieldEnum | ServiceabilityCheckScalarFieldEnum[]
  }

  /**
   * BatchJob without action
   */
  export type BatchJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchJob
     */
    select?: BatchJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchJob
     */
    omit?: BatchJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchJobInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const GeoJSONSourceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    fileName: 'fileName',
    uploadedAt: 'uploadedAt',
    addressCount: 'addressCount'
  };

  export type GeoJSONSourceScalarFieldEnum = (typeof GeoJSONSourceScalarFieldEnum)[keyof typeof GeoJSONSourceScalarFieldEnum]


  export const AddressSelectionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    filterCriteria: 'filterCriteria'
  };

  export type AddressSelectionScalarFieldEnum = (typeof AddressSelectionScalarFieldEnum)[keyof typeof AddressSelectionScalarFieldEnum]


  export const AddressScalarFieldEnum: {
    id: 'id',
    sourceId: 'sourceId',
    longitude: 'longitude',
    latitude: 'latitude',
    number: 'number',
    street: 'street',
    unit: 'unit',
    city: 'city',
    region: 'region',
    postcode: 'postcode',
    addressString: 'addressString',
    properties: 'properties',
    createdAt: 'createdAt'
  };

  export type AddressScalarFieldEnum = (typeof AddressScalarFieldEnum)[keyof typeof AddressScalarFieldEnum]


  export const ServiceabilityCheckScalarFieldEnum: {
    id: 'id',
    addressId: 'addressId',
    checkedAt: 'checkedAt',
    selectionId: 'selectionId',
    batchJobId: 'batchJobId',
    serviceable: 'serviceable',
    serviceabilityType: 'serviceabilityType',
    salesType: 'salesType',
    status: 'status',
    cstatus: 'cstatus',
    isPreSale: 'isPreSale',
    salesStatus: 'salesStatus',
    matchType: 'matchType',
    apiCreateDate: 'apiCreateDate',
    apiUpdateDate: 'apiUpdateDate',
    error: 'error'
  };

  export type ServiceabilityCheckScalarFieldEnum = (typeof ServiceabilityCheckScalarFieldEnum)[keyof typeof ServiceabilityCheckScalarFieldEnum]


  export const BatchJobScalarFieldEnum: {
    id: 'id',
    selectionId: 'selectionId',
    name: 'name',
    status: 'status',
    recheckType: 'recheckType',
    totalAddresses: 'totalAddresses',
    checkedCount: 'checkedCount',
    serviceableCount: 'serviceableCount',
    preorderCount: 'preorderCount',
    noServiceCount: 'noServiceCount',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    lastCheckAt: 'lastCheckAt',
    currentIndex: 'currentIndex',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BatchJobScalarFieldEnum = (typeof BatchJobScalarFieldEnum)[keyof typeof BatchJobScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type GeoJSONSourceWhereInput = {
    AND?: GeoJSONSourceWhereInput | GeoJSONSourceWhereInput[]
    OR?: GeoJSONSourceWhereInput[]
    NOT?: GeoJSONSourceWhereInput | GeoJSONSourceWhereInput[]
    id?: StringFilter<"GeoJSONSource"> | string
    name?: StringFilter<"GeoJSONSource"> | string
    fileName?: StringFilter<"GeoJSONSource"> | string
    uploadedAt?: DateTimeFilter<"GeoJSONSource"> | Date | string
    addressCount?: IntFilter<"GeoJSONSource"> | number
    addresses?: AddressListRelationFilter
  }

  export type GeoJSONSourceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    fileName?: SortOrder
    uploadedAt?: SortOrder
    addressCount?: SortOrder
    addresses?: AddressOrderByRelationAggregateInput
  }

  export type GeoJSONSourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GeoJSONSourceWhereInput | GeoJSONSourceWhereInput[]
    OR?: GeoJSONSourceWhereInput[]
    NOT?: GeoJSONSourceWhereInput | GeoJSONSourceWhereInput[]
    name?: StringFilter<"GeoJSONSource"> | string
    fileName?: StringFilter<"GeoJSONSource"> | string
    uploadedAt?: DateTimeFilter<"GeoJSONSource"> | Date | string
    addressCount?: IntFilter<"GeoJSONSource"> | number
    addresses?: AddressListRelationFilter
  }, "id">

  export type GeoJSONSourceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    fileName?: SortOrder
    uploadedAt?: SortOrder
    addressCount?: SortOrder
    _count?: GeoJSONSourceCountOrderByAggregateInput
    _avg?: GeoJSONSourceAvgOrderByAggregateInput
    _max?: GeoJSONSourceMaxOrderByAggregateInput
    _min?: GeoJSONSourceMinOrderByAggregateInput
    _sum?: GeoJSONSourceSumOrderByAggregateInput
  }

  export type GeoJSONSourceScalarWhereWithAggregatesInput = {
    AND?: GeoJSONSourceScalarWhereWithAggregatesInput | GeoJSONSourceScalarWhereWithAggregatesInput[]
    OR?: GeoJSONSourceScalarWhereWithAggregatesInput[]
    NOT?: GeoJSONSourceScalarWhereWithAggregatesInput | GeoJSONSourceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GeoJSONSource"> | string
    name?: StringWithAggregatesFilter<"GeoJSONSource"> | string
    fileName?: StringWithAggregatesFilter<"GeoJSONSource"> | string
    uploadedAt?: DateTimeWithAggregatesFilter<"GeoJSONSource"> | Date | string
    addressCount?: IntWithAggregatesFilter<"GeoJSONSource"> | number
  }

  export type AddressSelectionWhereInput = {
    AND?: AddressSelectionWhereInput | AddressSelectionWhereInput[]
    OR?: AddressSelectionWhereInput[]
    NOT?: AddressSelectionWhereInput | AddressSelectionWhereInput[]
    id?: StringFilter<"AddressSelection"> | string
    name?: StringFilter<"AddressSelection"> | string
    description?: StringNullableFilter<"AddressSelection"> | string | null
    createdAt?: DateTimeFilter<"AddressSelection"> | Date | string
    updatedAt?: DateTimeFilter<"AddressSelection"> | Date | string
    filterCriteria?: StringFilter<"AddressSelection"> | string
    addresses?: AddressListRelationFilter
  }

  export type AddressSelectionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    filterCriteria?: SortOrder
    addresses?: AddressOrderByRelationAggregateInput
  }

  export type AddressSelectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AddressSelectionWhereInput | AddressSelectionWhereInput[]
    OR?: AddressSelectionWhereInput[]
    NOT?: AddressSelectionWhereInput | AddressSelectionWhereInput[]
    name?: StringFilter<"AddressSelection"> | string
    description?: StringNullableFilter<"AddressSelection"> | string | null
    createdAt?: DateTimeFilter<"AddressSelection"> | Date | string
    updatedAt?: DateTimeFilter<"AddressSelection"> | Date | string
    filterCriteria?: StringFilter<"AddressSelection"> | string
    addresses?: AddressListRelationFilter
  }, "id">

  export type AddressSelectionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    filterCriteria?: SortOrder
    _count?: AddressSelectionCountOrderByAggregateInput
    _max?: AddressSelectionMaxOrderByAggregateInput
    _min?: AddressSelectionMinOrderByAggregateInput
  }

  export type AddressSelectionScalarWhereWithAggregatesInput = {
    AND?: AddressSelectionScalarWhereWithAggregatesInput | AddressSelectionScalarWhereWithAggregatesInput[]
    OR?: AddressSelectionScalarWhereWithAggregatesInput[]
    NOT?: AddressSelectionScalarWhereWithAggregatesInput | AddressSelectionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AddressSelection"> | string
    name?: StringWithAggregatesFilter<"AddressSelection"> | string
    description?: StringNullableWithAggregatesFilter<"AddressSelection"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AddressSelection"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AddressSelection"> | Date | string
    filterCriteria?: StringWithAggregatesFilter<"AddressSelection"> | string
  }

  export type AddressWhereInput = {
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    id?: StringFilter<"Address"> | string
    sourceId?: StringFilter<"Address"> | string
    longitude?: FloatFilter<"Address"> | number
    latitude?: FloatFilter<"Address"> | number
    number?: StringNullableFilter<"Address"> | string | null
    street?: StringNullableFilter<"Address"> | string | null
    unit?: StringNullableFilter<"Address"> | string | null
    city?: StringNullableFilter<"Address"> | string | null
    region?: StringNullableFilter<"Address"> | string | null
    postcode?: StringNullableFilter<"Address"> | string | null
    addressString?: StringFilter<"Address"> | string
    properties?: StringFilter<"Address"> | string
    createdAt?: DateTimeFilter<"Address"> | Date | string
    source?: XOR<GeoJSONSourceScalarRelationFilter, GeoJSONSourceWhereInput>
    selections?: AddressSelectionListRelationFilter
    checks?: ServiceabilityCheckListRelationFilter
  }

  export type AddressOrderByWithRelationInput = {
    id?: SortOrder
    sourceId?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    number?: SortOrderInput | SortOrder
    street?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    postcode?: SortOrderInput | SortOrder
    addressString?: SortOrder
    properties?: SortOrder
    createdAt?: SortOrder
    source?: GeoJSONSourceOrderByWithRelationInput
    selections?: AddressSelectionOrderByRelationAggregateInput
    checks?: ServiceabilityCheckOrderByRelationAggregateInput
  }

  export type AddressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    sourceId?: StringFilter<"Address"> | string
    longitude?: FloatFilter<"Address"> | number
    latitude?: FloatFilter<"Address"> | number
    number?: StringNullableFilter<"Address"> | string | null
    street?: StringNullableFilter<"Address"> | string | null
    unit?: StringNullableFilter<"Address"> | string | null
    city?: StringNullableFilter<"Address"> | string | null
    region?: StringNullableFilter<"Address"> | string | null
    postcode?: StringNullableFilter<"Address"> | string | null
    addressString?: StringFilter<"Address"> | string
    properties?: StringFilter<"Address"> | string
    createdAt?: DateTimeFilter<"Address"> | Date | string
    source?: XOR<GeoJSONSourceScalarRelationFilter, GeoJSONSourceWhereInput>
    selections?: AddressSelectionListRelationFilter
    checks?: ServiceabilityCheckListRelationFilter
  }, "id">

  export type AddressOrderByWithAggregationInput = {
    id?: SortOrder
    sourceId?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    number?: SortOrderInput | SortOrder
    street?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    postcode?: SortOrderInput | SortOrder
    addressString?: SortOrder
    properties?: SortOrder
    createdAt?: SortOrder
    _count?: AddressCountOrderByAggregateInput
    _avg?: AddressAvgOrderByAggregateInput
    _max?: AddressMaxOrderByAggregateInput
    _min?: AddressMinOrderByAggregateInput
    _sum?: AddressSumOrderByAggregateInput
  }

  export type AddressScalarWhereWithAggregatesInput = {
    AND?: AddressScalarWhereWithAggregatesInput | AddressScalarWhereWithAggregatesInput[]
    OR?: AddressScalarWhereWithAggregatesInput[]
    NOT?: AddressScalarWhereWithAggregatesInput | AddressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Address"> | string
    sourceId?: StringWithAggregatesFilter<"Address"> | string
    longitude?: FloatWithAggregatesFilter<"Address"> | number
    latitude?: FloatWithAggregatesFilter<"Address"> | number
    number?: StringNullableWithAggregatesFilter<"Address"> | string | null
    street?: StringNullableWithAggregatesFilter<"Address"> | string | null
    unit?: StringNullableWithAggregatesFilter<"Address"> | string | null
    city?: StringNullableWithAggregatesFilter<"Address"> | string | null
    region?: StringNullableWithAggregatesFilter<"Address"> | string | null
    postcode?: StringNullableWithAggregatesFilter<"Address"> | string | null
    addressString?: StringWithAggregatesFilter<"Address"> | string
    properties?: StringWithAggregatesFilter<"Address"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Address"> | Date | string
  }

  export type ServiceabilityCheckWhereInput = {
    AND?: ServiceabilityCheckWhereInput | ServiceabilityCheckWhereInput[]
    OR?: ServiceabilityCheckWhereInput[]
    NOT?: ServiceabilityCheckWhereInput | ServiceabilityCheckWhereInput[]
    id?: StringFilter<"ServiceabilityCheck"> | string
    addressId?: StringFilter<"ServiceabilityCheck"> | string
    checkedAt?: DateTimeFilter<"ServiceabilityCheck"> | Date | string
    selectionId?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    batchJobId?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    serviceable?: BoolFilter<"ServiceabilityCheck"> | boolean
    serviceabilityType?: StringFilter<"ServiceabilityCheck"> | string
    salesType?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    status?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    cstatus?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    isPreSale?: IntNullableFilter<"ServiceabilityCheck"> | number | null
    salesStatus?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    matchType?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    apiCreateDate?: DateTimeNullableFilter<"ServiceabilityCheck"> | Date | string | null
    apiUpdateDate?: DateTimeNullableFilter<"ServiceabilityCheck"> | Date | string | null
    error?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    address?: XOR<AddressScalarRelationFilter, AddressWhereInput>
    batchJob?: XOR<BatchJobNullableScalarRelationFilter, BatchJobWhereInput> | null
  }

  export type ServiceabilityCheckOrderByWithRelationInput = {
    id?: SortOrder
    addressId?: SortOrder
    checkedAt?: SortOrder
    selectionId?: SortOrderInput | SortOrder
    batchJobId?: SortOrderInput | SortOrder
    serviceable?: SortOrder
    serviceabilityType?: SortOrder
    salesType?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    cstatus?: SortOrderInput | SortOrder
    isPreSale?: SortOrderInput | SortOrder
    salesStatus?: SortOrderInput | SortOrder
    matchType?: SortOrderInput | SortOrder
    apiCreateDate?: SortOrderInput | SortOrder
    apiUpdateDate?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    address?: AddressOrderByWithRelationInput
    batchJob?: BatchJobOrderByWithRelationInput
  }

  export type ServiceabilityCheckWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceabilityCheckWhereInput | ServiceabilityCheckWhereInput[]
    OR?: ServiceabilityCheckWhereInput[]
    NOT?: ServiceabilityCheckWhereInput | ServiceabilityCheckWhereInput[]
    addressId?: StringFilter<"ServiceabilityCheck"> | string
    checkedAt?: DateTimeFilter<"ServiceabilityCheck"> | Date | string
    selectionId?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    batchJobId?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    serviceable?: BoolFilter<"ServiceabilityCheck"> | boolean
    serviceabilityType?: StringFilter<"ServiceabilityCheck"> | string
    salesType?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    status?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    cstatus?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    isPreSale?: IntNullableFilter<"ServiceabilityCheck"> | number | null
    salesStatus?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    matchType?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    apiCreateDate?: DateTimeNullableFilter<"ServiceabilityCheck"> | Date | string | null
    apiUpdateDate?: DateTimeNullableFilter<"ServiceabilityCheck"> | Date | string | null
    error?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    address?: XOR<AddressScalarRelationFilter, AddressWhereInput>
    batchJob?: XOR<BatchJobNullableScalarRelationFilter, BatchJobWhereInput> | null
  }, "id">

  export type ServiceabilityCheckOrderByWithAggregationInput = {
    id?: SortOrder
    addressId?: SortOrder
    checkedAt?: SortOrder
    selectionId?: SortOrderInput | SortOrder
    batchJobId?: SortOrderInput | SortOrder
    serviceable?: SortOrder
    serviceabilityType?: SortOrder
    salesType?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    cstatus?: SortOrderInput | SortOrder
    isPreSale?: SortOrderInput | SortOrder
    salesStatus?: SortOrderInput | SortOrder
    matchType?: SortOrderInput | SortOrder
    apiCreateDate?: SortOrderInput | SortOrder
    apiUpdateDate?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    _count?: ServiceabilityCheckCountOrderByAggregateInput
    _avg?: ServiceabilityCheckAvgOrderByAggregateInput
    _max?: ServiceabilityCheckMaxOrderByAggregateInput
    _min?: ServiceabilityCheckMinOrderByAggregateInput
    _sum?: ServiceabilityCheckSumOrderByAggregateInput
  }

  export type ServiceabilityCheckScalarWhereWithAggregatesInput = {
    AND?: ServiceabilityCheckScalarWhereWithAggregatesInput | ServiceabilityCheckScalarWhereWithAggregatesInput[]
    OR?: ServiceabilityCheckScalarWhereWithAggregatesInput[]
    NOT?: ServiceabilityCheckScalarWhereWithAggregatesInput | ServiceabilityCheckScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServiceabilityCheck"> | string
    addressId?: StringWithAggregatesFilter<"ServiceabilityCheck"> | string
    checkedAt?: DateTimeWithAggregatesFilter<"ServiceabilityCheck"> | Date | string
    selectionId?: StringNullableWithAggregatesFilter<"ServiceabilityCheck"> | string | null
    batchJobId?: StringNullableWithAggregatesFilter<"ServiceabilityCheck"> | string | null
    serviceable?: BoolWithAggregatesFilter<"ServiceabilityCheck"> | boolean
    serviceabilityType?: StringWithAggregatesFilter<"ServiceabilityCheck"> | string
    salesType?: StringNullableWithAggregatesFilter<"ServiceabilityCheck"> | string | null
    status?: StringNullableWithAggregatesFilter<"ServiceabilityCheck"> | string | null
    cstatus?: StringNullableWithAggregatesFilter<"ServiceabilityCheck"> | string | null
    isPreSale?: IntNullableWithAggregatesFilter<"ServiceabilityCheck"> | number | null
    salesStatus?: StringNullableWithAggregatesFilter<"ServiceabilityCheck"> | string | null
    matchType?: StringNullableWithAggregatesFilter<"ServiceabilityCheck"> | string | null
    apiCreateDate?: DateTimeNullableWithAggregatesFilter<"ServiceabilityCheck"> | Date | string | null
    apiUpdateDate?: DateTimeNullableWithAggregatesFilter<"ServiceabilityCheck"> | Date | string | null
    error?: StringNullableWithAggregatesFilter<"ServiceabilityCheck"> | string | null
  }

  export type BatchJobWhereInput = {
    AND?: BatchJobWhereInput | BatchJobWhereInput[]
    OR?: BatchJobWhereInput[]
    NOT?: BatchJobWhereInput | BatchJobWhereInput[]
    id?: StringFilter<"BatchJob"> | string
    selectionId?: StringNullableFilter<"BatchJob"> | string | null
    name?: StringFilter<"BatchJob"> | string
    status?: StringFilter<"BatchJob"> | string
    recheckType?: StringFilter<"BatchJob"> | string
    totalAddresses?: IntFilter<"BatchJob"> | number
    checkedCount?: IntFilter<"BatchJob"> | number
    serviceableCount?: IntFilter<"BatchJob"> | number
    preorderCount?: IntFilter<"BatchJob"> | number
    noServiceCount?: IntFilter<"BatchJob"> | number
    startedAt?: DateTimeNullableFilter<"BatchJob"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"BatchJob"> | Date | string | null
    lastCheckAt?: DateTimeNullableFilter<"BatchJob"> | Date | string | null
    currentIndex?: IntFilter<"BatchJob"> | number
    createdAt?: DateTimeFilter<"BatchJob"> | Date | string
    updatedAt?: DateTimeFilter<"BatchJob"> | Date | string
    checks?: ServiceabilityCheckListRelationFilter
  }

  export type BatchJobOrderByWithRelationInput = {
    id?: SortOrder
    selectionId?: SortOrderInput | SortOrder
    name?: SortOrder
    status?: SortOrder
    recheckType?: SortOrder
    totalAddresses?: SortOrder
    checkedCount?: SortOrder
    serviceableCount?: SortOrder
    preorderCount?: SortOrder
    noServiceCount?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    lastCheckAt?: SortOrderInput | SortOrder
    currentIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    checks?: ServiceabilityCheckOrderByRelationAggregateInput
  }

  export type BatchJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BatchJobWhereInput | BatchJobWhereInput[]
    OR?: BatchJobWhereInput[]
    NOT?: BatchJobWhereInput | BatchJobWhereInput[]
    selectionId?: StringNullableFilter<"BatchJob"> | string | null
    name?: StringFilter<"BatchJob"> | string
    status?: StringFilter<"BatchJob"> | string
    recheckType?: StringFilter<"BatchJob"> | string
    totalAddresses?: IntFilter<"BatchJob"> | number
    checkedCount?: IntFilter<"BatchJob"> | number
    serviceableCount?: IntFilter<"BatchJob"> | number
    preorderCount?: IntFilter<"BatchJob"> | number
    noServiceCount?: IntFilter<"BatchJob"> | number
    startedAt?: DateTimeNullableFilter<"BatchJob"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"BatchJob"> | Date | string | null
    lastCheckAt?: DateTimeNullableFilter<"BatchJob"> | Date | string | null
    currentIndex?: IntFilter<"BatchJob"> | number
    createdAt?: DateTimeFilter<"BatchJob"> | Date | string
    updatedAt?: DateTimeFilter<"BatchJob"> | Date | string
    checks?: ServiceabilityCheckListRelationFilter
  }, "id">

  export type BatchJobOrderByWithAggregationInput = {
    id?: SortOrder
    selectionId?: SortOrderInput | SortOrder
    name?: SortOrder
    status?: SortOrder
    recheckType?: SortOrder
    totalAddresses?: SortOrder
    checkedCount?: SortOrder
    serviceableCount?: SortOrder
    preorderCount?: SortOrder
    noServiceCount?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    lastCheckAt?: SortOrderInput | SortOrder
    currentIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BatchJobCountOrderByAggregateInput
    _avg?: BatchJobAvgOrderByAggregateInput
    _max?: BatchJobMaxOrderByAggregateInput
    _min?: BatchJobMinOrderByAggregateInput
    _sum?: BatchJobSumOrderByAggregateInput
  }

  export type BatchJobScalarWhereWithAggregatesInput = {
    AND?: BatchJobScalarWhereWithAggregatesInput | BatchJobScalarWhereWithAggregatesInput[]
    OR?: BatchJobScalarWhereWithAggregatesInput[]
    NOT?: BatchJobScalarWhereWithAggregatesInput | BatchJobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BatchJob"> | string
    selectionId?: StringNullableWithAggregatesFilter<"BatchJob"> | string | null
    name?: StringWithAggregatesFilter<"BatchJob"> | string
    status?: StringWithAggregatesFilter<"BatchJob"> | string
    recheckType?: StringWithAggregatesFilter<"BatchJob"> | string
    totalAddresses?: IntWithAggregatesFilter<"BatchJob"> | number
    checkedCount?: IntWithAggregatesFilter<"BatchJob"> | number
    serviceableCount?: IntWithAggregatesFilter<"BatchJob"> | number
    preorderCount?: IntWithAggregatesFilter<"BatchJob"> | number
    noServiceCount?: IntWithAggregatesFilter<"BatchJob"> | number
    startedAt?: DateTimeNullableWithAggregatesFilter<"BatchJob"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"BatchJob"> | Date | string | null
    lastCheckAt?: DateTimeNullableWithAggregatesFilter<"BatchJob"> | Date | string | null
    currentIndex?: IntWithAggregatesFilter<"BatchJob"> | number
    createdAt?: DateTimeWithAggregatesFilter<"BatchJob"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BatchJob"> | Date | string
  }

  export type GeoJSONSourceCreateInput = {
    id?: string
    name: string
    fileName: string
    uploadedAt?: Date | string
    addressCount: number
    addresses?: AddressCreateNestedManyWithoutSourceInput
  }

  export type GeoJSONSourceUncheckedCreateInput = {
    id?: string
    name: string
    fileName: string
    uploadedAt?: Date | string
    addressCount: number
    addresses?: AddressUncheckedCreateNestedManyWithoutSourceInput
  }

  export type GeoJSONSourceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addressCount?: IntFieldUpdateOperationsInput | number
    addresses?: AddressUpdateManyWithoutSourceNestedInput
  }

  export type GeoJSONSourceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addressCount?: IntFieldUpdateOperationsInput | number
    addresses?: AddressUncheckedUpdateManyWithoutSourceNestedInput
  }

  export type GeoJSONSourceCreateManyInput = {
    id?: string
    name: string
    fileName: string
    uploadedAt?: Date | string
    addressCount: number
  }

  export type GeoJSONSourceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addressCount?: IntFieldUpdateOperationsInput | number
  }

  export type GeoJSONSourceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addressCount?: IntFieldUpdateOperationsInput | number
  }

  export type AddressSelectionCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    filterCriteria: string
    addresses?: AddressCreateNestedManyWithoutSelectionsInput
  }

  export type AddressSelectionUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    filterCriteria: string
    addresses?: AddressUncheckedCreateNestedManyWithoutSelectionsInput
  }

  export type AddressSelectionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filterCriteria?: StringFieldUpdateOperationsInput | string
    addresses?: AddressUpdateManyWithoutSelectionsNestedInput
  }

  export type AddressSelectionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filterCriteria?: StringFieldUpdateOperationsInput | string
    addresses?: AddressUncheckedUpdateManyWithoutSelectionsNestedInput
  }

  export type AddressSelectionCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    filterCriteria: string
  }

  export type AddressSelectionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filterCriteria?: StringFieldUpdateOperationsInput | string
  }

  export type AddressSelectionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filterCriteria?: StringFieldUpdateOperationsInput | string
  }

  export type AddressCreateInput = {
    id?: string
    longitude: number
    latitude: number
    number?: string | null
    street?: string | null
    unit?: string | null
    city?: string | null
    region?: string | null
    postcode?: string | null
    addressString: string
    properties: string
    createdAt?: Date | string
    source: GeoJSONSourceCreateNestedOneWithoutAddressesInput
    selections?: AddressSelectionCreateNestedManyWithoutAddressesInput
    checks?: ServiceabilityCheckCreateNestedManyWithoutAddressInput
  }

  export type AddressUncheckedCreateInput = {
    id?: string
    sourceId: string
    longitude: number
    latitude: number
    number?: string | null
    street?: string | null
    unit?: string | null
    city?: string | null
    region?: string | null
    postcode?: string | null
    addressString: string
    properties: string
    createdAt?: Date | string
    selections?: AddressSelectionUncheckedCreateNestedManyWithoutAddressesInput
    checks?: ServiceabilityCheckUncheckedCreateNestedManyWithoutAddressInput
  }

  export type AddressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    number?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    addressString?: StringFieldUpdateOperationsInput | string
    properties?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: GeoJSONSourceUpdateOneRequiredWithoutAddressesNestedInput
    selections?: AddressSelectionUpdateManyWithoutAddressesNestedInput
    checks?: ServiceabilityCheckUpdateManyWithoutAddressNestedInput
  }

  export type AddressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceId?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    number?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    addressString?: StringFieldUpdateOperationsInput | string
    properties?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selections?: AddressSelectionUncheckedUpdateManyWithoutAddressesNestedInput
    checks?: ServiceabilityCheckUncheckedUpdateManyWithoutAddressNestedInput
  }

  export type AddressCreateManyInput = {
    id?: string
    sourceId: string
    longitude: number
    latitude: number
    number?: string | null
    street?: string | null
    unit?: string | null
    city?: string | null
    region?: string | null
    postcode?: string | null
    addressString: string
    properties: string
    createdAt?: Date | string
  }

  export type AddressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    number?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    addressString?: StringFieldUpdateOperationsInput | string
    properties?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceId?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    number?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    addressString?: StringFieldUpdateOperationsInput | string
    properties?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceabilityCheckCreateInput = {
    id?: string
    checkedAt?: Date | string
    selectionId?: string | null
    serviceable: boolean
    serviceabilityType?: string
    salesType?: string | null
    status?: string | null
    cstatus?: string | null
    isPreSale?: number | null
    salesStatus?: string | null
    matchType?: string | null
    apiCreateDate?: Date | string | null
    apiUpdateDate?: Date | string | null
    error?: string | null
    address: AddressCreateNestedOneWithoutChecksInput
    batchJob?: BatchJobCreateNestedOneWithoutChecksInput
  }

  export type ServiceabilityCheckUncheckedCreateInput = {
    id?: string
    addressId: string
    checkedAt?: Date | string
    selectionId?: string | null
    batchJobId?: string | null
    serviceable: boolean
    serviceabilityType?: string
    salesType?: string | null
    status?: string | null
    cstatus?: string | null
    isPreSale?: number | null
    salesStatus?: string | null
    matchType?: string | null
    apiCreateDate?: Date | string | null
    apiUpdateDate?: Date | string | null
    error?: string | null
  }

  export type ServiceabilityCheckUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selectionId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceable?: BoolFieldUpdateOperationsInput | boolean
    serviceabilityType?: StringFieldUpdateOperationsInput | string
    salesType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    cstatus?: NullableStringFieldUpdateOperationsInput | string | null
    isPreSale?: NullableIntFieldUpdateOperationsInput | number | null
    salesStatus?: NullableStringFieldUpdateOperationsInput | string | null
    matchType?: NullableStringFieldUpdateOperationsInput | string | null
    apiCreateDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiUpdateDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    address?: AddressUpdateOneRequiredWithoutChecksNestedInput
    batchJob?: BatchJobUpdateOneWithoutChecksNestedInput
  }

  export type ServiceabilityCheckUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    addressId?: StringFieldUpdateOperationsInput | string
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selectionId?: NullableStringFieldUpdateOperationsInput | string | null
    batchJobId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceable?: BoolFieldUpdateOperationsInput | boolean
    serviceabilityType?: StringFieldUpdateOperationsInput | string
    salesType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    cstatus?: NullableStringFieldUpdateOperationsInput | string | null
    isPreSale?: NullableIntFieldUpdateOperationsInput | number | null
    salesStatus?: NullableStringFieldUpdateOperationsInput | string | null
    matchType?: NullableStringFieldUpdateOperationsInput | string | null
    apiCreateDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiUpdateDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiceabilityCheckCreateManyInput = {
    id?: string
    addressId: string
    checkedAt?: Date | string
    selectionId?: string | null
    batchJobId?: string | null
    serviceable: boolean
    serviceabilityType?: string
    salesType?: string | null
    status?: string | null
    cstatus?: string | null
    isPreSale?: number | null
    salesStatus?: string | null
    matchType?: string | null
    apiCreateDate?: Date | string | null
    apiUpdateDate?: Date | string | null
    error?: string | null
  }

  export type ServiceabilityCheckUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selectionId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceable?: BoolFieldUpdateOperationsInput | boolean
    serviceabilityType?: StringFieldUpdateOperationsInput | string
    salesType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    cstatus?: NullableStringFieldUpdateOperationsInput | string | null
    isPreSale?: NullableIntFieldUpdateOperationsInput | number | null
    salesStatus?: NullableStringFieldUpdateOperationsInput | string | null
    matchType?: NullableStringFieldUpdateOperationsInput | string | null
    apiCreateDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiUpdateDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiceabilityCheckUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    addressId?: StringFieldUpdateOperationsInput | string
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selectionId?: NullableStringFieldUpdateOperationsInput | string | null
    batchJobId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceable?: BoolFieldUpdateOperationsInput | boolean
    serviceabilityType?: StringFieldUpdateOperationsInput | string
    salesType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    cstatus?: NullableStringFieldUpdateOperationsInput | string | null
    isPreSale?: NullableIntFieldUpdateOperationsInput | number | null
    salesStatus?: NullableStringFieldUpdateOperationsInput | string | null
    matchType?: NullableStringFieldUpdateOperationsInput | string | null
    apiCreateDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiUpdateDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BatchJobCreateInput = {
    id?: string
    selectionId?: string | null
    name: string
    status: string
    recheckType?: string
    totalAddresses: number
    checkedCount?: number
    serviceableCount?: number
    preorderCount?: number
    noServiceCount?: number
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    lastCheckAt?: Date | string | null
    currentIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    checks?: ServiceabilityCheckCreateNestedManyWithoutBatchJobInput
  }

  export type BatchJobUncheckedCreateInput = {
    id?: string
    selectionId?: string | null
    name: string
    status: string
    recheckType?: string
    totalAddresses: number
    checkedCount?: number
    serviceableCount?: number
    preorderCount?: number
    noServiceCount?: number
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    lastCheckAt?: Date | string | null
    currentIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    checks?: ServiceabilityCheckUncheckedCreateNestedManyWithoutBatchJobInput
  }

  export type BatchJobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    selectionId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    recheckType?: StringFieldUpdateOperationsInput | string
    totalAddresses?: IntFieldUpdateOperationsInput | number
    checkedCount?: IntFieldUpdateOperationsInput | number
    serviceableCount?: IntFieldUpdateOperationsInput | number
    preorderCount?: IntFieldUpdateOperationsInput | number
    noServiceCount?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastCheckAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checks?: ServiceabilityCheckUpdateManyWithoutBatchJobNestedInput
  }

  export type BatchJobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    selectionId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    recheckType?: StringFieldUpdateOperationsInput | string
    totalAddresses?: IntFieldUpdateOperationsInput | number
    checkedCount?: IntFieldUpdateOperationsInput | number
    serviceableCount?: IntFieldUpdateOperationsInput | number
    preorderCount?: IntFieldUpdateOperationsInput | number
    noServiceCount?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastCheckAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checks?: ServiceabilityCheckUncheckedUpdateManyWithoutBatchJobNestedInput
  }

  export type BatchJobCreateManyInput = {
    id?: string
    selectionId?: string | null
    name: string
    status: string
    recheckType?: string
    totalAddresses: number
    checkedCount?: number
    serviceableCount?: number
    preorderCount?: number
    noServiceCount?: number
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    lastCheckAt?: Date | string | null
    currentIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BatchJobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    selectionId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    recheckType?: StringFieldUpdateOperationsInput | string
    totalAddresses?: IntFieldUpdateOperationsInput | number
    checkedCount?: IntFieldUpdateOperationsInput | number
    serviceableCount?: IntFieldUpdateOperationsInput | number
    preorderCount?: IntFieldUpdateOperationsInput | number
    noServiceCount?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastCheckAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BatchJobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    selectionId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    recheckType?: StringFieldUpdateOperationsInput | string
    totalAddresses?: IntFieldUpdateOperationsInput | number
    checkedCount?: IntFieldUpdateOperationsInput | number
    serviceableCount?: IntFieldUpdateOperationsInput | number
    preorderCount?: IntFieldUpdateOperationsInput | number
    noServiceCount?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastCheckAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type AddressListRelationFilter = {
    every?: AddressWhereInput
    some?: AddressWhereInput
    none?: AddressWhereInput
  }

  export type AddressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GeoJSONSourceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    fileName?: SortOrder
    uploadedAt?: SortOrder
    addressCount?: SortOrder
  }

  export type GeoJSONSourceAvgOrderByAggregateInput = {
    addressCount?: SortOrder
  }

  export type GeoJSONSourceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    fileName?: SortOrder
    uploadedAt?: SortOrder
    addressCount?: SortOrder
  }

  export type GeoJSONSourceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    fileName?: SortOrder
    uploadedAt?: SortOrder
    addressCount?: SortOrder
  }

  export type GeoJSONSourceSumOrderByAggregateInput = {
    addressCount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AddressSelectionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    filterCriteria?: SortOrder
  }

  export type AddressSelectionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    filterCriteria?: SortOrder
  }

  export type AddressSelectionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    filterCriteria?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type GeoJSONSourceScalarRelationFilter = {
    is?: GeoJSONSourceWhereInput
    isNot?: GeoJSONSourceWhereInput
  }

  export type AddressSelectionListRelationFilter = {
    every?: AddressSelectionWhereInput
    some?: AddressSelectionWhereInput
    none?: AddressSelectionWhereInput
  }

  export type ServiceabilityCheckListRelationFilter = {
    every?: ServiceabilityCheckWhereInput
    some?: ServiceabilityCheckWhereInput
    none?: ServiceabilityCheckWhereInput
  }

  export type AddressSelectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceabilityCheckOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AddressCountOrderByAggregateInput = {
    id?: SortOrder
    sourceId?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    number?: SortOrder
    street?: SortOrder
    unit?: SortOrder
    city?: SortOrder
    region?: SortOrder
    postcode?: SortOrder
    addressString?: SortOrder
    properties?: SortOrder
    createdAt?: SortOrder
  }

  export type AddressAvgOrderByAggregateInput = {
    longitude?: SortOrder
    latitude?: SortOrder
  }

  export type AddressMaxOrderByAggregateInput = {
    id?: SortOrder
    sourceId?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    number?: SortOrder
    street?: SortOrder
    unit?: SortOrder
    city?: SortOrder
    region?: SortOrder
    postcode?: SortOrder
    addressString?: SortOrder
    properties?: SortOrder
    createdAt?: SortOrder
  }

  export type AddressMinOrderByAggregateInput = {
    id?: SortOrder
    sourceId?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    number?: SortOrder
    street?: SortOrder
    unit?: SortOrder
    city?: SortOrder
    region?: SortOrder
    postcode?: SortOrder
    addressString?: SortOrder
    properties?: SortOrder
    createdAt?: SortOrder
  }

  export type AddressSumOrderByAggregateInput = {
    longitude?: SortOrder
    latitude?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AddressScalarRelationFilter = {
    is?: AddressWhereInput
    isNot?: AddressWhereInput
  }

  export type BatchJobNullableScalarRelationFilter = {
    is?: BatchJobWhereInput | null
    isNot?: BatchJobWhereInput | null
  }

  export type ServiceabilityCheckCountOrderByAggregateInput = {
    id?: SortOrder
    addressId?: SortOrder
    checkedAt?: SortOrder
    selectionId?: SortOrder
    batchJobId?: SortOrder
    serviceable?: SortOrder
    serviceabilityType?: SortOrder
    salesType?: SortOrder
    status?: SortOrder
    cstatus?: SortOrder
    isPreSale?: SortOrder
    salesStatus?: SortOrder
    matchType?: SortOrder
    apiCreateDate?: SortOrder
    apiUpdateDate?: SortOrder
    error?: SortOrder
  }

  export type ServiceabilityCheckAvgOrderByAggregateInput = {
    isPreSale?: SortOrder
  }

  export type ServiceabilityCheckMaxOrderByAggregateInput = {
    id?: SortOrder
    addressId?: SortOrder
    checkedAt?: SortOrder
    selectionId?: SortOrder
    batchJobId?: SortOrder
    serviceable?: SortOrder
    serviceabilityType?: SortOrder
    salesType?: SortOrder
    status?: SortOrder
    cstatus?: SortOrder
    isPreSale?: SortOrder
    salesStatus?: SortOrder
    matchType?: SortOrder
    apiCreateDate?: SortOrder
    apiUpdateDate?: SortOrder
    error?: SortOrder
  }

  export type ServiceabilityCheckMinOrderByAggregateInput = {
    id?: SortOrder
    addressId?: SortOrder
    checkedAt?: SortOrder
    selectionId?: SortOrder
    batchJobId?: SortOrder
    serviceable?: SortOrder
    serviceabilityType?: SortOrder
    salesType?: SortOrder
    status?: SortOrder
    cstatus?: SortOrder
    isPreSale?: SortOrder
    salesStatus?: SortOrder
    matchType?: SortOrder
    apiCreateDate?: SortOrder
    apiUpdateDate?: SortOrder
    error?: SortOrder
  }

  export type ServiceabilityCheckSumOrderByAggregateInput = {
    isPreSale?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BatchJobCountOrderByAggregateInput = {
    id?: SortOrder
    selectionId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    recheckType?: SortOrder
    totalAddresses?: SortOrder
    checkedCount?: SortOrder
    serviceableCount?: SortOrder
    preorderCount?: SortOrder
    noServiceCount?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    lastCheckAt?: SortOrder
    currentIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BatchJobAvgOrderByAggregateInput = {
    totalAddresses?: SortOrder
    checkedCount?: SortOrder
    serviceableCount?: SortOrder
    preorderCount?: SortOrder
    noServiceCount?: SortOrder
    currentIndex?: SortOrder
  }

  export type BatchJobMaxOrderByAggregateInput = {
    id?: SortOrder
    selectionId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    recheckType?: SortOrder
    totalAddresses?: SortOrder
    checkedCount?: SortOrder
    serviceableCount?: SortOrder
    preorderCount?: SortOrder
    noServiceCount?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    lastCheckAt?: SortOrder
    currentIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BatchJobMinOrderByAggregateInput = {
    id?: SortOrder
    selectionId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    recheckType?: SortOrder
    totalAddresses?: SortOrder
    checkedCount?: SortOrder
    serviceableCount?: SortOrder
    preorderCount?: SortOrder
    noServiceCount?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    lastCheckAt?: SortOrder
    currentIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BatchJobSumOrderByAggregateInput = {
    totalAddresses?: SortOrder
    checkedCount?: SortOrder
    serviceableCount?: SortOrder
    preorderCount?: SortOrder
    noServiceCount?: SortOrder
    currentIndex?: SortOrder
  }

  export type AddressCreateNestedManyWithoutSourceInput = {
    create?: XOR<AddressCreateWithoutSourceInput, AddressUncheckedCreateWithoutSourceInput> | AddressCreateWithoutSourceInput[] | AddressUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutSourceInput | AddressCreateOrConnectWithoutSourceInput[]
    createMany?: AddressCreateManySourceInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type AddressUncheckedCreateNestedManyWithoutSourceInput = {
    create?: XOR<AddressCreateWithoutSourceInput, AddressUncheckedCreateWithoutSourceInput> | AddressCreateWithoutSourceInput[] | AddressUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutSourceInput | AddressCreateOrConnectWithoutSourceInput[]
    createMany?: AddressCreateManySourceInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AddressUpdateManyWithoutSourceNestedInput = {
    create?: XOR<AddressCreateWithoutSourceInput, AddressUncheckedCreateWithoutSourceInput> | AddressCreateWithoutSourceInput[] | AddressUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutSourceInput | AddressCreateOrConnectWithoutSourceInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutSourceInput | AddressUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: AddressCreateManySourceInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutSourceInput | AddressUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutSourceInput | AddressUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type AddressUncheckedUpdateManyWithoutSourceNestedInput = {
    create?: XOR<AddressCreateWithoutSourceInput, AddressUncheckedCreateWithoutSourceInput> | AddressCreateWithoutSourceInput[] | AddressUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutSourceInput | AddressCreateOrConnectWithoutSourceInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutSourceInput | AddressUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: AddressCreateManySourceInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutSourceInput | AddressUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutSourceInput | AddressUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type AddressCreateNestedManyWithoutSelectionsInput = {
    create?: XOR<AddressCreateWithoutSelectionsInput, AddressUncheckedCreateWithoutSelectionsInput> | AddressCreateWithoutSelectionsInput[] | AddressUncheckedCreateWithoutSelectionsInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutSelectionsInput | AddressCreateOrConnectWithoutSelectionsInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type AddressUncheckedCreateNestedManyWithoutSelectionsInput = {
    create?: XOR<AddressCreateWithoutSelectionsInput, AddressUncheckedCreateWithoutSelectionsInput> | AddressCreateWithoutSelectionsInput[] | AddressUncheckedCreateWithoutSelectionsInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutSelectionsInput | AddressCreateOrConnectWithoutSelectionsInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type AddressUpdateManyWithoutSelectionsNestedInput = {
    create?: XOR<AddressCreateWithoutSelectionsInput, AddressUncheckedCreateWithoutSelectionsInput> | AddressCreateWithoutSelectionsInput[] | AddressUncheckedCreateWithoutSelectionsInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutSelectionsInput | AddressCreateOrConnectWithoutSelectionsInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutSelectionsInput | AddressUpsertWithWhereUniqueWithoutSelectionsInput[]
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutSelectionsInput | AddressUpdateWithWhereUniqueWithoutSelectionsInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutSelectionsInput | AddressUpdateManyWithWhereWithoutSelectionsInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type AddressUncheckedUpdateManyWithoutSelectionsNestedInput = {
    create?: XOR<AddressCreateWithoutSelectionsInput, AddressUncheckedCreateWithoutSelectionsInput> | AddressCreateWithoutSelectionsInput[] | AddressUncheckedCreateWithoutSelectionsInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutSelectionsInput | AddressCreateOrConnectWithoutSelectionsInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutSelectionsInput | AddressUpsertWithWhereUniqueWithoutSelectionsInput[]
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutSelectionsInput | AddressUpdateWithWhereUniqueWithoutSelectionsInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutSelectionsInput | AddressUpdateManyWithWhereWithoutSelectionsInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type GeoJSONSourceCreateNestedOneWithoutAddressesInput = {
    create?: XOR<GeoJSONSourceCreateWithoutAddressesInput, GeoJSONSourceUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: GeoJSONSourceCreateOrConnectWithoutAddressesInput
    connect?: GeoJSONSourceWhereUniqueInput
  }

  export type AddressSelectionCreateNestedManyWithoutAddressesInput = {
    create?: XOR<AddressSelectionCreateWithoutAddressesInput, AddressSelectionUncheckedCreateWithoutAddressesInput> | AddressSelectionCreateWithoutAddressesInput[] | AddressSelectionUncheckedCreateWithoutAddressesInput[]
    connectOrCreate?: AddressSelectionCreateOrConnectWithoutAddressesInput | AddressSelectionCreateOrConnectWithoutAddressesInput[]
    connect?: AddressSelectionWhereUniqueInput | AddressSelectionWhereUniqueInput[]
  }

  export type ServiceabilityCheckCreateNestedManyWithoutAddressInput = {
    create?: XOR<ServiceabilityCheckCreateWithoutAddressInput, ServiceabilityCheckUncheckedCreateWithoutAddressInput> | ServiceabilityCheckCreateWithoutAddressInput[] | ServiceabilityCheckUncheckedCreateWithoutAddressInput[]
    connectOrCreate?: ServiceabilityCheckCreateOrConnectWithoutAddressInput | ServiceabilityCheckCreateOrConnectWithoutAddressInput[]
    createMany?: ServiceabilityCheckCreateManyAddressInputEnvelope
    connect?: ServiceabilityCheckWhereUniqueInput | ServiceabilityCheckWhereUniqueInput[]
  }

  export type AddressSelectionUncheckedCreateNestedManyWithoutAddressesInput = {
    create?: XOR<AddressSelectionCreateWithoutAddressesInput, AddressSelectionUncheckedCreateWithoutAddressesInput> | AddressSelectionCreateWithoutAddressesInput[] | AddressSelectionUncheckedCreateWithoutAddressesInput[]
    connectOrCreate?: AddressSelectionCreateOrConnectWithoutAddressesInput | AddressSelectionCreateOrConnectWithoutAddressesInput[]
    connect?: AddressSelectionWhereUniqueInput | AddressSelectionWhereUniqueInput[]
  }

  export type ServiceabilityCheckUncheckedCreateNestedManyWithoutAddressInput = {
    create?: XOR<ServiceabilityCheckCreateWithoutAddressInput, ServiceabilityCheckUncheckedCreateWithoutAddressInput> | ServiceabilityCheckCreateWithoutAddressInput[] | ServiceabilityCheckUncheckedCreateWithoutAddressInput[]
    connectOrCreate?: ServiceabilityCheckCreateOrConnectWithoutAddressInput | ServiceabilityCheckCreateOrConnectWithoutAddressInput[]
    createMany?: ServiceabilityCheckCreateManyAddressInputEnvelope
    connect?: ServiceabilityCheckWhereUniqueInput | ServiceabilityCheckWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GeoJSONSourceUpdateOneRequiredWithoutAddressesNestedInput = {
    create?: XOR<GeoJSONSourceCreateWithoutAddressesInput, GeoJSONSourceUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: GeoJSONSourceCreateOrConnectWithoutAddressesInput
    upsert?: GeoJSONSourceUpsertWithoutAddressesInput
    connect?: GeoJSONSourceWhereUniqueInput
    update?: XOR<XOR<GeoJSONSourceUpdateToOneWithWhereWithoutAddressesInput, GeoJSONSourceUpdateWithoutAddressesInput>, GeoJSONSourceUncheckedUpdateWithoutAddressesInput>
  }

  export type AddressSelectionUpdateManyWithoutAddressesNestedInput = {
    create?: XOR<AddressSelectionCreateWithoutAddressesInput, AddressSelectionUncheckedCreateWithoutAddressesInput> | AddressSelectionCreateWithoutAddressesInput[] | AddressSelectionUncheckedCreateWithoutAddressesInput[]
    connectOrCreate?: AddressSelectionCreateOrConnectWithoutAddressesInput | AddressSelectionCreateOrConnectWithoutAddressesInput[]
    upsert?: AddressSelectionUpsertWithWhereUniqueWithoutAddressesInput | AddressSelectionUpsertWithWhereUniqueWithoutAddressesInput[]
    set?: AddressSelectionWhereUniqueInput | AddressSelectionWhereUniqueInput[]
    disconnect?: AddressSelectionWhereUniqueInput | AddressSelectionWhereUniqueInput[]
    delete?: AddressSelectionWhereUniqueInput | AddressSelectionWhereUniqueInput[]
    connect?: AddressSelectionWhereUniqueInput | AddressSelectionWhereUniqueInput[]
    update?: AddressSelectionUpdateWithWhereUniqueWithoutAddressesInput | AddressSelectionUpdateWithWhereUniqueWithoutAddressesInput[]
    updateMany?: AddressSelectionUpdateManyWithWhereWithoutAddressesInput | AddressSelectionUpdateManyWithWhereWithoutAddressesInput[]
    deleteMany?: AddressSelectionScalarWhereInput | AddressSelectionScalarWhereInput[]
  }

  export type ServiceabilityCheckUpdateManyWithoutAddressNestedInput = {
    create?: XOR<ServiceabilityCheckCreateWithoutAddressInput, ServiceabilityCheckUncheckedCreateWithoutAddressInput> | ServiceabilityCheckCreateWithoutAddressInput[] | ServiceabilityCheckUncheckedCreateWithoutAddressInput[]
    connectOrCreate?: ServiceabilityCheckCreateOrConnectWithoutAddressInput | ServiceabilityCheckCreateOrConnectWithoutAddressInput[]
    upsert?: ServiceabilityCheckUpsertWithWhereUniqueWithoutAddressInput | ServiceabilityCheckUpsertWithWhereUniqueWithoutAddressInput[]
    createMany?: ServiceabilityCheckCreateManyAddressInputEnvelope
    set?: ServiceabilityCheckWhereUniqueInput | ServiceabilityCheckWhereUniqueInput[]
    disconnect?: ServiceabilityCheckWhereUniqueInput | ServiceabilityCheckWhereUniqueInput[]
    delete?: ServiceabilityCheckWhereUniqueInput | ServiceabilityCheckWhereUniqueInput[]
    connect?: ServiceabilityCheckWhereUniqueInput | ServiceabilityCheckWhereUniqueInput[]
    update?: ServiceabilityCheckUpdateWithWhereUniqueWithoutAddressInput | ServiceabilityCheckUpdateWithWhereUniqueWithoutAddressInput[]
    updateMany?: ServiceabilityCheckUpdateManyWithWhereWithoutAddressInput | ServiceabilityCheckUpdateManyWithWhereWithoutAddressInput[]
    deleteMany?: ServiceabilityCheckScalarWhereInput | ServiceabilityCheckScalarWhereInput[]
  }

  export type AddressSelectionUncheckedUpdateManyWithoutAddressesNestedInput = {
    create?: XOR<AddressSelectionCreateWithoutAddressesInput, AddressSelectionUncheckedCreateWithoutAddressesInput> | AddressSelectionCreateWithoutAddressesInput[] | AddressSelectionUncheckedCreateWithoutAddressesInput[]
    connectOrCreate?: AddressSelectionCreateOrConnectWithoutAddressesInput | AddressSelectionCreateOrConnectWithoutAddressesInput[]
    upsert?: AddressSelectionUpsertWithWhereUniqueWithoutAddressesInput | AddressSelectionUpsertWithWhereUniqueWithoutAddressesInput[]
    set?: AddressSelectionWhereUniqueInput | AddressSelectionWhereUniqueInput[]
    disconnect?: AddressSelectionWhereUniqueInput | AddressSelectionWhereUniqueInput[]
    delete?: AddressSelectionWhereUniqueInput | AddressSelectionWhereUniqueInput[]
    connect?: AddressSelectionWhereUniqueInput | AddressSelectionWhereUniqueInput[]
    update?: AddressSelectionUpdateWithWhereUniqueWithoutAddressesInput | AddressSelectionUpdateWithWhereUniqueWithoutAddressesInput[]
    updateMany?: AddressSelectionUpdateManyWithWhereWithoutAddressesInput | AddressSelectionUpdateManyWithWhereWithoutAddressesInput[]
    deleteMany?: AddressSelectionScalarWhereInput | AddressSelectionScalarWhereInput[]
  }

  export type ServiceabilityCheckUncheckedUpdateManyWithoutAddressNestedInput = {
    create?: XOR<ServiceabilityCheckCreateWithoutAddressInput, ServiceabilityCheckUncheckedCreateWithoutAddressInput> | ServiceabilityCheckCreateWithoutAddressInput[] | ServiceabilityCheckUncheckedCreateWithoutAddressInput[]
    connectOrCreate?: ServiceabilityCheckCreateOrConnectWithoutAddressInput | ServiceabilityCheckCreateOrConnectWithoutAddressInput[]
    upsert?: ServiceabilityCheckUpsertWithWhereUniqueWithoutAddressInput | ServiceabilityCheckUpsertWithWhereUniqueWithoutAddressInput[]
    createMany?: ServiceabilityCheckCreateManyAddressInputEnvelope
    set?: ServiceabilityCheckWhereUniqueInput | ServiceabilityCheckWhereUniqueInput[]
    disconnect?: ServiceabilityCheckWhereUniqueInput | ServiceabilityCheckWhereUniqueInput[]
    delete?: ServiceabilityCheckWhereUniqueInput | ServiceabilityCheckWhereUniqueInput[]
    connect?: ServiceabilityCheckWhereUniqueInput | ServiceabilityCheckWhereUniqueInput[]
    update?: ServiceabilityCheckUpdateWithWhereUniqueWithoutAddressInput | ServiceabilityCheckUpdateWithWhereUniqueWithoutAddressInput[]
    updateMany?: ServiceabilityCheckUpdateManyWithWhereWithoutAddressInput | ServiceabilityCheckUpdateManyWithWhereWithoutAddressInput[]
    deleteMany?: ServiceabilityCheckScalarWhereInput | ServiceabilityCheckScalarWhereInput[]
  }

  export type AddressCreateNestedOneWithoutChecksInput = {
    create?: XOR<AddressCreateWithoutChecksInput, AddressUncheckedCreateWithoutChecksInput>
    connectOrCreate?: AddressCreateOrConnectWithoutChecksInput
    connect?: AddressWhereUniqueInput
  }

  export type BatchJobCreateNestedOneWithoutChecksInput = {
    create?: XOR<BatchJobCreateWithoutChecksInput, BatchJobUncheckedCreateWithoutChecksInput>
    connectOrCreate?: BatchJobCreateOrConnectWithoutChecksInput
    connect?: BatchJobWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AddressUpdateOneRequiredWithoutChecksNestedInput = {
    create?: XOR<AddressCreateWithoutChecksInput, AddressUncheckedCreateWithoutChecksInput>
    connectOrCreate?: AddressCreateOrConnectWithoutChecksInput
    upsert?: AddressUpsertWithoutChecksInput
    connect?: AddressWhereUniqueInput
    update?: XOR<XOR<AddressUpdateToOneWithWhereWithoutChecksInput, AddressUpdateWithoutChecksInput>, AddressUncheckedUpdateWithoutChecksInput>
  }

  export type BatchJobUpdateOneWithoutChecksNestedInput = {
    create?: XOR<BatchJobCreateWithoutChecksInput, BatchJobUncheckedCreateWithoutChecksInput>
    connectOrCreate?: BatchJobCreateOrConnectWithoutChecksInput
    upsert?: BatchJobUpsertWithoutChecksInput
    disconnect?: BatchJobWhereInput | boolean
    delete?: BatchJobWhereInput | boolean
    connect?: BatchJobWhereUniqueInput
    update?: XOR<XOR<BatchJobUpdateToOneWithWhereWithoutChecksInput, BatchJobUpdateWithoutChecksInput>, BatchJobUncheckedUpdateWithoutChecksInput>
  }

  export type ServiceabilityCheckCreateNestedManyWithoutBatchJobInput = {
    create?: XOR<ServiceabilityCheckCreateWithoutBatchJobInput, ServiceabilityCheckUncheckedCreateWithoutBatchJobInput> | ServiceabilityCheckCreateWithoutBatchJobInput[] | ServiceabilityCheckUncheckedCreateWithoutBatchJobInput[]
    connectOrCreate?: ServiceabilityCheckCreateOrConnectWithoutBatchJobInput | ServiceabilityCheckCreateOrConnectWithoutBatchJobInput[]
    createMany?: ServiceabilityCheckCreateManyBatchJobInputEnvelope
    connect?: ServiceabilityCheckWhereUniqueInput | ServiceabilityCheckWhereUniqueInput[]
  }

  export type ServiceabilityCheckUncheckedCreateNestedManyWithoutBatchJobInput = {
    create?: XOR<ServiceabilityCheckCreateWithoutBatchJobInput, ServiceabilityCheckUncheckedCreateWithoutBatchJobInput> | ServiceabilityCheckCreateWithoutBatchJobInput[] | ServiceabilityCheckUncheckedCreateWithoutBatchJobInput[]
    connectOrCreate?: ServiceabilityCheckCreateOrConnectWithoutBatchJobInput | ServiceabilityCheckCreateOrConnectWithoutBatchJobInput[]
    createMany?: ServiceabilityCheckCreateManyBatchJobInputEnvelope
    connect?: ServiceabilityCheckWhereUniqueInput | ServiceabilityCheckWhereUniqueInput[]
  }

  export type ServiceabilityCheckUpdateManyWithoutBatchJobNestedInput = {
    create?: XOR<ServiceabilityCheckCreateWithoutBatchJobInput, ServiceabilityCheckUncheckedCreateWithoutBatchJobInput> | ServiceabilityCheckCreateWithoutBatchJobInput[] | ServiceabilityCheckUncheckedCreateWithoutBatchJobInput[]
    connectOrCreate?: ServiceabilityCheckCreateOrConnectWithoutBatchJobInput | ServiceabilityCheckCreateOrConnectWithoutBatchJobInput[]
    upsert?: ServiceabilityCheckUpsertWithWhereUniqueWithoutBatchJobInput | ServiceabilityCheckUpsertWithWhereUniqueWithoutBatchJobInput[]
    createMany?: ServiceabilityCheckCreateManyBatchJobInputEnvelope
    set?: ServiceabilityCheckWhereUniqueInput | ServiceabilityCheckWhereUniqueInput[]
    disconnect?: ServiceabilityCheckWhereUniqueInput | ServiceabilityCheckWhereUniqueInput[]
    delete?: ServiceabilityCheckWhereUniqueInput | ServiceabilityCheckWhereUniqueInput[]
    connect?: ServiceabilityCheckWhereUniqueInput | ServiceabilityCheckWhereUniqueInput[]
    update?: ServiceabilityCheckUpdateWithWhereUniqueWithoutBatchJobInput | ServiceabilityCheckUpdateWithWhereUniqueWithoutBatchJobInput[]
    updateMany?: ServiceabilityCheckUpdateManyWithWhereWithoutBatchJobInput | ServiceabilityCheckUpdateManyWithWhereWithoutBatchJobInput[]
    deleteMany?: ServiceabilityCheckScalarWhereInput | ServiceabilityCheckScalarWhereInput[]
  }

  export type ServiceabilityCheckUncheckedUpdateManyWithoutBatchJobNestedInput = {
    create?: XOR<ServiceabilityCheckCreateWithoutBatchJobInput, ServiceabilityCheckUncheckedCreateWithoutBatchJobInput> | ServiceabilityCheckCreateWithoutBatchJobInput[] | ServiceabilityCheckUncheckedCreateWithoutBatchJobInput[]
    connectOrCreate?: ServiceabilityCheckCreateOrConnectWithoutBatchJobInput | ServiceabilityCheckCreateOrConnectWithoutBatchJobInput[]
    upsert?: ServiceabilityCheckUpsertWithWhereUniqueWithoutBatchJobInput | ServiceabilityCheckUpsertWithWhereUniqueWithoutBatchJobInput[]
    createMany?: ServiceabilityCheckCreateManyBatchJobInputEnvelope
    set?: ServiceabilityCheckWhereUniqueInput | ServiceabilityCheckWhereUniqueInput[]
    disconnect?: ServiceabilityCheckWhereUniqueInput | ServiceabilityCheckWhereUniqueInput[]
    delete?: ServiceabilityCheckWhereUniqueInput | ServiceabilityCheckWhereUniqueInput[]
    connect?: ServiceabilityCheckWhereUniqueInput | ServiceabilityCheckWhereUniqueInput[]
    update?: ServiceabilityCheckUpdateWithWhereUniqueWithoutBatchJobInput | ServiceabilityCheckUpdateWithWhereUniqueWithoutBatchJobInput[]
    updateMany?: ServiceabilityCheckUpdateManyWithWhereWithoutBatchJobInput | ServiceabilityCheckUpdateManyWithWhereWithoutBatchJobInput[]
    deleteMany?: ServiceabilityCheckScalarWhereInput | ServiceabilityCheckScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AddressCreateWithoutSourceInput = {
    id?: string
    longitude: number
    latitude: number
    number?: string | null
    street?: string | null
    unit?: string | null
    city?: string | null
    region?: string | null
    postcode?: string | null
    addressString: string
    properties: string
    createdAt?: Date | string
    selections?: AddressSelectionCreateNestedManyWithoutAddressesInput
    checks?: ServiceabilityCheckCreateNestedManyWithoutAddressInput
  }

  export type AddressUncheckedCreateWithoutSourceInput = {
    id?: string
    longitude: number
    latitude: number
    number?: string | null
    street?: string | null
    unit?: string | null
    city?: string | null
    region?: string | null
    postcode?: string | null
    addressString: string
    properties: string
    createdAt?: Date | string
    selections?: AddressSelectionUncheckedCreateNestedManyWithoutAddressesInput
    checks?: ServiceabilityCheckUncheckedCreateNestedManyWithoutAddressInput
  }

  export type AddressCreateOrConnectWithoutSourceInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutSourceInput, AddressUncheckedCreateWithoutSourceInput>
  }

  export type AddressCreateManySourceInputEnvelope = {
    data: AddressCreateManySourceInput | AddressCreateManySourceInput[]
    skipDuplicates?: boolean
  }

  export type AddressUpsertWithWhereUniqueWithoutSourceInput = {
    where: AddressWhereUniqueInput
    update: XOR<AddressUpdateWithoutSourceInput, AddressUncheckedUpdateWithoutSourceInput>
    create: XOR<AddressCreateWithoutSourceInput, AddressUncheckedCreateWithoutSourceInput>
  }

  export type AddressUpdateWithWhereUniqueWithoutSourceInput = {
    where: AddressWhereUniqueInput
    data: XOR<AddressUpdateWithoutSourceInput, AddressUncheckedUpdateWithoutSourceInput>
  }

  export type AddressUpdateManyWithWhereWithoutSourceInput = {
    where: AddressScalarWhereInput
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyWithoutSourceInput>
  }

  export type AddressScalarWhereInput = {
    AND?: AddressScalarWhereInput | AddressScalarWhereInput[]
    OR?: AddressScalarWhereInput[]
    NOT?: AddressScalarWhereInput | AddressScalarWhereInput[]
    id?: StringFilter<"Address"> | string
    sourceId?: StringFilter<"Address"> | string
    longitude?: FloatFilter<"Address"> | number
    latitude?: FloatFilter<"Address"> | number
    number?: StringNullableFilter<"Address"> | string | null
    street?: StringNullableFilter<"Address"> | string | null
    unit?: StringNullableFilter<"Address"> | string | null
    city?: StringNullableFilter<"Address"> | string | null
    region?: StringNullableFilter<"Address"> | string | null
    postcode?: StringNullableFilter<"Address"> | string | null
    addressString?: StringFilter<"Address"> | string
    properties?: StringFilter<"Address"> | string
    createdAt?: DateTimeFilter<"Address"> | Date | string
  }

  export type AddressCreateWithoutSelectionsInput = {
    id?: string
    longitude: number
    latitude: number
    number?: string | null
    street?: string | null
    unit?: string | null
    city?: string | null
    region?: string | null
    postcode?: string | null
    addressString: string
    properties: string
    createdAt?: Date | string
    source: GeoJSONSourceCreateNestedOneWithoutAddressesInput
    checks?: ServiceabilityCheckCreateNestedManyWithoutAddressInput
  }

  export type AddressUncheckedCreateWithoutSelectionsInput = {
    id?: string
    sourceId: string
    longitude: number
    latitude: number
    number?: string | null
    street?: string | null
    unit?: string | null
    city?: string | null
    region?: string | null
    postcode?: string | null
    addressString: string
    properties: string
    createdAt?: Date | string
    checks?: ServiceabilityCheckUncheckedCreateNestedManyWithoutAddressInput
  }

  export type AddressCreateOrConnectWithoutSelectionsInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutSelectionsInput, AddressUncheckedCreateWithoutSelectionsInput>
  }

  export type AddressUpsertWithWhereUniqueWithoutSelectionsInput = {
    where: AddressWhereUniqueInput
    update: XOR<AddressUpdateWithoutSelectionsInput, AddressUncheckedUpdateWithoutSelectionsInput>
    create: XOR<AddressCreateWithoutSelectionsInput, AddressUncheckedCreateWithoutSelectionsInput>
  }

  export type AddressUpdateWithWhereUniqueWithoutSelectionsInput = {
    where: AddressWhereUniqueInput
    data: XOR<AddressUpdateWithoutSelectionsInput, AddressUncheckedUpdateWithoutSelectionsInput>
  }

  export type AddressUpdateManyWithWhereWithoutSelectionsInput = {
    where: AddressScalarWhereInput
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyWithoutSelectionsInput>
  }

  export type GeoJSONSourceCreateWithoutAddressesInput = {
    id?: string
    name: string
    fileName: string
    uploadedAt?: Date | string
    addressCount: number
  }

  export type GeoJSONSourceUncheckedCreateWithoutAddressesInput = {
    id?: string
    name: string
    fileName: string
    uploadedAt?: Date | string
    addressCount: number
  }

  export type GeoJSONSourceCreateOrConnectWithoutAddressesInput = {
    where: GeoJSONSourceWhereUniqueInput
    create: XOR<GeoJSONSourceCreateWithoutAddressesInput, GeoJSONSourceUncheckedCreateWithoutAddressesInput>
  }

  export type AddressSelectionCreateWithoutAddressesInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    filterCriteria: string
  }

  export type AddressSelectionUncheckedCreateWithoutAddressesInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    filterCriteria: string
  }

  export type AddressSelectionCreateOrConnectWithoutAddressesInput = {
    where: AddressSelectionWhereUniqueInput
    create: XOR<AddressSelectionCreateWithoutAddressesInput, AddressSelectionUncheckedCreateWithoutAddressesInput>
  }

  export type ServiceabilityCheckCreateWithoutAddressInput = {
    id?: string
    checkedAt?: Date | string
    selectionId?: string | null
    serviceable: boolean
    serviceabilityType?: string
    salesType?: string | null
    status?: string | null
    cstatus?: string | null
    isPreSale?: number | null
    salesStatus?: string | null
    matchType?: string | null
    apiCreateDate?: Date | string | null
    apiUpdateDate?: Date | string | null
    error?: string | null
    batchJob?: BatchJobCreateNestedOneWithoutChecksInput
  }

  export type ServiceabilityCheckUncheckedCreateWithoutAddressInput = {
    id?: string
    checkedAt?: Date | string
    selectionId?: string | null
    batchJobId?: string | null
    serviceable: boolean
    serviceabilityType?: string
    salesType?: string | null
    status?: string | null
    cstatus?: string | null
    isPreSale?: number | null
    salesStatus?: string | null
    matchType?: string | null
    apiCreateDate?: Date | string | null
    apiUpdateDate?: Date | string | null
    error?: string | null
  }

  export type ServiceabilityCheckCreateOrConnectWithoutAddressInput = {
    where: ServiceabilityCheckWhereUniqueInput
    create: XOR<ServiceabilityCheckCreateWithoutAddressInput, ServiceabilityCheckUncheckedCreateWithoutAddressInput>
  }

  export type ServiceabilityCheckCreateManyAddressInputEnvelope = {
    data: ServiceabilityCheckCreateManyAddressInput | ServiceabilityCheckCreateManyAddressInput[]
    skipDuplicates?: boolean
  }

  export type GeoJSONSourceUpsertWithoutAddressesInput = {
    update: XOR<GeoJSONSourceUpdateWithoutAddressesInput, GeoJSONSourceUncheckedUpdateWithoutAddressesInput>
    create: XOR<GeoJSONSourceCreateWithoutAddressesInput, GeoJSONSourceUncheckedCreateWithoutAddressesInput>
    where?: GeoJSONSourceWhereInput
  }

  export type GeoJSONSourceUpdateToOneWithWhereWithoutAddressesInput = {
    where?: GeoJSONSourceWhereInput
    data: XOR<GeoJSONSourceUpdateWithoutAddressesInput, GeoJSONSourceUncheckedUpdateWithoutAddressesInput>
  }

  export type GeoJSONSourceUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addressCount?: IntFieldUpdateOperationsInput | number
  }

  export type GeoJSONSourceUncheckedUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addressCount?: IntFieldUpdateOperationsInput | number
  }

  export type AddressSelectionUpsertWithWhereUniqueWithoutAddressesInput = {
    where: AddressSelectionWhereUniqueInput
    update: XOR<AddressSelectionUpdateWithoutAddressesInput, AddressSelectionUncheckedUpdateWithoutAddressesInput>
    create: XOR<AddressSelectionCreateWithoutAddressesInput, AddressSelectionUncheckedCreateWithoutAddressesInput>
  }

  export type AddressSelectionUpdateWithWhereUniqueWithoutAddressesInput = {
    where: AddressSelectionWhereUniqueInput
    data: XOR<AddressSelectionUpdateWithoutAddressesInput, AddressSelectionUncheckedUpdateWithoutAddressesInput>
  }

  export type AddressSelectionUpdateManyWithWhereWithoutAddressesInput = {
    where: AddressSelectionScalarWhereInput
    data: XOR<AddressSelectionUpdateManyMutationInput, AddressSelectionUncheckedUpdateManyWithoutAddressesInput>
  }

  export type AddressSelectionScalarWhereInput = {
    AND?: AddressSelectionScalarWhereInput | AddressSelectionScalarWhereInput[]
    OR?: AddressSelectionScalarWhereInput[]
    NOT?: AddressSelectionScalarWhereInput | AddressSelectionScalarWhereInput[]
    id?: StringFilter<"AddressSelection"> | string
    name?: StringFilter<"AddressSelection"> | string
    description?: StringNullableFilter<"AddressSelection"> | string | null
    createdAt?: DateTimeFilter<"AddressSelection"> | Date | string
    updatedAt?: DateTimeFilter<"AddressSelection"> | Date | string
    filterCriteria?: StringFilter<"AddressSelection"> | string
  }

  export type ServiceabilityCheckUpsertWithWhereUniqueWithoutAddressInput = {
    where: ServiceabilityCheckWhereUniqueInput
    update: XOR<ServiceabilityCheckUpdateWithoutAddressInput, ServiceabilityCheckUncheckedUpdateWithoutAddressInput>
    create: XOR<ServiceabilityCheckCreateWithoutAddressInput, ServiceabilityCheckUncheckedCreateWithoutAddressInput>
  }

  export type ServiceabilityCheckUpdateWithWhereUniqueWithoutAddressInput = {
    where: ServiceabilityCheckWhereUniqueInput
    data: XOR<ServiceabilityCheckUpdateWithoutAddressInput, ServiceabilityCheckUncheckedUpdateWithoutAddressInput>
  }

  export type ServiceabilityCheckUpdateManyWithWhereWithoutAddressInput = {
    where: ServiceabilityCheckScalarWhereInput
    data: XOR<ServiceabilityCheckUpdateManyMutationInput, ServiceabilityCheckUncheckedUpdateManyWithoutAddressInput>
  }

  export type ServiceabilityCheckScalarWhereInput = {
    AND?: ServiceabilityCheckScalarWhereInput | ServiceabilityCheckScalarWhereInput[]
    OR?: ServiceabilityCheckScalarWhereInput[]
    NOT?: ServiceabilityCheckScalarWhereInput | ServiceabilityCheckScalarWhereInput[]
    id?: StringFilter<"ServiceabilityCheck"> | string
    addressId?: StringFilter<"ServiceabilityCheck"> | string
    checkedAt?: DateTimeFilter<"ServiceabilityCheck"> | Date | string
    selectionId?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    batchJobId?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    serviceable?: BoolFilter<"ServiceabilityCheck"> | boolean
    serviceabilityType?: StringFilter<"ServiceabilityCheck"> | string
    salesType?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    status?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    cstatus?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    isPreSale?: IntNullableFilter<"ServiceabilityCheck"> | number | null
    salesStatus?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    matchType?: StringNullableFilter<"ServiceabilityCheck"> | string | null
    apiCreateDate?: DateTimeNullableFilter<"ServiceabilityCheck"> | Date | string | null
    apiUpdateDate?: DateTimeNullableFilter<"ServiceabilityCheck"> | Date | string | null
    error?: StringNullableFilter<"ServiceabilityCheck"> | string | null
  }

  export type AddressCreateWithoutChecksInput = {
    id?: string
    longitude: number
    latitude: number
    number?: string | null
    street?: string | null
    unit?: string | null
    city?: string | null
    region?: string | null
    postcode?: string | null
    addressString: string
    properties: string
    createdAt?: Date | string
    source: GeoJSONSourceCreateNestedOneWithoutAddressesInput
    selections?: AddressSelectionCreateNestedManyWithoutAddressesInput
  }

  export type AddressUncheckedCreateWithoutChecksInput = {
    id?: string
    sourceId: string
    longitude: number
    latitude: number
    number?: string | null
    street?: string | null
    unit?: string | null
    city?: string | null
    region?: string | null
    postcode?: string | null
    addressString: string
    properties: string
    createdAt?: Date | string
    selections?: AddressSelectionUncheckedCreateNestedManyWithoutAddressesInput
  }

  export type AddressCreateOrConnectWithoutChecksInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutChecksInput, AddressUncheckedCreateWithoutChecksInput>
  }

  export type BatchJobCreateWithoutChecksInput = {
    id?: string
    selectionId?: string | null
    name: string
    status: string
    recheckType?: string
    totalAddresses: number
    checkedCount?: number
    serviceableCount?: number
    preorderCount?: number
    noServiceCount?: number
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    lastCheckAt?: Date | string | null
    currentIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BatchJobUncheckedCreateWithoutChecksInput = {
    id?: string
    selectionId?: string | null
    name: string
    status: string
    recheckType?: string
    totalAddresses: number
    checkedCount?: number
    serviceableCount?: number
    preorderCount?: number
    noServiceCount?: number
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    lastCheckAt?: Date | string | null
    currentIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BatchJobCreateOrConnectWithoutChecksInput = {
    where: BatchJobWhereUniqueInput
    create: XOR<BatchJobCreateWithoutChecksInput, BatchJobUncheckedCreateWithoutChecksInput>
  }

  export type AddressUpsertWithoutChecksInput = {
    update: XOR<AddressUpdateWithoutChecksInput, AddressUncheckedUpdateWithoutChecksInput>
    create: XOR<AddressCreateWithoutChecksInput, AddressUncheckedCreateWithoutChecksInput>
    where?: AddressWhereInput
  }

  export type AddressUpdateToOneWithWhereWithoutChecksInput = {
    where?: AddressWhereInput
    data: XOR<AddressUpdateWithoutChecksInput, AddressUncheckedUpdateWithoutChecksInput>
  }

  export type AddressUpdateWithoutChecksInput = {
    id?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    number?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    addressString?: StringFieldUpdateOperationsInput | string
    properties?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: GeoJSONSourceUpdateOneRequiredWithoutAddressesNestedInput
    selections?: AddressSelectionUpdateManyWithoutAddressesNestedInput
  }

  export type AddressUncheckedUpdateWithoutChecksInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceId?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    number?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    addressString?: StringFieldUpdateOperationsInput | string
    properties?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selections?: AddressSelectionUncheckedUpdateManyWithoutAddressesNestedInput
  }

  export type BatchJobUpsertWithoutChecksInput = {
    update: XOR<BatchJobUpdateWithoutChecksInput, BatchJobUncheckedUpdateWithoutChecksInput>
    create: XOR<BatchJobCreateWithoutChecksInput, BatchJobUncheckedCreateWithoutChecksInput>
    where?: BatchJobWhereInput
  }

  export type BatchJobUpdateToOneWithWhereWithoutChecksInput = {
    where?: BatchJobWhereInput
    data: XOR<BatchJobUpdateWithoutChecksInput, BatchJobUncheckedUpdateWithoutChecksInput>
  }

  export type BatchJobUpdateWithoutChecksInput = {
    id?: StringFieldUpdateOperationsInput | string
    selectionId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    recheckType?: StringFieldUpdateOperationsInput | string
    totalAddresses?: IntFieldUpdateOperationsInput | number
    checkedCount?: IntFieldUpdateOperationsInput | number
    serviceableCount?: IntFieldUpdateOperationsInput | number
    preorderCount?: IntFieldUpdateOperationsInput | number
    noServiceCount?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastCheckAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BatchJobUncheckedUpdateWithoutChecksInput = {
    id?: StringFieldUpdateOperationsInput | string
    selectionId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    recheckType?: StringFieldUpdateOperationsInput | string
    totalAddresses?: IntFieldUpdateOperationsInput | number
    checkedCount?: IntFieldUpdateOperationsInput | number
    serviceableCount?: IntFieldUpdateOperationsInput | number
    preorderCount?: IntFieldUpdateOperationsInput | number
    noServiceCount?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastCheckAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceabilityCheckCreateWithoutBatchJobInput = {
    id?: string
    checkedAt?: Date | string
    selectionId?: string | null
    serviceable: boolean
    serviceabilityType?: string
    salesType?: string | null
    status?: string | null
    cstatus?: string | null
    isPreSale?: number | null
    salesStatus?: string | null
    matchType?: string | null
    apiCreateDate?: Date | string | null
    apiUpdateDate?: Date | string | null
    error?: string | null
    address: AddressCreateNestedOneWithoutChecksInput
  }

  export type ServiceabilityCheckUncheckedCreateWithoutBatchJobInput = {
    id?: string
    addressId: string
    checkedAt?: Date | string
    selectionId?: string | null
    serviceable: boolean
    serviceabilityType?: string
    salesType?: string | null
    status?: string | null
    cstatus?: string | null
    isPreSale?: number | null
    salesStatus?: string | null
    matchType?: string | null
    apiCreateDate?: Date | string | null
    apiUpdateDate?: Date | string | null
    error?: string | null
  }

  export type ServiceabilityCheckCreateOrConnectWithoutBatchJobInput = {
    where: ServiceabilityCheckWhereUniqueInput
    create: XOR<ServiceabilityCheckCreateWithoutBatchJobInput, ServiceabilityCheckUncheckedCreateWithoutBatchJobInput>
  }

  export type ServiceabilityCheckCreateManyBatchJobInputEnvelope = {
    data: ServiceabilityCheckCreateManyBatchJobInput | ServiceabilityCheckCreateManyBatchJobInput[]
    skipDuplicates?: boolean
  }

  export type ServiceabilityCheckUpsertWithWhereUniqueWithoutBatchJobInput = {
    where: ServiceabilityCheckWhereUniqueInput
    update: XOR<ServiceabilityCheckUpdateWithoutBatchJobInput, ServiceabilityCheckUncheckedUpdateWithoutBatchJobInput>
    create: XOR<ServiceabilityCheckCreateWithoutBatchJobInput, ServiceabilityCheckUncheckedCreateWithoutBatchJobInput>
  }

  export type ServiceabilityCheckUpdateWithWhereUniqueWithoutBatchJobInput = {
    where: ServiceabilityCheckWhereUniqueInput
    data: XOR<ServiceabilityCheckUpdateWithoutBatchJobInput, ServiceabilityCheckUncheckedUpdateWithoutBatchJobInput>
  }

  export type ServiceabilityCheckUpdateManyWithWhereWithoutBatchJobInput = {
    where: ServiceabilityCheckScalarWhereInput
    data: XOR<ServiceabilityCheckUpdateManyMutationInput, ServiceabilityCheckUncheckedUpdateManyWithoutBatchJobInput>
  }

  export type AddressCreateManySourceInput = {
    id?: string
    longitude: number
    latitude: number
    number?: string | null
    street?: string | null
    unit?: string | null
    city?: string | null
    region?: string | null
    postcode?: string | null
    addressString: string
    properties: string
    createdAt?: Date | string
  }

  export type AddressUpdateWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    number?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    addressString?: StringFieldUpdateOperationsInput | string
    properties?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selections?: AddressSelectionUpdateManyWithoutAddressesNestedInput
    checks?: ServiceabilityCheckUpdateManyWithoutAddressNestedInput
  }

  export type AddressUncheckedUpdateWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    number?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    addressString?: StringFieldUpdateOperationsInput | string
    properties?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selections?: AddressSelectionUncheckedUpdateManyWithoutAddressesNestedInput
    checks?: ServiceabilityCheckUncheckedUpdateManyWithoutAddressNestedInput
  }

  export type AddressUncheckedUpdateManyWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    number?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    addressString?: StringFieldUpdateOperationsInput | string
    properties?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUpdateWithoutSelectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    number?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    addressString?: StringFieldUpdateOperationsInput | string
    properties?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: GeoJSONSourceUpdateOneRequiredWithoutAddressesNestedInput
    checks?: ServiceabilityCheckUpdateManyWithoutAddressNestedInput
  }

  export type AddressUncheckedUpdateWithoutSelectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceId?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    number?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    addressString?: StringFieldUpdateOperationsInput | string
    properties?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checks?: ServiceabilityCheckUncheckedUpdateManyWithoutAddressNestedInput
  }

  export type AddressUncheckedUpdateManyWithoutSelectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceId?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    number?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    addressString?: StringFieldUpdateOperationsInput | string
    properties?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceabilityCheckCreateManyAddressInput = {
    id?: string
    checkedAt?: Date | string
    selectionId?: string | null
    batchJobId?: string | null
    serviceable: boolean
    serviceabilityType?: string
    salesType?: string | null
    status?: string | null
    cstatus?: string | null
    isPreSale?: number | null
    salesStatus?: string | null
    matchType?: string | null
    apiCreateDate?: Date | string | null
    apiUpdateDate?: Date | string | null
    error?: string | null
  }

  export type AddressSelectionUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filterCriteria?: StringFieldUpdateOperationsInput | string
  }

  export type AddressSelectionUncheckedUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filterCriteria?: StringFieldUpdateOperationsInput | string
  }

  export type AddressSelectionUncheckedUpdateManyWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filterCriteria?: StringFieldUpdateOperationsInput | string
  }

  export type ServiceabilityCheckUpdateWithoutAddressInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selectionId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceable?: BoolFieldUpdateOperationsInput | boolean
    serviceabilityType?: StringFieldUpdateOperationsInput | string
    salesType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    cstatus?: NullableStringFieldUpdateOperationsInput | string | null
    isPreSale?: NullableIntFieldUpdateOperationsInput | number | null
    salesStatus?: NullableStringFieldUpdateOperationsInput | string | null
    matchType?: NullableStringFieldUpdateOperationsInput | string | null
    apiCreateDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiUpdateDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    batchJob?: BatchJobUpdateOneWithoutChecksNestedInput
  }

  export type ServiceabilityCheckUncheckedUpdateWithoutAddressInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selectionId?: NullableStringFieldUpdateOperationsInput | string | null
    batchJobId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceable?: BoolFieldUpdateOperationsInput | boolean
    serviceabilityType?: StringFieldUpdateOperationsInput | string
    salesType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    cstatus?: NullableStringFieldUpdateOperationsInput | string | null
    isPreSale?: NullableIntFieldUpdateOperationsInput | number | null
    salesStatus?: NullableStringFieldUpdateOperationsInput | string | null
    matchType?: NullableStringFieldUpdateOperationsInput | string | null
    apiCreateDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiUpdateDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiceabilityCheckUncheckedUpdateManyWithoutAddressInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selectionId?: NullableStringFieldUpdateOperationsInput | string | null
    batchJobId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceable?: BoolFieldUpdateOperationsInput | boolean
    serviceabilityType?: StringFieldUpdateOperationsInput | string
    salesType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    cstatus?: NullableStringFieldUpdateOperationsInput | string | null
    isPreSale?: NullableIntFieldUpdateOperationsInput | number | null
    salesStatus?: NullableStringFieldUpdateOperationsInput | string | null
    matchType?: NullableStringFieldUpdateOperationsInput | string | null
    apiCreateDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiUpdateDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiceabilityCheckCreateManyBatchJobInput = {
    id?: string
    addressId: string
    checkedAt?: Date | string
    selectionId?: string | null
    serviceable: boolean
    serviceabilityType?: string
    salesType?: string | null
    status?: string | null
    cstatus?: string | null
    isPreSale?: number | null
    salesStatus?: string | null
    matchType?: string | null
    apiCreateDate?: Date | string | null
    apiUpdateDate?: Date | string | null
    error?: string | null
  }

  export type ServiceabilityCheckUpdateWithoutBatchJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selectionId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceable?: BoolFieldUpdateOperationsInput | boolean
    serviceabilityType?: StringFieldUpdateOperationsInput | string
    salesType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    cstatus?: NullableStringFieldUpdateOperationsInput | string | null
    isPreSale?: NullableIntFieldUpdateOperationsInput | number | null
    salesStatus?: NullableStringFieldUpdateOperationsInput | string | null
    matchType?: NullableStringFieldUpdateOperationsInput | string | null
    apiCreateDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiUpdateDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    address?: AddressUpdateOneRequiredWithoutChecksNestedInput
  }

  export type ServiceabilityCheckUncheckedUpdateWithoutBatchJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    addressId?: StringFieldUpdateOperationsInput | string
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selectionId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceable?: BoolFieldUpdateOperationsInput | boolean
    serviceabilityType?: StringFieldUpdateOperationsInput | string
    salesType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    cstatus?: NullableStringFieldUpdateOperationsInput | string | null
    isPreSale?: NullableIntFieldUpdateOperationsInput | number | null
    salesStatus?: NullableStringFieldUpdateOperationsInput | string | null
    matchType?: NullableStringFieldUpdateOperationsInput | string | null
    apiCreateDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiUpdateDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiceabilityCheckUncheckedUpdateManyWithoutBatchJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    addressId?: StringFieldUpdateOperationsInput | string
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selectionId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceable?: BoolFieldUpdateOperationsInput | boolean
    serviceabilityType?: StringFieldUpdateOperationsInput | string
    salesType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    cstatus?: NullableStringFieldUpdateOperationsInput | string | null
    isPreSale?: NullableIntFieldUpdateOperationsInput | number | null
    salesStatus?: NullableStringFieldUpdateOperationsInput | string | null
    matchType?: NullableStringFieldUpdateOperationsInput | string | null
    apiCreateDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiUpdateDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}