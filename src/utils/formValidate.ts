import type { FormValidateFn } from "@/types";

const formValidate: FormValidateFn = function (validate) {
  const rules = [];
  if ("required" in validate) {
    rules.push({
      required: validate.required,
      message: "必填项不能为空",
      trigger: "blur",
    });
  }
  if (validate.type == "username") {
    rules.push({
      validator: usernameValidator,
      trigger: "blur",
    });
  }
  if (validate.type == "password") {
    rules.push({
      validator: passwordValidator,
      trigger: "blur",
    });
  }
  if (validate.validator) {
    rules.push({
      validator: validate.validator,
      trigger: "blur",
    });
  }

  return rules;
};

const usernameValidator = (
  _rule: [],
  value: string,
  callback: (error?: string | Error) => void,
) => {
  if (value.length < 5) {
    callback(new Error("用户名需大于5个字符"));
  } else {
    callback();
  }
};
const passwordValidator = (
  _rule: [],
  value: string,
  callback: (error?: string | Error) => void,
) => {
  if (value.length < 6) {
    callback(new Error("密码需大于6个字符"));
  } else {
    callback();
  }
};

export default formValidate;
