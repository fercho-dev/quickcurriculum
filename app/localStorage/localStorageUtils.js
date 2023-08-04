function storeAccessToken(response) {
  // Assuming you have the server response stored in the `response` variable
  const accessToken = response.user.stsTokenManager.accessToken;

  // Calculate the expiration time (30 minutes from now)
  const expirationTime = new Date().getTime() + 30 * 60 * 1000; // 30 minutes in milliseconds

  // Save the token and its expiration time in localStorage
  localStorage.setItem('tokenQuickCurriculum', accessToken);
  localStorage.setItem('expirationTimeQuickCurriculum', expirationTime.toString());
}

export { storeAccessToken }