import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomGoogleMapsComponent } from './custom-google-maps.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [CustomGoogleMapsComponent],
  imports: [CommonModule, HttpClientModule, GoogleMapsModule],
  exports: [CustomGoogleMapsComponent],
})
export class CustomGoogleMapsModule {}
