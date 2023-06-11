// let imgObj = [
//   {
//     id: 1,
//     img: "https://i.pinimg.com/736x/47/5e/ba/475eba57454015bfe214e8722e2422a1.jpg",
//     title: "",
//     description: "",
//   },
//   {
//     id: 2,
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_5a16XSJ36dD6AFTIgpImdrs7-N5aNPkflOFhV-KdEynJkW7ZAORhhs7Ufp8-QF395ho&usqp=CAU",
//     title: "",
//     description: "",
//   },
//   {
//     id: 3,
//     img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1",
//     title: "",
//     description: "",
//   },
// ];
// localStorage.setItem("imgObj", JSON.stringify(imgObj));

function renderData() {
  let dataImg = JSON.parse(localStorage.getItem("imgObj")) || [];
  let bigContainer = document.getElementById("container");
  let result = ``;

  for (let i = 0; i < dataImg.length; i++) {
    result += `

    
    <div class="img-container">
      <div class="top-bar">
        <p>Profile ⌵</p>
        <a class="save-btn" id=${dataImg[i].id}>Save</a>
      </div>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal${dataImg[i].id}">
        <div class="window">
          <img class="foto" src="${dataImg[i].img}" alt="photo" />
          <div class="hover-zone">
            <div class="bottom-bar">
              <a>↗ website.com</a>
              <div class="radius-ico">
                <img src="https://cdn3.iconfinder.com/data/icons/iconset-1-1/24/icon_set_outlinder-10-256.png" />
                <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-more-256.png" />
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>

    <!-- Modal for each image -->
    <div class="modal fade" id="modal${dataImg[i].id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modal${dataImg[i].id}Label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="top-bar-delete">
              <button class="delete-btn">Delete</button>
            </div>
          </div>
          <div class="modal-body">
            <img class="foto" src="${dataImg[i].img}" alt="photo" />
          </div>
          <div class="cmt-box">
          <ul>
            <li></li>
          </ul>
          </div>
          <div class="modal-footer">
            <input type="text" id="comment" placeholder="Add a comment" />
            <button class="cmt-btn">Comment</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
`;
  }
  bigContainer.innerHTML = result;
}
renderData();

// lưu cmt lên localstorage
function renderComments(modalId) {
  let cmtBox = document.querySelector(`#${modalId} .cmt-box`);
  cmtBox.innerHTML = ""; // Xóa nội dung hiện tại trong cmtBox

  // Lấy dữ liệu từ localStorage
  let cmtObj = JSON.parse(localStorage.getItem(`commentObj_${modalId}`)) || [];

  // Duyệt qua mảng cmtObj và tạo các phần tử bình luận
  for (let i = 0; i < cmtObj.length; i++) {
    let comment = document.createElement("li");
    comment.textContent = cmtObj[i];
    cmtBox.appendChild(comment);
  }
}
function saveComment(event) {
  let inputCmt = event.target.previousElementSibling.value;
  if (inputCmt.trim() !== "") {
    let modalId = event.target.closest(".modal").id;
    let cmtObj =
      JSON.parse(localStorage.getItem(`commentObj_${modalId}`)) || [];
    cmtObj.push(inputCmt);
    localStorage.setItem(`commentObj_${modalId}`, JSON.stringify(cmtObj));
    event.target.previousElementSibling.value = "";
    renderComments(modalId);
  }
}
let cmtBtns = document.querySelectorAll(".cmt-btn");
cmtBtns.forEach(function (btn) {
  btn.addEventListener("click", saveComment);
});
// // Gọi hàm renderComments để hiển thị các bình luận ban đầu cho tất cả các modal
// document.querySelectorAll(".modal").forEach(function (modal) {
//   let modalId = modal.id;
//   renderComments(modalId);
// });
// function saveComment(event) {
//   let inputCmt = event.target.previousElementSibling.value;
//   if (inputCmt.trim() !== "") {
//     let modalId = event.target.closest(".modal").id;
//     Get the logged-in user's email from local storage
//     let loginUser = JSON.parse(localStorage.getItem("loginUser"));
//     let userEmail = loginUser.email;
//     let cmtObj =
//     JSON.parse(localStorage.getItem(`commentObj_${modalId}`)) || [];
//     Create an object to store the comment and the user's email
//     let commentObj = {
//       email: userEmail,
//       comment: inputCmt,
//     };
//     cmtObj.push(commentObj);
//     localStorage.setItem(`commentObj_${modalId}`, JSON.stringify(cmtObj));
//     event.target.previousElementSibling.value = "";
//     renderComments(modalId);
//   }
// }
function saveComment(event) {
  let inputCmt = event.target.previousElementSibling.value;
  if (inputCmt.trim() !== "") {
    let modalId = event.target.closest(".modal").id;

    // Get the logged-in user's email from local storage
    let loginUser = JSON.parse(localStorage.getItem("loginUser"));
    let userEmail = loginUser.email;

    let cmtObj =
      JSON.parse(localStorage.getItem(`commentObj_${modalId}`)) || [];

    // Create an object to store the comment and the user's email
    let commentObj = {
      email: userEmail,
      comment: inputCmt,
    };

    cmtObj.push(commentObj);
    localStorage.setItem(`commentObj_${modalId}`, JSON.stringify(cmtObj));
    event.target.previousElementSibling.value = "";
    renderComments(modalId);
  }
}

