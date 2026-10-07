import { Event } from "../types/event.js"
import { Attendee } from "../types/attendee.js"


export const sampleEventData: Event[] = [
    {
        id: 1,
        name: "Tech Conference 2025",
        date: "2025-03-15T09:00:00.000Z",
        capacity: 200,
        registrationCount: 185
    },
    {
        id: 2,
        name: "Startup Pitch Night",
        date: "2025-02-20T18:00:00.000Z",
        capacity: 50,
        registrationCount: 12
    },
    {
        id: 3,
        name: "Web Dev Workshop",
        date: "2025-02-10T10:00:00.000Z",
        capacity: 30,
        registrationCount: 30
    }
]

const sampleAttende: Attendee[] = [
    {
        id: 1,
        name: "Jordan Smith",
        email: "jordan.smith@email.com"
    },
    {
        id: 2,
        name: "Alex Chen",
        email: "alex.chen@email.com"
    }
]
