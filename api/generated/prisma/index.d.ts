
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions

export type PrismaPromise<T> = $Public.PrismaPromise<T>


export type UserPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "User"
  objects: {
    conversations: ConversationPayload<ExtArgs>[]
    phrases: PhrasePayload<ExtArgs>[]
    progress: ProgressPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    clerkId: string
    email: string | null
    name: string | null
    level: string
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["user"]>
  composites: {}
}

/**
 * Model User
 * 
 */
export type User = runtime.Types.DefaultSelection<UserPayload>
export type ConversationPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Conversation"
  objects: {
    user: UserPayload<ExtArgs> | null
    messages: MessagePayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    userId: string | null
    sessionId: string
    startedAt: Date
    endedAt: Date | null
    topic: string | null
  }, ExtArgs["result"]["conversation"]>
  composites: {}
}

/**
 * Model Conversation
 * 
 */
export type Conversation = runtime.Types.DefaultSelection<ConversationPayload>
export type MessagePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Message"
  objects: {
    conversation: ConversationPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    conversationId: string
    role: string
    content: string
    transcription: string | null
    timestamp: Date
  }, ExtArgs["result"]["message"]>
  composites: {}
}

/**
 * Model Message
 * 
 */
export type Message = runtime.Types.DefaultSelection<MessagePayload>
export type KnowledgeDocumentPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "KnowledgeDocument"
  objects: {
    chunks: KnowledgeChunkPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    title: string
    content: string
    category: string
    language: string
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["knowledgeDocument"]>
  composites: {}
}

/**
 * Model KnowledgeDocument
 * 
 */
export type KnowledgeDocument = runtime.Types.DefaultSelection<KnowledgeDocumentPayload>
export type KnowledgeChunkPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "KnowledgeChunk"
  objects: {
    document: KnowledgeDocumentPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    documentId: string
    content: string
    chunkIndex: number
  }, ExtArgs["result"]["knowledgeChunk"]>
  composites: {}
}

/**
 * Model KnowledgeChunk
 * 
 */
export type KnowledgeChunk = runtime.Types.DefaultSelection<KnowledgeChunkPayload>
export type PhrasePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Phrase"
  objects: {
    user: UserPayload<ExtArgs> | null
  }
  scalars: $Extensions.GetResult<{
    id: string
    userId: string | null
    german: string
    english: string | null
    context: string | null
    category: string
    createdAt: Date
  }, ExtArgs["result"]["phrase"]>
  composites: {}
}

/**
 * Model Phrase
 * 
 */
export type Phrase = runtime.Types.DefaultSelection<PhrasePayload>
export type CategoryPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Category"
  objects: {}
  scalars: $Extensions.GetResult<{
    id: string
    name: string
    slug: string
    phraseCount: number
    createdAt: Date
  }, ExtArgs["result"]["category"]>
  composites: {}
}

/**
 * Model Category
 * 
 */
export type Category = runtime.Types.DefaultSelection<CategoryPayload>
export type ProgressPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Progress"
  objects: {
    user: UserPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    userId: string
    practiceTime: number
    wordsMastered: number
    conversationCount: number
    lastPracticeAt: Date
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["progress"]>
  composites: {}
}

/**
 * Model Progress
 * 
 */
