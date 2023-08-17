function generatePassword(length: number): string {
  // Define character sets for different types of characters
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const specialCharacters = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  // Combine character sets to create a pool of characters
  const allCharacters =
    lowercaseLetters + uppercaseLetters + digits + specialCharacters;

  // Ensure that the password length is at least 8 characters
  length = Math.max(length, 8);

  // Generate the password by randomly selecting characters from the pool
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters.charAt(randomIndex);
  }

  return password;
}

export { generatePassword };
