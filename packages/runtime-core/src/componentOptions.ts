import {
  ComponentInternalInstance,
  Data,
  SetupContext,
  ComponentInternalOptions,
  Component,
  ConcreteComponent,
  InternalRenderFunction
} from './component'
import {
  isFunction,
  extend,
  isString,
  isObject,
  isArray,
  EMPTY_OBJ,
  NOOP,
  hasOwn,
  isPromise
} from '@vue/shared'
import { computed } from './apiComputed'
import { watch, WatchOptions, WatchCallback } from './apiWatch'
import { provide, inject } from './apiInject'
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onErrorCaptured,
  onRenderTracked,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onRenderTriggered,
  DebuggerHook,
  ErrorCapturedHook
} from './apiLifecycle'
import {
  reactive,
  ComputedGetter,
  WritableComputedOptions,
  toRaw
} from '@vue/reactivity'
import {
  ComponentObjectPropsOptions,
  ExtractPropTypes,
  ExtractDefaultPropTypes
} from './componentProps'
import { EmitsOptions } from './componentEmits'
import { Directive } from './directives'
import {
  CreateComponentPublicInstance,
  ComponentPublicInstance
} from './componentPublicInstance'
import { warn } from './warning'
import { VNodeChild } from './vnode'

/**
 * Interface for declaring custom options.
 *
 * @example
 * ```ts
 * declare module '@vue/runtime-core' {
 *   interface ComponentCustomOptions {
 *     beforeRouteUpdate?(
 *       to: Route,
 *       from: Route,
 *       next: () => void
 *     ): void
 *   }
 * }
 * ```
 */
export interface ComponentCustomOptions {}

export type RenderFunction = () => VNodeChild

export interface ComponentOptionsBase<
  Props,
  RawBindings,
  D,
  C extends ComputedOptions,
  M extends MethodOptions,
  Mixin extends ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin,
  E extends EmitsOptions,
  EE extends string = string,
  Defaults = {}
>
  extends LegacyOptions<Props, D, C, M, Mixin, Extends>,
    ComponentInternalOptions,
    ComponentCustomOptions {
  setup?: (
    this: void,
    props: Props,
    ctx: SetupContext<E>
  ) => Promise<RawBindings> | RawBindings | RenderFunction | void
  name?: string
  template?: string | object // can be a direct DOM node
  // Note: we are intentionally using the signature-less `Function` type here
  // since any type with signature will cause the whole inference to fail when
  // the return expression contains reference to `this`.
  // Luckily `render()` doesn't need any arguments nor does it care about return
  // type.
  render?: Function
  components?: Record<string, Component>
  directives?: Record<string, Directive>
  inheritAttrs?: boolean
  emits?: (E | EE[]) & ThisType<void>
  serverPrefetch?(): Promise<any>

  // Internal ------------------------------------------------------------------

  /**
   * SSR only. This is produced by compiler-ssr and attached in compiler-sfc
   * not user facing, so the typing is lax and for test only.
   *
   * @internal
   */
  ssrRender?: (
    ctx: any,
    push: (item: any) => void,
    parentInstance: ComponentInternalInstance,
    attrs: Data | undefined,
    // for compiler-optimized bindings
    $props: ComponentInternalInstance['props'],
    $setup: ComponentInternalInstance['setupState'],
    $data: ComponentInternalInstance['data'],
    $options: ComponentInternalInstance['ctx']
  ) => void

  /**
   * marker for AsyncComponentWrapper
   * @internal
   */
  __asyncLoader?: () => Promise<ConcreteComponent>
  /**
   * cache for merged $options
   * @internal
   */
  __merged?: ComponentOptions

  // Type differentiators ------------------------------------------------------

  // Note these are internal but need to be exposed in d.ts for type inference
  // to work!

  // type-only differentiator to separate OptionWithoutProps from a constructor
  // type returned by defineComponent() or FunctionalComponent
  call?: (this: unknown, ...args: unknown[]) => never
  // type-only differentiators for built-in Vnode types
  __isFragment?: never
  __isTeleport?: never
  __isSuspense?: never

  __defaults?: Defaults
}

export type ComponentOptionsWithoutProps<
  Props = {},
  RawBindings = {},
  D = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = EmitsOptions,
  EE extends string = string
