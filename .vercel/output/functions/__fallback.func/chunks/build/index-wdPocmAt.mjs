import { ref, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { ChevronLeft, Eye, Pencil } from 'lucide-vue-next';
import Button from './button-Cy1RM3F0.mjs';
import Checkbox from './Checkbox-Dghd6ShO.mjs';
import _sfc_main$1 from './Table-0-dkKYVh.mjs';
import _sfc_main$5 from './Tablebody-CLcMcatf.mjs';
import _sfc_main$6 from './Tablecell-CoezOhNd.mjs';
import _sfc_main$4 from './Tablehead-DWB4F9eG.mjs';
import _sfc_main$2 from './Tableheader-DMBcOO0j.mjs';
import _sfc_main$3 from './Tablerow-BlJM8gji.mjs';
import 'class-variance-authority';
import './utils-BpV8ZjlK.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const selectedOrders = ref([]);
    const orders = ref([
      {
        id: 1,
        applicationId: "APP-01245",
        customerName: "Ali Raza",
        destination: "UAE",
        visaProduct: "30-Day Visa",
        price: "USD 100",
        status: "Awaiting Response"
      },
      {
        id: 2,
        applicationId: "APP-01245",
        customerName: "Ali Raza",
        destination: "UAE",
        visaProduct: "30-Day Visa",
        price: "USD 100",
        status: "Approved"
      },
      {
        id: 3,
        applicationId: "APP-01245",
        customerName: "Ali Raza",
        destination: "UAE",
        visaProduct: "30-Day Visa",
        price: "USD 100",
        status: "Documents Pending"
      }
    ]);
    const goBack = () => {
      router.back();
    };
    const viewOrder = (order) => {
      router.push(`my-orders/${order.applicationId}`);
    };
    const toggleOrderSelection = (id) => {
      if (selectedOrders.value.includes(id)) {
        selectedOrders.value = selectedOrders.value.filter((orderId) => orderId !== id);
      } else {
        selectedOrders.value = [...selectedOrders.value, id];
      }
    };
    const toggleAllOrders = () => {
      if (selectedOrders.value.length === orders.value.length) {
        selectedOrders.value = [];
      } else {
        selectedOrders.value = orders.value.map((o) => o.id);
      }
    };
    const getStatusClass = (status) => {
      const classes = {
        "Awaiting Response": "bg-[#F1FDF4] text-[#0673DF] border border-[#0673DF]",
        "Approved": "bg-[#F1FDF4] text-[#08CA69] border border-[#06DF73]",
        "Documents Pending": "bg-[#FFF6E1] text-[#E2B72C] border border-[#B0A999]"
      };
      return classes[status] || "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center pt-10 pb-20 min-h-screen px-4" }, _attrs))}><div class="flex flex-col w-full max-w-[1400px] gap-6"><div class="flex items-center justify-between"><div class="flex items-center gap-4">`);
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
      _push(`<h1 class="text-2xl font-semibold tracking-tight font-geist text-[#27272B]"> My Orders </h1></div>`);
      _push(ssrRenderComponent(Button, { class: "rounded-lg !bg-[#1ECE84] hover:!bg-[#1AB876] !text-white font-geist" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Create New Order `);
          } else {
            return [
              createTextVNode(" Create New Order ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="rounded-lg border-b bg-white">`);
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$3, { class: "bg-white hover:bg-white" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$4, { class: "w-[50px]" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(Checkbox, {
                                checked: selectedOrders.value.length === orders.value.length,
                                "onUpdate:checked": toggleAllOrders
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(Checkbox, {
                                  checked: selectedOrders.value.length === orders.value.length,
                                  "onUpdate:checked": toggleAllOrders
                                }, null, 8, ["checked"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Application #`);
                            } else {
                              return [
                                createTextVNode("Application #")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Customer Name`);
                            } else {
                              return [
                                createTextVNode("Customer Name")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Destination`);
                            } else {
                              return [
                                createTextVNode("Destination")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Visa Product`);
                            } else {
                              return [
                                createTextVNode("Visa Product")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Price`);
                            } else {
                              return [
                                createTextVNode("Price")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Status`);
                            } else {
                              return [
                                createTextVNode("Status")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$4, { class: "w-[100px]" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$4, { class: "w-[50px]" }, {
                            default: withCtx(() => [
                              createVNode(Checkbox, {
                                checked: selectedOrders.value.length === orders.value.length,
                                "onUpdate:checked": toggleAllOrders
                              }, null, 8, ["checked"])
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                            default: withCtx(() => [
                              createTextVNode("Application #")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                            default: withCtx(() => [
                              createTextVNode("Customer Name")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                            default: withCtx(() => [
                              createTextVNode("Destination")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                            default: withCtx(() => [
                              createTextVNode("Visa Product")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                            default: withCtx(() => [
                              createTextVNode("Price")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                            default: withCtx(() => [
                              createTextVNode("Status")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, { class: "w-[100px]" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$3, { class: "bg-white hover:bg-white" }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$4, { class: "w-[50px]" }, {
                          default: withCtx(() => [
                            createVNode(Checkbox, {
                              checked: selectedOrders.value.length === orders.value.length,
                              "onUpdate:checked": toggleAllOrders
                            }, null, 8, ["checked"])
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                          default: withCtx(() => [
                            createTextVNode("Application #")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                          default: withCtx(() => [
                            createTextVNode("Customer Name")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                          default: withCtx(() => [
                            createTextVNode("Destination")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                          default: withCtx(() => [
                            createTextVNode("Visa Product")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                          default: withCtx(() => [
                            createTextVNode("Price")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                          default: withCtx(() => [
                            createTextVNode("Status")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$4, { class: "w-[100px]" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(orders.value, (order) => {
                    _push3(ssrRenderComponent(_sfc_main$3, {
                      key: order.id,
                      class: "hover:bg-gray-50"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$6, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(Checkbox, {
                                  checked: selectedOrders.value.includes(order.id),
                                  "onUpdate:checked": () => toggleOrderSelection(order.id)
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(Checkbox, {
                                    checked: selectedOrders.value.includes(order.id),
                                    "onUpdate:checked": () => toggleOrderSelection(order.id)
                                  }, null, 8, ["checked", "onUpdate:checked"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(order.applicationId)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(order.applicationId), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(order.customerName)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(order.customerName), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(order.destination)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(order.destination), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(order.visaProduct)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(order.visaProduct), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(order.price)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(order.price), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_sfc_main$6, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<span class="${ssrRenderClass([getStatusClass(order.status), "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium font-geist"])}"${_scopeId4}>${ssrInterpolate(order.status)}</span>`);
                              } else {
                                return [
                                  createVNode("span", {
                                    class: ["inline-flex items-center rounded-full px-3 py-1 text-xs font-medium font-geist", getStatusClass(order.status)]
                                  }, toDisplayString(order.status), 3)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_sfc_main$6, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex items-center gap-2"${_scopeId4}>`);
                                _push5(ssrRenderComponent(Button, {
                                  onClick: ($event) => viewOrder(order),
                                  variant: "ghost",
                                  size: "icon",
                                  class: "h-8 w-8 rounded-md hover:bg-gray-100"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(Eye), { class: "h-4 w-4 text-gray-600" }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(Eye), { class: "h-4 w-4 text-gray-600" })
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(Button, {
                                  variant: "ghost",
                                  size: "icon",
                                  class: "h-8 w-8 rounded-md hover:bg-gray-100"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(Pencil), { class: "h-4 w-4 text-gray-600" }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(Pencil), { class: "h-4 w-4 text-gray-600" })
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                    createVNode(Button, {
                                      onClick: ($event) => viewOrder(order),
                                      variant: "ghost",
                                      size: "icon",
                                      class: "h-8 w-8 rounded-md hover:bg-gray-100"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Eye), { class: "h-4 w-4 text-gray-600" })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"]),
                                    createVNode(Button, {
                                      variant: "ghost",
                                      size: "icon",
                                      class: "h-8 w-8 rounded-md hover:bg-gray-100"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Pencil), { class: "h-4 w-4 text-gray-600" })
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$6, null, {
                              default: withCtx(() => [
                                createVNode(Checkbox, {
                                  checked: selectedOrders.value.includes(order.id),
                                  "onUpdate:checked": () => toggleOrderSelection(order.id)
                                }, null, 8, ["checked", "onUpdate:checked"])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(order.applicationId), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(order.customerName), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(order.destination), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(order.visaProduct), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(order.price), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_sfc_main$6, null, {
                              default: withCtx(() => [
                                createVNode("span", {
                                  class: ["inline-flex items-center rounded-full px-3 py-1 text-xs font-medium font-geist", getStatusClass(order.status)]
                                }, toDisplayString(order.status), 3)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_sfc_main$6, null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-2" }, [
                                  createVNode(Button, {
                                    onClick: ($event) => viewOrder(order),
                                    variant: "ghost",
                                    size: "icon",
                                    class: "h-8 w-8 rounded-md hover:bg-gray-100"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Eye), { class: "h-4 w-4 text-gray-600" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"]),
                                  createVNode(Button, {
                                    variant: "ghost",
                                    size: "icon",
                                    class: "h-8 w-8 rounded-md hover:bg-gray-100"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Pencil), { class: "h-4 w-4 text-gray-600" })
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(orders.value, (order) => {
                      return openBlock(), createBlock(_sfc_main$3, {
                        key: order.id,
                        class: "hover:bg-gray-50"
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$6, null, {
                            default: withCtx(() => [
                              createVNode(Checkbox, {
                                checked: selectedOrders.value.includes(order.id),
                                "onUpdate:checked": () => toggleOrderSelection(order.id)
                              }, null, 8, ["checked", "onUpdate:checked"])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(order.applicationId), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(order.customerName), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(order.destination), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(order.visaProduct), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(order.price), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_sfc_main$6, null, {
                            default: withCtx(() => [
                              createVNode("span", {
                                class: ["inline-flex items-center rounded-full px-3 py-1 text-xs font-medium font-geist", getStatusClass(order.status)]
                              }, toDisplayString(order.status), 3)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_sfc_main$6, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode(Button, {
                                  onClick: ($event) => viewOrder(order),
                                  variant: "ghost",
                                  size: "icon",
                                  class: "h-8 w-8 rounded-md hover:bg-gray-100"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Eye), { class: "h-4 w-4 text-gray-600" })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(Button, {
                                  variant: "ghost",
                                  size: "icon",
                                  class: "h-8 w-8 rounded-md hover:bg-gray-100"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Pencil), { class: "h-4 w-4 text-gray-600" })
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$3, { class: "bg-white hover:bg-white" }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$4, { class: "w-[50px]" }, {
                        default: withCtx(() => [
                          createVNode(Checkbox, {
                            checked: selectedOrders.value.length === orders.value.length,
                            "onUpdate:checked": toggleAllOrders
                          }, null, 8, ["checked"])
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                        default: withCtx(() => [
                          createTextVNode("Application #")
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                        default: withCtx(() => [
                          createTextVNode("Customer Name")
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                        default: withCtx(() => [
                          createTextVNode("Destination")
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                        default: withCtx(() => [
                          createTextVNode("Visa Product")
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                        default: withCtx(() => [
                          createTextVNode("Price")
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#6B7280]" }, {
                        default: withCtx(() => [
                          createTextVNode("Status")
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$4, { class: "w-[100px]" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_sfc_main$5, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(orders.value, (order) => {
                    return openBlock(), createBlock(_sfc_main$3, {
                      key: order.id,
                      class: "hover:bg-gray-50"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$6, null, {
                          default: withCtx(() => [
                            createVNode(Checkbox, {
                              checked: selectedOrders.value.includes(order.id),
                              "onUpdate:checked": () => toggleOrderSelection(order.id)
                            }, null, 8, ["checked", "onUpdate:checked"])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(order.applicationId), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(order.customerName), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(order.destination), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(order.visaProduct), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(order.price), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_sfc_main$6, null, {
                          default: withCtx(() => [
                            createVNode("span", {
                              class: ["inline-flex items-center rounded-full px-3 py-1 text-xs font-medium font-geist", getStatusClass(order.status)]
                            }, toDisplayString(order.status), 3)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_sfc_main$6, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(Button, {
                                onClick: ($event) => viewOrder(order),
                                variant: "ghost",
                                size: "icon",
                                class: "h-8 w-8 rounded-md hover:bg-gray-100"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Eye), { class: "h-4 w-4 text-gray-600" })
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(Button, {
                                variant: "ghost",
                                size: "icon",
                                class: "h-8 w-8 rounded-md hover:bg-gray-100"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Pencil), { class: "h-4 w-4 text-gray-600" })
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my-account/my-orders/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-wdPocmAt.mjs.map
