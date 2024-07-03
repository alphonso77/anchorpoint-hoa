import { FeedbackForm } from 'components/feedback-form';

export default async function Page() {
    return (
        <>
            <h1>Feedback</h1>
            <div className="flex w-full pt-12 justify-center">
                <FeedbackForm />
            </div>
        </>
    );
}