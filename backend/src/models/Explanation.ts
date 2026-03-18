import mongoose, { Schema, Document } from 'mongoose';

export interface IExplanation extends Document {
    repositoryId: mongoose.Types.ObjectId;
    path: string;
    explanation: string;
    createdAt: Date;
}

const ExplanationSchema = new Schema<IExplanation>({
    repositoryId: { type: Schema.Types.ObjectId, ref: 'Repository', required: true },
    path: { type: String, required: true },
    explanation: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// Ensure unique explanation per repository path
ExplanationSchema.index({ repositoryId: 1, path: 1 }, { unique: true });

export const Explanation = mongoose.model<IExplanation>('Explanation', ExplanationSchema);
