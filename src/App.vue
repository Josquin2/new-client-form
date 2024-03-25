<script>
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  maxValue,
  minValue,
} from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      name: "",
      surname: "",
      dayOfBirth: "",
      phoneNumber: "",
      group: "",
      city: "",
      typeOfDocument: "",
      dateOfDocument: "",
      success: "",
    };
  },

  methods: {
    async send() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        this.success = "Проверьте ошибки!";
        return;
      } else {
        this.success = "Новый клиент успешно создан!";
        setTimeout(() => {
          this.success = "";
        }, 1000);
      }
    },

    onGroupChange(e) {
      this.group = e.target.value;
    },

    onDocumentChange(e) {
      this.typeOfDocument = e.target.value;
    },
  },

  validations() {
    return {
      name: { required, $dirty: true },
      surname: { required },
      dayOfBirth: { required },
      phoneNumber: {
        required,
        minLength: minLength(11),
        maxLength: maxLength(11),
        maxValue: maxValue(79999999999),
        minValue: minValue(70000000000),
      },
      group: { required },
      city: { required },
      typeOfDocument: { required },
      dateOfDocument: { required },
    };
  },
};
</script>

<template>
  <div class="container">
    <h2 class="head">Форма заполнения</h2>
    <h4>Общие данные</h4>

    <div class="form">
      <p>Фамилия</p>
      <input
        v-model="surname"
        type="text"
        placeholder="Петров"
        @blur="v$.surname.$touch"
        :class="{ wrong: v$.surname.$error }"
      />

      <p>Имя</p>
      <input
        v-model="name"
        type="text"
        placeholder="Петр"
        @blur="v$.name.$touch"
        :class="{ wrong: v$.name.$error }"
      />

      <p>Отчество</p>
      <input type="text" placeholder="Петрович" />

      <p>Дата рождения</p>
      <input
        v-model="dayOfBirth"
        type="date"
        @blur="v$.dayOfBirth.$touch"
        :class="{ wrong: v$.dayOfBirth.$error }"
      />

      <p>Номер телефона</p>
      <input
        v-model="phoneNumber"
        type="number"
        placeholder="79001234567"
        @blur="v$.phoneNumber.$touch"
        :class="{ wrong: v$.phoneNumber.$error }"
      />
      <div class="wrong-text" v-if="v$.phoneNumber.$error">
        Проверьте номер телефона! Номер должен начинаться с цифры 7 и иметь
        длинну 11 цифр
      </div>

      <p>Пол</p>
      <select>
        <option value="">Мужской</option>
        <option value="">Женский</option>
      </select>

      <p>Группа клиентов</p>
      <select
        v-model="group"
        :class="{ wrong: v$.group.$error }"
        @blur="v$.group.$touch"
        @change="onGroupChange"
      >
        <option value=""></option>
        <option value="vip">VIP</option>
        <option value="problems">Проблемные</option>
        <option value="oms">ОМС</option>
      </select>

      <p>Врач</p>
      <select>
        <option>Иванов</option>
        <option>Захаров</option>
        <option>Чернышева</option>
      </select>
      <div class="checkbox"><input type="checkbox" /> Не отправлять смс</div>
    </div>

    <h4>Адрес</h4>

    <div class="form">
      <p>Индекс</p>
      <input type="number" placeholder="167000" />

      <p>Страна</p>
      <input type="text" placeholder="Россия" />

      <p>Область</p>
      <input type="text" placeholder="Республика Коми" />

      <p>Город</p>
      <input
        type="text"
        placeholder="Сыктывкар"
        v-model="city"
        :class="{ wrong: v$.city.$error }"
        @blur="v$.city.$touch"
      />

      <p>Улица</p>
      <input type="text" placeholder="Пушкина" />

      <p>Дом</p>
      <input type="text" placeholder="1" />
    </div>

    <h4>Документ</h4>
    <div class="form">
      <p>Тип документа</p>
      <select
        v-model="typeOfDocument"
        @change="onDocumentChange"
        :class="{ wrong: v$.typeOfDocument.$error }"
        @blur="v$.typeOfDocument.$touch"
      >
        <option value=""></option>
        <option value="passport">Паспорт</option>
        <option value="birthdayPaper">Св. о рождении</option>
        <option value="driverLicense">Вод. удостоверение</option>
      </select>

      <p>Серия</p>
      <input type="text" placeholder="1234" />

      <p>Номер</p>
      <input type="text" placeholder="123456" />

      <p>Кем выдан</p>
      <input type="text" />

      <p>Дата выдачи</p>
      <input
        type="date"
        v-model="dateOfDocument"
        :class="{ wrong: v$.dateOfDocument.$error }"
        @blur="v$.dateOfDocument.$touch"
      />
    </div>

    <div class="error-message">{{ success }}</div>

    <div style="display: flex; justify-content: center">
      <button class="send-button" @click="send()">Отправить</button>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  width: 60vw;
  height: max-content;
  margin: auto;
  background-color: bisque;
  padding: 2vw;
  border-radius: 10px;
}
.head {
  font-size: 30px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
}
.form {
  display: flex;
  flex-direction: column;
}
.form p {
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 2vh;
  margin-bottom: 0.3vh;
  margin-left: 0.5vw;
}
h4 {
  font-size: 20px;
  text-align: center;
  margin-top: 4vh;
  font-family: Arial, Helvetica, sans-serif;
}
input {
  border-radius: 16px;
  border: 0;
  height: 7vh;
  padding-left: 0.3vw;
  padding-right: 0.3vw;
  font-size: 16px;
}
select {
  border-radius: 16px;
  border: 0;
  height: 7vh;
  padding-left: 0.3vw;
  padding-right: 0.3vw;
  font-size: 16px;
}
.wrong {
  border: 1px solid red;
}
.wrong-text {
  font-family: Arial, Helvetica, sans-serif;
}
.send-button {
  border-radius: 10px;
  border: 0;
  width: 10vw;
  height: 6vh;
  margin-top: 5vh;
  cursor: pointer;
  transition: 0.2s;
}
.send-button:hover {
  background-color: rgb(247, 193, 117);
}
.error-message {
  margin-top: 2vh;
  text-align: center;
}
.checkbox {
  display: flex;
  align-items: center;
  margin-top: 1vh;
  margin-left: 0.5vw;
  font-family: Arial, Helvetica, sans-serif;
}
.checkbox input {
  margin-right: 0.5vw;
}
@media only screen and (max-width: 600px) {
  .container {
    width: 90vw;
  }
  .send-button {
    width: 30vw;
  }
}
</style>
