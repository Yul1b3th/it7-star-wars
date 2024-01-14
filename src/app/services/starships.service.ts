// starships.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { map } from 'rxjs';

import { StarshipResult, StarshipsResponse } from '@app/interfaces/starship.interfaces';
import { Starship } from '../interfaces/starship.interfaces';

export interface State {
  starships: StarshipResult[];
  loading: boolean;
  nextPage: string | null;
  currentPage: number;
  previousPage: string | null;
  count: number;
  selectedStarship: Starship | null;
}

interface StateStarships {
  starshipsList: Starship[];
  transformResults: (results: StarshipResult[]) => Starship[];
}

interface StateDetails {
  selectedStarship: Starship | null;
}

@Injectable({
  providedIn: 'root'
})

export class StarshipsService {
  private http = inject(HttpClient);

  #state = signal<State>({
    count: 1,
    nextPage: null,
    previousPage: null,
    starships: [],
    loading: true,
    currentPage: 1,
    selectedStarship: null,
  });

  #stateDetails = signal<StateDetails>({
    selectedStarship: null,
  });

  #stateStarships = signal<StateStarships>({
    starshipsList: [],
    transformResults: (results: StarshipResult[]) => this.transformStarshipstoStarship({ results }),
  });


  // Señales computadas
  public count = computed(() => this.#state().count);
  public nextPage = computed(() => this.#state().nextPage);
  public previousPage = computed(() => this.#state().previousPage);
  public starships = computed(() => this.#state().starships);
  public loading = computed(() => this.#state().loading);
  public currentPage = computed(() => this.#state().currentPage);
  public selectedStarship = computed(() => this.#state().selectedStarship);

  public starshipsList = computed(() => this.#stateStarships().transformResults(this.#state().starships));

  public selectedStarshipDetails = computed(() => this.#stateDetails().selectedStarship);


  constructor() {
    this.http.get<StarshipsResponse>('https://swapi.dev/api/starships')
      .subscribe(resp => {
        this.#state.set({
          count: resp.count,
          nextPage: resp.next,
          previousPage: resp.previous,
          starships: resp.results,
          loading: false,
          currentPage: this.#state().currentPage + 1,
          selectedStarship: this.#state().selectedStarship,
        });
        // console.log(resp);
        // console.log(this.#state().starships);
      })

    this.http.get<StarshipsResponse>('https://swapi.dev/api/starships')
      .pipe(map(this.transformStarshipstoStarship))
      .subscribe(result => {
        this.#stateStarships.set({
          starshipsList: result,
          transformResults: (results: StarshipResult[]) => this.transformStarshipstoStarship({ results }),
        });
        // console.log(result);
      });
  }

  public getState(): State {
    return this.#state();
  }

  loadStarshipsPage(url: string) {
    this.http.get<StarshipsResponse>(url)
      .subscribe(resp => {
        const updatedStarshipsList = this.#stateStarships().transformResults(resp.results);
        this.#state.set({
          ...this.#state(),
          count: resp.count,
          nextPage: resp.next,
          previousPage: resp.previous,
          starships: resp.results,
          loading: false,
          currentPage: this.#state().currentPage + 1,
          selectedStarship: this.#state().selectedStarship,
        });

        this.#stateStarships.set({
          ...this.#stateStarships(),
          starshipsList: updatedStarshipsList,
        });
      });
  }

  transformStarshipstoStarship(resp: { results: StarshipResult[] }): Starship[] {
    const starshipsList: Starship[] = resp.results.map(starship => {
      const urlArr = starship.url.split('/');
      const id = urlArr[5];
      const pic = `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;

      return {
        id,
        name: starship.name,
        model: starship.model,
        manufacturer: starship.manufacturer,
        cost_in_credits: starship.cost_in_credits,
        length: starship.length,
        max_atmosphering_speed: starship.max_atmosphering_speed,
        crew: starship.crew,
        passengers: starship.passengers,
        cargo_capacity: starship.cargo_capacity,
        consumables: starship.consumables,
        hyperdrive_rating: starship.hyperdrive_rating,
        MGLT: starship.MGLT,
        starship_class: starship.starship_class,
        pilots: starship.pilots,
        films: starship.films,
        created: starship.created,
        edited: starship.edited,
        url: starship.url,
        pic,
      };
    });

    return starshipsList;
  }

  loadNextPage() {
    const nextPage = this.#state().nextPage;
    if (nextPage) {
      this.loadStarshipsPage(nextPage);
    }
  }

  loadPreviousPage() {
    const previousPage = this.#state().previousPage;
    if (previousPage) {
      this.loadStarshipsPage(previousPage);
    }
  }

  loadStarshipDetails(id: string) {
    // console.log(this.#stateStarships().starshipsList);
    const starship = this.#stateStarships().starshipsList.find(s => s.id === id);
    // console.log(starship);
    if (starship) {
      this.#stateDetails.set({
        selectedStarship: starship,
      });
    }
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.#state().count / 10); // 10 items per page
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }


  private currentPageNumber: number = 1;

  getCurrentPageNumber(): number {
    return this.currentPageNumber;
  }

  setCurrentPageNumber(pageNumber: number): void {
    this.currentPageNumber = pageNumber;
  }

  loadInitialPage() {
    this.loadStarshipsPage('https://swapi.dev/api/starships/?page=1&format=json');
    this.currentPageNumber = 1;
    this.setCurrentPageNumber(1); // Guarda el número de página actual
  }

}

