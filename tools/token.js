module.exports = (length) => {
    const chars =
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890~!@#$%^&*()_+{}|:<>?;'`-=[],./"
    const randomArray = Array.from(
      { length: length },
      (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );
  
    const randomString = randomArray.join("");
    return randomString;
};