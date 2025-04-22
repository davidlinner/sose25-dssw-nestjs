window.addEventListener('DOMContentLoaded', async (event) => {
  const response = await fetch('/messages');

  if(response.status === 200){
    const ul = document.querySelector("#message-list");

    const messages = await response.json();

    const listItems = messages.map(message => `
      <li>${message.title}</li>
    `).join()

    ul.innerHTML = listItems;
  }
});
