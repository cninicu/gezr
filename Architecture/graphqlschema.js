type BodyPart{
	name: String!
	posX: Number!
	posY: Number!
	posZ: Number!
}
type User{
	body: Body!
	sex: Integer
	age: Integer
}
type Body{
	joints: [BodyPart]!
}
type Pose{
	name: String!
	body: Body!
	rightHandAboveWrist: Boolean!
	/*and other pose-indicators*/
}
type GestureFragment{
	poses: [Pose]
}
type Interval{
	start: Number!
	end: Number!
}
type Gesture{
	name: String!
	sequence: [GestureFragment]!
	intervals: [Interval]!
}
