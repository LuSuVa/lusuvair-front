import { Component, OnInit } from '@angular/core';
import {
  QualitairService,
  AirQualityResponse,
  Particle,
} from '../qualitair.service';
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

  getParticlePercentage(quantity: number): number {
    const maxQuantity = this.getMaxQuantity();
    return (quantity / maxQuantity) * 100;
  }

  getMaxQuantity(): number {
    if (!this.airQuality || !this.airQuality.particles.length) return 1;
    return Math.max(
      ...this.airQuality.particles.map((p: Particle) => p.quantity)
    );
  }

  getAqiColor(aqi: number): string {
    if (aqi <= 50) {
      return 'bg-green-500';
    } else if (aqi <= 100) {
      return 'bg-yellow-500';
    } else if (aqi <= 150) {
      return 'bg-orange-500';
    } else if (aqi <= 200) {
      return 'bg-red-500';
    } else if (aqi <= 300) {
      return 'bg-purple-500';
    } else {
      return 'bg-gray-800';
    }
  }
}
