import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Player } from '../Models/player';
import {addDoc, collection, collectionData, Firestore} 
                        from '@angular/fire/firestore'
@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private fs: Firestore) { }

  getPlayers():Observable<Player[]>{
    console.log(this.fs);
    const myCollection: any = collection(this.fs, 'players0');
    return collectionData(myCollection);
  }

  addPlayer(player:Player){
    const myCollection = collection(this.fs, 'players0')
    addDoc(myCollection, player);
  }
}
