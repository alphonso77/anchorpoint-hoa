import { ContextAlert } from 'components/context-alert';
import { revalidateTag } from 'next/cache';
import { SubmitButton } from '../components/submit-button';

const tagName = 'randomWiki';
const randomWikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/random/summary';
const maxExtractLength = 200;
const revalidateTTL = 60;

export default function Page() {

    async function revalidateWiki() {
        'use server';
        revalidateTag(tagName);
    }

    return (
        <main className="flex flex-col gap-8 sm:gap-16">
            <section className="flex flex-col items-start gap-3 sm:gap-4">
                <ContextAlert />
                <h1 className="mb-0">Anchor Point HOA</h1>
                <p className="text-lg">Homeowner&apos;s Association in Apollo Beach, FL</p>
                
                <h4>Random Wikipedia Knowledge</h4>
                
                <RandomWikiArticle />

                <form className="mt-4" action={revalidateWiki}>
                    <SubmitButton text="Click for more useless knowledge..." />
                </form>

            </section>

        </main>
    );
}

async function RandomWikiArticle() {
    const randomWiki = await fetch(randomWikiUrl, {
        next: { revalidate: revalidateTTL, tags: [tagName] }
    });

    const content = await randomWiki.json();
    let extract = content.extract;
    if (extract.length > maxExtractLength) {
        extract = extract.slice(0, extract.slice(0, maxExtractLength).lastIndexOf(' ')) + ' [...]';
    }

    return (
        <div className="bg-white text-neutral-600 card my-6 max-w-2xl">
            <div className="card-title text-3xl px-8 pt-8">{content.title}</div>
            <div className="card-body py-4">
                <div className="text-lg font-bold">{content.description}</div>
                <p className="italic">{extract}</p>
                <a target="_blank" rel="noopener noreferrer" href={content.content_urls.desktop.page}>
                    From Wikipedia
                </a>
            </div>
        </div>
    );
}