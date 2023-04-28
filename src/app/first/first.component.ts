import { Component } from '@angular/core';
import { Player } from '../Models/player';
import { PlayerService } from '../Services/player.service';
import { Team } from '../Models/team';
import { TeamService } from '../Services/team.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent {

  constructor(private playerService: PlayerService, private teamService: TeamService) { }

  text:string = "Text aus der Variabile";
  showSecondRow:boolean = false;
  inputValue: string = '';
  playersFromDB: Player[] = [];
  newPlayerName: string = '';
  newPlayerAlter: number = 0;
  newPlayerPosition: string = '';

  teamsFromDB: Team[] = [];
  newTeamName: string = '';
  newTeamCountry: string = '';

  showTeamsList = false;
  showPlayersList = false;


  changeText():void{
    this.text = "The text has changed!";
  }

  showMoreButtons(){
    this.showSecondRow = true;
  }

  showLessButtons(){
    this.showSecondRow = false;
  }
  
  getPlayers(){
    this.playerService.getPlayers().subscribe((result : Player[])=>
      {
        this.playersFromDB = result;
      });
  }
  addPlayer() {
    let newPlayer: Player = { Name: this.newPlayerName, Alter: this.newPlayerAlter, Position: this.newPlayerPosition };
    this.playerService.addPlayer(newPlayer);
  }

  getTeams() {
    this.teamService.getTeams().subscribe((result: Team[]) => {
      this.teamsFromDB = result;
    });
  }
  addTeam() {
    let newTeam: Team = { Name: this.newTeamName, Country: this.newTeamCountry };
    this.teamService.addTeam(newTeam);
  }

  toggleTeamsList() {
    if (this.showTeamsList) {
      this.getTeams();
    }
    this.showTeamsList = !this.showTeamsList;
  }

  togglePlayersList() {
    if (this.showPlayersList) {
      this.getPlayers();
    }
    this.showPlayersList = !this.showPlayersList;
  }

  updateLanguage(inputValue: string): void {
    let selectedLanguage = '';
    const languageSelect = document.getElementById('languageSelect') as HTMLSelectElement;
    const languageDependentText = document.querySelector('h2');

    if (languageSelect) {
      selectedLanguage = languageSelect.value;
    }

    if (languageDependentText) {
      if (selectedLanguage === 'english') {
        languageDependentText.textContent = `Your username is ${inputValue}`;
      } else if (selectedLanguage === 'german') {
        languageDependentText.textContent = `Dein Benutzername ist ${inputValue}`;
      } else if (selectedLanguage === 'romanian') {
        languageDependentText.textContent = `Numele tău de utilizator este ${inputValue}`;
      }
    }
  }
}
