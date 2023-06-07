'use strict';
module.exports = validate20;
module.exports.default = validate20;
const schema22 = {
  type: 'object',
  properties: {
    poll: {
      type: 'object',
      properties: {
        creator: { type: 'string' },
        name: { type: 'string' },
        snapshot: { type: 'string' },
        description: { type: 'string' },
        choices: { type: 'array', items: { type: 'string' } },
        options: {
          type: 'object',
          properties: { publishVotes: { type: 'boolean' } },
          required: ['publishVotes'],
        },
      },
      required: ['creator', 'name', 'description', 'snapshot', 'choices', 'termination', 'options'],
      additionalProperties: false,
    },
    turnstile: { type: 'string', nullable: true },
  },
  required: ['poll'],
  additionalProperties: false,
};
function validate20(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (errors === 0) {
    if (data && typeof data == 'object' && !Array.isArray(data)) {
      let missing0;
      if (data.poll === undefined && (missing0 = 'poll')) {
        validate20.errors = [
          {
            instancePath,
            schemaPath: '#/required',
            keyword: 'required',
            params: { missingProperty: missing0 },
            message: "must have required property '" + missing0 + "'",
          },
        ];
        return false;
      } else {
        const _errs1 = errors;
        for (const key0 in data) {
          if (!(key0 === 'poll' || key0 === 'turnstile')) {
            validate20.errors = [
              {
                instancePath,
                schemaPath: '#/additionalProperties',
                keyword: 'additionalProperties',
                params: { additionalProperty: key0 },
                message: 'must NOT have additional properties',
              },
            ];
            return false;
            break;
          }
        }
        if (_errs1 === errors) {
          if (data.poll !== undefined) {
            let data0 = data.poll;
            const _errs2 = errors;
            if (errors === _errs2) {
              if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
                let missing1;
                if (
                  (data0.creator === undefined && (missing1 = 'creator')) ||
                  (data0.name === undefined && (missing1 = 'name')) ||
                  (data0.description === undefined && (missing1 = 'description')) ||
                  (data0.snapshot === undefined && (missing1 = 'snapshot')) ||
                  (data0.choices === undefined && (missing1 = 'choices')) ||
                  (data0.termination === undefined && (missing1 = 'termination')) ||
                  (data0.options === undefined && (missing1 = 'options'))
                ) {
                  validate20.errors = [
                    {
                      instancePath: instancePath + '/poll',
                      schemaPath: '#/properties/poll/required',
                      keyword: 'required',
                      params: { missingProperty: missing1 },
                      message: "must have required property '" + missing1 + "'",
                    },
                  ];
                  return false;
                } else {
                  const _errs4 = errors;
                  for (const key1 in data0) {
                    if (
                      !(
                        key1 === 'creator' ||
                        key1 === 'name' ||
                        key1 === 'snapshot' ||
                        key1 === 'description' ||
                        key1 === 'choices' ||
                        key1 === 'termination' ||
                        key1 === 'options'
                      )
                    ) {
                      validate20.errors = [
                        {
                          instancePath: instancePath + '/poll',
                          schemaPath: '#/properties/poll/additionalProperties',
                          keyword: 'additionalProperties',
                          params: { additionalProperty: key1 },
                          message: 'must NOT have additional properties',
                        },
                      ];
                      return false;
                      break;
                    }
                  }
                  if (_errs4 === errors) {
                    if (data0.creator !== undefined) {
                      const _errs5 = errors;
                      if (typeof data0.creator !== 'string') {
                        validate20.errors = [
                          {
                            instancePath: instancePath + '/poll/creator',
                            schemaPath: '#/properties/poll/properties/creator/type',
                            keyword: 'type',
                            params: { type: 'string' },
                            message: 'must be string',
                          },
                        ];
                        return false;
                      }
                      var valid1 = _errs5 === errors;
                    } else {
                      var valid1 = true;
                    }
                    if (valid1) {
                      if (data0.name !== undefined) {
                        const _errs7 = errors;
                        if (typeof data0.name !== 'string') {
                          validate20.errors = [
                            {
                              instancePath: instancePath + '/poll/name',
                              schemaPath: '#/properties/poll/properties/name/type',
                              keyword: 'type',
                              params: { type: 'string' },
                              message: 'must be string',
                            },
                          ];
                          return false;
                        }
                        var valid1 = _errs7 === errors;
                      } else {
                        var valid1 = true;
                      }
                      if (valid1) {
                        if (data0.snapshot !== undefined) {
                          const _errs9 = errors;
                          if (typeof data0.snapshot !== 'string') {
                            validate20.errors = [
                              {
                                instancePath: instancePath + '/poll/snapshot',
                                schemaPath: '#/properties/poll/properties/snapshot/type',
                                keyword: 'type',
                                params: { type: 'string' },
                                message: 'must be string',
                              },
                            ];
                            return false;
                          }
                          var valid1 = _errs9 === errors;
                        } else {
                          var valid1 = true;
                        }
                        if (valid1) {
                          if (data0.description !== undefined) {
                            const _errs11 = errors;
                            if (typeof data0.description !== 'string') {
                              validate20.errors = [
                                {
                                  instancePath: instancePath + '/poll/description',
                                  schemaPath: '#/properties/poll/properties/description/type',
                                  keyword: 'type',
                                  params: { type: 'string' },
                                  message: 'must be string',
                                },
                              ];
                              return false;
                            }
                            var valid1 = _errs11 === errors;
                          } else {
                            var valid1 = true;
                          }
                          if (valid1) {
                            if (data0.choices !== undefined) {
                              let data5 = data0.choices;
                              const _errs13 = errors;
                              if (errors === _errs13) {
                                if (Array.isArray(data5)) {
                                  var valid2 = true;
                                  const len0 = data5.length;
                                  for (let i0 = 0; i0 < len0; i0++) {
                                    const _errs15 = errors;
                                    if (typeof data5[i0] !== 'string') {
                                      validate20.errors = [
                                        {
                                          instancePath: instancePath + '/poll/choices/' + i0,
                                          schemaPath:
                                            '#/properties/poll/properties/choices/items/type',
                                          keyword: 'type',
                                          params: { type: 'string' },
                                          message: 'must be string',
                                        },
                                      ];
                                      return false;
                                    }
                                    var valid2 = _errs15 === errors;
                                    if (!valid2) {
                                      break;
                                    }
                                  }
                                } else {
                                  validate20.errors = [
                                    {
                                      instancePath: instancePath + '/poll/choices',
                                      schemaPath: '#/properties/poll/properties/choices/type',
                                      keyword: 'type',
                                      params: { type: 'array' },
                                      message: 'must be array',
                                    },
                                  ];
                                  return false;
                                }
                              }
                              var valid1 = _errs13 === errors;
                            } else {
                              var valid1 = true;
                            }
                            if (valid1) {
                              if (data0.termination !== undefined) {
                                let data7 = data0.termination;
                                const _errs17 = errors;
                                const _errs19 = errors;
                                let valid3 = false;
                                const _errs20 = errors;
                                if (data7 && typeof data7 == 'object' && !Array.isArray(data7)) {
                                  let missing2;
                                  if (data7.quorum === undefined && (missing2 = 'quorum')) {
                                    const err0 = {
                                      instancePath: instancePath + '/poll/termination',
                                      schemaPath:
                                        '#/properties/poll/properties/termination/anyOf/0/required',
                                      keyword: 'required',
                                      params: { missingProperty: missing2 },
                                      message: "must have required property '" + missing2 + "'",
                                    };
                                    if (vErrors === null) {
                                      vErrors = [err0];
                                    } else {
                                      vErrors.push(err0);
                                    }
                                    errors++;
                                  }
                                }
                                var _valid0 = _errs20 === errors;
                                valid3 = valid3 || _valid0;
                                if (!valid3) {
                                  const _errs21 = errors;
                                  if (data7 && typeof data7 == 'object' && !Array.isArray(data7)) {
                                    let missing3;
                                    if (data7.time === undefined && (missing3 = 'time')) {
                                      const err1 = {
                                        instancePath: instancePath + '/poll/termination',
                                        schemaPath:
                                          '#/properties/poll/properties/termination/anyOf/1/required',
                                        keyword: 'required',
                                        params: { missingProperty: missing3 },
                                        message: "must have required property '" + missing3 + "'",
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err1];
                                      } else {
                                        vErrors.push(err1);
                                      }
                                      errors++;
                                    }
                                  }
                                  var _valid0 = _errs21 === errors;
                                  valid3 = valid3 || _valid0;
                                }
                                if (!valid3) {
                                  const err2 = {
                                    instancePath: instancePath + '/poll/termination',
                                    schemaPath: '#/properties/poll/properties/termination/anyOf',
                                    keyword: 'anyOf',
                                    params: {},
                                    message: 'must match a schema in anyOf',
                                  };
                                  if (vErrors === null) {
                                    vErrors = [err2];
                                  } else {
                                    vErrors.push(err2);
                                  }
                                  errors++;
                                  validate20.errors = vErrors;
                                  return false;
                                } else {
                                  errors = _errs19;
                                  if (vErrors !== null) {
                                    if (_errs19) {
                                      vErrors.length = _errs19;
                                    } else {
                                      vErrors = null;
                                    }
                                  }
                                }
                                if (errors === _errs17) {
                                  if (data7 && typeof data7 == 'object' && !Array.isArray(data7)) {
                                    let missing4;
                                    if (
                                      data7.conjunction === undefined &&
                                      (missing4 = 'conjunction')
                                    ) {
                                      validate20.errors = [
                                        {
                                          instancePath: instancePath + '/poll/termination',
                                          schemaPath:
                                            '#/properties/poll/properties/termination/required',
                                          keyword: 'required',
                                          params: { missingProperty: missing4 },
                                          message: "must have required property '" + missing4 + "'",
                                        },
                                      ];
                                      return false;
                                    } else {
                                      const _errs22 = errors;
                                      for (const key2 in data7) {
                                        if (
                                          !(
                                            key2 === 'conjunction' ||
                                            key2 === 'quorum' ||
                                            key2 === 'time'
                                          )
                                        ) {
                                          validate20.errors = [
                                            {
                                              instancePath: instancePath + '/poll/termination',
                                              schemaPath:
                                                '#/properties/poll/properties/termination/additionalProperties',
                                              keyword: 'additionalProperties',
                                              params: { additionalProperty: key2 },
                                              message: 'must NOT have additional properties',
                                            },
                                          ];
                                          return false;
                                          break;
                                        }
                                      }
                                      if (_errs22 === errors) {
                                        if (data7.conjunction !== undefined) {
                                          let data8 = data7.conjunction;
                                          const _errs23 = errors;
                                          if (typeof data8 !== 'string') {
                                            validate20.errors = [
                                              {
                                                instancePath:
                                                  instancePath + '/poll/termination/conjunction',
                                                schemaPath:
                                                  '#/properties/poll/properties/termination/properties/conjunction/type',
                                                keyword: 'type',
                                                params: { type: 'string' },
                                                message: 'must be string',
                                              },
                                            ];
                                            return false;
                                          }
                                          if (!(data8 === 'any' || data8 === 'all')) {
                                            validate20.errors = [
                                              {
                                                instancePath:
                                                  instancePath + '/poll/termination/conjunction',
                                                schemaPath:
                                                  '#/properties/poll/properties/termination/properties/conjunction/enum',
                                                keyword: 'enum',
                                                params: {
                                                  allowedValues:
                                                    schema22.properties.poll.properties.termination
                                                      .properties.conjunction.enum,
                                                },
                                                message:
                                                  'must be equal to one of the allowed values',
                                              },
                                            ];
                                            return false;
                                          }
                                          var valid4 = _errs23 === errors;
                                        } else {
                                          var valid4 = true;
                                        }
                                        if (valid4) {
                                          if (data7.quorum !== undefined) {
                                            let data9 = data7.quorum;
                                            const _errs25 = errors;
                                            if (typeof data9 !== 'string' && data9 !== null) {
                                              validate20.errors = [
                                                {
                                                  instancePath:
                                                    instancePath + '/poll/termination/quorum',
                                                  schemaPath:
                                                    '#/properties/poll/properties/termination/properties/quorum/type',
                                                  keyword: 'type',
                                                  params: { type: 'string' },
                                                  message: 'must be string',
                                                },
                                              ];
                                              return false;
                                            }
                                            var valid4 = _errs25 === errors;
                                          } else {
                                            var valid4 = true;
                                          }
                                          if (valid4) {
                                            if (data7.time !== undefined) {
                                              let data10 = data7.time;
                                              const _errs28 = errors;
                                              if (
                                                !(
                                                  typeof data10 == 'number' &&
                                                  !(data10 % 1) &&
                                                  !isNaN(data10) &&
                                                  isFinite(data10)
                                                ) &&
                                                data10 !== null
                                              ) {
                                                validate20.errors = [
                                                  {
                                                    instancePath:
                                                      instancePath + '/poll/termination/time',
                                                    schemaPath:
                                                      '#/properties/poll/properties/termination/properties/time/type',
                                                    keyword: 'type',
                                                    params: { type: 'integer' },
                                                    message: 'must be integer',
                                                  },
                                                ];
                                                return false;
                                              }
                                              if (errors === _errs28) {
                                                if (typeof data10 == 'number' && isFinite(data10)) {
                                                  if (data10 < 1 || isNaN(data10)) {
                                                    validate20.errors = [
                                                      {
                                                        instancePath:
                                                          instancePath + '/poll/termination/time',
                                                        schemaPath:
                                                          '#/properties/poll/properties/termination/properties/time/minimum',
                                                        keyword: 'minimum',
                                                        params: { comparison: '>=', limit: 1 },
                                                        message: 'must be >= 1',
                                                      },
                                                    ];
                                                    return false;
                                                  }
                                                }
                                              }
                                              var valid4 = _errs28 === errors;
                                            } else {
                                              var valid4 = true;
                                            }
                                          }
                                        }
                                      }
                                    }
                                  } else {
                                    validate20.errors = [
                                      {
                                        instancePath: instancePath + '/poll/termination',
                                        schemaPath: '#/properties/poll/properties/termination/type',
                                        keyword: 'type',
                                        params: { type: 'object' },
                                        message: 'must be object',
                                      },
                                    ];
                                    return false;
                                  }
                                }
                                var valid1 = _errs17 === errors;
                              } else {
                                var valid1 = true;
                              }
                              if (valid1) {
                                if (data0.options !== undefined) {
                                  let data11 = data0.options;
                                  const _errs31 = errors;
                                  if (errors === _errs31) {
                                    if (
                                      data11 &&
                                      typeof data11 == 'object' &&
                                      !Array.isArray(data11)
                                    ) {
                                      let missing5;
                                      if (
                                        data11.publishVotes === undefined &&
                                        (missing5 = 'publishVotes')
                                      ) {
                                        validate20.errors = [
                                          {
                                            instancePath: instancePath + '/poll/options',
                                            schemaPath:
                                              '#/properties/poll/properties/options/required',
                                            keyword: 'required',
                                            params: { missingProperty: missing5 },
                                            message:
                                              "must have required property '" + missing5 + "'",
                                          },
                                        ];
                                        return false;
                                      } else {
                                        if (data11.publishVotes !== undefined) {
                                          if (typeof data11.publishVotes !== 'boolean') {
                                            validate20.errors = [
                                              {
                                                instancePath:
                                                  instancePath + '/poll/options/publishVotes',
                                                schemaPath:
                                                  '#/properties/poll/properties/options/properties/publishVotes/type',
                                                keyword: 'type',
                                                params: { type: 'boolean' },
                                                message: 'must be boolean',
                                              },
                                            ];
                                            return false;
                                          }
                                        }
                                      }
                                    } else {
                                      validate20.errors = [
                                        {
                                          instancePath: instancePath + '/poll/options',
                                          schemaPath: '#/properties/poll/properties/options/type',
                                          keyword: 'type',
                                          params: { type: 'object' },
                                          message: 'must be object',
                                        },
                                      ];
                                      return false;
                                    }
                                  }
                                  var valid1 = _errs31 === errors;
                                } else {
                                  var valid1 = true;
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else {
                validate20.errors = [
                  {
                    instancePath: instancePath + '/poll',
                    schemaPath: '#/properties/poll/type',
                    keyword: 'type',
                    params: { type: 'object' },
                    message: 'must be object',
                  },
                ];
                return false;
              }
            }
            var valid0 = _errs2 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.turnstile !== undefined) {
              let data13 = data.turnstile;
              const _errs35 = errors;
              if (typeof data13 !== 'string' && data13 !== null) {
                validate20.errors = [
                  {
                    instancePath: instancePath + '/turnstile',
                    schemaPath: '#/properties/turnstile/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  },
                ];
                return false;
              }
              var valid0 = _errs35 === errors;
            } else {
              var valid0 = true;
            }
          }
        }
      }
    } else {
      validate20.errors = [
        {
          instancePath,
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
      ];
      return false;
    }
  }
  validate20.errors = vErrors;
  return errors === 0;
}
