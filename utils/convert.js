function convertUsertoModel(user) {
  return {
    userName: user.name,
    userEmail: user.email,
    userTelephone: user.telephone,
    userPassword: user.password,
  };
}

export { convertUsertoModel };
