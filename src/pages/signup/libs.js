export const getErrorMessage = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account already exists with the given email address.";

    case "Firebase: Error (auth/invalid-email).":
      return "The email address is not valid.";

    case "auth/operation-not-allowed":
      return "Accounts with email and password are not enabled on the server.";

    case "auth/weak-password":
      return "The password is not strong enough. Should contain atleast 6 letters";

    case "Firebase: Error (auth/admin-restricted-operation).":
      return "Restricted operation";

    case "Firebase: Error (auth/internal-error).":
      return "Not enough data";

    case "Firebase: Password should be at least 6 characters (auth/weak-password).":
      return "The password is not strong enough. Should contain atleast 6 letters"

    default:
      return code;
  }
};

export const signUpForm = [
  {
    value: 'email',
    attr: 'email',
  },
  {
    value: 'password, atleast 6 letters',
    attr: 'password',
  },
  {
    value: 'nickname to show',
    attr: 'displayName',
  },
  {
    value: 'link to photo',
    attr: 'photoURL',
  },
  {
    value: 'phone number',
    attr: 'phoneNumber',
  }
]