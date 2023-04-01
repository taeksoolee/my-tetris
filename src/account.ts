const accountValues = {
  lines: 0,
  score: 0,
  level: 1,
}

export const account = new Proxy(accountValues, {
  set: (target, key: keyof typeof accountValues, value) => {

    // if (["lines", "score"].includes(key)) {
      target[key] = value;
  
      const element = document.getElementById(key);
      if (element) {
        element.textContent = value;
      }
    // }
    return true;
  }
});