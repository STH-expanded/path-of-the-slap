// class Swaps extends Sling {
//     constructor(action, direction, position) {
//         super(action, direction, position);

//         //------------------------------------------------------------------------------------------------------------------------------
//         // DATA
//         //------------------------------------------------------------------------------------------------------------------------------

//         this.forwardDashFrame = 15;
//         this.backDashFrame = 10;

//         this.canBackdash = true;
//         this.runBackDash = false;
        
//         this.canDash = true;
//         this.runDash = false;

//         this.idleSize = new Vector2D(24, 96);
//         this.jumpSize = new Vector2D(24, 64);
//         this.crouchSize = new Vector2D(24, 64);

//         this.forwardDashSpeed = 8;
//         this.backDashSpeed = -8;

//         this.collisionBox = new CollisionBox(new Vector2D(position - this.idleSize.x / 2, 270 - 16 - this.idleSize.y), this.idleSize.times(1));

//         //------------------------------------------------------------------------------------------------------------------------------
//         // ACTIONS
//         //------------------------------------------------------------------------------------------------------------------------------

//         this.BACKWARD_DASH = game => {
//             this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-25, -103)), new Vector2D(50, 106)));
//         };

//         this.NEUTRAL_HIGH = game => {
//             this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-24, -48)),new Vector2D(48, 96)));
//         }

//         this.HIGH_B = game => {
//             this.hurtboxes.push(new HurtBox(
//                 this.collisionBox.center().plus(new Vector2D(-16, -56)),
//                 new Vector2D(32, 112)
//             ));

//             if (this.frame > 11 && this.frame < 18) {
//                 this.hitboxes.push(new HitBox(
//                     "storke",
//                     this.collisionBox.center().plus(new Vector2D(-36, -16)),
//                     new Vector2D(72, 32),
//                     75,
//                     30,
//                     this.direction
//                 ));
//             }
//         };
//     }
// }
// Swaps.id = '02';