const formDesc = document.querySelector('#desc-form');
const imageForm = document.querySelector('#image-form');
const imageInput = document.querySelector('#image-input');
const input = document.querySelector('input');
const descSubmitBtn = formDesc.querySelector('button');
const imageSubmitBtn = imageForm.querySelector('button');

// Add copy to clipboard functionality
const copyButtons = document.querySelectorAll('.copy-button');

const copyToClipboard = async (text, button) => {
  try {
    await navigator.clipboard.writeText(text);
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    setTimeout(() => {
      button.textContent = originalText;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

copyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const type = button.dataset.copy;
    let textToCopy = '';

    switch (type) {
      case 'description':
        textToCopy = document.querySelector('.description').textContent;
        break;
      case 'tags':
        textToCopy = document.querySelector('.tags').textContent;
        break;
    }

    copyToClipboard(textToCopy, button);
  });
});

formDesc.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Set loading state
  descSubmitBtn.setAttribute('aria-busy', 'true');
  descSubmitBtn.disabled = true;

  try {
    const title = input.value;
    // const res = await fetch('/openai/desc', {

    const res = await fetch('/api/generateMeta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    const data = await res.json();
    document.querySelector('.description').innerText = data.description;
    document.querySelector('.tags').innerText = data.tags;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Reset loading state
    descSubmitBtn.setAttribute('aria-busy', 'false');
    descSubmitBtn.disabled = false;
  }
});

imageForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Set loading state
  imageSubmitBtn.setAttribute('aria-busy', 'true');
  imageSubmitBtn.disabled = true;

  try {
    const prompt = imageInput.value;
    const res = await fetch('/api/generateImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();

    // Get the image element
    const imageElement = document.querySelector('.image');

    // Create a promise that resolves when the image loads
    const imageLoadPromise = new Promise((resolve, reject) => {
      imageElement.onload = resolve;
      imageElement.onerror = reject;
    });

    // Set the image src
    imageElement.src = data.image;

    // Wait for the image to load
    await imageLoadPromise;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Reset loading state only after image is loaded
    imageSubmitBtn.setAttribute('aria-busy', 'false');
    imageSubmitBtn.disabled = false;
  }
});
