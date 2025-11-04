import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _imports_0$1 } from './virtual_public-D1aBSLhn.mjs';
import Button from './button-Cy1RM3F0.mjs';
import _sfc_main$2 from './input-BjW8rXgt.mjs';
import { _ as _sfc_main$1 } from './Label-08dQakc7.mjs';
import Select from './Select-BT9XQi4a.mjs';
import SelectTrigger from './SelectTrigger-CiNhqUX3.mjs';
import SelectContent from './SelectContent-BwhOjIc3.mjs';
import SelectItem from './SelectItem-RYQOH1xm.mjs';
import SelectValue from './SelectValue-BEkb05o4.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'class-variance-authority';
import './utils-BpV8ZjlK.mjs';
import 'radix-vue';
import 'lucide-vue-next';

const _imports_0 = publicAssetsURL("/svg/flags/pakistan.svg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PassportDetailsForm",
  __ssrInlineRender: true,
  props: {
    destination: {},
    travelerCount: {},
    initialPassportData: {}
  },
  emits: ["next", "back"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const passportDetails = ref([]);
    const expandedTravelers = ref({});
    const initializePassportDetails = () => {
      if (props.initialPassportData && props.initialPassportData.length > 0) {
        passportDetails.value = props.initialPassportData;
        expandedTravelers.value = { 0: true };
        return;
      }
      passportDetails.value = Array.from({ length: props.travelerCount }, () => ({
        nationality: "",
        passportNumber: "",
        expiryDate: "",
        expiryMonth: "",
        expiryYear: "",
        residenceCountry: "",
        hasSchengenVisa: ""
      }));
      expandedTravelers.value = { 0: true };
    };
    initializePassportDetails();
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const futureYears = Array.from({ length: 20 }, (_, i) => currentYear + i);
    const governmentFee = computed(() => {
      return passportDetails.value.length * 3667.16;
    });
    const handleSaveAndContinue = () => {
      const isValid = passportDetails.value.every(
        (p) => p.nationality && p.passportNumber && p.expiryDate && p.expiryMonth && p.expiryYear && p.residenceCountry && p.hasSchengenVisa
      );
      if (!isValid) {
        alert("Please fill in all required passport details for all travelers");
        return;
      }
      emit("next", { passportDetails: passportDetails.value });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "flex",
        style: { "gap": "14px" }
      }, _attrs))}><div class="flex-1 border rounded-xl" style="${ssrRenderStyle({ "border-color": "#E5E7EB", "padding": "24px" })}"><div class="mb-6"><h2 style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "18px", "line-height": "24px", "color": "#0B3947" })}"> Passport Details </h2><p style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "400", "font-size": "14px", "line-height": "20px", "color": "#6B7280" })}"> Enter the details as they appear on your passport. </p></div>`);
      if (passportDetails.value.length === 1) {
        _push(`<div><h3 class="mb-5" style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "24px", "color": "#0B3947" })}"> Traveler 1 </h3><div class="space-y-5"><div>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          htmlFor: "nationality-0",
          style: { "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Nationality on Passport `);
            } else {
              return [
                createTextVNode(" Nationality on Passport ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="relative mt-2">`);
        _push(ssrRenderComponent(Select, {
          modelValue: passportDetails.value[0].nationality,
          "onUpdate:modelValue": ($event) => passportDetails.value[0].nationality = $event
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(SelectTrigger, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(SelectValue, { placeholder: "Select nationality" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(SelectValue, { placeholder: "Select nationality" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(SelectContent, {
                class: "max-h-[300px] overflow-y-auto",
                position: "popper"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(SelectItem, { value: "Pakistan" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex items-center gap-2"${_scopeId3}><img${ssrRenderAttr("src", _imports_0)} alt="Pakistan" class="w-6 h-4"${_scopeId3}> Pakistan </div>`);
                        } else {
                          return [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("img", {
                                src: _imports_0,
                                alt: "Pakistan",
                                class: "w-6 h-4"
                              }),
                              createTextVNode(" Pakistan ")
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(SelectItem, { value: "Pakistan" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("img", {
                              src: _imports_0,
                              alt: "Pakistan",
                              class: "w-6 h-4"
                            }),
                            createTextVNode(" Pakistan ")
                          ])
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
                createVNode(SelectTrigger, null, {
                  default: withCtx(() => [
                    createVNode(SelectValue, { placeholder: "Select nationality" })
                  ]),
                  _: 1
                }),
                createVNode(SelectContent, {
                  class: "max-h-[300px] overflow-y-auto",
                  position: "popper"
                }, {
                  default: withCtx(() => [
                    createVNode(SelectItem, { value: "Pakistan" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode("img", {
                            src: _imports_0,
                            alt: "Pakistan",
                            class: "w-6 h-4"
                          }),
                          createTextVNode(" Pakistan ")
                        ])
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
        _push(`</div></div><div>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          htmlFor: "passportNumber-0",
          style: { "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Passport Number `);
            } else {
              return [
                createTextVNode(" Passport Number ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          id: "passportNumber-0",
          modelValue: passportDetails.value[0].passportNumber,
          "onUpdate:modelValue": ($event) => passportDetails.value[0].passportNumber = $event,
          placeholder: "382764527389429843",
          class: "mt-2"
        }, null, _parent));
        _push(`</div><div>`);
        _push(ssrRenderComponent(_sfc_main$1, { style: { "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" } }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Passport expiration date `);
            } else {
              return [
                createTextVNode(" Passport expiration date ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="grid grid-cols-3 gap-4 mt-2">`);
        _push(ssrRenderComponent(Select, {
          modelValue: passportDetails.value[0].expiryDate,
          "onUpdate:modelValue": ($event) => passportDetails.value[0].expiryDate = $event
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(SelectTrigger, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(SelectValue, { placeholder: "Date" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(SelectValue, { placeholder: "Date" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(SelectContent, {
                class: "max-h-[180px] overflow-y-auto",
                position: "popper"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(31, (day) => {
                      _push3(ssrRenderComponent(SelectItem, {
                        key: day,
                        value: day.toString()
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(day)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(day), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(), createBlock(Fragment, null, renderList(31, (day) => {
                        return createVNode(SelectItem, {
                          key: day,
                          value: day.toString()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(day), 1)
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 64))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(SelectTrigger, null, {
                  default: withCtx(() => [
                    createVNode(SelectValue, { placeholder: "Date" })
                  ]),
                  _: 1
                }),
                createVNode(SelectContent, {
                  class: "max-h-[180px] overflow-y-auto",
                  position: "popper"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(Fragment, null, renderList(31, (day) => {
                      return createVNode(SelectItem, {
                        key: day,
                        value: day.toString()
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(day), 1)
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 64))
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(Select, {
          modelValue: passportDetails.value[0].expiryMonth,
          "onUpdate:modelValue": ($event) => passportDetails.value[0].expiryMonth = $event
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(SelectTrigger, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(SelectValue, { placeholder: "Month" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(SelectValue, { placeholder: "Month" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(SelectContent, {
                class: "max-h-[250px] overflow-y-auto",
                position: "popper"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(SelectItem, { value: "1" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`January`);
                        } else {
                          return [
                            createTextVNode("January")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(SelectItem, { value: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`February`);
                        } else {
                          return [
                            createTextVNode("February")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(SelectItem, { value: "3" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`March`);
                        } else {
                          return [
                            createTextVNode("March")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(SelectItem, { value: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`April`);
                        } else {
                          return [
                            createTextVNode("April")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(SelectItem, { value: "5" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`May`);
                        } else {
                          return [
                            createTextVNode("May")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(SelectItem, { value: "6" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`June`);
                        } else {
                          return [
                            createTextVNode("June")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(SelectItem, { value: "7" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`July`);
                        } else {
                          return [
                            createTextVNode("July")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(SelectItem, { value: "8" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`August`);
                        } else {
                          return [
                            createTextVNode("August")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(SelectItem, { value: "9" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`September`);
                        } else {
                          return [
                            createTextVNode("September")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(SelectItem, { value: "10" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`October`);
                        } else {
                          return [
                            createTextVNode("October")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(SelectItem, { value: "11" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`November`);
                        } else {
                          return [
                            createTextVNode("November")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(SelectItem, { value: "12" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`December`);
                        } else {
                          return [
                            createTextVNode("December")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(SelectItem, { value: "1" }, {
                        default: withCtx(() => [
                          createTextVNode("January")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "2" }, {
                        default: withCtx(() => [
                          createTextVNode("February")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "3" }, {
                        default: withCtx(() => [
                          createTextVNode("March")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "4" }, {
                        default: withCtx(() => [
                          createTextVNode("April")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "5" }, {
                        default: withCtx(() => [
                          createTextVNode("May")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "6" }, {
                        default: withCtx(() => [
                          createTextVNode("June")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "7" }, {
                        default: withCtx(() => [
                          createTextVNode("July")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "8" }, {
                        default: withCtx(() => [
                          createTextVNode("August")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "9" }, {
                        default: withCtx(() => [
                          createTextVNode("September")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "10" }, {
                        default: withCtx(() => [
                          createTextVNode("October")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "11" }, {
                        default: withCtx(() => [
                          createTextVNode("November")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "12" }, {
                        default: withCtx(() => [
                          createTextVNode("December")
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
                createVNode(SelectTrigger, null, {
                  default: withCtx(() => [
                    createVNode(SelectValue, { placeholder: "Month" })
                  ]),
                  _: 1
                }),
                createVNode(SelectContent, {
                  class: "max-h-[250px] overflow-y-auto",
                  position: "popper"
                }, {
                  default: withCtx(() => [
                    createVNode(SelectItem, { value: "1" }, {
                      default: withCtx(() => [
                        createTextVNode("January")
                      ]),
                      _: 1
                    }),
                    createVNode(SelectItem, { value: "2" }, {
                      default: withCtx(() => [
                        createTextVNode("February")
                      ]),
                      _: 1
                    }),
                    createVNode(SelectItem, { value: "3" }, {
                      default: withCtx(() => [
                        createTextVNode("March")
                      ]),
                      _: 1
                    }),
                    createVNode(SelectItem, { value: "4" }, {
                      default: withCtx(() => [
                        createTextVNode("April")
                      ]),
                      _: 1
                    }),
                    createVNode(SelectItem, { value: "5" }, {
                      default: withCtx(() => [
                        createTextVNode("May")
                      ]),
                      _: 1
                    }),
                    createVNode(SelectItem, { value: "6" }, {
                      default: withCtx(() => [
                        createTextVNode("June")
                      ]),
                      _: 1
                    }),
                    createVNode(SelectItem, { value: "7" }, {
                      default: withCtx(() => [
                        createTextVNode("July")
                      ]),
                      _: 1
                    }),
                    createVNode(SelectItem, { value: "8" }, {
                      default: withCtx(() => [
                        createTextVNode("August")
                      ]),
                      _: 1
                    }),
                    createVNode(SelectItem, { value: "9" }, {
                      default: withCtx(() => [
                        createTextVNode("September")
                      ]),
                      _: 1
                    }),
                    createVNode(SelectItem, { value: "10" }, {
                      default: withCtx(() => [
                        createTextVNode("October")
                      ]),
                      _: 1
                    }),
                    createVNode(SelectItem, { value: "11" }, {
                      default: withCtx(() => [
                        createTextVNode("November")
                      ]),
                      _: 1
                    }),
                    createVNode(SelectItem, { value: "12" }, {
                      default: withCtx(() => [
                        createTextVNode("December")
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
        _push(ssrRenderComponent(Select, {
          modelValue: passportDetails.value[0].expiryYear,
          "onUpdate:modelValue": ($event) => passportDetails.value[0].expiryYear = $event
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(SelectTrigger, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(SelectValue, { placeholder: "Year" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(SelectValue, { placeholder: "Year" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(SelectContent, {
                class: "max-h-[300px] overflow-y-auto",
                position: "popper"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(futureYears), (year) => {
                      _push3(ssrRenderComponent(SelectItem, {
                        key: year,
                        value: year.toString()
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(year)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(year), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(futureYears), (year) => {
                        return openBlock(), createBlock(SelectItem, {
                          key: year,
                          value: year.toString()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(year), 1)
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(SelectTrigger, null, {
                  default: withCtx(() => [
                    createVNode(SelectValue, { placeholder: "Year" })
                  ]),
                  _: 1
                }),
                createVNode(SelectContent, {
                  class: "max-h-[300px] overflow-y-auto",
                  position: "popper"
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(futureYears), (year) => {
                      return openBlock(), createBlock(SelectItem, {
                        key: year,
                        value: year.toString()
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(year), 1)
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 128))
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          htmlFor: "residenceCountry-0",
          style: { "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Residence Country `);
            } else {
              return [
                createTextVNode(" Residence Country ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="relative mt-2">`);
        _push(ssrRenderComponent(Select, {
          modelValue: passportDetails.value[0].residenceCountry,
          "onUpdate:modelValue": ($event) => passportDetails.value[0].residenceCountry = $event
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(SelectTrigger, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(SelectValue, { placeholder: "Select country" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(SelectValue, { placeholder: "Select country" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(SelectContent, {
                class: "max-h-[300px] overflow-y-auto",
                position: "popper"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(SelectItem, { value: "Pakistan" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex items-center gap-2"${_scopeId3}><img${ssrRenderAttr("src", _imports_0)} alt="Pakistan" class="w-6 h-4"${_scopeId3}> Pakistan </div>`);
                        } else {
                          return [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("img", {
                                src: _imports_0,
                                alt: "Pakistan",
                                class: "w-6 h-4"
                              }),
                              createTextVNode(" Pakistan ")
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(SelectItem, { value: "Pakistan" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("img", {
                              src: _imports_0,
                              alt: "Pakistan",
                              class: "w-6 h-4"
                            }),
                            createTextVNode(" Pakistan ")
                          ])
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
                createVNode(SelectTrigger, null, {
                  default: withCtx(() => [
                    createVNode(SelectValue, { placeholder: "Select country" })
                  ]),
                  _: 1
                }),
                createVNode(SelectContent, {
                  class: "max-h-[300px] overflow-y-auto",
                  position: "popper"
                }, {
                  default: withCtx(() => [
                    createVNode(SelectItem, { value: "Pakistan" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode("img", {
                            src: _imports_0,
                            alt: "Pakistan",
                            class: "w-6 h-4"
                          }),
                          createTextVNode(" Pakistan ")
                        ])
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
        _push(`</div></div><div style="${ssrRenderStyle({ "gap": "8px", "display": "flex", "flex-direction": "column" })}">`);
        _push(ssrRenderComponent(_sfc_main$1, { style: { "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" } }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Do you have a valid visa or residence permit from the Schengen Area, USA, Australia, Canada, UK, Japan, Norway, New Zealand, Ireland, or Switzerland? `);
            } else {
              return [
                createTextVNode(" Do you have a valid visa or residence permit from the Schengen Area, USA, Australia, Canada, UK, Japan, Norway, New Zealand, Ireland, or Switzerland? ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(Select, {
          modelValue: passportDetails.value[0].hasSchengenVisa,
          "onUpdate:modelValue": ($event) => passportDetails.value[0].hasSchengenVisa = $event
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(SelectTrigger, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(SelectValue, { placeholder: "Select" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(SelectValue, { placeholder: "Select" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(SelectContent, { position: "popper" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(SelectItem, { value: "yes" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Yes`);
                        } else {
                          return [
                            createTextVNode("Yes")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(SelectItem, { value: "no" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`No`);
                        } else {
                          return [
                            createTextVNode("No")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(SelectItem, { value: "yes" }, {
                        default: withCtx(() => [
                          createTextVNode("Yes")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "no" }, {
                        default: withCtx(() => [
                          createTextVNode("No")
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
                createVNode(SelectTrigger, null, {
                  default: withCtx(() => [
                    createVNode(SelectValue, { placeholder: "Select" })
                  ]),
                  _: 1
                }),
                createVNode(SelectContent, { position: "popper" }, {
                  default: withCtx(() => [
                    createVNode(SelectItem, { value: "yes" }, {
                      default: withCtx(() => [
                        createTextVNode("Yes")
                      ]),
                      _: 1
                    }),
                    createVNode(SelectItem, { value: "no" }, {
                      default: withCtx(() => [
                        createTextVNode("No")
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
        _push(`</div></div></div>`);
      } else {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(passportDetails.value, (traveler, index) => {
          _push(`<div class="border" style="${ssrRenderStyle({ "height": "auto", "border-width": "1px", "border-color": "#E5E7EB", "border-radius": "12px" })}"><button class="w-full flex items-center justify-between text-left hover:bg-gray-50 transition-colors" style="${ssrRenderStyle({ "padding": "24px" })}" type="button"><h3 style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "24px", "color": "#0B3947" })}"> Traveler ${ssrInterpolate(index + 1)}</h3><svg class="${ssrRenderClass([{ "rotate-180": expandedTravelers.value[index] }, "w-5 h-5 transition-transform"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div style="${ssrRenderStyle([
            { "padding": "0 24px 24px 24px" },
            expandedTravelers.value[index] ? null : { display: "none" }
          ])}"><div class="space-y-5"><div>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            htmlFor: `nationality-${index}`,
            style: { "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Nationality on Passport `);
              } else {
                return [
                  createTextVNode(" Nationality on Passport ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="relative mt-2">`);
          _push(ssrRenderComponent(Select, {
            modelValue: traveler.nationality,
            "onUpdate:modelValue": ($event) => traveler.nationality = $event
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(SelectTrigger, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(SelectValue, { placeholder: "Select nationality" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(SelectValue, { placeholder: "Select nationality" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(SelectContent, {
                  class: "max-h-[300px] overflow-y-auto",
                  position: "popper"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(SelectItem, { value: "Pakistan" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="flex items-center gap-2"${_scopeId3}><img${ssrRenderAttr("src", _imports_0)} alt="Pakistan" class="w-6 h-4"${_scopeId3}> Pakistan </div>`);
                          } else {
                            return [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode("img", {
                                  src: _imports_0,
                                  alt: "Pakistan",
                                  class: "w-6 h-4"
                                }),
                                createTextVNode(" Pakistan ")
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(SelectItem, { value: "Pakistan" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("img", {
                                src: _imports_0,
                                alt: "Pakistan",
                                class: "w-6 h-4"
                              }),
                              createTextVNode(" Pakistan ")
                            ])
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(SelectTrigger, null, {
                    default: withCtx(() => [
                      createVNode(SelectValue, { placeholder: "Select nationality" })
                    ]),
                    _: 1
                  }),
                  createVNode(SelectContent, {
                    class: "max-h-[300px] overflow-y-auto",
                    position: "popper"
                  }, {
                    default: withCtx(() => [
                      createVNode(SelectItem, { value: "Pakistan" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("img", {
                              src: _imports_0,
                              alt: "Pakistan",
                              class: "w-6 h-4"
                            }),
                            createTextVNode(" Pakistan ")
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div><div>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            htmlFor: `passportNumber-${index}`,
            style: { "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Passport Number `);
              } else {
                return [
                  createTextVNode(" Passport Number ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(ssrRenderComponent(_sfc_main$2, {
            id: `passportNumber-${index}`,
            modelValue: traveler.passportNumber,
            "onUpdate:modelValue": ($event) => traveler.passportNumber = $event,
            placeholder: "382764527389429843",
            class: "mt-2"
          }, null, _parent));
          _push(`</div><div>`);
          _push(ssrRenderComponent(_sfc_main$1, { style: { "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" } }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Passport expiration date `);
              } else {
                return [
                  createTextVNode(" Passport expiration date ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="grid grid-cols-3 gap-4 mt-2">`);
          _push(ssrRenderComponent(Select, {
            modelValue: traveler.expiryDate,
            "onUpdate:modelValue": ($event) => traveler.expiryDate = $event
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(SelectTrigger, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(SelectValue, { placeholder: "Date" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(SelectValue, { placeholder: "Date" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(SelectContent, {
                  class: "max-h-[180px] overflow-y-auto",
                  position: "popper"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<!--[-->`);
                      ssrRenderList(31, (day) => {
                        _push3(ssrRenderComponent(SelectItem, {
                          key: day,
                          value: day.toString()
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(day)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(day), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      });
                      _push3(`<!--]-->`);
                    } else {
                      return [
                        (openBlock(), createBlock(Fragment, null, renderList(31, (day) => {
                          return createVNode(SelectItem, {
                            key: day,
                            value: day.toString()
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(day), 1)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 64))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(SelectTrigger, null, {
                    default: withCtx(() => [
                      createVNode(SelectValue, { placeholder: "Date" })
                    ]),
                    _: 1
                  }),
                  createVNode(SelectContent, {
                    class: "max-h-[180px] overflow-y-auto",
                    position: "popper"
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(31, (day) => {
                        return createVNode(SelectItem, {
                          key: day,
                          value: day.toString()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(day), 1)
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 64))
                    ]),
                    _: 2
                  }, 1024)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(ssrRenderComponent(Select, {
            modelValue: traveler.expiryMonth,
            "onUpdate:modelValue": ($event) => traveler.expiryMonth = $event
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(SelectTrigger, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(SelectValue, { placeholder: "Month" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(SelectValue, { placeholder: "Month" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(SelectContent, {
                  class: "max-h-[250px] overflow-y-auto",
                  position: "popper"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(SelectItem, { value: "1" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`January`);
                          } else {
                            return [
                              createTextVNode("January")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(SelectItem, { value: "2" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`February`);
                          } else {
                            return [
                              createTextVNode("February")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(SelectItem, { value: "3" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`March`);
                          } else {
                            return [
                              createTextVNode("March")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(SelectItem, { value: "4" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`April`);
                          } else {
                            return [
                              createTextVNode("April")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(SelectItem, { value: "5" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`May`);
                          } else {
                            return [
                              createTextVNode("May")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(SelectItem, { value: "6" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`June`);
                          } else {
                            return [
                              createTextVNode("June")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(SelectItem, { value: "7" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`July`);
                          } else {
                            return [
                              createTextVNode("July")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(SelectItem, { value: "8" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`August`);
                          } else {
                            return [
                              createTextVNode("August")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(SelectItem, { value: "9" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`September`);
                          } else {
                            return [
                              createTextVNode("September")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(SelectItem, { value: "10" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`October`);
                          } else {
                            return [
                              createTextVNode("October")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(SelectItem, { value: "11" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`November`);
                          } else {
                            return [
                              createTextVNode("November")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(SelectItem, { value: "12" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`December`);
                          } else {
                            return [
                              createTextVNode("December")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(SelectItem, { value: "1" }, {
                          default: withCtx(() => [
                            createTextVNode("January")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "2" }, {
                          default: withCtx(() => [
                            createTextVNode("February")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "3" }, {
                          default: withCtx(() => [
                            createTextVNode("March")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "4" }, {
                          default: withCtx(() => [
                            createTextVNode("April")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "5" }, {
                          default: withCtx(() => [
                            createTextVNode("May")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "6" }, {
                          default: withCtx(() => [
                            createTextVNode("June")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "7" }, {
                          default: withCtx(() => [
                            createTextVNode("July")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "8" }, {
                          default: withCtx(() => [
                            createTextVNode("August")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "9" }, {
                          default: withCtx(() => [
                            createTextVNode("September")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "10" }, {
                          default: withCtx(() => [
                            createTextVNode("October")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "11" }, {
                          default: withCtx(() => [
                            createTextVNode("November")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "12" }, {
                          default: withCtx(() => [
                            createTextVNode("December")
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(SelectTrigger, null, {
                    default: withCtx(() => [
                      createVNode(SelectValue, { placeholder: "Month" })
                    ]),
                    _: 1
                  }),
                  createVNode(SelectContent, {
                    class: "max-h-[250px] overflow-y-auto",
                    position: "popper"
                  }, {
                    default: withCtx(() => [
                      createVNode(SelectItem, { value: "1" }, {
                        default: withCtx(() => [
                          createTextVNode("January")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "2" }, {
                        default: withCtx(() => [
                          createTextVNode("February")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "3" }, {
                        default: withCtx(() => [
                          createTextVNode("March")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "4" }, {
                        default: withCtx(() => [
                          createTextVNode("April")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "5" }, {
                        default: withCtx(() => [
                          createTextVNode("May")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "6" }, {
                        default: withCtx(() => [
                          createTextVNode("June")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "7" }, {
                        default: withCtx(() => [
                          createTextVNode("July")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "8" }, {
                        default: withCtx(() => [
                          createTextVNode("August")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "9" }, {
                        default: withCtx(() => [
                          createTextVNode("September")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "10" }, {
                        default: withCtx(() => [
                          createTextVNode("October")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "11" }, {
                        default: withCtx(() => [
                          createTextVNode("November")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "12" }, {
                        default: withCtx(() => [
                          createTextVNode("December")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(ssrRenderComponent(Select, {
            modelValue: traveler.expiryYear,
            "onUpdate:modelValue": ($event) => traveler.expiryYear = $event
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(SelectTrigger, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(SelectValue, { placeholder: "Year" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(SelectValue, { placeholder: "Year" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(SelectContent, {
                  class: "max-h-[300px] overflow-y-auto",
                  position: "popper"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<!--[-->`);
                      ssrRenderList(unref(futureYears), (year) => {
                        _push3(ssrRenderComponent(SelectItem, {
                          key: year,
                          value: year.toString()
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(year)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(year), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      });
                      _push3(`<!--]-->`);
                    } else {
                      return [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(futureYears), (year) => {
                          return openBlock(), createBlock(SelectItem, {
                            key: year,
                            value: year.toString()
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(year), 1)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 128))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(SelectTrigger, null, {
                    default: withCtx(() => [
                      createVNode(SelectValue, { placeholder: "Year" })
                    ]),
                    _: 1
                  }),
                  createVNode(SelectContent, {
                    class: "max-h-[300px] overflow-y-auto",
                    position: "popper"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(futureYears), (year) => {
                        return openBlock(), createBlock(SelectItem, {
                          key: year,
                          value: year.toString()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(year), 1)
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 128))
                    ]),
                    _: 2
                  }, 1024)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div><div>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            htmlFor: `residenceCountry-${index}`,
            style: { "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Residence Country `);
              } else {
                return [
                  createTextVNode(" Residence Country ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="relative mt-2">`);
          _push(ssrRenderComponent(Select, {
            modelValue: traveler.residenceCountry,
            "onUpdate:modelValue": ($event) => traveler.residenceCountry = $event
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(SelectTrigger, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(SelectValue, { placeholder: "Select country" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(SelectValue, { placeholder: "Select country" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(SelectContent, {
                  class: "max-h-[300px] overflow-y-auto",
                  position: "popper"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(SelectItem, { value: "Pakistan" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="flex items-center gap-2"${_scopeId3}><img${ssrRenderAttr("src", _imports_0)} alt="Pakistan" class="w-6 h-4"${_scopeId3}> Pakistan </div>`);
                          } else {
                            return [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode("img", {
                                  src: _imports_0,
                                  alt: "Pakistan",
                                  class: "w-6 h-4"
                                }),
                                createTextVNode(" Pakistan ")
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(SelectItem, { value: "Pakistan" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("img", {
                                src: _imports_0,
                                alt: "Pakistan",
                                class: "w-6 h-4"
                              }),
                              createTextVNode(" Pakistan ")
                            ])
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(SelectTrigger, null, {
                    default: withCtx(() => [
                      createVNode(SelectValue, { placeholder: "Select country" })
                    ]),
                    _: 1
                  }),
                  createVNode(SelectContent, {
                    class: "max-h-[300px] overflow-y-auto",
                    position: "popper"
                  }, {
                    default: withCtx(() => [
                      createVNode(SelectItem, { value: "Pakistan" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("img", {
                              src: _imports_0,
                              alt: "Pakistan",
                              class: "w-6 h-4"
                            }),
                            createTextVNode(" Pakistan ")
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div><div style="${ssrRenderStyle({ "gap": "8px", "display": "flex", "flex-direction": "column" })}">`);
          _push(ssrRenderComponent(_sfc_main$1, { style: { "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" } }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Do you have a valid visa or residence permit from the Schengen Area, USA, Australia, Canada, UK, Japan, Norway, New Zealand, Ireland, or Switzerland? `);
              } else {
                return [
                  createTextVNode(" Do you have a valid visa or residence permit from the Schengen Area, USA, Australia, Canada, UK, Japan, Norway, New Zealand, Ireland, or Switzerland? ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(ssrRenderComponent(Select, {
            modelValue: traveler.hasSchengenVisa,
            "onUpdate:modelValue": ($event) => traveler.hasSchengenVisa = $event
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(SelectTrigger, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(SelectValue, { placeholder: "Select" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(SelectValue, { placeholder: "Select" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(SelectContent, { position: "popper" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(SelectItem, { value: "yes" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Yes`);
                          } else {
                            return [
                              createTextVNode("Yes")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(SelectItem, { value: "no" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`No`);
                          } else {
                            return [
                              createTextVNode("No")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(SelectItem, { value: "yes" }, {
                          default: withCtx(() => [
                            createTextVNode("Yes")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "no" }, {
                          default: withCtx(() => [
                            createTextVNode("No")
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(SelectTrigger, null, {
                    default: withCtx(() => [
                      createVNode(SelectValue, { placeholder: "Select" })
                    ]),
                    _: 1
                  }),
                  createVNode(SelectContent, { position: "popper" }, {
                    default: withCtx(() => [
                      createVNode(SelectItem, { value: "yes" }, {
                        default: withCtx(() => [
                          createTextVNode("Yes")
                        ]),
                        _: 1
                      }),
                      createVNode(SelectItem, { value: "no" }, {
                        default: withCtx(() => [
                          createTextVNode("No")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div><div class="w-[400px] space-y-4"><div class="border-2 rounded-xl p-6" style="${ssrRenderStyle({ "border-color": "#1ECE84" })}"><div class="space-y-4"><div class="flex justify-between items-center"><span style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "24px", "color": "#0B3947" })}">${ssrInterpolate(__props.destination)} Visa </span><div class="flex justify-end"><span style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "400", "font-size": "14px", "line-height": "20px", "color": "#27272B" })}">${ssrInterpolate(passportDetails.value.length)} traveler${ssrInterpolate(passportDetails.value.length > 1 ? "s" : "")}</span></div></div><div class="flex justify-between items-center"><span style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "20px", "color": "#0B3947" })}"> Government Fee </span><div class="flex justify-end"><span style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "400", "font-size": "14px", "line-height": "20px", "color": "#27272B" })}"> Rs ${ssrInterpolate(governmentFee.value.toFixed(2))}</span></div></div><div class="border-t" style="${ssrRenderStyle({ "border-color": "#E5E7EB" })}"></div><div class="flex justify-between items-center"><span style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "600", "font-size": "16px", "line-height": "24px", "color": "#0B3947" })}"> Total </span><div class="flex justify-end"><span style="${ssrRenderStyle({ "font-family": "geist", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#27272B" })}"> Calculated at checkout </span></div></div></div></div>`);
      _push(ssrRenderComponent(Button, {
        onClick: handleSaveAndContinue,
        class: "w-full h-12",
        style: { "background-color": "#1ECE84", "color": "white", "border-radius": "6px", "font-family": "Geist", "font-weight": "500", "font-size": "14px", "line-height": "24px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Save &amp; Continue `);
          } else {
            return [
              createTextVNode(" Save & Continue ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="border rounded-xl p-4" style="${ssrRenderStyle({ "border-color": "#E5E7EB" })}"><div class="flex items-start gap-3"><img${ssrRenderAttr("src", _imports_0$1)} alt="Security" style="${ssrRenderStyle({ "width": "19.2px", "height": "19.2px" })}"><p style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "500", "font-size": "16px", "line-height": "20px", "color": "#3E3E3E" })}"> We take strong measures to protect your information </p></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/visa/PassportDetailsForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PassportDetailsForm = Object.assign(_sfc_main, { __name: "VisaPassportDetailsForm" });

export { PassportDetailsForm as default };
//# sourceMappingURL=PassportDetailsForm-BexLPiCS.mjs.map
