const form = document.getElementById("appointment-form");
const appointmentsList = document.getElementById("appointments-list");
fetch("http://localhost:3000/user-data")
  .then((response) => response.json())
  .then((data) => {
    data.result.forEach(({ userName: username, phone, email, id }) => {
      const appointmentDiv = document.createElement("div");
      appointmentDiv.className = "appointment-item";

      const text = document.createElement("span");
      text.textContent = `${username} - ${email} - ${phone}`;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        fetch("http://localhost:3000/user-data/" + id, {
          method: "DELETE",
        })
          .then((response) => appointmentsList.removeChild(appointmentDiv))
          .catch((err) => console.error(err));
      });

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "edit";
      editButton.addEventListener("click", () => {
        document.getElementById("username").value = username;
        document.getElementById("phone").value = phone;
        document.getElementById("email").value = email;
        appointmentsList.removeChild(appointmentDiv);
      });

      appointmentDiv.appendChild(text);
      appointmentDiv.appendChild(deleteButton);
      // appointmentDiv.appendChild(editButton);

      appointmentsList.appendChild(appointmentDiv);
    });
  });
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;

  if (username && phone && email) {
    addAppointment(username, phone, email);
    form.reset();
  }
});

function addAppointment(username, phone, email) {
  if (username && phone && email) {
    fetch("http://localhost:3000/user-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        phone: phone,
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== "success") {
          alert(data.message);
          return;
        }
        const appointmentDiv = document.createElement("div");
        appointmentDiv.className = "appointment-item";

        const text = document.createElement("span");
        text.textContent = `${username} - ${email} - ${phone}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
          fetch("http://localhost:3000/user-data/" + data.id, {
            method: "DELETE",
          })
            .then((response) => appointmentsList.removeChild(appointmentDiv))
            .catch((err) => console.error(err));
        });

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit";
        editButton.addEventListener("click", () => {
          document.getElementById("username").value = username;
          document.getElementById("phone").value = phone;
          document.getElementById("email").value = email;
          appointmentsList.removeChild(appointmentDiv);
        });

        appointmentDiv.appendChild(text);
        appointmentDiv.appendChild(deleteButton);
        // appointmentDiv.appendChild(editButton);

        appointmentsList.appendChild(appointmentDiv);
      });
  }
}