// Function to render comments
function renderComments(modalId) {
  let cmtBox = document.querySelector(`#${modalId} .cmt-box`);
  cmtBox.innerHTML = ""; // Clear current content in cmtBox
  // Get data from localStorage
  let cmtObj = JSON.parse(localStorage.getItem(`commentObj_${modalId}`)) || [];
  // Loop through cmtObj array and create comment elements
  for (let i = 0; i < cmtObj.length; i++) {
    let comment = document.createElement("li");
    // Display the email and comment text
    comment.textContent = `${cmtObj[i].email}: ${cmtObj[i].comment}`;
    cmtBox.appendChild(comment);
  }
}
// Add event listeners to comment buttons
let cmtBtn = document.querySelectorAll(".cmt-btn");
cmtBtns.forEach(function (btn) {
  btn.addEventListener("click", saveComment);
});
// Call renderComments function to display initial comments for all modals
document.querySelectorAll(".modal").forEach(function (modal) {
  let modalId = modal.id;
  renderComments(modalId);
});

// render ra usermail
let loginUser = JSON.parse(localStorage.getItem("loginUser"));
let loginUSerEmail = loginUser.email;
let userMail = document.querySelector(".usermail");
userMail.innerHTML = loginUSerEmail;

// Add event listeners to delete buttons
let deleteBtns = document.querySelectorAll(".delete-btn");
deleteBtns.forEach(function (btn) {
  btn.addEventListener("click", deleteImage);
});

// Function to delete an image
function deleteImage(event) {
  let modalId = event.target.closest(".modal").id;
  let imageId = modalId.replace("modal", ""); // Extract the ID from the modal ID
  let imgObj = JSON.parse(localStorage.getItem("imgObj"));
  let loginUser = JSON.parse(localStorage.getItem("loginUser"));

  // Find the index of the image object with the matching ID
  let index = imgObj.findIndex((img) => img.id === parseInt(imageId));
  if (index !== -1) {
    // Check if the image belongs to the current user
    if (imgObj[index].userId === loginUser.id) {
      // Remove the image object from the imgObj array
      imgObj.splice(index, 1);
      localStorage.setItem("imgObj", JSON.stringify(imgObj));
      renderData(); // Re-render the updated data
    } else {
      alert("You can only delete your own images.");
    }
  }
  window.location.href = "./mainpage.html";
}

// Add event listeners to container and save buttons
let container = document.getElementById("container");
let saveBtns = document.querySelectorAll(".save-btn");
// Event listener for container
container.addEventListener("click", function (event) {
  if (event.target.classList.contains("save-btn")) {
    let dataImg = JSON.parse(localStorage.getItem("imgObj")) || [];
    let saveImg = dataImg.filter((e) => e.id == Number(event.target.id));
    let saveImages = JSON.parse(localStorage.getItem("savedImages")) || [];
    saveImages.push(saveImg);
    localStorage.setItem("savedImages", JSON.stringify(saveImages));
  }
});
