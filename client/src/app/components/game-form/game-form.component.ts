import { Component, OnInit, HostBinding } from '@angular/core';
import { Game } from 'src/app/models/Game';
import { GamesService } from '../../services/games.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class')classes ='row';

  game : any = {
    title: '',
    description: '',
    image: '',
  };

  edit: boolean = false;

  constructor(private gamesService: GamesService, private router: Router, private activeRoute: ActivatedRoute) { }
  
  
  ngOnInit() {
    const params = this.activeRoute.snapshot.params;
    if(params.id){
      this.gamesService.getGame(params.id)
      .subscribe(
        res=>{
          console.log(res);
          this.game = res;
          this.edit = true;
        },
        err=> console.error(err)
      )
    }
  }

  saveNewGame(){
    delete this.game.created_at;
    delete this.game.id;
    this.gamesService.saveGame(this.game)
    .subscribe(
      res=> {
        console.log(res);
        this.router.navigate(['/games']);
      },
      err=>console.error(err)
    )
  }

  updateGame(){
    delete this.game.created_at;
    this.gamesService.updateGame(this.game.id,this.game)
    .subscribe(
      res=> {
        console.log(res);
        this.router.navigate(['/games']);
      },
      err=>console.error(err)
    )
    
  }

}
