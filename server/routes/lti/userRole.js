function userRole (params) {
  console.log(params.roles);
  let role = params.roles.split(':');
  role = role[role.length - 1].split('/');
  role = role[role.length - 1]
  console.log(role);
  return role;
}

module.exports = userRole;