> = ComponentOptionsBase<
  Props,
  RawBindings,
  D,
  C,
  M,
  Mixin,
  Extends,
  E,
  EE,
  {}
> & {
  props?: undefined
} & ThisType<
    CreateComponentPublicInstance<{}, RawBindings, D, C, M, Mixin, Extends, E>
  >

export type ComponentOptionsWithArrayProps<
  PropNames extends string = string,
  RawBindings = {},
  D = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = EmitsOptions,
  EE extends string = string,
  Props = Readonly<{ [key in PropNames]?: any }>
> = ComponentOptionsBase<
  Props,
  RawBindings,
  D,
  C,
  M,
  Mixin,
  Extends,
  E,
  EE,
  {}
> & {
  props: PropNames[]
} & ThisType<
    CreateComponentPublicInstance<
      Props,
      RawBindings,
      D,
      C,
      M,
      Mixin,
      Extends,
      E
    >
  >

export type ComponentOptionsWithObjectProps<
  PropsOptions = ComponentObjectPropsOptions,
  RawBindings = {},
  D = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = EmitsOptions,
  EE extends string = string,
  Props = Readonly<ExtractPropTypes<PropsOptions>>,
  Defaults = ExtractDefaultPropTypes<PropsOptions>
> = ComponentOptionsBase<
  Props,
  RawBindings,
  D,
  C,
  M,
  Mixin,
  Extends,
  E,
  EE,
  Defaults
> & {
  props: PropsOptions & ThisType<void>
} & ThisType<
    CreateComponentPublicInstance<
      Props,
      RawBindings,
      D,
      C,
      M,
      Mixin,
      Extends,
      E,
      Props,
      Defaults,
      false
    >
  >

export type ComponentOptions<
  Props = {},
  RawBindings = any,
  D = any,
  C extends ComputedOptions = any,
  M extends MethodOptions = any,
  Mixin extends ComponentOptionsMixin = any,
  Extends extends ComponentOptionsMixin = any,
  E extends EmitsOptions = any
> = ComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, E> &
  ThisType<
    CreateComponentPublicInstance<
      {},
      RawBindings,
      D,
      C,
      M,
      Mixin,
      Extends,
      E,
      Readonly<Props>
    >
  >

export type ComponentOptionsMixin = ComponentOptionsBase<
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>

export type ComputedOptions = Record<
  string,
  ComputedGetter<any> | WritableComputedOptions<any>
>

export interface MethodOptions {
  [key: string]: Function
}

export type ExtractComputedReturns<T extends any> = {
  [key in keyof T]: T[key] extends { get: (...args: any[]) => infer TReturn }
    ? TReturn
    : T[key] extends (...args: any[]) => infer TReturn ? TReturn : never
}

type WatchOptionItem =
  | string
  | WatchCallback
  | { handler: WatchCallback | string } & WatchOptions

type ComponentWatchOptionItem = WatchOptionItem | WatchOptionItem[]

type ComponentWatchOptions = Record<string, ComponentWatchOptionItem>

type ComponentInjectOptions =
  | string[]
  | Record<
      string | symbol,
      string | symbol | { from?: string | symbol; default?: unknown }
    >

interface LegacyOptions<
  Props,
  D,
  C extends ComputedOptions,
  M extends MethodOptions,
  Mixin extends ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin
> {
  // allow any custom options
  [key: string]: any

  // state
  // Limitation: we cannot expose RawBindings on the `this` context for data
  // since that leads to some sort of circular inference and breaks ThisType
  // for the entire component.
  data?: (
    this: CreateComponentPublicInstance<Props>,
    vm: CreateComponentPublicInstance<Props>
  ) => D
  computed?: C
  methods?: M
  watch?: ComponentWatchOptions
  provide?: Data | Function
  inject?: ComponentInjectOptions

  // composition
  mixins?: Mixin[]
  extends?: Extends

  // lifecycle
  beforeCreate?(): void
  created?(): void
  beforeMount?(): void
  mounted?(): void
  beforeUpdate?(): void
  updated?(): void
  activated?(): void
  deactivated?(): void
  /** @deprecated use `beforeUnmount` instead */
  beforeDestroy?(): void
  beforeUnmount?(): void
  /** @deprecated use `unmounted` instead */
  destroyed?(): void
  unmounted?(): void
  renderTracked?: DebuggerHook
  renderTriggered?: DebuggerHook
  errorCaptured?: ErrorCapturedHook

  // runtime compile only
  delimiters?: [string, string]
}

