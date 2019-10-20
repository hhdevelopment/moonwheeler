import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faPencilAlt, faTimes} from '@fortawesome/free-solid-svg-icons';
import {RatingsUserService} from '../../core/service/user/ratings-user.service';
import {flatMap} from 'rxjs/operators';
import {DocRatingsService} from '../../core/service/electric-vehicle/doc-ratings.service';

@Component({
  selector: 'app-row-action-bar',
  template: ``,
  styleUrls: ['./row-action-bar.component.scss']
})
export abstract class RowActionBarComponent<T extends FirebaseDocument> {

  faTimes = faTimes;
  faPencilAlt = faPencilAlt;

  @Input()
  item?: T;

  @Input()
  claims: Partial<Claims>;
  @Input()
  uid: string;

  @Input()
  ratingUser: number;

  @Output()
  action: EventEmitter<{ item: T, action: string }> = new EventEmitter<{ item: T, action: string }>();

  protected constructor(
    private docRatingsService: DocRatingsService,
    private ratingsUserService: RatingsUserService
  ) {

  }

  abstract getPath(): string;

  click($event: MouseEvent, action: string) {
    $event.stopPropagation();
    this.action.emit({item: this.item, action});
  }

  contribuableIsUser(): boolean {
    return this.item && this.item.contributors && this.item.contributors[0].uid === this.uid;
  }

  setRating($event: number) {
    this.ratingsUserService.setRatingForDocument(this.item.id, $event).pipe(
      flatMap((old: number) => {
        return this.docRatingsService.addRatingToDoc(this.getPath(), this.item.id, $event,  old);
      })
    ).subscribe(() => {
      this.ratingUser = $event;
    });
  }
}
