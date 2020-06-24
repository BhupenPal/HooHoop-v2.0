module.exports = {

  PassCheck: (passcode, cpasscode, ErrMsg) => {
    //Check passwords match
    if (passcode !== cpasscode) {
      ErrMsg.news.push("Passwords do not match");
      return;
    }

    //Check password length
    if (passcode.length < 6) {
      ErrMsg.news.push("Password should be atleast 6 characters");
    }

    if (passcode.length > 14) {
      ErrMsg.news.push("Password length should not exceed 14 characters");
    }

    //Check password strength
    if (!passcode.match(/[a-z]/)) {
      ErrMsg.news.push("Password must contain a Lowercase Letter");
    }

    if (!passcode.match(/[A-Z]/)) {
      ErrMsg.news.push("Password must contain a Uppercase Letter");
    }

    if (!passcode.match(/[0-9]/)) {
      ErrMsg.news.push("Password must contain a Numeric Digit");
    }

    if (!passcode.match(/[\W]/)) {
      ErrMsg.news.push("Password must contain a Special Character");
    }

    return
  }
  
};
