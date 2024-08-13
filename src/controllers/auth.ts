const handleSignIn = async ({ body }: any) => {
  console.log(body);
  return;
};

const handleSignUp = async () => {
  return;
};

// Export the functions as part of an object named authApi
const authApi = { handleSignIn, handleSignUp };

export default authApi;
