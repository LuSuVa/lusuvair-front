import { Component, OnInit } from '@angular/core';
import { QualitairService, AirQualityResponse } from '../qualitair.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-qualitair',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './qualitair.component.html',
  styleUrl: './qualitair.component.css',
})
export class QualitairComponent implements OnInit {
  airQuality: AirQualityResponse | null = null;
  research: string = '';

  constructor(private qualitairService: QualitairService) {}

  ngOnInit(): void {}

  loadAirQualities(): void {
    if (this.research) {
      this.qualitairService
        .getByMunicipalityName(this.research)
        .subscribe((data: AirQualityResponse) => {
          this.airQuality = data;
        });
    }
  }
}
