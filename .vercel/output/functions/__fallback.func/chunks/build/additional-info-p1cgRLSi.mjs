import { defineComponent, ref, reactive, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, unref, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import _sfc_main$1 from './input-BjW8rXgt.mjs';
import Button from './button-Cy1RM3F0.mjs';
import Select from './Select-BT9XQi4a.mjs';
import SelectTrigger from './SelectTrigger-BwVa_K9-.mjs';
import SelectValue from './SelectValue-BEkb05o4.mjs';
import SelectContent from './SelectContent-BojwDvXK.mjs';
import SelectItem from './SelectItem-RYQOH1xm.mjs';
import 'class-variance-authority';
import './utils-BpV8ZjlK.mjs';
import 'radix-vue';
import 'lucide-vue-next';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "additional-info",
  __ssrInlineRender: true,
  setup(__props) {
    const isSubmitting = ref(false);
    const fileInput = ref();
    const formData = reactive({
      plannedArrival: { day: "", month: "", year: "" },
      plannedReturn: { day: "", month: "", year: "" },
      firstName: "",
      familyName: "",
      dateOfBirth: { day: "", month: "", year: "" },
      residencePermitNumber: "",
      countryOfBirth: "",
      currentNationality: "",
      originalNationality: "",
      gender: "",
      maritalStatus: "",
      otherMaritalStatus: "",
      profession: "",
      fatherName: "",
      motherName: "",
      passportType: "",
      otherPassportType: "",
      passportNumber: "",
      issuedBy: "",
      serialNumber: "",
      dateOfIssue: { day: "", month: "", year: "" },
      dateOfExpiration: { day: "", month: "", year: "" },
      purposeOfTravel: "",
      otherPurposeOfTravel: "",
      typeOfVisa: "",
      numberOfEntries: "",
      durationOfStay: "",
      arrivalDate: { day: "", month: "", year: "" },
      borderEntry: "",
      meanOfTransport: "",
      previousVisas: "",
      previousVisaDate: { day: "", month: "", year: "" },
      previousVisaNumber: "",
      previousVisaPlaceOfIssue: "",
      previousVisaDuration: "",
      entryPermitFile: null,
      entryPermitValidUntil: { day: "", month: "", year: "" },
      entryPermitIssuedBy: "",
      countryOfDestination: "",
      hostCompanyName: "",
      hostCompanyAddress: "",
      hostCompanyPhone: "",
      hostCompanyFax: "",
      hostCompanyEmail: "",
      payerOfTrip: "",
      insuranceValidUntil: { day: "", month: "", year: "" },
      childrenDetails: "",
      applicantAddress: "",
      applicantPhone: "",
      applicantEmail: ""
    });
    const dayOptions = Array.from({ length: 31 }, (_, i) => ({
      value: String(i + 1),
      label: String(i + 1)
    }));
    const monthOptions = [
      { value: "1", label: "January" },
      { value: "2", label: "February" },
      { value: "3", label: "March" },
      { value: "4", label: "April" },
      { value: "5", label: "May" },
      { value: "6", label: "June" },
      { value: "7", label: "July" },
      { value: "8", label: "August" },
      { value: "9", label: "September" },
      { value: "10", label: "October" },
      { value: "11", label: "November" },
      { value: "12", label: "December" }
    ];
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const yearOptions = Array.from({ length: 10 }, (_, i) => ({
      value: String(currentYear + i),
      label: String(currentYear + i)
    }));
    const birthYearOptions = Array.from({ length: 100 }, (_, i) => ({
      value: String(currentYear - i),
      label: String(currentYear - i)
    }));
    const countryOptions = [
      { value: "morocco", label: "Morocco" },
      { value: "pakistan", label: "Pakistan" },
      { value: "usa", label: "United States" },
      { value: "uk", label: "United Kingdom" },
      { value: "canada", label: "Canada" }
    ];
    const genderOptions = [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" }
    ];
    const maritalStatusOptions = [
      { value: "single", label: "Single" },
      { value: "married", label: "Married" },
      { value: "divorced", label: "Divorced" },
      { value: "widowed", label: "Widowed" }
    ];
    const professionOptions = [
      { value: "doctor", label: "Doctor" },
      { value: "engineer", label: "Engineer" },
      { value: "teacher", label: "Teacher" },
      { value: "business", label: "Business" },
      { value: "other", label: "Other" }
    ];
    const passportTypeOptions = [
      { value: "diplomatic", label: "Diplomatic" },
      { value: "official", label: "Official" },
      { value: "ordinary", label: "Ordinary" }
    ];
    const purposeOptions = [
      { value: "family", label: "Family visit" },
      { value: "business", label: "Business" },
      { value: "tourism", label: "Tourism" },
      { value: "education", label: "Education" }
    ];
    const visaTypeOptions = [
      { value: "30", label: "30 day" },
      { value: "60", label: "60 day" },
      { value: "90", label: "90 day" }
    ];
    const durationOptions = [
      { value: "30", label: "30 days" },
      { value: "60", label: "60 days" },
      { value: "90", label: "90 days" }
    ];
    const borderRouteOptions = [
      { value: "xyz", label: "xyz routee" },
      { value: "abc", label: "abc route" }
    ];
    const transportOptions = [
      { value: "car", label: "Car" },
      { value: "plane", label: "Plane" },
      { value: "bus", label: "Bus" },
      { value: "train", label: "Train" }
    ];
    const payerOptions = [
      { value: "self", label: "Self" },
      { value: "company", label: "Company" },
      { value: "sponsor", label: "Sponsor" }
    ];
    const handleFileUpload = (event) => {
      const target = event.target;
      if (target.files && target.files[0]) {
        formData.entryPermitFile = target.files[0];
      }
    };
    const handleSubmit = async () => {
      isSubmitting.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 2e3));
        console.log("Form submitted:", formData);
        alert("Form submitted successfully!");
      } catch (error) {
        console.error("Submission failed:", error);
        alert("Submission failed. Please try again.");
      } finally {
        isSubmitting.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen py-10 pb-32 px-52" }, _attrs))}><div class="max-w-3xl mx-auto space-y-6"><div class="flex items-center justify-between"><h1 class="text-2xl font-semibold leading-8" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617", "letter-spacing": "-0.006em" })}"> Additional Information </h1>`);
      _push(ssrRenderComponent(Button, {
        onClick: handleSubmit,
        class: "h-9 px-4 rounded-md text-white font-medium text-sm",
        style: { "background-color": "#1ECE84", "font-family": "Geist", "width": "79px" },
        disabled: isSubmitting.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(isSubmitting.value ? "Submitting..." : "Submit")}`);
          } else {
            return [
              createTextVNode(toDisplayString(isSubmitting.value ? "Submitting..." : "Submit"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><form class="border rounded-xl p-4 pt-8 pb-8 bg-white space-y-4" style="${ssrRenderStyle({ "border-color": "#E4E4E8" })}"><div class="px-6"><h2 class="text-base font-semibold leading-4" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#27272B" })}"> Morocco Standard Visa </h2></div><div class="px-6 space-y-4"><label class="block text-sm font-medium leading-5" style="${ssrRenderStyle({ "font-family": "Inter", "color": "#020617", "letter-spacing": "-0.006em" })}"> Planned Arrival Date </label><div class="grid grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.plannedArrival.day,
        "onUpdate:modelValue": ($event) => formData.plannedArrival.day = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Day" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Day" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(dayOptions), (day) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: day.value,
                      value: day.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(day.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(day.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(dayOptions), (day) => {
                      return openBlock(), createBlock(SelectItem, {
                        key: day.value,
                        value: day.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(day.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Day" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(dayOptions), (day) => {
                    return openBlock(), createBlock(SelectItem, {
                      key: day.value,
                      value: day.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(day.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Select, {
        modelValue: formData.plannedArrival.month,
        "onUpdate:modelValue": ($event) => formData.plannedArrival.month = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
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
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(monthOptions, (month) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: month.value,
                      value: month.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(month.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(month.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(monthOptions, (month) => {
                      return createVNode(SelectItem, {
                        key: month.value,
                        value: month.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(month.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Month" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(monthOptions, (month) => {
                    return createVNode(SelectItem, {
                      key: month.value,
                      value: month.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(month.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Select, {
        modelValue: formData.plannedArrival.year,
        "onUpdate:modelValue": ($event) => formData.plannedArrival.year = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
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
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(yearOptions), (year) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: year.value,
                      value: year.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(year.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(year.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(yearOptions), (year) => {
                      return openBlock(), createBlock(SelectItem, {
                        key: year.value,
                        value: year.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(year.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Year" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(yearOptions), (year) => {
                    return openBlock(), createBlock(SelectItem, {
                      key: year.value,
                      value: year.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(year.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Planned Return Date </label><div class="grid grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.plannedReturn.day,
        "onUpdate:modelValue": ($event) => formData.plannedReturn.day = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Day" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Day" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(dayOptions), (day) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: day.value,
                      value: day.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(day.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(day.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(dayOptions), (day) => {
                      return openBlock(), createBlock(SelectItem, {
                        key: day.value,
                        value: day.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(day.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Day" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(dayOptions), (day) => {
                    return openBlock(), createBlock(SelectItem, {
                      key: day.value,
                      value: day.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(day.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Select, {
        modelValue: formData.plannedReturn.month,
        "onUpdate:modelValue": ($event) => formData.plannedReturn.month = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
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
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(monthOptions, (month) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: month.value,
                      value: month.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(month.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(month.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(monthOptions, (month) => {
                      return createVNode(SelectItem, {
                        key: month.value,
                        value: month.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(month.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Month" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(monthOptions, (month) => {
                    return createVNode(SelectItem, {
                      key: month.value,
                      value: month.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(month.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Select, {
        modelValue: formData.plannedReturn.year,
        "onUpdate:modelValue": ($event) => formData.plannedReturn.year = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
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
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(yearOptions), (year) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: year.value,
                      value: year.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(year.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(year.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(yearOptions), (year) => {
                      return openBlock(), createBlock(SelectItem, {
                        key: year.value,
                        value: year.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(year.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Year" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(yearOptions), (year) => {
                    return openBlock(), createBlock(SelectItem, {
                      key: year.value,
                      value: year.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(year.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> First Name </label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.firstName,
        "onUpdate:modelValue": ($event) => formData.firstName = $event,
        placeholder: "Jon Doe",
        class: "w-full h-9 border",
        style: { "border-color": "#D4D4DA" }
      }, null, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Family Name </label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.familyName,
        "onUpdate:modelValue": ($event) => formData.familyName = $event,
        placeholder: "Jon Doe",
        class: "w-full h-9 border",
        style: { "border-color": "#D4D4DA" }
      }, null, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Date of Birth </label><div class="grid grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.dateOfBirth.day,
        "onUpdate:modelValue": ($event) => formData.dateOfBirth.day = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Day" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Day" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(dayOptions), (day) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: day.value,
                      value: day.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(day.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(day.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(dayOptions), (day) => {
                      return openBlock(), createBlock(SelectItem, {
                        key: day.value,
                        value: day.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(day.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Day" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(dayOptions), (day) => {
                    return openBlock(), createBlock(SelectItem, {
                      key: day.value,
                      value: day.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(day.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Select, {
        modelValue: formData.dateOfBirth.month,
        "onUpdate:modelValue": ($event) => formData.dateOfBirth.month = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
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
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(monthOptions, (month) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: month.value,
                      value: month.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(month.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(month.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(monthOptions, (month) => {
                      return createVNode(SelectItem, {
                        key: month.value,
                        value: month.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(month.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Month" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(monthOptions, (month) => {
                    return createVNode(SelectItem, {
                      key: month.value,
                      value: month.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(month.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Select, {
        modelValue: formData.dateOfBirth.year,
        "onUpdate:modelValue": ($event) => formData.dateOfBirth.year = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
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
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(birthYearOptions), (year) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: year.value,
                      value: year.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(year.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(year.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(birthYearOptions), (year) => {
                      return openBlock(), createBlock(SelectItem, {
                        key: year.value,
                        value: year.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(year.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Year" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(birthYearOptions), (year) => {
                    return openBlock(), createBlock(SelectItem, {
                      key: year.value,
                      value: year.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(year.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Residence Permit Number </label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.residencePermitNumber,
        "onUpdate:modelValue": ($event) => formData.residencePermitNumber = $event,
        placeholder: "289r4298409827349",
        class: "w-full h-9 border",
        style: { "border-color": "#D4D4DA" }
      }, null, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Country of Birth </label>`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.countryOfBirth,
        "onUpdate:modelValue": ($event) => formData.countryOfBirth = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Select Country" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Select Country" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(countryOptions, (country) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: country.value,
                      value: country.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(country.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(country.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(countryOptions, (country) => {
                      return createVNode(SelectItem, {
                        key: country.value,
                        value: country.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(country.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Select Country" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(countryOptions, (country) => {
                    return createVNode(SelectItem, {
                      key: country.value,
                      value: country.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(country.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Current Nationality </label>`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.currentNationality,
        "onUpdate:modelValue": ($event) => formData.currentNationality = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Select Country" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Select Country" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(countryOptions, (country) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: country.value,
                      value: country.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(country.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(country.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(countryOptions, (country) => {
                      return createVNode(SelectItem, {
                        key: country.value,
                        value: country.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(country.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Select Country" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(countryOptions, (country) => {
                    return createVNode(SelectItem, {
                      key: country.value,
                      value: country.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(country.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Original Nationality </label>`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.originalNationality,
        "onUpdate:modelValue": ($event) => formData.originalNationality = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Select Country" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Select Country" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(countryOptions, (country) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: country.value,
                      value: country.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(country.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(country.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(countryOptions, (country) => {
                      return createVNode(SelectItem, {
                        key: country.value,
                        value: country.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(country.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Select Country" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(countryOptions, (country) => {
                    return createVNode(SelectItem, {
                      key: country.value,
                      value: country.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(country.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Gender </label>`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.gender,
        "onUpdate:modelValue": ($event) => formData.gender = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Male" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Male" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(genderOptions, (gender) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: gender.value,
                      value: gender.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(gender.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(gender.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(genderOptions, (gender) => {
                      return createVNode(SelectItem, {
                        key: gender.value,
                        value: gender.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(gender.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Male" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(genderOptions, (gender) => {
                    return createVNode(SelectItem, {
                      key: gender.value,
                      value: gender.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(gender.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Marital Status </label>`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.maritalStatus,
        "onUpdate:modelValue": ($event) => formData.maritalStatus = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Single" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Single" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(maritalStatusOptions, (status) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: status.value,
                      value: status.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(status.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(status.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(maritalStatusOptions, (status) => {
                      return createVNode(SelectItem, {
                        key: status.value,
                        value: status.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(status.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Single" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(maritalStatusOptions, (status) => {
                    return createVNode(SelectItem, {
                      key: status.value,
                      value: status.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(status.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Other Marital Status </label>`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.otherMaritalStatus,
        "onUpdate:modelValue": ($event) => formData.otherMaritalStatus = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Single" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Single" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(maritalStatusOptions, (status) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: status.value,
                      value: status.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(status.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(status.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(maritalStatusOptions, (status) => {
                      return createVNode(SelectItem, {
                        key: status.value,
                        value: status.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(status.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Single" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(maritalStatusOptions, (status) => {
                    return createVNode(SelectItem, {
                      key: status.value,
                      value: status.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(status.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Profession </label>`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.profession,
        "onUpdate:modelValue": ($event) => formData.profession = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Doctor" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Doctor" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(professionOptions, (profession) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: profession.value,
                      value: profession.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(profession.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(profession.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(professionOptions, (profession) => {
                      return createVNode(SelectItem, {
                        key: profession.value,
                        value: profession.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(profession.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Doctor" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(professionOptions, (profession) => {
                    return createVNode(SelectItem, {
                      key: profession.value,
                      value: profession.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(profession.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Father Name </label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.fatherName,
        "onUpdate:modelValue": ($event) => formData.fatherName = $event,
        placeholder: "Jon Doe",
        class: "w-full h-9 border",
        style: { "border-color": "#D4D4DA" }
      }, null, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Mother name </label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.motherName,
        "onUpdate:modelValue": ($event) => formData.motherName = $event,
        placeholder: "Jon Doe",
        class: "w-full h-9 border",
        style: { "border-color": "#D4D4DA" }
      }, null, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Passport Type </label>`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.passportType,
        "onUpdate:modelValue": ($event) => formData.passportType = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "diplomatic" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "diplomatic" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(passportTypeOptions, (type) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: type.value,
                      value: type.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(type.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(type.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(passportTypeOptions, (type) => {
                      return createVNode(SelectItem, {
                        key: type.value,
                        value: type.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(type.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "diplomatic" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(passportTypeOptions, (type) => {
                    return createVNode(SelectItem, {
                      key: type.value,
                      value: type.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(type.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Other Passport Type </label>`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.otherPassportType,
        "onUpdate:modelValue": ($event) => formData.otherPassportType = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "diplomatic" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "diplomatic" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(passportTypeOptions, (type) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: type.value,
                      value: type.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(type.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(type.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(passportTypeOptions, (type) => {
                      return createVNode(SelectItem, {
                        key: type.value,
                        value: type.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(type.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "diplomatic" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(passportTypeOptions, (type) => {
                    return createVNode(SelectItem, {
                      key: type.value,
                      value: type.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(type.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Passport Number </label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.passportNumber,
        "onUpdate:modelValue": ($event) => formData.passportNumber = $event,
        placeholder: "92837498479217392",
        class: "w-full h-9 border",
        style: { "border-color": "#D4D4DA" }
      }, null, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Issued by </label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.issuedBy,
        "onUpdate:modelValue": ($event) => formData.issuedBy = $event,
        placeholder: "----",
        class: "w-full h-9 border",
        style: { "border-color": "#D4D4DA" }
      }, null, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Serial Number </label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.serialNumber,
        "onUpdate:modelValue": ($event) => formData.serialNumber = $event,
        placeholder: "928372987920203",
        class: "w-full h-9 border",
        style: { "border-color": "#D4D4DA" }
      }, null, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Date of Issue </label><div class="grid grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.dateOfIssue.day,
        "onUpdate:modelValue": ($event) => formData.dateOfIssue.day = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Day" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Day" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(dayOptions), (day) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: day.value,
                      value: day.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(day.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(day.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(dayOptions), (day) => {
                      return openBlock(), createBlock(SelectItem, {
                        key: day.value,
                        value: day.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(day.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Day" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(dayOptions), (day) => {
                    return openBlock(), createBlock(SelectItem, {
                      key: day.value,
                      value: day.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(day.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Select, {
        modelValue: formData.dateOfIssue.month,
        "onUpdate:modelValue": ($event) => formData.dateOfIssue.month = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
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
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(monthOptions, (month) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: month.value,
                      value: month.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(month.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(month.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(monthOptions, (month) => {
                      return createVNode(SelectItem, {
                        key: month.value,
                        value: month.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(month.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Month" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(monthOptions, (month) => {
                    return createVNode(SelectItem, {
                      key: month.value,
                      value: month.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(month.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Select, {
        modelValue: formData.dateOfIssue.year,
        "onUpdate:modelValue": ($event) => formData.dateOfIssue.year = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
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
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(yearOptions), (year) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: year.value,
                      value: year.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(year.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(year.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(yearOptions), (year) => {
                      return openBlock(), createBlock(SelectItem, {
                        key: year.value,
                        value: year.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(year.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Year" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(yearOptions), (year) => {
                    return openBlock(), createBlock(SelectItem, {
                      key: year.value,
                      value: year.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(year.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Date of Expiration </label><div class="grid grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.dateOfExpiration.day,
        "onUpdate:modelValue": ($event) => formData.dateOfExpiration.day = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Day" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Day" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(dayOptions), (day) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: day.value,
                      value: day.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(day.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(day.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(dayOptions), (day) => {
                      return openBlock(), createBlock(SelectItem, {
                        key: day.value,
                        value: day.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(day.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Day" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(dayOptions), (day) => {
                    return openBlock(), createBlock(SelectItem, {
                      key: day.value,
                      value: day.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(day.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Select, {
        modelValue: formData.dateOfExpiration.month,
        "onUpdate:modelValue": ($event) => formData.dateOfExpiration.month = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
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
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(monthOptions, (month) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: month.value,
                      value: month.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(month.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(month.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(monthOptions, (month) => {
                      return createVNode(SelectItem, {
                        key: month.value,
                        value: month.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(month.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Month" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(monthOptions, (month) => {
                    return createVNode(SelectItem, {
                      key: month.value,
                      value: month.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(month.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Select, {
        modelValue: formData.dateOfExpiration.year,
        "onUpdate:modelValue": ($event) => formData.dateOfExpiration.year = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
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
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(yearOptions), (year) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: year.value,
                      value: year.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(year.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(year.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(yearOptions), (year) => {
                      return openBlock(), createBlock(SelectItem, {
                        key: year.value,
                        value: year.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(year.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Year" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(yearOptions), (year) => {
                    return openBlock(), createBlock(SelectItem, {
                      key: year.value,
                      value: year.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(year.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Purpose of travel </label>`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.purposeOfTravel,
        "onUpdate:modelValue": ($event) => formData.purposeOfTravel = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Family visit" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Family visit" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(purposeOptions, (purpose) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: purpose.value,
                      value: purpose.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(purpose.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(purpose.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(purposeOptions, (purpose) => {
                      return createVNode(SelectItem, {
                        key: purpose.value,
                        value: purpose.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(purpose.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Family visit" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(purposeOptions, (purpose) => {
                    return createVNode(SelectItem, {
                      key: purpose.value,
                      value: purpose.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(purpose.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Other Purpose of travel </label>`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.otherPurposeOfTravel,
        "onUpdate:modelValue": ($event) => formData.otherPurposeOfTravel = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Family visit" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Family visit" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(purposeOptions, (purpose) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: purpose.value,
                      value: purpose.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(purpose.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(purpose.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(purposeOptions, (purpose) => {
                      return createVNode(SelectItem, {
                        key: purpose.value,
                        value: purpose.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(purpose.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Family visit" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(purposeOptions, (purpose) => {
                    return createVNode(SelectItem, {
                      key: purpose.value,
                      value: purpose.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(purpose.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Type of Visa </label>`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.typeOfVisa,
        "onUpdate:modelValue": ($event) => formData.typeOfVisa = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "30 day" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "30 day" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(visaTypeOptions, (type) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: type.value,
                      value: type.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(type.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(type.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(visaTypeOptions, (type) => {
                      return createVNode(SelectItem, {
                        key: type.value,
                        value: type.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(type.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "30 day" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(visaTypeOptions, (type) => {
                    return createVNode(SelectItem, {
                      key: type.value,
                      value: type.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(type.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Number of Entries </label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.numberOfEntries,
        "onUpdate:modelValue": ($event) => formData.numberOfEntries = $event,
        placeholder: "200",
        type: "number",
        class: "w-full h-9 border",
        style: { "border-color": "#D4D4DA" }
      }, null, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Duration of Stay </label>`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.durationOfStay,
        "onUpdate:modelValue": ($event) => formData.durationOfStay = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "30 days" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "30 days" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(durationOptions, (duration) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: duration.value,
                      value: duration.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(duration.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(duration.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(durationOptions, (duration) => {
                      return createVNode(SelectItem, {
                        key: duration.value,
                        value: duration.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(duration.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "30 days" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(durationOptions, (duration) => {
                    return createVNode(SelectItem, {
                      key: duration.value,
                      value: duration.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(duration.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Arrival Date </label><div class="grid grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.arrivalDate.day,
        "onUpdate:modelValue": ($event) => formData.arrivalDate.day = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Day" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Day" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(dayOptions), (day) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: day.value,
                      value: day.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(day.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(day.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(dayOptions), (day) => {
                      return openBlock(), createBlock(SelectItem, {
                        key: day.value,
                        value: day.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(day.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Day" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(dayOptions), (day) => {
                    return openBlock(), createBlock(SelectItem, {
                      key: day.value,
                      value: day.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(day.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Select, {
        modelValue: formData.arrivalDate.month,
        "onUpdate:modelValue": ($event) => formData.arrivalDate.month = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
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
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(monthOptions, (month) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: month.value,
                      value: month.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(month.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(month.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(monthOptions, (month) => {
                      return createVNode(SelectItem, {
                        key: month.value,
                        value: month.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(month.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Month" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(monthOptions, (month) => {
                    return createVNode(SelectItem, {
                      key: month.value,
                      value: month.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(month.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Select, {
        modelValue: formData.arrivalDate.year,
        "onUpdate:modelValue": ($event) => formData.arrivalDate.year = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
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
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(yearOptions), (year) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: year.value,
                      value: year.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(year.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(year.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(yearOptions), (year) => {
                      return openBlock(), createBlock(SelectItem, {
                        key: year.value,
                        value: year.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(year.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Year" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(yearOptions), (year) => {
                    return openBlock(), createBlock(SelectItem, {
                      key: year.value,
                      value: year.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(year.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Border entry or transit route </label>`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.borderEntry,
        "onUpdate:modelValue": ($event) => formData.borderEntry = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "xyz routee" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "xyz routee" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(borderRouteOptions, (route) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: route.value,
                      value: route.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(route.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(route.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(borderRouteOptions, (route) => {
                      return createVNode(SelectItem, {
                        key: route.value,
                        value: route.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(route.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "xyz routee" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(borderRouteOptions, (route) => {
                    return createVNode(SelectItem, {
                      key: route.value,
                      value: route.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(route.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Mean of Transport </label>`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.meanOfTransport,
        "onUpdate:modelValue": ($event) => formData.meanOfTransport = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Car" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Car" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(transportOptions, (transport) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: transport.value,
                      value: transport.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(transport.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(transport.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(transportOptions, (transport) => {
                      return createVNode(SelectItem, {
                        key: transport.value,
                        value: transport.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(transport.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Car" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(transportOptions, (transport) => {
                    return createVNode(SelectItem, {
                      key: transport.value,
                      value: transport.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(transport.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Previous Visas </label>`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.previousVisas,
        "onUpdate:modelValue": ($event) => formData.previousVisas = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Morocco" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Morocco" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(countryOptions, (country) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: country.value,
                      value: country.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(country.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(country.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(countryOptions, (country) => {
                      return createVNode(SelectItem, {
                        key: country.value,
                        value: country.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(country.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Morocco" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(countryOptions, (country) => {
                    return createVNode(SelectItem, {
                      key: country.value,
                      value: country.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(country.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Previous Visa Date </label><div class="grid grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.previousVisaDate.day,
        "onUpdate:modelValue": ($event) => formData.previousVisaDate.day = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Day" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Day" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(dayOptions), (day) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: day.value,
                      value: day.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(day.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(day.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(dayOptions), (day) => {
                      return openBlock(), createBlock(SelectItem, {
                        key: day.value,
                        value: day.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(day.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Day" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(dayOptions), (day) => {
                    return openBlock(), createBlock(SelectItem, {
                      key: day.value,
                      value: day.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(day.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Select, {
        modelValue: formData.previousVisaDate.month,
        "onUpdate:modelValue": ($event) => formData.previousVisaDate.month = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
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
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(monthOptions, (month) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: month.value,
                      value: month.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(month.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(month.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(monthOptions, (month) => {
                      return createVNode(SelectItem, {
                        key: month.value,
                        value: month.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(month.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Month" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(monthOptions, (month) => {
                    return createVNode(SelectItem, {
                      key: month.value,
                      value: month.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(month.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Select, {
        modelValue: formData.previousVisaDate.year,
        "onUpdate:modelValue": ($event) => formData.previousVisaDate.year = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
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
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(yearOptions), (year) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: year.value,
                      value: year.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(year.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(year.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(yearOptions), (year) => {
                      return openBlock(), createBlock(SelectItem, {
                        key: year.value,
                        value: year.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(year.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Year" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(yearOptions), (year) => {
                    return openBlock(), createBlock(SelectItem, {
                      key: year.value,
                      value: year.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(year.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Previous Visa number </label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.previousVisaNumber,
        "onUpdate:modelValue": ($event) => formData.previousVisaNumber = $event,
        placeholder: "928372987920203",
        class: "w-full h-9 border",
        style: { "border-color": "#D4D4DA" }
      }, null, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Previous Visa Place of Issue </label>`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.previousVisaPlaceOfIssue,
        "onUpdate:modelValue": ($event) => formData.previousVisaPlaceOfIssue = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Pakistan" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Pakistan" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(countryOptions, (country) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: country.value,
                      value: country.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(country.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(country.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(countryOptions, (country) => {
                      return createVNode(SelectItem, {
                        key: country.value,
                        value: country.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(country.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Pakistan" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(countryOptions, (country) => {
                    return createVNode(SelectItem, {
                      key: country.value,
                      value: country.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(country.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Previous Visa Duration </label>`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.previousVisaDuration,
        "onUpdate:modelValue": ($event) => formData.previousVisaDuration = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "30 days" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "30 days" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(durationOptions, (duration) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: duration.value,
                      value: duration.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(duration.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(duration.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(durationOptions, (duration) => {
                      return createVNode(SelectItem, {
                        key: duration.value,
                        value: duration.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(duration.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "30 days" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(durationOptions, (duration) => {
                    return createVNode(SelectItem, {
                      key: duration.value,
                      value: duration.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(duration.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Entry Permit for final destination </label><div class="relative">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        type: "file",
        onChange: handleFileUpload,
        class: "hidden",
        ref_key: "fileInput",
        ref: fileInput
      }, null, _parent));
      _push(`<button type="button" class="w-full h-9 border rounded-md px-4 text-left text-sm text-gray-500 flex items-center justify-between" style="${ssrRenderStyle({ "border-color": "#D4D4DA" })}"><span>Upload</span><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.3333 5.33333L8 2L4.66667 5.33333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 2V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div></div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Entry Permit Valid Until </label><div class="grid grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.entryPermitValidUntil.day,
        "onUpdate:modelValue": ($event) => formData.entryPermitValidUntil.day = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Day" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Day" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(dayOptions), (day) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: day.value,
                      value: day.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(day.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(day.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(dayOptions), (day) => {
                      return openBlock(), createBlock(SelectItem, {
                        key: day.value,
                        value: day.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(day.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Day" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(dayOptions), (day) => {
                    return openBlock(), createBlock(SelectItem, {
                      key: day.value,
                      value: day.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(day.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Select, {
        modelValue: formData.entryPermitValidUntil.month,
        "onUpdate:modelValue": ($event) => formData.entryPermitValidUntil.month = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
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
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(monthOptions, (month) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: month.value,
                      value: month.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(month.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(month.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(monthOptions, (month) => {
                      return createVNode(SelectItem, {
                        key: month.value,
                        value: month.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(month.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Month" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(monthOptions, (month) => {
                    return createVNode(SelectItem, {
                      key: month.value,
                      value: month.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(month.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Select, {
        modelValue: formData.entryPermitValidUntil.year,
        "onUpdate:modelValue": ($event) => formData.entryPermitValidUntil.year = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
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
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(yearOptions), (year) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: year.value,
                      value: year.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(year.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(year.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(yearOptions), (year) => {
                      return openBlock(), createBlock(SelectItem, {
                        key: year.value,
                        value: year.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(year.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Year" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(yearOptions), (year) => {
                    return openBlock(), createBlock(SelectItem, {
                      key: year.value,
                      value: year.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(year.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Entry Permit Issued by </label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.entryPermitIssuedBy,
        "onUpdate:modelValue": ($event) => formData.entryPermitIssuedBy = $event,
        placeholder: "----",
        class: "w-full h-9 border",
        style: { "border-color": "#D4D4DA" }
      }, null, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Country of Destination (If visa is for transit) </label>`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.countryOfDestination,
        "onUpdate:modelValue": ($event) => formData.countryOfDestination = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Morocco" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Morocco" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(countryOptions, (country) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: country.value,
                      value: country.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(country.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(country.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(countryOptions, (country) => {
                      return createVNode(SelectItem, {
                        key: country.value,
                        value: country.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(country.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Morocco" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(countryOptions, (country) => {
                    return createVNode(SelectItem, {
                      key: country.value,
                      value: country.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(country.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Host/Company Name </label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.hostCompanyName,
        "onUpdate:modelValue": ($event) => formData.hostCompanyName = $event,
        placeholder: "XYZ LLC",
        class: "w-full h-9 border",
        style: { "border-color": "#D4D4DA" }
      }, null, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Host/Company Name Address </label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.hostCompanyAddress,
        "onUpdate:modelValue": ($event) => formData.hostCompanyAddress = $event,
        placeholder: "xyz street, 92 C Model town",
        class: "w-full h-9 border",
        style: { "border-color": "#D4D4DA" }
      }, null, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Host/Company Phone </label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.hostCompanyPhone,
        "onUpdate:modelValue": ($event) => formData.hostCompanyPhone = $event,
        placeholder: "+1 289 293 293",
        type: "tel",
        class: "w-full h-9 border",
        style: { "border-color": "#D4D4DA" }
      }, null, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Host/Company Fax </label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.hostCompanyFax,
        "onUpdate:modelValue": ($event) => formData.hostCompanyFax = $event,
        placeholder: "+1 289 293 293",
        type: "tel",
        class: "w-full h-9 border",
        style: { "border-color": "#D4D4DA" }
      }, null, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Host/Company Email </label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.hostCompanyEmail,
        "onUpdate:modelValue": ($event) => formData.hostCompanyEmail = $event,
        placeholder: "jdoe@gmail.com",
        type: "email",
        class: "w-full h-9 border",
        style: { "border-color": "#D4D4DA" }
      }, null, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Payer of Trip </label>`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.payerOfTrip,
        "onUpdate:modelValue": ($event) => formData.payerOfTrip = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Self" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Self" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(payerOptions, (payer) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: payer.value,
                      value: payer.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(payer.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(payer.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(payerOptions, (payer) => {
                      return createVNode(SelectItem, {
                        key: payer.value,
                        value: payer.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(payer.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Self" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(payerOptions, (payer) => {
                    return createVNode(SelectItem, {
                      key: payer.value,
                      value: payer.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(payer.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Insurance Valid Until </label><div class="grid grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(Select, {
        modelValue: formData.insuranceValidUntil.day,
        "onUpdate:modelValue": ($event) => formData.insuranceValidUntil.day = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectValue, { placeholder: "Day" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectValue, { placeholder: "Day" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(dayOptions), (day) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: day.value,
                      value: day.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(day.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(day.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(dayOptions), (day) => {
                      return openBlock(), createBlock(SelectItem, {
                        key: day.value,
                        value: day.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(day.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Day" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(dayOptions), (day) => {
                    return openBlock(), createBlock(SelectItem, {
                      key: day.value,
                      value: day.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(day.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Select, {
        modelValue: formData.insuranceValidUntil.month,
        "onUpdate:modelValue": ($event) => formData.insuranceValidUntil.month = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
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
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(monthOptions, (month) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: month.value,
                      value: month.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(month.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(month.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(monthOptions, (month) => {
                      return createVNode(SelectItem, {
                        key: month.value,
                        value: month.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(month.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Month" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(monthOptions, (month) => {
                    return createVNode(SelectItem, {
                      key: month.value,
                      value: month.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(month.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Select, {
        modelValue: formData.insuranceValidUntil.year,
        "onUpdate:modelValue": ($event) => formData.insuranceValidUntil.year = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SelectTrigger, { variant: "form" }, {
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
            _push2(ssrRenderComponent(SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(yearOptions), (year) => {
                    _push3(ssrRenderComponent(SelectItem, {
                      key: year.value,
                      value: year.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(year.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(year.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(yearOptions), (year) => {
                      return openBlock(), createBlock(SelectItem, {
                        key: year.value,
                        value: year.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(year.label), 1)
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
              createVNode(SelectTrigger, { variant: "form" }, {
                default: withCtx(() => [
                  createVNode(SelectValue, { placeholder: "Year" })
                ]),
                _: 1
              }),
              createVNode(SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(yearOptions), (year) => {
                    return openBlock(), createBlock(SelectItem, {
                      key: year.value,
                      value: year.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(year.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Children Details (if any) </label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.childrenDetails,
        "onUpdate:modelValue": ($event) => formData.childrenDetails = $event,
        placeholder: "xyz",
        class: "w-full h-9 border",
        style: { "border-color": "#D4D4DA" }
      }, null, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Applicant Address </label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.applicantAddress,
        "onUpdate:modelValue": ($event) => formData.applicantAddress = $event,
        placeholder: "xyz street, 92 C Model town",
        class: "w-full h-9 border",
        style: { "border-color": "#D4D4DA" }
      }, null, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Applicant Phone </label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.applicantPhone,
        "onUpdate:modelValue": ($event) => formData.applicantPhone = $event,
        placeholder: "+1 289 293 293",
        type: "tel",
        class: "w-full h-9 border",
        style: { "border-color": "#D4D4DA" }
      }, null, _parent));
      _push(`</div><div class="px-6 space-y-4"><label class="block text-sm font-medium" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617" })}"> Applicant Email </label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.applicantEmail,
        "onUpdate:modelValue": ($event) => formData.applicantEmail = $event,
        placeholder: "jdoe@gmail.com",
        type: "email",
        class: "w-full h-9 border",
        style: { "border-color": "#D4D4DA" }
      }, null, _parent));
      _push(`</div></form></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/additional-info.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=additional-info-p1cgRLSi.mjs.map
