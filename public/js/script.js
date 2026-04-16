document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: Date.now(), name }),
  });
  let data = await response.json();
  alert(data.message);

  if (soundManager && soundManager.playSuccessSound) {
    soundManager.playSuccessSound();
  }

  await fetchUsers();

  document.getElementById("name").value = "";
});

async function fetchUsers() {
  let response = await fetch("/api/users");
  let users = await response.json();
  const userList = document.getElementById("userList");
  if(userList){
  userList.innerHTML = users
    .map(
      (u) => `
              <li>
                <span>${u.name}</span>
                <div class="button-group">
                  <button class="btn btn-edit" onclick="editUser('${u.id}', '${u.name}')">Edit</button>
                  <button class="btn btn-delete" onclick="deleteUser('${u.id}')">Delete</button>
                </div>
              </li>
            `,
    )
    .join("");
  }
}

async function deleteUser(id) {
  if (confirm("Are you sure you want to delete this item?")) {
    await fetch(`/api/users/${id}`, { method: "DELETE" });

    if (soundManager && soundManager.playDeleteSound) {
      soundManager.playDeleteSound();
    }

    fetchUsers();
  }
}

async function editUser(id, currentName) {
  const newName = prompt("Edit User Name: ", currentName);
  if (newName && newName !== currentName) {
    await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });

    if (soundManager && soundManager.playEditSound) {
      soundManager.playEditSound();
    }

    fetchUsers();
  }
}

fetchUsers();
