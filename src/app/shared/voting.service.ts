import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Vote } from "./vote.model";
import { map } from 'rxjs/operators';

@Injectable()
export class VotingService {

  constructor(private http: HttpClient) { }

  postVote(emoji_id: number) {
    return this.http.post('http://k8s-emojivot-voteingr-5e95f24ebc-1629858417.us-east-2.elb.amazonaws.com/votes', { "emoji_id": emoji_id })
  }

  getVotes() {
    return this.http.get<Vote[]>('http://k8s-emojivot-voteingr-5e95f24ebc-1629858417.us-east-2.elb.amazonaws.com/votes')
      .pipe(
        map(responseData => {
          const postsArray: Vote[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push(responseData[key]);
            }
          }
          return postsArray;
        })
      )
  }

}