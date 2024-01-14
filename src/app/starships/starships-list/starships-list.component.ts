// starships-list.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StarshipsService } from '@app/services/starships.service';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({
  selector: 'app-starships-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './starships-list.component.html',
  styleUrl: './starships-list.component.scss'
})

export default class StarshipsListComponent implements OnInit {
  public starshipsService = inject(StarshipsService);
  public currentPageNumber: number = 1;
  user: User | null;

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }

  ngOnInit() {
    // Cambia loadPage a loadInitialPage para cargar las 10 primeras naves
    this.starshipsService.loadInitialPage();
    this.currentPageNumber = this.starshipsService.getCurrentPageNumber();
  }

  loadPreviousPage() {
    this.starshipsService.loadPreviousPage();
    this.currentPageNumber--; // Actualiza la página actual al cargar la página anterior
  }

  loadNextPage() {
    const nextPage = this.starshipsService.nextPage();
    if (nextPage) {
      this.starshipsService.loadStarshipsPage(nextPage);
      this.currentPageNumber++; // Actualiza la página actual al cargar la página siguiente
    }
  }

  loadStarshipDetails(id: string) {
    this.starshipsService.loadStarshipDetails(id);
  }

  // Agrega el método loadPage al componente
  loadPage(page: number) {
    this.starshipsService.loadStarshipsPage(`https://swapi.dev/api/starships/?page=${page}&format=json`);
    this.currentPageNumber = page; // Actualiza la página actual al cargar la página seleccionada
    // console.log(page);

  }

  // Agrega el método getPages al componente
  getPages(): number[] {
    // console.log(this.starshipsService.getPages());

    return this.starshipsService.getPages();
  }


  handleImageError(event: any) {
    event.target.src = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
    // event.target.alt = 'No picture available';
  }

}
