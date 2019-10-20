import {Component} from '@angular/core';
import {RowActionBarComponent} from '../../../shared';
import {DocRatingsService} from '../../../core/service/electric-vehicle/doc-ratings.service';
import {RatingsUserService} from '../../../core/service/user/ratings-user.service';

@Component({
  selector: 'app-escooter-row-action-bar',
  template: `
      <mat-toolbar *ngIf="!!uid">
          <h2-star-rating [value]="ratingUser || 0" (valueChange)="setRating($event)"></h2-star-rating>
          <ng-container *ngIf="!!claims">
              <app-row-action-button [enabled]="claims.allowUpdate || contribuableIsUser()" [icon]="faPencilAlt" (action)="click($event, 'edit')"></app-row-action-button>
              <app-row-action-button [enabled]="claims.allowDelete || contribuableIsUser()" [icon]="faTimes" (action)="click($event, 'delete')"></app-row-action-button>
          </ng-container>
      </mat-toolbar>
    `,
  styleUrls: ['../../../shared/row-action-bar/row-action-bar.component.scss']
})
export class EscooterRowActionBarComponent extends RowActionBarComponent<ElectricScooter> {

  constructor(
    docRatingsService: DocRatingsService,
    ratingsUserService: RatingsUserService
  ) {
    super(docRatingsService, ratingsUserService);
  }

  getPath() {
    return 'electricScooters';
  }

}
