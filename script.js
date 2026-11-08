const button = document.querySelector("button");
const list = document.querySelector("ul");
const baseUrl = "https://hacker-news.firebaseio.com/v0";

button.addEventListener("click", async () => {
  console.log("Fetching...");
  try {
    button.textContent = "Fetching...";

    const response = await fetch(`${baseUrl}/repositories.json`);

    const data = await response.json();

    async function storyFetcher(storyId) {
      try {
        const storyRes = await fetch(`${baseUrl}/item/${storyId}.json`);

        const story = await storyRes.json();

        return {
          title: story.title,
          id: story.id,
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    const storyPromises = data.map((storyId) => {
      return storyFetcher(storyId);
    });

    const finalStories = await Promise.all(storyPromises);
    button.textContent = "Fetch";

    let items = "";
    finalStories.forEach((story) => {
      items += `<li>${story.title}</li>`;
    });

    list.innerHTML = items;
  } catch (error) {
    console.error(error);
  }
});
