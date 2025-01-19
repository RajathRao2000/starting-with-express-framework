// const axios = require("axios");
let arr = {};
let fullList = document.getElementById("list");
let resourceArr = [];
window.addEventListener("DOMContentLoaded", displayLocalStorage());
let updatingUser = false,
  Gid = "";
async function displayLocalStorage(edit) {
  await axios.get("http://localhost:3000/expense").then((res) => {
    if (edit) {
      fullList.innerHTML = "";
    }
    res.data.result.forEach((itemsObj) => {
      let newLi = document.createElement("li");
      // newLi.className="list-group-item container text-right"
      newLi.classList.add("list-group-item", "container");
      newLi.innerHTML =
        `<div style="display:none;">${itemsObj["id"]}</div>${itemsObj["amount"]}-${itemsObj["description"]}-${itemsObj["category"]}` +
        '&nbsp&nbsp<div class="btn-group text-right"><button  class=" delete-btn btn btn-danger" type="button" ">Delete Expense</button>' +
        '<button  class="edit-btn btn btn-primary" type="button" ">Edit Expense</button></div>';
      newLi.setAttribute("onclick", "deleter(event);editer(event);");

      fullList.appendChild(newLi);
    });
    resourceArr = res.data;
  });
}

// displayLocalStorage();

async function handleFormSubmit(event) {
  event.preventDefault();

  let tempObj = {};
  const editModeInput = document.querySelector('input[name="editMode"]') || {
    value: "false",
  };
  let amount = document.getElementById("amount").value;
  let description = document.getElementById("description").value;
  let category = document.getElementById("category").value;
  if (category == "--select--") return false;

  let data = JSON.stringify({
    amount,
    category,
    description,
  });
  if (editModeInput.value == "true") {
    updatingUser = false;
    let config = {
      method: "PUT",
      url: "http://localhost:3000/expense/" + Gid,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(async (res) => {
        await displayLocalStorage(true);
        return (tempObj = res.data);
      })
      .catch((err) => console.error("error:", err));
  } else {
    let config = {
      method: "post",
      url: "http://localhost:3000/expense",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then((res) => {
        let newLi = document.createElement("li");
        newLi.className = "list-group-item";
        newLi.innerHTML =
          `<div style="display:none;">${tempObj["id"]}</div>${amount}-${description}-${category}` +
          '&nbsp&nbsp<div class="btn-group"><button  class="delete-btn btn btn-danger" type="button" ">Delete Expense</button>' +
          '<button  class="edit-btn btn btn-primary" type="button" ">Edit Expense</button></div>';
        newLi.setAttribute("onclick", "deleter(event);editer(event);");

        fullList.appendChild(newLi);
        return (tempObj = res.data);
      })
      .catch((err) => console.error("error:", err));
  }
}

async function deleter(event) {
  event.preventDefault();
  if (event.target.classList.contains("delete-btn")) {
    const usrDetails = event.target.parentElement.parentElement;
    const id =
      event.target.parentElement.parentElement.firstElementChild.textContent;
    await axios.delete("http://localhost:3000/expense/" + id).then(() => {
      fullList.removeChild(usrDetails);
    });
  }
}

async function editer(event) {
  event.preventDefault();
  updatingUser = true;
  if (event.target.classList.contains("edit-btn")) {
    const usrDetails = event.target.parentElement.parentElement;
    const editModeInput = document.createElement("input");
    editModeInput.type = "hidden";
    editModeInput.name = "editMode";
    editModeInput.value = true;
    usrDetails.appendChild(editModeInput);
    const id =
      event.target.parentElement.parentElement.firstElementChild.textContent;
    Gid = id;
    let usrDetailsArr =
      usrDetails.firstChild.nextSibling.textContent.split("-");
    // fullList.removeChild(usrDetails);

    document.getElementById("amount").value = usrDetailsArr[0];
    document.getElementById("description").value = usrDetailsArr[1];
    document.getElementById("category").value = usrDetailsArr[2].trim();
    // document.getElementById("list").value = usrDetailsArr[2];
    const submitBtn = document.getElementById("submit");
    const div = document.createElement("div");
    const editBtn = document.createElement("button");
    editBtn.id = "edit";
    editBtn.className = "btn btn-primary";
    editBtn.type = "submit";
    editBtn.textContent = "Edit";

    const closeEditBtn = document.createElement("button");
    closeEditBtn.className = "btn btn-primary";
    closeEditBtn.type = "submit";
    closeEditBtn.textContent = "close Edit";
    editBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      await handleFormSubmit(e).then(() => {
        div.replaceWith(submitBtn);
      });
    });

    closeEditBtn.addEventListener("click", (e) => {
      e.preventDefault();
      updatingUser = false;
      document.getElementById("amount").value = "";
      document.getElementById("description").value = "";
      document.getElementById("category").value = "--select--";
      document.querySelector('input[name="editMode"]').remove();
      div.replaceWith(submitBtn); // Replace div with original submit button
    });

    div.appendChild(editBtn);
    div.appendChild(closeEditBtn);
    if (submitBtn) {
      submitBtn.parentNode.replaceChild(div, submitBtn);
    }
  }
}
