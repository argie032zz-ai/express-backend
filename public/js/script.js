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
  location.reload();
});

async function fetchUsers() {
  let response = await fetch("/api/users");
  let users = await response.json();
  userList.innerHTML = users
    .map(
      (u) => `
              <li>
                ${u.name}
                <button onclick="editUser('${u.id}', '${u.name}')">Edit</button>
                <button onclick="deleteUser('${u.id}')">Delete</button>
              </li>
            `,
    )
    .join("");
}

async function deleteUser(id) {
  if (confirm("Are you sure you want to delete this item?")) {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
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
    fetchUsers();
  }
}

fetchUsers();
