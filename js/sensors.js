const sensors = {
  template: `
    <div class="p-3 border bg-light">
      <h1 class="display-5 text-center">Sensor Data</h1>
      <p><strong>Token</strong></p>
      <input v-model="token" type="text" class="form-control">
      <hr />
      <p><strong>GhostID</strong></p>
      <input v-model="id" type="number" class="form-control" min="1">
      <hr />
      <p><strong>Temperature</strong><span style="float: right">value: {{ temperature }}°C</span></p>
      <input v-model="temperature" type="range" class="form-range" min="-40" max="60">
      <hr />
      <p><strong>Humidity</strong><span style="float: right">value: {{ humidity }}%</span></p>
      <input v-model="humidity" type="range" class="form-range" min="0" max="100">
      <hr />
      <button @click="sendData(token, id, temperature, humidity)" class="btn btn-primary">Send Data</button>
    </div>
  `,

  setup() {
    const token = ref(null);
    const id = ref(1);
    const temperature = ref(21);
    const humidity = ref(40);

    const sendData = (token, id, temperature, humidity) => {
      try {
        fetch("https://demo.cioty.com/sensors", {
          method: "POST",
          body: `token=${token}&objectID=${id}&id=${id}&temp=${temperature}&hum=${humidity}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Synx-Cat": "1"
          }
        });
      } catch (error) {
        console.error("Error", error);
      }
    };

    return {
      token,
      id,
      temperature,
      humidity,
      sendData
    };
  }
}

Vue.createApp(sensors).mount('#sensors');
