const sensors = {
  template: `
    <div class="p-3 border bg-light">
      <h1 class="display-5 text-center">Sensor Data</h1>
      <p><strong>Service</strong></p>
      <select class="btn btn-secondary dropdown-toggle" v-model="selectedService">
        <option v-for="service in serviceTypes">{{ service }}</option>
      </select>
      <hr />
      <p><strong>Token</strong></p>
      <input v-model="token" type="text" class="form-control">
      <hr />
      <p><strong>GhostID</strong></p>
      <input v-model="id" type="number" class="form-control" min="1">
      <hr />
      <p><strong>Temperature</strong><span style="float: right">value: {{ temperature }}</span></p>
      <input v-model="temperature" type="range" class="form-range" min="-100" max="200">
      <hr />
      <p><strong>Humidity</strong><span style="float: right">value: {{ humidity }}</span></p>
      <input v-model="humidity" type="range" class="form-range" min="0" max="100">
      <hr />
      <button @click="sendData()" :disabled="isOpen" class="btn btn-primary">{{ btnTitle }}</button>
    </div>
  `,

  setup() {
    const serviceTypes = ["sensora", "sensorb"];
    const selectedService = ref(serviceTypes[0]);
    const token = ref(null);
    const id = ref(1);
    const temperature = ref(21);
    const humidity = ref(40);
    const isOpen = ref(false);
    const btnTitle = computed(() => isOpen.value ? "Sending data...." : "Open Channel");

    const sendData = () => {
      isOpen.value = true;
      try {
        setInterval(() => {
          const timestamp = Date.now();
          fetch(`https://demo.cioty.com/${selectedService.value}`, {
            method: "POST",
            body: `token=${token.value}&objectID=${id.value}&id=${id.value}&timestamp=${timestamp}&temp=${temperature.value}&hum=${humidity.value}`,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Synx-Cat": "1"
            }
          });
        }, 5000)
      } catch (error) {
        console.error("Error", error);
      }
    };

    return {
      serviceTypes,
      selectedService,
      token,
      id,
      temperature,
      humidity,
      isOpen,
      btnTitle,
      sendData
    };
  }
}

Vue.createApp(sensors).mount('#sensors');
