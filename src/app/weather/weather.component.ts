import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-weather',
  standalone: true,
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  imports: [FormsModule, CommonModule, FontAwesomeModule],
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  research: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {}

  searchWeather() {
    if (this.research) {
      this.weatherService.getWeatherByMunicipalityName(this.research).subscribe(
        (data) => (this.weatherData = data),
        (error) => {
          console.error('Error fetching weather data', error);
        }
      );
    }
  }
}
