// logic
async function commentFormHandler(e) {
  e.preventDefault();

  const comment_text = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();

  const client_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (comment_text) {
    const response = await fetch("/api/comments", {
      method: "post",
      body: JSON.stringify({
        client_id,
        comment_text,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

// calls
document
  .getElementById("comment-form")
  .addEventListener("click", commentFormHandler);
