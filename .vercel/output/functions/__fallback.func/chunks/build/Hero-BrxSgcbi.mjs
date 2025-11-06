import { defineComponent, ref, withCtx, createTextVNode, createBlock, openBlock, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _imports_1 } from './virtual_public-BKzO2WzG.mjs';
import Button from './button-Cy1RM3F0.mjs';
import Card from './Card-CXXOLw0c.mjs';
import CardContent from './CardContent-DLRaKZzq.mjs';
import { _ as _sfc_main$1 } from './Label-08dQakc7.mjs';
import Select from './Select-BT9XQi4a.mjs';
import SelectTrigger from './SelectTrigger-BwVa_K9-.mjs';
import SelectContent from './SelectContent-BojwDvXK.mjs';
import SelectItem from './SelectItem-RYQOH1xm.mjs';
import SelectValue from './SelectValue-BEkb05o4.mjs';
import { n as navigateTo } from './server.mjs';
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
import 'vue-router';

const _imports_0 = publicAssetsURL("/images/hero-bg.jpg");
const _imports_2 = publicAssetsURL("/logos/trust-pilot.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Hero",
  __ssrInlineRender: true,
  setup(__props) {
    const selectedFrom = ref("United Arab Emirates");
    const selectedTo = ref("United Kingdom");
    const getCountryFlag = (country) => {
      const flags = {
        "United Arab Emirates": "🇦🇪",
        "United States": "🇺🇸",
        "Pakistan": "🇵🇰",
        "United Kingdom": "🇬🇧",
        "Canada": "🇨🇦",
        "Morocco": "🇲🇦"
      };
      return flags[country] || "🏳️";
    };
    const handleGetStarted = () => {
      console.log("From:", selectedFrom.value);
      console.log("To:", selectedTo.value);
      navigateTo(`/visa-application?nationality=${encodeURIComponent(selectedFrom.value)}&destination=${encodeURIComponent(selectedTo.value)}`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="relative min-h-[calc(100vh-80px)] flex items-center justify-center w-full overflow-hidden"><div class="absolute inset-0 z-0"><img${ssrRenderAttr("src", _imports_0)} alt="" class="absolute inset-0 w-full h-full object-cover object-center"><div class="absolute inset-0 bg-black/5"></div></div><div class="relative z-20 container mx-auto max-w-6xl px-6 lg:px-8 text-center py-20"><div class="mb-12"><h1 class="text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-2xl"> Your Visa. Our Priority. </h1><p class="text-xl lg:text-2xl text-white/95 drop-shadow-lg"> Let us handle your visa any country, anywhere in the world. </p></div>`);
      _push(ssrRenderComponent(Card, {
        class: "!rounded-[24px] shadow-2xl mx-auto",
        style: { "width": "1008px", "height": "204.5px", "background": "rgba(231, 238, 233, 0.87)", "backdrop-filter": "blur(40px)", "-webkit-backdrop-filter": "blur(40px)", "border": "0" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(CardContent, { class: "p-8 lg:p-10" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-end"${_scopeId2}><div class="space-y-2 text-left"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    htmlFor: "from",
                    class: "text-gray-700 font-medium text-base"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Where am I from? `);
                      } else {
                        return [
                          createTextVNode(" Where am I from? ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(Select, {
                    modelValue: selectedFrom.value,
                    "onUpdate:modelValue": ($event) => selectedFrom.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(SelectTrigger, {
                          id: "from",
                          class: "!h-[45px] !bg-white/90 !rounded-[20px] !border !border-gray-200 hover:!border-gray-300 transition-all",
                          style: { "width": "299.33px" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(SelectValue, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (selectedFrom.value) {
                                      _push6(`<div class="flex items-center gap-3 py-3 pl-2"${_scopeId5}><span class="text-2xl"${_scopeId5}>${ssrInterpolate(getCountryFlag(selectedFrom.value))}</span><span class="text-base"${_scopeId5}>${ssrInterpolate(selectedFrom.value)}</span></div>`);
                                    } else {
                                      _push6(`<span class="text-gray-500 py-3 pl-2"${_scopeId5}>Select a country</span>`);
                                    }
                                  } else {
                                    return [
                                      selectedFrom.value ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "flex items-center gap-3 py-3 pl-2"
                                      }, [
                                        createVNode("span", { class: "text-2xl" }, toDisplayString(getCountryFlag(selectedFrom.value)), 1),
                                        createVNode("span", { class: "text-base" }, toDisplayString(selectedFrom.value), 1)
                                      ])) : (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "text-gray-500 py-3 pl-2"
                                      }, "Select a country"))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<img${ssrRenderAttr("src", _imports_1)} alt="" class="w-3 h-3 mr-3"${_scopeId4}>`);
                            } else {
                              return [
                                createVNode(SelectValue, null, {
                                  default: withCtx(() => [
                                    selectedFrom.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "flex items-center gap-3 py-3 pl-2"
                                    }, [
                                      createVNode("span", { class: "text-2xl" }, toDisplayString(getCountryFlag(selectedFrom.value)), 1),
                                      createVNode("span", { class: "text-base" }, toDisplayString(selectedFrom.value), 1)
                                    ])) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "text-gray-500 py-3 pl-2"
                                    }, "Select a country"))
                                  ]),
                                  _: 1
                                }),
                                createVNode("img", {
                                  src: _imports_1,
                                  alt: "",
                                  class: "w-3 h-3 mr-3"
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectContent, { class: "!rounded-[20px] !bg-white" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(SelectItem, { value: "United Arab Emirates" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="flex items-center gap-3"${_scopeId5}><span class="text-2xl"${_scopeId5}>🇦🇪</span><span${_scopeId5}>United Arab Emirates</span></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "flex items-center gap-3" }, [
                                        createVNode("span", { class: "text-2xl" }, "🇦🇪"),
                                        createVNode("span", null, "United Arab Emirates")
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(SelectItem, { value: "United States" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="flex items-center gap-3"${_scopeId5}><span class="text-2xl"${_scopeId5}>🇺🇸</span><span${_scopeId5}>United States</span></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "flex items-center gap-3" }, [
                                        createVNode("span", { class: "text-2xl" }, "🇺🇸"),
                                        createVNode("span", null, "United States")
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(SelectItem, { value: "Pakistan" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="flex items-center gap-3"${_scopeId5}><span class="text-2xl"${_scopeId5}>🇵🇰</span><span${_scopeId5}>Pakistan</span></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "flex items-center gap-3" }, [
                                        createVNode("span", { class: "text-2xl" }, "🇵🇰"),
                                        createVNode("span", null, "Pakistan")
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(SelectItem, { value: "United Arab Emirates" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-3" }, [
                                      createVNode("span", { class: "text-2xl" }, "🇦🇪"),
                                      createVNode("span", null, "United Arab Emirates")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(SelectItem, { value: "United States" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-3" }, [
                                      createVNode("span", { class: "text-2xl" }, "🇺🇸"),
                                      createVNode("span", null, "United States")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(SelectItem, { value: "Pakistan" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-3" }, [
                                      createVNode("span", { class: "text-2xl" }, "🇵🇰"),
                                      createVNode("span", null, "Pakistan")
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(SelectTrigger, {
                            id: "from",
                            class: "!h-[45px] !bg-white/90 !rounded-[20px] !border !border-gray-200 hover:!border-gray-300 transition-all",
                            style: { "width": "299.33px" }
                          }, {
                            default: withCtx(() => [
                              createVNode(SelectValue, null, {
                                default: withCtx(() => [
                                  selectedFrom.value ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "flex items-center gap-3 py-3 pl-2"
                                  }, [
                                    createVNode("span", { class: "text-2xl" }, toDisplayString(getCountryFlag(selectedFrom.value)), 1),
                                    createVNode("span", { class: "text-base" }, toDisplayString(selectedFrom.value), 1)
                                  ])) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-gray-500 py-3 pl-2"
                                  }, "Select a country"))
                                ]),
                                _: 1
                              }),
                              createVNode("img", {
                                src: _imports_1,
                                alt: "",
                                class: "w-3 h-3 mr-3"
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(SelectContent, { class: "!rounded-[20px] !bg-white" }, {
                            default: withCtx(() => [
                              createVNode(SelectItem, { value: "United Arab Emirates" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode("span", { class: "text-2xl" }, "🇦🇪"),
                                    createVNode("span", null, "United Arab Emirates")
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "United States" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode("span", { class: "text-2xl" }, "🇺🇸"),
                                    createVNode("span", null, "United States")
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "Pakistan" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode("span", { class: "text-2xl" }, "🇵🇰"),
                                    createVNode("span", null, "Pakistan")
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
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2 text-left"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    htmlFor: "to",
                    class: "text-gray-700 font-medium text-base"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Where am I going? `);
                      } else {
                        return [
                          createTextVNode(" Where am I going? ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(Select, {
                    modelValue: selectedTo.value,
                    "onUpdate:modelValue": ($event) => selectedTo.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(SelectTrigger, {
                          id: "to",
                          class: "!h-[45px] !bg-white/90 !rounded-[20px] !border !border-gray-200 hover:!border-gray-300 transition-all",
                          style: { "width": "299.33px" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(SelectValue, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (selectedTo.value) {
                                      _push6(`<div class="flex items-center gap-3 py-3 pl-2"${_scopeId5}><span class="text-2xl"${_scopeId5}>${ssrInterpolate(getCountryFlag(selectedTo.value))}</span><span class="text-base"${_scopeId5}>${ssrInterpolate(selectedTo.value)}</span></div>`);
                                    } else {
                                      _push6(`<span class="text-gray-500 py-3 pl-2"${_scopeId5}>Select a country</span>`);
                                    }
                                  } else {
                                    return [
                                      selectedTo.value ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "flex items-center gap-3 py-3 pl-2"
                                      }, [
                                        createVNode("span", { class: "text-2xl" }, toDisplayString(getCountryFlag(selectedTo.value)), 1),
                                        createVNode("span", { class: "text-base" }, toDisplayString(selectedTo.value), 1)
                                      ])) : (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "text-gray-500 py-3 pl-2"
                                      }, "Select a country"))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<img${ssrRenderAttr("src", _imports_1)} alt="" class="w-3 h-3 mr-3"${_scopeId4}>`);
                            } else {
                              return [
                                createVNode(SelectValue, null, {
                                  default: withCtx(() => [
                                    selectedTo.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "flex items-center gap-3 py-3 pl-2"
                                    }, [
                                      createVNode("span", { class: "text-2xl" }, toDisplayString(getCountryFlag(selectedTo.value)), 1),
                                      createVNode("span", { class: "text-base" }, toDisplayString(selectedTo.value), 1)
                                    ])) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "text-gray-500 py-3 pl-2"
                                    }, "Select a country"))
                                  ]),
                                  _: 1
                                }),
                                createVNode("img", {
                                  src: _imports_1,
                                  alt: "",
                                  class: "w-3 h-3 mr-3"
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectContent, { class: "!rounded-[20px] !bg-white" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(SelectItem, { value: "United Kingdom" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="flex items-center gap-3"${_scopeId5}><span class="text-2xl"${_scopeId5}>🇬🇧</span><span${_scopeId5}>United Kingdom</span></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "flex items-center gap-3" }, [
                                        createVNode("span", { class: "text-2xl" }, "🇬🇧"),
                                        createVNode("span", null, "United Kingdom")
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(SelectItem, { value: "United States" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="flex items-center gap-3"${_scopeId5}><span class="text-2xl"${_scopeId5}>🇺🇸</span><span${_scopeId5}>United States</span></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "flex items-center gap-3" }, [
                                        createVNode("span", { class: "text-2xl" }, "🇺🇸"),
                                        createVNode("span", null, "United States")
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(SelectItem, { value: "Canada" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="flex items-center gap-3"${_scopeId5}><span class="text-2xl"${_scopeId5}>🇨🇦</span><span${_scopeId5}>Canada</span></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "flex items-center gap-3" }, [
                                        createVNode("span", { class: "text-2xl" }, "🇨🇦"),
                                        createVNode("span", null, "Canada")
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(SelectItem, { value: "Morocco" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="flex items-center gap-3"${_scopeId5}><span class="text-2xl"${_scopeId5}>🇲🇦</span><span${_scopeId5}>Morocco</span></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "flex items-center gap-3" }, [
                                        createVNode("span", { class: "text-2xl" }, "🇲🇦"),
                                        createVNode("span", null, "Morocco")
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(SelectItem, { value: "United Kingdom" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-3" }, [
                                      createVNode("span", { class: "text-2xl" }, "🇬🇧"),
                                      createVNode("span", null, "United Kingdom")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(SelectItem, { value: "United States" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-3" }, [
                                      createVNode("span", { class: "text-2xl" }, "🇺🇸"),
                                      createVNode("span", null, "United States")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(SelectItem, { value: "Canada" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-3" }, [
                                      createVNode("span", { class: "text-2xl" }, "🇨🇦"),
                                      createVNode("span", null, "Canada")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(SelectItem, { value: "Morocco" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-3" }, [
                                      createVNode("span", { class: "text-2xl" }, "🇲🇦"),
                                      createVNode("span", null, "Morocco")
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(SelectTrigger, {
                            id: "to",
                            class: "!h-[45px] !bg-white/90 !rounded-[20px] !border !border-gray-200 hover:!border-gray-300 transition-all",
                            style: { "width": "299.33px" }
                          }, {
                            default: withCtx(() => [
                              createVNode(SelectValue, null, {
                                default: withCtx(() => [
                                  selectedTo.value ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "flex items-center gap-3 py-3 pl-2"
                                  }, [
                                    createVNode("span", { class: "text-2xl" }, toDisplayString(getCountryFlag(selectedTo.value)), 1),
                                    createVNode("span", { class: "text-base" }, toDisplayString(selectedTo.value), 1)
                                  ])) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-gray-500 py-3 pl-2"
                                  }, "Select a country"))
                                ]),
                                _: 1
                              }),
                              createVNode("img", {
                                src: _imports_1,
                                alt: "",
                                class: "w-3 h-3 mr-3"
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(SelectContent, { class: "!rounded-[20px] !bg-white" }, {
                            default: withCtx(() => [
                              createVNode(SelectItem, { value: "United Kingdom" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode("span", { class: "text-2xl" }, "🇬🇧"),
                                    createVNode("span", null, "United Kingdom")
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "United States" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode("span", { class: "text-2xl" }, "🇺🇸"),
                                    createVNode("span", null, "United States")
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "Canada" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode("span", { class: "text-2xl" }, "🇨🇦"),
                                    createVNode("span", null, "Canada")
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "Morocco" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode("span", { class: "text-2xl" }, "🇲🇦"),
                                    createVNode("span", null, "Morocco")
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
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(Button, {
                    size: "lg",
                    class: "!bg-gradient-to-r !from-[#00C6A7] !to-[#26D07A] hover:!from-[#00B599] hover:!to-[#22BD6D] !text-white !h-[52px] !rounded-[20px] w-full !font-semibold !text-lg shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 active:translate-y-0",
                    onClick: handleGetStarted
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Get Started `);
                      } else {
                        return [
                          createTextVNode(" Get Started ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6 items-end" }, [
                      createVNode("div", { class: "space-y-2 text-left" }, [
                        createVNode(_sfc_main$1, {
                          htmlFor: "from",
                          class: "text-gray-700 font-medium text-base"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Where am I from? ")
                          ]),
                          _: 1
                        }),
                        createVNode(Select, {
                          modelValue: selectedFrom.value,
                          "onUpdate:modelValue": ($event) => selectedFrom.value = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(SelectTrigger, {
                              id: "from",
                              class: "!h-[45px] !bg-white/90 !rounded-[20px] !border !border-gray-200 hover:!border-gray-300 transition-all",
                              style: { "width": "299.33px" }
                            }, {
                              default: withCtx(() => [
                                createVNode(SelectValue, null, {
                                  default: withCtx(() => [
                                    selectedFrom.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "flex items-center gap-3 py-3 pl-2"
                                    }, [
                                      createVNode("span", { class: "text-2xl" }, toDisplayString(getCountryFlag(selectedFrom.value)), 1),
                                      createVNode("span", { class: "text-base" }, toDisplayString(selectedFrom.value), 1)
                                    ])) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "text-gray-500 py-3 pl-2"
                                    }, "Select a country"))
                                  ]),
                                  _: 1
                                }),
                                createVNode("img", {
                                  src: _imports_1,
                                  alt: "",
                                  class: "w-3 h-3 mr-3"
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(SelectContent, { class: "!rounded-[20px] !bg-white" }, {
                              default: withCtx(() => [
                                createVNode(SelectItem, { value: "United Arab Emirates" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-3" }, [
                                      createVNode("span", { class: "text-2xl" }, "🇦🇪"),
                                      createVNode("span", null, "United Arab Emirates")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(SelectItem, { value: "United States" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-3" }, [
                                      createVNode("span", { class: "text-2xl" }, "🇺🇸"),
                                      createVNode("span", null, "United States")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(SelectItem, { value: "Pakistan" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-3" }, [
                                      createVNode("span", { class: "text-2xl" }, "🇵🇰"),
                                      createVNode("span", null, "Pakistan")
                                    ])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2 text-left" }, [
                        createVNode(_sfc_main$1, {
                          htmlFor: "to",
                          class: "text-gray-700 font-medium text-base"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Where am I going? ")
                          ]),
                          _: 1
                        }),
                        createVNode(Select, {
                          modelValue: selectedTo.value,
                          "onUpdate:modelValue": ($event) => selectedTo.value = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(SelectTrigger, {
                              id: "to",
                              class: "!h-[45px] !bg-white/90 !rounded-[20px] !border !border-gray-200 hover:!border-gray-300 transition-all",
                              style: { "width": "299.33px" }
                            }, {
                              default: withCtx(() => [
                                createVNode(SelectValue, null, {
                                  default: withCtx(() => [
                                    selectedTo.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "flex items-center gap-3 py-3 pl-2"
                                    }, [
                                      createVNode("span", { class: "text-2xl" }, toDisplayString(getCountryFlag(selectedTo.value)), 1),
                                      createVNode("span", { class: "text-base" }, toDisplayString(selectedTo.value), 1)
                                    ])) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "text-gray-500 py-3 pl-2"
                                    }, "Select a country"))
                                  ]),
                                  _: 1
                                }),
                                createVNode("img", {
                                  src: _imports_1,
                                  alt: "",
                                  class: "w-3 h-3 mr-3"
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(SelectContent, { class: "!rounded-[20px] !bg-white" }, {
                              default: withCtx(() => [
                                createVNode(SelectItem, { value: "United Kingdom" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-3" }, [
                                      createVNode("span", { class: "text-2xl" }, "🇬🇧"),
                                      createVNode("span", null, "United Kingdom")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(SelectItem, { value: "United States" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-3" }, [
                                      createVNode("span", { class: "text-2xl" }, "🇺🇸"),
                                      createVNode("span", null, "United States")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(SelectItem, { value: "Canada" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-3" }, [
                                      createVNode("span", { class: "text-2xl" }, "🇨🇦"),
                                      createVNode("span", null, "Canada")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(SelectItem, { value: "Morocco" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-3" }, [
                                      createVNode("span", { class: "text-2xl" }, "🇲🇦"),
                                      createVNode("span", null, "Morocco")
                                    ])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(Button, {
                        size: "lg",
                        class: "!bg-gradient-to-r !from-[#00C6A7] !to-[#26D07A] hover:!from-[#00B599] hover:!to-[#22BD6D] !text-white !h-[52px] !rounded-[20px] w-full !font-semibold !text-lg shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 active:translate-y-0",
                        onClick: handleGetStarted
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Get Started ")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(CardContent, { class: "p-8 lg:p-10" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6 items-end" }, [
                    createVNode("div", { class: "space-y-2 text-left" }, [
                      createVNode(_sfc_main$1, {
                        htmlFor: "from",
                        class: "text-gray-700 font-medium text-base"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Where am I from? ")
                        ]),
                        _: 1
                      }),
                      createVNode(Select, {
                        modelValue: selectedFrom.value,
                        "onUpdate:modelValue": ($event) => selectedFrom.value = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(SelectTrigger, {
                            id: "from",
                            class: "!h-[45px] !bg-white/90 !rounded-[20px] !border !border-gray-200 hover:!border-gray-300 transition-all",
                            style: { "width": "299.33px" }
                          }, {
                            default: withCtx(() => [
                              createVNode(SelectValue, null, {
                                default: withCtx(() => [
                                  selectedFrom.value ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "flex items-center gap-3 py-3 pl-2"
                                  }, [
                                    createVNode("span", { class: "text-2xl" }, toDisplayString(getCountryFlag(selectedFrom.value)), 1),
                                    createVNode("span", { class: "text-base" }, toDisplayString(selectedFrom.value), 1)
                                  ])) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-gray-500 py-3 pl-2"
                                  }, "Select a country"))
                                ]),
                                _: 1
                              }),
                              createVNode("img", {
                                src: _imports_1,
                                alt: "",
                                class: "w-3 h-3 mr-3"
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(SelectContent, { class: "!rounded-[20px] !bg-white" }, {
                            default: withCtx(() => [
                              createVNode(SelectItem, { value: "United Arab Emirates" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode("span", { class: "text-2xl" }, "🇦🇪"),
                                    createVNode("span", null, "United Arab Emirates")
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "United States" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode("span", { class: "text-2xl" }, "🇺🇸"),
                                    createVNode("span", null, "United States")
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "Pakistan" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode("span", { class: "text-2xl" }, "🇵🇰"),
                                    createVNode("span", null, "Pakistan")
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2 text-left" }, [
                      createVNode(_sfc_main$1, {
                        htmlFor: "to",
                        class: "text-gray-700 font-medium text-base"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Where am I going? ")
                        ]),
                        _: 1
                      }),
                      createVNode(Select, {
                        modelValue: selectedTo.value,
                        "onUpdate:modelValue": ($event) => selectedTo.value = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(SelectTrigger, {
                            id: "to",
                            class: "!h-[45px] !bg-white/90 !rounded-[20px] !border !border-gray-200 hover:!border-gray-300 transition-all",
                            style: { "width": "299.33px" }
                          }, {
                            default: withCtx(() => [
                              createVNode(SelectValue, null, {
                                default: withCtx(() => [
                                  selectedTo.value ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "flex items-center gap-3 py-3 pl-2"
                                  }, [
                                    createVNode("span", { class: "text-2xl" }, toDisplayString(getCountryFlag(selectedTo.value)), 1),
                                    createVNode("span", { class: "text-base" }, toDisplayString(selectedTo.value), 1)
                                  ])) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-gray-500 py-3 pl-2"
                                  }, "Select a country"))
                                ]),
                                _: 1
                              }),
                              createVNode("img", {
                                src: _imports_1,
                                alt: "",
                                class: "w-3 h-3 mr-3"
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(SelectContent, { class: "!rounded-[20px] !bg-white" }, {
                            default: withCtx(() => [
                              createVNode(SelectItem, { value: "United Kingdom" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode("span", { class: "text-2xl" }, "🇬🇧"),
                                    createVNode("span", null, "United Kingdom")
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "United States" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode("span", { class: "text-2xl" }, "🇺🇸"),
                                    createVNode("span", null, "United States")
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "Canada" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode("span", { class: "text-2xl" }, "🇨🇦"),
                                    createVNode("span", null, "Canada")
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "Morocco" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode("span", { class: "text-2xl" }, "🇲🇦"),
                                    createVNode("span", null, "Morocco")
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(Button, {
                      size: "lg",
                      class: "!bg-gradient-to-r !from-[#00C6A7] !to-[#26D07A] hover:!from-[#00B599] hover:!to-[#22BD6D] !text-white !h-[52px] !rounded-[20px] w-full !font-semibold !text-lg shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 active:translate-y-0",
                      onClick: handleGetStarted
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Get Started ")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="bg-white py-12 lg:py-16 border-t border-gray-100"><div class="container mx-auto max-w-7xl px-6 lg:px-8"><div class="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 items-start"><div class="text-center"><div class="text-[32px] leading-[40px] font-bold text-[#0B3947] mb-1" style="${ssrRenderStyle({ "font-family": "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif", "font-weight": "700", "letter-spacing": "0" })}"> 180K </div><div class="text-[13px] leading-[34px] text-[#0B3947]" style="${ssrRenderStyle({ "font-family": "'Helvetica', Arial, sans-serif", "font-weight": "400", "letter-spacing": "0" })}"> Happy Customers </div></div><div class="text-center"><div class="text-[32px] leading-[40px] font-bold text-[#0B3947] mb-1" style="${ssrRenderStyle({ "font-family": "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif", "font-weight": "700", "letter-spacing": "0" })}"> 24/7 </div><div class="text-[13px] leading-[34px] text-[#0B3947]" style="${ssrRenderStyle({ "font-family": "'Helvetica', Arial, sans-serif", "font-weight": "400", "letter-spacing": "0" })}"> Support </div></div><div class="text-center col-span-2 lg:col-span-1 flex items-center justify-center"><div><img${ssrRenderAttr("src", _imports_2)} alt="Trustpilot" class="w-[104px] h-[30px] object-contain translate-y-2"></div></div><div class="text-center"><div class="text-[32px] leading-[40px] font-bold text-[#0B3947] mb-1" style="${ssrRenderStyle({ "font-family": "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif", "font-weight": "700", "letter-spacing": "0" })}"> 11 </div><div class="text-[13px] leading-[34px] text-[#0B3947]" style="${ssrRenderStyle({ "font-family": "'Helvetica', Arial, sans-serif", "font-weight": "400", "letter-spacing": "0" })}"> Years of Experience </div></div><div class="text-center"><div class="text-[32px] leading-[40px] font-bold text-[#0B3947] mb-1" style="${ssrRenderStyle({ "font-family": "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif", "font-weight": "700", "letter-spacing": "0" })}"> 98% </div><div class="text-[13px] leading-[34px] text-[#0B3947]" style="${ssrRenderStyle({ "font-family": "'Helvetica', Arial, sans-serif", "font-weight": "400", "letter-spacing": "0" })}"> Visa Approval Rate </div></div></div></div><div class="container mx-auto max-w-7xl px-6 lg:px-8 mt-8 lg:mt-10"><div class="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Hero.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "Hero" });

export { __nuxt_component_0 as default };
//# sourceMappingURL=Hero-BrxSgcbi.mjs.map
