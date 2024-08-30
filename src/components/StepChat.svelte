<script>
    import { Input, Label, Spinner } from 'flowbite-svelte';
    import { appStatusInfo } from '../store.ts';

    const { id, url, pages } = $appStatusInfo;

    let loading = false;

    const numImagesToShow = Math.min(pages, 4)
    const images = Array.from({ length: numImagesToShow }, (_, i) => {
        const page = i + 1;
        return url
            .replace('/upload/', `/upload/w_400,h_540,c_fill,pg_${page}/`)
            .replace('.pdf', '.jpg');
    })

    const handleSubmit = () => {
        console.log('submit');
    }
</script>

{#each images as image}
    <img src={image} alt="PDF page" class="w-full h-auto mb-4" />
{/each}

{#if loading}
    <Spinner class="mt-4" />
{:else}
    <form on:submit={handleSubmit}>
        <Label for="question-input" class="block mb-2">Deja aquí tu pregunta</Label>
        <Input id="question-input" required placeholder="¿De qué trata este PDF?"></Input>
    </form>
{/if}

<form on:submit={handleSubmit}>
        <Label for="question-input" class="block mb-2">Deja aquí tu pregunta</Label>
        <Input id="question-input" required placeholder="¿De qué trata este PDF?"></Input>
</form>

 