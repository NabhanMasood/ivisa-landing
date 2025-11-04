import { defineComponent, ref, watch, mergeProps, withCtx, createTextVNode, createBlock, openBlock, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import Button from './button-Cy1RM3F0.mjs';
import { _ as _sfc_main$1 } from './Label-08dQakc7.mjs';
import Select from './Select-BT9XQi4a.mjs';
import SelectTrigger from './SelectTrigger-CiNhqUX3.mjs';
import SelectContent from './SelectContent-BwhOjIc3.mjs';
import SelectItem from './SelectItem-RYQOH1xm.mjs';
import SelectValue from './SelectValue-BEkb05o4.mjs';
import 'class-variance-authority';
import './utils-BpV8ZjlK.mjs';
import 'radix-vue';
import 'lucide-vue-next';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TripInfoForm",
  __ssrInlineRender: true,
  props: {
    nationality: {},
    destination: {}
  },
  emits: ["next"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const formData = ref({
      nationality: props.nationality,
      visaType: "180-single",
      applicants: "1"
    });
    watch(() => props.nationality, (newNationality) => {
      if (newNationality) {
        formData.value.nationality = newNationality;
      }
    }, { immediate: true });
    const getCountryFlag = (country) => {
      const flags = {
        "United Arab Emirates": "🇦🇪",
        "United States": "🇺🇸",
        "India": "🇮🇳",
        "United Kingdom": "🇬🇧",
        "Canada": "🇨🇦",
        "Pakistan": "🇵🇰",
        "Morocco": "🇲🇦"
      };
      return flags[country] || "🏳️";
    };
    const handleNext = () => {
      emit("next", {
        nationality: formData.value.nationality,
        visaType: formData.value.visaType,
        applicants: parseInt(formData.value.applicants)
        // Convert to number
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "border rounded-xl p-6",
        style: { "border-color": "#E5E7EB" }
      }, _attrs))}><div class="mb-6"><p style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "14px", "line-height": "22px", "color": "#0B3947" })}"> The ${ssrInterpolate(__props.destination)} Visa is mandatory for ${ssrInterpolate(__props.nationality)} passport holders planning to enter ${ssrInterpolate(__props.destination)}</p></div><div class="space-y-6"><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        htmlFor: "nationality",
        style: { "font-family": "Manrope, sans-serif", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` What&#39;s your nationality? `);
          } else {
            return [
              createTextVNode(" What's your nationality? ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Select, {
        modelValue: formData.value.nationality,
        "onUpdate:modelValue": ($event) => formData.value.nationality = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, {
              id: "nationality",
              class: "w-full mt-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (formData.value.nationality) {
                          _push4(`<span${_scopeId3}>${ssrInterpolate(getCountryFlag(formData.value.nationality))} ${ssrInterpolate(formData.value.nationality)}</span>`);
                        } else {
                          _push4(`<span class="text-gray-500"${_scopeId3}>Select a country</span>`);
                        }
                      } else {
                        return [
                          formData.value.nationality ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(getCountryFlag(formData.value.nationality)) + " " + toDisplayString(formData.value.nationality), 1)) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "text-gray-500"
                          }, "Select a country"))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, null, {
                      default: withCtx(() => [
                        formData.value.nationality ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(getCountryFlag(formData.value.nationality)) + " " + toDisplayString(formData.value.nationality), 1)) : (openBlock(), createBlock("span", {
                          key: 1,
                          class: "text-gray-500"
                        }, "Select a country"))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectItem, { value: __props.nationality }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(getCountryFlag(__props.nationality))} ${ssrInterpolate(__props.nationality)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(getCountryFlag(__props.nationality)) + " " + toDisplayString(__props.nationality), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(SelectItem, { value: "United States" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`🇺🇸 United States`);
                      } else {
                        return [
                          createTextVNode("🇺🇸 United States")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(SelectItem, { value: "United Kingdom" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`🇬🇧 United Kingdom`);
                      } else {
                        return [
                          createTextVNode("🇬🇧 United Kingdom")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectItem, { value: __props.nationality }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(getCountryFlag(__props.nationality)) + " " + toDisplayString(__props.nationality), 1)
                      ]),
                      _: 1
                    }, 8, ["value"]),
                    createVNode(SelectItem, { value: "United States" }, {
                      default: withCtx(() => [
                        createTextVNode("🇺🇸 United States")
                      ]),
                      _: 1
                    }),
                    createVNode(SelectItem, { value: "United Kingdom" }, {
                      default: withCtx(() => [
                        createTextVNode("🇬🇧 United Kingdom")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(SelectTrigger, {
                id: "nationality",
                class: "w-full mt-2"
              }, {
                default: withCtx(() => [
                  createVNode(SelectValue, null, {
                    default: withCtx(() => [
                      formData.value.nationality ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(getCountryFlag(formData.value.nationality)) + " " + toDisplayString(formData.value.nationality), 1)) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "text-gray-500"
                      }, "Select a country"))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  createVNode(SelectItem, { value: __props.nationality }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(getCountryFlag(__props.nationality)) + " " + toDisplayString(__props.nationality), 1)
                    ]),
                    _: 1
                  }, 8, ["value"]),
                  createVNode(SelectItem, { value: "United States" }, {
                    default: withCtx(() => [
                      createTextVNode("🇺🇸 United States")
                    ]),
                    _: 1
                  }),
                  createVNode(SelectItem, { value: "United Kingdom" }, {
                    default: withCtx(() => [
                      createTextVNode("🇬🇧 United Kingdom")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1, { htmlFor: "visaType" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a href="#" style="${ssrRenderStyle({ "color": "#27272B", "font-family": "Manrope, sans-serif", "font-weight": "500", "font-size": "14px", "line-height": "20px" })}" class="hover:underline"${_scopeId}> Applying for </a>`);
          } else {
            return [
              createVNode("a", {
                href: "#",
                style: { "color": "#27272B", "font-family": "Manrope, sans-serif", "font-weight": "500", "font-size": "14px", "line-height": "20px" },
                class: "hover:underline"
              }, " Applying for ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Select, {
        modelValue: formData.value.visaType,
        "onUpdate:modelValue": ($event) => formData.value.visaType = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, {
              id: "visaType",
              class: "w-full mt-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectItem, { value: "180-single" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(__props.destination)} Visa - 180 days, Single entry`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(__props.destination) + " Visa - 180 days, Single entry", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(SelectItem, { value: "180-multiple" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(__props.destination)} Visa - 180 days, Multiple entry`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(__props.destination) + " Visa - 180 days, Multiple entry", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(SelectItem, { value: "90-single" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(__props.destination)} Visa - 90 days, Single entry`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(__props.destination) + " Visa - 90 days, Single entry", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectItem, { value: "180-single" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.destination) + " Visa - 180 days, Single entry", 1)
                      ]),
                      _: 1
                    }),
                    createVNode(SelectItem, { value: "180-multiple" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.destination) + " Visa - 180 days, Multiple entry", 1)
                      ]),
                      _: 1
                    }),
                    createVNode(SelectItem, { value: "90-single" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.destination) + " Visa - 90 days, Single entry", 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(SelectTrigger, {
                id: "visaType",
                class: "w-full mt-2"
              }, {
                default: withCtx(() => [
                  createVNode(SelectValue)
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  createVNode(SelectItem, { value: "180-single" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.destination) + " Visa - 180 days, Single entry", 1)
                    ]),
                    _: 1
                  }),
                  createVNode(SelectItem, { value: "180-multiple" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.destination) + " Visa - 180 days, Multiple entry", 1)
                    ]),
                    _: 1
                  }),
                  createVNode(SelectItem, { value: "90-single" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.destination) + " Visa - 90 days, Single entry", 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        htmlFor: "applicants",
        style: { "font-family": "Manrope, sans-serif", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Number of applicants `);
          } else {
            return [
              createTextVNode(" Number of applicants ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Select, {
        modelValue: formData.value.applicants,
        "onUpdate:modelValue": ($event) => formData.value.applicants = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, {
              id: "applicants",
              class: "w-full mt-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectItem, { value: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`1`);
                      } else {
                        return [
                          createTextVNode("1")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(SelectItem, { value: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`2`);
                      } else {
                        return [
                          createTextVNode("2")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(SelectItem, { value: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`3`);
                      } else {
                        return [
                          createTextVNode("3")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(SelectItem, { value: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`4`);
                      } else {
                        return [
                          createTextVNode("4")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(SelectItem, { value: "5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`5`);
                      } else {
                        return [
                          createTextVNode("5")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectItem, { value: "1" }, {
                      default: withCtx(() => [
                        createTextVNode("1")
                      ]),
                      _: 1
                    }),
                    createVNode(SelectItem, { value: "2" }, {
                      default: withCtx(() => [
                        createTextVNode("2")
                      ]),
                      _: 1
                    }),
                    createVNode(SelectItem, { value: "3" }, {
                      default: withCtx(() => [
                        createTextVNode("3")
                      ]),
                      _: 1
                    }),
                    createVNode(SelectItem, { value: "4" }, {
                      default: withCtx(() => [
                        createTextVNode("4")
                      ]),
                      _: 1
                    }),
                    createVNode(SelectItem, { value: "5" }, {
                      default: withCtx(() => [
                        createTextVNode("5")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(SelectTrigger, {
                id: "applicants",
                class: "w-full mt-2"
              }, {
                default: withCtx(() => [
                  createVNode(SelectValue)
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  createVNode(SelectItem, { value: "1" }, {
                    default: withCtx(() => [
                      createTextVNode("1")
                    ]),
                    _: 1
                  }),
                  createVNode(SelectItem, { value: "2" }, {
                    default: withCtx(() => [
                      createTextVNode("2")
                    ]),
                    _: 1
                  }),
                  createVNode(SelectItem, { value: "3" }, {
                    default: withCtx(() => [
                      createTextVNode("3")
                    ]),
                    _: 1
                  }),
                  createVNode(SelectItem, { value: "4" }, {
                    default: withCtx(() => [
                      createTextVNode("4")
                    ]),
                    _: 1
                  }),
                  createVNode(SelectItem, { value: "5" }, {
                    default: withCtx(() => [
                      createTextVNode("5")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(Button, {
        onClick: handleNext,
        class: "w-[143px] h-9",
        style: { "background-color": "#1ECE84", "color": "white", "border-radius": "6px", "padding": "8px 16px", "font-family": "Geist, sans-serif", "font-weight": "500", "font-size": "14px", "line-height": "20px", "text-align": "center" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Start Application `);
          } else {
            return [
              createTextVNode(" Start Application ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/visa/TripInfoForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TripInfoForm = Object.assign(_sfc_main, { __name: "VisaTripInfoForm" });

export { TripInfoForm as default };
//# sourceMappingURL=TripInfoForm-FYFMAowu.mjs.map
