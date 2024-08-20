import { Document, Schema, model } from 'mongoose';
//import { IEventCategory } from '../interfaces/eventCategoryInterface';

interface IEventCategory extends Document {
    categoryTitle: string;
}

const eventCategorySchema = new Schema<IEventCategory>({
    categoryTitle: { type: String, required: true },
});

const EventCategory = model<IEventCategory>('Event', eventCategorySchema);

export default EventCategory;
