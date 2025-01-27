export function generateRandomWord() {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let word = '';
    for (let i = 0; i < 5; i++) {
      word += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return word;
  }