import { Date, Document, Types } from "mongoose";

export interface IEvent extends Document {
    eventName: string;
    category: string;
    coverImage: string;
    explanatoryText: string;
    scheduleDate: Date;
    scheduleStartingTime: TimeRanges;
    numberOfMenRecruited: number;
    numberOfWomenRecruited: number;
    ratesOfMen: number;
    ratesOfWomen: number;
}
