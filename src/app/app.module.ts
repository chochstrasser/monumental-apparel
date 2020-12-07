import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { CoverComponent } from './cover/cover.component';
import { InfoSectionComponent } from './info-section/info-section.component';
import { CoverFooterComponent } from './cover-footer/cover-footer.component';
import { CoverTitleComponent } from './cover-title/cover-title.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CustomerLinksComponent } from './customer-links/customer-links.component';
import { QuoteComponent } from './quote/quote.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AccountComponent } from './account/account.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthService } from './services/auth.service';
import { AccountOrdersComponent } from './account-orders/account-orders.component';
import { AccountBagComponent } from './account-bag/account-bag.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAFJnTG5xYYJlQbsyCrDisXOtfIRc3agJ4',
  authDomain: 'monumental-apperal.firebaseapp.com',
  projectId: 'monumental-apperal',
  storageBucket: 'monumental-apperal.appspot.com',
  messagingSenderId: '107837033039',
  appId: '1:107837033039:web:b2ee79d90e84a34fa1783a',
  measurementId: 'G-80MGP85KHM',
};

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    CoverComponent,
    InfoSectionComponent,
    CoverFooterComponent,
    CoverTitleComponent,
    ProductCardComponent,
    CustomerLinksComponent,
    QuoteComponent,
    AboutComponent,
    ContactUsComponent,
    AccountComponent,
    AccountOrdersComponent,
    AccountBagComponent,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