export type OptionTypesKeys = 'P' | 'B' | 'D' | 'C' | 'M' | 'Defaults'

export type OptionTypesType<
  P = {},
  B = {},
  D = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Defaults = {}
> = {
  P: P
  B: B
  D: D
  C: C
  M: M
  Defaults: Defaults
}

const enum OptionTypes {
  PROPS = 'Props',
  DATA = 'Data',
  COMPUTED = 'Computed',
  METHODS = 'Methods',
  INJECT = 'Inject'
}

function createDuplicateChecker() {
  const cache = Object.create(null)
  return (type: OptionTypes, key: string) => {
    if (cache[key]) {
      warn(`${type} property "${key}" is already defined in ${cache[key]}.`)
    } else {
      cache[key] = type
    }
  }
}

type DataFn = (vm: ComponentPublicInstance) => any

export let isInBeforeCreate = false

export function applyOptions(
  instance: ComponentInternalInstance,
  options: ComponentOptions,
  deferredData: DataFn[] = [],
  deferredWatch: ComponentWatchOptions[] = [],
  asMixin: boolean = false
) {
  const {
    // composition
    mixins,
    extends: extendsOptions,
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // assets
    components,
    directives,
    // lifecycle
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured
  } = options

  const publicThis = instance.proxy!
  const ctx = instance.ctx
  const globalMixins = instance.appContext.mixins

  if (asMixin && render && instance.render === NOOP) {
    instance.render = render as InternalRenderFunction
  }

  // applyOptions is called non-as-mixin once per instance
  if (!asMixin) {
    isInBeforeCreate = true
    callSyncHook('beforeCreate', options, publicThis, globalMixins)
    isInBeforeCreate = false
    // global mixins are applied first
    applyMixins(instance, globalMixins, deferredData, deferredWatch)
  }

  // extending a base component...
  if (extendsOptions) {
    applyOptions(instance, extendsOptions, deferredData, deferredWatch, true)
  }
  // local mixins
  if (mixins) {
    applyMixins(instance, mixins, deferredData, deferredWatch)
  }

  const checkDuplicateProperties = __DEV__ ? createDuplicateChecker() : null

  if (__DEV__) {
    const [propsOptions] = instance.propsOptions
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties!(OptionTypes.PROPS, key)
      }
    }
  }

  // options initialization order (to be consistent with Vue 2):
  // - props (already done outside of this function)
  // - inject
  // - methods
  // - data (deferred since it relies on `this` access)
  // - computed
  // - watch (deferred since it relies on `this` access)

  if (injectOptions) {
    if (isArray(injectOptions)) {
      for (let i = 0; i < injectOptions.length; i++) {
        const key = injectOptions[i]
        ctx[key] = inject(key)
        if (__DEV__) {
          checkDuplicateProperties!(OptionTypes.INJECT, key)
        }
      }
    } else {
      for (const key in injectOptions) {
        const opt = injectOptions[key]
        if (isObject(opt)) {
          ctx[key] = inject(
            opt.from || key,
            opt.default,
            true /* treat default function as factory */
          )
        } else {
          ctx[key] = inject(opt)
        }
        if (__DEV__) {
          checkDuplicateProperties!(OptionTypes.INJECT, key)
        }
      }
    }
  }

  if (methods) {
    for (const key in methods) {
      const methodHandler = (methods as MethodOptions)[key]
      if (isFunction(methodHandler)) {
        ctx[key] = methodHandler.bind(publicThis)
        if (__DEV__) {
          checkDuplicateProperties!(OptionTypes.METHODS, key)
        }
      } else if (__DEV__) {
        warn(
          `Method "${key}" has type "${typeof methodHandler}" in the component definition. ` +
            `Did you reference the function correctly?`
        )
      }
    }
  }

  if (!asMixin) {
    if (deferredData.length) {
      deferredData.forEach(dataFn => resolveData(instance, dataFn, publicThis))
    }
    // data选项的响应式处理
    if (dataOptions) {
      resolveData(instance, dataOptions, publicThis)
    }
    if (__DEV__) {
      const rawData = toRaw(instance.data)
      for (const key in rawData) {
        checkDuplicateProperties!(OptionTypes.DATA, key)
        // expose data on ctx during dev
        if (key[0] !== '$' && key[0] !== '_') {
          Object.defineProperty(ctx, key, {
            configurable: true,
            enumerable: true,
            get: () => rawData[key],
            set: NOOP
          })
        }
      }
    }
  } else if (dataOptions) {
    deferredData.push(dataOptions as DataFn)
  }

  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = (computedOptions as ComputedOptions)[key]
      const get = isFunction(opt)
        ? opt.bind(publicThis, publicThis)
        : isFunction(opt.get)
          ? opt.get.bind(publicThis, publicThis)
          : NOOP
      if (__DEV__ && get === NOOP) {
        warn(`Computed property "${key}" has no getter.`)
      }
      const set =
        !isFunction(opt) && isFunction(opt.set)
          ? opt.set.bind(publicThis)
          : __DEV__
            ? () => {
                warn(
                  `Write operation failed: computed property "${key}" is readonly.`
                )
              }
            : NOOP
      const c = computed({
        get,
        set
      })
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: v => (c.value = v)
      })
      if (__DEV__) {
        checkDuplicateProperties!(OptionTypes.COMPUTED, key)
      }
    }
  }

  if (watchOptions) {
    deferredWatch.push(watchOptions)
  }
  if (!asMixin && deferredWatch.length) {
    deferredWatch.forEach(watchOptions => {
      for (const key in watchOptions) {
        createWatcher(watchOptions[key], ctx, publicThis, key)
      }
    })
  }

  if (provideOptions) {
    const provides = isFunction(provideOptions)
      ? provideOptions.call(publicThis)
      : provideOptions
    for (const key in provides) {
      provide(key, provides[key])
    }
  }

  // asset options.
  // To reduce memory usage, only components with mixins or extends will have
  // resolved asset registry attached to instance.
  if (asMixin) {
    if (components) {
      extend(
        instance.components ||
          (instance.components = extend(
            {},
            (instance.type as ComponentOptions).components
          ) as Record<string, ConcreteComponent>),
        components
      )
    }
    if (directives) {
      extend(
        instance.directives ||
          (instance.directives = extend(
            {},
            (instance.type as ComponentOptions).directives
          )),
        directives
      )
    }
  }

  // lifecycle options
  if (!asMixin) {
    callSyncHook('created', options, publicThis, globalMixins)
  }
  if (beforeMount) {
    onBeforeMount(beforeMount.bind(publicThis))
  }
  if (mounted) {
    onMounted(mounted.bind(publicThis))
  }
  if (beforeUpdate) {
    onBeforeUpdate(beforeUpdate.bind(publicThis))
  }
  if (updated) {
    onUpdated(updated.bind(publicThis))
  }
  if (activated) {
    onActivated(activated.bind(publicThis))
  }
  if (deactivated) {
    onDeactivated(deactivated.bind(publicThis))
  }
  if (errorCaptured) {
    onErrorCaptured(errorCaptured.bind(publicThis))
  }
  if (renderTracked) {
    onRenderTracked(renderTracked.bind(publicThis))
  }
  if (renderTriggered) {
    onRenderTriggered(renderTriggered.bind(publicThis))
  }
  if (__DEV__ && beforeDestroy) {
    warn(`\`beforeDestroy\` has been renamed to \`beforeUnmount\`.`)
  }
  if (beforeUnmount) {
    onBeforeUnmount(beforeUnmount.bind(publicThis))
  }
  if (__DEV__ && destroyed) {
    warn(`\`destroyed\` has been renamed to \`unmounted\`.`)
  }
  if (unmounted) {
    onUnmounted(unmounted.bind(publicThis))
  }
}

