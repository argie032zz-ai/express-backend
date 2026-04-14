let users = [];

exports.getUsers = (req, res) => {
  res.json(users);
};

exports.createUser = (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json({ message: "User created", user: newUser });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  let user = users.find((u) => u.id == id);
  if (user) {
    Object.assign(user, req.body);
    res.json({ message: "User updated", user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

exports.deleteUser = (req, res) => {
  users = users.filter((u) => u.id != req.params.id);
  res.json({ message: "User deleted" });
};
