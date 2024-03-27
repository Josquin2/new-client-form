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
        }, 2000);
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
        class="input"
        v-model="surname"
        type="text"
        placeholder="Петров"
        @blur="v$.surname.$touch"
        :class="{ wrong: v$.surname.$error }"
      />
      <div class="v-if-error" v-if="v$.surname.$error">
        Это поле обязательно к заполнению!
      </div>

      <p>Имя</p>
      <input
        class="input"
        v-model="name"
        type="text"
        placeholder="Петр"
        @blur="v$.name.$touch"
        :class="{ wrong: v$.name.$error }"
      />
      <div class="v-if-error" v-if="v$.name.$error">
        Это поле обязательно к заполнению!
      </div>

      <p>Отчество</p>
      <input class="input" type="text" placeholder="Петрович" />

      <p>Дата рождения</p>
      <input
        class="input"
        v-model="dayOfBirth"
        type="date"
        @blur="v$.dayOfBirth.$touch"
        :class="{ wrong: v$.dayOfBirth.$error }"
      />
      <div class="v-if-error" v-if="v$.dayOfBirth.$error">
        Это поле обязательно к заполнению!
      </div>

      <p>Номер телефона</p>
      <input
        class="input"
        v-model="phoneNumber"
        type="number"
        placeholder="79001234567"
        @blur="v$.phoneNumber.$touch"
        :class="{ wrong: v$.phoneNumber.$error }"
      />
      <div class="v-if-error" v-if="v$.phoneNumber.$error">
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
      <div class="v-if-error" v-if="v$.group.$error">
        Это поле обязательно к заполнению!
      </div>

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
      <input class="input" type="number" placeholder="167000" />

      <p>Страна</p>
      <input class="input" type="text" placeholder="Россия" />

      <p>Область</p>
      <input class="input" type="text" placeholder="Республика Коми" />

      <p>Город</p>
      <input
        class="input"
        type="text"
        placeholder="Сыктывкар"
        v-model="city"
        :class="{ wrong: v$.city.$error }"
        @blur="v$.city.$touch"
      />
      <div class="v-if-error" v-if="v$.city.$error">
        Это поле обязательно к заполнению!
      </div>

      <p>Улица</p>
      <input class="input" type="text" placeholder="Пушкина" />

      <p>Дом</p>
      <input class="input" type="text" placeholder="1" />
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
      <div class="v-if-error" v-if="v$.typeOfDocument.$error">
        Это поле обязательно к заполнению!
      </div>

      <p>Серия</p>
      <input class="input" type="text" placeholder="1234" />

      <p>Номер</p>
      <input class="input" type="text" placeholder="123456" />

      <p>Кем выдан</p>
      <input class="input" type="text" />

      <p>Дата выдачи</p>
      <input
        class="input"
        type="date"
        v-model="dateOfDocument"
        :class="{ wrong: v$.dateOfDocument.$error }"
        @blur="v$.dateOfDocument.$touch"
      />
      <div class="v-if-error" v-if="v$.dateOfDocument.$error">
        Это поле обязательно к заполнению!
      </div>
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
  background-color: #d7b5a1;
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
.input {
  border-radius: 12px;
  border: 0;
  height: 7vh;
  width: 56vw;
  padding-left: 0.9vw;
  padding-right: 0.3vw;
  font-size: 16px;
}
select {
  border-radius: 12px;
  border: 0;
  height: 7vh;
  width: 56vw;
  padding-left: 0.9vw;
  padding-right: 0.3vw;
  font-size: 16px;
}
.wrong {
  border: 1px solid red;
}
.send-button {
  border-radius: 10px;
  border: 0;
  width: 10vw;
  height: 6vh;
  margin-top: 5vh;
  cursor: pointer;
  transition: 0.2s;
  font-size: 16px;
}
.send-button:hover {
  background-color: #22b2ea;
  color: white;
}
.error-message {
  margin-top: 2vh;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
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
.v-if-error {
  margin-left: 1vw;
  margin-top: 0.5vh;
  font-family: Arial, Helvetica, sans-serif;
}
@media only screen and (max-width: 600px) {
  .container {
    width: 90vw;
  }
  .send-button {
    width: 50vw;
  }
  .input {
    width: 86vw;
  }
  select {
    width: 86vw;
  }
}
</style>
