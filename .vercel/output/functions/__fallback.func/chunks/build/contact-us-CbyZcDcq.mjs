import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, withModifiers, withDirectives, vModelSelect, vModelText, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { Clock, Headphones, ChevronDown } from 'lucide-vue-next';
import HeaderLoggedIn from './HeaderLoggedIn-B8RzWlof.mjs';
import Button from './button-Cy1RM3F0.mjs';
import _sfc_main$1 from './input-BjW8rXgt.mjs';
import Card from './Card-CXXOLw0c.mjs';
import CardContent from './CardContent-DLRaKZzq.mjs';
import { _ as _export_sfc } from './server.mjs';
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
import './nuxt-link-BLVv8aHW.mjs';
import './virtual_public-BcspCJ2z.mjs';
import './DropdownMenu-C-dUPqGY.mjs';
import 'radix-vue';
import './DropdownMenuTrigger-B7jF-YDx.mjs';
import './DropdownMenuContent-BPx_eUMr.mjs';
import './utils-BpV8ZjlK.mjs';
import './DropdownMenuItem-D2DqBvlk.mjs';
import 'class-variance-authority';
import 'vue-router';

const _imports_0 = publicAssetsURL("/svg/pin.svg");
const _imports_1 = publicAssetsURL("/svg/calendar.svg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "contact-us",
  __ssrInlineRender: true,
  setup(__props) {
    const formData = ref({
      fullName: "",
      email: "",
      helpTopic: "",
      message: ""
    });
    const handleSubmit = () => {
      console.log("Form submitted:", formData.value);
      alert("Thank you for contacting us! We will respond within 2 hours.");
      formData.value = {
        fullName: "",
        email: "",
        helpTopic: "",
        message: ""
      };
    };
    const handleContactClick = () => {
      const formElement = (void 0).querySelector("form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))} data-v-0a76af8d>`);
      _push(ssrRenderComponent(HeaderLoggedIn, null, null, _parent));
      _push(`<div class="container mx-auto max-w-7xl px-6 lg:px-8 py-12" data-v-0a76af8d><div class="mb-12" data-v-0a76af8d><div class="inline-flex items-center gap-2.5 mb-6 bg-[#F1F9FC] rounded-full px-[15px] py-[5px] h-[34px]" data-v-0a76af8d><span class="font-manrope text-sm font-medium text-gray-600" data-v-0a76af8d>CONTACT &amp; LOCATION</span></div><div class="flex items-center justify-between" data-v-0a76af8d><h1 class="font-manrope font-bold text-[56px] leading-[56px] tracking-[-0.015em] max-w-[380px]" data-v-0a76af8d> Contact us </h1><p class="font-manrope font-normal text-lg leading-8 w-[253px] text-[#71717B] text-center" data-v-0a76af8d> Contact our customer support </p></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end" data-v-0a76af8d><div data-v-0a76af8d><div class="flex items-center gap-8 mb-8" data-v-0a76af8d><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-300 text-sm text-gray-600" data-v-0a76af8d>`);
      _push(ssrRenderComponent(unref(Clock), { class: "h-4 w-4" }, null, _parent));
      _push(`<span class="font-manrope" data-v-0a76af8d>~2h responses</span></div><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-300 text-sm text-gray-600" data-v-0a76af8d>`);
      _push(ssrRenderComponent(unref(Headphones), { class: "h-4 w-4" }, null, _parent));
      _push(`<span class="font-manrope" data-v-0a76af8d>24/7 support</span></div></div>`);
      _push(ssrRenderComponent(Card, { class: "bg-[#F1F9FC] rounded-2xl border border-[#E5E7EB] w-full max-w-[590px] h-[656px]" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(CardContent, { class: "p-[35px]" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h3 class="font-manrope text-lg font-medium text-gray-900 mb-6" data-v-0a76af8d${_scopeId2}>Send us a message.</h3><form class="space-y-6 max-w-[520px]" data-v-0a76af8d${_scopeId2}><div data-v-0a76af8d${_scopeId2}><label for="fullName" class="block font-manrope text-sm font-medium text-[#374151] mb-2" data-v-0a76af8d${_scopeId2}> Full Name<span class="text-red-500" data-v-0a76af8d${_scopeId2}>*</span></label>`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    id: "fullName",
                    modelValue: formData.value.fullName,
                    "onUpdate:modelValue": ($event) => formData.value.fullName = $event,
                    type: "text",
                    placeholder: "Enter your name",
                    required: "",
                    "custom-class": "w-full px-4 py-2.5 bg-white border border-[#D1D5DB] rounded-lg font-manrope font-normal text-sm leading-6 focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div data-v-0a76af8d${_scopeId2}><label for="email" class="block font-manrope text-sm font-medium text-[#374151] mb-2" data-v-0a76af8d${_scopeId2}> Email Address<span class="text-red-500" data-v-0a76af8d${_scopeId2}>*</span></label>`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    id: "email",
                    modelValue: formData.value.email,
                    "onUpdate:modelValue": ($event) => formData.value.email = $event,
                    type: "email",
                    placeholder: "Enter your email",
                    required: "",
                    "custom-class": "w-full px-4 py-2.5 bg-white border border-[#D1D5DB] rounded-lg font-manrope font-normal text-sm leading-6 focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div data-v-0a76af8d${_scopeId2}><label for="helpTopic" class="block font-manrope text-sm font-medium text-[#374151] mb-2" data-v-0a76af8d${_scopeId2}> What can we help you with?<span class="text-red-500" data-v-0a76af8d${_scopeId2}>*</span></label><div class="relative" data-v-0a76af8d${_scopeId2}><select id="helpTopic" required class="${ssrRenderClass([formData.value.helpTopic ? "text-[#111827]" : "text-[#71717B]", "w-full px-4 py-2.5 pr-10 bg-white border border-[#D1D5DB] rounded-lg font-manrope font-normal text-sm leading-6 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent transition-all"])}" data-v-0a76af8d${_scopeId2}><option value="" disabled data-v-0a76af8d${ssrIncludeBooleanAttr(Array.isArray(formData.value.helpTopic) ? ssrLooseContain(formData.value.helpTopic, "") : ssrLooseEqual(formData.value.helpTopic, "")) ? " selected" : ""}${_scopeId2}>Select...</option><option value="general" data-v-0a76af8d${ssrIncludeBooleanAttr(Array.isArray(formData.value.helpTopic) ? ssrLooseContain(formData.value.helpTopic, "general") : ssrLooseEqual(formData.value.helpTopic, "general")) ? " selected" : ""}${_scopeId2}>General Inquiry</option><option value="visa" data-v-0a76af8d${ssrIncludeBooleanAttr(Array.isArray(formData.value.helpTopic) ? ssrLooseContain(formData.value.helpTopic, "visa") : ssrLooseEqual(formData.value.helpTopic, "visa")) ? " selected" : ""}${_scopeId2}>Visa Application</option><option value="support" data-v-0a76af8d${ssrIncludeBooleanAttr(Array.isArray(formData.value.helpTopic) ? ssrLooseContain(formData.value.helpTopic, "support") : ssrLooseEqual(formData.value.helpTopic, "support")) ? " selected" : ""}${_scopeId2}>Technical Support</option><option value="partnership" data-v-0a76af8d${ssrIncludeBooleanAttr(Array.isArray(formData.value.helpTopic) ? ssrLooseContain(formData.value.helpTopic, "partnership") : ssrLooseEqual(formData.value.helpTopic, "partnership")) ? " selected" : ""}${_scopeId2}>Partnership</option><option value="other" data-v-0a76af8d${ssrIncludeBooleanAttr(Array.isArray(formData.value.helpTopic) ? ssrLooseContain(formData.value.helpTopic, "other") : ssrLooseEqual(formData.value.helpTopic, "other")) ? " selected" : ""}${_scopeId2}>Other</option></select>`);
                  _push3(ssrRenderComponent(unref(ChevronDown), { class: "absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div data-v-0a76af8d${_scopeId2}><label for="message" class="block font-manrope text-sm font-medium text-[#374151] mb-2" data-v-0a76af8d${_scopeId2}> Message<span class="text-red-500" data-v-0a76af8d${_scopeId2}>*</span></label><textarea id="message" placeholder="Enter your message" required rows="5" class="w-full px-4 py-2.5 bg-white border border-[#D1D5DB] rounded-lg font-manrope font-normal text-sm leading-6 resize-none focus:outline-none focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent transition-all placeholder:text-[#71717B]" data-v-0a76af8d${_scopeId2}>${ssrInterpolate(formData.value.message)}</textarea></div>`);
                  _push3(ssrRenderComponent(Button, {
                    type: "submit",
                    class: "w-full h-[50px] !bg-[#1ECB84] hover:!bg-[#1AB876] !text-white font-manrope font-semibold rounded-lg"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Send Message `);
                      } else {
                        return [
                          createTextVNode(" Send Message ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</form>`);
                } else {
                  return [
                    createVNode("h3", { class: "font-manrope text-lg font-medium text-gray-900 mb-6" }, "Send us a message."),
                    createVNode("form", {
                      onSubmit: withModifiers(handleSubmit, ["prevent"]),
                      class: "space-y-6 max-w-[520px]"
                    }, [
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "fullName",
                          class: "block font-manrope text-sm font-medium text-[#374151] mb-2"
                        }, [
                          createTextVNode(" Full Name"),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode(_sfc_main$1, {
                          id: "fullName",
                          modelValue: formData.value.fullName,
                          "onUpdate:modelValue": ($event) => formData.value.fullName = $event,
                          type: "text",
                          placeholder: "Enter your name",
                          required: "",
                          "custom-class": "w-full px-4 py-2.5 bg-white border border-[#D1D5DB] rounded-lg font-manrope font-normal text-sm leading-6 focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "email",
                          class: "block font-manrope text-sm font-medium text-[#374151] mb-2"
                        }, [
                          createTextVNode(" Email Address"),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode(_sfc_main$1, {
                          id: "email",
                          modelValue: formData.value.email,
                          "onUpdate:modelValue": ($event) => formData.value.email = $event,
                          type: "email",
                          placeholder: "Enter your email",
                          required: "",
                          "custom-class": "w-full px-4 py-2.5 bg-white border border-[#D1D5DB] rounded-lg font-manrope font-normal text-sm leading-6 focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "helpTopic",
                          class: "block font-manrope text-sm font-medium text-[#374151] mb-2"
                        }, [
                          createTextVNode(" What can we help you with?"),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode("div", { class: "relative" }, [
                          withDirectives(createVNode("select", {
                            id: "helpTopic",
                            "onUpdate:modelValue": ($event) => formData.value.helpTopic = $event,
                            required: "",
                            class: ["w-full px-4 py-2.5 pr-10 bg-white border border-[#D1D5DB] rounded-lg font-manrope font-normal text-sm leading-6 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent transition-all", formData.value.helpTopic ? "text-[#111827]" : "text-[#71717B]"]
                          }, [
                            createVNode("option", {
                              value: "",
                              disabled: ""
                            }, "Select..."),
                            createVNode("option", { value: "general" }, "General Inquiry"),
                            createVNode("option", { value: "visa" }, "Visa Application"),
                            createVNode("option", { value: "support" }, "Technical Support"),
                            createVNode("option", { value: "partnership" }, "Partnership"),
                            createVNode("option", { value: "other" }, "Other")
                          ], 10, ["onUpdate:modelValue"]), [
                            [vModelSelect, formData.value.helpTopic]
                          ]),
                          createVNode(unref(ChevronDown), { class: "absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" })
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "message",
                          class: "block font-manrope text-sm font-medium text-[#374151] mb-2"
                        }, [
                          createTextVNode(" Message"),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("textarea", {
                          id: "message",
                          "onUpdate:modelValue": ($event) => formData.value.message = $event,
                          placeholder: "Enter your message",
                          required: "",
                          rows: "5",
                          class: "w-full px-4 py-2.5 bg-white border border-[#D1D5DB] rounded-lg font-manrope font-normal text-sm leading-6 resize-none focus:outline-none focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent transition-all placeholder:text-[#71717B]"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, formData.value.message]
                        ])
                      ]),
                      createVNode(Button, {
                        type: "submit",
                        class: "w-full h-[50px] !bg-[#1ECB84] hover:!bg-[#1AB876] !text-white font-manrope font-semibold rounded-lg"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Send Message ")
                        ]),
                        _: 1
                      })
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(CardContent, { class: "p-[35px]" }, {
                default: withCtx(() => [
                  createVNode("h3", { class: "font-manrope text-lg font-medium text-gray-900 mb-6" }, "Send us a message."),
                  createVNode("form", {
                    onSubmit: withModifiers(handleSubmit, ["prevent"]),
                    class: "space-y-6 max-w-[520px]"
                  }, [
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "fullName",
                        class: "block font-manrope text-sm font-medium text-[#374151] mb-2"
                      }, [
                        createTextVNode(" Full Name"),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      createVNode(_sfc_main$1, {
                        id: "fullName",
                        modelValue: formData.value.fullName,
                        "onUpdate:modelValue": ($event) => formData.value.fullName = $event,
                        type: "text",
                        placeholder: "Enter your name",
                        required: "",
                        "custom-class": "w-full px-4 py-2.5 bg-white border border-[#D1D5DB] rounded-lg font-manrope font-normal text-sm leading-6 focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "email",
                        class: "block font-manrope text-sm font-medium text-[#374151] mb-2"
                      }, [
                        createTextVNode(" Email Address"),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      createVNode(_sfc_main$1, {
                        id: "email",
                        modelValue: formData.value.email,
                        "onUpdate:modelValue": ($event) => formData.value.email = $event,
                        type: "email",
                        placeholder: "Enter your email",
                        required: "",
                        "custom-class": "w-full px-4 py-2.5 bg-white border border-[#D1D5DB] rounded-lg font-manrope font-normal text-sm leading-6 focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "helpTopic",
                        class: "block font-manrope text-sm font-medium text-[#374151] mb-2"
                      }, [
                        createTextVNode(" What can we help you with?"),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      createVNode("div", { class: "relative" }, [
                        withDirectives(createVNode("select", {
                          id: "helpTopic",
                          "onUpdate:modelValue": ($event) => formData.value.helpTopic = $event,
                          required: "",
                          class: ["w-full px-4 py-2.5 pr-10 bg-white border border-[#D1D5DB] rounded-lg font-manrope font-normal text-sm leading-6 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent transition-all", formData.value.helpTopic ? "text-[#111827]" : "text-[#71717B]"]
                        }, [
                          createVNode("option", {
                            value: "",
                            disabled: ""
                          }, "Select..."),
                          createVNode("option", { value: "general" }, "General Inquiry"),
                          createVNode("option", { value: "visa" }, "Visa Application"),
                          createVNode("option", { value: "support" }, "Technical Support"),
                          createVNode("option", { value: "partnership" }, "Partnership"),
                          createVNode("option", { value: "other" }, "Other")
                        ], 10, ["onUpdate:modelValue"]), [
                          [vModelSelect, formData.value.helpTopic]
                        ]),
                        createVNode(unref(ChevronDown), { class: "absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" })
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "message",
                        class: "block font-manrope text-sm font-medium text-[#374151] mb-2"
                      }, [
                        createTextVNode(" Message"),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      withDirectives(createVNode("textarea", {
                        id: "message",
                        "onUpdate:modelValue": ($event) => formData.value.message = $event,
                        placeholder: "Enter your message",
                        required: "",
                        rows: "5",
                        class: "w-full px-4 py-2.5 bg-white border border-[#D1D5DB] rounded-lg font-manrope font-normal text-sm leading-6 resize-none focus:outline-none focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent transition-all placeholder:text-[#71717B]"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, formData.value.message]
                      ])
                    ]),
                    createVNode(Button, {
                      type: "submit",
                      class: "w-full h-[50px] !bg-[#1ECB84] hover:!bg-[#1AB876] !text-white font-manrope font-semibold rounded-lg"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Send Message ")
                      ]),
                      _: 1
                    })
                  ], 32)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-0a76af8d>`);
      _push(ssrRenderComponent(Card, { class: "w-full max-w-[590px] h-[676px] rounded-2xl border border-[#D4D4D8]" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(CardContent, { class: "p-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-8 max-w-[542px]" data-v-0a76af8d${_scopeId2}><div data-v-0a76af8d${_scopeId2}><img${ssrRenderAttr("src", _imports_0)} alt="pin" class="h-6 w-6 mb-4" data-v-0a76af8d${_scopeId2}><h3 class="font-manrope font-semibold text-lg leading-8 mb-2" data-v-0a76af8d${_scopeId2}>Dubai Office</h3><p class="font-manrope font-normal text-base leading-7 text-[#3F3F46]" data-v-0a76af8d${_scopeId2}> Visa 123 LLC Shams Business Centre Sharjah media City Free Zone Al Messaned Sharjah </p></div><div class="h-px bg-gray-200" data-v-0a76af8d${_scopeId2}></div><div data-v-0a76af8d${_scopeId2}><img${ssrRenderAttr("src", _imports_1)} alt="calendar" class="h-6 w-6 mb-4" data-v-0a76af8d${_scopeId2}><h4 class="font-manrope font-semibold text-lg leading-8 mb-2" data-v-0a76af8d${_scopeId2}>Contact</h4><div class="space-y-2" data-v-0a76af8d${_scopeId2}><p class="font-manrope font-medium text-base leading-7 text-gray-700" data-v-0a76af8d${_scopeId2}> +971 585743188 </p><p class="font-manrope font-normal text-base leading-7 text-[#3F3F46]" data-v-0a76af8d${_scopeId2}> contact@visa123.com </p></div></div><div data-v-0a76af8d${_scopeId2}>`);
                  _push3(ssrRenderComponent(Button, {
                    onClick: handleContactClick,
                    class: "w-[173px] h-[46px] !bg-[#1ECB84] hover:!bg-[#1AB876] !text-white font-manrope font-semibold rounded-[10px]"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Contact Us `);
                      } else {
                        return [
                          createTextVNode(" Contact Us ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="w-full max-w-[542px] h-[246px] rounded-xl overflow-hidden" data-v-0a76af8d${_scopeId2}><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.3967074085084!2d55.372853!3d25.223533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sShams%20Business%20Centre%2C%20Sharjah%20Media%20City%20Free%20Zone!5e0!3m2!1sen!2sae!4v1234567890" width="100%" height="70%" style="${ssrRenderStyle({ "border": "0" })}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" data-v-0a76af8d${_scopeId2}></iframe></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-8 max-w-[542px]" }, [
                      createVNode("div", null, [
                        createVNode("img", {
                          src: _imports_0,
                          alt: "pin",
                          class: "h-6 w-6 mb-4"
                        }),
                        createVNode("h3", { class: "font-manrope font-semibold text-lg leading-8 mb-2" }, "Dubai Office"),
                        createVNode("p", { class: "font-manrope font-normal text-base leading-7 text-[#3F3F46]" }, " Visa 123 LLC Shams Business Centre Sharjah media City Free Zone Al Messaned Sharjah ")
                      ]),
                      createVNode("div", { class: "h-px bg-gray-200" }),
                      createVNode("div", null, [
                        createVNode("img", {
                          src: _imports_1,
                          alt: "calendar",
                          class: "h-6 w-6 mb-4"
                        }),
                        createVNode("h4", { class: "font-manrope font-semibold text-lg leading-8 mb-2" }, "Contact"),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("p", { class: "font-manrope font-medium text-base leading-7 text-gray-700" }, " +971 585743188 "),
                          createVNode("p", { class: "font-manrope font-normal text-base leading-7 text-[#3F3F46]" }, " contact@visa123.com ")
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode(Button, {
                          onClick: handleContactClick,
                          class: "w-[173px] h-[46px] !bg-[#1ECB84] hover:!bg-[#1AB876] !text-white font-manrope font-semibold rounded-[10px]"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Contact Us ")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "w-full max-w-[542px] h-[246px] rounded-xl overflow-hidden" }, [
                        createVNode("iframe", {
                          src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.3967074085084!2d55.372853!3d25.223533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sShams%20Business%20Centre%2C%20Sharjah%20Media%20City%20Free%20Zone!5e0!3m2!1sen!2sae!4v1234567890",
                          width: "100%",
                          height: "70%",
                          style: { "border": "0" },
                          allowfullscreen: "",
                          loading: "lazy",
                          referrerpolicy: "no-referrer-when-downgrade"
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(CardContent, { class: "p-6" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-8 max-w-[542px]" }, [
                    createVNode("div", null, [
                      createVNode("img", {
                        src: _imports_0,
                        alt: "pin",
                        class: "h-6 w-6 mb-4"
                      }),
                      createVNode("h3", { class: "font-manrope font-semibold text-lg leading-8 mb-2" }, "Dubai Office"),
                      createVNode("p", { class: "font-manrope font-normal text-base leading-7 text-[#3F3F46]" }, " Visa 123 LLC Shams Business Centre Sharjah media City Free Zone Al Messaned Sharjah ")
                    ]),
                    createVNode("div", { class: "h-px bg-gray-200" }),
                    createVNode("div", null, [
                      createVNode("img", {
                        src: _imports_1,
                        alt: "calendar",
                        class: "h-6 w-6 mb-4"
                      }),
                      createVNode("h4", { class: "font-manrope font-semibold text-lg leading-8 mb-2" }, "Contact"),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("p", { class: "font-manrope font-medium text-base leading-7 text-gray-700" }, " +971 585743188 "),
                        createVNode("p", { class: "font-manrope font-normal text-base leading-7 text-[#3F3F46]" }, " contact@visa123.com ")
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode(Button, {
                        onClick: handleContactClick,
                        class: "w-[173px] h-[46px] !bg-[#1ECB84] hover:!bg-[#1AB876] !text-white font-manrope font-semibold rounded-[10px]"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Contact Us ")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "w-full max-w-[542px] h-[246px] rounded-xl overflow-hidden" }, [
                      createVNode("iframe", {
                        src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.3967074085084!2d55.372853!3d25.223533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sShams%20Business%20Centre%2C%20Sharjah%20Media%20City%20Free%20Zone!5e0!3m2!1sen!2sae!4v1234567890",
                        width: "100%",
                        height: "70%",
                        style: { "border": "0" },
                        allowfullscreen: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer-when-downgrade"
                      })
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact-us.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const contactUs = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0a76af8d"]]);

export { contactUs as default };
//# sourceMappingURL=contact-us-CbyZcDcq.mjs.map
