let loginUser = JSON.parse(localStorage.getItem("loginUser"));
let loginUSerEmail = loginUser.email;
let userMail = document.querySelector(".usermail");
userMail.innerHTML = loginUSerEmail;
// Chọn phần tử div có class "pin"
let pinContainer = document.querySelector(".pin");

// Hàm renderSavedImages để hiển thị danh sách mảng ảnh đã lưu
function renderSavedImages() {
  let savedImages = JSON.parse(localStorage.getItem("savedImages")) || [];
  let result = "";

  for (let i = 0; i < savedImages.length; i++) {
    let imageArr = savedImages[i];
    for (let j = 0; j < imageArr.length; j++) {
      let image = imageArr[j];
      result += `
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal${image.id}">
          <div class="window">
            <img class="foto" src="${image.img}" alt="photo" />
            <div class="hover-zone">
            </div>
          </div>
        </button>
    
        <!-- Modal for each image -->
        <div class="modal fade" id="modal${image.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modal${image.id}Label" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <div class="top-bar">
                  <button class="delete-btn">Delete</button>
                </div>
              </div>
              <div class="modal-body">
                <img class="foto" src="${image.img}" alt="photo" />
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
        </div>`;
    }
  }

  pinContainer.innerHTML = result;
}

// Gọi hàm renderSavedImages để hiển thị danh sách mảng ảnh đã lưu
renderSavedImages();

// Lấy các phần tử cần sử dụng
let fullnameInput = document.querySelector(".fullname");
let addressInput = document.querySelector(".address");
let phoneInput = document.querySelector(".phone-number");
let saveBtn = document.querySelector(".save-btn");

// Kiểm tra xem đã có dữ liệu trong local storage chưa
if (localStorage.getItem("profileData")) {
  let profileData = JSON.parse(localStorage.getItem("profileData"));

  // Đổ dữ liệu từ local storage vào các ô input
  fullnameInput.value = profileData.fullname || "";
  addressInput.value = profileData.address || "";
  phoneInput.value = profileData.phone || "";
}

// Xử lý sự kiện khi nhấn nút "Save Changes"
saveBtn.addEventListener("click", function () {
  // Lấy dữ liệu từ các ô input
  let fullname = fullnameInput.value;
  let address = addressInput.value;
  let phone = phoneInput.value;

  // Lưu dữ liệu vào local storage
  let profileData = { fullname, address, phone };
  localStorage.setItem("profileData", JSON.stringify(profileData));

  // Hiển thị thông báo hoặc thực hiện các thao tác khác khi lưu thành công

  // Render dữ liệu vào các ô input tương ứng
  fullnameInput.value = fullname;
  addressInput.value = address;
  phoneInput.value = phone;
});
