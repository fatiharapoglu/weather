(()=>{"use strict";var t={d:(e,n)=>{for(var i in n)t.o(n,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:n[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};t.d({},{Z:()=>n});class e{static getWeatherLink=t=>{const e="8b09689c50ce1e845011934fc53575bd",n=`https://api.openweathermap.org/data/2.5/weather?q=${t}&appid=${e}`,i=`https://api.openweathermap.org/data/2.5/forecast?q=${t}&appid=${e}`;this.fetchLink(n),this.fetchForecastLink(i)};static fetchLink=async t=>{const e=await fetch(t,{mode:"cors"}),n=await e.json();this.usableCurrentData(n)};static fetchForecastLink=async t=>{const e=await fetch(t,{mode:"cors"}),n=await e.json();this.usableForecastData(n)};static usableCurrentData=t=>{const e=this.convertKelvin(t.main.temp),i=`${t.name}, ${t.sys.country}`,s=this.convertKelvin(t.main.feels_like),a=`${t.main.humidity.toString()} %`,o=this.firstLetterUpperCase(t.weather[0].description),c=t.weather[0].main,r=`${this.convertSpeed(t.wind.speed).toFixed(1)} km/h`,l=t.weather[0].icon;n.renderCurrentIcon(this.generateIcon(l)),n.renderCurrent(e,i,s,a,o,c,r)};static usableForecastData=t=>{const e=100*t.list[0].pop+" %";n.renderRainPercent(e);const i=this.convertKelvin(t.list[8].main.temp),s=this.convertKelvin(t.list[8].main.feels_like),a=this.generateIcon(t.list[8].weather[0].icon),o=this.convertKelvin(t.list[16].main.temp),c=this.convertKelvin(t.list[16].main.feels_like),r=this.generateIcon(t.list[16].weather[0].icon),l=this.convertKelvin(t.list[24].main.temp),d=this.convertKelvin(t.list[24].main.feels_like),m=this.generateIcon(t.list[24].weather[0].icon),h=this.convertKelvin(t.list[32].main.temp),g=this.convertKelvin(t.list[32].main.feels_like),p=this.generateIcon(t.list[32].weather[0].icon),u=this.convertKelvin(t.list[39].main.temp),v=this.convertKelvin(t.list[39].main.feels_like),y=this.generateIcon(t.list[39].weather[0].icon);n.renderForecast(i,s,o,c,l,d,h,g,u,v,a,r,m,p,y)};static convertKelvin=t=>{const e=`${(t-273.15).toFixed(0)} °C`,i=`${(1.8*(t-273.15)+32).toFixed(0)} °F`;return"F"===n.activeUnit?i:e};static convertSpeed=t=>3.6*t;static generateIcon=t=>`http://openweathermap.org/img/wn/${t}@2x.png`;static firstLetterUpperCase=t=>t.split(" ").map((t=>t[0].toUpperCase()+t.slice(1))).join(" ")}class n{static activeUnit="C";static lastLocation="London";static initButtons=()=>{const t=document.getElementById("search-btn"),e=document.getElementById("change-unit-btn");t.addEventListener("click",(t=>{t.preventDefault(),this.getLocation()})),e.addEventListener("click",this.toggleUnits)};static getLocation=()=>{const t=document.getElementById("search-input").value;""!==t&&(this.lastLocation=t,e.getWeatherLink(t))};static toggleUnits=()=>{const t=document.getElementById("change-unit-btn");"Units to °F"===t.textContent?(t.textContent="Units to °C",this.activeUnit="F",e.getWeatherLink(this.lastLocation)):(t.textContent="Units to °F",this.activeUnit="C",e.getWeatherLink(this.lastLocation))};static renderCurrent=(t,e,n,i,s,a,o)=>{const c=document.getElementById("date"),r=document.getElementById("description"),l=document.getElementById("temp"),d=document.getElementById("feels-like"),m=document.getElementById("humidity"),h=document.getElementById("wind"),g=document.getElementById("place");c.textContent=(new Date).toDateString(),r.textContent=s,l.textContent=t,g.textContent=e,d.textContent=n,m.textContent=i,h.textContent=o};static renderForecast=(t,e,n,i,s,a,o,c,r,l,d,m,h,g,p)=>{const u=document.getElementById("first-day"),v=document.getElementById("second-day"),y=document.getElementById("third-day"),C=document.getElementById("fourth-day"),I=document.getElementById("fifth-day"),L=u.nextSibling,f=v.nextSibling,x=y.nextSibling,k=C.nextSibling,w=I.nextSibling;u.textContent=`Temp : ${t} Feels Like: ${e}`,v.textContent=`Temp : ${n} Feels Like: ${i}`,y.textContent=`Temp : ${s} Feels Like: ${a}`,C.textContent=`Temp : ${o} Feels Like: ${c}`,I.textContent=`Temp : ${r} Feels Like: ${l}`,L.src=d,f.src=m,x.src=h,k.src=g,w.src=p};static renderRainPercent=t=>{document.getElementById("chance-of-rain").textContent=t};static renderCurrentIcon=t=>{document.getElementById("icon").src=t}}n.initButtons(),e.getWeatherLink("London")})();