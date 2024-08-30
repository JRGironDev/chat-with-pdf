<script>
  import { Input, Label, Spinner } from "flowbite-svelte";
  import { appStatusInfo, setAppStatusError } from "../store.ts";

  const { id, url, pages } = $appStatusInfo;

  let answer = "";

  let loading = false;

  const numOfImagesToShow = Math.min(pages, 1);
  const images = Array.from({ length: numOfImagesToShow }, (_, i) => {
    const page = i + 1;
    return url
      .replace("/upload/", `/upload/w_400,h_540,c_fill,pg_${page}/`)
      .replace(".pdf", ".jpg");
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    loading = true;

    const question = event.target.question.value;

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          question,
        }),
      });

      if (!res.ok) {
        loading = false;
        console.error("Error sending question");
        return;
      }

      const { answer: apiAnswer } = await res.json();
      answer = apiAnswer;
    } catch (error) {
      setAppStatusError();
    } finally {
      loading = false;
    }
  };
</script>

<div class="grid grid-cols-4 gap-2">
  {#each images as image}
    <img
      src={image}
      alt="PDF page"
      class="rounded w-full h-auto mb-4 aspect-[400/540]"
    />
    console.loading(image)
  {/each}
</div>

<form class="mt-8" on:submit={handleSubmit}>
  <Label for="question-input" class="block mb-2">Deja aquí tu pregunta</Label>
  <Input id="question-input" required placeholder="¿De qué trata este PDF?"
  ></Input>
</form>

{#if loading}
  <div class="flex justify-center items-center flex-col gap-y-2">
    <Spinner class="mt-4" />
    <p>Espere a que la respuesta llegue</p>
  </div>
{/if}

{#if answer}
  <div class="mt-8">
    <p class="text-lg font-bold">Respuesta:</p>
    <p>{answer}</p>
  </div>
{/if}
