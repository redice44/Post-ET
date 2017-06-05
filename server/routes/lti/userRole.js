function userRole (params) {
  let role = params.roles.split(':');
  role = role[role.length - 1].split('/');
  role = role[role.length - 1]
  return role;
}

module.exports = userRole;
