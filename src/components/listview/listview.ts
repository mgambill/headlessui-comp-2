import {
  defineComponent,
  ref,
  provide,
  inject,
  onMounted,
  onUnmounted,
  computed,
  nextTick,
  InjectionKey,
  Ref,
  ComputedRef,
  watchEffect,
  toRaw,
  watch,
} from 'vue'

import { Features, render } from '../../utils/render'
import { useId } from '../../hooks/use-id'
import { Keys } from '../../keyboard'
import { calculateActiveIndex, Focus } from '../../utils/calculate-active-index'
import { resolvePropValue } from '../../utils/resolve-prop-value'

type ListviewOptionDataRef = Ref<{ textValue: string; disabled: boolean; value: unknown }>

type StateDefinition = {
  // State
  value: ComputedRef<unknown>
  optionsRef: Ref<HTMLDivElement | null>
  disabled: Ref<boolean>
  multiple: Ref<boolean>
  options: Ref<{ id: string; dataRef: ListviewOptionDataRef }[]>
  searchQuery: Ref<string>
  activeOptionIndex: Ref<number | null>

  // State mutators
  goToOption(focus: Focus, id?: string): void
  registerOption(id: string, dataRef: ListviewOptionDataRef): void
  unregisterOption(id: string): void
  select(value: unknown): void
}

let ListviewContext = Symbol('ListviewContext') as InjectionKey<StateDefinition>

