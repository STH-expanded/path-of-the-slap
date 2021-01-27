const SWAPS = {
    id: "02",
    health: 1250,

    actionsBlueprint: [
        {
            condition: (fight, character, inputList) => fight.winCount.filter((element) => element == 2).length == 1 && fight.winCount[fight.players.findIndex(player => player.character !== character)] !== fight.playoff && character.isGrounded(fight),
            action: "WIN",
        },
        {
            condition: (fight, character, inputList) => character.health === 0 && fight.roundIsOver && character.isGrounded(fight),
            action: "KO",
        },
        {
            condition: (fight, character, inputList) => fight.roundIsOver && character.isGrounded(fight),
            action: "WIN_ROUND",
        },
        {
            condition: (fight, character, inputList) => character.action === "INTRO" && character.actionIndex < character.actions[character.action].duration,
            action: "INTRO"
        },
        {
            condition: (fight, character, inputList) => fight.roundAnimFrame < fight.roundAnimEndFrame || fight.roundIsOver && character.isGrounded(fight),
            action: "WAITING",
        },
        // Status actions
        {
            condition: (fight, character, inputList) => character.isGrounded(fight) && inputList.state[0].input.a && inputList.state[0].input.b,
            action: "GRAB",
        },
        {
            condition: (fight, character, inputList) => character.getEnemy(fight).action === "GRABBED" && (character.direction ? inputList.state[0].input.stick === 6 : inputList.state[0].input.stick === 4),
            action: "FORWARD_THROW",
        },
        {
            condition: (fight, character, inputList) => character.getEnemy(fight).action === "GRABBED",
            action: "BACK_THROW",
        },
        {
            condition: (fight, character, inputList) => character.canBlock(fight) && character.isGrounded(fight) && (character.direction ? inputList.state[0].input.stick === 4 : inputList.state[0].input.stick === 6) && ['AERIAL', 'NORMAL'].includes(character.getEnemy(fight).actions[character.getEnemy(fight).action].attackType) || character.action === 'BLOCK' && character.hitstun,
            action: "BLOCK",
        },
        {
            condition: (fight, character, inputList) => character.canBlock(fight) && !character.isGrounded(fight) && (character.direction ? inputList.state[0].input.stick === 7 : inputList.state[0].input.stick === 9) && ['AERIAL', 'NORMAL'].includes(character.getEnemy(fight).actions[character.getEnemy(fight).action].attackType) || character.action === 'AERIAL_BLOCK' && character.hitstun,
            action: "AERIAL_BLOCK"
        },
        {
            condition: (fight, character, inputList) => character.canBlock(fight) && character.isGrounded(fight) && (character.direction ? inputList.state[0].input.stick === 1 : inputList.state[0].input.stick === 3) && ['LOW', 'NORMAL'].includes(character.getEnemy(fight).actions[character.getEnemy(fight).action].attackType) || character.action === 'LOW_BLOCK' && character.hitstun,
            action: "LOW_BLOCK"
        },
        {
            condition: (fight, character, inputList) => character.hitstun,
            action: "HIT"
        },
        {
            condition: (fight, character, inputList) => character.ejection,
            action: "EJECTED"
        },
        {
            condition: (fight, character, inputList) => character.grabbed,
            action: "GRABBED"
        },
        {
            condition: (fight, character, inputList) => character.ejection,
            action: "EJECTED"
        },
        {
            condition: (fight, character, inputList) => character.action === "GROUND" && (inputList.state[0].input.stick !== 5 || inputList.state[0].input.a || inputList.state[0].input.b),
            action: "GET_UP"
        },
        {
            condition: (fight, character, inputList) => character.action === "GROUND" || character.action === "EJECTED" && character.ejection === 0,
            action: "GROUND"
        },
        {
            condition: (fight, character, inputList) => character.action === "EJECTED" && (inputList.state[0].input.stick !== 5 || inputList.state[0].input.a || inputList.state[0].input.b) && !character.collisionBox.includedIn({ "pos": fight.stage.collisionBox.pos.plus(new Vector2D(32, 0)), "size": fight.stage.collisionBox.size.plus(new Vector2D(-64, -32)) }),
            action: "TECH"
        },
        {
            condition: (fight, character, inputList) => character.isGrounded(fight) && character.actions[character.action].isAerial,
            action: "IDLE" // TODO "LAND" action & landing lag
        },
        {
            condition: (fight, character, inputList) => !character.actions[character.action].cancellable && character.actionIndex < character.actions[character.action].duration,
            action: null // Return an action for its duration if not cancellable
        },
        // Aerial actions
        {
            condition: (fight, character, inputList) => !character.isGrounded(fight) && inputList.state[0].input.a,
            action: "AERIAL_LIGHT"
        },
        {
            condition: (fight, character, inputList) => !character.isGrounded(fight) && inputList.state[0].input.b,
            action: "AERIAL_HEAVY"
        },
        {
            condition: (fight, character, inputList) => !character.isGrounded(fight),
            action: "AERIAL"
        },
        {
            condition: (fight, character, inputList) => inputList.state[0].input.stick > 6,
            action: "JUMP"
        },
        // Crouch actions
        {
            condition: (fight, character, inputList) => inputList.state[0].input.stick < 4 && inputList.state[0].input.a,
            action: "LOW_LIGHT"
        },
        {
            condition: (fight, character, inputList) => inputList.state[0].input.stick < 4 && inputList.state[0].input.b,
            action: "LOW_HEAVY"
        },
        {
            condition: (fight, character, inputList) => inputList.state[0].input.stick < 4,
            action: "CROUCH"
        },
        // Dash
        {
            condition: (fight, character, inputList) => (inputList.state[0].input.stick === 6 && character.direction || inputList.state[0].input.stick === 4 && !character.direction) &&
                inputList.state[0].frameCount < 8 && inputList.state[1].input.stick === 5 && inputList.state[1].frameCount < 8 && inputList.state[2].input.stick === inputList.state[0].input.stick,
            action: "FORWARD_DASH"
        },
        {
            condition: (fight, character, inputList) => (inputList.state[0].input.stick === 6 && !character.direction || inputList.state[0].input.stick === 4 && character.direction) &&
                inputList.state[0].frameCount < 8 && inputList.state[1].input.stick === 5 &&
                inputList.state[1].frameCount < 8 && inputList.state[2].input.stick === inputList.state[0].input.stick,
            action: "BACK_DASH"
        },
        // Standing actions
        {
            condition: (fight, character, inputList) => inputList.state[0].input.a && inputList.state[0].input.stick === (character.direction ? 6 : 4) &&
                ((inputList.state[1].input.stick === (character.direction ? 6 : 4) && inputList.state[1].frameCount < 8 && inputList.state[2].input.stick === (character.direction ? 3 : 1) && inputList.state[3].input.stick === 2) ||
                    (inputList.state[1].input.stick === (character.direction ? 3 : 1) && inputList.state[2].input.stick === 2)),
            action: "QCF"
        },
        {
            condition: (fight, character, inputList) => inputList.state[0].input.a,
            action: "LIGHT"
        },
        {
            condition: (fight, character, inputList) => inputList.state[0].input.b,
            action: "HEAVY"
        },
        {
            condition: (fight, character, inputList) => inputList.state[0].input.stick === 6 && character.direction || inputList.state[0].input.stick === 4 && !character.direction,
            action: "WALK_FORWARD"
        },
        {
            condition: (fight, character, inputList) => inputList.state[0].input.stick === 6 && !character.direction || inputList.state[0].input.stick === 4 && character.direction,
            action: "WALK_BACK"
        },
        {
            condition: (fight, character, inputList) => true,
            action: "IDLE"
        }
    ],

    actions: {
        IDLE: {
            duration: 48,
            cancellable: true,
            fixedDirection: false,
            isAerial: false,
            size: { x: 32, y: 120 },
            velocity: {
                0: (fight, character, inputList) => ({ x: 0, y: 0 })
            },
            hurtboxes: {
                0: [
                    { offset: { x: -8, y: 0 }, size: { x: 40, y: 64 } },
                    { offset: { x: -16, y: 64 }, size: { x: 56, y: 56 } }
                ],
                24: [
                    { offset: { x: 8, y: 0 }, size: { x: 40, y: 64 } },
                    { offset: { x: -16, y: 64 }, size: { x: 56, y: 56 } }
                ]
            },
            animation: {
                offset: { x: -29, y: -56 },
                size: { x: 91, y: 192 },
                speed: 1 / 8,
                frameCount: 6
            }
        },
        WALK_FORWARD: {
            duration: 72,
            cancellable: true,
            fixedDirection: false,
            isAerial: false,
            size: { x: 32, y: 120 },
            velocity: {
                0: (fight, character, inputList) => ({ x: character.direction ? 1 : -1, y: 0 })
            },
            hurtboxes: {
                0: [
                    { offset: { x: -8, y: 0 }, size: { x: 48, y: 128 } }
                ]
            },
            animation: {
                offset: { x: -64, y: -56 },
                size: { x: 182, y: 192 },
                speed: 1 / 8,
                frameCount: 9
            }
        },
        WALK_BACK: {
            duration: 48,
            cancellable: true,
            fixedDirection: false,
            isAerial: false,
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: character.direction ? -1 : 1, y: 0 })
            },
            hurtboxes: {
                0: [
                    { offset: { x: -8, y: 0 }, size: { x: 48, y: 128 } }
                ]
            },
            animation: {
                offset: { x: -29, y: -48 },
                size: { x: 91, y: 192 },
                speed: 1 / 8,
                frameCount: 6
            }
        },
        FORWARD_DASH: {
            duration: 18,
            cancellable: false,
            fixedDirection: true,
            isAerial: false,
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: 6 * (character.direction ? 1 : -1), y: 0 })
            },
            hurtboxes: {
                0: [
                    { offset: { x: -8, y: 8 }, size: { x: 48, y: 120 } }
                ]
            },
            animation: {
                offset: { x: -64, y: -48 },
                size: { x: 182, y: 192 },
                speed: 1 / 3,
                frameCount: 6
            }
        },
        BACK_DASH: {
            duration: 16,
            cancellable: false,
            fixedDirection: true,
            isAerial: false,
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: 6 * (character.direction ? -1 : 1), y: 0 })
            },
            hurtboxes: {
                0: [
                    { offset: { x: -8, y: 0 }, size: { x: 48, y: 128 } },
                    { offset: { x: 32, y: 32 }, size: { x: 32, y: 16 } }
                ]
            },
            animation: {
                offset: { x: -64, y: -48 },
                size: { x: 182, y: 192 },
                speed: 1 / 4,
                frameCount: 4
            }
        },
        CROUCH: {
            duration: 40,
            cancellable: true,
            fixedDirection: false,
            isAerial: false,
            size: { x: 32, y: 96 },
            velocity: {
                0: (fight, character, inputList) => ({ x: 0, y: 0 })
            },
            hurtboxes: {
                0: [
                    { offset: { x: -8, y: 0 }, size: { x: 48, y: 96 } }
                ]
            },
            animation: {
                offset: { x: -29, y: -80 },
                size: { x: 91, y: 192 },
                speed: 1 / 8,
                frameCount: 5
            }
        },
        AERIAL: {
            duration: 1,
            cancellable: true,
            fixedDirection: true,
            isAerial: true,
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => {
                    const velocity = character.velocity;
                    // Apply gravity
                    const newVelocity = { x: velocity.x, y: velocity.y + 0.75 };
                    // Apply x axis velocity
                    if (inputList.state[0].input.stick % 3 === 1 && character.velocity.x > -3) newVelocity.x = -3;
                    if (inputList.state[0].input.stick % 3 === 0 && character.velocity.x < 3) newVelocity.x = 3;
                    return newVelocity;
                }
            },
            hurtboxes: {
                0: [
                    { offset: { x: -8, y: 0 }, size: { x: 48, y: 128 } }
                ]
            },
            animation: {
                altImg: {
                    action: "FALL",
                    condition: (fight, character) => character.velocity.y > 0
                },
                offset: { x: -29, y: -32 },
                size: { x: 91, y: 192 },
                speed: 1,
                frameCount: 1
            }
        },
        JUMP: {
            duration: 6,
            cancellable: false,
            fixedDirection: true,
            isAerial: false,
            size: { x: 32, y: 128 },
            jumpXVelocity: null,
            velocity: {
                0: (fight, character, inputList) => {
                    this.jumpXVelocity = character.velocity.x;
                    return { x: 0, y: 0 }
                },
                1: (fight, character, inputList) => ({ x: 0, y: 0 }),
                5: (fight, character, inputList) => {
                    let x = this.jumpXVelocity
                    this.jumpXVelocity = null;
                    return { x: x, y: -12 }
                }
            },
            hurtboxes: {
                0: [
                    { offset: { x: -8, y: 0 }, size: { x: 48, y: 128 } }
                ]
            },
            animation: {
                offset: { x: -29, y: -48 },
                size: { x: 91, y: 192 },
                speed: 1,
                frameCount: 1
            }
        },
        LIGHT: {
            duration: 24,
            cancellable: false,
            fixedDirection: true,
            isAerial: false,
            attackType: 'NORMAL',
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: 0.125 * (character.direction ? 1 : -1), y: 0 })
            },
            hitboxes: {
                0: [],
                6: [
                    { offset: { x: 32, y: 24 }, size: { x: 64, y: 24 }, damage: 50, hitstunVelocity: { x: 2, y: 0 } }
                ],
                9: []
            },
            hurtboxes: {
                0: [
                    { offset: { x: 0, y: 0 }, size: { x: 64, y: 128 } }
                ],
                6: [
                    { offset: { x: 0, y: 0 }, size: { x: 64, y: 128 } },
                    { offset: { x: 32, y: 24 }, size: { x: 64, y: 16 } }
                ],
                12: [
                    { offset: { x: 0, y: 0 }, size: { x: 64, y: 128 } }
                ],
            },
            animation: {
                offset: { x: -52, y: -48 },
                size: { x: 128, y: 192 },
                speed: 1 / 4,
                frameCount: 6
            }
        },
        HEAVY: {
            duration: 36,
            cancellable: false,
            fixedDirection: true,
            isAerial: false,
            attackType: 'NORMAL',
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: 0.5 * (character.direction ? 1 : -1), y: 0 }),
                16: (fight, character, inputList) => ({ x: 0, y: 0 })
            },
            hitboxes: {
                0: [],
                20: [
                    { offset: { x: 32, y: 24 }, size: { x: 80, y: 24 }, damage: 100, hitstunFrame: 8, hitstunVelocity: { x: 0, y: 0 }, ejectionVelocity: { x: 16, y: -8 } }
                ],
                26: []
            },
            hurtboxes: {
                0: [
                    { offset: { x: 0, y: 0 }, size: { x: 64, y: 128 } }
                ],
                12: [
                    { offset: { x: 0, y: 0 }, size: { x: 80, y: 128 } },
                ],
                24: [
                    { offset: { x: 0, y: 0 }, size: { x: 64, y: 128 } }
                ],
            },
            animation: {
                offset: { x: -58, y: -48 },
                size: { x: 160, y: 192 },
                speed: 1 / 6,
                frameCount: 6
            }
        },
        LOW_LIGHT: {
            duration: 16,
            cancellable: false,
            fixedDirection: true,
            isAerial: false,
            attackType: 'LOW',
            size: { x: 32, y: 96 },
            velocity: {
                0: (fight, character, inputList) => ({ x: 0, y: 0 })
            },
            hitboxes: {
                0: [],
                6: [
                    { offset: { x: 32, y: 72 }, size: { x: 64, y: 24 }, damage: 50, hitstunVelocity: { x: 2, y: 0 } }
                ],
                9: []
            },
            hurtboxes: {
                0: [
                    { offset: { x: 0, y: 0 }, size: { x: 48, y: 96 } }
                ],
                6: [
                    { offset: { x: 0, y: 0 }, size: { x: 48, y: 96 } },
                    { offset: { x: 32, y: 84 }, size: { x: 48, y: 12 } }
                ],
                12: [
                    { offset: { x: 0, y: 0 }, size: { x: 48, y: 96 } }
                ]
            },
            animation: {
                offset: { x: -38, y: -80 },
                size: { x: 160, y: 192 },
                speed: 1 / 8,
                frameCount: 2
            }
        },
        LOW_HEAVY: {
            duration: 36,
            cancellable: false,
            fixedDirection: true,
            isAerial: false,
            attackType: 'LOW',
            size: { x: 32, y: 96 },
            velocity: {
                0: (fight, character, inputList) => ({ x: 0, y: 0 })
            },
            hitboxes: {
                0: [],
                18: [
                    { offset: { x: 32, y: 72 }, size: { x: 64, y: 24 }, damage: 100, hitstunVelocity: { x: 0, y: 0 } }
                ],
                24: []
            },
            hurtboxes: {
                0: [
                    { offset: { x: -16, y: 16 }, size: { x: 48, y: 80 } }
                ],
                12: [
                    { offset: { x: -16, y: 16 }, size: { x: 48, y: 80 } },
                    { offset: { x: 32, y: 80 }, size: { x: 48, y: 16 } }
                ],
                24: [
                    { offset: { x: -16, y: 16 }, size: { x: 48, y: 80 } }
                ]
            },
            animation: {
                offset: { x: -38, y: -80 },
                size: { x: 160, y: 192 },
                speed: 1 / 8,
                frameCount: 4
            }
        },
        AERIAL_LIGHT: {
            duration: 16,
            cancellable: false,
            fixedDirection: true,
            isAerial: true,
            attackType: 'AERIAL',
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: character.velocity.x, y: character.velocity.y + 0.75 })
            },
            hitboxes: {
                0: [],
                6: [
                    { offset: { x: 32, y: 48 }, size: { x: 32, y: 32 }, damage: 50, hitstunVelocity: { x: 1, y: 0 } }
                ],
                9: []
            },
            hurtboxes: {
                0: [
                    { offset: { x: -8, y: 0 }, size: { x: 48, y: 112 } }
                ],
                6: [
                    { offset: { x: -8, y: 0 }, size: { x: 48, y: 112 } },
                    { offset: { x: 32, y: 48 }, size: { x: 24, y: 24 } }
                ],
                12: [
                    { offset: { x: -8, y: 0 }, size: { x: 48, y: 112 } }
                ],
            },
            animation: {
                offset: { x: -29, y: -24 },
                size: { x: 143, y: 192 },
                speed: 1 / 4,
                frameCount: 4
            }
        },
        AERIAL_HEAVY: {
            duration: 24,
            cancellable: false,
            fixedDirection: true,
            isAerial: true,
            attackType: 'AERIAL',
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: character.velocity.x, y: character.velocity.y + 0.75 })
            },
            hitboxes: {
                0: [],
                8: [
                    { offset: { x: 32, y: 80 }, size: { x: 64, y: 32 }, damage: 100, hitstunVelocity: { x: 1, y: 0 } }
                ],
                14: []
            },
            hurtboxes: {
                0: [
                    { offset: { x: 0, y: 0 }, size: { x: 48, y: 128 } }
                ],
                6: [
                    { offset: { x: 0, y: 0 }, size: { x: 48, y: 128 } },
                    { offset: { x: 32, y: 64 }, size: { x: 48, y: 48 } }
                ],
                12: [
                    { offset: { x: 0, y: 0 }, size: { x: 48, y: 128 } }
                ]
            },
            animation: {
                offset: { x: -58, y: -24 },
                size: { x: 128, y: 192 },
                speed: 1 / 6,
                frameCount: 4
            }
        },
        QCF: {
            duration: 32,
            cancellable: false,
            fixedDirection: true,
            isAerial: false,
            attackType: 'AERIAL',
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: 6 * (character.direction ? 1 : -1), y: 0 }),
                28: (fight, character, inputList) => ({ x: 0, y: 0 })
            },
            hitboxes: {
                0: [],
                20: [
                    { offset: { x: 32, y: 24 }, size: { x: 80, y: 24 }, damage: 100, hitstunFrame: 32, hitstunVelocity: { x: 0, y: 0 }, ejectionVelocity: { x: 16, y: -8 } }
                ],
                26: []
            },
            hurtboxes: {
                0: [
                    { offset: { x: 0, y: 0 }, size: { x: 32, y: 128 } }
                ],
                12: [
                    { offset: { x: 0, y: 0 }, size: { x: 32, y: 128 } },
                ],
                24: [
                    { offset: { x: 0, y: 0 }, size: { x: 32, y: 128 } }
                ],
            },
            animation: {
                offset: { x: -58, y: -48 },
                size: { x: 178, y: 192 },
                speed: 1 / 4,
                frameCount: 8
            }
        },
        DP: {},
        HCF: {},
        AERIAL_BLOCK: {
            duration: 1,
            cancellable: true,
            fixedDirection: true,
            isAerial: false,
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: character.velocity.x, y: character.velocity.y })
            },
            animation: {
                offset: { x: -29, y: -28 },
                size: { x: 91, y: 192 },
                speed: 1,
                frameCount: 1
            }
        },
        BLOCK: {
            duration: 1,
            cancellable: true,
            fixedDirection: true,
            isAerial: false,
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: character.velocity.x, y: character.velocity.y })
            },
            animation: {
                offset: { x: -29, y: -48 },
                size: { x: 91, y: 192 },
                speed: 1,
                frameCount: 1
            }
        },
        LOW_BLOCK: {
            duration: 1,
            cancellable: true,
            fixedDirection: true,
            isAerial: false,
            size: { x: 32, y: 96 },
            velocity: {
                0: (fight, character, inputList) => ({ x: character.velocity.x, y: character.velocity.y })
            },
            animation: {
                offset: { x: -29, y: -80 },
                size: { x: 91, y: 192 },
                speed: 1,
                frameCount: 1
            }
        },
        HIT: {
            duration: 1,
            cancellable: true,
            fixedDirection: true,
            isAerial: true,
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: character.velocity.x, y: character.velocity.y + 0.75 })
            },
            hurtboxes: {
                0: [
                    { offset: { x: -8, y: 0 }, size: { x: 48, y: 128 } }
                ]
            },
            animation: {
                offset: { x: -29, y: -32 },
                size: { x: 91, y: 192 },
                speed: 1,
                frameCount: 1,
                effects: {
                    0: [
                        { name: 'shake' }
                    ]
                },
                sfx: {
                    0: [
                        { name: 'CHARACTER_02_HIT' }
                    ]
                },
            }
        },
        EJECTED: {
            duration: 1,
            cancellable: true,
            fixedDirection: true,
            isAerial: true,
            collisionBoxDisable: true,
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: character.velocity.x, y: character.velocity.y + 0.25 })
            },
            animation: {
                altImg: {
                    action: "HIT",
                    condition: (fight, character) => true
                },
                offset: { x: -29, y: -48 },
                size: { x: 91, y: 192 },
                speed: 1,
                frameCount: 1,
                effects: {
                    0: [
                        { name: 'rotate', params: [-45] }
                    ]
                }
            }
        },
        GROUND: {
            duration: 0,
            cancellable: true,
            fixedDirection: true,
            isAerial: false,
            collisionBoxDisable: true,
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: 0, y: 0 })
            },
            animation: {
                offset: { x: -29, y: -48 },
                size: { x: 91, y: 192 },
                speed: 1,
                frameCount: 1
            }
        },
        GET_UP: {
            duration: 16,
            cancellable: false,
            fixedDirection: true,
            isAerial: false,
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: 0, y: 0 })
            },
            animation: {
                offset: { x: -29, y: -48 },
                size: { x: 91, y: 192 },
                speed: 1,
                frameCount: 1
            }
        },
        LAND: {},
        RECOVER: {},
        TECH: {
            duration: 16,
            cancellable: false,
            fixedDirection: true,
            isAerial: true,
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: 0, y: 0 })
            }
        },
        GRAB: {
            duration: 25,
            cancellable: false,
            fixedDirection: true,
            isAerial: false,
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: 0, y: 0 })
            },
            hitboxes: {
                0: []
            },
            hurtboxes: {
                0: [],
            },
            animation: {}
        },
        GRAB_TECH: {},
        GRABBED: {
            // duration: 1,
            cancellable: true,
            fixedDirection: true,
            isAerial: false,
            size: { x: 32, y: 128 },
            hurtboxes: {
                0: [
                    { offset: { x: 0, y: 0 }, size: { x: 32, y: 128 } }
                ],
            },
            velocity: {
                0: (fight, character, inputList) => ({ x: character.velocity.x, y: character.velocity.y + 0.25 })
            },
            animation: {
                altImg: {
                    action: "HIT",
                    condition: (fight, character) => true
                },
                offset: { x: -29, y: -48 },
                size: { x: 91, y: 192 },
                speed: 1,
                frameCount: 1
            }
        },
        BACK_THROW: {
            duration: 32,
            cancellable: false,
            fixedDirection: true,
            isAerial: false,
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: 0.4 * (character.direction ? -1 : 1), y: 0 }),
                16: (fight, character, inputList) => ({ x: 0, y: 0 })
            },
            hitboxes: {
                0: [],
                12: [
                    { offset: { x: 10, y: 24 }, size: { x: 100, y: 100 }, damage: 10, hitstunFrame: 8, hitstunVelocity: { x: 0, y: 0 }, ejectionVelocity: { x: -16, y: -15 } }
                ],
                18: []
            },
            hurtboxes: {
                0: [
                    { offset: { x: 0, y: 0 }, size: { x: 64, y: 128 } }
                ],
                12: [
                    { offset: { x: 0, y: 0 }, size: { x: 30, y: 128 } },
                    { offset: { x: 10, y: 24 }, size: { x: 30, y: 44 } }
                ],
                24: [
                    { offset: { x: 0, y: 0 }, size: { x: 64, y: 128 } }
                ],
            },
            animation: {}
        },
        FORWARD_THROW: {
            duration: 32,
            cancellable: false,
            fixedDirection: true,
            isAerial: false,
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: 0.4 * (character.direction ? -1 : 1), y: 0 }),
                16: (fight, character, inputList) => ({ x: 0, y: 0 })
            },
            hitboxes: {
                0: [],
                12: [
                    { offset: { x: 10, y: 24 }, size: { x: 100, y: 100 }, damage: 10, hitstunFrame: 8, hitstunVelocity: { x: 0, y: 0 }, ejectionVelocity: { x: 16, y: -15 } }
                ],
                18: []
            },
            hurtboxes: {
                0: [
                    { offset: { x: 0, y: 0 }, size: { x: 64, y: 128 } }
                ],
                12: [
                    { offset: { x: 0, y: 0 }, size: { x: 30, y: 128 } },
                    { offset: { x: 10, y: 24 }, size: { x: 30, y: 44 } }
                ],
                24: [
                    { offset: { x: 0, y: 0 }, size: { x: 64, y: 128 } }
                ],
            },
            animation: {}
        },
        INTRO: {
            duration: 64,
            cancellable: false,
            fixedDirection: true,
            isAerial: false,
            disableMenu: true,
            collisionBoxDisable: true,
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: 0, y: 0 })
            },
            animation: {
                offset: { x: -80, y: -52 },
                size: { x: 140, y: 192 },
                speed: 1 / 8,
                frameCount: 8
            }
        },
        KO: {
            duration: 45,
            cancellable: false,
            fixedDirection: true,
            isAerial: false,
            collisionBoxDisable: true,
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: 0, y: 0 })
            }
        },
        WIN_ROUND: {
            duration: 45,
            cancellable: false,
            fixedDirection: true,
            isAerial: false,
            collisionBoxDisable: true,
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: 0, y: 0 })
            }
        },
        WIN: {
            duration: 45,
            cancellable: false,
            fixedDirection: true,
            isAerial: false,
            collisionBoxDisable: true,
            size: { x: 32, y: 128 },
            velocity: {
                0: (fight, character, inputList) => ({ x: 0, y: 0 })
            }
        },
        WAITING: {
            duration: 48,
            cancellable: false,
            fixedDirection: false,
            isAerial: false,
            disableMenu: true,
            collisionBoxDisable: true,
            size: { x: 32, y: 120 },
            velocity: {
                0: (fight, character, inputList) => ({ x: 0, y: 0 })
            },
            animation: {
                altImg: {
                    action: "IDLE",
                    condition: (fight, character) => true
                },
                offset: { x: -29, y: -56 },
                size: { x: 91, y: 192 },
                speed: 1 / 8,
                frameCount: 6
            }
        }
    }
}