export type Progress = runtime.Types.DefaultSelection<ProgressPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false,
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.conversation`: Exposes CRUD operations for the **Conversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conversations
    * const conversations = await prisma.conversation.findMany()
    * ```
    */
  get conversation(): Prisma.ConversationDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.knowledgeDocument`: Exposes CRUD operations for the **KnowledgeDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KnowledgeDocuments
    * const knowledgeDocuments = await prisma.knowledgeDocument.findMany()
    * ```
    */
  get knowledgeDocument(): Prisma.KnowledgeDocumentDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.knowledgeChunk`: Exposes CRUD operations for the **KnowledgeChunk** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KnowledgeChunks
    * const knowledgeChunks = await prisma.knowledgeChunk.findMany()
    * ```
    */
  get knowledgeChunk(): Prisma.KnowledgeChunkDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.phrase`: Exposes CRUD operations for the **Phrase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Phrases
    * const phrases = await prisma.phrase.findMany()
    * ```
    */
  get phrase(): Prisma.PhraseDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.progress`: Exposes CRUD operations for the **Progress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Progresses
    * const progresses = await prisma.progress.findMany()
    * ```
    */
  get progress(): Prisma.ProgressDelegate<GlobalReject, ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export type Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export type Args<T, F extends $Public.Operation> = $Public.Args<T, F>
  export type Payload<T, F extends $Public.Operation> = $Public.Payload<T, F>
  export type Result<T, A, F extends $Public.Operation> = $Public.Result<T, A, F>
  export type Exact<T, W> = $Public.Exact<T, W>

  /**
   * Prisma Client JS version: 4.16.2
   * Query Engine version: 4bc8b6e1b66cb932731fb1bdbbc550d1e010de81
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

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
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Conversation: 'Conversation',
    Message: 'Message',
    KnowledgeDocument: 'KnowledgeDocument',
    KnowledgeChunk: 'KnowledgeChunk',
    Phrase: 'Phrase',
    Category: 'Category',
    Progress: 'Progress'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.Args}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'user' | 'conversation' | 'message' | 'knowledgeDocument' | 'knowledgeChunk' | 'phrase' | 'category' | 'progress'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      User: {
        payload: UserPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Conversation: {
        payload: ConversationPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.ConversationFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversationFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ConversationPayload>
          }
          findFirst: {
            args: Prisma.ConversationFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversationFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ConversationPayload>
          }
          findMany: {
            args: Prisma.ConversationFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ConversationPayload>[]
          }
          create: {
            args: Prisma.ConversationCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ConversationPayload>
          }
          createMany: {
            args: Prisma.ConversationCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ConversationDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ConversationPayload>
          }
          update: {
            args: Prisma.ConversationUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ConversationPayload>
          }
          deleteMany: {
            args: Prisma.ConversationDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ConversationUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ConversationUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ConversationPayload>
          }
          aggregate: {
            args: Prisma.ConversationAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateConversation>
          }
          groupBy: {
            args: Prisma.ConversationGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ConversationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConversationCountArgs<ExtArgs>,
            result: $Utils.Optional<ConversationCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: MessagePayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>,
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>,
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      KnowledgeDocument: {
        payload: KnowledgeDocumentPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.KnowledgeDocumentFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<KnowledgeDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KnowledgeDocumentFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<KnowledgeDocumentPayload>
          }
          findFirst: {
            args: Prisma.KnowledgeDocumentFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<KnowledgeDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KnowledgeDocumentFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<KnowledgeDocumentPayload>
          }
          findMany: {
            args: Prisma.KnowledgeDocumentFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<KnowledgeDocumentPayload>[]
          }
          create: {
            args: Prisma.KnowledgeDocumentCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<KnowledgeDocumentPayload>
          }
          createMany: {
            args: Prisma.KnowledgeDocumentCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.KnowledgeDocumentDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<KnowledgeDocumentPayload>
          }
          update: {
            args: Prisma.KnowledgeDocumentUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<KnowledgeDocumentPayload>
          }
          deleteMany: {
            args: Prisma.KnowledgeDocumentDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.KnowledgeDocumentUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.KnowledgeDocumentUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<KnowledgeDocumentPayload>
          }
          aggregate: {
            args: Prisma.KnowledgeDocumentAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateKnowledgeDocument>
          }
          groupBy: {
            args: Prisma.KnowledgeDocumentGroupByArgs<ExtArgs>,
            result: $Utils.Optional<KnowledgeDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.KnowledgeDocumentCountArgs<ExtArgs>,
            result: $Utils.Optional<KnowledgeDocumentCountAggregateOutputType> | number
          }
        }
      }
      KnowledgeChunk: {
        payload: KnowledgeChunkPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.KnowledgeChunkFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<KnowledgeChunkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KnowledgeChunkFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<KnowledgeChunkPayload>
          }
          findFirst: {
            args: Prisma.KnowledgeChunkFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<KnowledgeChunkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KnowledgeChunkFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<KnowledgeChunkPayload>
          }
          findMany: {
            args: Prisma.KnowledgeChunkFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<KnowledgeChunkPayload>[]
          }
          create: {
            args: Prisma.KnowledgeChunkCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<KnowledgeChunkPayload>
          }
          createMany: {
            args: Prisma.KnowledgeChunkCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.KnowledgeChunkDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<KnowledgeChunkPayload>
          }
          update: {
            args: Prisma.KnowledgeChunkUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<KnowledgeChunkPayload>
          }
          deleteMany: {
            args: Prisma.KnowledgeChunkDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.KnowledgeChunkUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.KnowledgeChunkUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<KnowledgeChunkPayload>
          }
          aggregate: {
            args: Prisma.KnowledgeChunkAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateKnowledgeChunk>
          }
          groupBy: {
            args: Prisma.KnowledgeChunkGroupByArgs<ExtArgs>,
            result: $Utils.Optional<KnowledgeChunkGroupByOutputType>[]
          }
          count: {
            args: Prisma.KnowledgeChunkCountArgs<ExtArgs>,
            result: $Utils.Optional<KnowledgeChunkCountAggregateOutputType> | number
          }
        }
      }
      Phrase: {
        payload: PhrasePayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.PhraseFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PhrasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PhraseFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PhrasePayload>
          }
          findFirst: {
            args: Prisma.PhraseFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PhrasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PhraseFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PhrasePayload>
          }
          findMany: {
            args: Prisma.PhraseFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PhrasePayload>[]
          }
          create: {
            args: Prisma.PhraseCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PhrasePayload>
          }
          createMany: {
            args: Prisma.PhraseCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.PhraseDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PhrasePayload>
          }
          update: {
            args: Prisma.PhraseUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PhrasePayload>
          }
          deleteMany: {
            args: Prisma.PhraseDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.PhraseUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.PhraseUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PhrasePayload>
          }
          aggregate: {
            args: Prisma.PhraseAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregatePhrase>
          }
          groupBy: {
            args: Prisma.PhraseGroupByArgs<ExtArgs>,
            result: $Utils.Optional<PhraseGroupByOutputType>[]
          }
          count: {
            args: Prisma.PhraseCountArgs<ExtArgs>,
            result: $Utils.Optional<PhraseCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: CategoryPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>,
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>,
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Progress: {
        payload: ProgressPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.ProgressFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProgressFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ProgressPayload>
          }
          findFirst: {
            args: Prisma.ProgressFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProgressFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ProgressPayload>
          }
          findMany: {
            args: Prisma.ProgressFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ProgressPayload>[]
          }
          create: {
            args: Prisma.ProgressCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ProgressPayload>
          }
          createMany: {
            args: Prisma.ProgressCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ProgressDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ProgressPayload>
          }
          update: {
            args: Prisma.ProgressUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ProgressPayload>
          }
          deleteMany: {
            args: Prisma.ProgressDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ProgressUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ProgressUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ProgressPayload>
          }
          aggregate: {
            args: Prisma.ProgressAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateProgress>
          }
          groupBy: {
            args: Prisma.ProgressGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProgressCountArgs<ExtArgs>,
            result: $Utils.Optional<ProgressCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

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
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    conversations: number
    phrases: number
    progress: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    conversations?: boolean | UserCountOutputTypeCountConversationsArgs
    phrases?: boolean | UserCountOutputTypeCountPhrasesArgs
    progress?: boolean | UserCountOutputTypeCountProgressArgs
  }

  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPhrasesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: PhraseWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProgressArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ProgressWhereInput
  }



  /**
   * Count Type ConversationCountOutputType
   */


  export type ConversationCountOutputType = {
    messages: number
  }

  export type ConversationCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    messages?: boolean | ConversationCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationCountOutputType
     */
    select?: ConversationCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }



  /**
   * Count Type KnowledgeDocumentCountOutputType
   */


  export type KnowledgeDocumentCountOutputType = {
    chunks: number
  }

  export type KnowledgeDocumentCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    chunks?: boolean | KnowledgeDocumentCountOutputTypeCountChunksArgs
  }

  // Custom InputTypes

  /**
   * KnowledgeDocumentCountOutputType without action
   */
  export type KnowledgeDocumentCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeDocumentCountOutputType
     */
    select?: KnowledgeDocumentCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * KnowledgeDocumentCountOutputType without action
   */
  export type KnowledgeDocumentCountOutputTypeCountChunksArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: KnowledgeChunkWhereInput
  }



  /**
   * Models
   */

  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    clerkId: string | null
    email: string | null
    name: string | null
    level: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    clerkId: string | null
    email: string | null
    name: string | null
    level: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    clerkId: number
    email: number
    name: number
    level: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    clerkId?: true
    email?: true
    name?: true
    level?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    clerkId?: true
    email?: true
    name?: true
    level?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    clerkId?: true
    email?: true
    name?: true
    level?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: UserScalarFieldEnum[]
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: string
    clerkId: string
    email: string | null
    name: string | null
    level: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    email?: boolean
    name?: boolean
    level?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    phrases?: boolean | User$phrasesArgs<ExtArgs>
    progress?: boolean | User$progressArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    clerkId?: boolean
    email?: boolean
    name?: boolean
    level?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    phrases?: boolean | User$phrasesArgs<ExtArgs>
    progress?: boolean | User$progressArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeArgs<ExtArgs>
  }


  type UserGetPayload<S extends boolean | null | undefined | UserArgs> = $Types.GetResult<UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<UserPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    conversations<T extends User$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, User$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<ConversationPayload<ExtArgs>, T, 'findMany', never>| Null>;

    phrases<T extends User$phrasesArgs<ExtArgs> = {}>(args?: Subset<T, User$phrasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<PhrasePayload<ExtArgs>, T, 'findMany', never>| Null>;

    progress<T extends User$progressArgs<ExtArgs> = {}>(args?: Subset<T, User$progressArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<ProgressPayload<ExtArgs>, T, 'findMany', never>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUnique
   */
  export interface UserFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UserFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User findFirst
   */
  export interface UserFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UserFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }


  /**
   * User.conversations
   */
  export type User$conversationsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: Enumerable<ConversationOrderByWithRelationInput>
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ConversationScalarFieldEnum>
  }


  /**
   * User.phrases
   */
  export type User$phrasesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PhraseInclude<ExtArgs> | null
    where?: PhraseWhereInput
    orderBy?: Enumerable<PhraseOrderByWithRelationInput>
    cursor?: PhraseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PhraseScalarFieldEnum>
  }


  /**
   * User.progress
   */
  export type User$progressArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProgressInclude<ExtArgs> | null
    where?: ProgressWhereInput
    orderBy?: Enumerable<ProgressOrderByWithRelationInput>
    cursor?: ProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ProgressScalarFieldEnum>
  }


  /**
   * User without action
   */
  export type UserArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
  }



  /**
   * Model Conversation
   */


  export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  export type ConversationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    sessionId: string | null
    startedAt: Date | null
    endedAt: Date | null
    topic: string | null
  }

  export type ConversationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    sessionId: string | null
    startedAt: Date | null
    endedAt: Date | null
    topic: string | null
  }

  export type ConversationCountAggregateOutputType = {
    id: number
    userId: number
    sessionId: number
    startedAt: number
    endedAt: number
    topic: number
    _all: number
  }


  export type ConversationMinAggregateInputType = {
    id?: true
    userId?: true
    sessionId?: true
    startedAt?: true
    endedAt?: true
    topic?: true
  }

  export type ConversationMaxAggregateInputType = {
    id?: true
    userId?: true
    sessionId?: true
    startedAt?: true
    endedAt?: true
    topic?: true
  }

  export type ConversationCountAggregateInputType = {
    id?: true
    userId?: true
    sessionId?: true
    startedAt?: true
    endedAt?: true
    topic?: true
    _all?: true
  }

  export type ConversationAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversation to aggregate.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: Enumerable<ConversationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Conversations
    **/
    _count?: true | ConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationMaxAggregateInputType
  }

  export type GetConversationAggregateType<T extends ConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversation[P]>
      : GetScalarType<T[P], AggregateConversation[P]>
  }




  export type ConversationGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
    orderBy?: Enumerable<ConversationOrderByWithAggregationInput>
    by: ConversationScalarFieldEnum[]
    having?: ConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationCountAggregateInputType | true
    _min?: ConversationMinAggregateInputType
    _max?: ConversationMaxAggregateInputType
  }


  export type ConversationGroupByOutputType = {
    id: string
    userId: string | null
    sessionId: string
    startedAt: Date
    endedAt: Date | null
    topic: string | null
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  type GetConversationGroupByPayload<T extends ConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationGroupByOutputType[P]>
        }
      >
    >


  export type ConversationSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sessionId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    topic?: boolean
    user?: boolean | UserArgs<ExtArgs>
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectScalar = {
    id?: boolean
    userId?: boolean
    sessionId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    topic?: boolean
  }

  export type ConversationInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | UserArgs<ExtArgs>
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeArgs<ExtArgs>
  }


  type ConversationGetPayload<S extends boolean | null | undefined | ConversationArgs> = $Types.GetResult<ConversationPayload, S>

  type ConversationCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<ConversationFindManyArgs, 'select' | 'include'> & {
      select?: ConversationCountAggregateInputType | true
    }

  export interface ConversationDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Conversation'], meta: { name: 'Conversation' } }
    /**
     * Find zero or one Conversation that matches the filter.
     * @param {ConversationFindUniqueArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ConversationFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Conversation'> extends True ? Prisma__ConversationClient<$Types.GetResult<ConversationPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__ConversationClient<$Types.GetResult<ConversationPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Conversation that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ConversationFindUniqueOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ConversationClient<$Types.GetResult<ConversationPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Conversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ConversationFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Conversation'> extends True ? Prisma__ConversationClient<$Types.GetResult<ConversationPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__ConversationClient<$Types.GetResult<ConversationPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Conversation that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ConversationClient<$Types.GetResult<ConversationPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Conversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conversations
     * const conversations = await prisma.conversation.findMany()
     * 
     * // Get first 10 Conversations
     * const conversations = await prisma.conversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationWithIdOnly = await prisma.conversation.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ConversationFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ConversationFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<ConversationPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Conversation.
     * @param {ConversationCreateArgs} args - Arguments to create a Conversation.
     * @example
     * // Create one Conversation
     * const Conversation = await prisma.conversation.create({
     *   data: {
     *     // ... data to create a Conversation
     *   }
     * })
     * 
    **/
    create<T extends ConversationCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ConversationCreateArgs<ExtArgs>>
    ): Prisma__ConversationClient<$Types.GetResult<ConversationPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Conversations.
     *     @param {ConversationCreateManyArgs} args - Arguments to create many Conversations.
     *     @example
     *     // Create many Conversations
     *     const conversation = await prisma.conversation.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ConversationCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Conversation.
     * @param {ConversationDeleteArgs} args - Arguments to delete one Conversation.
     * @example
     * // Delete one Conversation
     * const Conversation = await prisma.conversation.delete({
     *   where: {
     *     // ... filter to delete one Conversation
     *   }
     * })
     * 
    **/
    delete<T extends ConversationDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ConversationDeleteArgs<ExtArgs>>
    ): Prisma__ConversationClient<$Types.GetResult<ConversationPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Conversation.
     * @param {ConversationUpdateArgs} args - Arguments to update one Conversation.
     * @example
     * // Update one Conversation
     * const conversation = await prisma.conversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ConversationUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ConversationUpdateArgs<ExtArgs>>
    ): Prisma__ConversationClient<$Types.GetResult<ConversationPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Conversations.
     * @param {ConversationDeleteManyArgs} args - Arguments to filter Conversations to delete.
     * @example
     * // Delete a few Conversations
     * const { count } = await prisma.conversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ConversationDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ConversationUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Conversation.
     * @param {ConversationUpsertArgs} args - Arguments to update or create a Conversation.
     * @example
     * // Update or create a Conversation
     * const conversation = await prisma.conversation.upsert({
     *   create: {
     *     // ... data to create a Conversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conversation we want to update
     *   }
     * })
    **/
    upsert<T extends ConversationUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ConversationUpsertArgs<ExtArgs>>
    ): Prisma__ConversationClient<$Types.GetResult<ConversationPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationCountArgs} args - Arguments to filter Conversations to count.
     * @example
     * // Count the number of Conversations
     * const count = await prisma.conversation.count({
     *   where: {
     *     // ... the filter for the Conversations we want to count
     *   }
     * })
    **/
    count<T extends ConversationCountArgs>(
      args?: Subset<T, ConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConversationAggregateArgs>(args: Subset<T, ConversationAggregateArgs>): Prisma.PrismaPromise<GetConversationAggregateType<T>>

    /**
     * Group by Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationGroupByArgs} args - Group by arguments.
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
      T extends ConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationGroupByArgs['orderBy'] }
        : { orderBy?: ConversationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Conversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ConversationClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    messages<T extends Conversation$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<MessagePayload<ExtArgs>, T, 'findMany', never>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Conversation base type for findUnique actions
   */
  export type ConversationFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findUnique
   */
  export interface ConversationFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends ConversationFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Conversation findUniqueOrThrow
   */
  export type ConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }


  /**
   * Conversation base type for findFirst actions
   */
  export type ConversationFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: Enumerable<ConversationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: Enumerable<ConversationScalarFieldEnum>
  }

  /**
   * Conversation findFirst
   */
  export interface ConversationFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends ConversationFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Conversation findFirstOrThrow
   */
  export type ConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: Enumerable<ConversationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: Enumerable<ConversationScalarFieldEnum>
  }


  /**
   * Conversation findMany
   */
  export type ConversationFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversations to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: Enumerable<ConversationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    distinct?: Enumerable<ConversationScalarFieldEnum>
  }


  /**
   * Conversation create
   */
  export type ConversationCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a Conversation.
     */
    data: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
  }


  /**
   * Conversation createMany
   */
  export type ConversationCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Conversations.
     */
    data: Enumerable<ConversationCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Conversation update
   */
  export type ConversationUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a Conversation.
     */
    data: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
    /**
     * Choose, which Conversation to update.
     */
    where: ConversationWhereUniqueInput
  }


  /**
   * Conversation updateMany
   */
  export type ConversationUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
  }


  /**
   * Conversation upsert
   */
  export type ConversationUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the Conversation to update in case it exists.
     */
    where: ConversationWhereUniqueInput
    /**
     * In case the Conversation found by the `where` argument doesn't exist, create a new Conversation with this data.
     */
    create: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
    /**
     * In case the Conversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
  }


  /**
   * Conversation delete
   */
  export type ConversationDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter which Conversation to delete.
     */
    where: ConversationWhereUniqueInput
  }


  /**
   * Conversation deleteMany
   */
  export type ConversationDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversations to delete
     */
    where?: ConversationWhereInput
  }


  /**
   * Conversation.messages
   */
  export type Conversation$messagesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: Enumerable<MessageOrderByWithRelationInput>
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<MessageScalarFieldEnum>
  }


  /**
   * Conversation without action
   */
  export type ConversationArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ConversationInclude<ExtArgs> | null
  }



  /**
   * Model Message
   */


  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    conversationId: string | null
    role: string | null
    content: string | null
    transcription: string | null
    timestamp: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    conversationId: string | null
    role: string | null
    content: string | null
    transcription: string | null
    timestamp: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    conversationId: number
    role: number
    content: number
    transcription: number
    timestamp: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    conversationId?: true
    role?: true
    content?: true
    transcription?: true
    timestamp?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    conversationId?: true
    role?: true
    content?: true
    transcription?: true
    timestamp?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    conversationId?: true
    role?: true
    content?: true
    transcription?: true
    timestamp?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: Enumerable<MessageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: Enumerable<MessageOrderByWithAggregationInput>
    by: MessageScalarFieldEnum[]
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }


  export type MessageGroupByOutputType = {
    id: string
    conversationId: string
    role: string
    content: string
    transcription: string | null
    timestamp: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    transcription?: boolean
    timestamp?: boolean
    conversation?: boolean | ConversationArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    transcription?: boolean
    timestamp?: boolean
  }

  export type MessageInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationArgs<ExtArgs>
  }


  type MessageGetPayload<S extends boolean | null | undefined | MessageArgs> = $Types.GetResult<MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<MessageFindManyArgs, 'select' | 'include'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends MessageFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Message'> extends True ? Prisma__MessageClient<$Types.GetResult<MessagePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__MessageClient<$Types.GetResult<MessagePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Message that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__MessageClient<$Types.GetResult<MessagePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends MessageFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Message'> extends True ? Prisma__MessageClient<$Types.GetResult<MessagePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__MessageClient<$Types.GetResult<MessagePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Message that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__MessageClient<$Types.GetResult<MessagePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends MessageFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<MessagePayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
    **/
    create<T extends MessageCreateArgs<ExtArgs>>(
      args: SelectSubset<T, MessageCreateArgs<ExtArgs>>
    ): Prisma__MessageClient<$Types.GetResult<MessagePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Messages.
     *     @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     *     @example
     *     // Create many Messages
     *     const message = await prisma.message.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends MessageCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
    **/
    delete<T extends MessageDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>
    ): Prisma__MessageClient<$Types.GetResult<MessagePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends MessageUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>
    ): Prisma__MessageClient<$Types.GetResult<MessagePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends MessageDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends MessageUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
    **/
    upsert<T extends MessageUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>
    ): Prisma__MessageClient<$Types.GetResult<MessagePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
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
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    conversation<T extends ConversationArgs<ExtArgs> = {}>(args?: Subset<T, ConversationArgs<ExtArgs>>): Prisma__ConversationClient<$Types.GetResult<ConversationPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Message base type for findUnique actions
   */
  export type MessageFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUnique
   */
  export interface MessageFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends MessageFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }


  /**
   * Message base type for findFirst actions
   */
  export type MessageFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: Enumerable<MessageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: Enumerable<MessageScalarFieldEnum>
  }

  /**
   * Message findFirst
   */
  export interface MessageFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends MessageFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: Enumerable<MessageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: Enumerable<MessageScalarFieldEnum>
  }


  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: Enumerable<MessageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: Enumerable<MessageScalarFieldEnum>
  }


  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }


  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: Enumerable<MessageCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }


  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
  }


  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }


  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }


  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
  }


  /**
   * Message without action
   */
  export type MessageArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude<ExtArgs> | null
  }



  /**
   * Model KnowledgeDocument
   */


  export type AggregateKnowledgeDocument = {
    _count: KnowledgeDocumentCountAggregateOutputType | null
    _min: KnowledgeDocumentMinAggregateOutputType | null
    _max: KnowledgeDocumentMaxAggregateOutputType | null
  }

  export type KnowledgeDocumentMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    category: string | null
    language: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KnowledgeDocumentMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    category: string | null
    language: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KnowledgeDocumentCountAggregateOutputType = {
    id: number
    title: number
    content: number
    category: number
    language: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type KnowledgeDocumentMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    category?: true
    language?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KnowledgeDocumentMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    category?: true
    language?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KnowledgeDocumentCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    category?: true
    language?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type KnowledgeDocumentAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which KnowledgeDocument to aggregate.
     */
    where?: KnowledgeDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeDocuments to fetch.
     */
    orderBy?: Enumerable<KnowledgeDocumentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KnowledgeDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KnowledgeDocuments
    **/
    _count?: true | KnowledgeDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KnowledgeDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KnowledgeDocumentMaxAggregateInputType
  }

  export type GetKnowledgeDocumentAggregateType<T extends KnowledgeDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateKnowledgeDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKnowledgeDocument[P]>
      : GetScalarType<T[P], AggregateKnowledgeDocument[P]>
  }




  export type KnowledgeDocumentGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: KnowledgeDocumentWhereInput
    orderBy?: Enumerable<KnowledgeDocumentOrderByWithAggregationInput>
    by: KnowledgeDocumentScalarFieldEnum[]
    having?: KnowledgeDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KnowledgeDocumentCountAggregateInputType | true
    _min?: KnowledgeDocumentMinAggregateInputType
    _max?: KnowledgeDocumentMaxAggregateInputType
  }


  export type KnowledgeDocumentGroupByOutputType = {
    id: string
    title: string
    content: string
    category: string
    language: string
    createdAt: Date
    updatedAt: Date
    _count: KnowledgeDocumentCountAggregateOutputType | null
    _min: KnowledgeDocumentMinAggregateOutputType | null
    _max: KnowledgeDocumentMaxAggregateOutputType | null
  }

  type GetKnowledgeDocumentGroupByPayload<T extends KnowledgeDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<KnowledgeDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KnowledgeDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KnowledgeDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], KnowledgeDocumentGroupByOutputType[P]>
        }
      >
    >


  export type KnowledgeDocumentSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    category?: boolean
    language?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    chunks?: boolean | KnowledgeDocument$chunksArgs<ExtArgs>
    _count?: boolean | KnowledgeDocumentCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["knowledgeDocument"]>

  export type KnowledgeDocumentSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    category?: boolean
    language?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type KnowledgeDocumentInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    chunks?: boolean | KnowledgeDocument$chunksArgs<ExtArgs>
    _count?: boolean | KnowledgeDocumentCountOutputTypeArgs<ExtArgs>
  }


  type KnowledgeDocumentGetPayload<S extends boolean | null | undefined | KnowledgeDocumentArgs> = $Types.GetResult<KnowledgeDocumentPayload, S>

  type KnowledgeDocumentCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<KnowledgeDocumentFindManyArgs, 'select' | 'include'> & {
      select?: KnowledgeDocumentCountAggregateInputType | true
    }

  export interface KnowledgeDocumentDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KnowledgeDocument'], meta: { name: 'KnowledgeDocument' } }
    /**
     * Find zero or one KnowledgeDocument that matches the filter.
     * @param {KnowledgeDocumentFindUniqueArgs} args - Arguments to find a KnowledgeDocument
     * @example
     * // Get one KnowledgeDocument
     * const knowledgeDocument = await prisma.knowledgeDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends KnowledgeDocumentFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, KnowledgeDocumentFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'KnowledgeDocument'> extends True ? Prisma__KnowledgeDocumentClient<$Types.GetResult<KnowledgeDocumentPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__KnowledgeDocumentClient<$Types.GetResult<KnowledgeDocumentPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one KnowledgeDocument that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {KnowledgeDocumentFindUniqueOrThrowArgs} args - Arguments to find a KnowledgeDocument
     * @example
     * // Get one KnowledgeDocument
     * const knowledgeDocument = await prisma.knowledgeDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends KnowledgeDocumentFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, KnowledgeDocumentFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__KnowledgeDocumentClient<$Types.GetResult<KnowledgeDocumentPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first KnowledgeDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeDocumentFindFirstArgs} args - Arguments to find a KnowledgeDocument
     * @example
     * // Get one KnowledgeDocument
     * const knowledgeDocument = await prisma.knowledgeDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends KnowledgeDocumentFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, KnowledgeDocumentFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'KnowledgeDocument'> extends True ? Prisma__KnowledgeDocumentClient<$Types.GetResult<KnowledgeDocumentPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__KnowledgeDocumentClient<$Types.GetResult<KnowledgeDocumentPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first KnowledgeDocument that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeDocumentFindFirstOrThrowArgs} args - Arguments to find a KnowledgeDocument
     * @example
     * // Get one KnowledgeDocument
     * const knowledgeDocument = await prisma.knowledgeDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends KnowledgeDocumentFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, KnowledgeDocumentFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__KnowledgeDocumentClient<$Types.GetResult<KnowledgeDocumentPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more KnowledgeDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeDocumentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KnowledgeDocuments
     * const knowledgeDocuments = await prisma.knowledgeDocument.findMany()
     * 
     * // Get first 10 KnowledgeDocuments
     * const knowledgeDocuments = await prisma.knowledgeDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const knowledgeDocumentWithIdOnly = await prisma.knowledgeDocument.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends KnowledgeDocumentFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, KnowledgeDocumentFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<KnowledgeDocumentPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a KnowledgeDocument.
     * @param {KnowledgeDocumentCreateArgs} args - Arguments to create a KnowledgeDocument.
     * @example
     * // Create one KnowledgeDocument
     * const KnowledgeDocument = await prisma.knowledgeDocument.create({
     *   data: {
     *     // ... data to create a KnowledgeDocument
     *   }
     * })
     * 
    **/
    create<T extends KnowledgeDocumentCreateArgs<ExtArgs>>(
      args: SelectSubset<T, KnowledgeDocumentCreateArgs<ExtArgs>>
    ): Prisma__KnowledgeDocumentClient<$Types.GetResult<KnowledgeDocumentPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many KnowledgeDocuments.
     *     @param {KnowledgeDocumentCreateManyArgs} args - Arguments to create many KnowledgeDocuments.
     *     @example
     *     // Create many KnowledgeDocuments
     *     const knowledgeDocument = await prisma.knowledgeDocument.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends KnowledgeDocumentCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, KnowledgeDocumentCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a KnowledgeDocument.
     * @param {KnowledgeDocumentDeleteArgs} args - Arguments to delete one KnowledgeDocument.
     * @example
     * // Delete one KnowledgeDocument
     * const KnowledgeDocument = await prisma.knowledgeDocument.delete({
     *   where: {
     *     // ... filter to delete one KnowledgeDocument
     *   }
     * })
     * 
    **/
    delete<T extends KnowledgeDocumentDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, KnowledgeDocumentDeleteArgs<ExtArgs>>
    ): Prisma__KnowledgeDocumentClient<$Types.GetResult<KnowledgeDocumentPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one KnowledgeDocument.
     * @param {KnowledgeDocumentUpdateArgs} args - Arguments to update one KnowledgeDocument.
     * @example
     * // Update one KnowledgeDocument
     * const knowledgeDocument = await prisma.knowledgeDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends KnowledgeDocumentUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, KnowledgeDocumentUpdateArgs<ExtArgs>>
    ): Prisma__KnowledgeDocumentClient<$Types.GetResult<KnowledgeDocumentPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more KnowledgeDocuments.
     * @param {KnowledgeDocumentDeleteManyArgs} args - Arguments to filter KnowledgeDocuments to delete.
     * @example
     * // Delete a few KnowledgeDocuments
     * const { count } = await prisma.knowledgeDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends KnowledgeDocumentDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, KnowledgeDocumentDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KnowledgeDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KnowledgeDocuments
     * const knowledgeDocument = await prisma.knowledgeDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends KnowledgeDocumentUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, KnowledgeDocumentUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one KnowledgeDocument.
     * @param {KnowledgeDocumentUpsertArgs} args - Arguments to update or create a KnowledgeDocument.
     * @example
     * // Update or create a KnowledgeDocument
     * const knowledgeDocument = await prisma.knowledgeDocument.upsert({
     *   create: {
     *     // ... data to create a KnowledgeDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KnowledgeDocument we want to update
     *   }
     * })
    **/
    upsert<T extends KnowledgeDocumentUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, KnowledgeDocumentUpsertArgs<ExtArgs>>
    ): Prisma__KnowledgeDocumentClient<$Types.GetResult<KnowledgeDocumentPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of KnowledgeDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeDocumentCountArgs} args - Arguments to filter KnowledgeDocuments to count.
     * @example
     * // Count the number of KnowledgeDocuments
     * const count = await prisma.knowledgeDocument.count({
     *   where: {
     *     // ... the filter for the KnowledgeDocuments we want to count
     *   }
     * })
    **/
    count<T extends KnowledgeDocumentCountArgs>(
      args?: Subset<T, KnowledgeDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KnowledgeDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KnowledgeDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KnowledgeDocumentAggregateArgs>(args: Subset<T, KnowledgeDocumentAggregateArgs>): Prisma.PrismaPromise<GetKnowledgeDocumentAggregateType<T>>

    /**
     * Group by KnowledgeDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeDocumentGroupByArgs} args - Group by arguments.
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
      T extends KnowledgeDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KnowledgeDocumentGroupByArgs['orderBy'] }
        : { orderBy?: KnowledgeDocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, KnowledgeDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKnowledgeDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for KnowledgeDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__KnowledgeDocumentClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    chunks<T extends KnowledgeDocument$chunksArgs<ExtArgs> = {}>(args?: Subset<T, KnowledgeDocument$chunksArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<KnowledgeChunkPayload<ExtArgs>, T, 'findMany', never>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * KnowledgeDocument base type for findUnique actions
   */
  export type KnowledgeDocumentFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeDocument
     */
    select?: KnowledgeDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: KnowledgeDocumentInclude<ExtArgs> | null
    /**
     * Filter, which KnowledgeDocument to fetch.
     */
    where: KnowledgeDocumentWhereUniqueInput
  }

  /**
   * KnowledgeDocument findUnique
   */
  export interface KnowledgeDocumentFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends KnowledgeDocumentFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * KnowledgeDocument findUniqueOrThrow
   */
  export type KnowledgeDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeDocument
     */
    select?: KnowledgeDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: KnowledgeDocumentInclude<ExtArgs> | null
    /**
     * Filter, which KnowledgeDocument to fetch.
     */
    where: KnowledgeDocumentWhereUniqueInput
  }


  /**
   * KnowledgeDocument base type for findFirst actions
   */
  export type KnowledgeDocumentFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeDocument
     */
    select?: KnowledgeDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: KnowledgeDocumentInclude<ExtArgs> | null
    /**
     * Filter, which KnowledgeDocument to fetch.
     */
    where?: KnowledgeDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeDocuments to fetch.
     */
    orderBy?: Enumerable<KnowledgeDocumentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KnowledgeDocuments.
     */
    cursor?: KnowledgeDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KnowledgeDocuments.
     */
    distinct?: Enumerable<KnowledgeDocumentScalarFieldEnum>
  }

  /**
   * KnowledgeDocument findFirst
   */
  export interface KnowledgeDocumentFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends KnowledgeDocumentFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * KnowledgeDocument findFirstOrThrow
   */
  export type KnowledgeDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeDocument
     */
    select?: KnowledgeDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: KnowledgeDocumentInclude<ExtArgs> | null
    /**
     * Filter, which KnowledgeDocument to fetch.
     */
    where?: KnowledgeDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeDocuments to fetch.
     */
    orderBy?: Enumerable<KnowledgeDocumentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KnowledgeDocuments.
     */
    cursor?: KnowledgeDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KnowledgeDocuments.
     */
    distinct?: Enumerable<KnowledgeDocumentScalarFieldEnum>
  }


  /**
   * KnowledgeDocument findMany
   */
  export type KnowledgeDocumentFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeDocument
     */
    select?: KnowledgeDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: KnowledgeDocumentInclude<ExtArgs> | null
    /**
     * Filter, which KnowledgeDocuments to fetch.
     */
    where?: KnowledgeDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeDocuments to fetch.
     */
    orderBy?: Enumerable<KnowledgeDocumentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KnowledgeDocuments.
     */
    cursor?: KnowledgeDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeDocuments.
     */
    skip?: number
    distinct?: Enumerable<KnowledgeDocumentScalarFieldEnum>
  }


  /**
   * KnowledgeDocument create
   */
  export type KnowledgeDocumentCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeDocument
     */
    select?: KnowledgeDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: KnowledgeDocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a KnowledgeDocument.
     */
    data: XOR<KnowledgeDocumentCreateInput, KnowledgeDocumentUncheckedCreateInput>
  }


  /**
   * KnowledgeDocument createMany
   */
  export type KnowledgeDocumentCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KnowledgeDocuments.
     */
    data: Enumerable<KnowledgeDocumentCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * KnowledgeDocument update
   */
  export type KnowledgeDocumentUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeDocument
     */
    select?: KnowledgeDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: KnowledgeDocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a KnowledgeDocument.
     */
    data: XOR<KnowledgeDocumentUpdateInput, KnowledgeDocumentUncheckedUpdateInput>
    /**
     * Choose, which KnowledgeDocument to update.
     */
    where: KnowledgeDocumentWhereUniqueInput
  }


  /**
   * KnowledgeDocument updateMany
   */
  export type KnowledgeDocumentUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KnowledgeDocuments.
     */
    data: XOR<KnowledgeDocumentUpdateManyMutationInput, KnowledgeDocumentUncheckedUpdateManyInput>
    /**
     * Filter which KnowledgeDocuments to update
     */
    where?: KnowledgeDocumentWhereInput
  }


  /**
   * KnowledgeDocument upsert
   */
  export type KnowledgeDocumentUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeDocument
     */
    select?: KnowledgeDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: KnowledgeDocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the KnowledgeDocument to update in case it exists.
     */
    where: KnowledgeDocumentWhereUniqueInput
    /**
     * In case the KnowledgeDocument found by the `where` argument doesn't exist, create a new KnowledgeDocument with this data.
     */
    create: XOR<KnowledgeDocumentCreateInput, KnowledgeDocumentUncheckedCreateInput>
    /**
     * In case the KnowledgeDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KnowledgeDocumentUpdateInput, KnowledgeDocumentUncheckedUpdateInput>
  }


  /**
   * KnowledgeDocument delete
   */
  export type KnowledgeDocumentDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeDocument
     */
    select?: KnowledgeDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: KnowledgeDocumentInclude<ExtArgs> | null
    /**
     * Filter which KnowledgeDocument to delete.
     */
    where: KnowledgeDocumentWhereUniqueInput
  }


  /**
   * KnowledgeDocument deleteMany
   */
  export type KnowledgeDocumentDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which KnowledgeDocuments to delete
     */
    where?: KnowledgeDocumentWhereInput
  }


  /**
   * KnowledgeDocument.chunks
   */
  export type KnowledgeDocument$chunksArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeChunk
     */
    select?: KnowledgeChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: KnowledgeChunkInclude<ExtArgs> | null
    where?: KnowledgeChunkWhereInput
    orderBy?: Enumerable<KnowledgeChunkOrderByWithRelationInput>
    cursor?: KnowledgeChunkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<KnowledgeChunkScalarFieldEnum>
  }


  /**
   * KnowledgeDocument without action
   */
  export type KnowledgeDocumentArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeDocument
     */
    select?: KnowledgeDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: KnowledgeDocumentInclude<ExtArgs> | null
  }



  /**
   * Model KnowledgeChunk
   */


  export type AggregateKnowledgeChunk = {
    _count: KnowledgeChunkCountAggregateOutputType | null
    _avg: KnowledgeChunkAvgAggregateOutputType | null
    _sum: KnowledgeChunkSumAggregateOutputType | null
    _min: KnowledgeChunkMinAggregateOutputType | null
    _max: KnowledgeChunkMaxAggregateOutputType | null
  }

  export type KnowledgeChunkAvgAggregateOutputType = {
    chunkIndex: number | null
  }

  export type KnowledgeChunkSumAggregateOutputType = {
    chunkIndex: number | null
  }

  export type KnowledgeChunkMinAggregateOutputType = {
    id: string | null
    documentId: string | null
    content: string | null
    chunkIndex: number | null
  }

  export type KnowledgeChunkMaxAggregateOutputType = {
    id: string | null
    documentId: string | null
    content: string | null
    chunkIndex: number | null
  }

  export type KnowledgeChunkCountAggregateOutputType = {
    id: number
    documentId: number
    content: number
    chunkIndex: number
    _all: number
  }


  export type KnowledgeChunkAvgAggregateInputType = {
    chunkIndex?: true
  }

  export type KnowledgeChunkSumAggregateInputType = {
    chunkIndex?: true
  }

  export type KnowledgeChunkMinAggregateInputType = {
    id?: true
    documentId?: true
    content?: true
    chunkIndex?: true
  }

  export type KnowledgeChunkMaxAggregateInputType = {
    id?: true
    documentId?: true
    content?: true
    chunkIndex?: true
  }

  export type KnowledgeChunkCountAggregateInputType = {
    id?: true
    documentId?: true
    content?: true
    chunkIndex?: true
    _all?: true
  }

  export type KnowledgeChunkAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which KnowledgeChunk to aggregate.
     */
    where?: KnowledgeChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeChunks to fetch.
     */
    orderBy?: Enumerable<KnowledgeChunkOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KnowledgeChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KnowledgeChunks
    **/
    _count?: true | KnowledgeChunkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: KnowledgeChunkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: KnowledgeChunkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KnowledgeChunkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KnowledgeChunkMaxAggregateInputType
  }

  export type GetKnowledgeChunkAggregateType<T extends KnowledgeChunkAggregateArgs> = {
        [P in keyof T & keyof AggregateKnowledgeChunk]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKnowledgeChunk[P]>
      : GetScalarType<T[P], AggregateKnowledgeChunk[P]>
  }




  export type KnowledgeChunkGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: KnowledgeChunkWhereInput
    orderBy?: Enumerable<KnowledgeChunkOrderByWithAggregationInput>
    by: KnowledgeChunkScalarFieldEnum[]
    having?: KnowledgeChunkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KnowledgeChunkCountAggregateInputType | true
    _avg?: KnowledgeChunkAvgAggregateInputType
    _sum?: KnowledgeChunkSumAggregateInputType
    _min?: KnowledgeChunkMinAggregateInputType
    _max?: KnowledgeChunkMaxAggregateInputType
  }


  export type KnowledgeChunkGroupByOutputType = {
    id: string
    documentId: string
    content: string
    chunkIndex: number
    _count: KnowledgeChunkCountAggregateOutputType | null
    _avg: KnowledgeChunkAvgAggregateOutputType | null
    _sum: KnowledgeChunkSumAggregateOutputType | null
    _min: KnowledgeChunkMinAggregateOutputType | null
    _max: KnowledgeChunkMaxAggregateOutputType | null
  }

  type GetKnowledgeChunkGroupByPayload<T extends KnowledgeChunkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<KnowledgeChunkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KnowledgeChunkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KnowledgeChunkGroupByOutputType[P]>
            : GetScalarType<T[P], KnowledgeChunkGroupByOutputType[P]>
        }
      >
    >


  export type KnowledgeChunkSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    content?: boolean
    chunkIndex?: boolean
    document?: boolean | KnowledgeDocumentArgs<ExtArgs>
  }, ExtArgs["result"]["knowledgeChunk"]>

  export type KnowledgeChunkSelectScalar = {
    id?: boolean
    documentId?: boolean
    content?: boolean
    chunkIndex?: boolean
  }

  export type KnowledgeChunkInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    document?: boolean | KnowledgeDocumentArgs<ExtArgs>
  }


  type KnowledgeChunkGetPayload<S extends boolean | null | undefined | KnowledgeChunkArgs> = $Types.GetResult<KnowledgeChunkPayload, S>

  type KnowledgeChunkCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<KnowledgeChunkFindManyArgs, 'select' | 'include'> & {
      select?: KnowledgeChunkCountAggregateInputType | true
    }

  export interface KnowledgeChunkDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KnowledgeChunk'], meta: { name: 'KnowledgeChunk' } }
    /**
     * Find zero or one KnowledgeChunk that matches the filter.
     * @param {KnowledgeChunkFindUniqueArgs} args - Arguments to find a KnowledgeChunk
     * @example
     * // Get one KnowledgeChunk
     * const knowledgeChunk = await prisma.knowledgeChunk.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends KnowledgeChunkFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, KnowledgeChunkFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'KnowledgeChunk'> extends True ? Prisma__KnowledgeChunkClient<$Types.GetResult<KnowledgeChunkPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__KnowledgeChunkClient<$Types.GetResult<KnowledgeChunkPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one KnowledgeChunk that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {KnowledgeChunkFindUniqueOrThrowArgs} args - Arguments to find a KnowledgeChunk
     * @example
     * // Get one KnowledgeChunk
     * const knowledgeChunk = await prisma.knowledgeChunk.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends KnowledgeChunkFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, KnowledgeChunkFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__KnowledgeChunkClient<$Types.GetResult<KnowledgeChunkPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first KnowledgeChunk that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeChunkFindFirstArgs} args - Arguments to find a KnowledgeChunk
     * @example
     * // Get one KnowledgeChunk
     * const knowledgeChunk = await prisma.knowledgeChunk.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends KnowledgeChunkFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, KnowledgeChunkFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'KnowledgeChunk'> extends True ? Prisma__KnowledgeChunkClient<$Types.GetResult<KnowledgeChunkPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__KnowledgeChunkClient<$Types.GetResult<KnowledgeChunkPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first KnowledgeChunk that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeChunkFindFirstOrThrowArgs} args - Arguments to find a KnowledgeChunk
     * @example
     * // Get one KnowledgeChunk
     * const knowledgeChunk = await prisma.knowledgeChunk.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends KnowledgeChunkFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, KnowledgeChunkFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__KnowledgeChunkClient<$Types.GetResult<KnowledgeChunkPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more KnowledgeChunks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeChunkFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KnowledgeChunks
     * const knowledgeChunks = await prisma.knowledgeChunk.findMany()
     * 
     * // Get first 10 KnowledgeChunks
     * const knowledgeChunks = await prisma.knowledgeChunk.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const knowledgeChunkWithIdOnly = await prisma.knowledgeChunk.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends KnowledgeChunkFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, KnowledgeChunkFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<KnowledgeChunkPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a KnowledgeChunk.
     * @param {KnowledgeChunkCreateArgs} args - Arguments to create a KnowledgeChunk.
     * @example
     * // Create one KnowledgeChunk
     * const KnowledgeChunk = await prisma.knowledgeChunk.create({
     *   data: {
     *     // ... data to create a KnowledgeChunk
     *   }
     * })
     * 
    **/
    create<T extends KnowledgeChunkCreateArgs<ExtArgs>>(
      args: SelectSubset<T, KnowledgeChunkCreateArgs<ExtArgs>>
    ): Prisma__KnowledgeChunkClient<$Types.GetResult<KnowledgeChunkPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many KnowledgeChunks.
     *     @param {KnowledgeChunkCreateManyArgs} args - Arguments to create many KnowledgeChunks.
     *     @example
     *     // Create many KnowledgeChunks
     *     const knowledgeChunk = await prisma.knowledgeChunk.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends KnowledgeChunkCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, KnowledgeChunkCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a KnowledgeChunk.
     * @param {KnowledgeChunkDeleteArgs} args - Arguments to delete one KnowledgeChunk.
     * @example
     * // Delete one KnowledgeChunk
     * const KnowledgeChunk = await prisma.knowledgeChunk.delete({
     *   where: {
     *     // ... filter to delete one KnowledgeChunk
     *   }
     * })
     * 
    **/
    delete<T extends KnowledgeChunkDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, KnowledgeChunkDeleteArgs<ExtArgs>>
    ): Prisma__KnowledgeChunkClient<$Types.GetResult<KnowledgeChunkPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one KnowledgeChunk.
     * @param {KnowledgeChunkUpdateArgs} args - Arguments to update one KnowledgeChunk.
     * @example
     * // Update one KnowledgeChunk
     * const knowledgeChunk = await prisma.knowledgeChunk.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends KnowledgeChunkUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, KnowledgeChunkUpdateArgs<ExtArgs>>
    ): Prisma__KnowledgeChunkClient<$Types.GetResult<KnowledgeChunkPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more KnowledgeChunks.
     * @param {KnowledgeChunkDeleteManyArgs} args - Arguments to filter KnowledgeChunks to delete.
     * @example
     * // Delete a few KnowledgeChunks
     * const { count } = await prisma.knowledgeChunk.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends KnowledgeChunkDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, KnowledgeChunkDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KnowledgeChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeChunkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KnowledgeChunks
     * const knowledgeChunk = await prisma.knowledgeChunk.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends KnowledgeChunkUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, KnowledgeChunkUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one KnowledgeChunk.
     * @param {KnowledgeChunkUpsertArgs} args - Arguments to update or create a KnowledgeChunk.
     * @example
     * // Update or create a KnowledgeChunk
     * const knowledgeChunk = await prisma.knowledgeChunk.upsert({
     *   create: {
     *     // ... data to create a KnowledgeChunk
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KnowledgeChunk we want to update
     *   }
     * })
    **/
    upsert<T extends KnowledgeChunkUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, KnowledgeChunkUpsertArgs<ExtArgs>>
    ): Prisma__KnowledgeChunkClient<$Types.GetResult<KnowledgeChunkPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of KnowledgeChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeChunkCountArgs} args - Arguments to filter KnowledgeChunks to count.
     * @example
     * // Count the number of KnowledgeChunks
     * const count = await prisma.knowledgeChunk.count({
     *   where: {
     *     // ... the filter for the KnowledgeChunks we want to count
     *   }
     * })
    **/
    count<T extends KnowledgeChunkCountArgs>(
      args?: Subset<T, KnowledgeChunkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KnowledgeChunkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KnowledgeChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeChunkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KnowledgeChunkAggregateArgs>(args: Subset<T, KnowledgeChunkAggregateArgs>): Prisma.PrismaPromise<GetKnowledgeChunkAggregateType<T>>

    /**
     * Group by KnowledgeChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeChunkGroupByArgs} args - Group by arguments.
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
      T extends KnowledgeChunkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KnowledgeChunkGroupByArgs['orderBy'] }
        : { orderBy?: KnowledgeChunkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, KnowledgeChunkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKnowledgeChunkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for KnowledgeChunk.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__KnowledgeChunkClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    document<T extends KnowledgeDocumentArgs<ExtArgs> = {}>(args?: Subset<T, KnowledgeDocumentArgs<ExtArgs>>): Prisma__KnowledgeDocumentClient<$Types.GetResult<KnowledgeDocumentPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * KnowledgeChunk base type for findUnique actions
   */
  export type KnowledgeChunkFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeChunk
     */
    select?: KnowledgeChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: KnowledgeChunkInclude<ExtArgs> | null
    /**
     * Filter, which KnowledgeChunk to fetch.
     */
    where: KnowledgeChunkWhereUniqueInput
  }

  /**
   * KnowledgeChunk findUnique
   */
  export interface KnowledgeChunkFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends KnowledgeChunkFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * KnowledgeChunk findUniqueOrThrow
   */
  export type KnowledgeChunkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeChunk
     */
    select?: KnowledgeChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: KnowledgeChunkInclude<ExtArgs> | null
    /**
     * Filter, which KnowledgeChunk to fetch.
     */
    where: KnowledgeChunkWhereUniqueInput
  }


  /**
   * KnowledgeChunk base type for findFirst actions
   */
  export type KnowledgeChunkFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeChunk
     */
    select?: KnowledgeChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: KnowledgeChunkInclude<ExtArgs> | null
    /**
     * Filter, which KnowledgeChunk to fetch.
     */
    where?: KnowledgeChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeChunks to fetch.
     */
    orderBy?: Enumerable<KnowledgeChunkOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KnowledgeChunks.
     */
    cursor?: KnowledgeChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KnowledgeChunks.
     */
    distinct?: Enumerable<KnowledgeChunkScalarFieldEnum>
  }

  /**
   * KnowledgeChunk findFirst
   */
  export interface KnowledgeChunkFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends KnowledgeChunkFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * KnowledgeChunk findFirstOrThrow
   */
  export type KnowledgeChunkFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeChunk
     */
    select?: KnowledgeChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: KnowledgeChunkInclude<ExtArgs> | null
    /**
     * Filter, which KnowledgeChunk to fetch.
     */
    where?: KnowledgeChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeChunks to fetch.
     */
    orderBy?: Enumerable<KnowledgeChunkOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KnowledgeChunks.
     */
    cursor?: KnowledgeChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KnowledgeChunks.
     */
    distinct?: Enumerable<KnowledgeChunkScalarFieldEnum>
  }


  /**
   * KnowledgeChunk findMany
   */
  export type KnowledgeChunkFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeChunk
     */
    select?: KnowledgeChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: KnowledgeChunkInclude<ExtArgs> | null
    /**
     * Filter, which KnowledgeChunks to fetch.
     */
    where?: KnowledgeChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeChunks to fetch.
     */
    orderBy?: Enumerable<KnowledgeChunkOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KnowledgeChunks.
     */
    cursor?: KnowledgeChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeChunks.
     */
    skip?: number
    distinct?: Enumerable<KnowledgeChunkScalarFieldEnum>
  }


  /**
   * KnowledgeChunk create
   */
  export type KnowledgeChunkCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeChunk
     */
    select?: KnowledgeChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: KnowledgeChunkInclude<ExtArgs> | null
    /**
     * The data needed to create a KnowledgeChunk.
     */
    data: XOR<KnowledgeChunkCreateInput, KnowledgeChunkUncheckedCreateInput>
  }


  /**
   * KnowledgeChunk createMany
   */
  export type KnowledgeChunkCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KnowledgeChunks.
     */
    data: Enumerable<KnowledgeChunkCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * KnowledgeChunk update
   */
  export type KnowledgeChunkUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeChunk
     */
    select?: KnowledgeChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: KnowledgeChunkInclude<ExtArgs> | null
    /**
     * The data needed to update a KnowledgeChunk.
     */
    data: XOR<KnowledgeChunkUpdateInput, KnowledgeChunkUncheckedUpdateInput>
    /**
     * Choose, which KnowledgeChunk to update.
     */
    where: KnowledgeChunkWhereUniqueInput
  }


  /**
   * KnowledgeChunk updateMany
   */
  export type KnowledgeChunkUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KnowledgeChunks.
     */
    data: XOR<KnowledgeChunkUpdateManyMutationInput, KnowledgeChunkUncheckedUpdateManyInput>
    /**
     * Filter which KnowledgeChunks to update
     */
    where?: KnowledgeChunkWhereInput
  }


  /**
   * KnowledgeChunk upsert
   */
  export type KnowledgeChunkUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeChunk
     */
    select?: KnowledgeChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: KnowledgeChunkInclude<ExtArgs> | null
    /**
     * The filter to search for the KnowledgeChunk to update in case it exists.
     */
    where: KnowledgeChunkWhereUniqueInput
    /**
     * In case the KnowledgeChunk found by the `where` argument doesn't exist, create a new KnowledgeChunk with this data.
     */
    create: XOR<KnowledgeChunkCreateInput, KnowledgeChunkUncheckedCreateInput>
    /**
     * In case the KnowledgeChunk was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KnowledgeChunkUpdateInput, KnowledgeChunkUncheckedUpdateInput>
  }


  /**
   * KnowledgeChunk delete
   */
  export type KnowledgeChunkDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeChunk
     */
    select?: KnowledgeChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: KnowledgeChunkInclude<ExtArgs> | null
    /**
     * Filter which KnowledgeChunk to delete.
     */
    where: KnowledgeChunkWhereUniqueInput
  }


  /**
   * KnowledgeChunk deleteMany
   */
  export type KnowledgeChunkDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which KnowledgeChunks to delete
     */
    where?: KnowledgeChunkWhereInput
  }


  /**
   * KnowledgeChunk without action
   */
  export type KnowledgeChunkArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeChunk
     */
    select?: KnowledgeChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: KnowledgeChunkInclude<ExtArgs> | null
  }



  /**
   * Model Phrase
   */


  export type AggregatePhrase = {
    _count: PhraseCountAggregateOutputType | null
    _min: PhraseMinAggregateOutputType | null
    _max: PhraseMaxAggregateOutputType | null
  }

  export type PhraseMinAggregateOutputType = {
    id: string | null
    userId: string | null
    german: string | null
    english: string | null
    context: string | null
    category: string | null
    createdAt: Date | null
  }

  export type PhraseMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    german: string | null
    english: string | null
    context: string | null
    category: string | null
    createdAt: Date | null
  }

  export type PhraseCountAggregateOutputType = {
    id: number
    userId: number
    german: number
    english: number
    context: number
    category: number
    createdAt: number
    _all: number
  }


  export type PhraseMinAggregateInputType = {
    id?: true
    userId?: true
    german?: true
    english?: true
    context?: true
    category?: true
    createdAt?: true
  }

  export type PhraseMaxAggregateInputType = {
    id?: true
    userId?: true
    german?: true
    english?: true
    context?: true
    category?: true
    createdAt?: true
  }

  export type PhraseCountAggregateInputType = {
    id?: true
    userId?: true
    german?: true
    english?: true
    context?: true
    category?: true
    createdAt?: true
    _all?: true
  }

  export type PhraseAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Phrase to aggregate.
     */
    where?: PhraseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phrases to fetch.
     */
    orderBy?: Enumerable<PhraseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PhraseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phrases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phrases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Phrases
    **/
    _count?: true | PhraseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PhraseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PhraseMaxAggregateInputType
  }

  export type GetPhraseAggregateType<T extends PhraseAggregateArgs> = {
        [P in keyof T & keyof AggregatePhrase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePhrase[P]>
      : GetScalarType<T[P], AggregatePhrase[P]>
  }




  export type PhraseGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: PhraseWhereInput
    orderBy?: Enumerable<PhraseOrderByWithAggregationInput>
    by: PhraseScalarFieldEnum[]
    having?: PhraseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PhraseCountAggregateInputType | true
    _min?: PhraseMinAggregateInputType
    _max?: PhraseMaxAggregateInputType
  }


  export type PhraseGroupByOutputType = {
    id: string
    userId: string | null
    german: string
    english: string | null
    context: string | null
    category: string
    createdAt: Date
    _count: PhraseCountAggregateOutputType | null
    _min: PhraseMinAggregateOutputType | null
    _max: PhraseMaxAggregateOutputType | null
  }

  type GetPhraseGroupByPayload<T extends PhraseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<PhraseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PhraseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PhraseGroupByOutputType[P]>
            : GetScalarType<T[P], PhraseGroupByOutputType[P]>
        }
      >
    >


  export type PhraseSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    german?: boolean
    english?: boolean
    context?: boolean
    category?: boolean
    createdAt?: boolean
    user?: boolean | UserArgs<ExtArgs>
  }, ExtArgs["result"]["phrase"]>

  export type PhraseSelectScalar = {
    id?: boolean
    userId?: boolean
    german?: boolean
    english?: boolean
    context?: boolean
    category?: boolean
    createdAt?: boolean
  }

  export type PhraseInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | UserArgs<ExtArgs>
  }


  type PhraseGetPayload<S extends boolean | null | undefined | PhraseArgs> = $Types.GetResult<PhrasePayload, S>

  type PhraseCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<PhraseFindManyArgs, 'select' | 'include'> & {
      select?: PhraseCountAggregateInputType | true
    }

  export interface PhraseDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Phrase'], meta: { name: 'Phrase' } }
    /**
     * Find zero or one Phrase that matches the filter.
     * @param {PhraseFindUniqueArgs} args - Arguments to find a Phrase
     * @example
     * // Get one Phrase
     * const phrase = await prisma.phrase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PhraseFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PhraseFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Phrase'> extends True ? Prisma__PhraseClient<$Types.GetResult<PhrasePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__PhraseClient<$Types.GetResult<PhrasePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Phrase that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {PhraseFindUniqueOrThrowArgs} args - Arguments to find a Phrase
     * @example
     * // Get one Phrase
     * const phrase = await prisma.phrase.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PhraseFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, PhraseFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__PhraseClient<$Types.GetResult<PhrasePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Phrase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhraseFindFirstArgs} args - Arguments to find a Phrase
     * @example
     * // Get one Phrase
     * const phrase = await prisma.phrase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PhraseFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PhraseFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Phrase'> extends True ? Prisma__PhraseClient<$Types.GetResult<PhrasePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__PhraseClient<$Types.GetResult<PhrasePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Phrase that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhraseFindFirstOrThrowArgs} args - Arguments to find a Phrase
     * @example
     * // Get one Phrase
     * const phrase = await prisma.phrase.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PhraseFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, PhraseFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__PhraseClient<$Types.GetResult<PhrasePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Phrases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhraseFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Phrases
     * const phrases = await prisma.phrase.findMany()
     * 
     * // Get first 10 Phrases
     * const phrases = await prisma.phrase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const phraseWithIdOnly = await prisma.phrase.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PhraseFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PhraseFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<PhrasePayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Phrase.
     * @param {PhraseCreateArgs} args - Arguments to create a Phrase.
     * @example
     * // Create one Phrase
     * const Phrase = await prisma.phrase.create({
     *   data: {
     *     // ... data to create a Phrase
     *   }
     * })
     * 
    **/
    create<T extends PhraseCreateArgs<ExtArgs>>(
      args: SelectSubset<T, PhraseCreateArgs<ExtArgs>>
    ): Prisma__PhraseClient<$Types.GetResult<PhrasePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Phrases.
     *     @param {PhraseCreateManyArgs} args - Arguments to create many Phrases.
     *     @example
     *     // Create many Phrases
     *     const phrase = await prisma.phrase.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PhraseCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PhraseCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Phrase.
     * @param {PhraseDeleteArgs} args - Arguments to delete one Phrase.
     * @example
     * // Delete one Phrase
     * const Phrase = await prisma.phrase.delete({
     *   where: {
     *     // ... filter to delete one Phrase
     *   }
     * })
     * 
    **/
    delete<T extends PhraseDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, PhraseDeleteArgs<ExtArgs>>
    ): Prisma__PhraseClient<$Types.GetResult<PhrasePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Phrase.
     * @param {PhraseUpdateArgs} args - Arguments to update one Phrase.
     * @example
     * // Update one Phrase
     * const phrase = await prisma.phrase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PhraseUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, PhraseUpdateArgs<ExtArgs>>
    ): Prisma__PhraseClient<$Types.GetResult<PhrasePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Phrases.
     * @param {PhraseDeleteManyArgs} args - Arguments to filter Phrases to delete.
     * @example
     * // Delete a few Phrases
     * const { count } = await prisma.phrase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PhraseDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PhraseDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Phrases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhraseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Phrases
     * const phrase = await prisma.phrase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PhraseUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, PhraseUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Phrase.
     * @param {PhraseUpsertArgs} args - Arguments to update or create a Phrase.
     * @example
     * // Update or create a Phrase
     * const phrase = await prisma.phrase.upsert({
     *   create: {
     *     // ... data to create a Phrase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Phrase we want to update
     *   }
     * })
    **/
    upsert<T extends PhraseUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, PhraseUpsertArgs<ExtArgs>>
    ): Prisma__PhraseClient<$Types.GetResult<PhrasePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Phrases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhraseCountArgs} args - Arguments to filter Phrases to count.
     * @example
     * // Count the number of Phrases
     * const count = await prisma.phrase.count({
     *   where: {
     *     // ... the filter for the Phrases we want to count
     *   }
     * })
    **/
    count<T extends PhraseCountArgs>(
      args?: Subset<T, PhraseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PhraseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Phrase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhraseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PhraseAggregateArgs>(args: Subset<T, PhraseAggregateArgs>): Prisma.PrismaPromise<GetPhraseAggregateType<T>>

    /**
     * Group by Phrase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhraseGroupByArgs} args - Group by arguments.
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
      T extends PhraseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PhraseGroupByArgs['orderBy'] }
        : { orderBy?: PhraseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, PhraseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPhraseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Phrase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PhraseClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Phrase base type for findUnique actions
   */
  export type PhraseFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PhraseInclude<ExtArgs> | null
    /**
     * Filter, which Phrase to fetch.
     */
    where: PhraseWhereUniqueInput
  }

  /**
   * Phrase findUnique
   */
  export interface PhraseFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends PhraseFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Phrase findUniqueOrThrow
   */
  export type PhraseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PhraseInclude<ExtArgs> | null
    /**
     * Filter, which Phrase to fetch.
     */
    where: PhraseWhereUniqueInput
  }


  /**
   * Phrase base type for findFirst actions
   */
  export type PhraseFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PhraseInclude<ExtArgs> | null
    /**
     * Filter, which Phrase to fetch.
     */
    where?: PhraseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phrases to fetch.
     */
    orderBy?: Enumerable<PhraseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Phrases.
     */
    cursor?: PhraseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phrases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phrases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Phrases.
     */
    distinct?: Enumerable<PhraseScalarFieldEnum>
  }

  /**
   * Phrase findFirst
   */
  export interface PhraseFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends PhraseFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Phrase findFirstOrThrow
   */
  export type PhraseFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PhraseInclude<ExtArgs> | null
    /**
     * Filter, which Phrase to fetch.
     */
    where?: PhraseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phrases to fetch.
     */
    orderBy?: Enumerable<PhraseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Phrases.
     */
    cursor?: PhraseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phrases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phrases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Phrases.
     */
    distinct?: Enumerable<PhraseScalarFieldEnum>
  }


  /**
   * Phrase findMany
   */
  export type PhraseFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PhraseInclude<ExtArgs> | null
    /**
     * Filter, which Phrases to fetch.
     */
    where?: PhraseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phrases to fetch.
     */
    orderBy?: Enumerable<PhraseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Phrases.
     */
    cursor?: PhraseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phrases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phrases.
     */
    skip?: number
    distinct?: Enumerable<PhraseScalarFieldEnum>
  }


  /**
   * Phrase create
   */
  export type PhraseCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PhraseInclude<ExtArgs> | null
    /**
     * The data needed to create a Phrase.
     */
    data: XOR<PhraseCreateInput, PhraseUncheckedCreateInput>
  }


  /**
   * Phrase createMany
   */
  export type PhraseCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Phrases.
     */
    data: Enumerable<PhraseCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Phrase update
   */
  export type PhraseUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PhraseInclude<ExtArgs> | null
    /**
     * The data needed to update a Phrase.
     */
    data: XOR<PhraseUpdateInput, PhraseUncheckedUpdateInput>
    /**
     * Choose, which Phrase to update.
     */
    where: PhraseWhereUniqueInput
  }


  /**
   * Phrase updateMany
   */
  export type PhraseUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Phrases.
     */
    data: XOR<PhraseUpdateManyMutationInput, PhraseUncheckedUpdateManyInput>
    /**
     * Filter which Phrases to update
     */
    where?: PhraseWhereInput
  }


  /**
   * Phrase upsert
   */
  export type PhraseUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PhraseInclude<ExtArgs> | null
    /**
     * The filter to search for the Phrase to update in case it exists.
     */
    where: PhraseWhereUniqueInput
    /**
     * In case the Phrase found by the `where` argument doesn't exist, create a new Phrase with this data.
     */
    create: XOR<PhraseCreateInput, PhraseUncheckedCreateInput>
    /**
     * In case the Phrase was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PhraseUpdateInput, PhraseUncheckedUpdateInput>
  }


  /**
   * Phrase delete
   */
  export type PhraseDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PhraseInclude<ExtArgs> | null
    /**
     * Filter which Phrase to delete.
     */
    where: PhraseWhereUniqueInput
  }


  /**
   * Phrase deleteMany
   */
  export type PhraseDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Phrases to delete
     */
    where?: PhraseWhereInput
  }


  /**
   * Phrase without action
   */
  export type PhraseArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PhraseInclude<ExtArgs> | null
  }



  /**
   * Model Category
   */


  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    phraseCount: number | null
  }

  export type CategorySumAggregateOutputType = {
    phraseCount: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    phraseCount: number | null
    createdAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    phraseCount: number | null
    createdAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    phraseCount: number
    createdAt: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    phraseCount?: true
  }

  export type CategorySumAggregateInputType = {
    phraseCount?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    phraseCount?: true
    createdAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    phraseCount?: true
    createdAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    phraseCount?: true
    createdAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: Enumerable<CategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: Enumerable<CategoryOrderByWithAggregationInput>
    by: CategoryScalarFieldEnum[]
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }


  export type CategoryGroupByOutputType = {
    id: string
    name: string
    slug: string
    phraseCount: number
    createdAt: Date
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    phraseCount?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    phraseCount?: boolean
    createdAt?: boolean
  }


  type CategoryGetPayload<S extends boolean | null | undefined | CategoryArgs> = $Types.GetResult<CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<CategoryFindManyArgs, 'select' | 'include'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CategoryFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Category'> extends True ? Prisma__CategoryClient<$Types.GetResult<CategoryPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__CategoryClient<$Types.GetResult<CategoryPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Category that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Types.GetResult<CategoryPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CategoryFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Category'> extends True ? Prisma__CategoryClient<$Types.GetResult<CategoryPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__CategoryClient<$Types.GetResult<CategoryPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Category that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Types.GetResult<CategoryPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CategoryFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<CategoryPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
    **/
    create<T extends CategoryCreateArgs<ExtArgs>>(
      args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Types.GetResult<CategoryPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Categories.
     *     @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     *     @example
     *     // Create many Categories
     *     const category = await prisma.category.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CategoryCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
    **/
    delete<T extends CategoryDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Types.GetResult<CategoryPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CategoryUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Types.GetResult<CategoryPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CategoryDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CategoryUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
    **/
    upsert<T extends CategoryUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Types.GetResult<CategoryPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
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
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Category base type for findUnique actions
   */
  export type CategoryFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUnique
   */
  export interface CategoryFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends CategoryFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }


  /**
   * Category base type for findFirst actions
   */
  export type CategoryFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: Enumerable<CategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: Enumerable<CategoryScalarFieldEnum>
  }

  /**
   * Category findFirst
   */
  export interface CategoryFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends CategoryFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: Enumerable<CategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: Enumerable<CategoryScalarFieldEnum>
  }


  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: Enumerable<CategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: Enumerable<CategoryScalarFieldEnum>
  }


  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }


  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: Enumerable<CategoryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }


  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
  }


  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }


  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }


  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
  }


  /**
   * Category without action
   */
  export type CategoryArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
  }



  /**
   * Model Progress
   */


  export type AggregateProgress = {
    _count: ProgressCountAggregateOutputType | null
    _avg: ProgressAvgAggregateOutputType | null
    _sum: ProgressSumAggregateOutputType | null
    _min: ProgressMinAggregateOutputType | null
    _max: ProgressMaxAggregateOutputType | null
  }

  export type ProgressAvgAggregateOutputType = {
    practiceTime: number | null
    wordsMastered: number | null
    conversationCount: number | null
  }

  export type ProgressSumAggregateOutputType = {
    practiceTime: number | null
    wordsMastered: number | null
    conversationCount: number | null
  }

  export type ProgressMinAggregateOutputType = {
    id: string | null
    userId: string | null
    practiceTime: number | null
    wordsMastered: number | null
    conversationCount: number | null
    lastPracticeAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProgressMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    practiceTime: number | null
    wordsMastered: number | null
    conversationCount: number | null
    lastPracticeAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProgressCountAggregateOutputType = {
    id: number
    userId: number
    practiceTime: number
    wordsMastered: number
    conversationCount: number
    lastPracticeAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProgressAvgAggregateInputType = {
    practiceTime?: true
    wordsMastered?: true
    conversationCount?: true
  }

  export type ProgressSumAggregateInputType = {
    practiceTime?: true
    wordsMastered?: true
    conversationCount?: true
  }

  export type ProgressMinAggregateInputType = {
    id?: true
    userId?: true
    practiceTime?: true
    wordsMastered?: true
    conversationCount?: true
    lastPracticeAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProgressMaxAggregateInputType = {
    id?: true
    userId?: true
    practiceTime?: true
    wordsMastered?: true
    conversationCount?: true
    lastPracticeAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProgressCountAggregateInputType = {
    id?: true
    userId?: true
    practiceTime?: true
    wordsMastered?: true
    conversationCount?: true
    lastPracticeAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProgressAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Progress to aggregate.
     */
    where?: ProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Progresses to fetch.
     */
    orderBy?: Enumerable<ProgressOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Progresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Progresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Progresses
    **/
    _count?: true | ProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgressMaxAggregateInputType
  }

  export type GetProgressAggregateType<T extends ProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgress[P]>
      : GetScalarType<T[P], AggregateProgress[P]>
  }




  export type ProgressGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ProgressWhereInput
    orderBy?: Enumerable<ProgressOrderByWithAggregationInput>
    by: ProgressScalarFieldEnum[]
    having?: ProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgressCountAggregateInputType | true
    _avg?: ProgressAvgAggregateInputType
    _sum?: ProgressSumAggregateInputType
    _min?: ProgressMinAggregateInputType
    _max?: ProgressMaxAggregateInputType
  }


  export type ProgressGroupByOutputType = {
    id: string
    userId: string
    practiceTime: number
    wordsMastered: number
    conversationCount: number
    lastPracticeAt: Date
    createdAt: Date
    updatedAt: Date
    _count: ProgressCountAggregateOutputType | null
    _avg: ProgressAvgAggregateOutputType | null
    _sum: ProgressSumAggregateOutputType | null
    _min: ProgressMinAggregateOutputType | null
    _max: ProgressMaxAggregateOutputType | null
  }

  type GetProgressGroupByPayload<T extends ProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgressGroupByOutputType[P]>
            : GetScalarType<T[P], ProgressGroupByOutputType[P]>
        }
      >
    >


  export type ProgressSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    practiceTime?: boolean
    wordsMastered?: boolean
    conversationCount?: boolean
    lastPracticeAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserArgs<ExtArgs>
  }, ExtArgs["result"]["progress"]>

  export type ProgressSelectScalar = {
    id?: boolean
    userId?: boolean
    practiceTime?: boolean
    wordsMastered?: boolean
    conversationCount?: boolean
    lastPracticeAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProgressInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | UserArgs<ExtArgs>
  }


  type ProgressGetPayload<S extends boolean | null | undefined | ProgressArgs> = $Types.GetResult<ProgressPayload, S>

  type ProgressCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<ProgressFindManyArgs, 'select' | 'include'> & {
      select?: ProgressCountAggregateInputType | true
    }

  export interface ProgressDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Progress'], meta: { name: 'Progress' } }
    /**
     * Find zero or one Progress that matches the filter.
     * @param {ProgressFindUniqueArgs} args - Arguments to find a Progress
     * @example
     * // Get one Progress
     * const progress = await prisma.progress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProgressFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProgressFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Progress'> extends True ? Prisma__ProgressClient<$Types.GetResult<ProgressPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__ProgressClient<$Types.GetResult<ProgressPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Progress that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ProgressFindUniqueOrThrowArgs} args - Arguments to find a Progress
     * @example
     * // Get one Progress
     * const progress = await prisma.progress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ProgressFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ProgressFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ProgressClient<$Types.GetResult<ProgressPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Progress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressFindFirstArgs} args - Arguments to find a Progress
     * @example
     * // Get one Progress
     * const progress = await prisma.progress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProgressFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProgressFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Progress'> extends True ? Prisma__ProgressClient<$Types.GetResult<ProgressPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__ProgressClient<$Types.GetResult<ProgressPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Progress that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressFindFirstOrThrowArgs} args - Arguments to find a Progress
     * @example
     * // Get one Progress
     * const progress = await prisma.progress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ProgressFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ProgressFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ProgressClient<$Types.GetResult<ProgressPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Progresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Progresses
     * const progresses = await prisma.progress.findMany()
     * 
     * // Get first 10 Progresses
     * const progresses = await prisma.progress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const progressWithIdOnly = await prisma.progress.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProgressFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ProgressFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<ProgressPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Progress.
     * @param {ProgressCreateArgs} args - Arguments to create a Progress.
     * @example
     * // Create one Progress
     * const Progress = await prisma.progress.create({
     *   data: {
     *     // ... data to create a Progress
     *   }
     * })
     * 
    **/
    create<T extends ProgressCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ProgressCreateArgs<ExtArgs>>
    ): Prisma__ProgressClient<$Types.GetResult<ProgressPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Progresses.
     *     @param {ProgressCreateManyArgs} args - Arguments to create many Progresses.
     *     @example
     *     // Create many Progresses
     *     const progress = await prisma.progress.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProgressCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ProgressCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Progress.
     * @param {ProgressDeleteArgs} args - Arguments to delete one Progress.
     * @example
     * // Delete one Progress
     * const Progress = await prisma.progress.delete({
     *   where: {
     *     // ... filter to delete one Progress
     *   }
     * })
     * 
    **/
    delete<T extends ProgressDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ProgressDeleteArgs<ExtArgs>>
    ): Prisma__ProgressClient<$Types.GetResult<ProgressPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Progress.
     * @param {ProgressUpdateArgs} args - Arguments to update one Progress.
     * @example
     * // Update one Progress
     * const progress = await prisma.progress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProgressUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ProgressUpdateArgs<ExtArgs>>
    ): Prisma__ProgressClient<$Types.GetResult<ProgressPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Progresses.
     * @param {ProgressDeleteManyArgs} args - Arguments to filter Progresses to delete.
     * @example
     * // Delete a few Progresses
     * const { count } = await prisma.progress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProgressDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ProgressDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Progresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Progresses
     * const progress = await prisma.progress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProgressUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ProgressUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Progress.
     * @param {ProgressUpsertArgs} args - Arguments to update or create a Progress.
     * @example
     * // Update or create a Progress
     * const progress = await prisma.progress.upsert({
     *   create: {
     *     // ... data to create a Progress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Progress we want to update
     *   }
     * })
    **/
    upsert<T extends ProgressUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ProgressUpsertArgs<ExtArgs>>
    ): Prisma__ProgressClient<$Types.GetResult<ProgressPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Progresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressCountArgs} args - Arguments to filter Progresses to count.
     * @example
     * // Count the number of Progresses
     * const count = await prisma.progress.count({
     *   where: {
     *     // ... the filter for the Progresses we want to count
     *   }
     * })
    **/
    count<T extends ProgressCountArgs>(
      args?: Subset<T, ProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Progress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProgressAggregateArgs>(args: Subset<T, ProgressAggregateArgs>): Prisma.PrismaPromise<GetProgressAggregateType<T>>

    /**
     * Group by Progress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressGroupByArgs} args - Group by arguments.
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
      T extends ProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgressGroupByArgs['orderBy'] }
        : { orderBy?: ProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Progress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProgressClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Progress base type for findUnique actions
   */
  export type ProgressFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * Filter, which Progress to fetch.
     */
    where: ProgressWhereUniqueInput
  }

  /**
   * Progress findUnique
   */
  export interface ProgressFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends ProgressFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Progress findUniqueOrThrow
   */
  export type ProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * Filter, which Progress to fetch.
     */
    where: ProgressWhereUniqueInput
  }


  /**
   * Progress base type for findFirst actions
   */
  export type ProgressFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * Filter, which Progress to fetch.
     */
    where?: ProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Progresses to fetch.
     */
    orderBy?: Enumerable<ProgressOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Progresses.
     */
    cursor?: ProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Progresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Progresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Progresses.
     */
    distinct?: Enumerable<ProgressScalarFieldEnum>
  }

  /**
   * Progress findFirst
   */
  export interface ProgressFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends ProgressFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Progress findFirstOrThrow
   */
  export type ProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * Filter, which Progress to fetch.
     */
    where?: ProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Progresses to fetch.
     */
    orderBy?: Enumerable<ProgressOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Progresses.
     */
    cursor?: ProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Progresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Progresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Progresses.
     */
    distinct?: Enumerable<ProgressScalarFieldEnum>
  }


  /**
   * Progress findMany
   */
  export type ProgressFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * Filter, which Progresses to fetch.
     */
    where?: ProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Progresses to fetch.
     */
    orderBy?: Enumerable<ProgressOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Progresses.
     */
    cursor?: ProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Progresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Progresses.
     */
    skip?: number
    distinct?: Enumerable<ProgressScalarFieldEnum>
  }


  /**
   * Progress create
   */
  export type ProgressCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a Progress.
     */
    data: XOR<ProgressCreateInput, ProgressUncheckedCreateInput>
  }


  /**
   * Progress createMany
   */
  export type ProgressCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Progresses.
     */
    data: Enumerable<ProgressCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Progress update
   */
  export type ProgressUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a Progress.
     */
    data: XOR<ProgressUpdateInput, ProgressUncheckedUpdateInput>
    /**
     * Choose, which Progress to update.
     */
    where: ProgressWhereUniqueInput
  }


  /**
   * Progress updateMany
   */
  export type ProgressUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Progresses.
     */
    data: XOR<ProgressUpdateManyMutationInput, ProgressUncheckedUpdateManyInput>
    /**
     * Filter which Progresses to update
     */
    where?: ProgressWhereInput
  }


  /**
   * Progress upsert
   */
  export type ProgressUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the Progress to update in case it exists.
     */
    where: ProgressWhereUniqueInput
    /**
     * In case the Progress found by the `where` argument doesn't exist, create a new Progress with this data.
     */
    create: XOR<ProgressCreateInput, ProgressUncheckedCreateInput>
    /**
     * In case the Progress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProgressUpdateInput, ProgressUncheckedUpdateInput>
  }


  /**
   * Progress delete
   */
  export type ProgressDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * Filter which Progress to delete.
     */
    where: ProgressWhereUniqueInput
  }


  /**
   * Progress deleteMany
   */
  export type ProgressDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Progresses to delete
     */
    where?: ProgressWhereInput
  }


  /**
   * Progress without action
   */
  export type ProgressArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProgressInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    clerkId: 'clerkId',
    email: 'email',
    name: 'name',
    level: 'level',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ConversationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    sessionId: 'sessionId',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    topic: 'topic'
  };

  export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    conversationId: 'conversationId',
    role: 'role',
    content: 'content',
    transcription: 'transcription',
    timestamp: 'timestamp'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const KnowledgeDocumentScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    category: 'category',
    language: 'language',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type KnowledgeDocumentScalarFieldEnum = (typeof KnowledgeDocumentScalarFieldEnum)[keyof typeof KnowledgeDocumentScalarFieldEnum]


  export const KnowledgeChunkScalarFieldEnum: {
    id: 'id',
    documentId: 'documentId',
    content: 'content',
    chunkIndex: 'chunkIndex'
  };

  export type KnowledgeChunkScalarFieldEnum = (typeof KnowledgeChunkScalarFieldEnum)[keyof typeof KnowledgeChunkScalarFieldEnum]


  export const PhraseScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    german: 'german',
    english: 'english',
    context: 'context',
    category: 'category',
    createdAt: 'createdAt'
  };

  export type PhraseScalarFieldEnum = (typeof PhraseScalarFieldEnum)[keyof typeof PhraseScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    phraseCount: 'phraseCount',
    createdAt: 'createdAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const ProgressScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    practiceTime: 'practiceTime',
    wordsMastered: 'wordsMastered',
    conversationCount: 'conversationCount',
    lastPracticeAt: 'lastPracticeAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProgressScalarFieldEnum = (typeof ProgressScalarFieldEnum)[keyof typeof ProgressScalarFieldEnum]


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
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    clerkId?: StringFilter | string
    email?: StringNullableFilter | string | null
    name?: StringNullableFilter | string | null
    level?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    conversations?: ConversationListRelationFilter
    phrases?: PhraseListRelationFilter
    progress?: ProgressListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    level?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    conversations?: ConversationOrderByRelationAggregateInput
    phrases?: PhraseOrderByRelationAggregateInput
    progress?: ProgressOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: string
    clerkId?: string
    email?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    level?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    clerkId?: StringWithAggregatesFilter | string
    email?: StringNullableWithAggregatesFilter | string | null
    name?: StringNullableWithAggregatesFilter | string | null
    level?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ConversationWhereInput = {
    AND?: Enumerable<ConversationWhereInput>
    OR?: Enumerable<ConversationWhereInput>
    NOT?: Enumerable<ConversationWhereInput>
    id?: StringFilter | string
    userId?: StringNullableFilter | string | null
    sessionId?: StringFilter | string
    startedAt?: DateTimeFilter | Date | string
    endedAt?: DateTimeNullableFilter | Date | string | null
    topic?: StringNullableFilter | string | null
    user?: XOR<UserRelationFilter, UserWhereInput> | null
    messages?: MessageListRelationFilter
  }

  export type ConversationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    sessionId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    topic?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    messages?: MessageOrderByRelationAggregateInput
  }

  export type ConversationWhereUniqueInput = {
    id?: string
    sessionId?: string
  }

  export type ConversationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    sessionId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    topic?: SortOrderInput | SortOrder
    _count?: ConversationCountOrderByAggregateInput
    _max?: ConversationMaxOrderByAggregateInput
    _min?: ConversationMinOrderByAggregateInput
  }

  export type ConversationScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ConversationScalarWhereWithAggregatesInput>
    OR?: Enumerable<ConversationScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ConversationScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    userId?: StringNullableWithAggregatesFilter | string | null
    sessionId?: StringWithAggregatesFilter | string
    startedAt?: DateTimeWithAggregatesFilter | Date | string
    endedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    topic?: StringNullableWithAggregatesFilter | string | null
  }

  export type MessageWhereInput = {
    AND?: Enumerable<MessageWhereInput>
    OR?: Enumerable<MessageWhereInput>
    NOT?: Enumerable<MessageWhereInput>
    id?: StringFilter | string
    conversationId?: StringFilter | string
    role?: StringFilter | string
    content?: StringFilter | string
    transcription?: StringNullableFilter | string | null
    timestamp?: DateTimeFilter | Date | string
    conversation?: XOR<ConversationRelationFilter, ConversationWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    transcription?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    conversation?: ConversationOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = {
    id?: string
  }

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    transcription?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: Enumerable<MessageScalarWhereWithAggregatesInput>
    OR?: Enumerable<MessageScalarWhereWithAggregatesInput>
    NOT?: Enumerable<MessageScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    conversationId?: StringWithAggregatesFilter | string
    role?: StringWithAggregatesFilter | string
    content?: StringWithAggregatesFilter | string
    transcription?: StringNullableWithAggregatesFilter | string | null
    timestamp?: DateTimeWithAggregatesFilter | Date | string
  }

  export type KnowledgeDocumentWhereInput = {
    AND?: Enumerable<KnowledgeDocumentWhereInput>
    OR?: Enumerable<KnowledgeDocumentWhereInput>
    NOT?: Enumerable<KnowledgeDocumentWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    content?: StringFilter | string
    category?: StringFilter | string
    language?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    chunks?: KnowledgeChunkListRelationFilter
  }

  export type KnowledgeDocumentOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    chunks?: KnowledgeChunkOrderByRelationAggregateInput
  }

  export type KnowledgeDocumentWhereUniqueInput = {
    id?: string
  }

  export type KnowledgeDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: KnowledgeDocumentCountOrderByAggregateInput
    _max?: KnowledgeDocumentMaxOrderByAggregateInput
    _min?: KnowledgeDocumentMinOrderByAggregateInput
  }

  export type KnowledgeDocumentScalarWhereWithAggregatesInput = {
    AND?: Enumerable<KnowledgeDocumentScalarWhereWithAggregatesInput>
    OR?: Enumerable<KnowledgeDocumentScalarWhereWithAggregatesInput>
    NOT?: Enumerable<KnowledgeDocumentScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    content?: StringWithAggregatesFilter | string
    category?: StringWithAggregatesFilter | string
    language?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type KnowledgeChunkWhereInput = {
    AND?: Enumerable<KnowledgeChunkWhereInput>
    OR?: Enumerable<KnowledgeChunkWhereInput>
    NOT?: Enumerable<KnowledgeChunkWhereInput>
    id?: StringFilter | string
    documentId?: StringFilter | string
    content?: StringFilter | string
    chunkIndex?: IntFilter | number
    document?: XOR<KnowledgeDocumentRelationFilter, KnowledgeDocumentWhereInput>
  }

  export type KnowledgeChunkOrderByWithRelationInput = {
    id?: SortOrder
    documentId?: SortOrder
    content?: SortOrder
    chunkIndex?: SortOrder
    document?: KnowledgeDocumentOrderByWithRelationInput
  }

  export type KnowledgeChunkWhereUniqueInput = {
    id?: string
  }

  export type KnowledgeChunkOrderByWithAggregationInput = {
    id?: SortOrder
    documentId?: SortOrder
    content?: SortOrder
    chunkIndex?: SortOrder
    _count?: KnowledgeChunkCountOrderByAggregateInput
    _avg?: KnowledgeChunkAvgOrderByAggregateInput
    _max?: KnowledgeChunkMaxOrderByAggregateInput
    _min?: KnowledgeChunkMinOrderByAggregateInput
    _sum?: KnowledgeChunkSumOrderByAggregateInput
  }

  export type KnowledgeChunkScalarWhereWithAggregatesInput = {
    AND?: Enumerable<KnowledgeChunkScalarWhereWithAggregatesInput>
    OR?: Enumerable<KnowledgeChunkScalarWhereWithAggregatesInput>
    NOT?: Enumerable<KnowledgeChunkScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    documentId?: StringWithAggregatesFilter | string
    content?: StringWithAggregatesFilter | string
    chunkIndex?: IntWithAggregatesFilter | number
  }

  export type PhraseWhereInput = {
    AND?: Enumerable<PhraseWhereInput>
    OR?: Enumerable<PhraseWhereInput>
    NOT?: Enumerable<PhraseWhereInput>
    id?: StringFilter | string
    userId?: StringNullableFilter | string | null
    german?: StringFilter | string
    english?: StringNullableFilter | string | null
    context?: StringNullableFilter | string | null
    category?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput> | null
  }

  export type PhraseOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    german?: SortOrder
    english?: SortOrderInput | SortOrder
    context?: SortOrderInput | SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PhraseWhereUniqueInput = {
    id?: string
  }

  export type PhraseOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    german?: SortOrder
    english?: SortOrderInput | SortOrder
    context?: SortOrderInput | SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    _count?: PhraseCountOrderByAggregateInput
    _max?: PhraseMaxOrderByAggregateInput
    _min?: PhraseMinOrderByAggregateInput
  }

  export type PhraseScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PhraseScalarWhereWithAggregatesInput>
    OR?: Enumerable<PhraseScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PhraseScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    userId?: StringNullableWithAggregatesFilter | string | null
    german?: StringWithAggregatesFilter | string
    english?: StringNullableWithAggregatesFilter | string | null
    context?: StringNullableWithAggregatesFilter | string | null
    category?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type CategoryWhereInput = {
    AND?: Enumerable<CategoryWhereInput>
    OR?: Enumerable<CategoryWhereInput>
    NOT?: Enumerable<CategoryWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    slug?: StringFilter | string
    phraseCount?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    phraseCount?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryWhereUniqueInput = {
    id?: string
    name?: string
    slug?: string
  }

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    phraseCount?: SortOrder
    createdAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CategoryScalarWhereWithAggregatesInput>
    OR?: Enumerable<CategoryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CategoryScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    slug?: StringWithAggregatesFilter | string
    phraseCount?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ProgressWhereInput = {
    AND?: Enumerable<ProgressWhereInput>
    OR?: Enumerable<ProgressWhereInput>
    NOT?: Enumerable<ProgressWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    practiceTime?: IntFilter | number
    wordsMastered?: IntFilter | number
    conversationCount?: IntFilter | number
    lastPracticeAt?: DateTimeFilter | Date | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ProgressOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    practiceTime?: SortOrder
    wordsMastered?: SortOrder
    conversationCount?: SortOrder
    lastPracticeAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ProgressWhereUniqueInput = {
    id?: string
    userId?: string
  }

  export type ProgressOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    practiceTime?: SortOrder
    wordsMastered?: SortOrder
    conversationCount?: SortOrder
    lastPracticeAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProgressCountOrderByAggregateInput
    _avg?: ProgressAvgOrderByAggregateInput
    _max?: ProgressMaxOrderByAggregateInput
    _min?: ProgressMinOrderByAggregateInput
    _sum?: ProgressSumOrderByAggregateInput
  }

  export type ProgressScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProgressScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProgressScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProgressScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    practiceTime?: IntWithAggregatesFilter | number
    wordsMastered?: IntWithAggregatesFilter | number
    conversationCount?: IntWithAggregatesFilter | number
    lastPracticeAt?: DateTimeWithAggregatesFilter | Date | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type UserCreateInput = {
    id?: string
    clerkId: string
    email?: string | null
    name?: string | null
    level?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationCreateNestedManyWithoutUserInput
    phrases?: PhraseCreateNestedManyWithoutUserInput
    progress?: ProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    clerkId: string
    email?: string | null
    name?: string | null
    level?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
    phrases?: PhraseUncheckedCreateNestedManyWithoutUserInput
    progress?: ProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    level?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUpdateManyWithoutUserNestedInput
    phrases?: PhraseUpdateManyWithoutUserNestedInput
    progress?: ProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    level?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
    phrases?: PhraseUncheckedUpdateManyWithoutUserNestedInput
    progress?: ProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    clerkId: string
    email?: string | null
    name?: string | null
    level?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    level?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    level?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateInput = {
    id?: string
    sessionId: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    topic?: string | null
    user?: UserCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateInput = {
    id?: string
    userId?: string | null
    sessionId: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    topic?: string | null
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationCreateManyInput = {
    id?: string
    userId?: string | null
    sessionId: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    topic?: string | null
  }

  export type ConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MessageCreateInput = {
    id?: string
    role: string
    content: string
    transcription?: string | null
    timestamp?: Date | string
    conversation: ConversationCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    conversationId: string
    role: string
    content: string
    transcription?: string | null
    timestamp?: Date | string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    transcription?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    transcription?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: string
    conversationId: string
    role: string
    content: string
    transcription?: string | null
    timestamp?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    transcription?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    transcription?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeDocumentCreateInput = {
    id?: string
    title: string
    content: string
    category: string
    language?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    chunks?: KnowledgeChunkCreateNestedManyWithoutDocumentInput
  }

  export type KnowledgeDocumentUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    category: string
    language?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    chunks?: KnowledgeChunkUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type KnowledgeDocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunks?: KnowledgeChunkUpdateManyWithoutDocumentNestedInput
  }

  export type KnowledgeDocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunks?: KnowledgeChunkUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type KnowledgeDocumentCreateManyInput = {
    id?: string
    title: string
    content: string
    category: string
    language?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KnowledgeDocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeDocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeChunkCreateInput = {
    id?: string
    content: string
    chunkIndex: number
    document: KnowledgeDocumentCreateNestedOneWithoutChunksInput
  }

  export type KnowledgeChunkUncheckedCreateInput = {
    id?: string
    documentId: string
    content: string
    chunkIndex: number
  }

  export type KnowledgeChunkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    chunkIndex?: IntFieldUpdateOperationsInput | number
    document?: KnowledgeDocumentUpdateOneRequiredWithoutChunksNestedInput
  }

  export type KnowledgeChunkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    chunkIndex?: IntFieldUpdateOperationsInput | number
  }

  export type KnowledgeChunkCreateManyInput = {
    id?: string
    documentId: string
    content: string
    chunkIndex: number
  }

  export type KnowledgeChunkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    chunkIndex?: IntFieldUpdateOperationsInput | number
  }

  export type KnowledgeChunkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    chunkIndex?: IntFieldUpdateOperationsInput | number
  }

  export type PhraseCreateInput = {
    id?: string
    german: string
    english?: string | null
    context?: string | null
    category: string
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutPhrasesInput
  }

  export type PhraseUncheckedCreateInput = {
    id?: string
    userId?: string | null
    german: string
    english?: string | null
    context?: string | null
    category: string
    createdAt?: Date | string
  }

  export type PhraseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    german?: StringFieldUpdateOperationsInput | string
    english?: NullableStringFieldUpdateOperationsInput | string | null
    context?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutPhrasesNestedInput
  }

  export type PhraseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    german?: StringFieldUpdateOperationsInput | string
    english?: NullableStringFieldUpdateOperationsInput | string | null
    context?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhraseCreateManyInput = {
    id?: string
    userId?: string | null
    german: string
    english?: string | null
    context?: string | null
    category: string
    createdAt?: Date | string
  }

  export type PhraseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    german?: StringFieldUpdateOperationsInput | string
    english?: NullableStringFieldUpdateOperationsInput | string | null
    context?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhraseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    german?: StringFieldUpdateOperationsInput | string
    english?: NullableStringFieldUpdateOperationsInput | string | null
    context?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    slug: string
    phraseCount?: number
    createdAt?: Date | string
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    phraseCount?: number
    createdAt?: Date | string
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    phraseCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    phraseCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    slug: string
    phraseCount?: number
    createdAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    phraseCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    phraseCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgressCreateInput = {
    id?: string
    practiceTime?: number
    wordsMastered?: number
    conversationCount?: number
    lastPracticeAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProgressInput
  }

  export type ProgressUncheckedCreateInput = {
    id?: string
    userId: string
    practiceTime?: number
    wordsMastered?: number
    conversationCount?: number
    lastPracticeAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    practiceTime?: IntFieldUpdateOperationsInput | number
    wordsMastered?: IntFieldUpdateOperationsInput | number
    conversationCount?: IntFieldUpdateOperationsInput | number
    lastPracticeAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProgressNestedInput
  }

  export type ProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    practiceTime?: IntFieldUpdateOperationsInput | number
    wordsMastered?: IntFieldUpdateOperationsInput | number
    conversationCount?: IntFieldUpdateOperationsInput | number
    lastPracticeAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgressCreateManyInput = {
    id?: string
    userId: string
    practiceTime?: number
    wordsMastered?: number
    conversationCount?: number
    lastPracticeAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    practiceTime?: IntFieldUpdateOperationsInput | number
    wordsMastered?: IntFieldUpdateOperationsInput | number
    conversationCount?: IntFieldUpdateOperationsInput | number
    lastPracticeAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    practiceTime?: IntFieldUpdateOperationsInput | number
    wordsMastered?: IntFieldUpdateOperationsInput | number
    conversationCount?: IntFieldUpdateOperationsInput | number
    lastPracticeAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type ConversationListRelationFilter = {
    every?: ConversationWhereInput
    some?: ConversationWhereInput
    none?: ConversationWhereInput
  }

  export type PhraseListRelationFilter = {
    every?: PhraseWhereInput
    some?: PhraseWhereInput
    none?: PhraseWhereInput
  }

  export type ProgressListRelationFilter = {
    every?: ProgressWhereInput
    some?: ProgressWhereInput
    none?: ProgressWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ConversationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PhraseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    level?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    level?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    level?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type UserRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConversationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    topic?: SortOrder
  }

  export type ConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    topic?: SortOrder
  }

  export type ConversationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    topic?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type ConversationRelationFilter = {
    is?: ConversationWhereInput | null
    isNot?: ConversationWhereInput | null
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    transcription?: SortOrder
    timestamp?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    transcription?: SortOrder
    timestamp?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    transcription?: SortOrder
    timestamp?: SortOrder
  }

  export type KnowledgeChunkListRelationFilter = {
    every?: KnowledgeChunkWhereInput
    some?: KnowledgeChunkWhereInput
    none?: KnowledgeChunkWhereInput
  }

  export type KnowledgeChunkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KnowledgeDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KnowledgeDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KnowledgeDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type KnowledgeDocumentRelationFilter = {
    is?: KnowledgeDocumentWhereInput | null
    isNot?: KnowledgeDocumentWhereInput | null
  }

  export type KnowledgeChunkCountOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    content?: SortOrder
    chunkIndex?: SortOrder
  }

  export type KnowledgeChunkAvgOrderByAggregateInput = {
    chunkIndex?: SortOrder
  }

  export type KnowledgeChunkMaxOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    content?: SortOrder
    chunkIndex?: SortOrder
  }

  export type KnowledgeChunkMinOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    content?: SortOrder
    chunkIndex?: SortOrder
  }

  export type KnowledgeChunkSumOrderByAggregateInput = {
    chunkIndex?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type PhraseCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    german?: SortOrder
    english?: SortOrder
    context?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
  }

  export type PhraseMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    german?: SortOrder
    english?: SortOrder
    context?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
  }

  export type PhraseMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    german?: SortOrder
    english?: SortOrder
    context?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    phraseCount?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    phraseCount?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    phraseCount?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    phraseCount?: SortOrder
    createdAt?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    phraseCount?: SortOrder
  }

  export type ProgressCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    practiceTime?: SortOrder
    wordsMastered?: SortOrder
    conversationCount?: SortOrder
    lastPracticeAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgressAvgOrderByAggregateInput = {
    practiceTime?: SortOrder
    wordsMastered?: SortOrder
    conversationCount?: SortOrder
  }

  export type ProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    practiceTime?: SortOrder
    wordsMastered?: SortOrder
    conversationCount?: SortOrder
    lastPracticeAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgressMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    practiceTime?: SortOrder
    wordsMastered?: SortOrder
    conversationCount?: SortOrder
    lastPracticeAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgressSumOrderByAggregateInput = {
    practiceTime?: SortOrder
    wordsMastered?: SortOrder
    conversationCount?: SortOrder
  }

  export type ConversationCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ConversationCreateWithoutUserInput>, Enumerable<ConversationUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ConversationCreateOrConnectWithoutUserInput>
    createMany?: ConversationCreateManyUserInputEnvelope
    connect?: Enumerable<ConversationWhereUniqueInput>
  }

  export type PhraseCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<PhraseCreateWithoutUserInput>, Enumerable<PhraseUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PhraseCreateOrConnectWithoutUserInput>
    createMany?: PhraseCreateManyUserInputEnvelope
    connect?: Enumerable<PhraseWhereUniqueInput>
  }

  export type ProgressCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ProgressCreateWithoutUserInput>, Enumerable<ProgressUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ProgressCreateOrConnectWithoutUserInput>
    createMany?: ProgressCreateManyUserInputEnvelope
    connect?: Enumerable<ProgressWhereUniqueInput>
  }

  export type ConversationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ConversationCreateWithoutUserInput>, Enumerable<ConversationUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ConversationCreateOrConnectWithoutUserInput>
    createMany?: ConversationCreateManyUserInputEnvelope
    connect?: Enumerable<ConversationWhereUniqueInput>
  }

  export type PhraseUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<PhraseCreateWithoutUserInput>, Enumerable<PhraseUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PhraseCreateOrConnectWithoutUserInput>
    createMany?: PhraseCreateManyUserInputEnvelope
    connect?: Enumerable<PhraseWhereUniqueInput>
  }

  export type ProgressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ProgressCreateWithoutUserInput>, Enumerable<ProgressUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ProgressCreateOrConnectWithoutUserInput>
    createMany?: ProgressCreateManyUserInputEnvelope
    connect?: Enumerable<ProgressWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ConversationUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ConversationCreateWithoutUserInput>, Enumerable<ConversationUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ConversationCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ConversationUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ConversationCreateManyUserInputEnvelope
    set?: Enumerable<ConversationWhereUniqueInput>
    disconnect?: Enumerable<ConversationWhereUniqueInput>
    delete?: Enumerable<ConversationWhereUniqueInput>
    connect?: Enumerable<ConversationWhereUniqueInput>
    update?: Enumerable<ConversationUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ConversationUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ConversationScalarWhereInput>
  }

  export type PhraseUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<PhraseCreateWithoutUserInput>, Enumerable<PhraseUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PhraseCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<PhraseUpsertWithWhereUniqueWithoutUserInput>
    createMany?: PhraseCreateManyUserInputEnvelope
    set?: Enumerable<PhraseWhereUniqueInput>
    disconnect?: Enumerable<PhraseWhereUniqueInput>
    delete?: Enumerable<PhraseWhereUniqueInput>
    connect?: Enumerable<PhraseWhereUniqueInput>
    update?: Enumerable<PhraseUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<PhraseUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<PhraseScalarWhereInput>
  }

  export type ProgressUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ProgressCreateWithoutUserInput>, Enumerable<ProgressUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ProgressCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ProgressUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ProgressCreateManyUserInputEnvelope
    set?: Enumerable<ProgressWhereUniqueInput>
    disconnect?: Enumerable<ProgressWhereUniqueInput>
    delete?: Enumerable<ProgressWhereUniqueInput>
    connect?: Enumerable<ProgressWhereUniqueInput>
    update?: Enumerable<ProgressUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ProgressUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ProgressScalarWhereInput>
  }

  export type ConversationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ConversationCreateWithoutUserInput>, Enumerable<ConversationUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ConversationCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ConversationUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ConversationCreateManyUserInputEnvelope
    set?: Enumerable<ConversationWhereUniqueInput>
    disconnect?: Enumerable<ConversationWhereUniqueInput>
    delete?: Enumerable<ConversationWhereUniqueInput>
    connect?: Enumerable<ConversationWhereUniqueInput>
    update?: Enumerable<ConversationUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ConversationUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ConversationScalarWhereInput>
  }

  export type PhraseUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<PhraseCreateWithoutUserInput>, Enumerable<PhraseUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PhraseCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<PhraseUpsertWithWhereUniqueWithoutUserInput>
    createMany?: PhraseCreateManyUserInputEnvelope
    set?: Enumerable<PhraseWhereUniqueInput>
    disconnect?: Enumerable<PhraseWhereUniqueInput>
    delete?: Enumerable<PhraseWhereUniqueInput>
    connect?: Enumerable<PhraseWhereUniqueInput>
    update?: Enumerable<PhraseUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<PhraseUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<PhraseScalarWhereInput>
  }

  export type ProgressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ProgressCreateWithoutUserInput>, Enumerable<ProgressUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ProgressCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ProgressUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ProgressCreateManyUserInputEnvelope
    set?: Enumerable<ProgressWhereUniqueInput>
    disconnect?: Enumerable<ProgressWhereUniqueInput>
    delete?: Enumerable<ProgressWhereUniqueInput>
    connect?: Enumerable<ProgressWhereUniqueInput>
    update?: Enumerable<ProgressUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ProgressUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ProgressScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutConversationsInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    connect?: UserWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutConversationInput = {
    create?: XOR<Enumerable<MessageCreateWithoutConversationInput>, Enumerable<MessageUncheckedCreateWithoutConversationInput>>
    connectOrCreate?: Enumerable<MessageCreateOrConnectWithoutConversationInput>
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: Enumerable<MessageWhereUniqueInput>
  }

  export type MessageUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<Enumerable<MessageCreateWithoutConversationInput>, Enumerable<MessageUncheckedCreateWithoutConversationInput>>
    connectOrCreate?: Enumerable<MessageCreateOrConnectWithoutConversationInput>
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: Enumerable<MessageWhereUniqueInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneWithoutConversationsNestedInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    upsert?: UserUpsertWithoutConversationsInput
    disconnect?: boolean
    delete?: boolean
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type MessageUpdateManyWithoutConversationNestedInput = {
    create?: XOR<Enumerable<MessageCreateWithoutConversationInput>, Enumerable<MessageUncheckedCreateWithoutConversationInput>>
    connectOrCreate?: Enumerable<MessageCreateOrConnectWithoutConversationInput>
    upsert?: Enumerable<MessageUpsertWithWhereUniqueWithoutConversationInput>
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: Enumerable<MessageWhereUniqueInput>
    disconnect?: Enumerable<MessageWhereUniqueInput>
    delete?: Enumerable<MessageWhereUniqueInput>
    connect?: Enumerable<MessageWhereUniqueInput>
    update?: Enumerable<MessageUpdateWithWhereUniqueWithoutConversationInput>
    updateMany?: Enumerable<MessageUpdateManyWithWhereWithoutConversationInput>
    deleteMany?: Enumerable<MessageScalarWhereInput>
  }

  export type MessageUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<Enumerable<MessageCreateWithoutConversationInput>, Enumerable<MessageUncheckedCreateWithoutConversationInput>>
    connectOrCreate?: Enumerable<MessageCreateOrConnectWithoutConversationInput>
    upsert?: Enumerable<MessageUpsertWithWhereUniqueWithoutConversationInput>
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: Enumerable<MessageWhereUniqueInput>
    disconnect?: Enumerable<MessageWhereUniqueInput>
    delete?: Enumerable<MessageWhereUniqueInput>
    connect?: Enumerable<MessageWhereUniqueInput>
    update?: Enumerable<MessageUpdateWithWhereUniqueWithoutConversationInput>
    updateMany?: Enumerable<MessageUpdateManyWithWhereWithoutConversationInput>
    deleteMany?: Enumerable<MessageScalarWhereInput>
  }

  export type ConversationCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
  }

  export type ConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    upsert?: ConversationUpsertWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type KnowledgeChunkCreateNestedManyWithoutDocumentInput = {
    create?: XOR<Enumerable<KnowledgeChunkCreateWithoutDocumentInput>, Enumerable<KnowledgeChunkUncheckedCreateWithoutDocumentInput>>
    connectOrCreate?: Enumerable<KnowledgeChunkCreateOrConnectWithoutDocumentInput>
    createMany?: KnowledgeChunkCreateManyDocumentInputEnvelope
    connect?: Enumerable<KnowledgeChunkWhereUniqueInput>
  }

  export type KnowledgeChunkUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<Enumerable<KnowledgeChunkCreateWithoutDocumentInput>, Enumerable<KnowledgeChunkUncheckedCreateWithoutDocumentInput>>
    connectOrCreate?: Enumerable<KnowledgeChunkCreateOrConnectWithoutDocumentInput>
    createMany?: KnowledgeChunkCreateManyDocumentInputEnvelope
    connect?: Enumerable<KnowledgeChunkWhereUniqueInput>
  }

  export type KnowledgeChunkUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<Enumerable<KnowledgeChunkCreateWithoutDocumentInput>, Enumerable<KnowledgeChunkUncheckedCreateWithoutDocumentInput>>
    connectOrCreate?: Enumerable<KnowledgeChunkCreateOrConnectWithoutDocumentInput>
    upsert?: Enumerable<KnowledgeChunkUpsertWithWhereUniqueWithoutDocumentInput>
    createMany?: KnowledgeChunkCreateManyDocumentInputEnvelope
    set?: Enumerable<KnowledgeChunkWhereUniqueInput>
    disconnect?: Enumerable<KnowledgeChunkWhereUniqueInput>
    delete?: Enumerable<KnowledgeChunkWhereUniqueInput>
    connect?: Enumerable<KnowledgeChunkWhereUniqueInput>
    update?: Enumerable<KnowledgeChunkUpdateWithWhereUniqueWithoutDocumentInput>
    updateMany?: Enumerable<KnowledgeChunkUpdateManyWithWhereWithoutDocumentInput>
    deleteMany?: Enumerable<KnowledgeChunkScalarWhereInput>
  }

  export type KnowledgeChunkUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<Enumerable<KnowledgeChunkCreateWithoutDocumentInput>, Enumerable<KnowledgeChunkUncheckedCreateWithoutDocumentInput>>
    connectOrCreate?: Enumerable<KnowledgeChunkCreateOrConnectWithoutDocumentInput>
    upsert?: Enumerable<KnowledgeChunkUpsertWithWhereUniqueWithoutDocumentInput>
    createMany?: KnowledgeChunkCreateManyDocumentInputEnvelope
    set?: Enumerable<KnowledgeChunkWhereUniqueInput>
    disconnect?: Enumerable<KnowledgeChunkWhereUniqueInput>
    delete?: Enumerable<KnowledgeChunkWhereUniqueInput>
    connect?: Enumerable<KnowledgeChunkWhereUniqueInput>
    update?: Enumerable<KnowledgeChunkUpdateWithWhereUniqueWithoutDocumentInput>
    updateMany?: Enumerable<KnowledgeChunkUpdateManyWithWhereWithoutDocumentInput>
    deleteMany?: Enumerable<KnowledgeChunkScalarWhereInput>
  }

  export type KnowledgeDocumentCreateNestedOneWithoutChunksInput = {
    create?: XOR<KnowledgeDocumentCreateWithoutChunksInput, KnowledgeDocumentUncheckedCreateWithoutChunksInput>
    connectOrCreate?: KnowledgeDocumentCreateOrConnectWithoutChunksInput
    connect?: KnowledgeDocumentWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type KnowledgeDocumentUpdateOneRequiredWithoutChunksNestedInput = {
    create?: XOR<KnowledgeDocumentCreateWithoutChunksInput, KnowledgeDocumentUncheckedCreateWithoutChunksInput>
    connectOrCreate?: KnowledgeDocumentCreateOrConnectWithoutChunksInput
    upsert?: KnowledgeDocumentUpsertWithoutChunksInput
    connect?: KnowledgeDocumentWhereUniqueInput
    update?: XOR<KnowledgeDocumentUpdateWithoutChunksInput, KnowledgeDocumentUncheckedUpdateWithoutChunksInput>
  }

  export type UserCreateNestedOneWithoutPhrasesInput = {
    create?: XOR<UserCreateWithoutPhrasesInput, UserUncheckedCreateWithoutPhrasesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPhrasesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutPhrasesNestedInput = {
    create?: XOR<UserCreateWithoutPhrasesInput, UserUncheckedCreateWithoutPhrasesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPhrasesInput
    upsert?: UserUpsertWithoutPhrasesInput
    disconnect?: boolean
    delete?: boolean
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutPhrasesInput, UserUncheckedUpdateWithoutPhrasesInput>
  }

  export type UserCreateNestedOneWithoutProgressInput = {
    create?: XOR<UserCreateWithoutProgressInput, UserUncheckedCreateWithoutProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutProgressInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutProgressNestedInput = {
    create?: XOR<UserCreateWithoutProgressInput, UserUncheckedCreateWithoutProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutProgressInput
    upsert?: UserUpsertWithoutProgressInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutProgressInput, UserUncheckedUpdateWithoutProgressInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type ConversationCreateWithoutUserInput = {
    id?: string
    sessionId: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    topic?: string | null
    messages?: MessageCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutUserInput = {
    id?: string
    sessionId: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    topic?: string | null
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutUserInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput>
  }

  export type ConversationCreateManyUserInputEnvelope = {
    data: Enumerable<ConversationCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type PhraseCreateWithoutUserInput = {
    id?: string
    german: string
    english?: string | null
    context?: string | null
    category: string
    createdAt?: Date | string
  }

  export type PhraseUncheckedCreateWithoutUserInput = {
    id?: string
    german: string
    english?: string | null
    context?: string | null
    category: string
    createdAt?: Date | string
  }

  export type PhraseCreateOrConnectWithoutUserInput = {
    where: PhraseWhereUniqueInput
    create: XOR<PhraseCreateWithoutUserInput, PhraseUncheckedCreateWithoutUserInput>
  }

  export type PhraseCreateManyUserInputEnvelope = {
    data: Enumerable<PhraseCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type ProgressCreateWithoutUserInput = {
    id?: string
    practiceTime?: number
    wordsMastered?: number
    conversationCount?: number
    lastPracticeAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgressUncheckedCreateWithoutUserInput = {
    id?: string
    practiceTime?: number
    wordsMastered?: number
    conversationCount?: number
    lastPracticeAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgressCreateOrConnectWithoutUserInput = {
    where: ProgressWhereUniqueInput
    create: XOR<ProgressCreateWithoutUserInput, ProgressUncheckedCreateWithoutUserInput>
  }

  export type ProgressCreateManyUserInputEnvelope = {
    data: Enumerable<ProgressCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type ConversationUpsertWithWhereUniqueWithoutUserInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutUserInput, ConversationUncheckedUpdateWithoutUserInput>
    create: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutUserInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutUserInput, ConversationUncheckedUpdateWithoutUserInput>
  }

  export type ConversationUpdateManyWithWhereWithoutUserInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutConversationsInput>
  }

  export type ConversationScalarWhereInput = {
    AND?: Enumerable<ConversationScalarWhereInput>
    OR?: Enumerable<ConversationScalarWhereInput>
    NOT?: Enumerable<ConversationScalarWhereInput>
    id?: StringFilter | string
    userId?: StringNullableFilter | string | null
    sessionId?: StringFilter | string
    startedAt?: DateTimeFilter | Date | string
    endedAt?: DateTimeNullableFilter | Date | string | null
    topic?: StringNullableFilter | string | null
  }

  export type PhraseUpsertWithWhereUniqueWithoutUserInput = {
    where: PhraseWhereUniqueInput
    update: XOR<PhraseUpdateWithoutUserInput, PhraseUncheckedUpdateWithoutUserInput>
    create: XOR<PhraseCreateWithoutUserInput, PhraseUncheckedCreateWithoutUserInput>
  }

  export type PhraseUpdateWithWhereUniqueWithoutUserInput = {
    where: PhraseWhereUniqueInput
    data: XOR<PhraseUpdateWithoutUserInput, PhraseUncheckedUpdateWithoutUserInput>
  }

  export type PhraseUpdateManyWithWhereWithoutUserInput = {
    where: PhraseScalarWhereInput
    data: XOR<PhraseUpdateManyMutationInput, PhraseUncheckedUpdateManyWithoutPhrasesInput>
  }

  export type PhraseScalarWhereInput = {
    AND?: Enumerable<PhraseScalarWhereInput>
    OR?: Enumerable<PhraseScalarWhereInput>
    NOT?: Enumerable<PhraseScalarWhereInput>
    id?: StringFilter | string
    userId?: StringNullableFilter | string | null
    german?: StringFilter | string
    english?: StringNullableFilter | string | null
    context?: StringNullableFilter | string | null
    category?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
  }

  export type ProgressUpsertWithWhereUniqueWithoutUserInput = {
    where: ProgressWhereUniqueInput
    update: XOR<ProgressUpdateWithoutUserInput, ProgressUncheckedUpdateWithoutUserInput>
    create: XOR<ProgressCreateWithoutUserInput, ProgressUncheckedCreateWithoutUserInput>
  }

  export type ProgressUpdateWithWhereUniqueWithoutUserInput = {
    where: ProgressWhereUniqueInput
    data: XOR<ProgressUpdateWithoutUserInput, ProgressUncheckedUpdateWithoutUserInput>
  }

  export type ProgressUpdateManyWithWhereWithoutUserInput = {
    where: ProgressScalarWhereInput
    data: XOR<ProgressUpdateManyMutationInput, ProgressUncheckedUpdateManyWithoutProgressInput>
  }

  export type ProgressScalarWhereInput = {
    AND?: Enumerable<ProgressScalarWhereInput>
    OR?: Enumerable<ProgressScalarWhereInput>
    NOT?: Enumerable<ProgressScalarWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    practiceTime?: IntFilter | number
    wordsMastered?: IntFilter | number
    conversationCount?: IntFilter | number
    lastPracticeAt?: DateTimeFilter | Date | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type UserCreateWithoutConversationsInput = {
    id?: string
    clerkId: string
    email?: string | null
    name?: string | null
    level?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    phrases?: PhraseCreateNestedManyWithoutUserInput
    progress?: ProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutConversationsInput = {
    id?: string
    clerkId: string
    email?: string | null
    name?: string | null
    level?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    phrases?: PhraseUncheckedCreateNestedManyWithoutUserInput
    progress?: ProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutConversationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
  }

  export type MessageCreateWithoutConversationInput = {
    id?: string
    role: string
    content: string
    transcription?: string | null
    timestamp?: Date | string
  }

  export type MessageUncheckedCreateWithoutConversationInput = {
    id?: string
    role: string
    content: string
    transcription?: string | null
    timestamp?: Date | string
  }

  export type MessageCreateOrConnectWithoutConversationInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageCreateManyConversationInputEnvelope = {
    data: Enumerable<MessageCreateManyConversationInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutConversationsInput = {
    update: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
  }

  export type UserUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    level?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    phrases?: PhraseUpdateManyWithoutUserNestedInput
    progress?: ProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    level?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    phrases?: PhraseUncheckedUpdateManyWithoutUserNestedInput
    progress?: ProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MessageUpsertWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
  }

  export type MessageUpdateManyWithWhereWithoutConversationInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutMessagesInput>
  }

  export type MessageScalarWhereInput = {
    AND?: Enumerable<MessageScalarWhereInput>
    OR?: Enumerable<MessageScalarWhereInput>
    NOT?: Enumerable<MessageScalarWhereInput>
    id?: StringFilter | string
    conversationId?: StringFilter | string
    role?: StringFilter | string
    content?: StringFilter | string
    transcription?: StringNullableFilter | string | null
    timestamp?: DateTimeFilter | Date | string
  }

  export type ConversationCreateWithoutMessagesInput = {
    id?: string
    sessionId: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    topic?: string | null
    user?: UserCreateNestedOneWithoutConversationsInput
  }

  export type ConversationUncheckedCreateWithoutMessagesInput = {
    id?: string
    userId?: string | null
    sessionId: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    topic?: string | null
  }

  export type ConversationCreateOrConnectWithoutMessagesInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
  }

  export type ConversationUpsertWithoutMessagesInput = {
    update: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
  }

  export type ConversationUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutConversationsNestedInput
  }

  export type ConversationUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type KnowledgeChunkCreateWithoutDocumentInput = {
    id?: string
    content: string
    chunkIndex: number
  }

  export type KnowledgeChunkUncheckedCreateWithoutDocumentInput = {
    id?: string
    content: string
    chunkIndex: number
  }

  export type KnowledgeChunkCreateOrConnectWithoutDocumentInput = {
    where: KnowledgeChunkWhereUniqueInput
    create: XOR<KnowledgeChunkCreateWithoutDocumentInput, KnowledgeChunkUncheckedCreateWithoutDocumentInput>
  }

  export type KnowledgeChunkCreateManyDocumentInputEnvelope = {
    data: Enumerable<KnowledgeChunkCreateManyDocumentInput>
    skipDuplicates?: boolean
  }

  export type KnowledgeChunkUpsertWithWhereUniqueWithoutDocumentInput = {
    where: KnowledgeChunkWhereUniqueInput
    update: XOR<KnowledgeChunkUpdateWithoutDocumentInput, KnowledgeChunkUncheckedUpdateWithoutDocumentInput>
    create: XOR<KnowledgeChunkCreateWithoutDocumentInput, KnowledgeChunkUncheckedCreateWithoutDocumentInput>
  }

  export type KnowledgeChunkUpdateWithWhereUniqueWithoutDocumentInput = {
    where: KnowledgeChunkWhereUniqueInput
    data: XOR<KnowledgeChunkUpdateWithoutDocumentInput, KnowledgeChunkUncheckedUpdateWithoutDocumentInput>
  }

  export type KnowledgeChunkUpdateManyWithWhereWithoutDocumentInput = {
    where: KnowledgeChunkScalarWhereInput
    data: XOR<KnowledgeChunkUpdateManyMutationInput, KnowledgeChunkUncheckedUpdateManyWithoutChunksInput>
  }

  export type KnowledgeChunkScalarWhereInput = {
    AND?: Enumerable<KnowledgeChunkScalarWhereInput>
    OR?: Enumerable<KnowledgeChunkScalarWhereInput>
    NOT?: Enumerable<KnowledgeChunkScalarWhereInput>
    id?: StringFilter | string
    documentId?: StringFilter | string
    content?: StringFilter | string
    chunkIndex?: IntFilter | number
  }

  export type KnowledgeDocumentCreateWithoutChunksInput = {
    id?: string
    title: string
    content: string
    category: string
    language?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KnowledgeDocumentUncheckedCreateWithoutChunksInput = {
    id?: string
    title: string
    content: string
    category: string
    language?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KnowledgeDocumentCreateOrConnectWithoutChunksInput = {
    where: KnowledgeDocumentWhereUniqueInput
    create: XOR<KnowledgeDocumentCreateWithoutChunksInput, KnowledgeDocumentUncheckedCreateWithoutChunksInput>
  }

  export type KnowledgeDocumentUpsertWithoutChunksInput = {
    update: XOR<KnowledgeDocumentUpdateWithoutChunksInput, KnowledgeDocumentUncheckedUpdateWithoutChunksInput>
    create: XOR<KnowledgeDocumentCreateWithoutChunksInput, KnowledgeDocumentUncheckedCreateWithoutChunksInput>
  }

  export type KnowledgeDocumentUpdateWithoutChunksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeDocumentUncheckedUpdateWithoutChunksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutPhrasesInput = {
    id?: string
    clerkId: string
    email?: string | null
    name?: string | null
    level?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationCreateNestedManyWithoutUserInput
    progress?: ProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPhrasesInput = {
    id?: string
    clerkId: string
    email?: string | null
    name?: string | null
    level?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
    progress?: ProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPhrasesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPhrasesInput, UserUncheckedCreateWithoutPhrasesInput>
  }

  export type UserUpsertWithoutPhrasesInput = {
    update: XOR<UserUpdateWithoutPhrasesInput, UserUncheckedUpdateWithoutPhrasesInput>
    create: XOR<UserCreateWithoutPhrasesInput, UserUncheckedCreateWithoutPhrasesInput>
  }

  export type UserUpdateWithoutPhrasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    level?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUpdateManyWithoutUserNestedInput
    progress?: ProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPhrasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    level?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
    progress?: ProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutProgressInput = {
    id?: string
    clerkId: string
    email?: string | null
    name?: string | null
    level?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationCreateNestedManyWithoutUserInput
    phrases?: PhraseCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProgressInput = {
    id?: string
    clerkId: string
    email?: string | null
    name?: string | null
    level?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
    phrases?: PhraseUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProgressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProgressInput, UserUncheckedCreateWithoutProgressInput>
  }

  export type UserUpsertWithoutProgressInput = {
    update: XOR<UserUpdateWithoutProgressInput, UserUncheckedUpdateWithoutProgressInput>
    create: XOR<UserCreateWithoutProgressInput, UserUncheckedCreateWithoutProgressInput>
  }

  export type UserUpdateWithoutProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    level?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUpdateManyWithoutUserNestedInput
    phrases?: PhraseUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    level?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
    phrases?: PhraseUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ConversationCreateManyUserInput = {
    id?: string
    sessionId: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    topic?: string | null
  }

  export type PhraseCreateManyUserInput = {
    id?: string
    german: string
    english?: string | null
    context?: string | null
    category: string
    createdAt?: Date | string
  }

  export type ProgressCreateManyUserInput = {
    id?: string
    practiceTime?: number
    wordsMastered?: number
    conversationCount?: number
    lastPracticeAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    messages?: MessageUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateManyWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PhraseUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    german?: StringFieldUpdateOperationsInput | string
    english?: NullableStringFieldUpdateOperationsInput | string | null
    context?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhraseUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    german?: StringFieldUpdateOperationsInput | string
    english?: NullableStringFieldUpdateOperationsInput | string | null
    context?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhraseUncheckedUpdateManyWithoutPhrasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    german?: StringFieldUpdateOperationsInput | string
    english?: NullableStringFieldUpdateOperationsInput | string | null
    context?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgressUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    practiceTime?: IntFieldUpdateOperationsInput | number
    wordsMastered?: IntFieldUpdateOperationsInput | number
    conversationCount?: IntFieldUpdateOperationsInput | number
    lastPracticeAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgressUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    practiceTime?: IntFieldUpdateOperationsInput | number
    wordsMastered?: IntFieldUpdateOperationsInput | number
    conversationCount?: IntFieldUpdateOperationsInput | number
    lastPracticeAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgressUncheckedUpdateManyWithoutProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    practiceTime?: IntFieldUpdateOperationsInput | number
    wordsMastered?: IntFieldUpdateOperationsInput | number
    conversationCount?: IntFieldUpdateOperationsInput | number
    lastPracticeAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyConversationInput = {
    id?: string
    role: string
    content: string
    transcription?: string | null
    timestamp?: Date | string
  }

  export type MessageUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    transcription?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    transcription?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    transcription?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeChunkCreateManyDocumentInput = {
    id?: string
    content: string
    chunkIndex: number
  }

  export type KnowledgeChunkUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    chunkIndex?: IntFieldUpdateOperationsInput | number
  }

  export type KnowledgeChunkUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    chunkIndex?: IntFieldUpdateOperationsInput | number
  }

  export type KnowledgeChunkUncheckedUpdateManyWithoutChunksInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    chunkIndex?: IntFieldUpdateOperationsInput | number
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