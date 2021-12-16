import { Observable } from "rxjs";
import { take } from "rxjs/operators";

export class Utils {
  static obserableToPromise<T>(observable: Observable<T>): Promise<T> {
    return observable?.pipe(take(1)).toPromise();
  }
}