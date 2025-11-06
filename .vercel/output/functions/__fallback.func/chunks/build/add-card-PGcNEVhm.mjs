import { ref, mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-DJzu2MsY.mjs';
import { _ as _imports_1 } from './virtual_public-BKzO2WzG.mjs';
import { useRouter } from 'vue-router';
import { ChevronLeft, Lock } from 'lucide-vue-next';
import Button from './button-Cy1RM3F0.mjs';
import Card from './Card-CXXOLw0c.mjs';
import _sfc_main$2 from './input-BjW8rXgt.mjs';
import _sfc_main$1 from './label-Du92n_Nj.mjs';
import Select from './Select-BT9XQi4a.mjs';
import SelectContent from './SelectContent-BojwDvXK.mjs';
import SelectItem from './SelectItem-RYQOH1xm.mjs';
import SelectTrigger from './SelectTrigger-BwVa_K9-.mjs';
import SelectValue from './SelectValue-BEkb05o4.mjs';
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

const _sfc_main = {
  __name: "add-card",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const formattedCardNumber = ref("");
    const goBack = () => {
      router.back();
    };
    const formatCardNumber = (event) => {
      let value = event.target.value.replace(/\s/g, "");
      value = value.replace(/\D/g, "");
      value = value.substring(0, 16);
      const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
      formattedCardNumber.value = formatted;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center pt-10 pb-20 min-h-screen px-4" }, _attrs))}><div class="flex flex-col w-full max-w-[776px] gap-6"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(Button, {
        onClick: goBack,
        variant: "ghost",
        size: "icon",
        class: "rounded-md w-[42px] h-[36px] border border-[#E4E4E8]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ChevronLeft), { class: "h-5 w-5" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ChevronLeft), { class: "h-5 w-5" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="text-2xl font-semibold tracking-tight text-foreground font-geist"> Credit / debit card </h1></div><div class="flex gap-3 w-full sm:w-auto">`);
      _push(ssrRenderComponent(Button, {
        variant: "outline",
        class: "rounded-lg flex-1 sm:flex-none !bg-[#EFEFEF] hover:!bg-[#E5E5E5] border-0"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Discard `);
          } else {
            return [
              createTextVNode(" Discard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Button, { class: "rounded-lg !bg-[#1ECE84] hover:!bg-[#1AB876] !text-white flex-1 sm:flex-none" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Save Changes `);
          } else {
            return [
              createTextVNode(" Save Changes ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Lock), { class: "h-4 w-4" }, null, _parent));
      _push(`<p class="text-sm text-foreground font-inter"> All card information is fully encrypted and secure. </p></div>`);
      _push(ssrRenderComponent(Card, { class: "rounded-xl border p-4 sm:p-6 bg-white" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-6"${_scopeId}><div class="flex flex-col sm:flex-row items-start justify-between gap-4"${_scopeId}><div${_scopeId}><h2 class="text-lg font-semibold text-foreground font-geist"${_scopeId}>Card Details</h2><p class="text-sm text-muted-foreground font-inter"${_scopeId}>Add the card details below</p></div><div class="rounded-md p-1"${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="Payment Methods" class="h-[32px]"${_scopeId}></div></div><div class="flex flex-col gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "name",
              class: "text-sm font-medium text-foreground font-inter"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Name `);
                } else {
                  return [
                    createTextVNode(" Name ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "name",
              type: "text",
              placeholder: "First Last",
              class: "rounded-lg h-11 font-inter"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "cardNumber",
              class: "text-sm font-medium text-foreground font-inter"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Card Number `);
                } else {
                  return [
                    createTextVNode(" Card Number ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "cardNumber",
              type: "text",
              modelValue: formattedCardNumber.value,
              "onUpdate:modelValue": ($event) => formattedCardNumber.value = $event,
              onInput: formatCardNumber,
              placeholder: "1234 5678 9012 3456",
              maxlength: "19",
              class: "rounded-lg h-11 font-inter"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 sm:grid-cols-3 gap-4"${_scopeId}><div class="flex flex-col gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "expires",
              class: "text-sm font-medium text-foreground font-inter"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Expires `);
                } else {
                  return [
                    createTextVNode(" Expires ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(Select, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectTrigger, {
                    id: "expires",
                    class: "rounded-lg h-11 px-3 font-inter [&>svg]:hidden"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(SelectValue, { placeholder: "Month" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(SelectValue, { placeholder: "Month" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(SelectContent, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(SelectItem, { value: "01" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`01`);
                            } else {
                              return [
                                createTextVNode("01")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "02" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`02`);
                            } else {
                              return [
                                createTextVNode("02")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "03" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`03`);
                            } else {
                              return [
                                createTextVNode("03")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "04" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`04`);
                            } else {
                              return [
                                createTextVNode("04")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "05" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`05`);
                            } else {
                              return [
                                createTextVNode("05")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "06" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`06`);
                            } else {
                              return [
                                createTextVNode("06")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "07" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`07`);
                            } else {
                              return [
                                createTextVNode("07")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "08" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`08`);
                            } else {
                              return [
                                createTextVNode("08")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "09" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`09`);
                            } else {
                              return [
                                createTextVNode("09")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "10" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`10`);
                            } else {
                              return [
                                createTextVNode("10")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "11" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`11`);
                            } else {
                              return [
                                createTextVNode("11")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "12" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`12`);
                            } else {
                              return [
                                createTextVNode("12")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(SelectItem, { value: "01" }, {
                            default: withCtx(() => [
                              createTextVNode("01")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "02" }, {
                            default: withCtx(() => [
                              createTextVNode("02")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "03" }, {
                            default: withCtx(() => [
                              createTextVNode("03")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "04" }, {
                            default: withCtx(() => [
                              createTextVNode("04")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "05" }, {
                            default: withCtx(() => [
                              createTextVNode("05")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "06" }, {
                            default: withCtx(() => [
                              createTextVNode("06")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "07" }, {
                            default: withCtx(() => [
                              createTextVNode("07")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "08" }, {
                            default: withCtx(() => [
                              createTextVNode("08")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "09" }, {
                            default: withCtx(() => [
                              createTextVNode("09")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "10" }, {
                            default: withCtx(() => [
                              createTextVNode("10")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "11" }, {
                            default: withCtx(() => [
                              createTextVNode("11")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "12" }, {
                            default: withCtx(() => [
                              createTextVNode("12")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectTrigger, {
                      id: "expires",
                      class: "rounded-lg h-11 px-3 font-inter [&>svg]:hidden"
                    }, {
                      default: withCtx(() => [
                        createVNode(SelectValue, { placeholder: "Month" })
                      ]),
                      _: 1
                    }),
                    createVNode(SelectContent, null, {
                      default: withCtx(() => [
                        createVNode(SelectItem, { value: "01" }, {
                          default: withCtx(() => [
                            createTextVNode("01")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "02" }, {
                          default: withCtx(() => [
                            createTextVNode("02")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "03" }, {
                          default: withCtx(() => [
                            createTextVNode("03")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "04" }, {
                          default: withCtx(() => [
                            createTextVNode("04")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "05" }, {
                          default: withCtx(() => [
                            createTextVNode("05")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "06" }, {
                          default: withCtx(() => [
                            createTextVNode("06")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "07" }, {
                          default: withCtx(() => [
                            createTextVNode("07")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "08" }, {
                          default: withCtx(() => [
                            createTextVNode("08")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "09" }, {
                          default: withCtx(() => [
                            createTextVNode("09")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "10" }, {
                          default: withCtx(() => [
                            createTextVNode("10")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "11" }, {
                          default: withCtx(() => [
                            createTextVNode("11")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "12" }, {
                          default: withCtx(() => [
                            createTextVNode("12")
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
            }, _parent2, _scopeId));
            _push2(`<img${ssrRenderAttr("src", _imports_1)} alt="" class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style="${ssrRenderStyle({ "width": "9.33px", "height": "5.33px" })}"${_scopeId}></div></div><div class="flex flex-col gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "year",
              class: "text-sm font-medium text-foreground font-inter"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Year `);
                } else {
                  return [
                    createTextVNode(" Year ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(Select, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectTrigger, {
                    id: "year",
                    class: "rounded-lg h-11 px-3 font-inter [&>svg]:hidden"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(SelectValue, { placeholder: "Month" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(SelectValue, { placeholder: "Month" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(SelectContent, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(SelectItem, { value: "2025" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`2025`);
                            } else {
                              return [
                                createTextVNode("2025")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "2026" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`2026`);
                            } else {
                              return [
                                createTextVNode("2026")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "2027" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`2027`);
                            } else {
                              return [
                                createTextVNode("2027")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "2028" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`2028`);
                            } else {
                              return [
                                createTextVNode("2028")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "2029" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`2029`);
                            } else {
                              return [
                                createTextVNode("2029")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "2030" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`2030`);
                            } else {
                              return [
                                createTextVNode("2030")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "2031" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`2031`);
                            } else {
                              return [
                                createTextVNode("2031")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "2032" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`2032`);
                            } else {
                              return [
                                createTextVNode("2032")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "2033" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`2033`);
                            } else {
                              return [
                                createTextVNode("2033")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "2034" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`2034`);
                            } else {
                              return [
                                createTextVNode("2034")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(SelectItem, { value: "2025" }, {
                            default: withCtx(() => [
                              createTextVNode("2025")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "2026" }, {
                            default: withCtx(() => [
                              createTextVNode("2026")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "2027" }, {
                            default: withCtx(() => [
                              createTextVNode("2027")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "2028" }, {
                            default: withCtx(() => [
                              createTextVNode("2028")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "2029" }, {
                            default: withCtx(() => [
                              createTextVNode("2029")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "2030" }, {
                            default: withCtx(() => [
                              createTextVNode("2030")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "2031" }, {
                            default: withCtx(() => [
                              createTextVNode("2031")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "2032" }, {
                            default: withCtx(() => [
                              createTextVNode("2032")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "2033" }, {
                            default: withCtx(() => [
                              createTextVNode("2033")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "2034" }, {
                            default: withCtx(() => [
                              createTextVNode("2034")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectTrigger, {
                      id: "year",
                      class: "rounded-lg h-11 px-3 font-inter [&>svg]:hidden"
                    }, {
                      default: withCtx(() => [
                        createVNode(SelectValue, { placeholder: "Month" })
                      ]),
                      _: 1
                    }),
                    createVNode(SelectContent, null, {
                      default: withCtx(() => [
                        createVNode(SelectItem, { value: "2025" }, {
                          default: withCtx(() => [
                            createTextVNode("2025")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "2026" }, {
                          default: withCtx(() => [
                            createTextVNode("2026")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "2027" }, {
                          default: withCtx(() => [
                            createTextVNode("2027")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "2028" }, {
                          default: withCtx(() => [
                            createTextVNode("2028")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "2029" }, {
                          default: withCtx(() => [
                            createTextVNode("2029")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "2030" }, {
                          default: withCtx(() => [
                            createTextVNode("2030")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "2031" }, {
                          default: withCtx(() => [
                            createTextVNode("2031")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "2032" }, {
                          default: withCtx(() => [
                            createTextVNode("2032")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "2033" }, {
                          default: withCtx(() => [
                            createTextVNode("2033")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "2034" }, {
                          default: withCtx(() => [
                            createTextVNode("2034")
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
            }, _parent2, _scopeId));
            _push2(`<img${ssrRenderAttr("src", _imports_1)} alt="" class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style="${ssrRenderStyle({ "width": "9.33px", "height": "5.33px" })}"${_scopeId}></div></div><div class="flex flex-col gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "cvc",
              class: "text-sm font-medium text-foreground font-inter"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` CVC `);
                } else {
                  return [
                    createTextVNode(" CVC ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "cvc",
              type: "text",
              placeholder: "CVC",
              maxlength: "4",
              class: "rounded-lg h-11 font-inter"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-6" }, [
                createVNode("div", { class: "flex flex-col sm:flex-row items-start justify-between gap-4" }, [
                  createVNode("div", null, [
                    createVNode("h2", { class: "text-lg font-semibold text-foreground font-geist" }, "Card Details"),
                    createVNode("p", { class: "text-sm text-muted-foreground font-inter" }, "Add the card details below")
                  ]),
                  createVNode("div", { class: "rounded-md p-1" }, [
                    createVNode("img", {
                      src: _imports_0,
                      alt: "Payment Methods",
                      class: "h-[32px]"
                    })
                  ])
                ]),
                createVNode("div", { class: "flex flex-col gap-2" }, [
                  createVNode(_sfc_main$1, {
                    for: "name",
                    class: "text-sm font-medium text-foreground font-inter"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Name ")
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$2, {
                    id: "name",
                    type: "text",
                    placeholder: "First Last",
                    class: "rounded-lg h-11 font-inter"
                  })
                ]),
                createVNode("div", { class: "flex flex-col gap-2" }, [
                  createVNode(_sfc_main$1, {
                    for: "cardNumber",
                    class: "text-sm font-medium text-foreground font-inter"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Card Number ")
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$2, {
                    id: "cardNumber",
                    type: "text",
                    modelValue: formattedCardNumber.value,
                    "onUpdate:modelValue": ($event) => formattedCardNumber.value = $event,
                    onInput: formatCardNumber,
                    placeholder: "1234 5678 9012 3456",
                    maxlength: "19",
                    class: "rounded-lg h-11 font-inter"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-4" }, [
                  createVNode("div", { class: "flex flex-col gap-2" }, [
                    createVNode(_sfc_main$1, {
                      for: "expires",
                      class: "text-sm font-medium text-foreground font-inter"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Expires ")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "relative" }, [
                      createVNode(Select, null, {
                        default: withCtx(() => [
                          createVNode(SelectTrigger, {
                            id: "expires",
                            class: "rounded-lg h-11 px-3 font-inter [&>svg]:hidden"
                          }, {
                            default: withCtx(() => [
                              createVNode(SelectValue, { placeholder: "Month" })
                            ]),
                            _: 1
                          }),
                          createVNode(SelectContent, null, {
                            default: withCtx(() => [
                              createVNode(SelectItem, { value: "01" }, {
                                default: withCtx(() => [
                                  createTextVNode("01")
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "02" }, {
                                default: withCtx(() => [
                                  createTextVNode("02")
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "03" }, {
                                default: withCtx(() => [
                                  createTextVNode("03")
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "04" }, {
                                default: withCtx(() => [
                                  createTextVNode("04")
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "05" }, {
                                default: withCtx(() => [
                                  createTextVNode("05")
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "06" }, {
                                default: withCtx(() => [
                                  createTextVNode("06")
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "07" }, {
                                default: withCtx(() => [
                                  createTextVNode("07")
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "08" }, {
                                default: withCtx(() => [
                                  createTextVNode("08")
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "09" }, {
                                default: withCtx(() => [
                                  createTextVNode("09")
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "10" }, {
                                default: withCtx(() => [
                                  createTextVNode("10")
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "11" }, {
                                default: withCtx(() => [
                                  createTextVNode("11")
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "12" }, {
                                default: withCtx(() => [
                                  createTextVNode("12")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("img", {
                        src: _imports_1,
                        alt: "",
                        class: "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none",
                        style: { "width": "9.33px", "height": "5.33px" }
                      })
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-col gap-2" }, [
                    createVNode(_sfc_main$1, {
                      for: "year",
                      class: "text-sm font-medium text-foreground font-inter"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Year ")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "relative" }, [
                      createVNode(Select, null, {
                        default: withCtx(() => [
                          createVNode(SelectTrigger, {
                            id: "year",
                            class: "rounded-lg h-11 px-3 font-inter [&>svg]:hidden"
                          }, {
                            default: withCtx(() => [
                              createVNode(SelectValue, { placeholder: "Month" })
                            ]),
                            _: 1
                          }),
                          createVNode(SelectContent, null, {
                            default: withCtx(() => [
                              createVNode(SelectItem, { value: "2025" }, {
                                default: withCtx(() => [
                                  createTextVNode("2025")
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "2026" }, {
                                default: withCtx(() => [
                                  createTextVNode("2026")
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "2027" }, {
                                default: withCtx(() => [
                                  createTextVNode("2027")
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "2028" }, {
                                default: withCtx(() => [
                                  createTextVNode("2028")
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "2029" }, {
                                default: withCtx(() => [
                                  createTextVNode("2029")
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "2030" }, {
                                default: withCtx(() => [
                                  createTextVNode("2030")
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "2031" }, {
                                default: withCtx(() => [
                                  createTextVNode("2031")
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "2032" }, {
                                default: withCtx(() => [
                                  createTextVNode("2032")
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "2033" }, {
                                default: withCtx(() => [
                                  createTextVNode("2033")
                                ]),
                                _: 1
                              }),
                              createVNode(SelectItem, { value: "2034" }, {
                                default: withCtx(() => [
                                  createTextVNode("2034")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("img", {
                        src: _imports_1,
                        alt: "",
                        class: "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none",
                        style: { "width": "9.33px", "height": "5.33px" }
                      })
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-col gap-2" }, [
                    createVNode(_sfc_main$1, {
                      for: "cvc",
                      class: "text-sm font-medium text-foreground font-inter"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" CVC ")
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$2, {
                      id: "cvc",
                      type: "text",
                      placeholder: "CVC",
                      maxlength: "4",
                      class: "rounded-lg h-11 font-inter"
                    })
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my-account/payment-methods/add-card.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=add-card-PGcNEVhm.mjs.map
