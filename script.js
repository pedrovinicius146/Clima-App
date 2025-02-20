async function getWeatherData(city) {
    const apiKey = "1f4f1e688f364ea958f8907a20e19f45"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.cod === 200) {
        // Atualiza os dados do clima na tela
        document.getElementById("city").innerText = data.name;
        document.getElementById("temperature").innerHTML = `<span>${Math.round(data.main.temp)}</span>&deg;C`;
        document.getElementById("description").innerText = data.weather[0].description;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById("umidity").innerHTML = `<span>${data.main.humidity}%</span>`;
        document.getElementById("wind").innerHTML = `<span>${data.wind.speed} m/s</span>`;
        
        // Define a bandeira do país usando o código retornado (convertido para minúsculas)
        const countryCode = data.sys.country;
        const countryImg = document.getElementById("country");
        countryImg.src = `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
        countryImg.alt = `Bandeira de ${countryCode}`;
        
        // Exibe os dados e esconde a mensagem de erro
        document.getElementById("weather-data").classList.remove("hide");
        document.getElementById("error-message").classList.add("hide");
      } else {
        // Se não encontrar a cidade, exibe mensagem de erro
        document.getElementById("error-message").classList.remove("hide");
        document.getElementById("weather-data").classList.add("hide");
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      document.getElementById("error-message").classList.remove("hide");
      document.getElementById("weather-data").classList.add("hide");
    }
  }
  
  // Evento de clique no botão de pesquisa
  document.getElementById("search").addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    if (city !== "") {
      getWeatherData(city);
    }
  });
  
  // Eventos para os botões de sugestões
  const suggestionButtons = document.querySelectorAll(".suggestion-btn");
  suggestionButtons.forEach(button => {
    button.addEventListener("click", () => {
      const city = button.innerText;
      document.getElementById("city-input").value = city;
      getWeatherData(city);
    });
  });
  
  // Permitir pesquisa ao pressionar a tecla Enter
  document.getElementById("city-input").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      const city = document.getElementById("city-input").value.trim();
      if (city !== "") {
        getWeatherData(city);
      }
    }
  });
  