function callSyncHook(
  name: 'beforeCreate' | 'created',
  options: ComponentOptions,
  ctx: ComponentPublicInstance,
  globalMixins: ComponentOptions[]
) {
  callHookFromMixins(name, globalMixins, ctx)

  const { extends: base, mixins } = options
  if (base) {
    callHookFromExtends(name, base, ctx)
  }
  if (mixins) {
    callHookFromMixins(name, mixins, ctx)
  }
  const selfHook = options[name]
  if (selfHook) {
    selfHook.call(ctx)
  }
}

function callHookFromExtends(
  name: 'beforeCreate' | 'created',
  base: ComponentOptions,
  ctx: ComponentPublicInstance
) {
  if (base.extends) {
    callHookFromExtends(name, base.extends, ctx)
  }
  const baseHook = base[name]
  if (baseHook) {
    baseHook.call(ctx)
  }
}

function callHookFromMixins(
  name: 'beforeCreate' | 'created',
  mixins: ComponentOptions[],
  ctx: ComponentPublicInstance
) {
  for (let i = 0; i < mixins.length; i++) {
    const chainedMixins = mixins[i].mixins
    if (chainedMixins) {
      callHookFromMixins(name, chainedMixins, ctx)
    }
    const fn = mixins[i][name]
    if (fn) {
      fn.call(ctx)
    }
  }
}

