import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
 
@Injectable()
export class SmartAudioProvider {

  audioType: string = 'native';
  sounds: any = [];

  constructor(public nativeAudio: NativeAudio, platform: Platform) {

      this.audioType = 'native';

  }

  preload(key, asset) {

    let audio = {
        key: key,
        asset: asset,
        type: 'native'
    };

    this.sounds.push(audio);
    console.log(this.sounds);
      
  }

  play(key){
      let audio = this.sounds.find((sound) => {
          return sound.key == key;
      });
      this.nativeAudio.play(audio.key).then((res) => {
          console.log(res);
      }).catch(error => {
        console.log(error);
      });
  }
}