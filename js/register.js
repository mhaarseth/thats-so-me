const registerButton = document.getElementById("registerButton");

registerButton.addEventListener("click", () => {
  const NOROFF_API = "https://api.noroff.dev/";
  const userName = document.getElementById("userName").value;
  const userEmail = document.getElementById("email").value;
  const userPassword = document.getElementById("password").value;

  /**
   * Register new user
   * Sends a POST request to the specified URL to register a new user.
   * @param {string} registerUrl - The URL to which the POST request is sent.
   * @param {Object} newUser - An object containing user details, including name, email, and password, which in turn is fetched from the registration form.
   */

  async function registerNewUser(registerUrl, newUser) {
    try {
      const postOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      };

      const response = await fetch(registerUrl, postOptions);
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }

  const newUser = {
    name: `${userName}`,
    email: `${userEmail}`,
    password: `${userPassword}`,
  };

  const registerUrl = `${NOROFF_API}api/v1/social/auth/register`;

  registerNewUser(registerUrl, newUser);
});