function applyMixins(
  instance: ComponentInternalInstance,
  mixins: ComponentOptions[],
  deferredData: DataFn[],
  deferredWatch: ComponentWatchOptions[]
) {
  for (let i = 0; i < mixins.length; i++) {
    applyOptions(instance, mixins[i], deferredData, deferredWatch, true)
  }
}

function resolveData(
  instance: ComponentInternalInstance,
  dataFn: DataFn,
  publicThis: ComponentPublicInstance
) {
  if (__DEV__ && !isFunction(dataFn)) {
    warn(
      `The data option must be a function. ` +
        `Plain object usage is no longer supported.`
    )
  }
  // 获取data函数返回的对象
  const data = dataFn.call(publicThis, publicThis)
  if (__DEV__ && isPromise(data)) {
    warn(
      `data() returned a Promise - note data() cannot be async; If you ` +
        `intend to perform data fetching before component renders, use ` +
        `async setup() + <Suspense>.`
    )
  }
  if (!isObject(data)) {
    __DEV__ && warn(`data() should return an object.`)
  } else if (instance.data === EMPTY_OBJ) {
    // 其实data还是使用reactive做的响应式
    instance.data = reactive(data)
  } else {
    // existing data: this is a mixin or extends.
    extend(instance.data, data)
  }
}

function createWatcher(
  raw: ComponentWatchOptionItem,
  ctx: Data,
  publicThis: ComponentPublicInstance,
  key: string
) {
  const getter = key.includes('.')
    ? createPathGetter(publicThis, key)
    : () => (publicThis as any)[key]
  if (isString(raw)) {
    const handler = ctx[raw]
    if (isFunction(handler)) {
      watch(getter, handler as WatchCallback)
    } else if (__DEV__) {
      warn(`Invalid watch handler specified by key "${raw}"`, handler)
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis))
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach(r => createWatcher(r, ctx, publicThis, key))
    } else {
      const handler = isFunction(raw.handler)
        ? raw.handler.bind(publicThis)
        : (ctx[raw.handler] as WatchCallback)
      if (isFunction(handler)) {
        watch(getter, handler, raw)
      } else if (__DEV__) {
        warn(`Invalid watch handler specified by key "${raw.handler}"`, handler)
      }
    }
  } else if (__DEV__) {
    warn(`Invalid watch option: "${key}"`, raw)
  }
}

function createPathGetter(ctx: any, path: string) {
  const segments = path.split('.')
  return () => {
    let cur = ctx
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]]
    }
    return cur
  }
}

export function resolveMergedOptions(
  instance: ComponentInternalInstance
): ComponentOptions {
  const raw = instance.type as ComponentOptions
  const { __merged, mixins, extends: extendsOptions } = raw
  if (__merged) return __merged
  const globalMixins = instance.appContext.mixins
  if (!globalMixins.length && !mixins && !extendsOptions) return raw
  const options = {}
  globalMixins.forEach(m => mergeOptions(options, m, instance))
  mergeOptions(options, raw, instance)
  return (raw.__merged = options)
}

function mergeOptions(to: any, from: any, instance: ComponentInternalInstance) {
  const strats = instance.appContext.config.optionMergeStrategies
  const { mixins, extends: extendsOptions } = from

  extendsOptions && mergeOptions(to, extendsOptions, instance)
  mixins &&
    mixins.forEach((m: ComponentOptionsMixin) => mergeOptions(to, m, instance))

  for (const key in from) {
    if (strats && hasOwn(strats, key)) {
      to[key] = strats[key](to[key], from[key], instance.proxy, key)
    } else {
      to[key] = from[key]
    }
  }
}
