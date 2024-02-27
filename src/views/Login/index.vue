<script setup name="Login" lang="ts">
import { reactive, ref } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { useUserStore } from "@/store/modules/user";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";

const formData = reactive({
  username: "admin",
  password: "111111",
});
const userStore = useUserStore();
const $router = useRouter();

const loading = ref(false);
const handleLoginClick = async () => {
  try {
    loading.value = true;
    const res = await userStore.loginRequest(formData);
    if (res) {
      $router.push("/");
      ElNotification({
        title: "登陆成功！",
        type: "success",
      });
    }
  } catch (error) {
    ElNotification({
      title: error as string,
      type: "error",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="login-wrapper">
    <div class="form-wrapper">
      <h1>HELLO</h1>
      <h2>欢迎来到登陆页面</h2>
      <el-form :model="formData" class="form">
        <el-form-item>
          <el-input v-model="formData.username" :prefix-icon="User" />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="formData.password"
            :prefix-icon="Lock"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="default"
            @click="handleLoginClick"
            style="width: 100%"
            :loading="loading"
          >
            登陆
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-wrapper {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: flex-end;
  .form-wrapper {
    h1,
    h2 {
      color: white;
      font-weight: bold;
      margin: 30px 0;
    }
    h1 {
      font-size: 40px;
    }
    h2 {
      font-size: 20px;
    }
    position: relative;
    top: 200px;
    min-width: 500px;
    height: 350px;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    padding: 10px;
    margin-right: 50px;
    .form {
      margin: 10px;
    }
  }
}
</style>
