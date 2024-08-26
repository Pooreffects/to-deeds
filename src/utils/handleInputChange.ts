/**
 * Handles input changes and updates the corresponding state based on the input name.
 * @param e - The change event triggered by the input or textarea.
 * @param setters - An object mapping input names to their respective state setter functions.
 */

export function handleInputChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setters: { [key: string]: React.Dispatch<React.SetStateAction<string>> }
) {
  const { name, value } = e.target;

  if (setters[name]) {
    setters[name](value);
  }
}
