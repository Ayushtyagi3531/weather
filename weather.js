const button = document.querySelector('.btn');
const humid=document.querySelector('.humidity')
const wind=document.querySelector('.wind')
const city_name=document.querySelector('.city')
const temprature=document.querySelector('.temp')
const errorMessage = document.querySelector('#error-message');
const image=document.querySelector('#img')

button.addEventListener('click', async (e) => {
    e.preventDefault();
    

    let city = document.querySelector('#city').value.trim();
    const cityPattern = /^[a-zA-Z\s]+$/;
    

    
    errorMessage.textContent = '';  

    if (city === '') {
        errorMessage.textContent = 'City name cannot be empty.';  
    } else if (!cityPattern.test(city)) {
        errorMessage.textContent = 'City name can only contain letters and spaces.';  
        document.querySelector('#city').value = '';  
    } else {
        try {
            const api_key = 'f7afe7c1a29847bb22ddb82547d01c29'; 
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
            
            
            let response = await fetch(url);
            if (response.ok){
                document.querySelector('.weather').style.display = 'block';
                let data =await response.json()
                console.log(data)

                const temp=data.main.temp
                const humidity=data.main.humidity
                const wind_speed=data.wind.speed
                const img=data.weather[0].main
                
                if (img==='Clear'){
                    image.src='images/clear.png'
                }else if(img==='Clouds'){
                        image.src='images/clouds.png'
                }else if(img==='Rain'){
                    image.src='images/rain.png'
                }else if(img==='Drizzle'){
                    image.src='images/drizzle.png'
                }else if(img==='Snow'){
                    image.src='images/snow.png'
                }else{
                     image.src='images/mist.png'
                }
                
                temprature.innerHTML=`${temp}°C`
                humid.innerHTML=`${humidity}%`
                city_name.innerHTML=data.name
                wind.innerHTML=`${wind_speed} Km/h`
                


            }
            else{
                document.querySelector('.weather').style.display = 'none';
                errorMessage.textContent = 'City not found. Please enter a valid city.'; 
                console.error('Error fetching weather data: City not found'); 
            } 
        } catch (error) {
            console.error('Error fetching weather data:', error);  
        }

        document.querySelector('#city').value = '';  
    }
});
