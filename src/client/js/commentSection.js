const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const deleteBtns = document.getElementsByClassName("delete-comment-btn");

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.dataset.id = id;
    newComment.className = "video__comment";
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = `  ${text}`;
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";
    deleteBtn.classList.add("delete-comment-btn");

    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(deleteBtn);
    videoComments.prepend(newComment);

    deleteBtn.addEventListener("click", handleDelete);
}

const removeComment = (id) => {
    
}

const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;

    if (!text) {return;}

    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json", 
        }, 
        body: JSON.stringify({
            text, 
        }), 
    });
    
    if (response.status === 201) {
        textarea.value = "";
        const {newCommentId} = await response.json();
        addComment(text, newCommentId);
    }
}

const handleDelete = async (event) => {
    console.log(event);
    //const response = await fetch(`/api/comments/${commentId}`, {
    //    method: "DELETE", 
    //    headers: {
    //        "Content-Type": "application/json", 
    //    }, 
    //});
}

if (form) {
    form.addEventListener("submit", handleSubmit);
}