function useListviewContext(component: string) {
  let context = inject(ListviewContext, null)

  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <Listview /> component.`)
    if (Error.captureStackTrace) Error.captureStackTrace(err, useListviewContext)
    throw err
  }

  return context
}

// ---

export let Listview = defineComponent({
  name: 'Listview',
  emits: ['update:modelValue'],
  props: {
    as: { type: [Object, String], default: 'section' },
    disabled: { type: [Boolean], default: false },
    modelValue: { type: [Object, String, Number, Boolean, Array], default: null }
  },
  setup(props, { slots, attrs, emit }) {
    let { modelValue, disabled, ...passThroughProps } = props

    let optionsRef = ref<StateDefinition['optionsRef']['value']>(null)
    let options = ref<StateDefinition['options']['value']>([])
    let searchQuery = ref<StateDefinition['searchQuery']['value']>('')
    let activeOptionIndex = ref<StateDefinition['activeOptionIndex']['value']>(null)
    let multiple = Array.isArray(props.modelValue)
    let value = computed(() => props.modelValue)

    let api = {
      value,
      optionsRef,
      disabled,
      options,
      activeOptionIndex,
      multiple,
      goToOption(focus: Focus, id?: string) {
        if (disabled) return
        let nextActiveOptionIndex = calculateActiveIndex(
          focus === Focus.Specific
            ? { focus: Focus.Specific, id: id! }
            : { focus: focus as Exclude<Focus, Focus.Specific> },
          {
            resolveItems: () => options.value,
            resolveActiveIndex: () => activeOptionIndex.value,
            resolveId: option => option.id,
            resolveDisabled: option => option.dataRef.disabled,
          }
        )

        if (searchQuery.value === '' && activeOptionIndex.value === nextActiveOptionIndex) return
        searchQuery.value = ''
        activeOptionIndex.value = nextActiveOptionIndex
      },

      registerOption(id: string, dataRef: ListviewOptionDataRef) {
        // @ts-expect-error The expected type comes from property 'dataRef' which is declared here on type '{ id: string; dataRef: { textValue: string; disabled: boolean; }; }'
        options.value.push({ id, dataRef })
      },
      unregisterOption(id: string) {
        let nextOptions = options.value.slice()
        let currentActiveOption =
          activeOptionIndex.value !== null ? nextOptions[activeOptionIndex.value] : null
        let idx = nextOptions.findIndex(a => a.id === id)
        if (idx !== -1) nextOptions.splice(idx, 1)
        options.value = nextOptions
        activeOptionIndex.value = (() => {
          if (idx === activeOptionIndex.value) return null
          if (currentActiveOption === null) return null

          // If we removed the option before the actual active index, then it would be out of sync. To
          // fix this, we will find the correct (new) index position.
          return nextOptions.indexOf(currentActiveOption)
        })()
      },
      select(value: any) {
        if (disabled) return
        if (multiple) {
          const arr = toRaw(props?.modelValue) ?? []
          const index = arr.indexOf(value)
          if (index === -1) {
            emit('update:modelValue', [...arr, value])
          } else {
            emit('update:modelValue', arr.filter((x, i) => i !== index))
          }
        } else
          emit('update:modelValue', value)
      }
    }
    /*
        onMounted(() => {
          function handler(event: MouseEvent) {
            let target = event.target as HTMLElement
            let active = document.activeElement
            if (active !== document.body && active?.contains(target)) return // Keep focus on newly clicked/focused element

          }

          window.addEventListener('mousedown', handler)
          onUnmounted(() => window.removeEventListener('mousedown', handler))
        })*/

    // @ts-expect-error Types of property 'dataRef' are incompatible.
    provide(ListviewContext, api)

    return () => {
      let slot = { disabled }
      return render({ props: passThroughProps, slot, slots, attrs })
    }
  },
})

// ---

export let ListviewOptions = defineComponent({
  name: 'ListviewOptions',
  props: {
    as: { type: [Object, String], default: 'div' },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
  },
  render() {
    let api = useListviewContext('ListviewOptions')

    let slot = { }
    let propsWeControl = {
      'aria-activedescendant':
        api.activeOptionIndex.value === null
          ? undefined
          : api.options.value[api.activeOptionIndex.value]?.id,
      id: this.id,
      onKeydown: this.handleKeyDown,
      role: 'listview',
      tabIndex: 0,
      ref: 'el',
    }
    let passThroughProps = this.$props

    return render({
      props: { ...passThroughProps, ...propsWeControl },
      slot,
      attrs: this.$attrs,
      slots: this.$slots,
      features: Features.RenderStrategy | Features.Static

    })
  },
  setup() {
    let api = useListviewContext('ListviewOptions')
    let id = `headlessui-listview-options-${useId()}`


    function handleKeyDown(event: KeyboardEvent) {

      switch (event.key) {
        // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-12

        // @ts-expect-error Fallthrough is expected here
        // When in type ahead mode, fallthrough
        case Keys.Enter:
          event.preventDefault()
          if (api.activeOptionIndex.value !== null) {
            let { dataRef } = api.options.value[api.activeOptionIndex.value]
            api.select(dataRef.value)
          }

          break

        case Keys.ArrowDown:
          event.preventDefault()
          return api.goToOption(Focus.Next)

        case Keys.ArrowUp:
          event.preventDefault()
          return api.goToOption(Focus.Previous)

        case Keys.ArrowRight:
          event.preventDefault()
          return api.goToOption(Focus.Next)

        case Keys.ArrowLeft:
          event.preventDefault()
          return api.goToOption(Focus.Previous)


        case Keys.Tab:
          return event.preventDefault()

        default:
          break
      }
    }

    return { id, el: api.optionsRef, handleKeyDown }
  },
})

export let ListviewOption = defineComponent({
  name: 'ListviewOption',
  props: {
    as: { type: [Object, String], default: 'template' },
    value: { type: [Object, String], default: null },
    disabled: { type: Boolean, default: false },
    class: { type: [String, Function], required: false },
    className: { type: [String, Function], required: false },
    index: { type: Number, default: null }
  },
  setup(props, { slots, attrs }) {
    let api = useListviewContext('ListviewOption')
    let id = `headlessui-listview-option-${useId()}`
    let { disabled, class: defaultClass, className = defaultClass, value } = props

    let active = computed(() => {
      return api.activeOptionIndex.value !== null
        ? api.options.value[api.activeOptionIndex.value].id === id
        : false
    })

    let selected = computed(() => {
      const rawApiValue = toRaw(api.value.value)
      const rawValue = toRaw(value)

      if (api.multiple) {
        return (rawApiValue as any[]).includes(rawValue)
      } else {
        return rawApiValue === rawValue
      }
    })

    let dataRef = ref<ListviewOptionDataRef['value']>({ disabled, value, textValue: '' })
    onMounted(() => {
      let textValue = document
        .getElementById(id)
        ?.textContent?.toLowerCase()
        .trim()
      if (textValue !== undefined) dataRef.value.textValue = textValue
    })

    onMounted(() => api.registerOption(id, dataRef))
    onUnmounted(() => api.unregisterOption(id))

    onMounted(() => {
      watch(
        [selected],
        () => {

          if (!selected.value) return
          if (api.multiple) return

          api.goToOption(Focus.Specific, id)
          document.getElementById(id)?.focus?.()
        },
        { immediate: true }
      )
    })

    watchEffect(() => {
      if (!active.value) return
      nextTick(() => document.getElementById(id)?.scrollIntoView?.({ block: 'nearest' }))
    })

    function handleClick(event: MouseEvent) {
      if (disabled) return event.preventDefault()
      api.select(value)
    }

    function handleFocus() {
      if (disabled) return api.goToOption(Focus.Nothing)
      api.goToOption(Focus.Specific, id)
    }

    function handleMove() {
      if (disabled) return
      if (active.value) return
      api.goToOption(Focus.Specific, id)
    }

    function handleLeave() {
      if (disabled) return
      if (!active.value) return
      api.goToOption(Focus.Nothing)
    }

    return () => {
      let slot = { active: active.value, selected: selected.value, disabled, index: props.index }
      let propsWeControl = {
        id,
        role: 'option',
        tabIndex: -1,
        class: resolvePropValue(className, slot),
        'aria-disabled': disabled === true ? true : undefined,
        'aria-selected': selected.value === true ? selected.value : undefined,
        onClick: handleClick,
        onFocus: handleFocus,
        onPointermove: handleMove,
        onMousemove: handleMove,
        onPointerleave: handleLeave,
        onMouseleave: handleLeave,
      }

      return render({ props: { ...props, ...propsWeControl }, slot, attrs, slots })
    }
  },
})