import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-D1aBSLhn.mjs';
import Button from './button-Cy1RM3F0.mjs';
import _sfc_main$2 from './input-BjW8rXgt.mjs';
import { _ as _sfc_main$1 } from './Label-08dQakc7.mjs';
import Select from './Select-BT9XQi4a.mjs';
import SelectTrigger from './SelectTrigger-CiNhqUX3.mjs';
import SelectContent from './SelectContent-BwhOjIc3.mjs';
import SelectItem from './SelectItem-RYQOH1xm.mjs';
import SelectValue from './SelectValue-BEkb05o4.mjs';
import Checkbox from './Checkbox-Dghd6ShO.mjs';
import '../routes/renderer.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "YourInfoForm",
  __ssrInlineRender: true,
  props: {
    destination: {},
    initialTravelerCount: {},
    initialTravelersData: {}
  },
  emits: ["next", "back"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const travelers = ref([]);
    const expandedTravelers = ref({});
    const initializeTravelers = () => {
      if (props.initialTravelersData && props.initialTravelersData.length > 0) {
        travelers.value = props.initialTravelersData;
        expandedTravelers.value = { 0: true };
        return;
      }
      const count = props.initialTravelerCount || 1;
      travelers.value = Array.from({ length: count }, () => ({
        firstName: "",
        lastName: "",
        birthDate: "",
        birthMonth: "",
        birthYear: "",
        email: "",
        receiveUpdates: false
      }));
      expandedTravelers.value = { 0: true };
    };
    initializeTravelers();
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
    const governmentFee = computed(() => {
      return travelers.value.length * 3667.16;
    });
    const addTraveler = () => {
      const newIndex = travelers.value.length;
      travelers.value.push({
        firstName: "",
        lastName: "",
        birthDate: "",
        birthMonth: "",
        birthYear: "",
        email: "",
        receiveUpdates: false
      });
      expandedTravelers.value[newIndex] = true;
    };
    const removeTraveler = (index) => {
      travelers.value.splice(index, 1);
      const newExpanded = {};
      Object.keys(expandedTravelers.value).forEach((key) => {
        const keyNum = parseInt(key);
        if (keyNum < index) {
          newExpanded[keyNum] = expandedTravelers.value[keyNum];
        } else if (keyNum > index) {
          newExpanded[keyNum - 1] = expandedTravelers.value[keyNum];
        }
      });
      expandedTravelers.value = newExpanded;
    };
    const handleSaveAndContinue = () => {
      const isValid = travelers.value.every(
        (t) => t.firstName && t.lastName && t.birthDate && t.birthMonth && t.birthYear && t.email
      );
      if (!isValid) {
        alert("Please fill in all required fields for all travelers");
        return;
      }
      emit("next", { travelers: travelers.value });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "flex",
        style: { "gap": "14px" }
      }, _attrs))}><div class="flex-1 border rounded-xl" style="${ssrRenderStyle({ "border-color": "#E5E7EB", "padding": "24px" })}"><div class="mb-6"><h2 style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "18px", "line-height": "24px", "color": "#0B3947" })}"> Your Personal Details </h2><p style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "400", "font-size": "14px", "line-height": "20px", "color": "#6B7280" })}"> Enter the details as they appear on your passport. </p></div>`);
      if (travelers.value.length === 1) {
        _push(`<div><h3 class="mb-5" style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "24px", "color": "#0B3947" })}"> Traveler 1 </h3><div class="space-y-5"><div>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          htmlFor: "firstName-0",
          style: { "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` First and Middle Name `);
            } else {
              return [
                createTextVNode(" First and Middle Name ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          id: "firstName-0",
          modelValue: travelers.value[0].firstName,
          "onUpdate:modelValue": ($event) => travelers.value[0].firstName = $event,
          placeholder: "John",
          class: "mt-2"
        }, null, _parent));
        _push(`</div><div>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          htmlFor: "lastName-0",
          style: { "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Last Name `);
            } else {
              return [
                createTextVNode(" Last Name ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          id: "lastName-0",
          modelValue: travelers.value[0].lastName,
          "onUpdate:modelValue": ($event) => travelers.value[0].lastName = $event,
          placeholder: "Doe",
          class: "mt-2"
        }, null, _parent));
        _push(`</div><div>`);
        _push(ssrRenderComponent(_sfc_main$1, { style: { "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" } }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Date of Birth `);
            } else {
              return [
                createTextVNode(" Date of Birth ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="grid grid-cols-3 gap-4 mt-2">`);
        _push(ssrRenderComponent(Select, {
          modelValue: travelers.value[0].birthDate,
          "onUpdate:modelValue": ($event) => travelers.value[0].birthDate = $event
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
                position: "popper",
                sideOffset: 5
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
                  position: "popper",
                  sideOffset: 5
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
          modelValue: travelers.value[0].birthMonth,
          "onUpdate:modelValue": ($event) => travelers.value[0].birthMonth = $event
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
                position: "popper",
                sideOffset: 5
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
                  position: "popper",
                  sideOffset: 5
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
          modelValue: travelers.value[0].birthYear,
          "onUpdate:modelValue": ($event) => travelers.value[0].birthYear = $event
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
                position: "popper",
                sideOffset: 5
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(years), (year) => {
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
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(years), (year) => {
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
                  position: "popper",
                  sideOffset: 5
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(years), (year) => {
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
          htmlFor: "email-0",
          style: { "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Email Address `);
            } else {
              return [
                createTextVNode(" Email Address ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          id: "email-0",
          modelValue: travelers.value[0].email,
          "onUpdate:modelValue": ($event) => travelers.value[0].email = $event,
          type: "email",
          placeholder: "johnd@gmail.com",
          class: "mt-2"
        }, null, _parent));
        _push(`<p style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "400", "font-size": "12px", "line-height": "16px", "color": "#6B7280" })}" class="mt-1"> Your approved ${ssrInterpolate(__props.destination)} Visa will be sent to this email address. </p></div><div class="flex items-start gap-2">`);
        _push(ssrRenderComponent(Checkbox, {
          id: "newsletter-0",
          checked: travelers.value[0].receiveUpdates,
          "onUpdate:checked": ($event) => travelers.value[0].receiveUpdates = $event,
          class: "mt-1"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1, {
          htmlFor: "newsletter-0",
          style: { "font-family": "Inter", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" },
          class: "cursor-pointer"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` I want to receive VISA123&#39;S updates, product launches and personalized offers. I can opt out anytime. Terms and Privacy Policy apply. `);
            } else {
              return [
                createTextVNode(" I want to receive VISA123'S updates, product launches and personalized offers. I can opt out anytime. Terms and Privacy Policy apply. ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(travelers.value, (traveler, index) => {
          _push(`<div class="border" style="${ssrRenderStyle({ "height": "auto", "border-width": "1px", "border-color": "#E5E7EB", "border-radius": "12px" })}"><button class="w-full flex items-center justify-between text-left hover:bg-gray-50 transition-colors" style="${ssrRenderStyle({ "padding": "24px" })}" type="button"><h3 style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "24px", "color": "#0B3947" })}"> Traveler ${ssrInterpolate(index + 1)}</h3><svg class="${ssrRenderClass([{ "rotate-180": expandedTravelers.value[index] }, "w-5 h-5 transition-transform"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div style="${ssrRenderStyle([
            { "padding": "0 24px 24px 24px" },
            expandedTravelers.value[index] ? null : { display: "none" }
          ])}"><div class="space-y-5"><div>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            htmlFor: `firstName-${index}`,
            style: { "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` First and Middle Name `);
              } else {
                return [
                  createTextVNode(" First and Middle Name ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(ssrRenderComponent(_sfc_main$2, {
            id: `firstName-${index}`,
            modelValue: traveler.firstName,
            "onUpdate:modelValue": ($event) => traveler.firstName = $event,
            placeholder: "John",
            class: "mt-2"
          }, null, _parent));
          _push(`</div><div>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            htmlFor: `lastName-${index}`,
            style: { "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Last Name `);
              } else {
                return [
                  createTextVNode(" Last Name ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(ssrRenderComponent(_sfc_main$2, {
            id: `lastName-${index}`,
            modelValue: traveler.lastName,
            "onUpdate:modelValue": ($event) => traveler.lastName = $event,
            placeholder: "Doe",
            class: "mt-2"
          }, null, _parent));
          _push(`</div><div>`);
          _push(ssrRenderComponent(_sfc_main$1, { style: { "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" } }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Date of Birth `);
              } else {
                return [
                  createTextVNode(" Date of Birth ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="grid grid-cols-3 gap-4 mt-2">`);
          _push(ssrRenderComponent(Select, {
            modelValue: traveler.birthDate,
            "onUpdate:modelValue": ($event) => traveler.birthDate = $event
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
                  position: "popper",
                  sideOffset: 5
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
                    position: "popper",
                    sideOffset: 5
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
            modelValue: traveler.birthMonth,
            "onUpdate:modelValue": ($event) => traveler.birthMonth = $event
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
                  position: "popper",
                  sideOffset: 5
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
                    position: "popper",
                    sideOffset: 5
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
            modelValue: traveler.birthYear,
            "onUpdate:modelValue": ($event) => traveler.birthYear = $event
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
                  position: "popper",
                  sideOffset: 5
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<!--[-->`);
                      ssrRenderList(unref(years), (year) => {
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
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(years), (year) => {
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
                    position: "popper",
                    sideOffset: 5
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(years), (year) => {
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
            htmlFor: `email-${index}`,
            style: { "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Email Address `);
              } else {
                return [
                  createTextVNode(" Email Address ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(ssrRenderComponent(_sfc_main$2, {
            id: `email-${index}`,
            modelValue: traveler.email,
            "onUpdate:modelValue": ($event) => traveler.email = $event,
            type: "email",
            placeholder: "johnd@gmail.com",
            class: "mt-2"
          }, null, _parent));
          _push(`<p style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "400", "font-size": "12px", "line-height": "16px", "color": "#6B7280" })}" class="mt-1"> Your approved ${ssrInterpolate(__props.destination)} Visa will be sent to this email address. </p></div>`);
          if (index === 0) {
            _push(`<div class="flex items-start gap-2">`);
            _push(ssrRenderComponent(Checkbox, {
              id: `newsletter-${index}`,
              checked: traveler.receiveUpdates,
              "onUpdate:checked": ($event) => traveler.receiveUpdates = $event,
              class: "mt-1"
            }, null, _parent));
            _push(ssrRenderComponent(_sfc_main$1, {
              htmlFor: `newsletter-${index}`,
              style: { "font-family": "Inter", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" },
              class: "cursor-pointer"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` I want to receive VISA123&#39;S updates, product launches and personalized offers. I can opt out anytime. Terms and Privacy Policy apply. `);
                } else {
                  return [
                    createTextVNode(" I want to receive VISA123'S updates, product launches and personalized offers. I can opt out anytime. Terms and Privacy Policy apply. ")
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div>`);
          _push(ssrRenderComponent(Button, {
            onClick: ($event) => removeTraveler(index),
            class: "w-auto",
            style: { "background-color": "#DC2626", "color": "white", "border-radius": "6px", "padding": "8px 16px", "font-family": "Geist", "font-weight": "500", "font-size": "14px", "line-height": "20px" }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Remove Traveler `);
              } else {
                return [
                  createTextVNode(" Remove Traveler ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div></div></div>`);
        });
        _push(`<!--]--><div class="mt-6">`);
        _push(ssrRenderComponent(Button, {
          onClick: addTraveler,
          class: "w-auto",
          style: { "background-color": "#1ECE84", "color": "white", "border-radius": "6px", "padding": "8px 16px", "font-family": "Geist", "font-weight": "500", "font-size": "14px", "line-height": "20px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Add Another traveler `);
            } else {
              return [
                createTextVNode(" Add Another traveler ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      }
      _push(`</div><div class="w-[400px] space-y-4"><div class="border-2 rounded-xl p-6" style="${ssrRenderStyle({ "border-color": "#1ECE84" })}"><div class="space-y-4"><div class="flex justify-between items-center"><span style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "24px", "color": "#0B3947" })}">${ssrInterpolate(__props.destination)} Visa </span><div class="flex justify-end"><span style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "400", "font-size": "14px", "line-height": "20px", "color": "#27272B" })}">${ssrInterpolate(travelers.value.length)} traveler${ssrInterpolate(travelers.value.length > 1 ? "s" : "")}</span></div></div><div class="flex justify-between items-center"><span style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "20px", "color": "#0B3947" })}"> Government Fee </span><div class="flex justify-end"><span style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "400", "font-size": "14px", "line-height": "20px", "color": "#27272B" })}"> Rs ${ssrInterpolate(governmentFee.value.toFixed(2))}</span></div></div><div class="border-t" style="${ssrRenderStyle({ "border-color": "#E5E7EB" })}"></div><div class="flex justify-between items-center"><span style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "600", "font-size": "16px", "line-height": "24px", "color": "#0B3947" })}"> Total </span><div class="flex justify-end"><span style="${ssrRenderStyle({ "font-family": "geist", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#27272B" })}"> Calculated at checkout </span></div></div></div></div>`);
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
      _push(`<div class="border rounded-xl p-4" style="${ssrRenderStyle({ "border-color": "#E5E7EB" })}"><div class="flex items-start gap-3"><img${ssrRenderAttr("src", _imports_0)} alt="Max stay" style="${ssrRenderStyle({ "width": "19.2px", "height": "19.2px" })}"><p style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "500", "font-size": "16px", "line-height": "20px", "color": "#3E3E3E" })}"> We take strong measures to protect your information </p></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/visa/YourInfoForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const YourInfoForm = Object.assign(_sfc_main, { __name: "VisaYourInfoForm" });

export { YourInfoForm as default };
//# sourceMappingURL=YourInfoForm-xoL2eVn8.mjs.map
